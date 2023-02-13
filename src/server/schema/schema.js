const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLList
} = require('graphql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {
  TodoType,
  TodosResponseType,
  UserType,
  AuthDataType
} = require('./types');

const Users = require('../models/user');
const Todos = require('../models/todo');

const { getDateToday, getUserData } = require('../helpers/graphqlHelpers');

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    login: {
      type: AuthDataType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: async (parent, args) => {
        const userData = await Users.findOne({ email: args.email });

        if (!userData) {
          throw new Error('A user with an email address does not exist');
        }

        const isEqualPassword = await bcrypt.compare(
          args.password,
          userData.password
        );

        if (!isEqualPassword) {
          throw new Error('The entered password is incorrect');
        }

        const token = await jwt.sign(
          {
            userId: userData.id,
            email: userData.email
          },
          'dotodostokenkey',
          { expiresIn: '1h' }
        );

        return {
          userId: userData.id,
          token: token
        };
      }
    },
    getUser: {
      type: UserType,
      args: {},
      resolve: async (parent, args, request) => {
        if (!request.isAuth) {
          throw new Error('Unauthenticated');
        }

        const userData = await Users.findById(request.userId);

        return {
          name: userData.name,
          surname: userData.surname,
          email: userData.email
        };
      }
    },
    getTodo: {
      type: TodoType,
      args: { id: { type: GraphQLID } },
      resolve: async (parent, args, request) => {
        if (!request.isAuth) {
          throw new Error('Unauthenticated');
        }

        const dateToday = getDateToday();

        const todo = await Todos.findById(args.id);

        todo.isOverdue = todo.dateOfComplete < dateToday;
        todo.isToday = todo.dateOfComplete == dateToday;

        return todo;
      }
    },
    getAllTodos: {
      type: TodosResponseType,
      args: {
        offset: { type: GraphQLInt },
        limit: { type: GraphQLInt },
        sortByName: { type: GraphQLBoolean },
        isSortByNameDescending: { type: GraphQLBoolean },
        sortByDateOfCompleted: { type: GraphQLBoolean },
        sortByDateOfCompletedDescending: { type: GraphQLBoolean },
        filterByName: { type: GraphQLString },
        filterByNote: { type: GraphQLString },
        filterByStatus: { type: new GraphQLList(GraphQLString) },
        filterByDateOfComplete: { type: GraphQLString }
      },
      resolve: async (parent, args, request) => {
        if (!request.isAuth) {
          throw new Error('Unauthenticated');
        }

        const dateToday = getDateToday();

        const todosQty = await Todos.find({ creator: request.userId }).count();

        const offset = args.offset ? args.offset : 0;
        const limit = args.limit ? args.limit : todosQty;

        const sortObj = {};

        if (args.sortByName) {
          sortObj.todoName = args.isSortByNameDescending ? -1 : 1;
        }

        if (args.sortByDateOfCompleted) {
          sortObj.dateOfComplete = args.sortByDateOfCompletedDescending
            ? 1
            : -1;
        }

        if (!args.sortByName && !args.sortByDateOfCompleted) {
          sortObj.dateOfCreate = -1;
        }

        const todoNameRegEx = args.filterByName ? `${args.filterByName}` : '';
        const todoNoteRegEx = args.filterByNote ? `${args.filterByNote}` : '';
        const todoStatusesArr = args.filterByStatus?.length
          ? args.filterByStatus.map((status) => {
              switch (status.toLowerCase()) {
                case 'completed':
                  return true;
                case 'incomplete':
                  return false;
                default:
                  return null;
              }
            })
          : [true, false];
        const todoDateOfCompleteRegEx = args.filterByDateOfComplete
          ? `${args.filterByDateOfComplete}`
          : '';

        const todosAllData = await Todos.find({
          creator: request.userId,
          isCompleted: todoStatusesArr
        });

        const datesArr = [];

        todosAllData.forEach(
          (todo) =>
            !datesArr.includes(todo.dateOfComplete) &&
            datesArr.push(todo.dateOfComplete)
        );

        const todos = await Todos.find({
          creator: request.userId,
          todoName: { $regex: todoNameRegEx, $options: 'i' },
          todoNote: { $regex: todoNoteRegEx, $options: 'i' },
          dateOfComplete: { $regex: todoDateOfCompleteRegEx, $options: 'i' },
          isCompleted: todoStatusesArr
        })
          .limit(limit)
          .skip(offset * limit)
          .sort(sortObj)
          .collation({ locale: 'en', caseLevel: true });

        const todosData = todos.map((todo) => {
          return {
            ...todo._doc,
            id: todo.id,
            isOverdue: todo.dateOfComplete < dateToday,
            isToday: todo.dateOfComplete == dateToday,
            creator: getUserData.bind(this, todo._doc.creator)
          };
        });

        return {
          todos: todosData,
          page_size: limit,
          page_number: offset ? offset + 1 : 1,
          total_count: Todos.find({
            creator: request.userId,
            todoName: { $regex: todoNameRegEx, $options: 'i' },
            todoNote: { $regex: todoNoteRegEx, $options: 'i' },
            dateOfComplete: { $regex: todoDateOfCompleteRegEx, $options: 'i' },
            isCompleted: todoStatusesArr
          }).count(),
          total_all_count: todosQty,
          incomplete_count: Todos.find({
            creator: request.userId,
            todoName: { $regex: todoNameRegEx, $options: 'i' },
            todoNote: { $regex: todoNoteRegEx, $options: 'i' },
            dateOfComplete: { $regex: todoDateOfCompleteRegEx, $options: 'i' },
            isCompleted: todoStatusesArr.includes(false) ? false : null
          }).count(),
          dates_of_complete: datesArr
        };
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    signUp: {
      type: UserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        surname: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: async (parent, args) => {
        const userData = await Users.findOne({ email: args.email });

        if (userData) {
          throw new Error('A user with an email address already exists');
        }

        const hashedPassword = await bcrypt.hash(args.password, 12);

        const user = new Users({
          name: args.name,
          surname: args.surname,
          email: args.email,
          password: hashedPassword
        });

        const result = await user.save();

        return { ...result._doc, id: result.id, password: null };
      }
    },
    editUser: {
      type: UserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        surname: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: async (parent, args, request) => {
        if (!request.isAuth) {
          throw new Error('Unauthenticated');
        }

        return Users.findByIdAndUpdate(
          request.userId,
          {
            $set: {
              name: args.name,
              surname: args.surname
            }
          },
          { new: true }
        );
      }
    },
    deleteUser: {
      type: UserType,
      args: {},
      resolve: async (parent, args, request) => {
        if (!request.isAuth) {
          throw new Error('Unauthenticated');
        }

        const userData = await Users.findById(request.userId);

        userData.createdTodos.forEach(async (todoId) => {
          const deletedTodoId = todoId.toString();

          await Todos.findByIdAndRemove(deletedTodoId);
        });

        return Users.findByIdAndRemove(request.userId);
      }
    },
    createTodo: {
      type: TodoType,
      args: {
        todoName: { type: new GraphQLNonNull(GraphQLString) },
        todoNote: { type: GraphQLString },
        dateOfComplete: { type: GraphQLString }
      },
      resolve: async (parent, args, request) => {
        if (!request.isAuth) {
          throw new Error('Unauthenticated');
        }

        const dateOfCreate = Date.now().toString();

        const todo = new Todos({
          dateOfCreate: dateOfCreate,
          todoName: args.todoName,
          todoNote: args.todoNote,
          dateOfComplete: args.dateOfComplete,
          isCompleted: false,
          creator: request.userId
        });

        const result = await todo.save();

        let createdTodo = {
          ...result._doc,
          id: result.id,
          creator: getUserData.bind(this, result._doc.creator)
        };

        const creator = await Users.findById(request.userId);

        if (!creator) {
          throw new Error('A user not found');
        }

        creator.createdTodos.push(todo);

        await creator.save();

        return createdTodo;
      }
    },
    editTodo: {
      type: TodoType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        todoName: { type: GraphQLString },
        todoNote: { type: GraphQLString },
        dateOfComplete: { type: GraphQLString },
        isCompleted: { type: GraphQLBoolean }
      },
      resolve: async (parent, args, request) => {
        if (!request.isAuth) {
          throw new Error('Unauthenticated');
        }

        const todo = await Todos.findById(args.id);

        return Todos.findByIdAndUpdate(
          args.id,
          {
            $set: {
              todoName:
                args.todoName != undefined ? args.todoName : todo.todoName,
              todoNote:
                args.todoNote != undefined ? args.todoNote : todo.todoNote,
              dateOfComplete:
                args.dateOfComplete != undefined
                  ? args.dateOfComplete
                  : todo.dateOfComplete,
              isCompleted:
                args.isCompleted != undefined
                  ? args.isCompleted
                  : todo.isCompleted
            }
          },
          { new: true }
        );
      }
    },
    deleteTodo: {
      type: TodoType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve: async (parent, args, request) => {
        if (!request.isAuth) {
          throw new Error('Unauthenticated');
        }

        const userData = await Users.findById(request.userId);

        userData.createdTodos = userData.createdTodos.filter(
          (todoId) => todoId.toString() != args.id
        );

        userData.save();

        return Todos.findByIdAndRemove(args.id);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});

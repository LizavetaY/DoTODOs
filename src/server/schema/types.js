const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLList
} = require('graphql');

const AuthDataType = new GraphQLObjectType({
  name: 'AuthData',
  fields: () => ({
    userId: { type: GraphQLID },
    token: { type: new GraphQLNonNull(GraphQLString) }
  })
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: new GraphQLNonNull(GraphQLString) },
    surname: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: GraphQLString },
    createdTodos: { type: new GraphQLList(new GraphQLNonNull(TodoType)) }
  })
});

const TodoType = new GraphQLObjectType({
  name: 'Todo',
  fields: () => ({
    id: { type: GraphQLID },
    dateOfCreate: { type: GraphQLString },
    todoName: { type: GraphQLString },
    todoNote: { type: GraphQLString },
    dateOfComplete: { type: GraphQLString },
    isCompleted: { type: GraphQLBoolean },
    isOverdue: { type: GraphQLBoolean },
    isToday: { type: GraphQLBoolean },
    creator: {
      type: new GraphQLNonNull(UserType)
    }
  })
});

const TodosResponseType = new GraphQLObjectType({
  name: 'TodosResponse',
  fields: () => ({
    todos: { type: new GraphQLList(TodoType) },
    page_size: { type: GraphQLInt },
    page_number: { type: GraphQLInt },
    total_count: { type: GraphQLInt },
    total_all_count: { type: GraphQLInt },
    incomplete_count: { type: GraphQLInt },
    dates_of_complete: { type: new GraphQLList(GraphQLString) }
  })
});

module.exports = {
  AuthDataType,
  UserType,
  TodoType,
  TodosResponseType
};

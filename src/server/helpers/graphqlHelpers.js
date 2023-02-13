const Users = require('../models/user');
const Todos = require('../models/todo');
const moment = require('moment');

const getDateToday = () => moment().get().format('YYYY-MM-DD');

const getUserData = async (userId) => {
  const userData = await Users.findById(userId);

  return {
    ...userData._doc,
    id: userData.id,
    createdTodos: getTodosData.bind(this, userData._doc.createdTodos)
  };
};

const getTodosData = async (todosId) => {
  const todoData = await Todos.find({ id: { $in: todosId } });

  return todoData.map((todo) => ({
    ...todo._doc,
    id: todo.id,
    creator: getUserData.bind(this, todo.creator)
  }));
};

module.exports = {
  getDateToday,
  getUserData
};

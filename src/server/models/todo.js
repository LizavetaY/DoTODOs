const { Schema, model } = require('mongoose');

const todoSchema = new Schema({
  dateOfCreate: String,
  todoName: String,
  todoNote: String,
  dateOfComplete: String,
  isCompleted: Boolean,
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = model('Todo', todoSchema);

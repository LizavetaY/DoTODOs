const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  createdTodos: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Todo'
    }
  ]
});

module.exports = model('User', userSchema);

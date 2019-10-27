const mongoose = require('mongoose');
const TodoListItemSchema = mongoose.Schema({
  todo: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    required: true
  }
});
const TodoListSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  items: [TodoListItemSchema]
});

module.exports = mongoose.model('todo-list', TodoListSchema);

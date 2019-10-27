import React, { Fragment } from 'react';
import TodoListEdit from '../components/todolist-edit/TodoListEdit';
import EditTodoItemModal from '../components/todolist-edit/EditTodoItemModal';
const Todo = () => {
  return (
    <Fragment>
      <TodoListEdit />
      <EditTodoItemModal />
    </Fragment>
  );
};

export default Todo;

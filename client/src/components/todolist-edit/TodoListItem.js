import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import './TodoListItem.css';
import { connect } from 'react-redux';
import {
  deleteTodoListItem,
  setCurrentEdited,
  completeTodoListItem
} from '../../actions/todoListEditActions';

const TodoListItem = ({
  todoItem,
  deleteTodoListItem,
  completeTodoListItem,
  setCurrentEdited
}) => {
  const onDelete = tempId => {
    deleteTodoListItem(tempId);
  };
  const onCompleted = tempId => {
    completeTodoListItem(tempId);
    todoItem.completed = true;
  };
  const onEdit = todoItem => {
    setCurrentEdited(todoItem);
  };
  // const todoItemCss = todoItem.completed ? { className: 'text-strike' } : {};
  return (
    <li className='collection-item'>
      <p>
        {todoItem.completed ? (
          <span>
            <i className='material-icons md-24 grey-text'>check</i>
          </span>
        ) : null}
        <span>{todoItem.todo}</span>
        {todoItem.completed ? (
          <Fragment>
            <a
              style={{ marginLeft: '8px' }}
              href='#edit-todo-item-modal'
              onClick={() => onEdit(todoItem)}
              className='secondary-content modal-trigger'
            >
              <i className='material-icons md-24 grey-text'>edit</i>
            </a>
            <a
              style={{ marginLeft: '8px' }}
              href='#!'
              className='secondary-content'
              onClick={() => onDelete(todoItem.tempId)}
            >
              <i className='material-icons md-24 grey-text'>delete</i>
            </a>
          </Fragment>
        ) : (
          <Fragment>
            <a
              style={{ marginLeft: '8px' }}
              href='#edit-todo-item-modal'
              onClick={() => onEdit(todoItem)}
              className='secondary-content modal-trigger'
            >
              <i className='material-icons md-24 grey-text'>edit</i>
            </a>
            <a
              style={{ marginLeft: '8px' }}
              href='#!'
              className='secondary-content'
              onClick={() => onDelete(todoItem.tempId)}
            >
              <i className='material-icons md-24 grey-text'>delete</i>
            </a>
            <a
              style={{ marginLeft: '8px' }}
              href='#!'
              className='secondary-content'
              onClick={() => onCompleted(todoItem.tempId)}
            >
              <i className='material-icons md-24 grey-text'>check</i>
            </a>
          </Fragment>
        )}
      </p>
    </li>
  );
};
TodoListItem.propTypes = {
  todoItem: PropTypes.object.isRequired,
  deleteTodoListItem: PropTypes.func.isRequired,
  setCurrentEdited: PropTypes.func.isRequired,
  completeTodoListItem: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteTodoListItem, setCurrentEdited, completeTodoListItem }
)(TodoListItem);

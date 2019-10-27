import React, { useEffect, useState, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import TodoListItem from './TodoListItem';
import Preloader from '../layout/Preloader';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import uuid from 'uuid';
import M from 'materialize-css/dist/js/materialize.min.js';
import {
  getTodoList,
  addTodoListItem,
  updateTodoList,
  clearSavedFlag,
  todoListEditUnloaded,
  addTodoList
} from '../../actions/todoListEditActions';

const TodoListEdit = ({
  match,
  todoListEdit: { todoList, loading, saveSuccess, toastMessage, error },
  getTodoList,
  addTodoListItem,
  addTodoList,
  clearSavedFlag,
  todoListEditUnloaded,
  updateTodoList
}) => {
  const [title, setTitle] = useState('');
  const [newTodoItem, setNewTodoItem] = useState('');
  let { id } = useParams();
  useEffect(() => {
    M.AutoInit();
  }, []);
  useEffect(() => {
    todoListEditUnloaded();
  }, [todoListEditUnloaded]);

  useEffect(() => {
    if (todoList.title) {
      setTitle(todoList.title);
    }
  }, [todoList]);

  useEffect(() => {
    if (id) {
      getTodoList(id);
    } else {
      setTitle('');
      setNewTodoItem('');
    }
  }, []);
  useEffect(() => {
    if (toastMessage) {
      M.toast({ html: toastMessage });
    }
  }, [toastMessage]);
  useEffect(() => {
    if (error) {
      if (error.errors && error.errors.length) {
        for (let i = 0; i < error.errors.length; ++i) {
          M.toast({ html: error.errors[i].msg });
        }
      } else {
        M.toast({ html: error });
      }
    }
  }, [error]);
  const titleChange = event => {
    setTitle(event.target.value);
  };
  const todoChange = event => {
    setNewTodoItem(event.target.value);
  };
  const addClicked = event => {
    if (!newTodoItem || !newTodoItem.trim()) {
      M.toast({ html: 'Cannot add an empty todo item' });
      return;
    }
    const newItem = {
      tempId: uuid(),
      todo: newTodoItem.trim(),
      completed: false
    };

    addTodoListItem(newItem);
    M.toast({ html: `"${newTodoItem}" was added` });
    setNewTodoItem('');
  };

  const saveClicked = async event => {
    if (!title || !title.trim()) {
      M.toast({ html: 'Cannot save a todo list without a title' });
      return;
    }
    if (!todoList.items.length) {
      M.toast({ html: 'Cannot save a todo list without items' });
      return;
    }
    const savedTodoList = { ...todoList, title: title };
    if (id) {
      updateTodoList(savedTodoList);
    } else {
      addTodoList(savedTodoList);
    }
  };

  if (saveSuccess) {
    M.toast({ html: `Saved ${title} successfully` });
    clearSavedFlag();
    return <Redirect to='/' />;
  }
  if (loading) {
    return <Preloader />;
  }
  const labelCss = title ? { className: 'active' } : {};
  return (
    <Fragment>
      <div className='row'>
        <form className='col s12'>
          <div className='row'>
            <div className='input-field col s12'>
              <input
                id='title'
                type='text'
                className='validate'
                value={title}
                onChange={titleChange}
              />
              <label {...labelCss} htmlFor='title'>
                Title
              </label>
            </div>
          </div>
        </form>
        <form className='col s12'>
          <div className='row'>
            <div className='input-field col s11'>
              <input
                id='newTodoItem'
                type='text'
                className='validate'
                value={newTodoItem}
                onChange={todoChange}
              />
              <label htmlFor='newTodoItem'>New Todo Item</label>
            </div>
            <div className='input-field col s1'>
              <a
                href='#!'
                className='waves-effect waves-light btn'
                onClick={addClicked}
              >
                Add Todo
              </a>
            </div>
          </div>
        </form>
        <ul className='collection with-header'>
          <li className='collection-header'>
            <div className='center'>Todo Items</div>
          </li>
          {todoList.items.length === 0 ? (
            <p className='center'>Nothing to do yet</p>
          ) : (
            todoList.items.map(todoItem => (
              <TodoListItem
                key={todoItem.tempId + todoItem.todo}
                todoItem={todoItem}
              />
            ))
          )}
        </ul>
      </div>
      <div className='fixed-action-btn'>
        <a
          href='#!'
          onClick={saveClicked}
          className='btn-floating btn-large waves-effect waves-light indigo'
        >
          <i className='material-icons'>save</i>
        </a>
      </div>
    </Fragment>
  );
};

TodoListEdit.propTypes = {
  todoLists: PropTypes.object,
  getTodoList: PropTypes.func.isRequired,
  addTodoListItem: PropTypes.func.isRequired,
  addTodoList: PropTypes.func.isRequired,
  clearSavedFlag: PropTypes.func.isRequired,
  todoListEditUnloaded: PropTypes.func.isRequired,
  updateTodoList: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  todoListEdit: state.todoListEdit
});
export default connect(
  mapStateToProps,
  {
    getTodoList,
    addTodoListItem,
    addTodoList,
    updateTodoList,
    clearSavedFlag,
    todoListEditUnloaded
  }
)(TodoListEdit);

import {
  GET_TODO_LIST,
  TODO_LIST_EDIT_ERROR,
  SET_CURRENT_EDITED,
  CLEAR_CURRENT_EDITED,
  DELETE_TODO_LIST_ITEM,
  UPDATE_TODO_LIST_ITEM,
  ADD_TODO_LIST_ITEM,
  CLEAR_SAVED_FLAG,
  ADD_TODO_LIST,
  UPDATE_TODO_LIST,
  COMPLETE_TODO_LIST_ITEM,
  SET_LOADING,
  TODO_LIST_EDIT_UNLOADED,
  SHOW_TOAST
} from './types';
import axios from 'axios';
import uuid from 'uuid';

export const getTodoList = id => async dispatch => {
  try {
    setLoading();
    const res = await axios.get(`/api/todo-lists/${id}`);
    for (let i = 0; i < res.data.items.length; ++i) {
      res.data.items[i].tempId = uuid();
    }
    dispatch({
      type: GET_TODO_LIST,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: TODO_LIST_EDIT_ERROR,
      payload: error.response.data
    });
  }
};
export const addTodoList = todoList => async dispatch => {
  try {
    setLoading();
    const res = await axios.post(`/api/todo-lists`, todoList);
    dispatch({
      type: ADD_TODO_LIST,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: TODO_LIST_EDIT_ERROR,
      payload: error.response.data
    });
  }
};
export const updateTodoList = todoList => async dispatch => {
  try {
    setLoading();
    const res = await axios.put(`/api/todo-lists/${todoList._id}`, todoList);
    dispatch({
      type: UPDATE_TODO_LIST,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: TODO_LIST_EDIT_ERROR,
      payload: error.response.data
    });
  }
};
export const completeTodoListItem = tempId => dispatch => {
  setLoading();
  dispatch({
    type: COMPLETE_TODO_LIST_ITEM,
    payload: tempId
  });
};
export const deleteTodoListItem = tempId => dispatch => {
  setLoading();
  dispatch({
    type: DELETE_TODO_LIST_ITEM,
    payload: tempId
  });
};
export const updateTodoListItem = todoListItem => dispatch => {
  setLoading();
  dispatch({
    type: UPDATE_TODO_LIST_ITEM,
    payload: todoListItem
  });
};
export const addTodoListItem = todoListItem => dispatch => {
  setLoading();
  dispatch({
    type: ADD_TODO_LIST_ITEM,
    payload: todoListItem
  });
};
export const setCurrentEdited = todoListItem => dispatch => {
  dispatch({
    type: SET_CURRENT_EDITED,
    payload: todoListItem
  });
};
export const clearCurrentEdited = () => dispatch => {
  dispatch({
    type: CLEAR_CURRENT_EDITED
  });
};
export const setLoading = () => {
  return {
    type: SET_LOADING
  };
};
export const clearSavedFlag = () => dispatch => {
  dispatch({
    type: CLEAR_SAVED_FLAG
  });
};
export const todoListEditUnloaded = () => dispatch => {
  dispatch({
    type: TODO_LIST_EDIT_UNLOADED
  });
};

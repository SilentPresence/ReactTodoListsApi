import {
  GET_TODO_LISTS,
  DELETE_TODO_LIST,
  SET_LOADING,
  SET_CURRENT_DELETED,
  CLEAR_CURRENT_DELETED,
  SET_CURRENT_VIEWED,
  CLEAR_CURRENT_VIEWED,
  SHOW_TOAST,
  CLEAR_TOAST,
  TODO_LISTS_ERROR
} from '../actions/types';

const initialState = {
  todoLists: null,
  loading: false,
  currentDeleted: null,
  currentViewed: null,
  error: null,
  toastMessage: null
};
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TODO_LISTS:
      return {
        ...state,
        todoLists: action.payload,
        loading: false
      };
    case SHOW_TOAST:
      return { ...state, toastMessage: action.payload };
    case CLEAR_TOAST:
      return { ...state, toastMessage: null };
    case DELETE_TODO_LIST:
      return {
        ...state,
        todoLists: state.todoLists.filter(
          todoList => todoList._id !== action.payload
        ),
        loading: false
      };
    case SET_CURRENT_DELETED:
      return {
        ...state,
        currentDeleted: action.payload
      };
    case CLEAR_CURRENT_DELETED:
      return {
        ...state,
        currentDeleted: null
      };
    case SET_CURRENT_VIEWED:
      return {
        ...state,
        currentViewed: action.payload
      };
    case CLEAR_CURRENT_VIEWED:
      return {
        ...state,
        currentViewed: null
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case TODO_LISTS_ERROR:
      console.error(action.payload);
      return {
        ...state,
        error: action.payload
      };

    default:
      return state;
  }
};

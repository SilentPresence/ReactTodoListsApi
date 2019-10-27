import {
  GET_TODO_LIST,
  TODO_LIST_EDIT_ERROR,
  SET_CURRENT_EDITED,
  CLEAR_CURRENT_EDITED,
  DELETE_TODO_LIST_ITEM,
  UPDATE_TODO_LIST_ITEM,
  ADD_TODO_LIST_ITEM,
  ADD_TODO_LIST,
  UPDATE_TODO_LIST,
  SET_LOADING,
  TODO_LIST_EDIT_UNLOADED,
  SHOW_TOAST,
  CLEAR_TOAST,
  CLEAR_SAVED_FLAG,
  COMPLETE_TODO_LIST_ITEM
} from '../actions/types';
const initialState = {
  todoList: { title: '', items: [] },
  loading: false,
  currentEdited: null,
  saveSuccess: false,
  error: null,
  toastMessage: null
};
export default (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case TODO_LIST_EDIT_UNLOADED:
      return initialState;
    case SHOW_TOAST:
      return { ...state, toastMessage: action.payload };
    case CLEAR_TOAST:
      return { ...state, toastMessage: null };
    case GET_TODO_LIST:
      return {
        ...state,
        todoList: action.payload,
        loading: false
      };
    case CLEAR_SAVED_FLAG:
      return {
        ...state,
        saveSuccess: false
      };
    case DELETE_TODO_LIST_ITEM:
      return {
        ...state,
        todoList: {
          ...state.todoList,
          items: state.todoList.items.filter(
            todoList => todoList.tempId !== action.payload
          )
        },
        loading: false
      };
    case COMPLETE_TODO_LIST_ITEM:
      const todoList = [...state.todoList.items];
      const itemIndex = todoList.findIndex(
        todoItem => todoItem.tempId === action.payload
      );
      if (itemIndex === -1) {
        return;
      }
      todoList[itemIndex] = { ...todoList[itemIndex], completed: true };
      return {
        ...state,
        todoList: {
          ...state.todoList,
          items: todoList
        },
        loading: false
      };
    case UPDATE_TODO_LIST_ITEM:
      return {
        ...state,
        todoList: {
          ...state.todoList,
          items: state.todoList.items.map(todoListItem =>
            todoListItem.tempId === action.payload.tempId
              ? action.payload
              : todoListItem
          )
        },
        loading: false
      };
    case ADD_TODO_LIST_ITEM:
      return {
        ...state,
        todoList: {
          ...state.todoList,
          items: [...state.todoList.items, action.payload]
        },
        loading: false
      };
    case ADD_TODO_LIST:
      return {
        ...state,
        saveSuccess: true,
        loading: false
      };
    case UPDATE_TODO_LIST:
      return {
        ...state,
        saveSuccess: true,
        loading: false
      };
    case SET_CURRENT_EDITED:
      return {
        ...state,
        currentEdited: action.payload
      };
    case CLEAR_CURRENT_EDITED:
      return {
        ...state,
        currentEdited: null
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case TODO_LIST_EDIT_ERROR:
      console.error(action.payload);
      return {
        ...state,
        error: action.payload
      };

    default:
      return state;
  }
};

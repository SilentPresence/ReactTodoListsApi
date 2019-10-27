import { combineReducers } from 'redux';
import todoListsReducer from './todoListsReducer';
import todoListEditReducer from './todoListEditReducer';
export default combineReducers({
  todoLists: todoListsReducer,
  todoListEdit: todoListEditReducer
});

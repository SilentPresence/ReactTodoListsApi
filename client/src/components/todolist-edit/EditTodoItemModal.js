import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  updateTodoListItem,
  clearCurrentEdited
} from '../../actions/todoListEditActions';

const EditTodoItemModal = ({
  todoItem,
  updateTodoListItem,
  clearCurrentEdited
}) => {
  const [todo, setTodo] = useState('');
  const onUpdate = async () => {
    const updatedTodo = { ...todoItem, todo: todo };
    updateTodoListItem(updatedTodo);
    clearCurrentEdited();
  };
  useEffect(() => {
    if (todoItem) {
      setTodo(todoItem.todo);
    }
  }, [todoItem]);
  const todoChange = event => {
    setTodo(event.target.value);
  };
  const labelCss = todo ? { className: 'active' } : {};
  return (
    <div id='edit-todo-item-modal' className='modal'>
      <div className='modal-content'>
        <h4>Edit todo item</h4>
        <form className='col s12'>
          <div className='row'>
            <div className='input-field col s11'>
              <input
                id='todoItem'
                type='text'
                className='validate'
                value={todo}
                onChange={todoChange}
              />
              <label {...labelCss} htmlFor='todoItem'>Todo</label>
            </div>
          </div>
        </form>
      </div>
      <div className='modal-footer'>
        <a href='#!' className='modal-close waves-effect waves-teal btn-flat'>
          Cancel
        </a>
        <a
          href='#!'
          className='modal-close waves-effect waves-light btn-small red'
          onClick={onUpdate}
        >
          Update
        </a>
      </div>
    </div>
  );
};
// const modalStyle = {
//   width: '50%'
// };
EditTodoItemModal.propTypes = {
  todoItem: PropTypes.object,
  updateTodoListItem: PropTypes.func.isRequired,
  clearCurrentEdited: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  todoItem: state.todoListEdit.currentEdited
});
export default connect(
  mapStateToProps,
  { updateTodoListItem, clearCurrentEdited }
)(EditTodoItemModal);

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  deleteTodoLists,
  clearCurrentDeleted
} from '../../actions/todoListsActions';

const DeleteTodoListModal = ({
  todoList,
  deleteTodoLists,
  clearCurrentDeleted
}) => {
  const onDelete = async () => {
    deleteTodoLists(todoList);
    clearCurrentDeleted();
  };
  return (
    <div id='delete-todo-list-modal' className='modal' style={modalStyle}>
      <div className='modal-content'>
        <h4>Delete todo list</h4>
        <div>
          Are you sure you would like to delete{' '}
          {todoList ? todoList.title : 'this todo list'}?
        </div>
      </div>
      <div className='modal-footer'>
        <a href='#!' className='modal-close waves-effect waves-teal btn-flat'>
          Cancel
        </a>
        <a
          href='#!'
          className='modal-close waves-effect waves-light btn-small red'
          onClick={onDelete}
        >
          Delete
        </a>
      </div>
    </div>
  );
};
const modalStyle = {
  width: '50%'
};
DeleteTodoListModal.propTypes = {
  todoList: PropTypes.object,
  deleteTodoLists: PropTypes.func.isRequired,
  clearCurrentDeleted: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  todoList: state.todoLists.currentDeleted
});
export default connect(
  mapStateToProps,
  { deleteTodoLists, clearCurrentDeleted }
)(DeleteTodoListModal);

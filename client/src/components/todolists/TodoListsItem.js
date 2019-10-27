import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  setCurrentDeleted,
  setCurrentViewed
} from '../../actions/todoListsActions';
const TodoListsItem = ({ todoList, setCurrentDeleted, setCurrentViewed }) => {
  return (
    <li className='collection-item'>
      <div>
        <a
          className='modal-trigger'
          href='#view-todo-list-modal'
          onClick={() => setCurrentViewed(todoList)}
        >
          {todoList.title}
        </a>
        <Link
          to={`/todo/${todoList._id}`}
          className='secondary-content'
          style={{ marginLeft: '8px' }}
        >
          <i className='material-icons md-24 grey-text'>edit</i>
        </Link>
        <a
          className='secondary-content modal-trigger'
          style={{ marginLeft: '8px' }}
          href='#delete-todo-list-modal'
          onClick={() => setCurrentDeleted(todoList)}
        >
          <i className='material-icons md-24 grey-text'>delete</i>
        </a>
      </div>
      <div className='black-text'>
        Completed {todoList.completedItemCount} out of {todoList.itemCount}
      </div>
      <div style={{ marginRight: '8px' }}>
        Created at{' '}
        {moment(todoList.createdAt)
          .local()
          .format('L HH:mm:ss')}
      </div>
    </li>
  );
};
TodoListsItem.propTypes = {
  todoList: PropTypes.object.isRequired,
  setCurrentDeleted: PropTypes.func.isRequired,
  setCurrentViewed: PropTypes.func.isRequired
};
export default connect(
  null,
  { setCurrentDeleted, setCurrentViewed }
)(TodoListsItem);

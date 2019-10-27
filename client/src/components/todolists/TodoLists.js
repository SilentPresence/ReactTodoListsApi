import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Preloader from '../layout/Preloader';
import TodoListsItem from './TodoListsItem';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTodoLists } from '../../actions/todoListsActions';
import M from 'materialize-css/dist/js/materialize.min.js';
const TodoLists = ({
  todoLists: { todoLists, loading, toastMessage },
  getTodoLists
}) => {
  useEffect(() => {
    getTodoLists();
  }, [getTodoLists]);
  useEffect(() => {
    M.AutoInit();
  }, []);
  useEffect(() => {
    if (toastMessage) {
      M.toast({ html: toastMessage });
    }
  }, [toastMessage]);
  if (loading || !todoLists) {
    return <Preloader />;
  }

  return (
    <Fragment>
      <ul className='collection with-header'>
        <li className='collection-header'>
          <div className='center'>Todo Lists</div>
        </li>
        {todoLists.length === 0 ? (
          <p className='center'>Nothing to do yet</p>
        ) : (
          todoLists.map(todoList => (
            <TodoListsItem key={todoList._id} todoList={todoList} />
          ))
        )}
      </ul>
      <div className='fixed-action-btn'>
        <Link
          to='/todo'
          className='btn-floating btn-large waves-effect waves-light indigo'
        >
          <i className='material-icons'>add</i>
        </Link>
      </div>
    </Fragment>
  );
};
TodoLists.propTypes = {
  todoLists: PropTypes.object.isRequired,
  getTodoLists: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  todoLists: state.todoLists
});
export default connect(
  mapStateToProps,
  { getTodoLists }
)(TodoLists);

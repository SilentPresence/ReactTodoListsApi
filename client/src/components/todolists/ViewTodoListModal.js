import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import M from 'materialize-css/dist/js/materialize.min.js';
const ViewTodoListModal = ({ todoList }) => {
  const tabs = React.createRef();
  useEffect(() => {
    M.Tabs.init(tabs);
  }, [tabs]);
  const allItems = todoList ? todoList.items : [];
  const completedItems = todoList
    ? allItems.filter(todoItem => todoItem.completed)
    : [];
  const uncompletedItems = todoList
    ? allItems.filter(todoItem => !todoItem.completed)
    : [];
  return (
    <div id='view-todo-list-modal' className='modal modal-fixed-footer'>
      <div className='modal-content'>
        <h5>{todoList ? todoList.title : ''}</h5>
        <div className='row'>
          <div className='col s12'>
            <ul className='tabs' ref={tabs}>
              <li className='tab col s3'>
                <a className='active' href='#all'>
                  {`All (${allItems.length})`}
                </a>
              </li>
              <li className='tab col s3'>
                <a href='#uncompleted'>
                  {`Uncompleted (${uncompletedItems.length})`}
                </a>
              </li>
              <li className='tab col s3'>
                <a href='#completed'>
                  {`Completed (${completedItems.length})`}
                </a>
              </li>
            </ul>
          </div>
          <div id='all' className='col s12'>
            {!todoList ? null : allItems.length === 0 ? (
              <p className='center'>Nothing to do yet</p>
            ) : (
              <ul className='collection'>
                {allItems.map(todoItem => (
                  <li className='collection-item' key={todoItem._id}>
                    <p>
                      {todoItem.completed ? (
                        <span>
                          <i className='material-icons md-24 grey-text'>
                            check
                          </i>
                        </span>
                      ) : null}
                      <span>{todoItem.todo}</span>
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div id='uncompleted' className='col s12'>
            {!todoList ? null : uncompletedItems.length === 0 ? (
              <p className='center'>No uncomplted items</p>
            ) : (
              <ul className='collection'>
                {uncompletedItems.map(todoItem => (
                  <li className='collection-item' key={todoItem._id}>
                    <p>
                      <span>{todoItem.todo}</span>
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div id='completed' className='col s12'>
            {!todoList ? null : completedItems.length === 0 ? (
              <p className='center'>No completed items</p>
            ) : (
              <ul className='collection'>
                {completedItems.map(todoItem => (
                  <li className='collection-item' key={todoItem._id}>
                    <p>
                      <span>{todoItem.todo}</span>
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      <div className='modal-footer'>
        <a href='#!' className='modal-close waves-effect waves-teal btn-flat'>
          Close
        </a>
      </div>
    </div>
  );
};
ViewTodoListModal.propTypes = {
  todoList: PropTypes.object
};
const mapStateToProps = state => ({
  todoList: state.todoLists.currentViewed
});
export default connect(mapStateToProps)(ViewTodoListModal);

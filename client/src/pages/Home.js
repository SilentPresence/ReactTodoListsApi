import React, { Fragment } from 'react';
import TodoLists from '../components/todolists/TodoLists';
import DeleteTodoListModal from '../components/todolists/DeleteTodoListModal';
import ViewTodoListModal from '../components/todolists/ViewTodoListModal';
const Home = () => {
  return (
    <Fragment>
      <TodoLists />
      <DeleteTodoListModal />
      <ViewTodoListModal />
    </Fragment>
  );
};

export default Home;

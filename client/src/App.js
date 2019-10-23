import React, { Fragment, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import TodoLists from './components/todolists/TodoLists';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import './App.css';

const App = () => {
  useEffect(() => {
    M.AutoInit();
  });
  return (
    <div className='App'>
      <Fragment>
        <Navbar />
        <div className='container'>
          <TodoLists />
        </div>
      </Fragment>
    </div>
  );
};

export default App;

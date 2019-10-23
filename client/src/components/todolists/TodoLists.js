import React, { useEffect, useState } from 'react';
import Preloader from '../layout/Preloader';
import axios from 'axios';

const TodoLists = () => {
  const [todoLists, setTodoLists] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getTodoLists();
  }, []);
  const getTodoLists = async () => {
    setLoading(true);
    const todoLists = await axios.get('/api/todo-lists');
    setTodoLists(todoLists.data);
    setLoading(false);
  };
  if (loading) {
    return <Preloader />;
  }
  return (
    <ul className='collection with-header'>
      <li className='collection-header'>Todo Lists</li>
      {todoLists.length === 0 ? (
        <p className='center'>Nothing to do yet</p>
      ) : (
        todoLists.map(todoList => <li>{todoList.title}</li>)
      )}
    </ul>
  );
};

export default TodoLists;

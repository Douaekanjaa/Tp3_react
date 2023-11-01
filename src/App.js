import React from 'react';
import './App.css';
import TodoList2 from './compenants/TodoList2'; 
import TodoList from './compenants/TodoList';

function App() {
  return (
    <div className="App">
      <TodoList2 />
      <TodoList />
    </div>
  );
}

export default App;

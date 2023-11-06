import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './TodoList.css';
import trash from '../images/trash.png';
import edit from '../images/edit.png';

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editTask, setEditTask] = useState(null);
  const [editedTaskText, setEditedTaskText] = useState('');

  const handleTaskChange = (event) => {
    setNewTask(event.target.value);
  };

  const addTask = () => {
    if (newTask !== '') {
      setTasks((prevTasks) => [
        ...prevTasks,
        { id: uuidv4(), text: newTask, completed: false }
      ]);
      setNewTask('');
    }
  };

  const startEditing = (id, text) => {
    setEditTask(id);
    setEditedTaskText(text);
  };

  const saveEditedTask = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, text: editedTaskText } : task
    );
    setTasks(updatedTasks);
    setEditTask(null);
  };

  const removeTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  return (
    <div id='frag'>
      <div  className='TodoList2'>
          <h1 id='pink'>To-Do List</h1>
        </div>
      <div className="TodoList">
        
      
        <div className="task-input ">
          <input
            type="text"
            placeholder="Add a new task"
            value={newTask}
            onChange={handleTaskChange}
          />
          <button onClick={addTask}>Add</button>
        </div>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              {editTask === task.id ? (
                <div>
                  <input
                    type="text"
                    value={editedTaskText}
                    onChange={(e) => setEditedTaskText(e.target.value)}
                  />
                  <button onClick={() => saveEditedTask(task.id)}>Save</button>
                </div>
              ) : (
                <span>{task.text}</span>
              )}
              <img src={edit} className='pics' onClick={() => startEditing(task.id, task.text)} alt='edit' style={{marginLeft: "30%", marginRight: "10px"}}/>
              <img src={trash}  className='pics' alt='remove' onClick={() => removeTask(task.id)}  />
                <br />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoList;

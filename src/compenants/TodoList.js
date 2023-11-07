import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './TodoList.css';
import trash from '../images/trash.png';
import edit from '../images/edit.png';
import check from '../images/check.png'

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editTask, setEditTask] = useState(null);
  const [editedTaskText, setEditedTaskText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
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
    setIsEditing(true);
  };

  const saveEditedTask = (id, text) => {
    if (text === "") {
      alert("You can't add an empty task");
    } else {
      const updatedTasks = tasks.map((task) =>
        task.id === id ? { ...task, text } : task
      );
      setTasks(updatedTasks);
      setEditTask(null);
      setIsEditing(false);
    }
  };

  const removeTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  return (
    <div id='frag'>
      <div className='TodoList2'>
        <h1 id='pink'>To-Do List</h1>
      </div>
      <div className="TodoList">
        <div className="task-input ">
          <input type="text" placeholder="Add a new task" value={newTask} onChange={handleTaskChange} />
          <button onClick={addTask}>Add</button>
        </div>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              {editTask === task.id ? (
                <div>
                  <input type="text" value={editedTaskText}
                    onChange={(e) => setEditedTaskText(e.target.value)} style={{outline: "none"}}
                  />
                  <img src={check} id='save' onClick={() => saveEditedTask(task.id, editedTaskText)} />
                </div>
              ) : (
                <span id='txt'>{task.text}</span>
              )}
              {isEditing && editTask === task.id ? null : (
                <img src={edit} className='ed pics' onClick={() => startEditing(task.id, task.text)} alt='edit' style={{ marginLeft: "30%", marginRight: "10px" }} />
              )}
              {isEditing && editTask === task.id ? null : (
                <img src={trash} className='tr pics' alt='remove' onClick={() => removeTask(task.id)} />
              )}
              <br />
              <hr />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoList;

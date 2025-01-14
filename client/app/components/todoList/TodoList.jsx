"use client"
import axios from "axios";
import { useEffect, useState } from "react";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);

  const [newTask, setNewTask] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);
  const [editText, setEditText] = useState("");
  const [counter, setCounter] = useState(1)

  const addTask = () => {
    if (newTask.trim() !== "") {
      axios.post("http://localhost:8000/api/addTask",{
        text: newTask,
        completed: false
      }).then(()=>{
        setCounter(prev => prev+1)
      })
      setNewTask("");
    }
  };

  const deleteTask = (id) => {
    axios.delete(`http://localhost:8000/api/deleteTask/${id}`).then(()=>{
      setCounter(prev => prev+1)
    })
  };

  const toggleComplete = (id) => {
    axios.put(`http://localhost:8000/api/complete`,{
      taskId: id,
      completed: true
    }).then(()=>{
      setCounter(prev => prev+1)
    })
  };

  const updateTask = (id) => {
    axios.put(`http://localhost:8000/api/updateTask`,{
      taskId: id,
      text: editText,
    }).then(()=>{
      setCounter(prev => prev+1)
    })
    setEditTaskId(null);
    setEditText("");
  };

  useEffect(()=>{
    axios.get("http://localhost:8000/api/getData")
    .then(res => setTasks(res.data))
  },[counter])

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
          className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"/>
        <button onClick={addTask}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          Add
        </button>
      </div>
  
      <ul>
        {tasks.map((task,num) => (
          <li
            key={num}
            className={`flex justify-between items-center mb-2 p-2 rounded-md ${task.completed ? "bg-green-100" : "bg-gray-100"}`}
          >
            {editTaskId === task._id ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="w-full p-2 border rounded-md"/>
                <button
                  onClick={()=>{updateTask(task._id)}}
                  className="bg-green-500 text-white px-4 py-2 ml-2 rounded-md hover:bg-green-600">
                  Save
                </button>
              </>
            ) : (
              <>
                <span className={`flex-1 ${task.completed ? "line-through text-gray-500" : ""}`}>
                  {task.text}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleComplete(task._id)}
                    className={`px-3 py-1 rounded-md ${
                      task.completed
                        ? "bg-yellow-500 text-white hover:bg-yellow-600"
                        : "bg-green-500 text-white hover:bg-green-600"
                    }`}
                  >
                    {task.completed ? "Undo" : "Complete"}
                  </button>
                  <button
                    onClick={() => {
                      setEditTaskId(task._id);
                      setEditText(task.text);
                    }}
                    className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTask(task._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;

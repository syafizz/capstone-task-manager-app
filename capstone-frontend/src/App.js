import React, { useEffect, useState } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "./api";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const res = await getTasks();
    setTasks(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createTask(title);
    setTitle("");
    loadTasks();
  };

  const toggleComplete = async (task) => {
    await updateTask(task._id, { completed: !task.completed });
    loadTasks();
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    loadTasks();
  };

  return (
    <div className="container">
      <h1>Taskify ✅</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add new task"
          required
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {tasks.map((t) => (
          <li key={t._id} className={t.completed ? "done" : ""}>
            <span onClick={() => toggleComplete(t)}>{t.title}</span>
            <button onClick={() => handleDelete(t._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

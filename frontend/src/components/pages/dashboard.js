import { useEffect, useState } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import React from 'react';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Baja");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/login");

      try {
        const res = await api.get("/tasks", { headers: { "x-auth-token": token } });
        setTasks(res.data);
      } catch (error) {
        alert("Error al obtener tareas");
      }
    };
    fetchTasks();
  }, []);

  const handleAddTask = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const res = await api.post(
        "/tasks",
        { title, description, priority },
        { headers: { "x-auth-token": token } }
      );
      setTasks([...tasks, res.data]);
      setTitle("");
      setDescription("");
      setPriority("Baja");
    } catch (error) {
      alert("Error al agregar tarea");
    }
  };

  return (
    <div>
      <h2>Dashboard - Mis Tareas</h2>
      <form onSubmit={handleAddTask}>
        <input type="text" placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <input type="text" placeholder="Descripción" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="Baja">Baja</option>
          <option value="Media">Media</option>
          <option value="Alta">Alta</option>
        </select>
        <button type="submit">Agregar Tarea</button>
      </form>

      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.title} - {task.priority}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;

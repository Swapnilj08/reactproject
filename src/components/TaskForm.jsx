import { useEffect, useState } from "react";
import { createTask, updateTask, getTaskById } from "../services/taskService";
import { useNavigate, useParams } from "react-router-dom";
import React from "react";

const TaskForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({ title: "", details: "", dueDate: "", status: "Pending" });
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      getTaskById(id).then((res) => setTask(res.data));
    }
  }, [id]);

  const validateForm = () => {
    if (!task.title || !task.details || !task.dueDate) {
      setError("All fields are required.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (id) await updateTask(id, task);
    else await createTask(task);

    navigate("/");
  };

  return (
    <div>
      <h2>{id ? "Update Task" : "Create Task"}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Details"
          value={task.details}
          onChange={(e) => setTask({ ...task, details: e.target.value })}
          required
        />
        <input
          type="date"
          value={task.dueDate}
          onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
          required
        />
        <select value={task.status} onChange={(e) => setTask({ ...task, status: e.target.value })}>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
        <button type="submit">{id ? "Update Task" : "Create Task"}</button>
      </form>
      <button onClick={() => navigate("/")}>Back</button>
    </div>
  );
};

export default TaskForm;

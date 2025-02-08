import { useEffect, useState } from "react";
import { createTask, updateTask, getTaskById } from "../services/taskService";
import { useNavigate, useParams } from "react-router-dom";
import React from "react";
import { FormGroup } from "react-bootstrap";

const TaskForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      getTaskById(id).then((res) => setTask(res));
      console.log(task);
      
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
    console.log(id);
    
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
      <FormGroup>
        <input
          style={{ width: "50%",margin:"10px" }}
          className="form-control"
          type="text"
          placeholder="Title"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          required
        />
        </FormGroup>
        <FormGroup>
        <textarea
          style={{ width: "50%",margin:"10px" }}
          className="form-control"
          placeholder="Details"
          value={task.description}
          onChange={(e) => setTask({ ...task, details: e.target.value })}
          rows={4}
          required
        />
        </FormGroup>
        <FormGroup>
        <input
          style={{ width: "20%",margin:"10px" }}
          className="form-control"
          type="date"
          value={task.dueDate}
          onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
          required
        />
        </FormGroup>
        <FormGroup>
        <select style={{ width: "20%",margin:"10px" }} value={task.status} onChange={(e) => setTask({ ...task, status: e.target.value })}>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
        
        <button className="btn btn-primary" type="submit" onClick={(e)=>handleSubmit(e)}>{id ? "Update Task" : "Create Task"}</button>
        </FormGroup>
      </form>
      <button style={{ width: "50%",margin:"10px" }} className="btn btn-primary" onClick={() => navigate("/")}>Back</button>
    </div>
  );
};

export default TaskForm;

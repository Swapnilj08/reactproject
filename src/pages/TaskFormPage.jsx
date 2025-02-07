import { useState } from "react";
import { createTask, updateTask } from "../services/taskService";
import { useNavigate, useParams } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import React from "react";

const TaskFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({ title: "", details: "", status: "Pending" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) await updateTask(id, task);
    else await createTask(task);
    navigate("/");
  };

  return (
    // <form onSubmit={handleSubmit}>
    //   <input
    //     type="text"
    //     placeholder="Title"
    //     value={task.title}
    //     onChange={(e) => setTask({ ...task, title: e.target.value })}
    //   />
    //   <textarea
    //     placeholder="Details"
    //     value={task.details}
    //     onChange={(e) => setTask({ ...task, details: e.target.value })}
    //   />
    //   <button type="submit">{id ? "Update" : "Create"} Task</button>
    // </form>
    <>
    <TaskForm/>
    </>
  );
};

export default TaskFormPage;

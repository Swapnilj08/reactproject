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

  {console.log(id)}
  return (
    

    <>
    <TaskForm id={id}/>
    </>
  );
};

export default TaskFormPage;

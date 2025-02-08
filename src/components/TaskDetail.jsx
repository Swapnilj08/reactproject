import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTaskById } from "../services/taskService";
import React from "react";
const TaskDetail = ({task}) => {
  const { id } = useParams();
  //const [task, setTask] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getTaskById(id).then((res) => setTask(res.data));
  }, [id]);

  if (!task) return <p>Loading...</p>;

  return (
    <div>
      <h2>{task.title}</h2>
      <p><strong>Details:</strong> {task.details}</p>
      <p><strong>Due Date:</strong> {task.dueDate}</p>
      <p><strong>Status:</strong> {task.status}</p>
      <button onClick={() => navigate(`/task/update/${task.id}`)}>Update</button>
      <button onClick={() => navigate("/")}>Back to List</button>
    </div>
  );
};

export default TaskDetail;

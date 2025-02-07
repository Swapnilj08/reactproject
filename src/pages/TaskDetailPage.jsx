import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTaskById } from "../services/taskService";
import TaskDetail from "../components/TaskDetail";
import React from "react";

const TaskDetailPage = () => {
  const { id } = useParams();
  const [task, setTask] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    getTaskById(id).then((res) => {
      console.log(res);
      
      setTask(res)});
  }, []);
  console.log(task);
  
  //if (!task) return <p>Loading...</p>;

  return (
    <div>
      {/* <h2>{task.title}</h2>
      <p>{task.details}</p>
      <p>Due: {task.dueDate}</p>
      <button onClick={() => navigate(`/task/update/${id}`)}>Update</button>
      <button onClick={() => navigate("/")}>Back to List</button>
       */}
       <TaskDetail task={task}/>
    </div>
  );
};

export default TaskDetailPage;

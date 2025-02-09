import { useEffect, useState, useContext } from "react";
import { fetchTasks, deleteTask } from "../services/taskService";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import TaskList from "../components/TaskList";
import React from "react";

const TaskListPage = () => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  
  
  useEffect(() => {
    fetchTasks().then((res) => {
      setTasks([res]);    
   })
  }, []);


  return (
    <div>

      <ul>
          {/* {console.log(tasks)
          } */}
      <TaskList tasks={tasks}/>
      </ul>
    </div>
  );
};

export default TaskListPage;

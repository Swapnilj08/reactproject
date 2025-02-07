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

  const handleDelete = async (id) => {
    await deleteTask(id);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div>
      {/* <h2>Task List</h2>
      <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={() => navigate("/task/create")}>Create Task</button> */}
      <ul>
        {/* {tasks
          .filter((task) => task.title.includes(search))
          .map((task) => (
            <li key={task.id}>
              {task.title} - {task.status}
              <button onClick={() => navigate(`/task/${task.id}`)}>View</button>
              <button onClick={() => handleDelete(task.id)}>Delete</button>
            </li>
          ))} */}
          {console.log(tasks)
          }
      <TaskList tasks={tasks}/>
      </ul>
    </div>
  );
};

export default TaskListPage;

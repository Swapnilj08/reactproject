import { useEffect, useState, useContext } from "react";
import { fetchTasks, deleteTask } from "../services/taskService";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import React from "react";

const TaskList = ({tasks}) => {
  const { user } = useContext(AuthContext);
  const [tasksList, setTasksList] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    setTasksList(tasks);
  },[tasks]);

  const handleDelete = async (id) => {
    const newTasks = tasksList.filter((task) => task.id !== id);  
    setTasksList(newTasks);
};
  const handleSearch = (task) => {
    task.map((task) => {
    return (
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description.toLowerCase().includes(search.toLowerCase())
    );
  });
  };

  const sortedTasks = () => {
    let sorted = [...tasksList];
    if (sortBy === "dueDate") {
      sorted.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    } else {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    }
    return sorted;
  };
  const filteredTasks = sortedTasks().filter(handleSearch);

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  return (
    <div>
      <h2>Task List</h2>
      <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select onChange={(e) => setSortBy(e.target.value)}>
        <option value="title">Sort by Title</option>
        <option value="dueDate">Sort by Due Date</option>
      </select>
      <button onClick={() => navigate("/task/create")}>Create Task</button>
       
        <>
            <table>
 <thead>
  <tr>
    <th>Title</th>
    <th>Details</th>
    <th>Due date</th>
    <th>Status</th>
    <th>Creator</th>
    <th>Actions</th>
  </tr>
  </thead>   
        {
          
          
          tasksList && tasksList.length > 0 && tasksList[0].map((task) => (
           
            
  <>
 {console.log(task)}
  <tr key={task.id}>
    <td>{task.title}</td>
    <td>{task.description}</td>
    <td>{new Date(task.dueDate).toLocaleDateString()}</td>
    <td>{task.status}</td>
    <td>{task.creator}</td>
    <td>
      <button onClick={() => navigate(`/task/${task.id}`)}>View</button>
      <button onClick={() => handleDelete(task.id)}>Delete</button>
    </td>
  </tr>
  </>
  
))
}
</table>
</>
<div>
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === Math.ceil(filteredTasks.length / tasksPerPage)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TaskList;

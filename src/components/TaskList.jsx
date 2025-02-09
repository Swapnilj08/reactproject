import { useEffect, useState, useContext } from "react";
import { fetchTasks, deleteTask } from "../services/taskService";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import React from "react";
import { Button } from "react-bootstrap";

const TaskList = ({ tasks }) => {
  console.log(tasks);
  
  const { user } = useContext(AuthContext);
  const [tasksList, setTasksList] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("title");

  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);
  const [currentTasks, setCurrentTasks] = useState([]);
  
  useEffect(() => {
    setTasksList(Array.isArray(tasks) ? tasks : [tasks]);
  }, [tasks]);

  console.log(tasksList);



  useEffect(() => {
    console.log("I executed");
    if (tasksList.length > 0) {
      const lastPostIndex = currentPage * postsPerPage;
      const firstPostIdx = lastPostIndex - postsPerPage;

      setCurrentTasks(tasksList[0].slice(firstPostIdx, lastPostIndex));
      
    }
  }, [tasksList, currentPage]);

  const handleDelete = async (id) => {
    const result = await deleteTask(id);
    
    console.log("delete result", result);
    setTasksList(Array.isArray(result)? tasks : [tasks]);
  };
  const handleSearch = (tasksList) => {
    tasksList.map((task) => {
      return (
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.description.toLowerCase().includes(search.toLowerCase())
      );
    });
  };
  console.log(sortBy);
  
  const sortedTasks = () => {
       console.log("sortTask called");
       
    let sorted = [...tasksList];
    if (sortBy === "dueDate") {
      sorted.sort((a, b) => new Date(a.dueDate) < new Date(b.dueDate));
    } else {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    }
    console.log(sorted);
    
    return sorted;
  };
  const filteredTasks = sortedTasks().filter(handleSearch);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  //console.log("YOHOHO Current Tasks", currentTasks);

  return (
    <div>
      <h2>Task List</h2>
      <input
        style={{ margin: "10px" }}
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button className="btn btn-primary" onClick={() => handleSearch(search)}>
        Search
      </button>
      <select
        style={{ margin: "10px" }}
        onChange={(e) => {setSortBy(e.target.value)
          sortedTasks;
        }}
      >
        <option value="title">Sort by Title</option>
        <option value="dueDate">Sort by Due Date</option>
      </select>
      <button
        className="btn btn-primary"
        onClick={() => navigate("/task/create")}
      >
        Create Task
      </button>

      <>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Details</th>
              <th scope="col">Due date</th>
              <th scope="col">Status</th>
              <th scope="col">Creator</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          {currentTasks &&
            currentTasks.length > 0 &&
            currentTasks.map((task) => (
              <>
                <tbody>
                <tr key={task.id}>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>{new Date(task.dueDate).toLocaleDateString()}</td>
                  <td>{task.status}</td>
                  <td>{task.creator}</td>
                  <td>
                    <Button
                      variant="btn btn-primary"
                      onClick={() => navigate(`/task/${task.id}`)}
                    >
                      View
                    </Button>
                    <span />{" "}
                    <Button
                      variant="btn btn-danger"
                      onClick={() => handleDelete(task.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
                </tbody>
              </>
            ))}
        </table>
      </>
      <div>
        <button
          onClick={() => {
            if (currentPage > 0) {
              setCurrentPage((prevPage) => prevPage - 1);
            }
          }}
          disabled={currentPage === 1}
          className="btn btn-primary"
        >
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button
          onClick={() => {
            setCurrentPage((prev) => prev + 1);
          }}
          className="btn btn-primary"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TaskList;

import axios from "axios";
import data from "../db.js";
import TaskList from "../components/TaskList.jsx";
import React from "react";

const API_URL = "http://localhost:8081/api/tasks";

export const fetchTasks = async () => {
  //console.log("fetch data", data);

  return data;

  // return await axios.get(`${API_URL}?userId=${userId}`);
};

export const getTaskById = async (id) => {
  //console.log(data);
  const userdata = data.find((task) => task.id === id);
  console.log(userdata);

  return userdata;
};

// export const createTask = async (taskData) => {
//   //return await axios.post(`${API_URL}/add`, taskData);
//   console.log("newTask Data", taskData);

//   const lastId = getLastId();
//   const newId = lastId + 1;
//   // const newData = data.map((d) => {
//   //     d.id == newId
//   //     d.title = taskData.title;
//   //     d.status = taskData.status;
//   //     d.description = taskData.description;
//   //     d.dueDate = taskData.dueDate;
//   // });
//   const newRecord=[...data, {id: newId, title: taskData.title, status: taskData.status, description: taskData.description, dueDate: taskData.dueDate}];
// console.log("newRecord", newRecord);

// }

// Function to add a new task
export const createTask = async (taskData) => {
  const lastId = getLastId();
  const newId = (parseInt(lastId) + 1).toString(); // Make sure to generate a unique ID

  // Add new record to the array in memory (simulate saving to a database)
  const newTask = {
    id: newId,
    title: taskData.title,
    status: taskData.status,
    description: taskData.description,
    dueDate: taskData.dueDate,
    createdAt: new Date().toISOString().split("T")[0], // Automatically set createdAt
  };

  // Add the new task to the data array (simulate adding to database)
  data.push(newTask);

  console.log("New Task Added:", newTask);
  console.log("Updated Task List:", data);

  return newTask; // Returning the new task for confirmation (optional)
};

export const updateTask = async (id, taskData) => {
  // return await axios.put(`${API_URL}/update/${id}`, taskData);
  const modifiedData = data.map((d) => {
    if (d.id == id) {
      d.title = taskData.title;
      d.status = taskData.status;
      d.description = taskData.description;
      d.dueDate = taskData.dueDate;
    }
    return d;
  });
  //console.log("UPDATED ARRAY", modifiedData);

  return modifiedData;
};

export const getLastId = () => {
  if (data.length === 0) {
    return 0; // If no records exist, return 0 as the last ID
  }
  const lastRecord = data[data.length - 1];
  return lastRecord.id;
};

export const deleteTask = (id, tasks) => {
  // Remove the task from the data array
  const updatedData = tasks[0].filter((task) => task.id !== id);

  // Update the data array
  // In a real-world scenario, you would probably persist this change via an API
  // Here we just update the array in memory for this example.
  // console.log("Updated Task List after Deletion:", updatedData);

  // Set the updated data array back to the data variable (in-memory update)
  // data.length = 0; // Clear the current data
  // data.push(...updatedData); // Push the updated data back into the array
  // console.log("i am deleted", data);

  //<TaskList updatedTasks={updatedData} />
  return updatedData; // Return the updated list
};

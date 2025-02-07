import axios from "axios";
import data from "../db.js"
const API_URL = "http://localhost:8081/api/tasks";

export const fetchTasks = async () => {
  console.log("fetch data",data);
  
  return data;

  // return await axios.get(`${API_URL}?userId=${userId}`);
};

export const getTaskById = async (id) => {
  //console.log(data);
  const userdata = data.find((task) => task.id === id);
  //console.log(userdata);
  
  return userdata;
};

export const createTask = async (taskData) => {
  return await axios.post(`${API_URL}/add`, taskData);
};

export const updateTask = async (id, taskData) => {
  return await axios.put(`${API_URL}/update/${id}`, taskData);
};

export const deleteTask = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};

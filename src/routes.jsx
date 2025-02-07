import { Routes, Route } from "react-router-dom";
import TaskListPage from "./pages/TaskListPage";
import TaskDetailPage from "./pages/TaskDetailPage";
import TaskFormPage from "./pages/TaskFormPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import React from "react";

const RoutesComponent = () => {
  return (
    
    
    <Routes>
      {console.log("routes")}
      <Route path="/" element={<TaskListPage />} />
      <Route path="/task/:id" element={<TaskDetailPage />} />
      <Route path="/task/create" element={<TaskFormPage />} />
      <Route path="/task/update/:id" element={<TaskFormPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>

  );
};

export default RoutesComponent;

import { BrowserRouter as Router } from "react-router-dom";
import RoutesComponent from "./routes";
import { AuthProvider } from "./context/AuthContext";
import React from "react";

function App() {
  return (
    <AuthProvider>
      
        <RoutesComponent />
      
    </AuthProvider>
  );
}

export default App;

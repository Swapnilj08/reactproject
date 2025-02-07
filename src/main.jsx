// import { createApp } from 'vue'
// import './style.css'
// import App from './App.vue'

// createApp(App).mount('#app')


import React from 'react';
import ReactDOM from 'react-dom/client';
//import './index.css';  // Optional for custom styling
import App from './App';
import { AuthProvider } from './context/AuthContext';  // Auth Context provider
import { BrowserRouter as Router } from 'react-router-dom';  // React Router

// Create root element for React DOM rendering
const rootElement = document.getElementById('app');

// Render the app with AuthProvider and Router wrapping
const root = ReactDOM.createRoot(rootElement);
root.render(
  <AuthProvider>
    <Router>
      <App />
    </Router>
  </AuthProvider>
);


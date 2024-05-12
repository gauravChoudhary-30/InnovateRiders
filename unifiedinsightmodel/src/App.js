import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./Login/Login.js";
import Signup from './Signup/Signup.js';
import Home from "./page/Home.js"
import AdminLogin from './Login/adminLogin.js';
import AdminRegister from './Signup/adminRegister.js';
import Dashboard from './page/Dashboard.js';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/adminLogin" element={<AdminLogin />} />
        <Route path="/adminRegister" element={<AdminRegister />} />
        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>
    </Router>
  );
}

export default App;
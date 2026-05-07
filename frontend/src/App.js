import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import VolunteerList from './pages/VolunteerList';
import VolunteerDetail from './pages/VolunteerDetail';
import UserProfile from './pages/UserProfile';
import Report from './pages/Report';

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, [token]);

  const handleLogin = (userData, token) => {
    setUser(userData);
    setToken(token);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <Router>
      <Header user={user} onLogout={handleLogout} />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register onLogin={handleLogin} />} />
          <Route path="/volunteers" element={<VolunteerList />} />
          <Route path="/volunteers/:id" element={<VolunteerDetail user={user} />} />
          <Route path="/profile/:id" element={<UserProfile user={user} />} />
          <Route path="/report/:id" element={<Report user={user} />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;

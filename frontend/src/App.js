import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Auth from './components/Auth';
import Products from './components/Products';
import ProductForm from './components/ProductForm';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <Router>
      <Navbar isAuthenticated={!!token} logout={logout} />
      <Routes>
        <Route path="/signup" element={<Auth isLogin={false} />} />
        <Route path="/login" element={<Auth isLogin={true} setToken={(token) => {
          setToken(token);
          localStorage.setItem('token', token);
        }} />} />
        <Route path="/products" element={<><Products token={token} /><ProductForm token={token} /></>} />
        <Route path="/" element={<h1>Welcome to the Flask-React App!</h1>} />
      </Routes>
    </Router>
  );
};

export default App;

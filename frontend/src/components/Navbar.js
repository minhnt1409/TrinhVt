import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isAuthenticated, logout }) => (
  <nav>
    <Link to="/">Home</Link>
    {isAuthenticated ? (
      <>
        <Link to="/products">Products</Link>
        <button onClick={logout}>Logout</button>
      </>
    ) : (
      <>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
      </>
    )}
  </nav>
);

export default Navbar;

import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from './AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
  return (
    <nav>
    <h1>Auth App</h1>
    <div>
      {user ? (
        <>
          <span>Welcome, {user.username}!</span>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </>
      )}
    </div>
  </nav>
  )
}

export default Navbar
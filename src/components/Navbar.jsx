import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const currentUser = JSON.parse(localStorage.getItem("user"))
  const userEmail = currentUser.email
  console.log(currentUser);
  return (
    <nav className="main-nav">
      <ul>
        <li><Link to="/">Home</Link></li>
        {currentUser ? <li><h2>Welcome Back {currentUser.email}</h2></li> : null}
        {currentUser ? 
          <li><Link to="/admin-page">Admin Page</Link></li> : 
          <li><Link to="/">Register</Link></li>
        }

        
      </ul>
    </nav>
  )
}

export default Navbar
import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const currentUser = useContext(AuthContext)
  console.log(currentUser);

  const logout = () => {
      // const { currentUser } = useContext(LOGOUT)
    }
  return (
    <nav className="main-nav">
      {
        currentUser ? 
        <ul className="registered-links">
          <li><Link to="/">Home</Link></li>
          <li><h2>Welcome Back {currentUser?.email}</h2></li> 
          <li><button onClick={logout}>Logout</button></li>
          <li><Link to="/admin-page">Admin Page</Link></li>
        </ul> :
        <ul className="unregistered-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/">Register</Link></li>
        </ul>
      }
      
      
    </nav>
  )
}

export default Navbar
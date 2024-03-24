import React from 'react'
import { Link } from 'react-router-dom'

import Login from '../components/Login'

const Home = () => {

  const currentUser = JSON.parse(localStorage.getItem("user"))
  return (
    <div className="home">
      {currentUser ? '' :
        <div className="login-and-registration">
           <div className="login-section">
            <h2>Login To Get Started</h2>
            <Login />
          </div>
          <div className="create-user-section">
            <h2>Don't have an accout? Create A New Account Here</h2>
          <button>
            <Link to="/register">Register</Link>
          </button>
          </div>
        </div>
       
      }
      
      
    </div>
  )
}

export default Home
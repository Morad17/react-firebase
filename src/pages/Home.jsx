import React from 'react'
import CreateUser from '../components/CreateUser'
import Login from '../components/Login'

const Home = () => {
  return (
    <div className="home">
      <h1 className="title">Home</h1>
      <div className="login-section">
        <h2>Login To Get Started</h2>
        <Login />
      </div>
      <div className="create-user-section">
        <h2>Don't have an accout? Create A New Account Here</h2>
        <CreateUser />
      </div>
      
    </div>
  )
}

export default Home
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import Login from '../components/Login'
import explore from '../assets/icons/explore.png'
import rate from '../assets/icons/rate.png'
import upload from '../assets/icons/upload.png'
import bannerImg from '../assets/images/banner-background-cropped.jpg'
import Register from './Register'


const Banner = () => {

  const currentUser = JSON.parse(localStorage.getItem("user"))
  const [loginActive, SetLoginActive ] = useState(null)
  
  return (
    <div className="banner">
        <div className="icon-group">
          <div className="icons">
            <div className="group">
              <img src={explore} alt="" />
              <h3>Explore</h3>
            </div>
            
            <p>Explore A Large Gallery Of Travel Photoss From Around The World</p>
          </div>
          <div className="icons">
            <div className="group">
              <img src={rate} alt="" /> 
              <h3>Rate</h3>
            </div>
           
            <p>Rate Your Favourite Photo's And Build Your Own Collection</p>
          </div>
          <div className="icons">
            <div className="group">
              <img src={upload} alt="" />
              <h3>Upload</h3>
            </div>
            
            <p>Upload Your Own Photo's For Others To Admire</p>
          </div>
        </div>
        <div className="banner-image">
          <img className="" src={bannerImg} alt="sunset" />
        </div>
        
        <div className="login-group">
          {
            loginActive && <h2>Login To Get Started</h2>
          }
          
          {currentUser ? "" :
          <div className="login-and-register">
              <div className="form-selector">
                <h3 className={loginActive ? "" : "active"} onClick={() => SetLoginActive(null)}>Register</h3>
                <hr />
                <h3 className={loginActive ? "active" : ""} onClick={() => SetLoginActive(true)}>Login</h3>
              </div>
              {loginActive ?
                    <Login /> : <Register />
              }
            </div>
            }
        </div>
        
      </div>
  )
}

export default Banner
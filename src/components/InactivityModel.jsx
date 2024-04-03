import React, { useContext, useEffect, useState } from 'react'

import { getAuth, signOut } from 'firebase/auth'
import { AuthContext } from '../context/AuthContext'

const InactivityModel = () => {

const [inactiveModal, setInactiveModal] = useState(null)
const [logoutModal, setLogoutModal] = useState(null)
const [resetTimer, setResetTimer] = useState(null)
const [countdown, setCountdown] = useState(10)

const {dispatch} = useContext(AuthContext)
const currentUser = JSON.parse(localStorage.getItem("user"))

const checkForInactivity = () => {
    const expireTime = localStorage.getItem("expireTime")
      if (expireTime < Date.now() && currentUser) 
      setInactiveModal(true)
        if (!resetTimer)
        setTimeout(() => {
            loggingOut()
            },10000)
  }

  const loggingOut = () => {
    setLogoutModal(true)
    setTimeout(()=> {
      const auth = getAuth()
      signOut(auth)
      dispatch({type:"LOGOUT", payload:currentUser})
      
    }, 5000)
  }
    
  const updateLogoutTime = () => {
    const logoutTime = Date.now() + 5000
    localStorage.setItem("expireTime", logoutTime)
  }
  //Check for Inactivity//
  useEffect(()=> {
    if (currentUser){
        const interval = setInterval(() => {
      checkForInactivity();
    }, 10000)
    return () => clearInterval(interval)}
  }, [currentUser])
  //Listens and Updates Activity
  useEffect(()=> {
    updateLogoutTime()

    window.addEventListener("click", updateLogoutTime)
    window.addEventListener("keypress", updateLogoutTime)
    window.addEventListener("scroll", updateLogoutTime)
    window.addEventListener("mouseover", updateLogoutTime)

  //refresh event listeners //
    return () => {
      window.removeEventListener("click", updateLogoutTime)
      window.removeEventListener("keypress", updateLogoutTime)
      window.removeEventListener("scroll", updateLogoutTime)
      window.removeEventListener("mouseover", updateLogoutTime)
    }
  }, [])
  //countdown to Logout
  useEffect(()=> {
    if (logoutModal){
      const timer = setInterval( ()=> 
        { if (countdown > 0 ) setCountdown(countdown - 1)
          else {
            clearInterval(timer)
          }
        }, 10000)}
    }, [logoutModal])
  return (
    <div className="inactivity-modal">
        {inactiveModal ? 
        <div className="logout-modal">
        You have been inactive for 30 minutes,
        You Will Be logged out in {countdown} seconds.
        If you need more time click here:
        <button>Stay Logged In</button>
      </div> : ""
      }
      { logoutModal? 
        <div className="logout-modal">
        You have been Logged Out
      </div> : ""
      }
    </div>
  )
}

export default InactivityModel
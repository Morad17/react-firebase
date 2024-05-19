import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Link } from 'react-router-dom'
import { getAuth, signOut } from 'firebase/auth'
import { useNavigate } from 'react-router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../Firebase';

const Navbar = () => {
  const [usersName, setUsersName] = useState([])
  const {dispatch} = useContext(AuthContext)
  const navigate = useNavigate()
  const currentUser = JSON.parse(localStorage.getItem("user"))
  useEffect(()=> {
    const userId = JSON.parse(localStorage.getItem("user")).uid
    const fetchUser = async () => {
      const user = await getDoc(doc(db,`users/${userId}`))
      setUsersName(user.data())
    }
    fetchUser()
    
  },[])

  const logout = () => {
      console.log(currentUser);
      const auth = getAuth()
      signOut(auth)
      dispatch({type:"LOGOUT", payload:currentUser})
      localStorage.clear()
      navigate("/")
    }
  return (
    <nav className="main-nav">
      {
        usersName ? 
        <ul className="registered-links">
          <li>
            <Link to="/"className="link" >Home</Link>
          </li>
          <li>
            <h2 className="nav-banner">Welcome Back {usersName?.firstName + ' ' + usersName?.lastName}</h2>
          </li> 
          <li className="link" onClick={logout}>
            Logout
          </li>
          <li>
            <Link className="link" to="/admin-page">Admin Page</Link>
          </li>
        </ul> :
        <ul className="unregistered-links">
          <li>
            <Link className="link" to="/">Home</Link>
          </li>
          <li>
            <Link className="link" to="/">Register</Link>
          </li>
        </ul>
      }
      
      
    </nav>
  )
}

export default Navbar
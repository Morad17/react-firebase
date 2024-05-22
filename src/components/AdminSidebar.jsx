import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import StockIcon from '../assets/images/stock-profile-icon.png'
import AllPhotos from '../assets/icons/all-photos.png'
import Dashboard from '../assets/icons/dashboard.png'
import AddPhoto from '../assets/icons/new-photo.png'
import Favourite from '../assets/icons/favourite.png'
import { db } from '../Firebase'
import { collection, doc, getDoc, query, where } from 'firebase/firestore'

const AdminSidebar = () => {

const currentUser = JSON.parse(localStorage.getItem("user"))
const [userData, setUserData] = useState({})

useEffect(()=> {
    const fetchPhoto = async () => {
        const docRef = doc(db, "users",currentUser.uid)
        const userDoc = await getDoc(docRef)
        const docData = userDoc.data()
        setUserData({
            "firstName": docData.firstName, "lastName": docData.lastName, "urlLink":docData.profPic
        })
    }
    fetchPhoto()
}, [])

  return (
    <nav className="admin-sidebar">
        <div className="profile-photo">
            <img src={userData.urlLink? userData.urlLink:StockIcon} alt="Profile Picture" />
            <h3 className="user-name">{userData.firstName} {userData.lastName}</h3>
        </div>
        <ul>
            <li className="sidebar-links">
                <Link to="/admin-page">
                <img className="dashboard-icon"src={Dashboard} alt="" />
                    Dashboard</Link></li>
            <li className="sidebar-links">
                <Link>
                <img className="all-photos-icon" src={AllPhotos} alt="" />
                    All Photos</Link></li>
            <li className="sidebar-links">
                <Link>
                <img className="add-photos-icon"src={AddPhoto} alt="" />  
                Add Photos</Link></li>
            <li className="sidebar-links">
                <Link>
                <img className="favourite-icon"src={Favourite} alt="" />
                    Favourite Photos</Link></li>
        </ul>
    </nav>
  )
}

export default AdminSidebar
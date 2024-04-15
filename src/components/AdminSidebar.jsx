import React from 'react'
import { Link } from 'react-router-dom'

import StockIcon from '../assets/images/stock-profile-icon.png'
import AllPhotos from '../assets/icons/all-photos.png'
import Dashboard from '../assets/icons/dashboard.png'
import AddPhoto from '../assets/icons/new-photo.png'
import Favourite from '../assets/icons/favourite.png'

const AdminSidebar = () => {
  return (
    <nav className="admin-sidebar">
        <div className="profile-photo">
            <img src={StockIcon} alt="" />
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
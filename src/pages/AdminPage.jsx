import React from 'react'
import AddData from '../components/AddData'
import AdminSidebar from '../components/AdminSidebar'
import { Link } from 'react-router-dom'

import downloaded from '../assets/icons/downloaded.png'

const AdminPage = () => {
  return (
    <div className="admin-page">
      <AdminSidebar />
      <div className="dashboard">
        <section className="impressions">
          <div className="views-card card-vi">
            <h3 className="card-title">All Views</h3>
            <img src="" alt="" />
            <p>100</p>
            <Link><p>All Photos</p></Link>
          </div>
          <div className="likes-card card-vi">
            <h3 className="card-title card-vi">All Views</h3>
            <img src={downloaded} alt="" />
            <p>100</p>
            <Link><p>All Photos</p></Link>
          </div>
          <div className="subs-card card-vi">
            <h3 className="card-title card-vi">All Views</h3>
            <img src="" alt="" />
            <p>100</p>
            <Link><p>All Photos</p></Link>
          </div>
        </section>
        <section className="top-picture">
        </section>
        <section className="stat-graph">

        </section>
        <section className="user-metrics">
          <div className="photos-submitted-card">
              test
            </div>
          <div className="photos-downloaded-card">

          </div>
          <div className="photos-shared-card">

          </div>
        </section>
      </div>
    </div>
  )
}

export default AdminPage
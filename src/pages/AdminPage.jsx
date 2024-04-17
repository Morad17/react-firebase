import React from 'react'
import AddData from '../components/AddData'
import AdminSidebar from '../components/AdminSidebar'

const AdminPage = () => {
  return (
    <div className="admin-page">
      <AdminSidebar />
      <div className="dashboard">
        <section className="impressions">
          <h3>Stats</h3>
          <div className="photos-submitted-card">
            test
          </div>
          <div className="views-card"></div>
          <div className="likes-card"></div>
          <div className="subs-card"></div>
        </section>
        <section className="top-picture">
        </section>
        <section className="stat-graph">

        </section>
      </div>
    </div>
  )
}

export default AdminPage
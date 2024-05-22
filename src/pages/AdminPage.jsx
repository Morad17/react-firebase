import React, { useEffect, useState } from 'react'
import AddPhoto from '../components/AddPhoto'
import AdminSidebar from '../components/AdminSidebar'
import { Link } from 'react-router-dom'
import { collection, getDocs, doc, deleteDoc, getDoc, where } from 'firebase/firestore'
import { db } from '../Firebase'
//image imports //
import topPhoto from '../assets/images/stock-top-picture.JPG'
import downloaded from '../assets/icons/downloaded.png'
import dashboard from '../assets/icons/dashboard.png'
import likes from '../assets/icons/likes.png'
import subs from '../assets/icons/subs.png'
import views from '../assets/icons/views.png'
import uploaded from '../assets/icons/uploaded.png'
import shared from '../assets/icons/shared.png'
import StatGraph from '../components/StatGraph'




const AdminPage = () => {

  const user = JSON.parse(localStorage.getItem("user"))
  const [metrics, setMetrics ] = useState([])

  /// Get Total Views On All User Photos //
  useEffect(()=> {
    const getTotalViews = async() => {
      try {
        const res = await getDoc(doc(db, "totalUserViews", user.uid))
        const data = res.data()
        setMetrics({"totalViews":data.views})
      } catch (err) {
        console.log(err);
      }
    }
    getTotalViews()
  }, [])

  // / Get Total Likes On All User Photos ///
  useEffect(()=> {
    const getTotalLikes = async () => {
      const list = []
      try {
        const qData = await getDocs(collection(db, "liked"), where("author", "==",user.uid))
        qData.forEach((doc)=> {
          list.push(doc.data())
        })
        setMetrics(prev => ({...prev,"totalLikes":list.length}))
        console.log(metrics);
      } catch (err) {
        console.log(err);
      }
    }
    getTotalLikes()
  },[])
  /// Get Total Followers ///
  useEffect(()=> {
   const getTotalFollows = async () => {
    const list = []
    try {
      const qData = await getDocs(collection(db, user.uid))
      qData.forEach((doc)=> {
        list.push(doc.data())
      })
      list.forEach((doc)=> {
        if (doc.following === false){
          return doc
        }
      })
      console.log(list);
    } catch (err) {
      console.log(err);
    }
   }
   getTotalFollows()
  },[])


  return (
    <div className="admin-page">
      <AdminSidebar />
      <div className="dashboard">
        <section className="impressions">
          <div className="views-card card-vi">
            <div className="top-line">
              <h3 className="card-title">Total Views</h3>
              <div className="shape"></div>
              <img src={views} alt="" />
            </div>
            <p className="card-number">{metrics.totalViews}</p>
            <span>
              <Link><p className="card-link">All Photos</p></Link>
            </span>
          </div>
          <div className="likes-card card-vi">
            <div className="top-line">
              <h3 className="card-title">Total Likes</h3>
              <img src={likes} alt="" />
            </div>
           
            <p className="card-number">{metrics.totalLikes}</p>
            <Link><p className="card-link">All Photos</p></Link>
          </div>
          <div className="subs-card card-vi">
            <div className="top-line">
              <h3 className="card-title">Total Followers</h3>
            <img src={subs} alt="" />
            </div>
            
            <p className="card-number">100</p>
            <Link><p className="card-link">All Photos</p></Link>
          </div>
        </section>
        <section className="stats-row">
          <div className="top-picture-card">
            <h3>Name</h3>
            <img src={topPhoto} alt="" />
            <div className="top-photo-info">
              <p className="views"><span>100</span> Views</p>
              <p className="likes"><span>200</span> Likes</p> 
            </div>
            <div className="top-photo-info-2">
              <p className="downloads"><span>50</span>Downloads</p>
              <p className="shared"><span>50 </span>Shares</p>
            </div>
          </div>
          <div className="graph">
            <StatGraph />
          </div>
        </section> 
          
        <section className="user-metrics">
          <div className="photos-uploaded-card card-vi">
            <div className="top-line">
              <h3 className="card-title">Photos Uploaded</h3>
              <img src={uploaded} alt="" />
            </div>
            <p className="card-number">100</p>
            <Link><p className="card-link">All Photos</p></Link>
            </div>
          <div className="photos-downloaded-card card-vi">
            <div className="top-line">
              <h3 className="card-title">Photos Downloaded</h3>
              <img src={downloaded} alt="" />
            </div>
            <p className="card-number">100</p>
            <Link><p className="card-link">All Photos</p></Link>
          </div>
          <div className="photos-shared-card card-vi">
            <div className="top-line">
              <h3 className="card-title">Photos Shared</h3>
              <img src={shared} alt="" />
            </div>
            <p className="card-number">100</p>
            <Link><p className="card-link">All Photos</p></Link>
          </div>
        </section>
      </div>
    </div>
  )
}

export default AdminPage
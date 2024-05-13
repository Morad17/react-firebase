import { collection, doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { db } from '../Firebase'

import stockPhoto from '../assets/images/stock-profile-icon.png'

const PhotoPage = ({photoId}) => {

  const locate = useLocation()

  const [photoData, setPhotoData] = useState([])
  const [userData, setUserData] = useState([])

  // Fetching Photo, Details & Created By in one UseEffect //
  useEffect(()=> {
    const fetchPhotoData = async () => {
      try{
        const res = await getDoc(doc(db, "photo", photoId))
        return res.data()
        
      } catch (err) {
        console.log(err);
      }
    }
    const fetchUserData = async (userId) => {
      try{
      const res = await getDoc(doc(db, `users/${userId}`))
      return res.data()
    } catch(err) {
      console.log(err);
    }
    }
    const fetchBoth = async () => {
      const tempPhotoData = await fetchPhotoData()
      const tempUserData = await fetchUserData(tempPhotoData.user)
      setPhotoData(tempPhotoData)
      setUserData(tempUserData)
      console.log(tempUserData);
    } 
    fetchBoth()
  },[])

  return (
    <div className="photo-page">
      <div className="wrapper"></div>
      <div className="photo-details">
        <div className="top-row">
          {
            userData ? 
            <div className="user-details">
              <img className="user-picture" src={userData.profPic} alt="" />
              <span>
                <p>{userData.firstName} {userData.lastName}</p>
                <button>Follow</button>
              </span>
            </div>
          : 
            <div className="user-details">
              <img className="user-picture" src={stockPhoto} alt="" />
              <span>
                <p>Anonymous</p>
              </span>
            </div>
              }
          
          <div className="photo-links">
          <button>Like</button>
          <button>Subscribe</button>
          <button>Download</button>
          </div> 
        </div>
        <div className="middle-row">
          <img src={photoData.imageLink} alt="" />
        </div>
        
        <div className="bottom-row">
          <div className="photo-metrics">
            <span>Views {}</span>
            <span>Downloads {}</span>
          </div>
          <div className="photo-info">
            <p>{photoData.dateTaken}</p>
            <p>{photoData.location}</p>
            <p>{photoData.name}</p>
          </div>
          
        </div>
        
      </div>
    </div>
  )
}

export default PhotoPage
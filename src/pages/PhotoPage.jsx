import { collection, doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { db } from '../Firebase'

const PhotoPage = ({photoId}) => {

  const locate = useLocation()

  const [photoData, setPhotoData] = useState([])
  const [userData, setUserData] = useState([])
  const [userId, setUserId] = useState(null)

  useEffect(()=> {
    const fetchPhotoData = async () => {
      try{
        const qPhoto = await getDoc(doc(db, "photo", photoId))
        setPhotoData(qPhoto.data())
        setUserId(photoData.user)
      } catch (err) {
        console.log(err);
      }
    }
    fetchPhotoData()
  },[])
  useEffect(()=> {
    const fetchUserData = async () => {
      if (userId) {
        try{
        const qUser = await getDoc(doc(db, "users", userId))
        setUserData(qUser.data())
      } catch(err) {
        console.log(err);
      }
      }
      
    }
    fetchUserData()
  }, [userId])
           {/* dateTaken
            imageLink
            location
            name
            storedName
            title
            user*/}

  return (
    <div className="photo-page">
      <div className="wrapper"></div>
      <div className="photo-details">
        <div className="top-row">
          <div className="user-details">
            <img className="user-picture" src={userData.profPic} alt="" />
            <span>
              <p>{userData.firstName} {userData.lastName}</p>
              <button>Follow</button>
            </span>
            
          </div>
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
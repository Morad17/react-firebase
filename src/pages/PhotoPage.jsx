import { collection, doc, getDoc, setDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { db } from '../Firebase'

import stockPhoto from '../assets/images/stock-profile-icon.png'
import cross from '../assets/icons/cross.png'
import { Link } from 'react-router-dom'

const PhotoPage = ({photoId}) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [photoData, setPhotoData] = useState([])
  const [userData, setUserData] = useState([])

  const user = JSON.parse(localStorage.getItem("user"))
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
    } 
    fetchBoth()
  },[])
  const followHandler = async () => {
    const authorId = userData.id
    const userId = user.uid
    
    // try{
    //   await setDoc(doc(db, `followers`,userId), {"follow": authorId})
    // } catch(err){
    //   console.log(err);
    // }
  }


  const returnHome = () => {
    const pageId = document.getElementById("photo-page")
    return pageId.style.display = "none"
  }

  return (
    <div className="photo-page" id="photo-page">
      <div className="wrapper"></div>
      <div className="photo-details">
        <div className="top-row">
          <div className="exit-section">
            <Link className="exit-link" onClick={()=> returnHome()}>
              <img src={cross} alt="" className="cross" />
            </Link>
          </div>
          
          <div className="content-section">
            { userData ? 
                <div className="user-details">
                  <img className="user-picture" src={userData.profPic} alt="" />
                  <span>
                    <p>{userData.firstName} {userData.lastName}</p>
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
            <button onClick={() => followHandler()}>Follow</button>
            <button>Download</button>
            </div> 
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
import { collection, doc, getDoc, setDoc } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { db } from '../Firebase'

import stockPhoto from '../assets/images/stock-profile-icon.png'
import cross from '../assets/icons/cross.png'
import { Link } from 'react-router-dom'
import { PhotoContext } from '../context/PhotoContext'

const PhotoPage = ({photoId}) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [photoData, setPhotoData] = useState([])
  const [userData, setUserData] = useState([])
  const [following, setFollowing] = useState()
  const [liked, setLiked ] = useState()
  const [dloadWarning, setDloadWarning] = useState(false)
  // Current User
  const user = JSON.parse(localStorage.getItem("user"))
  // Fetching Photo, Details & Created By //
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
  //Get Following Data Of Pic Author //
  useEffect(()=> {
    const fetchFollowData = async () => {
      const authorId = userData.uid
      const userId = user.uid
      try {
        const res = await getDoc(doc(db, `followers/${userId}`))
        const follow = res.data([authorId])[authorId]
        setFollowing(follow)
      } catch (err) {
        console.log(err);
      }
    }
    if (user) {
      fetchFollowData()
    }
    
  },[user])
  //Get Liked Data Of Pic Author //
  useEffect(()=> {
    const fetchLikedData = async () => {
      const authorId = userData.uid
      const userId = user.uid
      try {
        const res = await getDoc(doc(db, `liked/${userId}`))
        const liked = res.data([authorId])[authorId]
        setLiked(liked)
      } catch (err) {
        console.log(err);
      }
    }
    if (user) {
      fetchLikedData()
    }
    
  },[user])
  // Download Warning Handler //
  useEffect(()=> {
    const warningAlert = () => {
      setDloadWarning(true)
      const interval = setTimeout(()=>{
        setDloadWarning(false)
      }, 3000)
      return () =>clearTimeout(interval)
    }
    if (dloadWarning){
       warningAlert()
    }
   
  }, [dloadWarning])
  // Follow or Unfollow Picture Author //
  const followHandler = async () => {
    const authorId = userData.uid
    const userId = user.uid
    if (following){
      try{
        await setDoc(doc(db, `followers`,userId), {[authorId]: false})
        setFollowing(false)
      } catch(err){
        console.log(err);
      }
    } else {
      try{
        await setDoc(doc(db, `followers`,userId), {[authorId]: true})
        setFollowing(true)
      } catch(err){
        console.log(err);
      }
    }
  }
   // Like or Unlike Picture Author //
   const likeHandler = async () => {
    const authorId = userData.uid
    const userId = user.uid
    if (liked){
      try{
        await setDoc(doc(db, `liked`,userId), {[authorId]: false})
        setLiked(false)
      } catch(err){
        console.log(err);
      }
    } else {
      try{
        await setDoc(doc(db, `liked`,userId), {[authorId]: true})
        setLiked(true)
      } catch(err){
        console.log(err);
      }
    }
    console.log(liked);
  }
    //Download Warining Initiator //
    const downloadWarning = () => {
      setDloadWarning(true)
    }
    // Return to Home Screen //
  const returnHome = () => {
    // const pageId = document.getElementById("photo-page")
    // return pageId.style.display = "none"
    // navigate("/home")
    setPhotoClicked(false)
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
            {
              liked ? 
              <button className="like-button"onClick={() => likeHandler()}>Liked</button>
              : <button onClick={() => likeHandler()}>Like</button>
            }
            {
              following ? 
              <button className="follow-button"onClick={() => followHandler()}>Following</button>
              : <button onClick={() => followHandler()}>Follow</button>
            }
            {
              user ? <a href={photoData.imageLink} download><button >Download</button></a>
              : <div className="">
                  <button onClick={() =>downloadWarning()}>Download</button>
                  { dloadWarning && <p className="" id="download-warning">You Must Be Logged In To Download Pictures</p>}
                </div>
                
            }
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
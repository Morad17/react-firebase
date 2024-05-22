import React,{useEffect, useState} from 'react'
import { collection, getDocs, doc, deleteDoc, updateDoc, increment, getDoc, setDoc} from 'firebase/firestore'
import { db } from '../Firebase'
import { Link } from 'react-router-dom'

import stockPhoto from '../assets/images/stock-profile-icon.png'
import cross from '../assets/icons/cross.png'

const PhotoGallery = () => {

    const [photos, setPhotos] = useState([])
    const [photoId, setPhotoId] = useState('')
    const [photoClicked, setPhotoClicked ] = useState(null)
    const [photoData, setPhotoData] = useState([])
    const [userData, setUserData] = useState([])
    const [following, setFollowing] = useState()
    const [liked, setLiked ] = useState()
    const [dloadWarning, setDloadWarning] = useState(false)

    const user = JSON.parse(localStorage.getItem("user"))
    //Get Photo Data //
    useEffect(()=> {
      const fetchData = async () => {
          let list = []
          try{
          const querySnapshot = await getDocs(collection(db, "photo"))
          querySnapshot.forEach((doc)=> {
              list.push({id: doc.id, ...doc.data()})
          })
          setPhotos(list)
          } catch (err){
          console.log(err);
          }}
          fetchData()
    }, [])
    // Brings up Photo Page Details When Clicked //
    const photoPage = (id, user) => {
      
      setPhotoId(id)
      fetchBoth(id)
      updateViews(id, user)
     }
    // Deals With Viewing Photo When Clicked//
    const updateViews = async (id, user) => {
      const qSnap = await getDoc(doc(db, `views`, id))
      //if viewed increment view by 1 //
      if (qSnap.exists()){
        try {
          await updateDoc(doc(db, "views", id), {
            views: increment(1)
          })
        } catch (err) {
          console.log(err);
        }
      } else {
        //Add new doc with one view //
       try{
        await setDoc(doc(db,`views`, id), {views: 1})
       } catch(err) {
        console.log(err);
       }
      }
      // Records Day of view //
      const qSnap2 = await getDoc(doc(db, `views`, id))
      const date = new Date()
      const formatDate = date.getMonth() + "-" + date.getFullYear()
      if (qSnap2.exists()){
        try {
          await updateDoc(doc(db, "views", id), {
            [formatDate]: increment(1)
          })
        } catch (err) {
          console.log(err);
        }
      } else {
        //Add new doc with date //
       try{
        await setDoc(doc(db,`views`, id), {[formatDate]: 1})
       } catch(err) {
        console.log(err);
       }
      }
      //aggregates total views from picture user views //
      const qSnap3 = await getDoc(doc(db, `totalUserViews`, user))
      if (qSnap3.exists()){
        try {
          await updateDoc(doc(db, `totalUserViews`, user), {
            views: increment(1)
          })
        } catch (err) {
            console.log(err)
        }
      } else {
        try {
          await setDoc(doc(db, `totalUserViews`, user), {views:1})
        } catch (err) {
          console.log(err);
        }
      }
    }
     // Deals With Photo Download Metrics//
     const downloadListener = async () => {
      const id = photoId
      const user = photoData.user
      const qSnap = await getDoc(doc(db, `downloads`, id))
      //if Downloaded increment view by 1 //
      if (qSnap.exists()){
        try {
          await updateDoc(doc(db, "downloads", id), {
            downloads: increment(1)
          })
        } catch (err) {
          console.log(err);
        }
      } else {
        //Add new doc with one download //
       try{
        await setDoc(doc(db,`downloads`, id), {downloads: 1})
       } catch(err) {
        console.log(err);
       }
      }
      //Update downloads over time //
      const qSnap2 = await getDoc(doc(db, `downloads`, id))
      const date = new Date()
      const formatDate = date.getMonth() + "-" + date.getFullYear()
      if (qSnap2.exists()){
        try {
          await updateDoc(doc(db, "downloads", id), {
            [formatDate]: increment(1)
          })
        } catch (err) {
          console.log(err);
        }
      } else {
        //Add new doc with one download //
       try{
        await setDoc(doc(db,`downloads`, id), {[formatDate]: 1})
       } catch(err) {
        console.log(err);
       }
      }
      //aggregates total downloads of each picture //
      const qSnap3 = await getDoc(doc(db, `totalDownloads`, user))
      if (qSnap3.exists()){
        try {
          await updateDoc(doc(db, `totalDownloads`, user), {
            downloads: increment(1)
          })
        } catch (err) {
            console.log(err)
        }
      } else {
        try {
          await setDoc(doc(db, `totalDownloads`, user), {downloads:1})
        } catch (err) {
          console.log(err);
        }
      }
    }
    //// Photo Page /////

      const fetchPhotoData = async (id) => {
        try{
          const res = await getDoc(doc(db, "photo", id))
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
      const fetchBoth = async (id) => {
        const tempPhotoData = await fetchPhotoData(id)
        const tempUserData = await fetchUserData(tempPhotoData.user)
        setPhotoData(tempPhotoData)
        setUserData(tempUserData)
        setPhotoClicked(true)
      } 
    //Get Following Data Of Pic Author //
      const fetchFollowData = async () => {
        const authorId = userData.uid
        const userId = user.uid
        try {
          const res = await getDoc(doc(db, `followers/${userId}`))
          const follow = res.data([authorId])[authorId]
          setFollowing(follow.following)
        } catch (err) {
          console.log(err);
        }
      }
      if (user) {
        fetchFollowData()
      }
    //Get Liked Data Of Pic Author //
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
    // Download Warning Handler //
    // useEffect(()=> {
    //   const warningAlert = () => {
    //     setDloadWarning(true)
    //     const interval = setTimeout(()=>{
    //       setDloadWarning(false)
    //     }, 3000)
    //     return () =>clearTimeout(interval)
    //   }
    //   if (dloadWarning){
    //      warningAlert()
    //   }
     
    // }, [dloadWarning])
    // Follow or Unfollow Picture Author //
    const followHandler = async () => {
      const authorId = userData.uid
      const userId = user.uid
      const date = new Date()
      const formatDate = date.getMonth() + "-" + date.getFullYear()
      const followTrue = {[authorId]:{
        following: true,
        date:formatDate}}
      const followFalse = {[authorId]:{
        following: false}}
      
      if (following){
        try{
          // await setDoc(doc(db, `followers`,userId), {[authorId]: false})
          await setDoc(doc(db, `followers`, userId), followFalse)
          setFollowing(false)
        } catch(err){
          console.log(err);
        }
      } else {
        try{
          await setDoc(doc(db, `followers`,userId), followTrue)
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
      setPhotoClicked(false)
    }
  return (


    <div className="photo-gallery">
    { 
      photos?.map((photo, key) => {
        return (
          <div className="photo" key={key} >
            <Link onClick={() => photoPage(photo.id, photo.user)}>
              <img src={photo.imageLink} alt="" />
            </Link>
          </div>
        ) 
        }) 
    }
    {
      photoClicked&&
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
                user ? <a href={photoData.imageLink} download={photoData.uid} target="_blank" 
                onClick={()=> downloadListener(photoData.uid, photoData.user)}><button >Download</button></a>
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
    }
    
  </div>
   
  )
}

export default PhotoGallery
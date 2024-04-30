import { collection, doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { db } from '../Firebase'

const PhotoPage = ({}) => {

  const locate = useLocation()
  const id = locate.pathname.split('/')[2]

  const [photoData, setPhotoData] = useState([])

  useEffect(()=> {
    const fetchPhotoData = async () => {
      let list = []
      try{
        const qPhoto = await getDoc(doc(db, "photo", id))
        setPhotoData(qPhoto.data())
      } catch (err) {
        console.log(err);
      }
    }
    fetchPhotoData()
  },[])

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
        <h3 className="photo-name">{photoData.name}</h3>  
        <img src={photoData.imageLink} alt="" />
        <p>{photoData.date}</p>
        <p>{photoData.location}</p>
        <p>{}</p>
      </div>
    </div>
  )
}

export default PhotoPage
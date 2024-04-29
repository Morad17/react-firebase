import { collection, doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { db } from '../Firebase'

const PhotoPage = () => {

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
  return (
    <div>{console.log(photoData)}Path</div>
  )
}

export default PhotoPage
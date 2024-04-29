import React,{useEffect, useState} from 'react'
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore'
import { db } from '../Firebase'
import { Link } from 'react-router-dom'


const PhotoGallery = () => {

  const [photoPageOn, setPhotoPageOn] = useState(false)

    const [photos, setPhotos] = useState([])
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
          console.log(photos)
    }, [])


  return (
    <div className="photo-gallery">
        { 
          photos?.map((photo, key) => {
            return (
              <div className="photo" key={key} >
                <img src={photo.imageLink} alt="" />
                <Link to={`/photo-page/${photo.storedName}`}>Photo</Link>
                
               
              </div>
            ) 
            }) 
        }
    </div>
  )
}

export default PhotoGallery
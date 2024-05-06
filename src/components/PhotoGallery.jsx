import React,{useEffect, useState} from 'react'
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore'
import { db } from '../Firebase'
import { Link } from 'react-router-dom'
import PhotoPage from '../pages/PhotoPage'


const PhotoGallery = () => {

    const [photos, setPhotos] = useState([])
    const [photoId, setPhotoId] = useState('')
    const [ photoClicked, setPhotoClicked ] = useState(false)
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

    const photoPage = (id) => {
      setPhotoClicked(true)
      setPhotoId(id)
     }
  return (

    
    <div className="photo-gallery">
        { 
          photos?.map((photo, key) => {
            return (
              <div className="photo" key={key} >
                <Link onClick={() => photoPage(photo.id)}>
                  <img src={photo.imageLink} alt="" />
                </Link>
              </div>
            ) 
            }) 
        }
        {
          photoClicked&&<PhotoPage photoId={photoId}/>
        }
        
    </div>
  )
}

export default PhotoGallery
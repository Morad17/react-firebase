import React,{useEffect, useState} from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../Firebase'


const PhotoGallery = () => {

    const [photos, setPhotos] = useState([])
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

  return (
    <div className="photo-gallery">
        { 
          photos?.map((photo, key) => {
            return (
              <div className="photo" key={key}>
                <img src={photo.imageLink} alt="" />
              </div>
            ) 
            })
        }
    </div>
  )
}

export default PhotoGallery
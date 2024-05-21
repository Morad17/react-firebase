import React,{useEffect, useState} from 'react'
import { collection, getDocs, doc, deleteDoc, updateDoc, increment, getDoc, setDoc} from 'firebase/firestore'
import { db } from '../Firebase'
import { Link } from 'react-router-dom'
import PhotoPage from '../pages/PhotoPage'


const PhotoGallery = () => {

    const [photos, setPhotos] = useState([])
    const [photoId, setPhotoId] = useState('')
    const [ photoClicked, setPhotoClicked ] = useState(false)
    const [viewed, setViewed ] = useState()
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

    const photoPage = (id, user) => {
      setPhotoClicked(true)
      setPhotoId(id)
      updateViews(id, user)
      //reset photo page after closed //
      const pageId = document.getElementById("photo-page")
      if (pageId) pageId.style.display = "flex"
     }
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
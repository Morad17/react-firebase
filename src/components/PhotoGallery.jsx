import React,{useEffect, useState} from 'react'
import { collection, getDocs, doc, deleteDoc, updateDoc, increment, getDoc } from 'firebase/firestore'
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
      const pageId = document.getElementById("photo-page")
      pageId.style.display = "flex"
      setPhotoId(id)
      updateViews(id, user)
     }
    const updateViews = async (id, user) => {
      const docSnap = await getDoc(doc(db, `metrics/views/${id}`, "test"))
        if(docSnap.exists()) return console.log("it exists");
        else return console.log("doesnt exist");
      
      // const subRef = doc(db, "metrics", id)
      // await updateDoc(subRef, {
      //   views: increment(1)
      // }) 
      // console.log("done") 
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
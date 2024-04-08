import React, { useContext, useEffect, useState } from 'react'
import Banner from '../components/Banner'
import { getAuth } from 'firebase/auth'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../Firebase'

const Home = () => {

  const [photos, setPhotos] = useState([])

  const auth = getAuth()

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
      }
      
    }
    
    fetchData()
  }, [])

  // const imageLinks = photos?.filter(p => p.imageLink)

  return (
    
    <div className="home">
      <Banner />
      <div className="all-photos">
        { 
          photos?.map((photo, key) => {
            return (
              <div className="" key={key}>
            <img src={photo.imageLink} alt="" />
            </div>
            ) 
            })
        }
        
      </div>
    </div>
  )
}

export default Home
import React, { useContext, useEffect, useState } from 'react'
import Banner from '../components/Banner'
import { getAuth } from 'firebase/auth'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../Firebase'

const Home = () => {

  const [photos, getPhotos] = useState()

  const auth = getAuth()

  useEffect(()=> {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, ))
    }
  }, [])

  return (
    
    <div className="home">
      <Banner />
      <div className="all-photos">
        {

        }
      </div>
    </div>
  )
}

export default Home
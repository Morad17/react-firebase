import React, { useContext, useEffect, useState } from 'react'
import Banner from '../components/Banner'

import PhotoGallery from '../components/PhotoGallery'

const Home = () => {

 

  // const imageLinks = photos?.filter(p => p.imageLink)

  return (
    
    <div className="home">
      <Banner />
      <PhotoGallery />
    </div>
  )
}

export default Home
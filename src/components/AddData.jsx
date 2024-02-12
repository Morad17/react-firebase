import React, { useState } from 'react'

const AddData = () => {

    const [ pictureData, setPictureData ] = useState({
        name: '',
        location: '',
        dateTaken: null,
    })
    const [picture, setPicture] = useState()

    const setData = (e) => {
        setPictureData(prev => ({...prev, [e.target.name]:e.target.value }))
        console.log(pictureData);
    }

    const handlePicture = e => {
        setPicture(e.target.files[0])
    }

    const handleSubmit = () => {
        
    }   

  return (

    <div className="add-data">
        <h1>Add My Picture</h1>
        <form onSubmit={handleSubmit}>
            <label >Upload Image</label>
            <input type="file" name="photo" accept="image/*" onChange={handlePicture}/>
            <label >Title</label>          
            <input type="text" name="name" onChange={setData}/>
            <label >Location</label>
            <input type="text" name="place" required onChange={setData}/>
            <label >Date Taken</label>
            <input type="date" name="dateTaken" onChange={setData}/>
            <button type="submit">Submit</button>
        </form>
    </div>
  )
}

export default AddData
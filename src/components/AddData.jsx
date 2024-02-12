import React, { useState } from 'react'

const AddData = () => {

    const [ pictureData, setPictureData ] = useState({
        name: '',
        place: '',
        dateTaken: null,
    })

    const setData = (e) => {
        setPictureData(prev => ({...prev, [e.target.name]:e.target.value }))
        console.log(pictureData);
    }

  return (

    <div className="add-data">
        <h1>Add My Picture</h1>
        <form action="">            
            <input type="text" name="name" onChange={setData}/>
            <input type="text" name="place" required onChange={setData}/>
            <input type="date" name="dateTaken" onChange={setData}/>
        </form>
    </div>
  )
}

export default AddData
import React, { useState } from 'react'
import { collection, addDoc, doc, setDoc } from "firebase/firestore"; 

import { auth, db } from '../Firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";

const CreateUser = () => {

    const [ userData, setUserData ] = useState({
        name: '',
        email: '',
        password: '',

        location: '',
        dateTaken: null,
    })
    

    const setUser = (e) => {
        setPictureData(prev => ({...prev, [e.target.name]:e.target.value }))
        console.log(pictureData);
    }

    const handlePicture = e => {
        setPicture(e.target.files[0])
    }

    const handleSubmit = async (e) =>  {
        e.preventDefault()
        try{
            const res = await createUserWithEmailAndPassword(auth, email, password)
            await addDoc(collection(db, "cities"), {
                        name: "Los Angeles",
                        state: "CA",
                        country: "USA"
                    });
        } catch (err){
            console.log(err);
        }
        
        console.log(res);
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

export default CreateUser 
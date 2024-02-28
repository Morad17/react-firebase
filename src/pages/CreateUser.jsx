import React, { useState } from 'react'
import { collection, addDoc, doc, setDoc } from "firebase/firestore"; 

import { db } from '../Firebase';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const CreateUser = () => {

    const [ userData, setUserData ] = useState({
        username: '',
        email: '',
        password: '',
    })
    

    const setData = (e) => {
        setUserData(prev => ({...prev, [e.target.name]:e.target.value }))
        console.log(userData);
    }

    const handleSubmit = async (e) =>  {
        e.preventDefault()
        try{
            await createUserWithEmailAndPassword(
                userData.username, userData.email, userData.password)
            await setDoc(collection(db, "cities"), {
                        ...userData
                    });
        } catch (err){
            console.log(err);
        }
        
    }   

  return (

    <div className="add-data">
        <h1>Add My Picture</h1>
        <form onSubmit={handleSubmit}>
            <label >Username</label>
            <input type="text" name="username" onChange={setData}/>
            <label >Password</label>          
            <input type="text" name="password" onChange={setData}/>
            <label >Email</label>
            <input type="text" name="email" onChange={setData}/>
            <button type="submit">Submit</button>
        </form>
    </div>
  )
}

export default CreateUser 
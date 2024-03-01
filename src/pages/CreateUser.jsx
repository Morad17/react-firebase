import React, { useState } from 'react'
import { collection, addDoc, doc, setDoc } from "firebase/firestore"; 

import { db } from '../Firebase';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router';

const CreateUser = () => {

    const [ userData, setUserData ] = useState({
        username: '',
        email: '',
        password: '',
    })
    
    const auth = getAuth()
    const navigate = useNavigate()

    const successMessage = () => {
       document.getElementsByClassName("success-message")[0].style.display = "flex"
    }
    const setData = (e) => {
        setUserData(prev => ({...prev, [e.target.name]:e.target.value }))
        console.log(userData);
    }

    const handleSubmit = async (e) =>  {
        e.preventDefault()
        try{
            await createUserWithEmailAndPassword( auth, userData.email, userData.password)
            .then(successMessage())
            .then(navigate('/'))
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
        <div className="success-message">Successfully Created An Account!</div>
    </div>
  )
}

export default CreateUser 
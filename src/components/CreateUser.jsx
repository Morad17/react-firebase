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
            const res = await createUserWithEmailAndPassword( auth, userData.email, userData.password)
            await setDoc(doc(db, "newuser", res.user.uid), {
                name: res.user.uid,
                email: res.user.email
            })
            console.log(res.user.uid);
            // .then(successMessage())
        } catch (err){
            console.log(err);
        }
    }   

  return (

    <div className="create-user">
        <form onSubmit={handleSubmit}>
            <label >Username</label>
            <input type="text" name="username" onChange={setData}/>
            <label >Password</label>          
            <input type="text" name="password" onChange={setData}/>
            <div className="second-row">
                 <label >Email</label>
            <input type="text" name="email" onChange={setData}/>
            <label >Display Picture</label>
            <input type="file" name="display-picture"/>
            </div>
           
            <button type="submit">Submit</button>
            
           
        </form>
        <div className="success-message">Successfully Created An Account!</div>
    </div>
  )
}

export default CreateUser 
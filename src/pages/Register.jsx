import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { collection, addDoc, doc, setDoc, serverTimestamp } from "firebase/firestore"; 
import { db } from '../Firebase';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const Register = () => {

  const [ userData, setUserData ] = useState({
        username: '',
        email: '',
        password: '',
    })
  const [message, setMessage ] = useState("")
    
  const auth = getAuth()
  const navigate = useNavigate()
  const successMessage = () => {
      document.getElementsByClassName("success-message")[0].style.display = "flex"
  }
  const errorMessage = () => {

  }
  const setData = (e) => {
      setUserData(prev => ({...prev, [e.target.name]:e.target.value }))
      console.log(userData);
  }
  const handleSubmit = async (e) =>  {
      e.preventDefault()
      try{
          const res = await createUserWithEmailAndPassword( auth, userData.email, userData.password)
          await setDoc(doc(db, "users", res.user.uid), {
              name: res.user.uid,
              email: res.user.email,
              timestamp: serverTimestamp()
          })
          console.log(res.user.uid);
          setMessage("success")
          setTimeout(()=> {
            navigate("/")
          },3000)
      } catch (err){
          console.log(err);
          setMessage("error")
      }
  }   
  return (
    <div className="create-user">
        <form onSubmit={handleSubmit}>
            <label >Username</label>
            <input required type="text" name="username" onChange={setData}/>
            <label >Password</label>          
            <input required type="text" name="password" onChange={setData}/>
            <div className="second-row">
                 <label >Email</label>
            <input required type="text" name="email" onChange={setData}/>
            <label >Display Picture</label>
            <input required type="file" name="display-picture"/> 
            </div>
           
            <button type="submit">Submit</button>
            
           
        </form>
        <div className="message">
          {message === "error" ? <div>Error Creating User!</div> : message === "success" ? <div>Successfully Created User</div> : null
          }</div>
    </div>
  )
}

export default Register
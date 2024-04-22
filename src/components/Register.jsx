import React, { useState, useMemo } from 'react'
import { useNavigate } from 'react-router';
import Select from 'react-select'
import countryList from 'react-select-country-list'
import { collection, addDoc, doc, setDoc, serverTimestamp } from "firebase/firestore"; 
import { db } from '../Firebase';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


const Register = () => {

  const [ userData, setUserData ] = useState({
        uid: '',
        firstName: '',
        surname: '',
        country: '',
        email: '',
        password: '',
    })
  const [country, setCountry] = useState()
  const [message, setMessage ] = useState("")

  const options = useMemo(()=> countryList().getData(), [])
    
  const auth = getAuth()
  const navigate = useNavigate()

  const setData = (e) => {
      setUserData(prev => ({...prev, [e.target.name]:e.target.value }))
      console.log(userData);
  }
const countryHandler = val => {
  const countryName = val.label
  setCountry(countryName)
  console.log(country);
  setUserData(prev => ({...prev, country:countryName}) )
  console.log(userData);
}

  const handleSubmit = async (e) =>  {
      e.preventDefault()
      try{
          const res = await createUserWithEmailAndPassword( auth, userData.email, userData.password)
          await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              firstName: userData.firstName,
              lastName: userData.surname,
              country: userData.country,
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
          setTimeout(()=> {
            navigate("/")
          },3000)
      }
  }   
  return (
    <div className="register-form">
        <form onSubmit={handleSubmit}>
          <div className="row-2">
            <div className="name-row">
              <label >First Name</label>
              <input required type="text" name="firstName" onChange={setData}/>
            </div>
            <div className="name-row gap">
              <label >Last Name</label>
              <input required type="text" name="surname" onChange={setData}/>
            </div>
          </div>
          <div className="row">
            <label >Password</label>          
            <input required type="password" name="password" onChange={setData}/>
          </div>
          <div className="row">
            <label >Email</label> 
            <input required type="text" name="email" onChange={setData}/>
          </div>
          <div className="row">
            <label >Country</label>
            <Select className="country-selector" required options={options} value={country} onChange={(val)=> countryHandler(val)} /> 
          </div> 
          <div className="row">
           <label >Add A Display Picture</label>
            <input className="upload-input" required type="file" name="display-picture"/> 
          </div>
          <div className="submit-row">
            <button className="submit-button" type="submit">Submit</button>
          </div>
           
            
            
           
        </form>
        <div className="message">
          {message === "error" ? <div>Error Creating User!</div> : message === "success" ? <div>Successfully Created User</div> : null
          }</div>
    </div>
  )
}

export default Register
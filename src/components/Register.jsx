import React, { useState, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router';
import Select from 'react-select'
import countryList from 'react-select-country-list'
import { collection, addDoc, doc, setDoc, serverTimestamp } from "firebase/firestore"; 
import { db, auth, storage } from '../Firebase';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


const Register = () => {

  const [ userData, setUserData ] = useState({
        uid: '',
        firstName: '',
        surname: '',
        country: '',
        email: '',
        password: '',
        profPic: '',
        profPicName:''
    })
  const [pictureFile, SetPictureFile ] = useState()
  const [pictureName, setPictureName ] = useState()
  const [percent, setPercent] = useState()
  const [country, setCountry] = useState()
  const [message, setMessage ] = useState("")

  const options = useMemo(()=> countryList().getData(), [])
  const auth = getAuth()
  const navigate = useNavigate()

  //Set Users Data //
  const setData = (e) => {
      setUserData(prev => ({...prev, [e.target.name]:e.target.value }))
  }
  //Set Country //
  const countryHandler = val => {
    const countryName = val.label
    console.log(country);
    setUserData(prev => ({...prev, country:countryName}) )
    console.log(userData);
  }
  //Set Picture File // 
  const handlePicture = (e) => {
    SetPictureFile(e.target.files[0])
    console.log(pictureName);
  }

//Uploading Photo to firestore //
useEffect(()=> {
  const uploadImage = () => {
      
    
      const storedName = pictureFile.name + new Date().getTime() 
      console.log(storedName)
      const storageRef = ref(storage, `profile-photo/${storedName}`)
      const uploadTask = uploadBytesResumable(storageRef, pictureFile)
       
      uploadTask.on('state_changed',
          (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log('Upload is ' + progress + '% done');
              setPercent(progress);
              switch (snapshot.state) {
              case 'paused':
                  console.log('Upload is paused');
                  break;
              case 'running':
                  console.log('Upload is running');
                  break;
              default:
                  break;
              }
          }, 
          (error) => {
              console.log(error)
          }, 
          () => {
              // Handle successful uploads on complete //
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setUserData((prev)=> ({...prev, 
                  profPic: downloadURL,
                  profPicName: storedName,
              }))})
          },
          console.log(userData, percent)
          )
      }
  pictureFile && uploadImage()
  }, [pictureFile])


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
              timestamp: serverTimestamp(),
              profPic: userData.profPic,
              profPicName:userData.profPicName
          })
          console.log(res.user.uid);
          setMessage("success")
          setTimeout(()=> {
            setMessage("")
            navigate("/")
          },3000)
      } catch (err){
          console.log(err);
          setMessage("error")
          setTimeout(()=> {
            setMessage("")
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
            <Select className="country-selector" required options={options} value={country} onChange={countryHandler} /> 
          </div> 
          <div className="row">
           <label >Add A Display Picture</label>
            <input className="upload-input" required type="file" name="display-picture" onChange={handlePicture}/> 
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
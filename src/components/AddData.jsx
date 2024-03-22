import React, { useEffect, useState } from 'react'
import { collection, addDoc, doc, setDoc } from "firebase/firestore"; 
import { ref, uploadBytes, uploadBytesResumable } from "firebase/storage";

import {  db, getStorage } from '../Firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";

const AddData = () => {

    const [ pictureData, setPictureData ] = useState({
        name: '',
        location: '',
        dateTaken: null,
    })
    const [picture, setPicture] = useState()

    useEffect(()=> {
        const uploadImage = () => {
            const uniqueName = new Date().getTime() + picture.name
            const storageRef = ref(storage, uniqueName)
            const uploadTask = uploadBytesResumable(storageRef. picture)

            uploadTask.on('state_changed', 
                (snapshot) => {
                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
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
                    // Handle unsuccessful uploads
                }, 
                () => {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    });
                }
                )}
        }, [picture])

    const setData = (e) => {
        setPictureData(prev => ({...prev, [e.target.name]:e.target.value }))
        console.log(pictureData);
    }

    const handlePicture = e => {
        setPicture(e.target.files[0])
    }

    const handleSubmit = async (e) =>  {
        e.preventDefault()
        try{
            addDoc(collection(db, "cities"), {
                        name: "Los Angeles",
                        state: "CA",
                        country: "USA"
                    });
        } catch (err){
            console.log(err);
        }
        
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
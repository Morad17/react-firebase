import React, { useEffect, useState } from 'react'
import { collection, addDoc, doc, setDoc, serverTimestamp } from "firebase/firestore"; 
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

import {  auth, db, storage } from '../Firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";

const AddData = () => {

    const [ pictureData, setPictureData ] = useState({
        name: '',
        location: '',
        dateTaken: null,
        imageLink: '',
        user: ''
    })
    const [pictureFile, setPictureFile] = useState()
    const [percent, setPercent] = useState(null)
    const [uid, setUid] = useState('')

    useEffect(()=> {
        const uploadImage = () => {
            const uniqueName = pictureData.name + new Date().getTime()
            const storageRef = ref(storage, uniqueName)
            const metadata = {customMetadata:{'user': pictureData.user}}
            const uploadTask = uploadBytesResumable(storageRef, pictureFile, metadata)

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
                    // Handle successful uploads on complete
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                   setPictureData((prev)=> ({...prev, imageLink:downloadURL}))
                    });
                },
                console.log(pictureData, percent)
                )}
        uploadImage()
        }, [pictureFile])
    useEffect(()=> {
        const user = JSON.parse(localStorage.getItem("user"))
        setPictureData({...pictureData, user:user.uid })
    }, [])
    

    const setData = (e) => {
        setPictureData(prev => ({...prev, [e.target.name]:e.target.value }))
        console.log(pictureData);
    }

    const handlePicture = e => {
        setPictureFile(e.target.files[0])
    }

    const handleSubmit = async (e) =>  {
        e.preventDefault()
        try{
            const res = await addDoc(collection(db, "photo"), {
                        ...pictureData
                    });
            console.log(res);
        } catch (err){
            console.log(err);
        }
        
    }   

  return (

    <div className="add-data">
        <h1>Add My Picture</h1>
        <form onSubmit={handleSubmit}>
            <label >Upload Image</label>
            <input required type="file" name="photo" accept="image/*" onChange={handlePicture}/>
            <label >Title</label>          
            <input required type="text" name="name" onChange={setData}/>
            <label >Location</label>
            <input required type="text" name="location" onChange={setData}/>
            <label >Date Taken</label>
            <input required type="date" name="dateTaken" onChange={setData}/>
            <button className="submit-button" disabled={percent !== null && percent < 100} type="submit">Submit</button>
        </form>
    </div>
  )
}

export default AddData
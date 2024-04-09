import React, { useEffect, useState } from 'react'
import { collection, addDoc, doc, setDoc, serverTimestamp } from "firebase/firestore"; 
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

import {  auth, db, storage } from '../Firebase';

const AddData = () => {

    const [ pictureData, setPictureData ] = useState({
        title: '',
        location: '',
        dateTaken: null,
        imageLink: '',
        user: ''
    })
    const [pictureFile, setPictureFile] = useState()
    const [percent, setPercent] = useState(null)
    const [succModal, setSuccModal] = useState(null)

    //Uploading Photo to firestore //
    useEffect(()=> {
        const uploadImage = () => {
            const user = JSON.parse(localStorage.getItem("user"))
            const storedName = pictureData.title + new Date().getTime()
            const storageRef = ref(storage, `holiday-photos/${storedName}`)
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
                    setPictureData((prev)=> ({...prev, 
                        imageLink:downloadURL, 
                        storedName:storedName,
                        user:user.uid
                    }))})
                },
                console.log(pictureData, percent)
                )
            }
        uploadImage()
        }, [pictureFile])

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
            successModal()
            console.log(res);
        } catch (err){
            console.log(err);
        }
        
    }

    const successModal = () => {
        setSuccModal(true)
        const timer =  setTimeout(() => {
            setSuccModal(null)
        }, 2000)
        return () => clearTimeout(timer)
    }

  return (

    <div className="add-data">
        <h1>Add My Picture</h1>
        <form onSubmit={handleSubmit}>
            <div className="group">
                <label >Upload Image</label>
                <input required type="file" name="photo" accept="image/*" 
                    onChange={handlePicture}/>
            </div>
            <div className="group">
                <label >Title</label>          
                <input required type="text" name="name" onChange={setData}/>
            </div>
            <div className="group">
                <label >Location</label>
                <input required type="text" name="location" onChange={setData}/>
            </div>
            <div className="group">
                <label >Date Taken</label>
                <input required type="date" name="dateTaken" onChange={setData}/>
            </div>
            <button className="submit-button" disabled={percent !== null && percent < 100} type="submit">Submit</button>
        </form>
        {   succModal ? 
            <div className="success-modal">
            {pictureData.user.email} You have Successfully Added {pictureData.name} to the Gallery!
            </div> : ""
        }
    </div>
  )
}

export default AddData
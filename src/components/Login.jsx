import React, { useContext, useState } from 'react'
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseConfig } from '../Firebase'
import { useNavigate } from 'react-router';
import { AuthContext } from '../context/AuthContext';

const Login = () => {

    const [error, setError ] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()
    
    const {dispatch} = useContext(AuthContext)
    const currentUser = JSON.parse(localStorage.getItem("user"))

    const handleLogin = (e) => {
        e.preventDefault()
        initializeApp(firebaseConfig)
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            dispatch({type:"LOGIN", payload:user})
         })
        .catch((error) => {
            console.log(error);
            setError(true)    
            setTimeout(()=> {
            setError(null)
          },1500)
        });
        navigate("/")
    }

  return (
    <div className="login-form">
        <form onSubmit={handleLogin}>
            <div className="row">
                <label htmlFor="">Email</label>
                <input type="email" placeholder="email" onChange={e => setEmail(e.target.value)} />
            </div> 
            <div className="row">
                <label htmlFor="">Password</label>
                <input type="password" placeholder="password" onChange={e => setPassword(e.target.value)}/>
            </div>
            <div className="submit-row">
                <button className="submit-button" type="submit">Submit</button>
            </div>
            
            {error && <div>Email or Password Incorrect</div>}
        </form>
    </div>
  )
}

export default Login
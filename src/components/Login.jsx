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


    const handleLogin = (e) => {
        e.preventDefault()
        initializeApp(firebaseConfig)
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            dispatch({type:"LOGIN", payload:user})
            console.log(user.email);
            navigate("/")
        })
        .catch((error) => {
            console.log(error);
            setError(true)    
            
        });
    }

  return (
    <div className="login">
        <form onSubmit={handleLogin}>
            <input type="email" placeholder="email" onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder="password" onChange={e => setPassword(e.target.value)}/>
            <button type="submit">Submit</button>
            {error && <div>Email or Password Incorrect</div>}
        </form>
    </div>
  )
}

export default Login
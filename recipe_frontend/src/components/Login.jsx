import React, { useState } from 'react';
import { initializeApp } from "firebase/app";
import {app} from '../utils/firebase.js'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import '../App.css'
import {Link} from 'react-router-dom'
import Honey from '../assets/Honey.jpeg'
const auth = getAuth(app); 

function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Sign up the user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // User successfully signed up! 
      const user = userCredential.user;
      console.log('User created:', user.uid); 
      // You can redirect the user to a different page or perform other actions here.

    } catch (error) {
      // Handle errors
      setErrorMessage(error.message);
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className="signup-container">
      <div className="form-container">
        <h2>SIGN UP</h2>
        {errorMessage && <div className="error-message">{errorMessage}</div>} 
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder='Email'
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder='Password'
            />
          </div>
        <Link to='/home'>  <button type="submit" className="signup-button">SIGN UP</button></Link>
        </form>
        {/* Optional: Add social login buttons here */}
      </div>
     <img src={Honey} alt="" className='side'/>
     <div className="square"></div>
    </div>
  );
}

export default SignUpForm;
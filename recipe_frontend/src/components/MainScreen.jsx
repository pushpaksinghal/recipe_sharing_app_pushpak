import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import '../Home.css';
import cook from '../assets/cooking.png';
import plus from '../assets/plus.png';
import profile from '../assets/profile.png';
import About from './about.jsx';


import Category from './Category.jsx'; // Import Category component
import Form from './Form.jsx'

import { auth } from '../utils/firebase.js';
import { onAuthStateChanged } from 'firebase/auth';

function Home() {
  const [user, setUser] = useState(null); // Initialize user state
  
  
  // Add Recipe  
  const [showCategory, setShowCategory] = useState(false); // State to toggle Category visibility
  const [showForm, setFormCategory] = useState(false); // state to toggle form visibility

  const [category,setCategory]  =useState("other")  // State will store category selected  

  //Function will b esend as prop to category component
  const categoryHandled = (element) =>{
    console.log("category handle work")
    setCategory(element)
    setShowCategory(false)
    setFormCategory(true)
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user); // Set user if authenticated
      } else {
        setUser(null); // Set user to null if not authenticated
      }
    });
  }, []);

  // Function to toggle the visibility of the Category component
  const handleCategoryClick = () => {
    setShowCategory(!showCategory); // Toggle between showing category and the rest
  };

  return (
    <div className="home">
       
      <div className="nav">
        <div className="logo">
          <img src={cook} alt="Cooking" />
        </div>
        <div className="menu">
          <img src={profile} alt="Profile" />
          {/* Trigger the function to show/hide Category on click */}
          <img src={plus} alt="Add" onClick={handleCategoryClick} style={{ cursor: 'pointer' }} />
        </div>
      </div>

      {/* If showCategory is true, show only Category, else show the rest of the content */}
      {showCategory ? (
        <div className="category-container">
          <Category  clickHandle={categoryHandled}/> {

          }
        </div>
      ) : (
        <>
          {user ? (
            <h1>Welcome, {user.uid}!    {category} Selected Congratulation</h1>
          ) : (
            <h1>You are not signed in  </h1>
          )}

         
        </>
      )}

      {
        showForm?(<Form />)
        :(<>
        
        </>)
      }
     
            <div className="con">
            <About />
            </div>
           
          
    </div>
  );
}
export default Home;
import React from 'react';
import '../About.css'
import insta from '../assets/social.png'
import fb from '../assets/facebook.png'
import twitter from '../assets/twitter.png'
import pin from '../assets/logo.png'

import banana from '../assets/veg/banana.png'
import capsicum from '../assets/veg/capsicum.png'
import carrot from '../assets/veg/carrot.png'
import cauliflower from '../assets/veg/cauliflower.png'
import mango from '../assets/veg/mango.png'
import tomato from '../assets/veg/tomato.png'



function AboutUs() {
  return (
    <>
    <div className="about-us-container">
      <div className="top">
      <div className="about-us-text">
        <h1>About Us</h1>
        <p className='ourmission'>
          Our mission at CookBook is to make everyday cooking fun,
          because we believe that cooking is key to a happier and
          healthier life for people, communities and the planet. We
          empower homecooks all over the world to help each other
          by sharing recipes and cooking tips.
        </p>
    
      </div>
      <div className="learn-more">
        <h2>Learn More</h2>
        <ul>
          <li><a href="https://cookbook.ai/community" target="_blank" rel="noopener noreferrer">CookBook Community</a></li>
          <li><a href="https://cookbook.ai/feedback" target="_blank" rel="noopener noreferrer">Feedback</a></li>
          <li><a href="https://cookbook.ai/blog" target="_blank" rel="noopener noreferrer">Blog</a></li>
          <li><a href="https://cookbook.ai/terms-of-service" target="_blank" rel="noopener noreferrer">Terms of Service</a></li>
          <li><a href="https://cookbook.ai/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a></li>
        </ul>
        <div className="social-media">
          <a href="https://www.instagram.com/cookbook.ai/" target="_blank" rel="noopener noreferrer">
            <img  className='social' src={insta} alt="Instagram" />
          </a>
          <a href="https://www.facebook.com/cookbook.ai" target="_blank" rel="noopener noreferrer">
            <img className='social' src={fb} alt="Facebook" />
          </a>
          <a href="https://www.pinterest.com/cookbook_ai/" target="_blank" rel="noopener noreferrer">
            <img className='social' src={pin} alt="Pinterest" />
          </a>
          <a href="https://twitter.com/cookbook_ai" target="_blank" rel="noopener noreferrer">
            <img className='social' src={twitter} alt="Twitter" />
          </a>
        </div>
      </div>
      </div>
      <div className="down">
      <div className="veg">
      <img src={capsicum} alt="" />
      <img src={cauliflower} alt="" />
      <img src={mango} alt="" />
      <img src={tomato} alt="" />
      <img src={banana} alt="" />
      <img src={carrot} alt="" />

      </div>
      </div>
      
    </div>
  
    </>
   
  );
}

export default AboutUs;
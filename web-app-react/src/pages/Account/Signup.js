import React from 'react';
import './Signup.css'; 

import Signup_img from './signup_img.jpg';


function signup() {
  return (
    <div className="main">


    <div className='Signup-pic'> 
      <div className='Signup-img'>
          <img src={Signup_img}/>
      </div>
    </div>

      
      <div className="signup">
        <h1>SIGN UP</h1>
    
        <div className='username'>
          <div className='input'>
            <input type="username" placeholder="Username"/>
          </div>
        </div>

        <div className='DOB'>
          <div className='input'>
            <input type="DOB" placeholder="DOB"/>
          </div>
        </div>

        <div className='phone-number'> 
          <div className='input'>
            <input type="number" placeholder="Phone" />
          </div>
        </div>

        <div className='email'>
          <div className='input'>
            <input type="username" placeholder="Email"/>
          </div>
        </div>

        <div className='password'> 
          <div className='input'>
            <input type = "password" placeholder="Password"/>
          </div>
        </div>

        <div className='password'> 
          <div className='input'>
            <input type = "password" placeholder="Confirm Password"/>
          </div>
        </div>

      <div> 

           
           <div>
            <button className='btn-link-container'>
              <a className="btn-link" href="./Home">SIGN UP</a>  
            </button>
           </div>  

           <div>
            <button className='btn-existing-user-container'>
              <a className="exist-user" href="./login">Existing User?</a>  
            </button>
           </div>
      </div>
  
    </div>
    
  
  </div>

  )
}

export default signup
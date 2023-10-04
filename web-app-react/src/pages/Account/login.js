import React from 'react'
import './login.css'
import logo_pic from './graphic_seaDragon.png';
import password_pic from './password.png';
import user_img from './user.jpeg';
import email_pic from './email.jpeg';

// const picture = new URL("./pages./Account", import.meta.url)

function Account() {
  return (
    <div className="main">

      <div className='logo'>
          <img src={logo_pic}/>
      </div>
      
      <div className="login">
        <h1>SIGN IN</h1>
    
    {/* <div className='user_img'>
       <img src={user_img} alt='user_img' width="100" height="100" /> 
       </div> */}
       
    <div className='username'>


      <div className='input'>
            {/* <img src={user_pic} alt='user_pic' width="10" height="10" /> */}
            <input type="username" placeholder="username"/>
  
      </div>
    </div>

    <div className='password'> 
        <div className='input'>
          <input type = "password" placeholder="password"/>
          {/* <img src={user}/> */}
        </div>
    </div>

     
        <div> 


          <div>
            <button className='btn-link-container'>
              <a className="btn-link" href="/Home">SIGN IN</a>  
            </button>
           </div>
          
         
           <div>
            <button className='btn-link-container'>
              <a className="btn-link" href="/Signup">SIGNUP</a>  
            </button>
           </div>
          
          

        </div>
      </div>
{
   
  }
</div>



  )
}

export default Account


import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { Link } from 'react-router-dom'; // Add this line
import './user.css';
import logo_pic from './graphic_seaDragon.png';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/sdei/register', {
        email,
        password,
        username,
      });

      // Handle successful login (e.g., set user authentication token)
      console.log('Signup success:', response.data);

      // Redirect to a new page after successful login
      navigate('/Account');
    } catch (error) {
      // Handle login error
      console.error('Signup error:', error);
    }
  };

  return (
    <form className="signup-form" onSubmit={handleLogin}>
      <div className='logo'>
        <img src={logo_pic} alt="Logo" />
      </div>

      <div className="login">
        <h1>SIGN UP</h1>

        <div className='username'>
          <h2>Username:</h2>
          <div className='input'>
            <input type="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
        </div>

        <div className='email'>
          <h2>Email:</h2>
          <div className='input'>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
        </div>

        <div className='password'>
          <h2>Password:</h2>
          <div className='input'>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
        </div>

      
        <div>
          <button className='btn-link-container' >
            <a className="btn-link" >SIGNUP</a>  
          </button>
        </div>

        <div className='exist-user'>
          <button className='btn-existing-user-container' onClick={() => navigate('/Account')}>
            <Link to="/Account">Already Registerd</Link>
          </button>
        </div>

      </div>
      
    </form>
  );
}

export default Signup;
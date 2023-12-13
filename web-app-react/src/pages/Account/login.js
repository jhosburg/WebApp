import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './user.css';
import logo_pic from './graphic_seaDragon.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/sdei/login', {
        email,
        password,
      });

      // Handle successful login (e.g., set user authentication token)
      console.log('Login success:', response.data);

      // Redirect to a new page after successful login
      navigate('/Home');
    } catch (error) {
      // Handle login error
      console.error('Login error:', error);
    }
  };

  return (
    <form className="login-form" onSubmit={handleLogin}>
      <div className='logo'>
        <img src={logo_pic} alt="Logo" />
      </div>

      <div className="login">
        <h1>SIGN IN</h1>

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
                <div>
            <button className='btn-link-container'>
              <a className="btn-link" >SIGN IN</a>  
            </button>
           </div>

          <div>
            <button className='btn-link-container'>
              <Link to="/Signup" className="btn-link">SIGNUP</Link>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Login;



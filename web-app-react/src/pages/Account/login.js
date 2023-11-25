

import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './login.css';
import logo_pic from './graphic_seaDragon.png';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000"
});

function Login() {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const [currentUser, setCurrentUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    client.get("/sdei/user")
      .then(function(res) {
        setCurrentUser(true);
      })
      .catch(function(error) {
        setCurrentUser(false);
      });
  }, []);

  const onSubmit = (data) => {
    client.post("/sdei/login", {
      email: data.email,
      password: data.password
    })
    .then(function(res) {
      setCurrentUser(true);
      setErrorMessage(''); // Clear any previous error message
    })
    .catch(function(error) {
      console.error("Error during login:", error);
      if (error.response) {
        // The request was made, but the server responded with a status code outside of the range 2xx
        console.error("Server responded with:", error.response.data);
        console.error("Status code:", error.response.status);
        console.error("Headers:", error.response.headers);
        setErrorMessage(`Login failed. Server responded with ${error.response.status}: ${error.response.data}`);
      } else if (error.request) {
        // The request was made, but no response was received
        console.error("No response received. Request details:", error.request);
        setErrorMessage("Login failed. No response received from the server.");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error setting up the request:", error.message);
        setErrorMessage("Login failed. An error occurred during the request setup.");
      }
    });
  };
  

  const handleLogout = () => {
    client.post("/sdei/logout")
      .then(function(res) {
        setCurrentUser(false);
        setErrorMessage(''); // Clear any previous error message
      })
      .catch(function(error) {
        console.error("Error during logout:", error);
        setErrorMessage('Logout failed. Please try again.'); // Set an error message
      });
  };
  


  return (
    <div className="main">
      <div className='logo'>
        <img src={logo_pic} alt="Logo" />
      </div>

      <div className="login">
        <h1>SIGN IN</h1>

        <div className='email'>
          <div className='input'>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{ required: 'Email is required' }}
              render={({ field }) => <input {...field} placeholder="Email" />}
            />
            {errors.email && <p>{errors.email.message}</p>}
          </div>
        </div>

        <div className='password'>
          <div className='input'>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{ required: 'Password is required' }}
              render={({ field }) => <input type="password" {...field} placeholder="Password" />}
            />
            {errors.password && <p>{errors.password.message}</p>}
          </div>
        </div>

        <div>
          <div>
            <button className='btn-link-container' type="submit" onClick={handleSubmit(onSubmit)}>
              <span className="btn-link">SIGN IN</span>
            </button>
          </div>

          <div>
            {currentUser ? (
              <button className='btn-link-container' >
                <span className="btn-link">LOG OUT</span>
              </button>
            ) : (
              <Link to="/signup" className='btn-link-container'>
                <span className="btn-link">SIGN UP</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;



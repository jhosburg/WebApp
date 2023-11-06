import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import './login.css';
import logo_pic from './graphic_seaDragon.png';

function Login() {
  const { control, handleSubmit, formState: { errors } } = useForm();
  
  const onSubmit = (data) => {
    // Handle form submission logic here
    console.log(data);
  };

  return (
    <div className="main">
      <div className='logo'>
        <img src={logo_pic} alt="Logo" />
      </div>

      <div className="login">
        <h1>SIGN IN</h1>

        <div className='username'>
          <div className='input'>
            <Controller
              name="username"
              control={control}
              defaultValue=""
              rules={{ required: 'Username is required' }}
              render={({ field }) => <input {...field} placeholder="Username" />}
            />
            {errors.username && <p>{errors.username.message}</p>}
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
            <button className='btn-link-container' onClick={handleSubmit(onSubmit)}>
            <a className="btn-link">SIGN IN</a>
            </button>
          </div>
          

          <div>
            <button className='btn-link-container'>
              <a className="btn-link" href="/Signup">SIGNUP</a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
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
      navigate('/Login');
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
          <button className='btn-link-container'>
            <a className="btn-link">SIGNUP</a>  
          </button>
        </div>

        <div className='exist-user'>
          <button className='btn-existing-user-container' onClick={() => navigate('/login.js')}>
            <Link to="/login">Already Registerd</Link>
          </button>
        </div>

      </div>
      
    </form>
  );
}

export default Signup;





// import React, { useState } from 'react';
// import axios from 'axios';
// import logo_pic from './graphic_seaDragon.png';
// import './Signup.css'

// const Signup = () => {
//   const [email, setEmail] = useState('');
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSignup = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post('http://127.0.0.1:8000/sdei/register', {
//         email,
//         username,
//         password,
//       });

//       // Handle successful signup (e.g., redirect to login page)
//       console.log('Signup success:', response.data);
//     } catch (error) {
//       // Handle signup error
//       console.error('Signup error:', error);
//     }
//   };

//   return (

//     <form className="main" onSubmit={handleSignup}>

//       <div className='Signup-pic'> 
//         <div className='Signup-img'>
//           <img src={logo_pic} alt="Signup" />
//         </div>
//       </div>

//       <div className="signup">
//          <h1>SIGN UP</h1>

//          <div className='email'>
//           <div className='input'>
//             <label>Email:
//               <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//             </label>
//           </div>
//         </div>

//       {/* <label>Email:
//         <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//       </label>
//       <br /> */}


//       <div className='password'> 
//         <div className='input'>
//           <label>Username:
//             <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
//           </label>
//         </div>
//       </div>

//       {/* <label>Username:
//         <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
//       </label>
//       <br /> */}

//       <div className='password'> 
//         <div className='input'>
//           <label>Password:
//             <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//           </label>
//         </div>
//       </div>

//       {/* <label>Password:
//         <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//       </label>
//       <br /> */}


//       <div>
//         <button className='btn-link-container'>
//           <a className="btn-link">SIGN UP</a>  
//         </button>
//       </div>

//     </div>
//     </form>
 
//   );
// };

// export default Signup;



// // import React, { useState } from 'react';
// // import { useForm, Controller } from 'react-hook-form';
// // import './Signup.css';
// // import Signup_img from './signup_img.jpg';
// // import { Link } from 'react-router-dom';
// // import axios from 'axios'; // Import Axios library

// // function Signup() {
// //   const { control, handleSubmit, formState: { errors } } = useForm();

// //   const onSubmit = async (data) => {
// //     try {
// //       // Use Axios to make a GET request to fetch user information
// //       const response = await axios.get('http://localhost:8000/sdei/register');
      
// //       // Extract user information from the response
// //       const { username, password, email } = response.data;

// //       // Log the fetched user information
// //       console.log('Fetched User Information:', { username, password, email });
 
// //       // Now you can send the data to the login endpoint
// //       const loginResponse = await axios.post('http://localhost:8000/sdei/login', {
// //         username: data.username,
// //         password: data.password,
// //         email: data.email,
// //       });

// //       // Handle the login response as needed
// //       console.log('Login Response:', loginResponse.data);
// //     } catch (error) {
// //       // Handle errors if any
// //       console.error('Error:', error);
// //     }
// //   };

// //   return (
// //     <div className="main">
//       // <div className='Signup-pic'> 
//       //   <div className='Signup-img'>
//       //     <img src={Signup_img} alt="Signup" />
//       //   </div>
//       // </div>

// //       <div className="signup">
// //         <h1>SIGN UP</h1>

// //         <div className='username'>
// //           <div className='input'>
// //             <Controller
// //               name="username"
// //               control={control}
// //               defaultValue=""
// //               rules={{ required: 'Username is required' }}
// //               render={({ field }) => <input {...field} placeholder="Username" />}
// //             />
// //             {errors.username && <p>{errors.username.message}</p>}
// //           </div>
// //         </div>

// //         {/* <div className='DOB'>
// //           <div className='input'>
// //             <Controller
// //               name="dob"
// //               control={control}
// //               defaultValue=""
// //               rules={{ required: 'DOB is required' }}
// //               render={({ field }) => <input {...field} placeholder="DOB" />}
// //             />
// //             {errors.dob && <p>{errors.dob.message}</p>}
// //           </div>
// //         </div>

// //         <div className='phone-number'> 
// //           <div className='input'>
// //             <Controller
// //               name="phone"
// //               control={control}
// //               defaultValue=""
// //               rules={{ required: 'Phone number is required' }}
// //               render={({ field }) => <input {...field} type="number" placeholder="Phone" />}
// //             />
// //             {errors.phone && <p>{errors.phone.message}</p>}
// //           </div>
// //         </div> */}

//         // <div className='email'>
//         //   <div className='input'>
//         //     <Controller
//         //       name="email"
//         //       control={control}
//         //       defaultValue=""
//         //       rules={{ required: 'Email is required' }}
//         //       render={({ field }) => <input {...field} type="email" placeholder="Email" />}
//         //     />
//         //     {errors.email && <p>{errors.email.message}</p>}
//         //   </div>
//         // </div>

//         // <div className='password'> 
//         //   <div className='input'>
//         //     <Controller
//         //       name="password"
//         //       control={control}
//         //       defaultValue=""
//         //       rules={{ required: 'Password is required' }}
//         //       render={({ field }) => <input {...field} type="password" placeholder="Password" />}
//         //     />
//         //     {errors.password && <p>{errors.password.message}</p>}
//         //   </div>
//         // </div>

// //         {/* <div className='password'> 
// //           <div className='input'>
// //             <Controller
// //               name="confirmPassword"
// //               control={control}
// //               defaultValue=""
// //               rules={{ 
// //                 required: 'Confirm Password is required',
// //                 validate: value => value === control.getValues("password") || 'Passwords do not match'
// //               }}
// //               render={({ field }) => <input {...field} type="password" placeholder="Confirm Password" />}
// //             />
// //             {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
// //           </div>
// //         </div> */}

// //         <div> 
// //           <div>
// //             <button className='btn-link-container' onClick={handleSubmit(onSubmit)}>
// //               <a className="btn-link" href="./Home">SIGN UP</a>
// //             </button>
// //           </div>

// //           <div>
// //             <button className='btn-existing-user-container'>
// //               <Link className="exist-user" to="/Account">Existing User?</Link>  
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default Signup;

import React, { useState } from 'react';
import axios from 'axios';
import Signup_img from './signup_img.jpg';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('YOUR_SIGNUP_API_ENDPOINT', {
        email,
        username,
        password,
      });

      // Handle successful signup 
      console.log('Signup success:', response.data);
    } catch (error) {
      // Handle signup error
      console.error('Signup error:', error);
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <label>Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>
      <br />
      <label>Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
      </label>
      <br />
      <label>Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </label>
      <br />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default Signup;



//   return (
//     <div className="main">
//       <div className='Signup-pic'> 
//         <div className='Signup-img'>
//           <img src={Signup_img} alt="Signup" />
//         </div>
//       </div>

//       <div className="signup">
//         <h1>SIGN UP</h1>

//         <div className='username'>
//           <div className='input'>
//             <Controller
//               name="username"
//               control={control}
//               defaultValue=""
//               rules={{ required: 'Username is required' }}
//               render={({ field }) => <input {...field} placeholder="Username" />}
//             />
//             {errors.username && <p>{errors.username.message}</p>}
//           </div>
//         </div>

//         {/* <div className='DOB'>
//           <div className='input'>
//             <Controller
//               name="dob"
//               control={control}
//               defaultValue=""
//               rules={{ required: 'DOB is required' }}
//               render={({ field }) => <input {...field} placeholder="DOB" />}
//             />
//             {errors.dob && <p>{errors.dob.message}</p>}
//           </div>
//         </div>

//         <div className='phone-number'> 
//           <div className='input'>
//             <Controller
//               name="phone"
//               control={control}
//               defaultValue=""
//               rules={{ required: 'Phone number is required' }}
//               render={({ field }) => <input {...field} type="number" placeholder="Phone" />}
//             />
//             {errors.phone && <p>{errors.phone.message}</p>}
//           </div>
//         </div> */}

//         <div className='email'>
//           <div className='input'>
//             <Controller
//               name="email"
//               control={control}
//               defaultValue=""
//               rules={{ required: 'Email is required' }}
//               render={({ field }) => <input {...field} type="email" placeholder="Email" />}
//             />
//             {errors.email && <p>{errors.email.message}</p>}
//           </div>
//         </div>

//         <div className='password'> 
//           <div className='input'>
//             <Controller
//               name="password"
//               control={control}
//               defaultValue=""
//               rules={{ required: 'Password is required' }}
//               render={({ field }) => <input {...field} type="password" placeholder="Password" />}
//             />
//             {errors.password && <p>{errors.password.message}</p>}
//           </div>
//         </div>

//         {/* <div className='password'> 
//           <div className='input'>
//             <Controller
//               name="confirmPassword"
//               control={control}
//               defaultValue=""
//               rules={{ 
//                 required: 'Confirm Password is required',
//                 validate: value => value === control.getValues("password") || 'Passwords do not match'
//               }}
//               render={({ field }) => <input {...field} type="password" placeholder="Confirm Password" />}
//             />
//             {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
//           </div>
//         </div> */}

//         <div> 
//           <div>
//             <button className='btn-link-container' onClick={handleSubmit(onSubmit)}>
//               <a className="btn-link" href="./Home">SIGN UP</a>
//             </button>
//           </div>

//           <div>
//             <button className='btn-existing-user-container'>
//               <Link className="exist-user" to="/Account">Existing User?</Link>  
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Signup;

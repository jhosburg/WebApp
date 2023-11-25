// import React from 'react';
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import Container from 'react-bootstrap/Container';
// import Navbar from 'react-bootstrap/Navbar';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';


// axios.defaults.xsrfCookieName = 'csrftoken';
// axios.defaults.xsrfHeaderName = 'X-CSRFToken';
// axios.defaults.withCredentials = true;

// const client = axios.create({
//   baseURL: "http://127.0.0.1:8000/"
// });

// function Login() {

//   const [currentUser, setCurrentUser] = useState();
//   const [registrationToggle, setRegistrationToggle] = useState(false);
//   const [email, setEmail] = useState('');
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   useEffect(() => {
//     client.get("/sdei/user")
//     .then(function(res) {
//       setCurrentUser(true);
//     })
//     .catch(function(error) {
//       setCurrentUser(false);
//     });
//   }, []);

//   function update_form_btn() {
//     if (registrationToggle) {
//       document.getElementById("form_btn").innerHTML = "Register";
//       setRegistrationToggle(false);
//     } else {
//       document.getElementById("form_btn").innerHTML = "Log in";
//       setRegistrationToggle(true);
//     }
//   }

//   function submitRegistration(e) {
//     e.preventDefault();
//     client.post(
//       "/sdei/register",
//       {
//         email: email,
//         username: username,
//         password: password
//       }
//     ).then(function(res) {
//       client.post(
//         "/sdei/login",
//         {
//           email: email,
//           password: password
//         }
//       ).then(function(res) {
//         setCurrentUser(true);
//       });
//     });
//   }

//   function submitLogin(e) {
//     e.preventDefault();
//     client.post(
//       "/sdei/login",
//       {
//         email: email,
//         password: password
//       }
//     ).then(function(res) {
//       setCurrentUser(true);
//     });
//   }

//   function submitLogout(e) {
//     e.preventDefault();
//     client.post(
//       "/sdei/logout",
//       {withCredentials: true}
//     ).then(function(res) {
//       setCurrentUser(false);
//     });
//   }

//   if (currentUser) {
//     return (
//       <div>
//         <Navbar bg="dark" variant="dark">
//           <Container>
//             <Navbar.Brand>Authentication App</Navbar.Brand>
//             <Navbar.Toggle />
//             <Navbar.Collapse className="justify-content-end">
//               <Navbar.Text>
//                 <form onSubmit={e => submitLogout(e)}>
//                   <Button type="submit" variant="light">Log out</Button>
//                 </form>
//               </Navbar.Text>
//             </Navbar.Collapse>
//           </Container>
//         </Navbar>
//           <div className="center">
//             <h2>You're logged in!</h2>
//           </div>
//         </div>
//     );
//   }
//   return (
//     <div>
//     <Navbar bg="dark" variant="dark">
//       <Container>
//         <Navbar.Brand>Authentication App</Navbar.Brand>
//         <Navbar.Toggle />
//         <Navbar.Collapse className="justify-content-end">
//           <Navbar.Text>
//             <Button id="form_btn" onClick={update_form_btn} variant="light">Register</Button>
//           </Navbar.Text>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//     {
//       registrationToggle ? (
//         <div className="center">
//           <Form onSubmit={e => submitRegistration(e)}>
//             <Form.Group className="mb-3" controlId="formBasicEmail">
//               <Form.Label>Email address</Form.Label>
//               <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
//               <Form.Text className="text-muted">
//                 We'll never share your email with anyone else.
//               </Form.Text>
//             </Form.Group>
//             <Form.Group className="mb-3" controlId="formBasicUsername">
//               <Form.Label>Username</Form.Label>
//               <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
//             </Form.Group>
//             <Form.Group className="mb-3" controlId="formBasicPassword">
//               <Form.Label>Password</Form.Label>
//               <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
//             </Form.Group>
//             <Button variant="primary" type="submit">
//               Submit
//             </Button>
//           </Form>
//         </div>        
//       ) : (
//         <div className="center">
//           <Form onSubmit={e => submitLogin(e)}>
//             <Form.Group className="mb-3" controlId="formBasicEmail">
//               <Form.Label>Email address</Form.Label>
//               <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
//               <Form.Text className="text-muted">
//                 We'll never share your email with anyone else.
//               </Form.Text>
//             </Form.Group>
//             <Form.Group className="mb-3" controlId="formBasicPassword">
//               <Form.Label>Password</Form.Label>
//               <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
//             </Form.Group>
//             <Button variant="primary" type="submit">
//               Submit
//             </Button>
//           </Form>
//         </div>
//       )
//     }
//     </div>
//   );
// }

// export default Login;





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




//   function Login() {
//     const { control, handleSubmit, formState: { errors } } = useForm();
  
//     const onSubmit = async (data) => {
//       try {
//         const response = await axios.post('http://your-django-server/api/login/', data);
//         console.log(response.data);
//         // Perform any necessary actions upon successful login (e.g., redirect)
//       } catch (error) {
//         console.error(error);
//       }
//     };





//   return (
//     <div className="main">
//       <div className='logo'>
//         <img src={logo_pic} alt="Logo" />
//       </div>

//       <div className="login">
//         <h1>SIGN IN</h1>

//         <div className='email'>
//           <div className='input'>
//             <Controller
//               name="email"
//               control={control}
//               defaultValue=""
//               rules={{ required: 'email is required' }}
//               render={({ field }) => <input {...field} placeholder="email" />}
//             />
//             {errors.username && <p>{errors.username.message}</p>}
//           </div>
//         </div>

//         <div className='password'> 
//           <div className='input'>
//             <Controller
//               name="password"
//               control={control}
//               defaultValue=""
//               rules={{ required: 'Password is required' }}
//               render={({ field }) => <input type="password" {...field} placeholder="Password" />}
//             />
//             {errors.password && <p>{errors.password.message}</p>}
//           </div>
//         </div>


//         <div>
//           <div>
//             <button className='btn-link-container' onClick={handleSubmit(onSubmit)}>
//             <a className="btn-link">SIGN IN</a>
//             </button>
//           </div>
          

//           <div>
//             <button className='btn-link-container'>
//               <a className="btn-link" href="/Signup">SIGNUP</a>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;
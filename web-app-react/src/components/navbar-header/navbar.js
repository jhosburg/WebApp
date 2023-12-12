import React, { useEffect } from 'react';
import './navbar.css';
import logo from './sdei.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

function Navbar() {
  useEffect(() => {
    const pathname = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach((link) => {
      if (link.getAttribute('href') === pathname) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }, []);

  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/sdei/logout/');
      // Redirect or perform other actions after logout
      console.log('logout success:', response.data);
      navigate('/Account');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  
  return (
    <nav className='navbar'>
      <div className='navbar-container'>
        <div className="flex-container">
          <a className="navbar-img">
            <img src={logo} alt='logo' className="rounded" width="285" height="80" />
          </a>
          <a className="nav-link" href="/Home">Home</a>
          <a className="nav-link" href="/Appliances">Dashboard</a>
          <a className="nav-link" href="/About">About</a>
          <a className="nav-link" href="/Contacts">Contacts</a>
          <button className="nav-link" href="/profile" onClick={handleLogout} >LOGOUT</button>
        
      {/* <button onClick={handleLogout}>Logout</button> */}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
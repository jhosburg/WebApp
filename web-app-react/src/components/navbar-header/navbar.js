import React, { useEffect } from 'react';
import './navbar.css';
import logo from './sdei.png';

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

  return (
    <nav className='navbar'>
      <div className='navbar-container'>
        <div className="flex-container">
          <a className="navbar-img">
            <img src={logo} alt='logo' className="rounded" width="285" height="80" />
          </a>
          <a className="nav-link" href="/">Home</a>
          <a className="nav-link" href="/Appliances">Dashboard</a>
          <a className="nav-link" href="/Account">Account</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

import React, {useEffect} from 'react'
import './navbar.css';
import logo from './sdei.png'

function Navbar() {
  useEffect(() => {
    const pathname = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');  // get buttons
    navLinks.forEach((link) => {
      if (link.getAttribute('href') === pathname) {   // loop through nav-links and add/remove active effect
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }, []);
  return (
    <nav className='navbar'>
      
      <div className='navbar-container'>
        <a class="navbar-img" >
          <img src={logo} alt='logo' class="rounded" width ="275" height ="80"/>
        </a>
        <a class="nav-link" href="/Account">Account</a>
        <a class="nav-link" href="/Appliances">Dashboard</a>
        <a class="nav-link" href="/">Home</a>
      </div>
    </nav>
  )
}

export default Navbar
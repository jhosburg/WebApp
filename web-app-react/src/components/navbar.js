import React, {useState} from 'react'
import './navbar.css';

function Navbar() {
  return (
    <nav className='navbar'>
      
      <div className='navbar-container'>
        <a class="navbar-img" href="/">
          <img src="../images/sdei_logo.jpg" class="rounded" width ="250" height ="70"/>
        </a>
        <a class="nav-link" href="/">Home</a>
        <div class="dropdown">
          <button class="dropbtn">Dropdown
            <i class="fa fa-caret-down"></i>            
          </button>
          <div class="dropdown-content">
            <a href="#">Link 1</a>
            <a href="#">Link 2</a>
            <a href="#">Link 3</a>
          </div>
        </div>
          <a class="nav-link" href="/">Account</a>
      </div>
    </nav>
  )
}

export default Navbar
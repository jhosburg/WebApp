import React, {useState} from 'react'
import './navbar.css';

function Navbar() {
  return (
    <nav className='navbar'>
      
      <div className='navbar-container'>
        <a class="navbar-img" href="/">
          <img src="sdei_logo.jpg" alt='logo' class="rounded" width ="275" height ="80"/>
        </a>
        <a class="nav-link" href="/">Account</a>
        <div class="appliances">
          <button class="appliancesbtn">Appliances
            <i class="fa fa-caret-down"></i>            
          </button>
          <div class="appliances-content">
            <a href="/">Link 1</a>
            <a href="/">Link 2</a>
            <a href="/">Link 3</a>
          </div>
        </div>
          <a class="nav-link" href="/">Home</a>
      </div>
    </nav>
  )
}

export default Navbar
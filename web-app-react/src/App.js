import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Appliances from './pages/Dashboard/Appliances';
import Account from './pages/Account/login';
import mPower from './pages/mPower/mPower';
import About from './pages/About/About';
import Navbar from './components/navbar-header/navbar';
import Footer from "./components/navbar/Footer";
import ContactInfo from "./pages/Contacts/Contacts";
import Signup from './pages/Account/Signup';

function App() {
  return (
    <div className="page-row">
      
        <div>
          <Navbar />
        </div>
        <div className='content'>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Appliances" element={<Appliances />} />
              <Route path='/Account' element={<Account />} />
              <Route path='/About' element={<About />} />
              <Route path='/mPower'element={<mPower />}/>
              <Route path='/Contacts' element={<ContactInfo />} />
              <Route path='/Signup' element={<Signup />} />
            </Routes>
          </Router>
        </div>
      < Footer/>
    </div>
    
  );
}

export default App;

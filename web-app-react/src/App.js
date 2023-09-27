import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Appliances from './pages/Dashboard/Appliances';
import Account from './pages/Account/Account';
import Navbar from './components/navbar-header/navbar';
import Footer from "./components/navbar/Footer";

function App() {
  return (
    <div className="page-row">
      <div className="row wrap">
        <div>
          <Navbar />
        </div>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Appliances" element={<Appliances />} />
            <Route path='/Account' element={<Account />} />
          </Routes>
        </Router>
      </div>
      < Footer/>
    </div>
    
  );
}

export default App;

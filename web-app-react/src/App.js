import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Appliances from './pages/Dashboard/Appliances';
import Account from './pages/Account/login';
import About from './pages/About/About';
import Navbar from './components/navbar-header/navbar';
import Footer from './components/footer/Footer';
import ContactInfo from "./pages/Contacts/Contacts";
import Signup from './pages/Account/Signup';

function App() {
  return (
    <div className="page-row">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/Signup" />} />
          <Route path="/Signup" element={
              <div>
                <Signup />
              </div>
            }/>
          <Route path="/Home" element={
              <div>
                <Navbar />
                <Home />
              </div>
            }
          />
          <Route path="/Appliances" element={
              <div>
                <Navbar />
                <Appliances />
              </div>
            }
          />
          <Route path="/Account" element={
              <div>
                <Account />
              </div>
            }
          />
          <Route path="/About" element={
              <div>
                <Navbar />
                <About />
              </div>
            }
          />
          <Route path="/Contacts" element={
              <div>
                <Navbar />
                <ContactInfo />
              </div>
            }
          />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
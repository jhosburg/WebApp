import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Appliances from './pages/Dashboard/Appliances';
import Account from './pages/Account/login';
import About from './pages/About/About';
import Navbar from './components/navbar-header/navbar';
import Footer from "./components/navbar/Footer";
import ContactInfo from "./pages/Contacts/Contacts";
import Signup from './pages/Account/Signup';
import ProtectedRoute from './pages/ProtectedRoute';
import Profile from './pages/profile/Profile';

function App() {
  // Assuming you have some logic to determine if the user is authenticated
  const [user, setUser] = useState(/* Your authentication logic here */);

  return (
    <div className="page-row">
      <div>
        <Navbar />
      </div>
      <div id='root'>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            
            <Route 
              path="/Appliances" 
              element={
                <ProtectedRoute user={user}>
                  <Appliances user={user} />
                </ProtectedRoute>
              } 
            />

            <Route path='/Account' element={<Account />} />
            <Route path='/About' element={<About />} />
            <Route path='/Contacts' element={<ContactInfo />} />
            <Route path='/Signup' element={<Signup />} />
            <Route path="/Profile" element={<Profile />} />
          </Routes>
        </Router>
      </div>
      <Footer />
    </div>
  );
}

export default App;

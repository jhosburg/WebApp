import React, { useEffect } from 'react';
import './navbar.css';
import logo from './sdei.png';

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
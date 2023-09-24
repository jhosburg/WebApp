import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Navbar from './components/navbar/navbar';
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
        </Routes>
      </Router>
      </div>
      < Footer/>
      </div>
    
  );
}

export default App;

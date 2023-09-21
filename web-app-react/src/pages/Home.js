import React from 'react'
import Navbar from '../components/navbar'
import './Home.css';

function Home() {
  return (
    <div class="main">
            <div class="report-container">
               <div class="report-header">
                  <div class="text">
                     <h1 class="heading">Overall Power Usage</h1>
                  </div>
               </div>
               <div class='graph-cards'>
                  <div class='graph1'>
                     <h2>GRAPH TO BE DISPLAYED</h2>
                  </div>
               </div>
            </div>
      </div>
  )
}

export default Home
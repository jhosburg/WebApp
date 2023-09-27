import React from 'react'
import Navbar from '../../components/navbar-header/navbar'
import './Appliances.css';

function Appliances() {
  return (
        <div class="tile__container">
            <div class="section-heading">
                <h4>YOUR APPLIANCES</h4>
            </div>
            <div class="tile__toggle" id="mobile-menu">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </div>
            <ul class="tile__menu">
                <li class="column-4 project-1">
                <a href="/" class="tile__button"> HEATING & COOLING </a>
                </li>
                <li class="column-4 project-2">
                <a href="/" class="tile__button"> A/C </a>
                </li>
                <li class="column-4 project-3">
                <a href="/" class="tile__button"> SOLAR </a>
                </li>
                <li class="column-4 project-4">
                <a href="/" class="tile__button"> TV & CABLE </a>
                </li>
                <li class="column-4 project-5">
                <a href="/" class="tile__button"> LIGHTING </a>
                </li>
                <li class="column-4 project-6">
                <a href="/" class="tile__button"> WATER HEATER </a>
                </li>
                <li class="column-4 project-7">
                <a href="/" class="tile__button"> WASHER & DRYER </a>
                </li>
                <li class="column-4 project-8">
                <a href="file:///C:/Users/Owner/.vscode/Senior%20Design/simulation%20tool/refrigerator.html" class="tile__button"> REFRIGERATOR </a>
                </li>
                <li class="column-4 project-9">
                <a href="/" class="tile__button"> OVEN </a>
                </li>
                <li class="column-4 project-10">
                <a href="/" class="tile__button"> ELECTRIC STOVE </a>
                </li>
                <li class="column-4 project-11">
                <a href="/" class="tile__button"> COMPUTER </a>
                </li>
                <li class="column-4 project-12">
                <a href="/" class="tile__button"> MICROWAVE </a>
                </li>
            </ul>
        </div>
    )
}

export default Appliances
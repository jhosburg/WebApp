import React from 'react';
import './About.css';
import jacob from './jacob.jpg';
import michael from './michael.jpg';
import moises from './moises.png';
import jakob from './jakob.png';
import sandy from './sandy.png';
import saeed from './saeed.jpg';

function About() {
  return (
    <div className="main">
      <div className="aboutContainer">
        <p className='aboutInfo'>
          Our team has worked hard to develop and initialize this web application and simulation tool. Meet the team: 
        </p>
        <div className='teamSDSU'>
            <div className='team-member'>
                <div className='content'>
                    <img src={michael} alt='michael' width="175" height="175" />
                    <p className='bio'> Michael is an electrical engineer.</p>
                </div>
                <div className='info'>
                    <p className='name'>Michael</p>
                    <p className='title'>Electrical Engineer</p>
                </div>
            </div>
            <div className='gold-line'></div>
            <div className='team-member'>
                <div className='content'>
                    <img src={moises} alt='moises' width="175" height="175" />
                    <p className='bio'> Moises is an electrical engineer.</p>
                </div>
                <div className='info'>
                    <p className='name'>Moises</p>
                    <p className='title'>Electrical Engineer</p>
                </div>
            </div>
            <div className='gold-line'></div>
            <div className='team-member'>
                <div className='content'>
                    <img src={jacob} alt='jacob' width="175" height="175" />
                    <p className='bio'> Jacob is a computer engineer.</p>
                </div>
                <div className='info'>
                    <p className='name'>Jacob</p>
                    <p className='title'>Computer Engineer</p>
                </div>
            </div>
            <div className='gold-line'></div>
            <div className='team-member'>
            <div className='content'>
                    <img src={jakob} alt='jakob' width="175" height="175" />
                    <p className='bio'> Jakob is a computer engineer.</p>
                </div>
                <div className='info'>
                    <p className='name'>Jakob</p>
                    <p className='title'>Computer Engineer</p>
                </div>
            </div>
            <div className='gold-line'></div>
            <div className='team-member'>
                <div className='content'>
                    <img src={sandy} alt='sandy' width="175" height="175" />
                    <p className='bio'> Sandy is a computer engineer.</p>
                </div>
                <div className='info'>
                    <p className='name'>Sandy</p>
                    <p className='title'>Computer Engineer</p>
                </div>
            </div>
            <div className='gold-line'></div>
        </div>
        <div className='advisor'>
            <div className='content'>
                    <img src={saeed} alt='saeed' width="175" height="175" />
                    <p className='bio'> Prior to joining the Department of Electrical and Computer Engineering at San Diego State 
                    University as an assistant professor, Dr. Manshadi was a postdoctoral fellow at the Department of Electrical 
                    and Computer Engineering at the University of California, Riverside. He received a Ph.D. degree from Southern 
                    Methodist University, Dallas, TX; an M.S. degree from the University at Buffalo, the State University of New 
                    York (SUNY), Buffalo, NY, and a B.S. degree from the University of Tehran, Tehran, Iran all in electrical 
                    engineering. Dr. Manshadi is the SDSU co-director for Southern California Energy Innovation Network. He was 
                    the recipient of the Frederick E. Terman Award from Bobby Lyle School of Engineering. He serves as an editor 
                    for IEEE Transactions on Vehicular Technology and as a reviewer for several IEEE Transactions journals including 
                    Smart Grid, Sustainable Energy, Power Systems, Intelligent Transportation, and Industrial Informatics. His 
                    current research interests include transportation electrification, smart grid, microgrids, integrating renewable 
                    and distributed resources, and power system operation and planning.</p>
                </div>
                <div className='info'>
                    <p className='name'>Saeed</p>
                    <p className='title'>Assistant Professor</p>
                </div>
        </div>
        </div>
    </div>
  );
}

export default About;

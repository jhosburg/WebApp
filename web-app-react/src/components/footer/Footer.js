import React, { useState, useEffect } from 'react';
import './Footer.css';

const Footer = () => {
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;

      if (scrollHeight - scrollTop === clientHeight) {  // calculate height to determine when to show footer
        setShowFooter(true);  // if position is at bottom, show footer
      } else {
        setShowFooter(false); // else don't show
      }
    };

    window.addEventListener('scroll', handleScroll);  

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div id="footer" className={`fixed-bottom ${showFooter ? 'd-block' : 'd-none'}`}>
      <div className="footerContent">
        <div>
          &copy; {new Date().getFullYear()} Copyright:{' '}
          <a className='copyWrite' href='https://www.seadragon.energy/'>
            by Sea Dragon Energy, Inc. All rights reserved. Website by Team 5IVE SDSU 2023
          </a>
        </div>
        <a className="returnBtn" onClick={scrollToTop}>
          <div class="arrow"></div>
        </a>
      </div>
    </div>
  );
};

export default Footer;


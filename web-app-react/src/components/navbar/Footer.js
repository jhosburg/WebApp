import React from 'react';

 const Footer =  () => {
  return (
    
      <div className= 'text-center text-lg-left'>
        &copy; {new Date().getFullYear()} Copyright:{' '}
        <a className='text-dark' href='https://www.seadragon.energy/'>
          by Sea Dragon Energy, Inc. All rights reserved. Website by Team 5IVE SDSU 2023
        </a>
      </div>
  );
} 
export default Footer;

import React from 'react';
import './mPower.css';
const mPower = () => {
  return (
    <div className="centered-image-container">
      <img
        src="mPower.png"
        alt="Centered Image"
        className="centered-image"
      />
      <h1>mPower turns any ordinary circuit breaker panel into a smart panel</h1>
      <p className="centered-text">Storing energy remains costly, and keeping value out
         of every kilowatt hour critically important. Here, is where mPower comes in,
         instead of limiting the use of stored energy to a small number of hard-wired
         essential circuits, mPower enables a home or business owner to employ 
         any solar-based stored energy across any current circuit. This device can be
         easily snapped into any existing circuit breaker panel and the smart architecture
         allows it to be tailored to any specific number of breakers. Allowing users their 
        energy storage consumption efficient at less cost, and delivers discretion over
        what circuits to use in any situation, unlocks energy storage performance, and dramatically
        improves its return on investment.
      </p>
    </div>
  );
};

export default mPower;

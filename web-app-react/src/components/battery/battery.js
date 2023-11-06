import React, { useState, useEffect } from 'react';

function sdeibattery() {
  const [batteryStateOfCharge, setBatteryStateOfCharge] = useState([0]);
  const [gridPower, setGridPower] = useState([]);
  const [demandProfile] = useState([5, 6, 7, 8, 9, 10, 12, 14, 15, 16, 18, 20, 21, 22, 22, 23, 22, 20, 18, 17, 15, 12, 10, 8]);
  const [solarGeneration] = useState([0, 0, 0, 0, 0, 2, 4, 6, 8, 10, 12, 14, 15, 15, 14, 12, 10, 8, 6, 4, 2, 0, 0, 0]);
  const efficiency = 0.95;

  useEffect(() => {
    simulateBatteryBehavior();
  }, []);

  const simulateBatteryBehavior = () => {
    let stateOfCharge = 0;
    const newBatteryStateOfCharge = [stateOfCharge];
    const newGridPower = [];

    for (let t = 0; t < demandProfile.length; t++) {
      const availableChargePower = Math.min(7, 15 - stateOfCharge);
      const availableDischargePower = Math.min(7.5, stateOfCharge);

      if (demandProfile[t] > availableDischargePower) {
        const power = -demandProfile[t] / efficiency;
        stateOfCharge += power;
        newBatteryStateOfCharge.push(stateOfCharge);
        newGridPower.push(demandProfile[t] - power - solarGeneration[t]);
      } else {
        const excessSolarPower = Math.max(solarGeneration[t] - demandProfile[t], 0);
        const power = Math.min(demandProfile[t] - excessSolarPower, availableChargePower) * efficiency;
        stateOfCharge += power;
        newBatteryStateOfCharge.push(stateOfCharge);
        newGridPower.push(demandProfile[t] - power - solarGeneration[t]);
      }
    }

    setBatteryStateOfCharge(newBatteryStateOfCharge);
    setGridPower(newGridPower);
  };

  return (
    <div className="App">
  <h1>Battery Simulation</h1>

  <div className="chart-container">
    <h2>Battery State of Charge (kWh)</h2>
    <div className="chart">
      {batteryStateOfCharge.map((charge, index) => (
        <div key={index} className="charge-bar" style={{ height: `${charge * 10}px` }}>
          {charge.toFixed(2)}
        </div>
      ))}
    </div>
  </div>

  <div className="chart-container">
    <h2>Grid Power (kW)</h2>
    <div className="chart">
      {gridPower.map((power, index) => (
        <div key={index} className={`power-bar ${power >= 0 ? 'positive' : 'negative'}`}>
          {power.toFixed(2)}
        </div>
      ))}
    </div>
  </div>
</div>

    
  );
}

export default sdeibattery;

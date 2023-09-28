import React, { useState } from 'react';
import './Appliances.css';

function Appliances() {
  const [openAppliance, setOpenAppliance] = useState(null);
  const [masterSwitch, setMasterSwitch] = useState(false);
  const [appliances, setAppliances] = useState([
    { name: 'Microwave', power: false },
    { name: 'Fridge', power: false },
    { name: 'AC', power: false },
    { name: 'Heater', power: false },
    { name: 'AC2', power: false },
  ]);

  const toggleAppliance = (index) => {
    if (!masterSwitch) return;
    if (openAppliance === index) {
      setOpenAppliance(null);
    } else {
      setOpenAppliance(index);
    }
  };

  const togglePower = (index) => {
    if (!masterSwitch) return;
    const updatedAppliances = [...appliances];
    updatedAppliances[index].power = !updatedAppliances[index].power;
    setAppliances(updatedAppliances);
  };

  const toggleMasterSwitch = () => {
    const newState = !masterSwitch;
    setMasterSwitch(newState);
    const updatedAppliances = appliances.map((appliance) => ({
      ...appliance,
      power: newState,
    }));
    setAppliances(updatedAppliances);
  };

  return (
    <div className='center'>
      <div className="master-switch">
        <label>
          Master Switch:
          <input type="checkbox" checked={masterSwitch} onChange={toggleMasterSwitch} />
        </label>
      </div>
      <div className="appliances-container">
        {appliances.map((appliance, index) => (
          <div className={`appliance ${openAppliance === index ? 'open' : ''}`} key={index} onClick={() => toggleAppliance(index)}>
            <div className="appliance-header">
              {appliance.name}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  togglePower(index);
                }}
                disabled={!masterSwitch}
              >
                {appliance.power ? 'OFF' : 'ON'}
              </button>
            </div>
            {openAppliance === index && (
              <div className="appliance-details">
                <img src={`${appliance.name.toLowerCase()}.jpg`} alt={appliance.name} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Appliances;

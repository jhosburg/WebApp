import React, { useState, useEffect } from 'react';
import './Appliances.css';

function Appliances() {
  const [openAppliance, setOpenAppliance] = useState(null);
  const [masterSwitch, setMasterSwitch] = useState(true);
  const [appliances, setAppliances] = useState([]);
  const [editingApplianceIndex, setEditingApplianceIndex] = useState(null);
  const [editedApplianceName, setEditedApplianceName] = useState("");

  useEffect(() => {
    const savedAppliances = JSON.parse(localStorage.getItem('appliances'));
    if (savedAppliances) {
      setAppliances(savedAppliances);
    }
  }, []);

  // Update localStorage whenever appliances state changes
  useEffect(() => {
    localStorage.setItem('appliances', JSON.stringify(appliances));
  }, [appliances]);

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
    setAppliances((prevAppliances) => {
      const updatedAppliances = [...prevAppliances];
      updatedAppliances[index].power = !updatedAppliances[index].power;
      return updatedAppliances;
    });
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

  const startEditing = (index) => {
    setEditingApplianceIndex(index);
    setEditedApplianceName(appliances[index].name);
  };

  const saveEditedName = (index) => {
    const updatedAppliances = [...appliances];
    updatedAppliances[index].name = editedApplianceName;
    setAppliances(updatedAppliances);
    setEditingApplianceIndex(null);
  };

  const deleteAppliance = (index) => {
    const updatedAppliances = [...appliances];
    updatedAppliances.splice(index, 1); // Remove the appliance at the given index
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
        {appliances && appliances.map((appliance, index) => (
          <div className={`appliance ${openAppliance === index ? 'open' : ''}`} key={index} onClick={() => toggleAppliance(index)}>
            <div className="appliance-header">
              {editingApplianceIndex === index ? (
                <input
                  type="text"
                  value={editedApplianceName}
                  onChange={(e) => setEditedApplianceName(e.target.value)}
                />
              ) : (
                appliance.name
              )}
              {editingApplianceIndex === index ? (
                <button onClick={() => saveEditedName(index)}>Save</button>
              ) : (
                <button onClick={() => startEditing(index)}>Edit</button>
              )}
              <button onClick={() => deleteAppliance(index)}>Delete</button> {/* Add Delete button */}
              <div className='toggle-container' disabled={!masterSwitch}>
                <div className={`toggle-btn ${appliances[index].power ? 'ON' : ''}`} onClick={(e) => {
                  e.stopPropagation();
                  togglePower(index);
                }}>
                  {appliances[index].power ? "ON" : "OFF"}
                </div>
              </div>
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


 
//START OF OLD CODE

/* import React, { useState, useEffect } from 'react';
import './Appliances.css';

function Appliances() {
  const [openAppliance, setOpenAppliance] = useState(null);
  const [masterSwitch, setMasterSwitch] = useState(true);
  const [appliances, setAppliances] = useState([
    { name: 'Microwave', power: false },
    { name: 'Refrigerator', power: false },
    { name: 'Oven', power: false },
    { name: 'Dishwasher', power: false },
    { name: 'Stove', power: false },
    { name: 'Garbage Disposal', power: false },
    { name: 'Kitchen Outlets', power: false },
    { name: 'AC', power: false },
    { name: 'Heater', power: false },
    { name: 'AC2', power: false },
    { name: 'Garage', power: false },
    { name: 'Laundry Room', power: false },
    { name: 'Master Bedroom', power: false },
    { name: 'Bedroom 1', power: false },
    { name: 'Bedroom 2', power: false },
    { name: 'Living Room', power: false },
    { name: 'Dining Room', power: false },
    { name: 'Upstairs Bathroom Outlets', power: false },
    { name: 'Downstairs Bathroom Outlets', power: false },
    { name: 'Office', power: false },
  ]);

  useEffect(() => {
    const savedAppliances = JSON.parse(localStorage.getItem('appliances'));
    if (savedAppliances) {
      setAppliances(savedAppliances);
    }
  }, []);

  // Update localStorage whenever appliances state changes
  useEffect(() => {
    localStorage.setItem('appliances', JSON.stringify(appliances));
  }, [appliances]);

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
    setAppliances((prevAppliances) => {
      const updatedAppliances = [...prevAppliances];
      updatedAppliances[index].power = !updatedAppliances[index].power;
    });
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
                <div className='toggle-container' disabled={!masterSwitch}>
                  <div className={`toggle-btn ${appliances[index].power ? 'ON' : ''}`} onClick={(e) => {
                  e.stopPropagation();
                  togglePower(index);
                }}>
                      {appliances[index].power ? "ON" : "OFF"}
                  </div>
                </div>
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
};

export default Appliances;
            <button
                onClick={(e) => {
                  e.stopPropagation();
                  togglePower(index);
                }}
                disabled={!masterSwitch}
              >
                {appliance.power ? 'OFF' : 'ON'}
              </button>

onClick={(e) => {
                  e.stopPropagation();
                  handleToggleChange(index);
                }}

              <div className='toggle'>
                <toggle = {toggle} handleToggleChange = {handleToggleChange} />
              </div>
      */

              /*const[toggle, setToggle] = useState(appliances.map(() => false));

  const handleToggleChange = (index) => {
    const updatedToggles = [...toggle];
    updatedToggles[index] = !updatedToggles[index];
    setToggle(updatedToggles);
  
    const toggleButton = document.querySelector(`#toggle-${index}`);
    if (toggleButton) {
      toggleButton.style.left = updatedToggles[index] ? '28px' : '2px';
      toggleButton.style.backgroundColor = updatedToggles[index] ? 'rgb(150, 22, 22)' : 'rgb(70, 168, 131)';
    }
  
    togglePower(index);
  }; */

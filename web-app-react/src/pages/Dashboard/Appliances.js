import React, { useState, useEffect } from 'react';
import './Appliances.css';
import LivingRoom from '../charts/LivingRoom'

function Appliances() {
  const [openAppliance, setOpenAppliance] = useState(null);
  const [masterSwitch, setMasterSwitch] = useState(true);
  const [appliances, setAppliances] = useState([]);
  const [editingApplianceIndex, setEditingApplianceIndex] = useState(null);
  const [editedApplianceName, setEditedApplianceName] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [applianceToDelete, setApplianceToDelete] = useState(null);
  const [dropdownItems, setDropdownItems] = useState([]);
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showPowerOffModal, setShowPowerOffModal] = useState(false);
  const [startTime, setStartTime] = useState({ hours: 0, minutes: 0 });
  const [endTime, setEndTime] = useState({ hours: 0, minutes: 0 });

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
    if (showPowerOffModal) return;
    const isTurningOff = appliances[index].power === true;

    if (isTurningOff) {
      setShowPowerOffModal(true);
    }else {
      setShowPowerOffModal(false);
    }
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

  const addNewAppliance = () => {
    // Define a new appliance
    const defaultName = 'New Room';
    const newAppliance = {
      name: defaultName.substring(0, 20),
      power: false,
    };

    // Update the state by appending the new appliance to the existing array
    setAppliances((prevAppliances) => [...prevAppliances, newAppliance]);
  };

  const startEditing = (index) => {
    setEditingApplianceIndex(index);
    setEditedApplianceName(appliances[index].name);
  };

  const saveEditedName = (index) => {
    const updatedAppliances = [...appliances];
    const truncatedName = editedApplianceName.substring(0, 20);
    updatedAppliances[index].name = truncatedName;
    setAppliances(updatedAppliances);
    setEditingApplianceIndex(null);
  };

  
  const deleteAppliance = (index) => {
    setApplianceToDelete(index);
    setShowConfirmation(true);
  };

  const confirmDelete = () => {
    if (applianceToDelete !== null) {
      const updatedAppliances = [...appliances];
      updatedAppliances.splice(applianceToDelete, 1); // Remove the appliance at the given index
      setAppliances(updatedAppliances);
      setApplianceToDelete(null);
      setShowConfirmation(false);
    }
  };

  const cancelDelete = () => {
    setApplianceToDelete(null);
    setShowConfirmation(false);
  };

  const openDropdown = (index) => {
    setOpenDropdownIndex(index);
    setShowDropdown(true);
    setDropdownItems([]);
  };

  const closeDropdown = () => {
    setOpenDropdownIndex(null);
    setShowDropdown(false);
  };

  const toggleDropdown = (index) => {
    if (showDropdown === index) {
      setShowDropdown(null);
    }
    else {
      setShowDropdown(index);
    }
  };

  const addApplianceToDropdown = (itemName) => {
    const newDropdownItems = [...dropdownItems, itemName];
    setDropdownItems(newDropdownItems);
  }

  function ConfirmationDialog({ message, onConfirm, onCancel, index }) {
      return (
        <div className={`confirmation-dialog ${showConfirmation && index === applianceToDelete ? 'show' : ''}`}>
          <p>{message}</p>
          <button onClick={onConfirm}>Yes</button>
          <button onClick={onCancel}>No</button>
        </div>
      ); 
  }

  const handleStartTimeChange = (hours, minutes) => {
    setStartTime({ hours, minutes });
  };
  
  const handleEndTimeChange = (hours, minutes) => {
    setEndTime({ hours, minutes });
  };
  

  function PowerOffModal({ onClose, handleStartTimeChange, handleEndTimeChange }) {
    const hours = Array.from({ length: 24 }, (_, i) => i);
    const minutes = [0, 15, 30, 45];
  
    return (
      <div className="powerOffModal">
        <h2>Confirm Deactivation</h2>
        <p>Select Time Range:</p>
        <div className="timeSelection">
          <div className="timeSelector">
            <label>Start Time:</label>
            <div className="timeDropdown">
              <select
                className="hourDropdown"
                value={startTime.hours}
                onChange={(e) => handleStartTimeChange(e.target.value, startTime.minutes)}
              >
                {hours.map((hour) => (
                  <option key={hour} value={hour}>
                    {hour}
                  </option>
                ))}
              </select>
              <select
                className="minuteDropdown"
                value={startTime.minutes}
                onChange={(e) => handleStartTimeChange(startTime.hours, e.target.value)}
              >
                {minutes.map((minute) => (
                  <option key={minute} value={minute}>
                    {minute}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="timeSelector">
            <label>End Time:</label>
            <div className="timeDropdown">
              <select
                className="hourDropdown"
                value={endTime.hours}
                onChange={(e) => handleEndTimeChange(e.target.value, endTime.minutes)}
              >
                {hours.map((hour) => (
                  <option key={hour} value={hour}>
                    {hour}
                  </option>
                ))}
              </select>
              <select
                className="minuteDropdown"
                value={endTime.minutes}
                onChange={(e) => handleEndTimeChange(endTime.hours, e.target.value)}
              >
                {minutes.map((minute) => (
                  <option key={minute} value={minute}>
                    {minute}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="buttonContainer">
          <button onClick={onClose} className="modalButton" id='cancelButton'>Cancel</button>
          <button className="modalButton" id='confirmButton'>Confirm</button>
        </div>
      </div>
    );
  }

  return (
    <div className='center'>
      <div className="master-switch">
        <h1>Master Switch</h1>
        <label className="switch">
          <input type="checkbox" checked={masterSwitch} onChange={toggleMasterSwitch} />
          <span className="slider round"></span>
        </label>
      </div>
      <div className="appliances-container">
        {appliances && appliances.map((appliance, index) => (
          <div className={`appliance ${openAppliance === index ? 'open' : ''}`} key={index} onClick={() => toggleAppliance(index)}>
            <div className="appliance-header">
            <div className="dropdown">
                <button onClick={() => toggleDropdown(index)}>
                  <i class='bx bxs-chevron-down' ></i>
                </button>
                {showDropdown === index && (
                  <div className="dropdown-content">
                    {dropdownItems.map((item, i) => (
                      <button key={i} className="dropdown-item">
                        {item}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {editingApplianceIndex === index ? (
                <input id='inputApplicationName'
                  type="text"
                  value={editedApplianceName}
                  onChange={(e) => {
                    if (e.target.value.length <= 20) {
                      setEditedApplianceName(e.target.value);
                    }
                  }}
                  maxLength={20}
                />
              ) : (
                appliance.name
              )}
              {editingApplianceIndex === index ? (
                <button id='applianceButton' onClick={() => saveEditedName(index)}>Save</button>
              ) : (
                <button id='applianceButton' onClick={() => startEditing(index)}>Edit</button>
              )}
              <button id='applianceButton' onClick={() => deleteAppliance(index)}>Delete{/* Add Delete button */}</button>
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
                <LivingRoom/>
              </div>
            )}
          </div>
        ))}
      </div>
      {showPowerOffModal && (
        <PowerOffModal 
        onClose={() => setShowPowerOffModal(false)} 
        handleStartTimeChange={handleStartTimeChange}
        handleEndTimeChange={handleEndTimeChange}
        />
      )}
      {showConfirmation && (
                <ConfirmationDialog
                  message="Are you sure you want to delete this appliance?"
                  onConfirm={confirmDelete}
                  onCancel={cancelDelete}
                />
              )}
      <button className="add-new-appliance-btn" onClick={addNewAppliance}>Add New Room/Circuit</button>
    </div>
  );
}

export default Appliances;
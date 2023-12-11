import React, { useState, useEffect } from 'react';
import './Appliances.css';
import LivingRoom from '../charts/LivingRoom'
import axios from 'axios';
import ApplianceChart from '../charts/ApplianceChart';
import SelectionChart from '../charts/SelectionChart';

function Appliances() {
  const [openAppliance, setOpenAppliance] = useState(null);
  const [masterSwitch, setMasterSwitch] = useState(true);
  const [appliances, setAppliances] = useState([]);
  const [editingApplianceIndex, setEditingApplianceIndex] = useState(null);
  const [editingItemIndex, setEditingItemIndex] = useState(null);
  const [editedApplianceName, setEditedApplianceName] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [applianceToDelete, setApplianceToDelete] = useState(null);
  const [dropdownItems, setDropdownItems] = useState([]);
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showPowerOffModal, setShowPowerOffModal] = useState(false);
  const [startTime, setStartTime] = useState({ hours: 0, minutes: 0 });
  const [endTime, setEndTime] = useState({ hours: 0, minutes: 0 });
  const [selectedFile, setSelectedFile] = useState('');
  const [selectedFileName, setSelectedFileName] = useState(''); // Add a state variable to store the selected file name
  const [fileList, setFileList] = useState([]);
  const [selectedApplianceName, setSelectedApplianceName] = useState('');
  const [activeAppliances, setActiveAppliances] = useState([]);
  const [openAppliances, setOpenAppliances] = useState({});




  useEffect(() => {
    // Fetch the list of files from your Django backend when the component mounts
    axios.get('http://127.0.0.1:8000/sdei/file_list')
      .then(response => {
        console.log(response.data); // Check the response data
        setFileList(response.data);

        // Retrieve the selected file from localStorage
        const storedFileName = localStorage.getItem('selectedFileName');
        if (storedFileName) {
          setSelectedFile(storedFileName);
          setSelectedFileName(storedFileName);
          handleFileSelection({ target: { value: storedFileName } });
        }

        const initialOpenAppliances = Array(appliances.length).fill(false);
        setOpenAppliances(initialOpenAppliances);
      })
      .catch(error => {
        console.error('Error fetching file list:', error);
      });
  }, []);

  useEffect(() => {
    // Filter out appliances with power set to false
    const activeAppliancesData = appliances.filter(appliance => appliance.power);
    setActiveAppliances(activeAppliancesData);
  }, [appliances]);
  
  const handleFileSelection = async (event) => {
    if (event.target && event.target.options) {
      const selectedFile = event.target.value;
      setSelectedFile(selectedFile);
      setSelectedFileName(event.target.options[event.target.selectedIndex].text);
    
      localStorage.setItem('selectedFileName', selectedFile);
    
      try {
        // Fetch the JSON data from your Django backend based on the selected file
        const response = await axios.get(`http://127.0.0.1:8000/sdei/selectionchart/${selectedFile}`);
        const jsonData = response.data;
    
        // Extract keys from the first object in the JSON
        const firstObjectKeys = Object.keys(jsonData[0]);
    
        // Exclude the key associated with the timestamp
        const applianceKeys = firstObjectKeys.filter((key) => key !== 'local_15min');
    
        // Map the keys to an array of objects with name and power properties
        const appliances = applianceKeys.map((name) => ({ name, power: true }));
    
        // Update the state with the array of appliance objects
        setAppliances(appliances);
      } catch (error) {
        console.error('Error fetching JSON data:', error);
      }

    }
    
  };
  
  
  
  
  

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/sdei/file_list')
      .then(response => {
        console.log(response.data);
        setFileList(response.data);
      })
      .catch(error => {
        console.error('Error fetching file list:', error);
      });
  }, []);

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
    if (!masterSwitch || showPowerOffModal || showConfirmation) return;
  
    setOpenAppliance((prevIndex) => (prevIndex === index ? null : index));
    setSelectedApplianceName(appliances[index].name);
  };
  

  const togglePower = (index) => {
    if (!masterSwitch) return;
    if (showPowerOffModal || showConfirmation) return;
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
    if (showPowerOffModal || showConfirmation) return;
    const newState = !masterSwitch;
    setMasterSwitch(newState);
    const updatedAppliances = appliances.map((appliance) => ({
      ...appliance,
      power: newState,
    }));
    setAppliances(updatedAppliances);
  };

  const addNewAppliance = () => {
    if (showPowerOffModal || showConfirmation) return;
    // Define a new appliance
    const defaultName = 'New Room';
    const newAppliance = {
      name: defaultName.substring(0, 15),
      power: false,
    };

    // Update the state by appending the new appliance to the existing array
    setAppliances((prevAppliances) => [...prevAppliances, newAppliance]);
  };

  const startEditing = (index) => {
    if (showPowerOffModal || showConfirmation) return;
    setEditingApplianceIndex(index);
    setEditedApplianceName(appliances[index].name);
  };

  const saveEditedName = (index) => {
    if (showPowerOffModal || showConfirmation) return;
    const updatedAppliances = [...appliances];
    const truncatedName = editedApplianceName.substring(0, 15);
    updatedAppliances[index].name = truncatedName;
    setAppliances(updatedAppliances);
    setEditingApplianceIndex(null);
  };

  
  const deleteAppliance = (index) => {
    if (showPowerOffModal || showConfirmation) return;
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
      setSelectedApplianceName(dropdownItems[index]); // Set the selected appliance name based on the index
    } else {
      setShowDropdown(index);
    }
  };
  
  const addItemToAppliance = (applianceIndex, itemName) => {
    setAppliances((prevAppliances) => {
      const updatedAppliances = [...prevAppliances];

      if (!updatedAppliances[applianceIndex].items) {
        updatedAppliances[applianceIndex].items = [];
      }

      const newItem = {
        name: itemName.substring(0, 15),
        power: false,
      };
      updatedAppliances[applianceIndex].items.push(newItem);
      return updatedAppliances;
    });
  };

  
  function Item({itemName, power}) {
    return (
      <div className={`item-tile ${power ? 'ON' : ''}`}>
        <div className="item-header">{itemName}</div>
        <div className="toggle-container">
          <div className={`toggle-btn ${power ? 'ON' : ''}`}>
            {power ? 'ON' : 'OFF'}
          </div>
        </div>
      </div>
    );
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

  console.log('Selected Appliance Name:',selectedApplianceName);

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
          <button onClick={onClose} className="modalButton" id='confirmButton'>Confirm</button>
        </div>
      </div>
    );
  }

  return (
    <div className="report-container">
    <div className="report-header">
      <div className="text">
        <h1 className="heading"></h1>
      </div>
    <div className='center'>
      <div className="master-switch">
        <h1>Master Switch</h1>
        <label className="switch">
          <input type="checkbox" checked={masterSwitch} onChange={toggleMasterSwitch} />
          <span className="slider round">{masterSwitch ? 'ON' : 'OFF'}</span>
          
        </label>
      </div>
      <div style={{padding: '20px'}}>
              <select value={selectedFile} onChange={handleFileSelection}>
                <option value="">Select a file</option>
                  {fileList.map((fileName, index) => (
                <option key={index} value={fileName}>{fileName}</option>
                  ))}
              </select>

            </div>
            </div>
      <div className="appliances-container">
        {appliances && appliances.map((appliance, index) => (
          <div className={`appliance ${openAppliance === index ? 'open' : ''}`} key={index} onClick={() => toggleAppliance(index)}>
            <div className="appliance-header">

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
                <ApplianceChart selectedFileName={selectedFileName} applianceName={selectedApplianceName}/>
                <div className="items-grid">
                  {appliance.items && appliance.items.map((item, itemIndex) => (
                    <Item
                      key={itemIndex}
                      itemName={item.name}
                      power={item.power}
                      />
                  ))}
                </div>
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
{/*       <button className="add-new-appliance-btn" onClick={addNewAppliance}>Add New Room/Circuit</button> */}
    </div>
    <div><SelectionChart selectedFileName={selectedFileName} appliances={appliances}/></div>


    </div>
  );
}

export default Appliances;
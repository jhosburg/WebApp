import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const Appliance = ({ name, description, purpose }) => (
  <div className="card mb-3">
    <div className="card-body">
      <h3 className="card-title">{name}</h3>
      <p className="card-text"><strong>Description:</strong> {description}</p>
      <p className="card-text"><strong>Purpose:</strong> {purpose}</p>
    </div>
  </div>
);

const RoomBreakdown = () => {
  const [isPopupVisible, setPopupVisibility] = useState(false);
  const [selectedAppliance, setSelectedAppliance] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const rooms = [
    { name: "Kitchen" },
    { name: "Living Room"},
    { name: "Bedroom"},
    { name: "Bathroom"},
    { name: "Garage"}

    // Add more rooms as needed
  ];

  const appliances = [
    {
      name: "Refrigerator",
      description: "A large, double-door refrigerator with freezer compartment.",
      purpose: "Keeps perishable food items cold and fresh."
    },
    {
      name: "Washing Machine",
      description: "Front-loading washing machine with multiple wash cycles.",
      purpose: "Cleans clothes and other fabric items."
    },
    {
      name: "Microwave Oven",
      description: "Countertop microwave oven with different power levels.",
      purpose: "Heats and cooks food quickly."
    },
    {
      name: "Dishwasher",
      description: "Under-counter dishwasher with various wash programs.",
      purpose: "Cleans and sanitizes dishes, glasses, and utensils."
    },
    {
      name: "Coffee Maker",
      description: "Drip coffee maker with a built-in grinder.",
      purpose: "Brews fresh coffee from ground beans."
    }
  ];

  const openPopup = (appliance) => {
    setSelectedAppliance(appliance);
    setPopupVisibility(true);
  };

  const closePopup = () => {
    setPopupVisibility(false);
    setSelectedAppliance(null);
  };

  return (
    <div className="container my-5">
      <div className="row mb-4">
        {rooms.map((room, index) => (
          <div className="col-lg-4" key={index}>
            <div className="card" onClick={() => setSelectedRoom(room)}>
              <div className="card-body">
                <h2 className="card-title">{room.name}</h2>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedRoom && (
        <div className="card mb-3" onClick={() => openPopup(null)}>
          <div className="card-body">
            <h2 className="card-title">Appliances in {selectedRoom.name}</h2>
          </div>
        </div>
      )}

      {isPopupVisible && (
        <div className="popup">
          <div className="popup-content card p-3">
            <span className="close" onClick={closePopup}>&times;</span>
            {selectedAppliance && <Appliance {...selectedAppliance} />}
          </div>
        </div>
      )}

      <div className="row mt-4">
        {appliances.slice(0, 5).map((appliance, index) => (
          <div className="col-lg-4" key={index} onClick={() => openPopup(appliance)}>
            <Appliance {...appliance} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomBreakdown;




// import React, { useState, useEffect } from 'react';
// import './room.css';
// import {data} from './info';

// const Room = () => {
//   const [openAppliance, setOpenAppliance] = useState(null);
//   const [masterSwitch, setMasterSwitch] = useState(true);
//   const [appliances, setAppliances] = useState([]);
//   // ... (rest of your state variables and functions)

//   useEffect(() => {
//     // Your existing useEffect logic
//   }, []); // Dependency array is empty, so this useEffect runs once on component mount

//   return (
//     <div className='room-container'>
//       <div className='stock-container'>
//         {data.map((data, key) => {
//           return (
//             <div key={key}>
//               {/* Display apartment and room information */}
//               <h1>
//                 Apartment {data.house} <br />
//                 Flat No.: 313 <br />
//                 No. of Rooms: {data.room} <br />
//                 Appliances for Room 1: {data.appliances['room 1']} <br />
//                 Appliances for Room 2: {data.appliances['room 2']} <br />
//               </h1>

//               <div>
//                 {/* Your form and input elements can go here */}
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default Room;






// import React from 'react'
// import { useState, useEffect } from 'react';
// import {data} from './info';
// import "./room.css";


// export const Room = () => {

//     const [openAppliance, setOpenAppliance] = useState(null);
//     const [masterSwitch, setMasterSwitch] = useState(true);
//     const [appliances, setAppliances] = useState([]);
//     const [editingApplianceIndex, setEditingApplianceIndex] = useState(null);
//     const [editedApplianceName, setEditedApplianceName] = useState("");
//     const [showConfirmation, setShowConfirmation] = useState(false);
//     const [applianceToDelete, setApplianceToDelete] = useState(null);
//     const [dropdownItems, setDropdownItems] = useState([]);
//     const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
//     const [showDropdown, setShowDropdown] = useState(false);
  
//     useEffect(() => {
//       const savedAppliances = JSON.parse(localStorage.getItem('appliances'));
//       if (savedAppliances) {
//         setAppliances(savedAppliances);
//       }
//     }, []);
  
//     // Update localStorage whenever appliances state changes
//     useEffect(() => {
//       localStorage.setItem('appliances', JSON.stringify(appliances));
//     }, [appliances]);

//     //new code

//     ////
  
//     const toggleAppliance = (index) => {
//       if (!masterSwitch) return;
//       if (openAppliance === index) {
//         setOpenAppliance(null);
//       } else {
//         setOpenAppliance(index);
//       }
//     };
  
//     const togglePower = (index) => {
//       if (!masterSwitch) return;
//       setAppliances((prevAppliances) => {
//         const updatedAppliances = [...prevAppliances];
//         updatedAppliances[index].power = !updatedAppliances[index].power;
//         return updatedAppliances;
//       });
//     };
  
//     const toggleMasterSwitch = () => {
//       const newState = !masterSwitch;
//       setMasterSwitch(newState);
//       const updatedAppliances = appliances.map((appliance) => ({
//         ...appliance,
//         power: newState,
//       }));
//       setAppliances(updatedAppliances);
//     };
  
//     const addNewAppliance = () => {
//       // Define a new appliance
//       const defaultName = 'New Room';
//       const newAppliance = {
//         name: defaultName.substring(0, 20),
//         power: false,
//       };
  
//       // Update the state by appending the new appliance to the existing array
//       setAppliances((prevAppliances) => [...prevAppliances, newAppliance]);
//     };
  
//     const startEditing = (index) => {
//       setEditingApplianceIndex(index);
//       setEditedApplianceName(appliances[index].name);
//     };
  
//     const saveEditedName = (index) => {
//       const updatedAppliances = [...appliances];
//       const truncatedName = editedApplianceName.substring(0, 20);
//       updatedAppliances[index].name = truncatedName;
//       setAppliances(updatedAppliances);
//       setEditingApplianceIndex(null);
//     };
  
    
//     const deleteAppliance = (index) => {
//       setApplianceToDelete(index);
//       setShowConfirmation(true);
//     };
  
//     const confirmDelete = () => {
//       if (applianceToDelete !== null) {
//         const updatedAppliances = [...appliances];
//         updatedAppliances.splice(applianceToDelete, 1); // Remove the appliance at the given index
//         setAppliances(updatedAppliances);
//         setApplianceToDelete(null);
//         setShowConfirmation(false);
//       }
//     };
  
//     const cancelDelete = () => {
//       setApplianceToDelete(null);
//       setShowConfirmation(false);
//     };
  
//     const openDropdown = (index) => {
//       setOpenDropdownIndex(index);
//       setShowDropdown(true);
//       setDropdownItems([]);
//     };
  
//     const closeDropdown = () => {
//       setOpenDropdownIndex(null);
//       setShowDropdown(false);
//     };
  
//     const toggleDropdown = (index) => {
//       if (showDropdown === index) {
//         setShowDropdown(null);
//       }
//       else {
//         setShowDropdown(index);
//       }
//     };
  
//     const addApplianceToDropdown = (itemName) => {
//       const newDropdownItems = [...dropdownItems, itemName];
//       setDropdownItems(newDropdownItems);
//     }
  
//     function ConfirmationDialog({ message, onConfirm, onCancel, index }) {
//         return (
//           <div className={`confirmation-dialog ${showConfirmation && index === applianceToDelete ? 'show' : ''}`}>
//             <p>{message}</p>
//             <button onClick={onConfirm}>Yes</button>
//             <button onClick={onCancel}>No</button>
//           </div>
//         ); 
//     }

//   return (
//     <div className='room-container'>
//        <div className="stock-container">

// {data.map((data, key) => {

//   return (
// <div>
//     <div key={key}>

//     <h1>
//         Apartment {data.house} <br />
//         Flat No.: 313 <br />
//         No. of Rooms: {data.room} <br />
//         Appliances for Room 1: {data.appliances["room 1"]} <br />
//         Appliances for Room 2: {data.appliances["room 2"]} < br />
//     </h1>

//     </div>

//     <div>
//     <form id="form">
//             <select id="category">
//                 <option value="" selected disabled> Select Room</option>
//                 <option value="new-category"> Add New Room</option>
//             </select>

//             <div id="categoryModal" class="modal">
//                 <div class="modal-content">
//                     <span class="close">X</span>
//                     <h2> Add New Category </h2>
//                     <input type="text" id="newCategory" placeholder="New Category" />
//                     <button id="addCategory" class="btn"> Add Category</button>
//                 </div>
//             </div>

//         </form>
    
//     </div>

// </div>

//   );

// })}

// </div>
//     </div>
//   )
// }

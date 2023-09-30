import React, { useEffect, useState } from 'react';
import './Home.css';
import axios from 'axios';
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart }            from 'react-chartjs-2'
import HomeChart from '../charts/GraphOne'


function Home() {
   





   const [file, setFile] = useState(null);
   const [fileError, setFileError] = useState('');
   const [fileAccepted, setFileAccepted] = useState(false); // Added state for accepted file

   const handleFileChange = (event) => {
      const selectedFile = event.target.files[0];
      if (selectedFile) {
         const fileName = selectedFile.name;
         const fileExtension = fileName.slice(((fileName.lastIndexOf(".") - 1) >>> 0) + 2); // Get the file extension

         if (fileExtension.toLowerCase() !== 'json') {
            setFileError('Please select a JSON file.');
            setFile(null); // Clear the selected file
            setFileAccepted(false); // Reset accepted state
         } else {
            setFile(selectedFile);
            setFileError(''); // Clear any previous error
            setFileAccepted(true); // Set accepted state to true
         }
      } else {
         setFile(null);
         setFileError('');
         setFileAccepted(false); // Clear accepted state if no file is selected
      }
   };


    const handleUpload = async () => {
        console.log('Upload button clicked');
        if (!file) {
         setFileError('Please select a JSON file.');
         return; // Do not proceed with upload
     }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://127.0.0.1:8000/sdei/json_upload/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                console.log('Excel file uploaded successfully');
                setFileError(''); // Clear any previous error
            }
        } catch (error) {
            console.error('Error uploading Excel file:', error);
            setFileError('An error occurred while uploading the JSON file.');
        }
    };


  return (
    <div className="main">
            <div className="report-container">
               <div className="report-header">
                  <div className="text">
                     <h1 class="heading">Overall Power Usage</h1>
                  </div>
                  <div>
                     <label className="custom-button" htmlFor="fileInput">
                        Choose File
                     </label>
                     <input
                        type="file"
                        accept=".json"
                        id="fileInput"
                        className="custom-file-input"
                        onChange={handleFileChange}
                     />
                     <button className="upload-button" onClick={handleUpload}>Upload File</button>
                     {fileAccepted && <p className="success-message">JSON file accepted.</p>}
                     {fileError && <p className="error-message">{fileError}</p>}
                  </div>
               </div>
               
                 
                     <h2>Main Graph</h2>
                     <HomeChart />
                     
                  
               
            </div>
      </div>
  )
}

export default Home;
import React, { useEffect, useState } from 'react';
import './Home.css';
import axios from 'axios';
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart }            from 'react-chartjs-2'
import HomeChart from '../charts/GraphOne'
import OneMonth from '../charts/OneMonthUsage';
import OneYear from '../charts/FullYear';
import solar from './solar.jpg';



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


      const [activeTab, setActiveTab] = useState('mainGraph'); // Default to the main graph tab
    
      const handleTabClick = (tabName) => {
        setActiveTab(tabName);
      };

      return (
         <><div className="main">
          <div className="report-container">
            <div className="report-header">
              <div className="text">
                <h1 className="heading">Overall Power Usage</h1>
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
                  onChange={handleFileChange} />
                <button className="upload-button" onClick={handleUpload}>
                  Upload File
                </button>
                {fileAccepted && <p className="success-message">JSON file accepted.</p>}
                {fileError && <p className="error-message">{fileError}</p>}
              </div>
            </div>

            <div className="tabs">
              <button
                className={activeTab === 'mainGraph' ? 'active-tab' : 'tab'}
                onClick={() => handleTabClick('mainGraph')}
              >
                24 Hours
              </button>
              <button
                className={activeTab === 'tab2' ? 'active-tab' : 'tab'}
                onClick={() => handleTabClick('tab2')}
              >
                1 Month
              </button>
              <button
                className={activeTab === 'tab3' ? 'active-tab' : 'tab'}
                onClick={() => handleTabClick('tab3')}
              >
                1 Year
              </button>
            </div>

            {activeTab === 'mainGraph' && (
              <div>
                <h2>24 Hours</h2>
                <HomeChart />
              </div>
            )}

            {activeTab === 'tab2' && (
              <div>
                <h2>30 Day Power Usage</h2>
                <OneMonth />
              </div>
            )}

            {activeTab === 'tab3' && (
              <div>
                <h2>12 month power Usage</h2>
                <OneYear />
              </div>
            )}
          </div>
        </div>
        <div className='introduction'>
          <img id='solarImage' src={solar} alt='solar' />
          <div className='content'>
            <h1 id='title'>mPower</h1>
            <p id='subTitle'>In a world that is increasingly becoming distributed and interconnected at the same time,
              new innovative concepts are needed to facilitate this shift.
            </p>
            <h2 id='titleDescription'>Unlocking Renewable Energy Storage</h2>
            <h3 id='descriptionSubTitle'>Optimizing the value of residential and commercial <br></br>energy
              storage for households and business and <br></br>paving the way for renewables.
            </h3>
            <p className='smallHeader' id='smallHeader1'>
              mPower turns any ordinary circuit breaker panel into a smart panel
            </p>
            <div className='blueLine' id='blueLine1'></div>
            <p className='description' id='description1'>
              mPower can be easily snapped into any existing circuit breaker panel and the
              smart architecture allows it <br></br> to be tailored to any specific number of breakers
              at an affordable cost. <br></br><br></br>

              That’s not all – with dynamic sensoring and tracking, mPower also provides
              actionable feedback for better <br></br>energy management. When deployed at scale,  it can
              provide smarter utility information to city leaders and <br></br>utilities as they seek to effectively
              employ a municipality’s energy supplies.
            </p>
            <p className='smallHeader' id='smallHeader2'>
              mPower Value Proposition
            </p>
            <p className='description' id='description2'>
            <li>Allowing users to manage energy storage consumption efficiently and cost-effectively</li>
              <li>Delivers discretion over what circuits to use in any situation (normalized or emergency)</li>
              <li>Unlocks energy storage performance and dramatically improves its return on investment</li>
              <li>Serves as a tool to manage consumption across a community and better utilize renewable <br></br>energy resources</li>
            </p>
            <div className='blueLine' id='blueLine2'></div>
            <div className='rectangle'></div>
          </div>
        </div></>
       );
     }


export default Home;
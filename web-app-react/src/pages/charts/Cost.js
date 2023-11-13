import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart }            from 'react-chartjs-2'

function Cost({selectedFileName}) {
    const [jsonData, setJsonData] = useState([]);
    const [dateColumn, setDateColumn] = useState(null); // Initialize dateColumn state
    const [fetchingData, setFetchingData] = useState(null);
    const [hourlyData, setHourlyData] = useState([]); // Define hourlyData state
    const [is15MinuteIncrement, setIs15MinuteIncrement] = useState(false); // Define is15MinuteIncrement state
    const [isLoading, setIsLoading] = useState(true); // Add a loading state
    const [selectedStartDate, setSelectedStartDate] = useState(null); // Add selectedStartDate state

    
    const fetchData = async () => {
      setFetchingData(true);
      const filename = selectedFileName;
  
      try {
        const response = await axios.get(`http://127.0.0.1:8000/sdei/grabJson/${filename}`);
        const data = response.data;
  
        let newDateColumn = null;
  
        // Find the date column dynamically by checking if values can be parsed as Dates
        for (const key in data[0]) {
          if (data[0].hasOwnProperty(key)) {
            const sampleValue = data[0][key];
            if (sampleValue && !isNaN(new Date(sampleValue).getTime())) {
              newDateColumn = key;
              break;
            }
          }
        }
  
        if (!newDateColumn) {
          console.error('No date column found in the data.');
          setFetchingData(false);
          return;
        }
  
        setDateColumn(newDateColumn);
  
        // Calculate the start date as the earliest date found in the data
        const startDate = selectedStartDate || new Date(data[0][newDateColumn]);
  
        // Calculate the end date as 24 hours after the start date
        const endDate = new Date(startDate);
        endDate.setHours(endDate.getHours() + 24);
  
        // Filter the data to include only the 24-hour period starting from the calculated start date
        const filteredData = data.filter((entry) => {
          const entryDate = new Date(entry[newDateColumn]);
          return entryDate >= startDate && entryDate <= endDate;
        });
  
        const newHourlyData = {};
        filteredData.forEach((entry) => {
          const entryDate = new Date(entry[newDateColumn]);
          const hourKey = `${entryDate.getHours()}:00`; // Hourly key, e.g., "8:00", "9:00"
          if (!newHourlyData[hourKey]) {
            newHourlyData[hourKey] = {
              totalUsage: 0,
              totalAfter: 0,
              count: 0,
            };
          }
          newHourlyData[hourKey].totalUsage += calculateTotalCost(entry);
          newHourlyData[hourKey].totalAfter += calculateTotalCostAfter(entry);
          newHourlyData[hourKey].count++;
        });
  
        setHourlyData(newHourlyData);
        setJsonData(data);
        setFetchingData(false);
        setIsLoading(false);
  
      } catch (error) {
        console.error('Error grabbing JSON Data:', error);
        setFetchingData(false);
        setIsLoading(false);
      }
    };
  
    useEffect(() => {
      const fetchDataWrapper = async () => {
        if (selectedFileName) {
          await fetchData();
        }
      };
  
      fetchDataWrapper();
    }, [selectedFileName, dateColumn]);

    function calculateTotalCost(entry) {
        if ('cost_before' in entry) {
          
          return entry.cost_before;
        } 
        
        else { //if no grid and no solar column manually calc usage
          
      
          return null;
        }
      }

      function calculateTotalCostAfter(entry) {
        if ('cost_after' in entry) {
          
          return entry.cost_after;
        } 
        
        else { //if no grid and no solar column manually calc usage
          
      
          return null;
        }
      }



    const hourlyLabels = Object.keys(hourlyData);
    const hourlyTotalCost = hourlyLabels.map((hour) => hourlyData[hour]?.totalUsage);
    const hourlyTotalAfter = hourlyLabels.map((hour) => hourlyData[hour]?.totalAfter);
    const totalCostSum = hourlyTotalCost.reduce((acc, value) => acc + value, 0);
    const totalCostAfter = hourlyTotalAfter.reduce((acc, value) => acc + value, 0);


      const chartData = {
        labels: hourlyLabels,
        datasets: [
            {
                label: 'Cost Before',
                data: hourlyTotalCost,
                fill: true,
                borderColor: 'grey',
                backgroundColor: 'rgba(255, 128, 0, 0.2)', // Set the background color for bars
                borderWidth: 1, // Set the border width for bars
                hoverBackgroundColor: 'rgba(255, 128, 0, 0.4)', // Set the background color when hovering
                type: 'bar',

            },
            {
                label: 'Cost After',
                data: hourlyTotalAfter,
                fill: true,
                borderColor: 'green',
                backgroundColor: 'rgba(46, 204, 113, 0.2)', // Set the background color for bars
                borderWidth: 1, // Set the border width for bars
                hoverBackgroundColor: 'rgba(46, 204, 113, 0.4)', // Set the background color when hovering
                type: 'bar',

            },
        ],
        
    };

    const chartOptions = {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Date/Time'
                },
                type: 'category', // Use 'category' scale for X-axis
                position: 'bottom', // Optional: Position the labels at the bottom
            },
            y: {
                title: {
                    display: true,
                    text: 'Cost',
                },
                beginAtZero: true, // Customize Y-axis as needed
            },
            
        },
    };

    const getFormattedDate = (date) => {
        if (jsonData && jsonData[0] && dateColumn) {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        } else {
            return null; // or handle it accordingly based on your requirements
        }
    };
    

    const handleStartDateChange = (event) => {
        const selectedDate = new Date(event.target.value);
      
        // Check if the selected date is within the range of your data
        const earliestDate = new Date(jsonData[0][dateColumn]);
        const latestDate = new Date(jsonData[jsonData.length - 1][dateColumn]);
      
        if (selectedDate >= earliestDate && selectedDate <= latestDate) {
          setSelectedStartDate(selectedDate);
          // Call fetchData when the selected date changes
          fetchData();
        } else {
          // Provide feedback to the user if the selected date is outside the data range
          alert("Please select a date within the range of your data.");
        }
      };
      

    return (
        <div>

            <h2>Total Cost 24 Hours</h2>

            {/* Add a dropdown for users to select the start date */}
            <label htmlFor="startDate">Select Start Date:</label>
            <input
            type="date"
            id="startDate"
            name="startDate"
            onChange={handleStartDateChange}
            min={isLoading ? "" : getFormattedDate(new Date(jsonData[0][dateColumn]))}
            max={isLoading ? "" : getFormattedDate(new Date(jsonData[jsonData.length - 1][dateColumn]))}
            />
            <h3>Total Cost Before : ${totalCostSum}</h3>
            <h3>Total Cost After : ${totalCostAfter}</h3>
            <Line data={chartData} options={chartOptions}/>
        </div>
    );
}




export default Cost;
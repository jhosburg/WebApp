import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line, Bar } from 'react-chartjs-2';
import { Chart }            from 'react-chartjs-2'

function HomeChart({selectedFileName}) {
    const [jsonData, setJsonData] = useState([]);
    const [dateColumn, setDateColumn] = useState(null); // Initialize dateColumn state
    const [fetchingData, setFetchingData] = useState(null);
    const [hourlyData, setHourlyData] = useState([]); // Define hourlyData state
    const [is15MinuteIncrement, setIs15MinuteIncrement] = useState(false); // Define is15MinuteIncrement state
    const [isLoading, setIsLoading] = useState(true); // Add a loading state
    
    const fetchData = () => {
      if (selectedFileName) {
        setFetchingData(true);
        const filename = selectedFileName;
        axios
          .get(`http://127.0.0.1:8000/sdei/grabJson/${filename}`)
          .then((response) => {
            const data = response.data;
  
            // Find the date column dynamically by checking if values can be parsed as Dates
            if (!dateColumn) {
              for (const key in data[0]) {
                if (data[0].hasOwnProperty(key)) {
                  const sampleValue = data[0][key];
                  if (sampleValue && !isNaN(new Date(sampleValue).getTime())) {
                    setDateColumn(key);
                    break;
                  }
                }
              }
            }
  
            if (!dateColumn) {
              console.error('No date column found in the data.');
              setFetchingData(false);
              return;
            }
  
            // Calculate the start date as the earliest date found in the data
            const startDate = new Date(data[0][dateColumn]);
  
            // Calculate the end date as 24 hours after the start date
            const endDate = new Date(startDate);
            endDate.setHours(endDate.getHours() + 24);
  
            // Filter the data to include only the 24-hour period starting from the calculated start date
            const filteredData = data.filter((entry) => {
              const entryDate = new Date(entry[dateColumn]);
              return entryDate >= startDate && entryDate <= endDate;
            });

            const hourlyData = {};
            filteredData.forEach((entry) => {
              const entryDate = new Date(entry[dateColumn]);
              const hourKey = `${entryDate.getHours()}:00`; // Hourly key, e.g., "8:00", "9:00"
              if (!hourlyData[hourKey]) {
                hourlyData[hourKey] = {
                  totalUsage: 0,
                  solarUsage: 0,
                  count: 0,
                };
              }
              hourlyData[hourKey].totalUsage += calculateTotalUsage(entry);
              hourlyData[hourKey].solarUsage += entry.solar * 0.25;
              hourlyData[hourKey].count++;
            });

            const timeIncrement = new Date(filteredData[1][dateColumn]) - new Date(filteredData[0][dateColumn]);
            setIs15MinuteIncrement(timeIncrement === 900000); // 900000ms = 15 mins
          

            setHourlyData(hourlyData);
            setJsonData(jsonData);
            setFetchingData(false);            
            setIsLoading(false); // Set loading state to false when data is fetched

          })
          .catch((error) => {
            console.error('Error grabbing JSON Data:', error);
            setFetchingData(false);
            setIsLoading(false); // Set loading state to false when data is fetched

          });
      }
    };


    useEffect(() => {
      if (selectedFileName) {
        fetchData(); // Fetch data when selectedFileName changes
      }
    }, [selectedFileName, dateColumn, is15MinuteIncrement]);

      console.log("Data in State:", jsonData);
      console.log("Data in State:", hourlyData);

      function calculateTotalUsage(entry) {
        if ('grid' in entry && 'solar' in entry) {
          if (is15MinuteIncrement) {
            return (entry.grid + entry.solar) * 0.25;
          }
          return entry.grid + entry.solar;
        } 
        else { //if no grid and no solar column manually calc usage
          let total = 0;
      
          for (const key in entry) {
            if (key !== dateColumn && key !== 'grid' && key !== 'solar') {
              const value = entry[key];
              if (!isNaN(value)) {
                total += value;
              }
            }
          }
      
          if (is15MinuteIncrement) { //if 15 min increments, convert to kwh
            return total * 0.25;
          }
      
          return total;
        }
      }

      

      const hourlyLabels = Object.keys(hourlyData);
      const hourlyTotalUsage = hourlyLabels.map((hour) => hourlyData[hour]?.totalUsage);
      const hourlySolarData = hourlyLabels.map((hour) => hourlyData[hour]?.solarUsage);
      const totalUsageSum = hourlyTotalUsage.reduce((acc, value) => acc + value, 0);



    const chartData = {
        labels: hourlyLabels,
        datasets: [
            {
                label: 'Total Usage of Home',
                data: hourlyTotalUsage,
                fill: true,
                borderColor: 'green',
                backgroundColor: 'rgba(19, 146, 97, 0.2)', // Set the background color for bars
                borderWidth: 1, // Set the border width for bars
                hoverBackgroundColor: 'rgba(19, 146, 97, 0.4)', // Set the background color when hovering
                type: 'line',

            },
            {
                label: 'Solar',
                data: hourlySolarData,
                fill: true,
                borderColor: 'grey',
                backgroundColor: 'rgba(255, 255, 0, 0.2)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255, 255, 0, 0.4)',
                type: 'line',
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
                    text: 'kWh',
                },
                beginAtZero: true, // Customize Y-axis as needed
            },
            
        },
    };

    return (
        <div>

            <h2>Total House Usage 24 Hours</h2>
            <h3>Total Usage : {totalUsageSum} kWh</h3>
            <Line data={chartData} options={chartOptions}/>
        </div>
    );
}

export default HomeChart;
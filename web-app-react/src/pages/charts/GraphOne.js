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
        const startDate = new Date(data[0][newDateColumn]);
  
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
              BatUsage: 0,
              Charge: 0,
              DisCharge: 0,
              count: 0,
            };
          }
          newHourlyData[hourKey].totalUsage += calculateTotalUsage(entry);
          newHourlyData[hourKey].BatUsage += entry.net * 0.25;
          newHourlyData[hourKey].Charge += entry.charge * 0.25;
          newHourlyData[hourKey].DisCharge += entry.discharge * 0.25;
          newHourlyData[hourKey].count++;
        });
  
        const timeIncrement = new Date(filteredData[1][newDateColumn]) - new Date(filteredData[0][newDateColumn]);
        setIs15MinuteIncrement(timeIncrement === 900000); // 900000ms = 15 mins
  
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
    }, [selectedFileName, dateColumn, is15MinuteIncrement]);

      console.log("Data in State:", jsonData);
      console.log("Data in State:", hourlyData);

      function calculateTotalUsage(entry) {
        if ('grid' in entry) {
          if (is15MinuteIncrement) {
            return (entry.grid * 0.25);
          }
          return entry.grid;;
        } 
        else if ('grid' in entry && 'net' in entry) {
          if (is15MinuteIncrement) {
            return (entry.grid) * 0.25;
          }
          return entry.grid;
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
      const hourlyBatData = hourlyLabels.map((hour) => hourlyData[hour]?.BatUsage);
      const hourlyCharge = hourlyLabels.map((hour) => hourlyData[hour]?.Charge);
      const hourlyDisCharge = hourlyLabels.map((hour) => hourlyData[hour]?.DisCharge);
      const totalUsageSum = hourlyTotalUsage.reduce((acc, value) => acc + value, 0);



    const chartData = {
        labels: hourlyLabels,
        datasets: [
            {
                label: 'Total Usage of Home without Battery',
                data: hourlyTotalUsage,
                fill: true,
                borderColor: 'green',
                backgroundColor: 'rgba(46, 204, 113, 0.2)', // Set the background color for bars
                borderWidth: 1, // Set the border width for bars
                hoverBackgroundColor: 'rgba(46, 204, 113, 0.4)', // Set the background color when hovering
                type: 'line',

            },
            {
                label: 'With Battery',
                data: hourlyBatData,
                fill: true,
                borderColor: 'grey',
                backgroundColor: 'rgba(127, 140, 141, 0.2)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(127, 140, 141, 0.4)',
                type: 'line',
              },
              {
                label: 'Battery Charge',
                data: hourlyCharge,
                fill: true,
                borderColor: 'grey',
                backgroundColor: 'rgba(243, 156, 18, 0.2)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(243, 156, 18, 0.4)',
                type: 'bar',
              },
              {
                label: 'Battery DisCharge',
                data: hourlyDisCharge,
                fill: true,
                borderColor: 'grey',
                backgroundColor: 'rgba(52, 152, 219, 0.2)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(52, 152, 219, 0.4)',
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
                    text: 'kWh',
                },
                beginAtZero: true, // Customize Y-axis as needed
            },
            
        },
    };

    return (
        <div>

            <h2>Total House Usage 24 Hours</h2>
            <h3>Total Usage : {totalUsageSum.toFixed(2)} kWh</h3>
            <Line data={chartData} options={chartOptions}/>
        </div>
    );
}

export default HomeChart;
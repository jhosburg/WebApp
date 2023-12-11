import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line, Bar } from 'react-chartjs-2';
import { Chart }            from 'react-chartjs-2'

function SelectionChart({selectedFileName, appliances}) {
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
        const response = await axios.get(`http://127.0.0.1:8000/sdei/selectionchart/${filename}`);
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

        const filteredData = data.map((entry) => {
            const filteredEntry = { [newDateColumn]: entry[newDateColumn] };
            appliances.forEach((appliance) => {
              if (appliance.power) {
                filteredEntry[appliance.name] = entry[appliance.name];
              }
            });
            return filteredEntry;
          });
      
          // Calculate the start date as the earliest date found in the data
          const startDate = new Date(data[0][newDateColumn]);
      
          // Calculate the end date as 24 hours after the start date
          const endDate = new Date(startDate);
          endDate.setHours(endDate.getHours() + 24);
      
          // Filter the data to include only the 24-hour period starting from the calculated start date
          const filteredData24Hours = filteredData.filter((entry) => {
            const entryDate = new Date(entry[newDateColumn]);
            return entryDate >= startDate && entryDate <= endDate;
          });
  
        const newHourlyData = [];
        filteredData24Hours.forEach((entry) => {
          const entryDate = new Date(entry[newDateColumn]);
          const hourKey = `${entryDate.getHours()}:00`;
          const totalUsage = calculateTotalUsage(entry);
          newHourlyData.push({ hour: hourKey, totalUsage });
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
      }, [selectedFileName, dateColumn, is15MinuteIncrement, appliances]);

      
      function calculateTotalUsage(entry) {
        let total = 0;
      
        // Iterate over the keys in the entry object
        for (const key in entry) {
          // Exclude specified columns and dateColumn
          if (key !== dateColumn && key !== 'grid' && key !== 'net') {
            const value = entry[key];
            // Add numeric values to the total
            if (!isNaN(value)) {
              total += value;
            }
          }
        }
      
        // If 15-minute increments, convert total to kWh
        if (is15MinuteIncrement) {
          return total * 0.25;
        }
      
        return total;
      }
      

    

      const hourlyLabels = hourlyData.map((hour) => hour.hour); // Updated
      const hourlyTotalUsage = hourlyData.map((hour) => hour.totalUsage); // Updated
      const totalUsageSum = hourlyTotalUsage.reduce((acc, value) => acc + value, 0);
    
      const chartData = {
        labels: hourlyLabels,
        datasets: [
          {
            label: 'Total Usage of Home without Battery',
            data: hourlyTotalUsage,
            fill: true,
            borderColor: 'green',
            backgroundColor: 'rgba(46, 204, 113, 0.2)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(46, 204, 113, 0.4)',
            type: 'line',
          },
        ],
      };
    
      const chartOptions = {
        scales: {
          x: {
            title: {
              display: true,
              text: 'Date/Time',
            },
            type: 'category',
            position: 'bottom',
          },
          y: {
            title: {
              display: true,
              text: 'kWh',
            },
            beginAtZero: true,
          },
        },
      };
    
      return (
        <div>
          <h2>Total House Usage 24 Hours</h2>
          <h3>Total Usage: {totalUsageSum.toFixed(2)} kWh</h3>
          <Line data={chartData} options={chartOptions} />
        </div>
      );
    }
    
    export default SelectionChart;
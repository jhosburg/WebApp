import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line, Bar } from 'react-chartjs-2';
import { Chart }            from 'react-chartjs-2'

function HomeChart() {
    const [jsonData, setJsonData] = useState([]);
    const [dateColumn, setDateColumn] = useState(null); // Initialize dateColumn state
    
    useEffect(() => {
        const filename = '15_MIN_AUSTIN.json';
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
      
            setJsonData(filteredData);
          })
          .catch((error) => {
            console.error('Error grabbing JSON Data:', error);
          });
      }, [dateColumn]);
      

      console.log("Data in State:", jsonData);

   
      const labels = jsonData?.map((item) => item[dateColumn]);

      const totalUsage = jsonData?.map((item) => (item.grid + item.solar) * 0.25); // Calculate total usage as grid + solar

      const solarData = jsonData?.map((item) => item.solar * 0.25);
      
      

      const totalUsageSum = totalUsage.reduce((acc, value) => acc + value, 0);



    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Total Usage of Home',
                data: totalUsage,
                fill: true,
                borderColor: 'green',
                backgroundColor: 'rgba(19, 146, 97, 0.2)', // Set the background color for bars
                borderWidth: 1, // Set the border width for bars
                hoverBackgroundColor: 'rgba(19, 146, 97, 0.4)', // Set the background color when hovering
                type: 'line',

            },
            {
                label: 'Solar',
                data: solarData,
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
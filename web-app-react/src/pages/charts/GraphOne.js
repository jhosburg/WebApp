import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart }            from 'react-chartjs-2'

function HomeChart() {
    const [jsonData, setJsonData] = useState([]);
    
    useEffect(() => {
        const filename = '15_MIN_AUSTIN.json';
        axios
          .get(`http://127.0.0.1:8000/sdei/grabJson/${filename}`)
          .then((response) => {
            // Filter the data to include only the 24-hour period ending at 23:45:00 on January 1st
            const endDate = new Date('2018-01-01 23:45:00');
            const startDate = new Date(endDate);
            startDate.setDate(startDate.getDate() - 1); // Go back 24 hours
      
            const filteredData = response.data.filter((entry) => {
              const entryTimestamp = new Date(entry.local_15min);
              return entryTimestamp >= startDate && entryTimestamp <= endDate;
            });
      
            setJsonData(filteredData);
          })
          .catch((error) => {
            console.error('Error grabbing JSON Data:', error);
          });
      }, []);

   
      const labels = jsonData?.map((item) => item.local_15min);

        const calculateTotalPowerUsage = (entry) => {
            let sum = 0;
            for (const key in entry) {
            if (key !== 'local_15min') {
                sum += entry[key];
            }
            }
            return sum;
        };

        const totalUsageData = jsonData?.map((item) => calculateTotalPowerUsage(item));


    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Total Usage of all Appliances',
                data: totalUsageData,
                fill: true,
                borderColor: 'green',
                backgroundColor: 'rgba(19, 146, 97, 0.2)', // Set the background color for bars
                borderWidth: 1, // Set the border width for bars
                hoverBackgroundColor: 'rgba(19, 146, 97, 0.4)', // Set the background color when hovering
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
                    text: 'kW',
                },
                beginAtZero: true, // Customize Y-axis as needed
            },
        },
    };

    return (
        <div>
            <h2>Total House Usage 24 Hours</h2>

            <Line data={chartData} options={chartOptions}/>
        </div>
    );
}

export default HomeChart;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart }            from 'react-chartjs-2'

function OneYear() {
    const [jsonData, setJsonData] = useState([]);
    
    useEffect(() => {
        const filename = '15_MIN_AUSTIN.json';
        axios
          .get(`http://127.0.0.1:8000/sdei/grabJson/${filename}`)
          .then((response) => {
            setJsonData(response.data);
          })
          .catch((error) => {
            console.error('Error grabbing JSON Data:', error);
          });
      }, []);
    
      const labels = []; // Array to store X-axis labels (month-year)
      const monthlyTotalUsage = []; // Array to store the total usage for each month
    
      // Create a function to calculate the total power usage for an entry
      const calculateTotalPowerUsage = (entry) => {
        let sum = 0;
        for (const key in entry) {
          if (key !== 'local_15min') {
            sum += entry[key];
          }
        }
        return sum;
      };


      if (jsonData.length > 0) {
        let currentMonth = -1;
        let currentYear = -1;
        let totalForMonth = 0;
    
        jsonData.forEach((entry) => {
          const entryDate = new Date(entry.local_15min);
          const entryMonth = entryDate.getMonth();
          const entryYear = entryDate.getFullYear();
    
          if (currentMonth === -1 && currentYear === -1) {
            currentMonth = entryMonth;
            currentYear = entryYear;
          }
    
          if (currentMonth === entryMonth && currentYear === entryYear) {
            totalForMonth += calculateTotalPowerUsage(entry);
          } else {
            labels.push(`${currentMonth + 1}/${currentYear}`);
            monthlyTotalUsage.push(totalForMonth);
            currentMonth = entryMonth;
            currentYear = entryYear;
            totalForMonth = calculateTotalPowerUsage(entry);
          }
        });
    
        labels.push(`${currentMonth + 1}/${currentYear}`);
        monthlyTotalUsage.push(totalForMonth);
      }

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Total Usage of all Appliances',
                data: monthlyTotalUsage,
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
            <h2>Total House Usage One Year</h2>

            <Line data={chartData} options={chartOptions}/>
        </div>
    );
}

export default OneYear;
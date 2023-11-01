import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart }            from 'react-chartjs-2'

function OneMonth() {
    const [jsonData, setJsonData] = useState([]);

    const endDate = new Date('2018-01-31 23:45:00');
    
    useEffect(() => {
        const filename = '15_MIN_AUSTIN.json';
        axios
          .get(`http://127.0.0.1:8000/sdei/grabJson/${filename}`)
          .then((response) => {
            // Filter the data to include the entire month of January
            const startDate = new Date('2018-01-01 00:00:00');

    
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
    
      const labels = []; // Array to store X-axis labels (dates)
      const dailyTotalUsage = []; // Array to store the total usage for each day

      const calculateTotalPowerUsage = (entry) => {
        let sum = 0;
        for (const key in entry) {
          if (key !== 'local_15min') {
            sum += entry[key];
          }
        }
        return sum;
      };
    
      // Create a function to calculate the total usage for a day
      const calculateTotalUsageForDay = (date) => {
        return jsonData
          .filter((entry) => {
            const entryDate = new Date(entry.local_15min);
            return entryDate.toDateString() === date.toDateString();
          })
          .reduce((total, entry) => {
            return total + calculateTotalPowerUsage(entry);
          }, 0);
      };
    
      if (jsonData.length > 0) {
        const currentDate = new Date(jsonData[0].local_15min);
    
        while (currentDate <= endDate) {
          labels.push(currentDate.toLocaleDateString());
          dailyTotalUsage.push(calculateTotalUsageForDay(currentDate));
          currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
        }
      }


    const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Total Usage of all Appliances',
        data: dailyTotalUsage,
        fill: true,
        borderColor: 'green',
        backgroundColor: 'rgba(19, 146, 97, 0.2)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(19, 146, 97, 0.4)',
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
        type: 'category',
        position: 'bottom',
      },
      y: {
        title: {
          display: true,
          text: 'kW',
        },
        beginAtZero: true,
      },
    },
  };


    return (
        <div>
            <h2>Total House Usage One Month</h2>

            <Line data={chartData} options={chartOptions}/>
        </div>
    );
}

export default OneMonth;
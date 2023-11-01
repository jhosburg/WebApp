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
    
      const labels = [];
      const dailyTotalUsage = [];

      // Calculate the total kWh consumed for each day
      const calculateTotalUsageForDay = (date) => {
          return jsonData
              .filter((entry) => {
                  const entryDate = new Date(entry.local_15min);
                  return entryDate.toDateString() === date.toDateString();
              })
              .reduce((total, entry) => {
                  return total + (entry.grid * 0.25); // Convert grid (kW) to kWh for each 15-minute interval
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

      const totalKWhConsumed = dailyTotalUsage.reduce((acc, value) => acc + value, 0);



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
          text: 'kWh',
        },
        beginAtZero: true,
      },
    },
  };


    return (
        <div>
            <h2>Total House Usage One Month</h2>
            <h3>Total Usage: {totalKWhConsumed} kWh</h3>
            <Line data={chartData} options={chartOptions}/>
        </div>
    );
}

export default OneMonth;
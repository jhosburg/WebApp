import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart }            from 'react-chartjs-2'

function OneMonth({selectedFileName}) {
    const [jsonData, setJsonData] = useState([]);
    const [dateColumn, setDateColumn] = useState(null); // Initialize dateColumn state
    const [endDate, setEndDate] = useState(null); // Manage end date with useState
    const [fetchingData, setFetchingData] = useState(false);

    
    const fetchData = () => {
      if (selectedFileName) {
        setFetchingData(true);
        const filename = selectedFileName;
        axios
          .get(`http://127.0.0.1:8000/sdei/grabJson/${filename}`)
          .then((response) => {
            const data = response.data;
    
            if (data.length === 0) {
              console.error('No data found.');
              return;
            }

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
    
            // Find the minimum and maximum timestamps in the dataset
            const timestamps = data.map((entry) => new Date(entry[dateColumn]).getTime());
            const startDate = new Date(Math.min(...timestamps));

              // Set the end date to the last day of the month of the minimum start date
            const endOfMonth = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
            setEndDate(endOfMonth);

    
            // Filter the data to include the entire time range
            const filteredData = data;
    
            setJsonData(filteredData);
            setFetchingData(false);
          })
          .catch((error) => {
            console.error('Error grabbing JSON Data:', error);
            setFetchingData(false);
          });
      }
    };

    useEffect(() => {
      if (selectedFileName) {
        fetchData(); // Fetch data when selectedFileName changes
      }
    }, [selectedFileName, dateColumn]);


    
      const labels = [];
      const dailyTotalUsage = [];

      // Calculate the total kWh consumed for each day
      const calculateTotalUsageForDay = (date) => {
          return jsonData
              .filter((entry) => {
                  const entryDate = new Date(entry[dateColumn]);
                  return entryDate.toDateString() === date.toDateString();
              })
              .reduce((total, entry) => {
                if ('grid' in entry) {
                  return total + (entry.grid * 0.25); // Convert grid (kW) to kWh for each 15-minute interval
                }
                else { //if there is no grid column, compute usage by adding all columns besides time column
                  let totalNoGrid = 0;

                  for (const key in entry) {
                    if (key !== dateColumn && key !== 'grid' && key !== 'solar') {
                      const value = entry[key];
                      if (!isNaN(value)) {
                        totalNoGrid += value;
                  }
                }
              }
              return total + (totalNoGrid * 0.25); //multiply by 0.25 assuming 15 min increments for kWh
            }
              }, 0);
      };


    
      if (jsonData.length > 0) {
        const currentDate = new Date(jsonData[0][dateColumn]);
    
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
        label: 'Total Usage of Home',
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
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart }            from 'react-chartjs-2'

function CostOneMonth({selectedFileName}) {
    const [jsonData, setJsonData] = useState([]);
    const [dateColumn, setDateColumn] = useState(null); // Initialize dateColumn state
    const [endDate, setEndDate] = useState(null); // Manage end date with useState
    const [fetchingData, setFetchingData] = useState(false);

    

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
    
            // Find the minimum and maximum timestamps in the dataset
            const timestamps = data.map((entry) => new Date(entry[dateColumn]).getTime());
            const startDate = new Date(Math.min(...timestamps));
            
            // Set the end date to the last day of the month of the minimum start date
            const endOfMonth = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
            setEndDate(endOfMonth);
    
            const filteredData = data;


            setJsonData(filteredData);

            setFetchingData(false);
          

        } catch (error) {
          console.error('Error grabbing JSON Data:', error);
          setFetchingData(false);

        }
      };
    
      useEffect(() => {
        const fetchDataWrapper = async () => {
          if (selectedFileName) {
            await fetchData();
            console.log('Data fetched. jsonData:', jsonData, 'dateColumn:', dateColumn);
          }
        };
    
        fetchDataWrapper();
      }, [selectedFileName, dateColumn]);

      


    const labels = [];
    const dailyTotalBefore = [];
    const dailyTotalAfter = [];

    const calculateTotalBeforeForDay = (date) => {
        return jsonData
            .filter((entry) => {
                const entryDate = new Date(entry[dateColumn]);
                return entryDate.toDateString() === date.toDateString();
            })
            .reduce((total, entry) => {
              if ('cost_before' in entry) {
                return total + entry.cost_before; // Convert grid (kW) to kWh for each 15-minute interval
              }
              else if ('grid' in entry) { //if there is no grid column, compute usage by adding all columns besides time column
                return total + ((entry.grid * 0.25) * 0.43); //0.43 = average kwh price
              }
              else {
                let totalNoGrid = 0;

                for (const key in entry) {
                    if (key !== dateColumn && key !== 'grid' && key !== 'solar') {
                        const value = entry[key];
                        if (!isNaN(value)) {
                            totalNoGrid += value;
                        }
                    }
                }
                return total + ((totalNoGrid*0.25)*0.43);  //0.43 = average kwh price
            }
        }, 0);
    };

    const calculateTotalAfterForDay = (date) => {
        return jsonData
            .filter((entry) => {
                const entryDate = new Date(entry[dateColumn]);
                return entryDate.toDateString() === date.toDateString();
            })
            .reduce((total, entry) => {
              if ('cost_after' in entry) {
                return total + entry.cost_after; // Convert grid (kW) to kWh for each 15-minute interval
              }
              else { //if there is no grid column, compute usage by adding all columns besides time column
                return null;
              }
            }, 0);
    };





      if (jsonData.length > 0) {

        
        const currentDate = new Date(jsonData[0][dateColumn]);
    
        while (currentDate <= endDate) {
          labels.push(currentDate.toLocaleDateString());
          dailyTotalBefore.push(calculateTotalBeforeForDay(currentDate));
          dailyTotalAfter.push(calculateTotalAfterForDay(currentDate));
          currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
        }
      }

      const totalCostBefore = dailyTotalBefore.reduce((acc, value) => acc + value, 0);
      const totalCostAfter = dailyTotalAfter.reduce((acc, value) => acc + value, 0);


      const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Cost Before',
                data: dailyTotalBefore,
                fill: true,
                borderColor: 'grey',
                backgroundColor: 'rgba(255, 128, 0, 0.2)', // Set the background color for bars
                borderWidth: 1, // Set the border width for bars
                hoverBackgroundColor: 'rgba(255, 128, 0, 0.4)', // Set the background color when hovering
                type: 'bar',

            },
            {
                label: 'Cost After',
                data: dailyTotalAfter,
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

    


    return (
        <div>

            <h2>Total Cost One Month</h2>
            <h3>Total Cost Before : ${totalCostBefore.toFixed(2)}</h3>
            <h3>Total Cost After : ${totalCostAfter.toFixed(2)}</h3>
            <Line data={chartData} options={chartOptions}/>
        </div>
    );
}




export default CostOneMonth;
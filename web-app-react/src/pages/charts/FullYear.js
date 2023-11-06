import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart }            from 'react-chartjs-2'

function OneYear({selectedFileName}) {
    const [jsonData, setJsonData] = useState([]);
    const [dateColumn, setDateColumn] = useState(null); // Initialize dateColumn state
    const [endDate, setEndDate] = useState(null); // Manage end date with useState
    const [startDate, setStartDate] = useState(null); // Manage start date with useState
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

                    const timestamps = response.data.map((entry) => new Date(entry[dateColumn]).getTime());
                    const minTimestamp = Math.min(...timestamps);
                    setStartDate(new Date(minTimestamp));

                    // Calculate the end date as exactly one year from the start date
                    const oneYearLater = new Date(minTimestamp);
                    oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);
                    setEndDate(oneYearLater);

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
    const monthlyTotalKWh = [];

    // Calculate the total kWh consumed for each month
    const calculateTotalKWhForMonth = (monthData) => {
        return monthData.reduce((total, entry) => {
            return total + (entry.grid * 0.25); // Convert grid (kW) to kWh for each 15-minute interval
        }, 0);
    };

    if (jsonData.length > 0) {
        let currentMonth = -1;
        let currentYear = -1;
        let currentMonthData = [];

        jsonData.forEach((entry) => {
            const entryDate = new Date(entry[dateColumn]);
            const entryMonth = entryDate.getMonth();
            const entryYear = entryDate.getFullYear();

            if (currentMonth === -1 && currentYear === -1) {
                currentMonth = entryMonth;
                currentYear = entryYear;
            }

            if (currentMonth === entryMonth && currentYear === entryYear) {
                currentMonthData.push(entry);
            } else {
                labels.push(`${currentMonth + 1}/${currentYear}`);
                monthlyTotalKWh.push(calculateTotalKWhForMonth(currentMonthData));
                currentMonth = entryMonth;
                currentYear = entryYear;
                currentMonthData = [entry];
            }
        });

        labels.push(`${currentMonth + 1}/${currentYear}`);
        monthlyTotalKWh.push(calculateTotalKWhForMonth(currentMonthData));
    }

    const totalKWhConsumed = monthlyTotalKWh.reduce((acc, value) => acc + value, 0);

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Total Usage of Home',
                data: monthlyTotalKWh,
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
                    text: 'kWh',
                },
                beginAtZero: true, // Customize Y-axis as needed
            },
        },
    };

    return (
        <div>
            <h2>Total House Usage One Year</h2>
            <h3>Total Usage: {totalKWhConsumed} kWh</h3>
            <Line data={chartData} options={chartOptions}/>
        </div>
    );
}

export default OneYear;
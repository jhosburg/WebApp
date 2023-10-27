import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart }            from 'react-chartjs-2'

function OneYear() {
    const [jsonData, setJsonData] = useState([]);
    
    useEffect(() => {
        const filename = 'full_year.json';
        axios.get(`http://127.0.0.1:8000/sdei/grabJson/${filename}`)
            .then((response) => {  
                setJsonData(response.data);
            })
            .catch((error) => {
                console.error('Error grabbing JSON Data:', error);
            });
    }, []);

    const labels = Object.keys(jsonData);
    const data = labels.map((month) => jsonData[month].TotalUsage);
    const Cost = (Object.values(jsonData).reduce((total, month) => total + month.TotalUsage, 0) * 0.19).toFixed(2);

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Total Usage of all Appliances',
                data: data,
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
            <h3>Expected Cost: ${Cost}</h3>
            <Line data={chartData} options={chartOptions}/>
        </div>
    );
}

export default OneYear;
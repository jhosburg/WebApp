import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart }            from 'react-chartjs-2'

function HomeChart() {
    const [jsonData, setJsonData] = useState([]);
    
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/sdei/grabJson/')
            .then((response) => {  
                setJsonData(response.data);
            })
            .catch((error) => {
                console.error('Error grabbing JSON Data:', error);
            });
    }, []);

    const labels = jsonData?.map((item) => item.local_15min);
    const data = jsonData?.map((item) => item.Row_Sums);

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Total Usage of all Appliances',
                data: data,
                fill: false,
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
            <Bar data={chartData} options={chartOptions}/>
        </div>
    );
}

export default HomeChart;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

function HomeChart({ selectedFileName }) {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Total Usage of Home without Battery',
        data: [],
        fill: true,
        borderColor: 'green',
        backgroundColor: 'rgba(46, 204, 113, 0.2)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(46, 204, 113, 0.4)',
        type: 'line',
      },
      // Add other datasets with default values here
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/sdei/grabJson/${selectedFileName}/24h`);
        const { hourlyData, jsonData, totalUsageSum, is15MinuteIncrement } = response.data;

        const hourlyLabels = Object.keys(hourlyData);
        const hourlyTotalUsage = hourlyLabels.map((hour) => hourlyData[hour]?.totalUsage);
        const hourlyBatData = hourlyLabels.map((hour) => hourlyData[hour]?.BatUsage);
        const hourlyCharge = hourlyLabels.map((hour) => hourlyData[hour]?.Charge);
        const hourlyDisCharge = hourlyLabels.map((hour) => hourlyData[hour]?.DisCharge);

        const newChartData = {
          labels: hourlyLabels,
          datasets: [
            {
              label: 'Total Usage of Home without Battery',
              data: hourlyTotalUsage,
              fill: true,
              borderColor: 'green',
              backgroundColor: 'rgba(46, 204, 113, 0.2)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(46, 204, 113, 0.4)',
              type: 'line',
            },
            {
              label: 'With Battery',
              data: hourlyBatData,
              fill: true,
              borderColor: 'grey',
              backgroundColor: 'rgba(127, 140, 141, 0.2)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(127, 140, 141, 0.4)',
              type: 'line',
            },
            {
              label: 'Battery Charge',
              data: hourlyCharge,
              fill: true,
              borderColor: 'grey',
              backgroundColor: 'rgba(243, 156, 18, 0.2)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(243, 156, 18, 0.4)',
              type: 'bar',
            },
            {
              label: 'Battery DisCharge',
              data: hourlyDisCharge,
              fill: true,
              borderColor: 'grey',
              backgroundColor: 'rgba(52, 152, 219, 0.2)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(52, 152, 219, 0.4)',
              type: 'bar',
            },
          ],
        };

        setChartData(newChartData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (selectedFileName) {
      fetchData();
    }
  }, [selectedFileName]);

  return (
    <div>
      <h2>Total House Usage 24 Hours</h2>
      <>
        <h3>Total Usage: {chartData.datasets[0].data.reduce((acc, value) => acc + value, 0).toFixed(2)} kWh</h3>
        <Line data={chartData} options={chartOptions} />
      </>
    </div>
  );
}

const chartOptions = {
  scales: {
    x: {
      title: {
        display: true,
        text: 'Date/Time',
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

export default HomeChart;

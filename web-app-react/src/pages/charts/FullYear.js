import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

function OneYear({ selectedFileName }) {
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
  const [totalKWhConsumed, setTotalKWhConsumed] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/sdei/grabJson/${selectedFileName}/1y`);        const { hourlyData, totalUsageSum } = response.data;

        const hourlyLabels = Object.keys(hourlyData);
        const hourlyTotalUsage = hourlyLabels.map((hour) => hourlyData[hour]?.totalUsage);
        const hourlyBatData = hourlyLabels.map((hour) => hourlyData[hour]?.BatUsage);

        const newChartData = {
          labels: hourlyLabels,
          datasets: [
            {
              label: 'Total Usage of Home',
              data: hourlyTotalUsage,
              fill: true,
              borderColor: 'green',
              backgroundColor: 'rgba(19, 146, 97, 0.2)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(19, 146, 97, 0.4)',
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
          ],
        };

        setChartData(newChartData);
        setTotalKWhConsumed(totalUsageSum);

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
      <h2>Total House Usage One Year</h2>
      {chartData && (
        <>
          <h3>Total Usage: {totalKWhConsumed !== null ? totalKWhConsumed.toFixed(2) : 0} kWh</h3>
          <Line data={chartData} options={chartOptions} />
        </>
      )}
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

export default OneYear;

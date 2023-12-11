import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line, Bar } from 'react-chartjs-2';

function ApplianceChart({ selectedFileName, applianceName }) {
  const [jsonData, setJsonData] = useState([]);
  const [dateColumn, setDateColumn] = useState(null);
  const [fetchingData, setFetchingData] = useState(null);
  const [hourlyData, setHourlyData] = useState([]);
  const [is15MinuteIncrement, setIs15MinuteIncrement] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {

    setFetchingData(true);
    const filename = selectedFileName;

    try {
      const response = await axios.get(`http://127.0.0.1:8000/sdei/selectionchart/${filename}`);
      const data = response.data;

      let newDateColumn = null;

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

      const startDate = new Date(data[0][newDateColumn]);
      const endDate = new Date(startDate);
      endDate.setHours(endDate.getHours() + 24);

      const filteredData = data.filter((entry) => {
        const entryDate = new Date(entry[newDateColumn]);
        return (
          entryDate >= startDate &&
          entryDate <= endDate &&
          typeof entry[applianceName] !== 'undefined'
        );
      });

      const newHourlyData = {};
      filteredData.forEach((entry) => {
        const entryDate = new Date(entry[newDateColumn]);
        const hourKey = `${entryDate.getHours()}:00`;

        if (!newHourlyData[hourKey]) {
          newHourlyData[hourKey] = {
            totalUsage: 0,
            BatUsage: 0,
            Charge: 0,
            DisCharge: 0,
            count: 0,
          };
        }

        newHourlyData[hourKey].totalUsage += calculateTotalUsage(entry);
        newHourlyData[hourKey].BatUsage += entry.net * 0.25;
        newHourlyData[hourKey].Charge += entry.charge * 0.25;
        newHourlyData[hourKey].DisCharge += entry.discharge * 0.25;
        newHourlyData[hourKey].count++;
      });

      const timeIncrement =
        new Date(filteredData[1][newDateColumn]) - new Date(filteredData[0][newDateColumn]);
      setIs15MinuteIncrement(timeIncrement === 900000); // 900000ms = 15 mins

      setHourlyData(newHourlyData);
      setJsonData(data);
      setFetchingData(false);
      setIsLoading(false);
    } catch (error) {
      console.error('Error grabbing JSON Data:', error);
      setFetchingData(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchDataWrapper = async () => {
      if (selectedFileName && applianceName) {
        await fetchData();
      }
    };

    fetchDataWrapper();
  }, [selectedFileName, applianceName, dateColumn, is15MinuteIncrement]);

  console.log('Data in State:', jsonData);
  console.log('Data in State:', hourlyData);
  console.log('Selected FileName:', selectedFileName);
  console.log('Selected Appliance Name:', applianceName);

  function calculateTotalUsage(entry) {
    if (applianceName in entry && !isNaN(entry[applianceName])) {
      const value = entry[applianceName];
      
      if (is15MinuteIncrement) {
        return value * 0.25;
      }
  
      return value;
    } else {
      console.error(`No data found for ${applianceName} in entry:`, entry);
      return 0;
    }
  }
  

  const hourlyLabels = Object.keys(hourlyData);
  const hourlyTotalUsage = hourlyLabels.map((hour) => hourlyData[hour]?.totalUsage);
  const hourlyBatData = hourlyLabels.map((hour) => hourlyData[hour]?.BatUsage);
  const hourlyCharge = hourlyLabels.map((hour) => hourlyData[hour]?.Charge);
  const hourlyDisCharge = hourlyLabels.map((hour) => hourlyData[hour]?.DisCharge);
  const totalUsageSum = hourlyTotalUsage.reduce((acc, value) => acc + value, 0);

  const chartData = {
    labels: hourlyLabels,
    datasets: [
      {
        label: 'Total Usage of Appliance',
        data: hourlyTotalUsage,
        fill: true,
        borderColor: 'green',
        backgroundColor: 'rgba(46, 204, 113, 0.2)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(46, 204, 113, 0.4)',
        type: 'line',
      },
    ],
  };

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

  return (
    <div>
      <h2>Total {applianceName} Usage 24 Hours</h2>
      <h3>Total Usage : {totalUsageSum.toFixed(2)} kWh</h3>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
}

export default ApplianceChart;

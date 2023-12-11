import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

function CostOneMonth({ selectedFileName }) {
  const [jsonData, setJsonData] = useState([]);
  const [dailyCostData, setDailyCostData] = useState({});
  const [monthlyCostData, setMonthlyCostData] = useState({});
  const [totalCostBeforeSumMonth, setTotalCostBeforeSumMonth] = useState(0);
  const [totalCostBeforeSumYear, setTotalCostBeforeSumYear] = useState(0);
  const [isFetchingData, setIsFetchingData] = useState(false);

  const fetchData = async () => {
    setIsFetchingData(true);

    try {
      const response = await axios.get(`http://127.0.0.1:8000/sdei/grab_cost_data/${selectedFileName}/1m`);
      const data = response.data;

      setJsonData(data.jsonData);
      setDailyCostData(data.dailyCostData);
      setMonthlyCostData(data.monthlyCostData);
      setTotalCostBeforeSumMonth(data.totalCostBeforeSumMonth);
      setTotalCostBeforeSumYear(data.totalCostBeforeSumYear);

      setIsFetchingData(false);
    } catch (error) {
      console.error('Error grabbing cost data:', error);
      setIsFetchingData(false);
    }
  };

  useEffect(() => {
    const fetchDataWrapper = async () => {
      if (selectedFileName) {
        await fetchData();
      }
    };

    fetchDataWrapper();
  }, [selectedFileName]);

  const labels = Object.keys(dailyCostData);
  const dailyTotalBefore = Object.values(dailyCostData).map((dayData) => dayData.totalCostBefore);
  const dailyTotalAfter = Object.values(dailyCostData).map((dayData) => dayData.totalCostAfter);
  const totalCostOneMonth = Object.values(monthlyCostData).map((monthData) => monthData.totalCostBefore);
  const totalCostOneMonthAfter = Object.values(monthlyCostData).map((monthData) => monthData.totalCostAfter);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Daily Cost Before',
        data: dailyTotalBefore,
        fill: true,
        borderColor: 'grey',
        backgroundColor: 'rgba(255, 99, 71, 0.2)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255, 99, 71, 0.4)',
        type: 'bar',
      },
      {
        label: 'Daily Cost After',
        data: dailyTotalAfter,
        fill: false,
        borderColor: 'green',
        backgroundColor: 'rgba(46, 204, 113, 0.2)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(46, 204, 113, 0.4)',
        type: 'bar',
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
          text: 'Cost USD',
        },
        beginAtZero: true,
      },
    },
  };

  const totalCostOneMonthRounded = totalCostOneMonth.map(value => value.toFixed(2));
  const totalCostOneMonthAfterRounded = totalCostOneMonthAfter.map(value => value.toFixed(2));
  const totalSavings = totalCostOneMonth.map((value, index) => {
    const savings = value - totalCostOneMonthAfter[index];
    return totalCostOneMonthAfter[index] === 0 ? 0 : savings.toFixed(2);
  });


  return (
    <div>
      <h2>Total Cost One Month</h2>
      <div>
        
        {totalCostOneMonthAfterRounded.every(value => value === '0.00') ? (
          <>
            <h3>Total Cost: <span style={{ color: 'orange' }}>${totalCostOneMonthRounded.join(', ')}</span></h3>
            <h3>House is not optimized</h3>
          </>
        ) : (
          <>
            <h3>Total Cost Before: <span style={{ color: 'red' }}>${totalCostOneMonthRounded.join(', ')}</span></h3>
            <h3>Total Cost After: <span style={{ color: 'orange' }}>${totalCostOneMonthAfterRounded.join(', ')}</span></h3>
            <h3>Total Savings: <span style={{ color: 'green' }}>${totalSavings.join(', ')}</span></h3>
          </>
        )}
      </div>
      <Line data={chartData} options={chartOptions} />
    </div>
  );

}

export default CostOneMonth;

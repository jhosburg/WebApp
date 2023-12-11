import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

function CostOneYear({ selectedFileName }) {
  const [jsonData, setJsonData] = useState([]);
  const [dailyCostData, setDailyCostData] = useState({});
  const [monthlyCostData, setMonthlyCostData] = useState({});
  const [totalCostBeforeSumMonth, setTotalCostBeforeSumMonth] = useState(0);
  const [totalCostBeforeSumYear, setTotalCostBeforeSumYear] = useState(0);
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [totalCostAfterSumYear, setTotalCostAfterSumYear] = useState(0);
  const [totalSavingsYear, setTotalSavingsYear] = useState(0); // New state

  const fetchData = async () => {
    setIsFetchingData(true);

    try {
      const response = await axios.get(`http://127.0.0.1:8000/sdei/grab_cost_data/${selectedFileName}/1y`);
      const data = response.data;

      setJsonData(data.jsonData);
      setDailyCostData(data.dailyCostData);
      setMonthlyCostData(data.monthlyCostData);
      setTotalCostBeforeSumMonth(data.totalCostBeforeSumMonth);
      setTotalCostBeforeSumYear(data.totalCostBeforeSumYear);
      setTotalCostAfterSumYear(data.totalCostAfterSumYear);

      const totalSavingsYear = data.totalCostAfterSumYear !== 0
      ? (data.totalCostBeforeSumYear - data.totalCostAfterSumYear).toFixed(2)
      : 0;
      setTotalSavingsYear(totalSavingsYear); // Update state with calculated savings


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

  const labels = Object.keys(monthlyCostData);
  const monthlyTotalBefore = Object.values(monthlyCostData).map((monthlyData) => monthlyData.totalCostBefore);
  const monthlyTotalAfter = Object.values(monthlyCostData).map((monthlyData) => monthlyData.totalCostAfter);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Monthly Cost Before',
        data: monthlyTotalBefore,
        fill: true,
        borderColor: 'grey',
        backgroundColor: 'rgba(255, 99, 71, 0.2)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255, 99, 71, 0.4)',
        type: 'bar',
      },
      {
        label: 'Monthly Cost After',
        data: monthlyTotalAfter,
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
          text: 'Month',
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

  

  return (
    <div>
      <h2>Total Cost One Year</h2>
      <div>
        
        {totalCostAfterSumYear === 0 ? (
          <>
            <h3>Total Cost: <span style={{ color: 'orange' }}>${totalCostBeforeSumYear.toFixed(2)}</span></h3>
            <h3>House is not optimized</h3>
          </>
        ) : (
          <>
            <h3>Total Cost Before: <span style={{ color: 'red' }}>${totalCostBeforeSumYear.toFixed(2)}</span></h3>
            <h3>Total Cost After: <span style={{ color: 'orange' }}>${totalCostAfterSumYear.toFixed(2)}</span></h3>
            <h3>Total Savings: <span style={{ color: 'green' }}>${totalSavingsYear}</span></h3>
          </>
        )}
      </div>
      <Line data={chartData} options={chartOptions} />
    </div>
  );


}

export default CostOneYear;

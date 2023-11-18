import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

function CostOneYear({ selectedFileName }) {
    const [jsonData, setJsonData] = useState([]);
    const [dateColumn, setDateColumn] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [fetchingData, setFetchingData] = useState(false);

    const fetchData = async () => {
        setFetchingData(true);
        const filename = selectedFileName;

        try {
            const response = await axios.get(`http://127.0.0.1:8000/sdei/grabJson/${filename}`);
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

            const timestamps = response.data.map((entry) => new Date(entry[dateColumn]).getTime());
            const minTimestamp = Math.min(...timestamps);
            setStartDate(new Date(minTimestamp));

            const oneYearLater = new Date(minTimestamp);
            oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);
            setEndDate(oneYearLater);

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
            }
        };

        fetchDataWrapper();
    }, [selectedFileName, dateColumn]);

    const labels = [];
    const monthlyTotalCostBefore = [];
    const monthlyTotalCostAfter = [];

    const calculateTotalCostBeforeForMonth = (monthData) => {
        return monthData.reduce((total, entry) => {
            if ('cost_before' in entry) {
                return total + entry.cost_before;
            } else {
                return null;
            }
        }, 0);
    };

    const calculateTotalCostAfterForMonth = (monthData) => {
        return monthData.reduce((total, entry) => {
            if ('cost_after' in entry) {
                return total + entry.cost_after;
            } else {
                return null;
            }
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
                monthlyTotalCostBefore.push(calculateTotalCostBeforeForMonth(currentMonthData));
                monthlyTotalCostAfter.push(calculateTotalCostAfterForMonth(currentMonthData));
                currentMonth = entryMonth;
                currentYear = entryYear;
                currentMonthData = [entry];
            }
        });

        labels.push(`${currentMonth + 1}/${currentYear}`);
        monthlyTotalCostBefore.push(calculateTotalCostBeforeForMonth(currentMonthData));
        monthlyTotalCostAfter.push(calculateTotalCostAfterForMonth(currentMonthData));
    }

    const totalCostBefore = monthlyTotalCostBefore.reduce((acc, value) => acc + value, 0);
    const totalCostAfter = monthlyTotalCostAfter.reduce((acc, value) => acc + value, 0);

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Total Cost Before',
                data: monthlyTotalCostBefore,
                fill: true,
                borderColor: 'grey',
                backgroundColor: 'rgba(255, 128, 0, 0.2)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255, 128, 0, 0.4)',
                type: 'bar',
            },
            {
                label: 'Total Cost After',
                data: monthlyTotalCostAfter,
                fill: true,
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
                    text: 'Cost',
                },
                beginAtZero: true,
            },
        },
    };

    return (
        <div>
            <h2>Total Cost One Year</h2>
            <h3>Total Cost Before: ${totalCostBefore.toFixed(2)}</h3>
            <h3>Total Cost After: ${totalCostAfter.toFixed(2)}</h3>
            <Line data={chartData} options={chartOptions} />
        </div>
    );
}

export default CostOneYear;

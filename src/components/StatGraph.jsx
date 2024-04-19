import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Line } from 'react-chartjs-2'

const StatGraph = () => {

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend 
    )

    const options = {
        responsive: true,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        stacked: false,
        animate: true,
        plugins: {
          title: {
            display: true,
            text: 'All Metrics from Jan',
            font:{
                size: '20px',
                weight: 'normal'
            }
          },
        },
        scales: {
          y: {
            type: 'linear',
            display: true,
            position: 'left',
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            grid: {
              drawOnChartArea: false,
            },
          },
          y2: {
            type: 'linear',
            display: false,
            position: 'right',
            grid: {
              drawOnChartArea: false,
            },
          },
          y3: {
            type: 'linear',
            display: false,
            position: 'right',
            grid: {
              drawOnChartArea: false,
            },
          },
          y4: {
            type: 'linear',
            display: false,
            position: 'right',
            grid: {
              drawOnChartArea: false,
            },
          },
          y5: {
            type: 'linear',
            display: false,
            position: 'right',
            grid: {
              drawOnChartArea: false,
            },
          },
        },
      };

      const labels = ['January', 'February', 'March', 'April'];

    const data = {
        labels,
        datasets: [
          {
            label: 'Views',
            data: [0,210, 390, 910],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            yAxisID: 'y',
          },
          {
            label: 'Likes',
            data: [10, 270, 470, 930],
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
            yAxisID: 'y1',
          },
          {
            label: 'Subs',
            data: [50, 210, 470, 890],
            borderColor: 'rgb(200, 117, 135)',
            backgroundColor: 'rgba(207, 145, 158, 0.5)',
            yAxisID: 'y2',
          },
          {
            label: 'Uploads',
            data: [3, 20, 45, 100],
            borderColor: 'rgb(98, 149, 182)',
            backgroundColor: 'rgba(35, 54, 66, 0.5)',
            yAxisID: 'y3',
          },
          {
            label: 'Downloads',
            data: [10, 20, 450, 1000],
            borderColor: 'rgb(237, 70, 106)',
            backgroundColor: 'rgba(79, 58, 62, 0.5)',
            yAxisID: 'y4',
          },
          {
            label: 'Shares',
            data: [100, 220, 400, 950],
            borderColor: 'rgb(2, 23, 37)',
            backgroundColor: 'rgba(4, 31, 49, 0.5)',
            yAxisID: 'y5',
          },
        ],
      };


  return (
    <Line options={options} data={data}> 
    </Line>
  )
}

export default StatGraph
import React from "react";
import useFetch from "./useFetch"; 
import { Bar } from 'react-chartjs-2';

function HotelChart() {
  const { data: chartData, loading } = useFetch('/admin/chart'); 

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: '호텔 월 매출',
      },
    },
    scales: {
      x: {
        type: 'category',
        title: {
          display: true,
          text: '호텔',
        },
      },
      y: {
        type: 'linear',
        title: {
          display: true,
          text: '매출액',
        },
      },
    },
  };

  return (
    <div>
      <div className="graph-container">
        {loading && <p>Loading...</p>}
        {chartData && (
          <Bar 
            data={{
              labels: chartData.map(hotel => hotel.ho_name),
              datasets: [
                {
                  label: '매출',
                  data: chartData.map(hotel => hotel.sum),
                  backgroundColor: '#4e817269', 
                },
              ],
            }} 
            options={options} 
          />
        )}
      </div>
    </div>
  );
}

export default HotelChart;
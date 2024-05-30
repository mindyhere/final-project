import React, { useState, useEffect } from "react";
import { Bar } from 'react-chartjs-2';

function HotelChart() {
  // const { data: chartData, loading } = useFetch('http://localhost/admin/chart'); 
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost/admin/chart')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data)
        setData(data);
        setLoading(false);
      });
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        fontColor:"black",
      },
      title: {
        display: true,

      },
    },
    ChartDataLabels: {
      display: true,
    },
    
    scales: {
      x: {
        type: 'category',
        title: {
          display: true,
          text: '호텔',
          color: "black",
        },
      },
      y: {
        axis: "y",
        title: {
          display: true,
          text: '매출액 (단위: 백만 원)',
          color: "black",
        },
      },
    },
  };

  return (
    <div>
      <div className="graph-container">
        {loading && <p>Loading...</p>}
          <Bar 
            data={{
              labels: data.labelList,
              datasets: [
                {
                  label: '이번달 매출',
                  data: data.sumList,
                  backgroundColor: '#4e817269', 
                  color: "black",
                  
                },
              ],
            }} 
            options={options} 
          />
      </div>
    </div>
  );
}

export default HotelChart;
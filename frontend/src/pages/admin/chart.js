import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import ChartJS from "chart.js/auto";

ChartJS.register(ChartDataLabels);

export const options = {
  responsive: false,
  maxBarThickness: 30,
  grouped: true,
  interaction: {
    mode: "index",
  },
  plugins: {
    legend: {
      labels: { padding: 20 },
    },
    title: {
      display: true,
      text: "2024년 호텔 매출 그래프",
      color: "black",
      font: {
        size: "18",
      },
    },
    datalabels: {
      color: "black",
      font: {
        weight: "bold",
      },
      anchor: "end",
      formatter: function (value) {
        if (value === 0) return null;
      },
    },
    tooltip: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      padding: 10,
      bodySpacing: 10,
    },
  },
  scales: {
    x: {
      type: "category",
      title: {
        display: true,
        text: "호텔",
      },
    },
    y: {
      axis: "y",
      title: {
        display: true,
        align: "end",
        color: "black",
        text: "매출액",
      },
    },
  },
};

function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setData(data.chart); // "chart" 키에 해당하는 값을 가져옴
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [url]);

  return [data, loading];
}

function HotelChart() {
  const today = new Date();
  const strToday = today.getFullYear() + "-" + (today.getMonth() + 1);
  const url = `/admin/chart?strToday=${strToday}`;
  const [chartData, loading] = useFetch(url);

  if (loading) {
    return <div className="text-center">로딩 중...</div>;
  } else {
    const monthlySales = {};

    chartData.forEach((hotel) => {
      const { ho_name, sum, month } = hotel;

      if (!monthlySales[month]) {
        monthlySales[month] = {};
      }
      if (!monthlySales[month][ho_name]) {
        monthlySales[month][ho_name] = 0;
      }
      monthlySales[month][ho_name] += sum;
    });

    // 막대 그래프 데이터를 생성
    const datasets = Object.keys(monthlySales).map((month) => ({
      label: `${month}월`,
      data: Object.values(monthlySales[month]),
      backgroundColor: "#4e817269",
      borderColor: "#4e817269",
      borderWidth: 1,
    }));

    // 호텔 이름은 첫 번째 월의 데이터로부터 가져옴
    const labels = Object.keys(monthlySales[1] || {});

    // 매출 순위 카드 데이터 생성
    const monthlyTotalSales = Object.keys(monthlySales).map((month) => ({
      month: `${month}월`,
      hotels: Object.entries(monthlySales[month])
        .sort((a, b) => b[1] - a[1]) // 매출액에 따라 내림차순 정렬
        .map(([ho_name, sum]) => ({ ho_name, sum })),
    }));

    return (
      <div>
        <div className="row mt-0 mb-2">
          <div className="col-9">
            <div style={{ width: 900, height: 400 }}>
              <Bar options={options} data={{ labels, datasets }} height={380} width={890} />
            </div>
          </div>
          <div className="col-3">
            <div className="card">
              <div className="card-header">
                <h5 className="card-title">매출 순위</h5>
              </div>
              <div className="card-body">
                {monthlyTotalSales.map((monthSales) => (
                  <div key={monthSales.month}>
                    <h6>{monthSales.month}</h6>
                    <ul className="list-group">
                      {monthSales.hotels.map((hotel) => (
                        <li
                          key={hotel.ho_name}
                          className="list-group-item d-flex justify-content-between align-items-center"
                        >
                          {hotel.ho_name}
                          <span className="badge bg-primary rounded-pill">
                            {hotel.sum.toLocaleString()}원
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HotelChart;




/* import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import ChartJS from "chart.js/auto";

ChartJS.register(ChartDataLabels);

export const options = {
  responsive: false,
  maxBarThickness: 30,
  grouped: true,
  interaction: {
    mode: "index",
  },
  plugins: {
    legend: {
      labels: { padding: 20 },
    },
    title: {
      display: true,
      text: "2024년 호텔 매출 그래프",
      color: "black",
      font: {
        size: "18",
      },
    },
    datalabels: {
      color: "black",
      font: {
        weight: "bold",
      },
      anchor: "end",
      formatter: function (value) {
        if (value === 0) return null;
      },
    },
    tooltip: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      padding: 10,
      bodySpacing: 10,
    },
  },
  scales: {
    x: {
      type: "category",
      title: {
        display: true,
        text: "호텔",
      },
    },
    y: {
      axis: "y",
      title: {
        display: true,
        align: "end",
        color: "black",
        text: "매출액",
      },
    },
  },
};

function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [url]);

  return [data, loading];
}

function HotelChart() {
  const [chartData, loading] = useFetch('/admin/chart');

  if (loading) {
    return <div className="text-center">로딩 중...</div>;
  } else {
    const monthlySales = {};

    chartData.forEach((hotel) => {
      const { ho_name, sum, month } = hotel;

      if (!monthlySales[month]) {
        monthlySales[month] = {};
      }
      if (!monthlySales[month][ho_name]) {
        monthlySales[month][ho_name] = 0;
      }
      monthlySales[month][ho_name] += sum;
    });

    // 막대 그래프 데이터를 생성
    const datasets = Object.keys(monthlySales).map((month) => ({
      label: `${month}월`,
      data: Object.values(monthlySales[month]),
      backgroundColor: "#4e817269",
      borderColor: "#4e817269",
      borderWidth: 1,
    }));

    // 호텔 이름은 첫 번째 월의 데이터로부터 가져옴
    const labels = Object.keys(monthlySales[1] || {});

    // 매출 순위 카드 데이터 생성
    const monthlyTotalSales = Object.keys(monthlySales).map((month) => ({
      month: `${month}월`,
      hotels: Object.entries(monthlySales[month])
        .sort((a, b) => b[1] - a[1]) // 매출액에 따라 내림차순 정렬
        .map(([ho_name, sum]) => ({ ho_name, sum })),
    }));

    return (
      <div>
        <div className="row mt-0 mb-2">
          <div className="col-9">
            <div style={{ width: 900, height: 400 }}>
              <Bar options={options} data={{ labels, datasets }} height={380} width={890} />
            </div>
          </div>
          <div className="col-3">
            <div className="card">
              <div className="card-header">
                <h5 className="card-title">매출 순위</h5>
              </div>
              <div className="card-body">
                {monthlyTotalSales.map((monthSales) => (
                  <div key={monthSales.month}>
                    <h6>{monthSales.month}</h6>
                    <ul className="list-group">
                      {monthSales.hotels.map((hotel) => (
                        <li
                          key={hotel.ho_name}
                          className="list-group-item d-flex justify-content-between align-items-center"
                        >
                          {hotel.ho_name}
                          <span className="badge bg-primary rounded-pill">
                            {hotel.sum.toLocaleString()}원
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HotelChart; */
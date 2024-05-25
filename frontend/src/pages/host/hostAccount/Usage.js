import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router";

import moment from "moment";
import Cookies from "universal-cookie";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: false, // canvas 반응형 여부
  maxBarThickness: 15, // bar :막대의 최대 굵기
  grouped: true, // x축 값이 같은 데이터, 그룹화
  interaction: {
    mode: "index", // hover(tooltip) : index를 기준으로(동일한 index에 놓인 값)
  },
  plugins: {
    legend: {
      labels: { padding: 10 },
    },
    tooltip: {
      backgroundColor: "rgba(124, 35, 35, 0.4)",
      padding: 10,
      bodySpacing: 5, // 툴팁 내부의 항목들 간 간격
      usePointStyle: true, // 툴팁 도형 스타일
    },
  },
};

function useFetch(url, e) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (e == "labels" && data != null) {
          let arr = [];
          for (let i = 0; i < data.length; i++) {
            arr.push(Object.values(data[i]).toString());
          }
          setData(arr);
        } else if (e == "sales" && data != null) {
          setData(data);
          // setData(JSON.stringify(data));
          // console.log("=> 데이터? " + JSON.stringify(data).data);
        }
        setLoading(false);
      });
  }, []);
  return [data, loading];
}

function Usage() {
  const cookies = new Cookies();
  const userInfo = cookies.get("userInfo");
  const userIdx = userInfo.h_idx;
  const navigate = useNavigate();
  const [labels, loading1] = useFetch(
    `http://localhost/api/chart/labels/${userIdx}`,
    "labels"
  );
  const [sales, loading2] = useFetch(
    `http://localhost/api/chart/sales/${userIdx}`,
    "sales"
  );

  if (loading1 || loading2) {
    return <div className="text-center">로딩 중...</div>;
  } else {
    const today = new Date();
    const lastMonth = today.getMonth();
    const thisMonth = today.getMonth() + 1;
    // const lastMonth = JSON.stringify(sales[0].data);
    // const thisMonth = JSON.stringify(sales[1].data);
    const lastSales = [0, 0.48, 0, 0, 0, 0, 0];
    const thisSales = [0, 1.68, 0, 2.16, 0, 0, 0];
    const chartData = {
      labels: labels,
      datasets: [
        {
          label: lastMonth + "월",
          data: lastSales,
          backgroundColor: "blue",
        },
        {
          label: thisMonth + "월",
          data: thisSales,
          backgroundColor: "red",
        },
      ],
    };
    return (
      <>
        <div className="row mt-0 mb-2">
          <div className="col-9">
            <div style={{ width: 900, height: 400, padding: "1%" }}>
              <Bar
                options={options}
                data={chartData}
                height={380}
                width={890}
              />
            </div>
          </div>
          <div className="col-3">요약</div>
        </div>
        <div className="card-style mb-30">테스트</div>
      </>
    );
  }
}

export default Usage;

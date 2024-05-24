import React, { useEffect, useState, useRef } from "react";
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

const data = {
  labels,
  datasets: [
    {
      label: "호텔1",
      data: [100, 200, 300, 400, 500], //y축
      backgroundColor: "rgba(255, 99, 132, 0.5)", //마우스 호버시 나타나는 분류네모 표시 bg
    },
    {
      label: "호텔2",
      data: [20, 30, 40, 50, 60], //y축
      backgroundColor: "rgba(255, 99, 132, 0.5)", //마우스 호버시 나타나는 분류네모 표시 bg
    },
    {
      label: "hotel3",
      data: [20, 30, 40, 50, 60], //y축
      backgroundColor: "rgba(255, 99, 132, 0.5)", //마우스 호버시 나타나는 분류네모 표시 bg
    },
    {
      label: "hotel3",
      data: [20, 200, 40, 500, 450], //y축
      backgroundColor: "rgba(255, 99, 132, 0.5)", //마우스 호버시 나타나는 분류네모 표시 bg
    },
  ],
};

export const options = {
  responsive: true, // canvas 반응형 여부
  maxBarThickness: 15, // bar :막대의 최대 굵기
  grouped: true, // x축 값이 같은 데이터, 그룹화
  interaction: {
    mode: "index", // hover(tooltip) : index를 기준으로(동일한 index에 놓인 값)
  },
  plugins: {
    legend: {
      // 범례 스타일링
      labels: { padding: 10 },
    },
    tooltip: {
      // 툴팁 스타일링
      backgroundColor: "rgba(124, 35, 35, 0.4)",
      padding: 10,
      bodySpacing: 5, // 툴팁 내부의 항목들 간 간격
      bodyFont: {
        font: {
          // 폰트 스타일
          family: "'Noto Sans KR', sans-serif",
        },
      },
      usePointStyle: true, // 툴팁 도형 스타일
      filter: (item) => item.parsed.y !== null, // 표시될 항목 필터링 : 값이 null인 항목은 툴팁에 나타나지 않게
      callbacks: {
        // 툴팁에 표시될 내용, 콜백 함수를 통해 수정
        title: (context) => {
          // x축 값 커스텀
          let title = "";
          // (context를 콘솔에 찍어보시면 차트에 전달되는 dataset, 값 확인 가능
          return title; // 재설정한 title 리턴
        },
        label: (context) => {
          // y축 값 커스텀
          let label = context.dataset.label + "" || "";

          // const isPrice = label === '주가';
          // const isEV = label === 'EV';

          // if (label) {
          //   label = isPrice
          //     ? ' 주가 : '
          //     : (' ' + label + ' : ');
          // }
          if (context.parsed.y !== null) {
            // y축 값이 null이 아니라면,
            // 조건에 따라 label 재할당
          } else {
            return null;
          }
          return label; // 재설정한 label도 리턴
        },
      },
    },
  },
  scales: {
    // x축, y축에 대한 설정
    x: {
      // axis 속성:x인 축의 id
      afterTickToLabelConversion: function (scaleInstance) {
        const ticks = scaleInstance.ticks;
        const newTicks = ticks.map((tick) => {
          return {
            // 원본 x축 값을 이용하여 각 x축 값을 어떻게 표시할지 설정
          };
        });
        scaleInstance.ticks = newTicks;
        // scaleInstance.ticks에 새로운 ticks를 재할당해줘야 적용됨
      },
      grid: {
        // x축을 기준으로 그려지는 선(세로선)에 대한 설정
        display: false,
        drawTicks: true, // 눈금 표시 여부
        tickLength: 4, // 눈금 길이
        color: "#E2E2E230", // 눈금 및 선의 색상
      },
      axis: "x", // 속성 : x축
      //max: Date.parse(xMax) + 1296000000, // 축의 최대값
      //min: Date.parse(xMin), // 축의 최소값
      position: "bottom", // 축 위치(상하)
      ticks: {
        minRotation: 45, // x축 값의 회전 각도
        padding: 5, // x축 값의 상하 패딩
      },
    },
    y: {
      // axis 속성:y인 축의 id
      grid: {
        // 가로선 설정
        color: "#E2E2E230",
      },
      afterDataLimits: (scale) => {
        // afterDataLimits 콜백을 사용하여 y축의 최대값 지정 가능
        scale.max = scale.max * 1.2;
      },
      axis: "y", //속성 : y축
      display: true,
      position: "left", // 축 위치(좌우)
      title: {
        display: true,
        align: "end",
        color: "#808080",
        font: {
          size: 12,
          family: "'Noto Sans KR', sans-serif",
          weight: 300,
        },
        text: "단위: 배",
      },
    },
  },
};

function SalesChart(labels, data) {
  console.log("labels? "+labels+", data?"+data)

  return <Bar options={options} data={data} height={400} />;
}
export default SalesChart;

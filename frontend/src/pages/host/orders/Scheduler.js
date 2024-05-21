import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import "../../../asset/css/reactcalendar.css";
import { CircleFill, TriangleFill } from "react-bootstrap-icons";

function Scheduler() {
  const [value, onChange] = useState(new Date());
  const [ckin, setCheckin] = useState([]);
  const [ckout, setCheckout] = useState([]);

  // const ckin = [
  //   "2024-05-01",
  //   "2024-05-02",
  //   "2024-05-08",
  //   "2024-05-15",
  //   "2024-05-24",
  //   "2024-05-28",
  //   "2024-06-01",
  //   "2024-06-02",
  //   "2024-06-18",
  //   "2024-06-15",
  //   "2024-06-24",
  //   "2024-06-30",
  // ]; // test
  // const ckout = [
  //   "2024-05-03",
  //   "2024-05-05",
  //   "2024-05-08",
  //   "2024-05-15",
  //   "2024-05-27",
  //   "2024-05-29",
  //   "2024-06-02",
  //   "2024-06-09",
  //   "2024-06-19",
  //   "2024-06-15",
  //   "2024-06-24",
  //   "2024-06-30",
  // ]; // test
  const [date, setDate] = useState(value);
  console.log("==> x? " + moment(value).format("YYYY-MM-DD"));
  return (
    <div>
      <Calendar
        formatDay={(local, date) => moment(date).format("D")} // '-일'제거
        formatYear={(local, date) => moment(date).format("YYYY")}
        formatMonthYear={(local, date) => moment(date).format("YYYY. MM")}
        calendarType="gregory" // 일요일 부터 시작
        next2Label={null} // +1년 & +10년 이동 버튼 숨기기
        prev2Label={null} // -1년 & -10년 이동 버튼 숨기기
        minDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
        maxDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
        navigationLabel={null}
        onChange={onChange}
        value={value}
        tileClassName={({ date, view }) => {
          if (ckin.find((x) => x === moment(date).format("YYYY-MM-DD")) && ckout.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
            console.log("==> x? " + value);
            return "highlight"; // 하이라이트 처리
          }
        }}
        tileContent={({ date, view }) => {
          let html = [];
          if (ckin.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
            console.log("==> x? " + value);
            html.push(<CircleFill style={{ padding: 0, width:"7px", height:"7px"}} />);
          }
          if (ckout.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
            console.log("==> x? " + value);
            html.push(<TriangleFill style={{ padding: 0, width:"7px", height:"7px", marginLeft:"4px" }} />);
          }
          return (
            <>
              <div className="col-12 px-1 m-0" style={{height:"16px"}}>{html}</div>
            </>
          );
        }}
      />
    </div>
  );
}
export default Scheduler;

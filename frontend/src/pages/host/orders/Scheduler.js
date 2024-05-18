import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import "../../../asset/css/reactcalendar.css";

function Scheduler() {
  const [value, onChange] = useState(new Date());
  const mark = ["2024-05-01", "2024-05-02", "2024-05-15", "2024-05-28"];  // test
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
        minDetail="year" // 10년단위 년도 숨기기
        onChange={onChange}
        value={value}
        tileClassName={({ date, view }) => {
          if (mark.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
            console.log("==> x? " + value);
            return "highlight"; // 하이라이트 처리
          }
        }}
      />
    </div>
  );
}
export default Scheduler;

import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment, { Moment } from "moment";
import { format, subDays } from "date-fns";
import ko from "date-fns/locale/ko";
import "../../../asset/css/reactcalendar.css";

import { Dot } from "react-bootstrap-icons";

function Scheduler() {
  const [value, onChange] = useState(new Date());
  const today = new Date();
  const [mark, setMark] = useState([
    "2024-05-01",
    "2024-05-02",
    "2024-05-15",
    "2024-05-28",
  ]);
  const [date, setDate] = useState(today);
  return (
    <div>
      <Calendar
        formatDay={(locale, date) => moment(date).format("D")} // '-일'제거
        formatYear={(locale, date) => moment(date).format("YYYY")}
        formatMonthYear={(locale, date) => moment(date).format("YYYY. MM")}
        calendarType="gregory" // 일요일 부터 시작
        //showNeighboringMonth={false} // 전달, 다음달 날짜 숨기기
        next2Label={null} // +1년 & +10년 이동 버튼 숨기기
        prev2Label={null} // -1년 & -10년 이동 버튼 숨기기
        minDetail="year" // 10년단위 년도 숨기기
        onChange={onChange}
        value={value}
        tileContent={(date, view) => {
          // 날짜 타일에 컨텐츠 추가하기(html 태그) : html 태그 변수 초기화
          let html = [];
          if (mark.find((x) => "2024-05-01")) {
            html.push(<div style={{paddingBottom:"0.3em", color:"#DBC4F0"}}>●</div>)
          }
          return <>{html}</>;
        }}
      />
    </div>
  );
}
export default Scheduler;

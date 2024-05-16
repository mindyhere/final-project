import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format, subDays } from "date-fns";
import ko from "date-fns/locale/ko";
import "../../../asset/css/reactcalendar.css";

function Scheduler() {
  const [value, onChange] = useState(new Date());
  return (
    <div>
      <Calendar onChange={onChange} value={value} />
    </div>
  );
}
export default Scheduler;

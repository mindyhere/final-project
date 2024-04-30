import React, { useState } from "react";
import { DateRangePicker } from "react-date-range";
import { format, addDays } from "date-fns";
import "../asset/css/datepicker.css"
import ko from "date-fns/locale/ko";


const DateRangeSelector = ({ ranges, onChange, onSubmit, ...rest }) => {
     const [selectedDateRange, setSelectedDateRange] = useState({
          startDate: new Date(),
          //endDate: new Date(),
          endDate: addDays(new Date(), 1),
          key: "selection"
     });
     const [show, setShow] = useState(false);

     function formatDateDisplay(date, defaultText) {
          if (!date) return defaultText;
          return format(date, "yyyy/MM/dd");
     }

     const handleSelect = ranges => {
          setSelectedDateRange(ranges.selection);
     };

     const onClickClear = () => {
          setSelectedDateRange({
               startDate: new Date(),
               endDate: new Date(),
               key: "selection"
          });
          setShow(false);
     };

     return (
          <React.Fragment>
               <div className="dateRangePicker">
                <div>
                    <DateRangePicker
                        locale={ko}                        
                        onChange={handleSelect}
                        showSelectionPreview={true}
                        moveRangeOnFirstSelection={false}
                        months={2}
                        ranges={[selectedDateRange]}
                        //excludeDateIntervals={bookedData} 이미 예약된 날짜 선택하지 못하도록 설정
                        direction="horizontal"
                    />
                    </div>
                    <div className="text-left position-relative rdr-buttons-position mt-2 mr-3">
                         <button
                              className="btn btn-danger"
                              onClick={onClickClear}
                         >날짜 지우기</button>
                         &nbsp;
                         <button
                              className="btn btn-primary"
                              onClick={() => setShow(true)}
                         >닫기</button>
                    </div>
               </div>

               {show&&<div className="h-100 mt-3 alert alert-transparent">
                    <p className="my-auto d-inline">Start Date :{" "}
                    {formatDateDisplay(selectedDateRange.startDate)}{" | "}
                    End Date :{" "}
                    {formatDateDisplay(selectedDateRange.endDate)}
                    </p>
                    <button className="mb-1 btn btn-transparent text-danger" onClick={() => setShow(false)} variant="outline-success"> Close</button>
               </div>}
          </React.Fragment>
     );
};

export default DateRangeSelector;

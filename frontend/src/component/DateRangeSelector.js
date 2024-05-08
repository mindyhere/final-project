import React, { useState } from "react";
import { DateRangePicker } from "react-date-range";
import { format, subDays} from "date-fns";
import ko from "date-fns/locale/ko";
import "../asset/css/datepicker.css"

const DateRangeSelector = ({ ranges, onChange, onSubmit, ...rest }) => {
     const [state, setState] = useState({
          startDate: new Date(),
          endDate: new Date(),
          key: "selection"
     });
     const [show, setShow] = useState(false);

     function formatDateDisplay(date, defaultText) {
          if (!date) return defaultText;
          return format(date, "yyyy년 MM월 dd일");
     }

     const handleSelect = ranges => {
          setState(ranges.selection);
     };

     return (
          <React.Fragment>
               <div className="dateRangePicker">
                <div>
                    <DateRangePicker
                        locale={ko}
                        minDate={subDays(new Date(), 0)}             
                        onChange={handleSelect}
                        showSelectionPreview={true}
                        moveRangeOnFirstSelection={false}
                        months={2}
                        ranges={[state]}
                        direction="horizontal"
                    />
                    </div>
                    <div className="text-left position-relative rdr-buttons-position mt-2 mr-3">
                         <button
                              className="btn btn-primary"
                              onClick={() => setShow(true)}
                         >닫기</button>
                    </div>
               </div>

               {show && 
                    <div className="h-100 mt-3 alert alert-transparent">
                         <p className="my-auto d-inline">
                              {formatDateDisplay(state.startDate)}
                               ~ {formatDateDisplay(state.endDate)}
                         </p>
                         <button className="mb-1 btn btn-transparent text-danger" onClick={() => setShow(false)} variant="outline-success"> Close</button>
                    </div>
               }
          </React.Fragment>
     );
};

export default DateRangeSelector;
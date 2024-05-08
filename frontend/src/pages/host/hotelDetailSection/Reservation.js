import React, { useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import "moment/locale/ko";
import "react-datepicker/dist/react-datepicker.css";

import DatePicker from 'react-datepicker';
import { ko } from "date-fns/locale";
import DateRangeSelector from "../../../component/DateRangeSelector";
import { DateRangePicker  } from "react-date-range";
import { format, addDays, subDays} from "date-fns";
import moment from "moment";

function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {
            setData(data);
            setLoading(false);
        })
    }, []);
    return [data, loading];
}

function Reservation() {
    const {HoIdx} = useParams();
    const [modal, setModal] = useState(false);
    const [data, loading] = useFetch('http://localhost/host/hotel/hotelPrice/' + HoIdx);

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

    if(loading){
        return (
            <div className="text-center">로딩 중...</div>
        )
    } else {
        return (
                <div className="card-style mb-30">
                    <div className="mb-20"><b>￦{data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} </b> / 박</div>
                    <table className="tbl">
                        <tbody>
                            <tr>
                                <th onClick={() => setModal(true)}>체크인</th>
                                { modal &&
                                   <div className='Modal' onClick={() => setModal(false)} style={{zIndex : 999}}> 
                                   <div className='Body' onClick={(e) => e.stopPropagation()}>
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
                                    </div>
                                }
                                <th>체크아웃</th>
                            </tr>
                            <tr>
                                <td className="text-sm">{formatDateDisplay(state.startDate)}</td>
                                <td className="text-sm">{formatDateDisplay(state.endDate)}</td>
                            </tr>
                            <tr><th colSpan={2}>인원 선택</th></tr>
                        </tbody>
                    </table>
                    <button className="main-btn mb-20" style={{width : '180px'}} type="button" onClick={() => {

                    }} >예약하기</button>
                    
                    <div className="text-xs">예약 확정 전에는 요금이 청구되지 않습니다.</div>
                    <hr />
                    <div className="row">
                        <div className="col-4" style={{textAlign : 'left'}}>
                            <b>총 합계</b>
                        </div>
                        <div className="col-8" style={{textAlign : 'right'}}>
                           <b> ￦ 총합계 데이터</b>
                        </div>
                    </div>
                </div>
        )
    }
};

export default Reservation;
import React, { useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import "moment/locale/ko";
import "../../../asset/css/datepicker.css"

import DatePicker from 'react-datepicker';
import DateRangeSelector from "../../../component/DateRangeSelector";
import { DateRange } from "react-date-range";
import { addDays} from "date-fns";
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
    const [calendar, setCalendar] = useState(false); 
    const [modal, setModal] = useState(false);
    const [data, loading] = useFetch('http://localhost/host/hotel/hostInfo/' + HoIdx);

    if(loading){
        return (
            <div className="text-center">로딩 중...</div>
        )
    } else {
        return (
                <div className="card-style mb-30">
                    <b>￦ 1박 가격 데이터 </b> /박
                    <br />
                    <div className="card-style mb-30">
                        <div className="row">
                            <div className="col-6">
                                <button type="button" onClick={() => setModal(true)}>
                                체크인</button>
                                { modal &&
                                    <div className='Modal' onClick={() => setModal(false)} style={{zIndex : 999}}>
                                        <div className='modalBody' onClick={(e) => e.stopPropagation()}>
                                            <button id = 'modalCloseBtn' onClick={() => setModal(false)}>
                                                X
                                            </button>
                                            <div>
                                                <DateRangeSelector />
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                            <div className="col-6">
                               <input type="text" placeholder="체크아웃" />
                            </div>
                        </div>
                        <div className="row">
                            <div>
                                <button type="button" onClick={() =>{
                                    
                                }}>
                                인원선택</button>
                            </div>
                        </div>
                    </div>
                    <button className="main-btn mb-20" style={{width : '180px'}} type="button" onClick={() => {

                    }}>예약하기</button>
                    
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
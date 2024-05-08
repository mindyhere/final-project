import React, { useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import "moment/locale/ko";
import "react-datepicker/dist/react-datepicker.css";

import DatePicker from 'react-datepicker';
import { ko } from "date-fns/locale";
import DateRangeSelector from "../../../component/DateRangeSelector";
import { DatePickers  } from "react-date-range";
import { format, addDays} from "date-fns";
import moment from "moment";

function useFetch(url) {
    const [data, setData] = useState(null);
    console.log(data);
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
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const {HoIdx} = useParams();
    const [modal, setModal] = useState(false);
    const [data, loading] = useFetch('http://localhost/host/hotel/hotelPrice/' + HoIdx);

    if(loading){
        return (
            <div className="text-center">로딩 중...</div>
        )
    } else {
        return (
                <div className="card-style mb-30">
                    <div className="mb-20"><b>￦{data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} </b> / 박</div>
                    
                    <div className="card-style mb-30">
                        <div className="row">
                            <div className="col-6">
                                <div className="row">체크인</div>
                                <div className="row">
                                    <DatePicker 
                                        locale={ko}
                                        dateFormat="yyyy년 MM월 dd일"
                                        selected={startDate} 
                                        onChange={date => setStartDate(date)}
                                        selectsStart
                                        startDate={startDate}
                                        endDate={endDate}
                                        months={2}
                                    />
                                </div>
                            </div>
                            <div className="col-6">
                            <div className="row">체크아웃</div>
                                <div className="row">
                                    <DatePicker 
                                        locale={ko}
                                        dateFormat="yyyy년 MM월 dd일"
                                        selected={endDate} 
                                        onChange={date => setEndDate(date)}
                                        selectsStart
                                        startDate={startDate}
                                        endDate={endDate}
                                        minDate={startDate}
                                        months={2}
                                    />
                                </div>
                            </div>
                        </div>
                        
                        <div className="row">
                            <div>
                                <div onClick={() =>{}}> 인원선택</div>
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
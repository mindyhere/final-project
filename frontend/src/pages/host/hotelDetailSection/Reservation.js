import React, { useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import "moment/locale/ko";
import { DateRangePicker  } from "react-date-range";
import ko from "date-fns/locale/ko";
import { format, subDays} from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import "../../../asset/css/datepicker.css";

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

   function formatDateDisplay(date, defaultText) {
        if (!date) return defaultText;
        return format(date, "yyyy년 MM월 dd일");
   }

   const handleSelect = ranges => {
        setState(ranges.selection);
        setView(true);
   };


   const start = moment(state.startDate);
   const end = moment(state.endDate);
   const dateChar  = moment.duration(end.diff(start)).asDays();
   const price = data * dateChar;
   const vat = price * 0.2;
   const totalPrice = price + vat;

   const [view, setView] = useState(false);

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
                                            isClearable={true}
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
                            <tr>
                                <th className="dropdown-toggle" colSpan={2}>인원 선택</th>                            
                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <a class="dropdown-item" href="#">Action</a>
                                    <a class="dropdown-item" href="#">Another action</a>
                                    <a class="dropdown-item" href="#">Something else here</a>
                                </div>
                            </tr>
                        </tbody>
                    </table>
                    <button className="main-btn mb-20" style={{width : '200px'}} type="button" onClick={() => {

                    }} >예약하기</button>
                    <div className="text-xs">예약 확정 전에는 요금이 청구되지 않습니다.</div>
                    { view && 
                    <div className="container mb-20">
                        <div className="row">
                            <div className="col-6" style={{textAlign:'left'}}>
                                ￦{data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} X {dateChar} 박 
                            </div>
                            <div className="col-6" style={{textAlign:'right'}}>
                            ￦{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6" style={{textAlign:'left'}}>
                                에어비앤비 서비스 수수료
                            </div>
                            <div className="col-6 " style={{textAlign:'right'}}>
                            ￦{vat.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            </div>
                        </div>
                    </div>
                    
                    }
                    <hr />
                    <div className="row">
                        <div className="col-4" style={{textAlign : 'left'}}>
                            <b>총 합계</b>
                        </div>
                        <div className="col-8" style={{textAlign : 'right'}}>
                           <b> ￦{totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</b>
                        </div>
                    </div>
                </div>
        )
    }
};

export default Reservation;
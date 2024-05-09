import React, { useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import "moment/locale/ko";
import { DateRangePicker  } from "react-date-range";
import ko from "date-fns/locale/ko";
import { format, subDays} from "date-fns";
import { Dropdown } from "react-bootstrap";
import Swal from "sweetalert2";
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
    const [info, setInfo] = useState(false);
    const [view, setView] = useState(false);
    const [data, loading] = useFetch('http://localhost/host/hotel/reservation/' + HoIdx);

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

   const [adult, setAdult] = useState(1);
   const [teenager, setTeenager] = useState(0);
   const [child, setChild] = useState(0);

   function adultPlusBtn(){
    setAdult(adult + 1);
   }

   function adultMinusBtn(){
    if(adult == 0){
        Swal.fire({
            icon : 'warning',
            text : '0 미만으로 선택할 수 없습니다.',
        });
    } else {
        setAdult(adult - 1);
    }
   }

   function teenagerPlusBtn(){
    setTeenager(teenager + 1);
   }

   function teenagerMinusBtn(){
    if(teenager == 0){
        Swal.fire({
            icon : 'warning',
            text : '0 미만으로 선택할 수 없습니다.',
        });
    } else {
        setTeenager(teenager - 1);
    }
   }

   function childPlusBtn(){
    setChild(child + 1);
   }

   function childMinusBtn(){
    if(child == 0){
        Swal.fire({
            icon : 'warning',
            text : '0 미만으로 선택할 수 없습니다.',
        });
    } else {
        setChild(child - 1);
    }
   }

    if(loading){
        return (
            <div className="text-center">로딩 중...</div>
        )
    } else {
        const start = moment(state.startDate);
        const end = moment(state.endDate);
        const dateChar  = moment.duration(end.diff(start)).asDays();
        const price = (data.d_price) * dateChar;
        const vat = price * 0.2;
        const totalPrice = price + vat;
        const guestCounter = adult + teenager + child

        return (
                <div className="card-style mb-30">
                    <div className="mb-20"><b>￦{data.d_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} </b> / 박</div>
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
                                            rangeColors={["#DBC4F0"]}
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
                                <th colSpan={2}>
                                    <Dropdown>
                                        <Dropdown.Toggle className="col-12 btn btn-light dropdown-toggle dropdown-toggle-split" style={{backgroundColor: 'transparent'}}>
                                            인원 선택
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu className="col-12">
                                            
                                            <Dropdown.Item className="col-6">성인</Dropdown.Item>
                                                <button style={{marginRight: '10px'}} onClick={adultMinusBtn}> - </button>
                                                {adult}
                                                <button style={{marginLeft: '10px'}} onClick={adultPlusBtn} disabled={guestCounter >= data.d_capacity ? true : false}> + </button>

                                            <Dropdown.Item>어린이</Dropdown.Item>
                                                <button style={{marginRight: '10px'}} onClick={teenagerMinusBtn}> - </button>
                                                {teenager}
                                                <button style={{marginLeft: '10px'}} onClick={teenagerPlusBtn} disabled={guestCounter >= data.d_capacity ? true : false}> + </button>
                                            
                                            <Dropdown.Item>유아</Dropdown.Item>
                                                <button style={{marginRight: '10px'}} onClick={childMinusBtn}> - </button>
                                                {child}
                                                <button style={{marginLeft: '10px'}} onClick={childPlusBtn}> + </button>
                                           
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    {
                                        guestCounter > 0
                                        ?
                                        <div>
                                        게스트 {guestCounter}명
                                        </div>
                                        : ''
                                    }
                                </th>
                            </tr>
                        </tbody>
                    </table>
                    <button className="main-btn mb-20" style={{width : '200px'}} type="button" onClick={() => {
                        if(totalPrice == 0){
                            Swal.fire({
                                icon : 'warning',
                                text : '숙박날짜를 선택해주세요.',
                            });
                        } else { // 결제창으로 이동

                        }
                    }} >예약하기</button>
                    <div className="text-xs">예약 확정 전에는 요금이 청구되지 않습니다.</div>
                    { view && 
                    <div className="container mb-20">
                        <div className="row">
                            <div className="col-6" style={{textAlign:'left', textDecoration: 'underline'}}>
                                ￦{data.d_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} X {dateChar} 박 
                            </div>
                            <div className="col-6" style={{textAlign:'right'}}>
                                ￦{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6" style={{textAlign:'left', textDecoration: 'underline'}} onClick={() => setInfo(true)}>
                                에어비앤비 서비스 수수료
                            </div>
                            { info &&
                                <div className='Modal' onClick={() => setInfo(false)} style={{zIndex : 999}}>
                                    <div className='modalBody' style={{height:'200px', width: '400px', padding: '20px'}} onClick={(e) => e.stopPropagation()}>
                                            <button id = 'modalCloseBtn' onClick={() => setInfo(false)}>
                                            X
                                            </button>
                                            <div className="container" style={{textAlign: 'left'}}>
                                                수수료는 에어비앤비 플랫폼을 운영하고 연중무휴 고객 지원과 같은 다양한 서비스를 제공하는데 사용됩니다. 부가가치세(VAT)가 포함된 가격입니다.
                                            </div>
                                    </div>
                                </div>
                                }
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
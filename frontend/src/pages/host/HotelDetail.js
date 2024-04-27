import React, {useRef, useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DateRange } from "react-date-range";
import { addDays} from "date-fns";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.module.css";


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

function HotelDetail() {
    const [data, loading] = useFetch('http://localhost/host/hotel/hotelDetail');
    
    console.log("data.hotelList : " + data);

    const [state, setState] = useState([
        {
          startDate: new Date(),
          // 달력에 1박 표시
          endDate: addDays(new Date(), 1),
          key: "selection",
        },
      ])

    // const {ho_idx} = useParams(); // APP.js 에서 전달한 파라미터
    // const navigate = useNavigate();
    // const ho_name = useRef();
    // const ho_address = useRef();
    // const ho_level = useRef();
    // const ho_floor = useRef();
    // const img = useRef();
    if(loading){
        return (
            <div className="text-center">로딩 중...</div>
        )
    } else {
        let src = '';
        let img_url = '';
        if(data.ho_img !== '-'){
            src = `http://localhost/static/images/host/${data.ho_img}`;
            img_url = `<img src=${src} width='600px' height='300px'/>`;
        } else {
            img_url = '';
        }
        return (
            <div className="container">
                <div className="row justify-content-between">
                    <div className="col-9">
                        <h2>{data.ho_name}</h2>
                    </div>
                    <div className="col-3">
                        공유하기 | ♡ wish
                    </div>
                </div>
                <br />
                <div className="row mb-30">
                <div className="card-style">
                     <span dangerouslySetInnerHTML={{__html : img_url}}></span>
                     
                </div>
                </div>

                <div className="row">
                    <div className="col-9">
                        <div>
                            <h4>{data.ho_address}</h4>
                            <div>최대인원 {data.d_capacity}명 · 침대 {data.d_beds}개 · 면적 {data.d_area}㎡</div>
                            <div>★ 후기 개</div>
                            <br />
                            <div className="card-style mb-30">
                            게스트 선호 | 별점 | 후기수 </div>
                            <div> 호스트 소개 </div>
                            <hr />
                            <div>숙소 소개글</div>
                            <hr />
                            <div>선택 가능한 객실 유형</div>
                            <div>이미지</div>
                            <div>숙소유형명</div>
                            <hr />
                            <div>숙소편의시설</div>
                            <button type="button">편의시설 모두보기</button>
                            <hr />
                            <div>
                                달력
                            </div>
                            <hr />
                            <div>
                                후기
                            </div>
                            <hr />
                            <h4>숙소 위치</h4>
                            <div>주소</div>
                            <div>
                                지도 맵
                            </div>
                            <h4>호스트 소개</h4>
                            <div className="card-style">
                                호스트 소개글
                                호스트에게 메시지 보내기 등
                            </div>
                            <h4>알아두어야 할 사항</h4>
                            <div>숙소 이용규칙</div>
                        </div>
                    </div>
                    <div className="col-3">
                            <div className="card-style mb-30">
                                <div> 날짜선택/가격/주문 창</div>
                            </div>
                        <DateRange
                            dateFormat="yyyy-MM-dd"    // 날짜 형식 설정
                            className="input-datepicker"    // 클래스 명 지정 css주기 위해
                            editableDateInputs={true}
                            onChange={(item) => setState([item.selection])}
                            moveRangeOnFirstSelection={false}
                            ranges={state}
                            months={2}
                            direction="horizontal"
                        />
                    </div>
                </div>

            </div>
        )
    }
};

export default HotelDetail;

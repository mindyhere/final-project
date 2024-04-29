import React, {useRef, useEffect, useState} from "react";
import KakaoMap from "../../component/KakaoMap";
import { useNavigate, useParams } from "react-router-dom";
import { DateRange } from "react-date-range";
import { addDays} from "date-fns";
import DatePicker from 'react-datepicker';
import DateRangeSelector from "../../component/DateRangeSelector";


import "../../asset/css/datepicker.css"

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
    if(loading){
        return (
            <div className="text-center">로딩 중...</div>
        )
    } else {
        let src = '';
        let img_url = '';
        if(data.ho_img !== '-'){
            src = `../../img/${data.ho_img}`;
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
                            <div>최대 인원 {data.d_capacity}명 · 침대 {data.d_beds}개 · 면적 {data.d_area}㎡</div>
                            <br />
                            <div><b> 호스트 : {data.h_name}님 </b></div>
                            <div>{data.h_level} · 호스팅 경력 {data.h_regdate} 개월</div>
                            <hr />
                            <div>
                                셀프 체크인
                            </div>
                            <hr />
                            <div>숙소 소개글</div>
                            <b>더보기 버튼 클릭 시 전문 나오도록(타이틀 삭제?)</b><br />
                            {data.ho_description}
                            <hr />
                            <div>선택 가능한 객실 유형</div>
                            <div>이미지 {data.d_img1}</div>
                            <div>{data.d_room_type}</div>
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
                            <div>{data.ho_address}</div>
                            <br />
                            <div>
                                <KakaoMap />
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
                                <div> 날짜를 입력하여 요금을 확인하세요</div>
                                <DateRangeSelector/>
                            </div>
                           
                    </div>
                </div>
            </div>
        )
    }
};

export default HotelDetail;
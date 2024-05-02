import React, {useRef, useEffect, useState} from "react";
import KakaoMap from "../../component/KakaoMap";
import { useParams } from "react-router-dom";
import { addDays} from "date-fns";
import Swal from "sweetalert2";
import moment from "moment";
import "moment/locale/ko";
import "../../asset/css/datepicker.css"

import DatePicker from 'react-datepicker';
import DateRangeSelector from "../../component/DateRangeSelector";
import { DateRange } from "react-date-range";

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
    const {HoIdx} = useParams();
    const [data, loading] = useFetch('http://localhost/host/hotel/hotelDetail/' + HoIdx);
    const [modal, setModal] = useState(false);
    const element = useRef<HTMLDivElement>(null);
    const onMoveBox = () => {
        element.current?.scrollIntoView({behavior : "smooth", block:"start"});
    }

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
        let regdate = moment(data.h_regdate).fromNow();
        let level = '';
        let answer = '';
        if (data.ho_level == 8){
            level = '호스트';
            answer = '80%';
        } else {
            level = '슈퍼호스트';
            answer = '100%';
        }
        let src = '';
        let img_url = '';
        if(data.ho_img !== '-'){
            src = `http://localhost/static/images/host/hotel/${data.ho_img}`;
            img_url = `<img src=${src} width='600px' height='300px'/>`;
        } else {
            img_url = '';
        }

        let profile_src = '';
        let profile_url = '';
        if(data.h_profile !== '-'){
            profile_src = `http://localhost/static/images/host/profile/${data.h_profile}`;
            profile_url = `<img src=${profile_src} width='90px' height='90px'/>`;
        } else {
            profile_url = `http://localhost/static/images/no-image.png`;
        }
        return (
            <div className="container">
                <div className="row justify-content-between">
                    <div className="col-9">
                        <h2>{data.ho_name}</h2>
                    </div>
                    <div className="col-3">
                    <img src="/img/share.png" width="20px" height="20px"/> <a href="" style={{color:'black'}}>공유하기</a> | ♡ wish
                    </div>
                </div>
                <br />
                <div className="row mb-30">
                    <div className="card-style">
                        <span dangerouslySetInnerHTML={{__html : img_url}}></span>                        
                    </div>
                </div>
                <div className="row">
                    <div className="col-8">
                        <div>
                            <h3>{data.ho_address}</h3>
                            <div>최대 인원 {data.d_capacity}명 · 침대 {data.d_beds}개 · 면적 {data.d_area}㎡</div>
                            <br />
                            <div className="card-style">
                                if 문으로 후기가 5개 이상일 경우 보여주기

                            </div>
                            <br />
                            <div className="row">
                                <div className="col-3">
                                    <div className="profile-image" onClick={onMoveBox}>
                                        <span dangerouslySetInnerHTML={{__html : profile_url}}></span>                        
                                    </div>
                                </div>
                                <div className="col-9" style={{alignSelf : 'center'}}>
                                    <div><b> 호스트 : {data.h_name}님 </b></div>
                                    <div>{level} · 호스팅 경력 {regdate}</div>
                                </div>
                            </div>
                            <hr />
                            <div>
                                셀프 체크인
                            </div>
                            <hr />
                            <h4>숙소 소개</h4>
                            <b>더보기 버튼 클릭 시 전문 나오도록(타이틀 삭제?)</b><br />
                            {data.ho_description}
                            <hr />
                            <h4>선택 가능한 객실 유형</h4>
                            <div>이미지 {data.d_img1}</div>
                            <div>{data.d_room_type}</div>
                            <hr />
                            <h4>숙소편의시설</h4>
                            <button type="button">편의시설 모두보기</button>
                            <hr />
                            <h4>
                                {data.ho_name}에서 
                            </h4>
                            <div>
                                <DateRangeSelector/>
                                </div>
                            <hr />
                            <h4>
                                숙소 후기
                            </h4>
                            <hr />
                            <h4>숙소 위치</h4>
                            <div>{data.ho_address}</div>
                            <br />
                            <div>
                                <KakaoMap />
                            </div>
                            <br />
                            <h4 useRef={element} className="mb-30">호스트 소개</h4>
                            <div className="card-style" style={{backgroundColor : "#F6F2F9"}}>
                                <div className="row">
                                    <div className="col-6">
                                        <div className="card-style">
                                            <div className="row">
                                                <div className="col-6 text-center">
                                                <img src="/img/id.png" width="90px" height="90px"/>
                                                    <br />
                                                    <h2>{data.h_name}</h2><br />
                                                    <h6>{level}</h6>
                                                </div>
                                                <div className="col-6">
                                                    <div className="text-xs">후기</div>
                                                    15개
                                                    <br />
                                                    <hr />
                                                    <div className="text-xs">평점</div>
                                                    {}
                                                    <br />
                                                    <hr />
                                                    <div className="text-xs">호스팅 경력</div>
                                                    {regdate}
                                                </div>
                                            </div>
                                        </div>
                                        <br />
                                        <p><a href="/guest/mypage" style={{color: 'black', textDecorationLine: 'none'}}>더 보기 ▶</a></p>
                                    </div>
                                    <div className="col-6">
                                        <h4>{data.h_name}님은 {level}입니다.</h4>
                                        <span className="mb-40">
                                        슈퍼호스트는 어쩌구~~~ 설명
                                        </span>
                                        <h5>호스트 상세 정보</h5> <br />
                                        응답률 : {answer} <br />
                                        1시간 이내에 응답
                                        <br />
                                        <button type="button" onClick={() => {
                                            Swal.fire({
                                                title: '나중에 URL 연결',
                                                showCancelButton: false,
                                                confirmButtonText: '확인',
                                            });
                                        }}
                                        className="btn btn-dark">호스트에게 메시지 보내기</button>
                                        <hr />
                                        <div className="text-xs">
                                            <img src="/img/danger.png" width="35px" height="35px"/> 안전한 결제를 위해 사이트 외부에서 송금하거나 대화를 나누지 마세요.
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <h4>알아두어야 할 사항</h4>
                            <div>숙소 이용규칙</div>
                        </div>
                    </div>
                    
                    <div className="col-4">
                            <div className="card-style mb-30">
                                <div> 날짜를 입력하여 요금을 확인하세요</div>
                                {/* <DateRangeSelector/> */}
                                <div className="card-style mb-30">
                                    <div className="row">
                                        <div className="col-6">
                                            체크인
                                        </div>
                                        <div className="col-6">
                                            체크아웃
                                        </div>
                                    </div>
                                </div>
                            </div>    
                    </div>
                </div>
            </div>
        )
    }
};

export default HotelDetail;
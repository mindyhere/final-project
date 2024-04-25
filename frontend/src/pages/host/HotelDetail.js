import React, {useRef, useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";


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
    // const {ho_idx} = useParams(); // APP.js 에서 전달한 파라미터
    // //const [data, loading] = useFetch('http://localhost/host/hotel/hotelList');
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
                    <div>이미지</div>
                    <div>이미지2</div>
                </div>
                </div>

                <div className="row">
                    <div className="col-9">
                        <div>
                            <h4>주소</h4>
                            <div>인원 | 침대수 | 욕실수 등</div>
                            <div className="card-style mb-30">게스트 선호 | 별점 | 후기수 </div>
                            <div> 호스트 소개 </div>
                            <hr />
                            <div> 셀프체크인 <br /> 슈퍼호스트 </div>
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
                    </div>
                </div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                        <td>호텔명</td>
                        <td>호텔주소</td>
                        <td>호텔등급</td>
                        <td>호텔층수</td>
                        </tr>
                    </thead>
                    <tbody>
                        {data.list.map((item, idx) => (
                    <tr>
                    <td>{item.ho_name}</td>
                    <td>{item.ho_address}</td>
                    <td>{item.ho_level}</td>
                    <td>{item.ho_floor}</td>
                    </tr>
                )
                )}
                    </tbody>
                </table>
            </div>
        )
    }
};

export default HotelDetail;

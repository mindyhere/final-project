import React, { useEffect, useRef, useState} from "react";
import Cookies from "universal-cookie";
import { InfoCircle } from "react-bootstrap-icons";

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

function RegistHotelDetail() {
    const cookies = new Cookies();
    const userInfo = cookies.get("userInfo");
    const userName = userInfo.h_name;
    const [data, loading] = useFetch('http://localhost/host/hotel/hostPage/');
    const ho_name = useRef();
    const ho_address = useRef();

    if(loading){
        return (
            <div className="text-center">로딩 중...</div>
        )
    } else {
        return (
            <div className="container">
                <div className="mb-20">
                    <h2>{userName}님의 <br />
                    호텔 등록을 시작해볼까요?</h2>
                </div>
                <div className="card-style mb-30">
                    <h3><InfoCircle /> 호텔의 객실 정보를 알려주세요</h3>
                        리스트 형식으로 추가/삭제 버튼
                </div>
                    Hotel Detail
                    객실유형
                    얼마나 많은 인원이 숙박할 수 있나요?
                    수용인원
                    면적
                    게스트가 사용할 수 있는 침대는 몇 개인가요?
                    침대수
                    금연실여부
                    가격
                    이미지1
                    이미지2
                    이미지3
                <div className="card-style mb-30">
                    <h3>어떤 편의시설을 제공하시나요?</h3>
                    <div className="text-sm mb-20 mt-10">일반적으로 게스트가 기대하는 편의시설 목록입니다.<br />
                    숙소를 등록한 후 언제든 편의시설을 추가할 수 있어요.</div>
                    <div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                            <label class="form-check-label" for="flexCheckDefault">
                                산 전망
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                            <label class="form-check-label" for="flexCheckChecked">
                                바다 전망
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                            <label class="form-check-label" for="flexCheckChecked">
                                무선인터넷
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                            <label class="form-check-label" for="flexCheckChecked">
                            주차장
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                            <label class="form-check-label" for="flexCheckChecked">
                                조식 제공
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                            <label class="form-check-label" for="flexCheckChecked">
                            화재경보기
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                            <label class="form-check-label" for="flexCheckChecked">
                            소화기
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

export default RegistHotelDetail;
import React, { useEffect, useRef, useState} from "react";
import Cookies from "universal-cookie";

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

function UpdateHotel() {
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
                    <h2>{userName}님의 호텔 목록입니다.<br />
                    숙소 등록을 시작해볼까요?</h2>
                </div>
                <div>
                    <h4>숙소 기본 정보를 알려주세요</h4>
                    Hotel
                    <table className="tbl">
                        <thead>
                        </thead>
                        <tbody>
                            <tr>
                                <th>호텔명</th>
                                <td><input ref={ho_name}/></td>
                            </tr>
                            <tr>
                                <th>주소</th>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                    호텔명
                    주소
                    등급
                    층수
                    이미지
                    싱글수
                    더블수
                    패밀리수
                    스위트수
                    좌표(위치)
                    <h4>게스트에게 숙소에 대해 설명해주세요</h4>
                    숙소에 대해 간략히 설명해주세요
                    숙소와 주변 지역에 대한 정보에서 시작해 게스트와 어떻게 소통하고 싶은지 등의 내용을 적어주세요
                    textarea - 글자수 
                    소개글
                    체크인시간
                    체크아웃시간
                </div>
                <div>
                    <h4>어떤 편의시설을 제공하시나요?</h4>
                    일반적으로 게스트가 기대하는 편의시설 목록입니다.
                    숙소를 등록한 후 언제든 편의시설을 추가할 수 있어요
                    -체크박스-
                    <input type="checkbox" />
                    산 전망
                    바다전망
                    무선인터넷
                    주차장
                    조식제공
                    화재경보기
                    소화기
                </div>
                <div>
                    Hotel Detail
                    객실유형
                    <h4>얼마나 많은 인원이 숙박할 수 있나요?</h4>

                    수용인원
                    면적
                    <h4>게스트가 사용할 수 있는 침대는 몇 개인가요?</h4>
                    침대수
                    금연실여부
                    가격
                    이미지1
                    이미지2
                    이미지3
                </div>
                
                

            </div>
        )
    }
};

export default UpdateHotel;
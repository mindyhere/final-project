import React, { useEffect, useRef, useState} from "react";
import Cookies from "universal-cookie";
import { InfoCircle } from "react-bootstrap-icons";
import Swal from "sweetalert2";

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
    const [modal, setModal] = useState(false);
    const chkBoxList = ['산 전망', '바다 전망', '무선인터넷', '주차장', '조식 제공', '화재경보기', '소화기'];
    const [data, loading] = useFetch('http://localhost/host/hotel/hostPage/');
    
    const [guest, setGuest] = useState(1);
    function guestPlusBtn(){
        setGuest(guest + 1);
    }
    function guestMinusBtn(){
        if(guest == 0){
            Swal.fire({
                icon : 'warning',
                text : '0 미만으로 선택할 수 없습니다.',
            });
        } else {
            setGuest(guest - 1);
        }
    }

    const [beds, setBeds] = useState(0);
    function bedPlusBtn(){
        setBeds(beds + 1);
    }
    function bedMinusBtn(){
        if(beds == 0){
            Swal.fire({
                icon : 'warning',
                text : '0 미만으로 선택할 수 없습니다.',
            });
        } else {
            setBeds(beds - 1);
        }
    }

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
                    <div style={{textAlign : 'right'}}>
                        <button className="main-btn" onClick={() => setModal(true)}>추가</button>
                    </div>
                    { modal &&
                        <div className='Modal' onClick={() => setModal(false)} style={{zIndex : 999}}>
                            <div className='modalBody' onClick={(e) => e.stopPropagation()}>
                                <button id = 'modalCloseBtn' onClick={() => setModal(false)}>
                                    X
                                </button>
                                <div className="container" style={{whiteSpace: 'pre-wrap', textAlign:'center'}}>
                                    <div className="row row-cols-2">
                                        <div className="col-8">객실 유형을 선택해주세요</div>
                                        <div className="col-4"></div>
                                        <div className="col-8">얼마나 많은 인원이 숙박할 수 있나요?</div>
                                        <div className="col-4">
                                            <button style={{marginRight: '10px'}} onClick={guestMinusBtn}> - </button>
                                                {guest}
                                            <button style={{marginLeft: '10px'}} onClick={guestPlusBtn}> + </button>
                                        </div>
                                        <div className="col-8">객실의 넓이는 어느정도 인가요?</div>
                                        <div className="col-4"></div>
                                        <div className="col-8">게스트가 사용할 수 있는 침대는 몇 개인가요?</div>
                                        <div className="col-4">
                                            <button style={{marginRight: '10px'}} onClick={bedMinusBtn}> - </button>
                                                {beds}
                                            <button style={{marginLeft: '10px'}} onClick={bedPlusBtn}> + </button>
                                        </div>
                                        <div className="col-8">금연실</div>
                                        <div className="col-4"></div>
                                        <div className="col-8">가격</div>
                                        <div className="col-4"></div>
                                        <div className="col-8">이미지</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    <table className="tbl">
                        <thead>
                            <tr>
                                <th>번호</th>
                                <th>객실유형</th>
                                <th>수용인원</th>
                                <th>면적</th>
                                <th>침대수</th>
                                <th>금연실</th>
                                <th>가격</th>
                                <th>객실 이미지</th>
                                <th>객실 이미지2</th>
                                <th>객실 이미지3</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                    
                    얼마나 많은 인원이 숙박할 수 있나요?
                    
                    게스트가 사용할 수 있는 침대는 몇 개인가요?
                    
                <div className="card-style mb-30">
                    <h3>어떤 편의시설을 제공하시나요?</h3>
                    <div className="text-sm mb-20 mt-10">일반적으로 게스트가 기대하는 편의시설 목록입니다.<br />
                    숙소를 등록한 후 언제든 편의시설을 추가할 수 있어요.</div>
                    <div className="checkbox-group" style={{fontSize: '18px'}}>
                        {chkBoxList.map((item, idx) => (
                            <div className='checkbox' key={idx}>
                                <input
                                    type='checkbox'
                                    id={item}
                                />
                                <label htmlFor={item}>　{item}</label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
};

export default RegistHotelDetail;
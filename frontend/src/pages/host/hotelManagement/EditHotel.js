import React, { useEffect, useRef, useState} from "react";
import { useLocation } from "react-router-dom";
import Cookies from "universal-cookie";
import HotelRoomsItem from "../../../component/HotelRoomsItem";

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

function EditHotel() {
    const cookies = new Cookies();
    const userInfo = cookies.get("userInfo");
    const userName = userInfo.h_name;
    const location = useLocation();
    const [hoIdx, setHoIdx] = useState(location.state?.hoIdx);
    const [hoName, setHoName] = useState(location.state?.hoName);
    const [data, loading] = useFetch('http://localhost/host/hotel/detailMyHotel?ho_idx=' + hoIdx);
    const ho_name = useRef();
    const ho_address = useRef();
    const [modal, setModal] = useState(false);

    let [inputCount, setInputCount] = useState(0);
    const onInputHandler = (e) => {
        setInputCount(e.target.value.length);
    }

    if(loading){
        return (
            <div className="text-center">로딩 중...</div>
        )
    } else {
        let src = '';
        let image_url = '';
        if(data.fileName !== '-'){
            src = `http://localhost/static/images/host/hotel/${data[0].ho_img}`;
            image_url = `<img src=${src} width='90px' height='90px'/>`;
        } else {
            image_url = '';
        }

        return (
            <div className="container">
                <div className="mb-20">
                    <h2>{userName}님의 {hoName}입니다.<br />
                    </h2>
                </div>
                <div className="card-style mb-30">
                    <h4>기본 정보</h4>
                    <table className="tbl">
                        <thead>
                        </thead>
                        <tbody>
                            <tr>
                                <th colSpan={2}>호텔명</th>
                                <td colSpan={3}><input style={{border:'none'}} ref={ho_name} defaultValue={data[0].ho_name}/></td>
                            </tr>
                            <tr>
                                <th>호텔 등급</th>
                                <td><input style={{border:'none'}} ref={ho_name} defaultValue={data[0].ho_level} /></td>
                                <th>호텔 층수</th>
                                <td><input style={{border:'none'}} ref={ho_name} defaultValue={data[0].ho_floor}/></td>
                            </tr>
                            <tr>
                                <th>싱글</th>
                                <td><input style={{border:'none'}} ref={ho_name} defaultValue={data[0].ho_single} /></td>
                                <th>더블</th>
                                <td><input style={{border:'none'}} ref={ho_name} defaultValue={data[0].ho_double} /></td>
                            </tr>
                            <tr>
                                <th>패밀리</th>
                                <td><input style={{border:'none'}} ref={ho_name} defaultValue={data[0].ho_family} /></td>
                                <th>스위트</th>
                                <td><input style={{border:'none'}} ref={ho_name} defaultValue={data[0].ho_suite} /></td>
                            </tr>
                            <tr>
                                <th>체크인</th>
                                <td><input style={{border:'none'}} ref={ho_name} defaultValue={data[0].ho_check_in} /></td>
                                <th>체크아웃</th>
                                <td><input style={{border:'none'}} ref={ho_name} defaultValue={data[0].ho_check_out} /></td>
                            </tr>
                            <tr>
                                <th>주소</th>
                                <td colSpan={3}>
                                    <input style={{border:'none'}} ref={ho_name} defaultValue={data[0].ho_address} />
                                </td>
                            </tr>
                            <tr>
                                <th colSpan={2}>호텔 대표 이미지</th>
                                {/* <span dangerouslySetInnerHTML={{__html : image_url}}></span> */}
                                <td colSpan={2}><input type="file" ref={ho_name} /></td>
                            </tr>
                            <tr>
                                <th colSpan={2}>호텔 소개</th>
                                <td colSpan={2}>
                                    <textarea rows="5" cols="30" maxLength="100" onChange={onInputHandler} ref={ho_name} defaultValue={data[0].ho_description} placeholder="숙소와 주변 지역에 대한 정보에서 시작해 게스트와 어떻게 소통하고 싶은지 등의 내용을 적어주세요"/>
                                    <p style={{textAlign:'right'}}>
                                        <span>{inputCount}</span>
                                        <span> / 100 자</span>
                                    </p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="card-style mb-30">
                    <h4>호텔 편의시설</h4>
                    <div className="checkbox-group mt-20" style={{fontSize: '18px'}}>
                        <div>
                            <input type="checkbox" defaultChecked={data[0].mountain_view == 'Y' ? true : false} ></input>
                            <label>　산 전망</label>
                        </div>
                        <div>
                            <input type="checkbox" defaultChecked={data[0].ocean_view == 'Y' ? true : false} ></input>
                            <label>　바다 전망</label>
                        </div>
                        <div>
                            <input type="checkbox" defaultChecked={data[0].wifi == 'Y' ? true : false} ></input>
                            <label>　무선 인터넷</label>
                        </div>
                        <div>
                            <input type="checkbox" defaultChecked={data[0].parking_lot == 'Y' ? true : false} ></input>
                            <label>　주차장</label>
                        </div>
                        <div>
                            <input type="checkbox" defaultChecked={data[0].breakfast == 'Y' ? true : false} ></input>
                            <label>　조식 제공</label>
                        </div>
                        <div>
                            <input type="checkbox" defaultChecked={data[0].fire_alam == 'Y' ? true : false} ></input>
                            <label>　화재경보기</label>
                        </div>
                        <div>
                            <input type="checkbox" defaultChecked={data[0].fire_extinguisher == 'Y' ? true : false} ></input>
                            <label>　소화기</label>
                        </div>
                    </div>
                </div>
                <div className="card-style mb-30">
                    <h4>객실 정보</h4>
                    <table className="tbl">
                        <thead>
                             <tr>
                                <th>번호</th>
                                <th>객실 유형</th>
                                <th>수용인원</th>
                                <th>면적</th>
                                <th>침대수</th>
                                <th>가격</th>
                                <th>금연실</th>
                                <th>-</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, idx) => (
                                <tr style={{textAlign:'center'}}>
                                    <td>{idx + 1}</td>
                                    <td>{item.d_room_type}</td>
                                    <td>{item.d_capacity}</td>
                                    <td>{item.d_area}</td>
                                    <td>{item.d_beds}</td>
                                    <td>{item.d_price}</td>
                                    <td>{item.d_non_smoking}</td>
                                    <td><button className="main-btn" onClick={() => setModal(true)}>수정</button></td>
                                </tr>
                            ))}
                            { modal &&
                                <div className='Modal' style={{zIndex : 999}}>
                                    <div className='modalBody' onClick={(e) => e.stopPropagation()}>
                                        <button id = 'modalCloseBtn' onClick={() => setModal(false)}>
                                            X
                                        </button>
                                        <div className="container" style={{whiteSpace: 'pre-wrap', textAlign:'center'}}>
                                            {data.ho_description}
                                        </div>
                                    </div>
                                </div>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
};

export default EditHotel;
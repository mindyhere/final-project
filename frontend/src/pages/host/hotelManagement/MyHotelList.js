import React, { useEffect, useRef, useState} from "react";
import { useNavigate } from "react-router";
import { Building, BuildingAdd, BuildingCheck, BuildingDash, Hearts } from "react-bootstrap-icons";
import { useParams } from "react-router";
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
            console.log( " !!!!!!!" + JSON.stringify(data));
            setData(data);
            setLoading(false);
        })
    }, []);
    return [data, loading];
}

function MyHotelList() {
    const navigate = useNavigate();
    const cookies = new Cookies();
    const userInfo = cookies.get("userInfo");
    const userIdx = userInfo.h_idx;
    const userName = userInfo.h_name;
    const [data, loading] = useFetch('http://localhost/host/hotel/hotelManagement/' + userIdx);

    if(loading){
        return (
            <div className="text-center">로딩 중...</div>
        )
    } else {
        return (
            <div className="container">
                <h2 className="mb-30"><Hearts color="#DBC4F0" size={40}/> {userName}님의 호텔 현황입니다.<br /></h2>
                <div className="card-style mb-20">
                    <div className="mb-20"><BuildingAdd size={30} /> 승인 대기 {data.status.wait}개</div>
                    <div className="mb-20"><BuildingCheck size={30} /> 영업 중  {data.status.open}개</div>
                    <div><BuildingDash size={30} /> 영업 중지  {data.status.close}개</div>
                </div>
                <div style={{textAlign:'right'}}>
                    <button className="main-btn mb-20" onClick={() => 
                    navigate('/host/hotel/registHotel')}>호텔 등록하기</button>
                </div>
                <div className="card-style mb-20">
                    <table className="tbl">
                        <thead>
                             <tr>
                                <th>번호</th>
                                <th>호텔명</th>
                                <th>주소</th>
                                <th>상태</th>
                                <th>-</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.list.map((item, idx) => (
                                <tr style={{textAlign:'center'}}>
                                    <td>{idx + 1}</td>
                                    <td>{item.ho_name}</td>
                                    <td>{item.ho_address}</td>
                                    <td>{item.status}</td>
                                    <td><button className="main-btn" onClick={() => {
                                        
                                    }}>수정</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
};

export default MyHotelList;
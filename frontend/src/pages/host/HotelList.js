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

function HotelList() {
    const [data, loading] = useFetch('http://localhost/host/hotel/hotelList');
    
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
                <div className="row">
                    <div className="col-lg-8">
                        <h2>{data.ho_name}</h2>
                    </div>
                    <div className="col-lg-4">
                        위시
                    </div>
                </div>
                
                <div></div>
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

export default HotelList;

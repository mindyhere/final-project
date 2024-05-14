import React, { useEffect, useRef, useState} from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, InfoCircle } from "react-bootstrap-icons";
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

function RegistHotel() {
    const navigate = useNavigate();
    const cookies = new Cookies();
    const userInfo = cookies.get("userInfo");
    const userName = userInfo.h_name;
    const [data, loading] = useFetch('http://localhost/host/hotel/hostPage/');
    const ho_name = useRef();
    const ho_address = useRef();
    const ho_level = useRef();
    const ho_floor = useRef();
    const ho_single = useRef();
    const ho_double = useRef();
    const ho_family = useRef();
    const ho_suite = useRef();
    const ho_check_in = useRef();
    const ho_check_out = useRef();
    const ho_img = useRef();
    const ho_description = useRef();



    let [inputCount, setInputCount] = useState(0);
    const onInputHandler = (e) => {
        setInputCount(e.target.value.length);
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
                <div>
                    <div className="card-style mb-40">
                    <h3><InfoCircle /> 숙소 기본 정보를 알려주세요</h3>
                        <table className="tbl">
                            <thead>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>호텔명</th>
                                    <td><input style={{border:'none'}} ref={ho_name}/></td>
                                </tr>
                                <tr>
                                    <th>호텔 등급</th>
                                    <td><input style={{border:'none'}} ref={ho_level} /></td>
                                </tr>
                                <tr>
                                    <th>호텔 층수</th>
                                    <td><input style={{border:'none'}} ref={ho_floor}/></td>
                                </tr>
                                <tr>
                                    <th>싱글</th>
                                    <td><input style={{border:'none'}} ref={ho_single}/></td>
                                </tr>
                                <tr>
                                    <th>더블</th>
                                    <td><input style={{border:'none'}} ref={ho_double}/></td>
                                </tr>
                                <tr>
                                    <th>패밀리</th>
                                    <td><input style={{border:'none'}} ref={ho_family}/></td>
                                </tr>
                                <tr>
                                    <th>스위트</th>
                                    <td><input style={{border:'none'}} ref={ho_suite}/></td>
                                </tr>
                                <tr>
                                    <th>체크인</th>
                                    <td><input style={{border:'none'}} ref={ho_check_in}/></td>
                                </tr>
                                <tr>
                                    <th>체크아웃</th>
                                    <td><input style={{border:'none'}} ref={ho_check_out}/></td>
                                </tr>
                                <tr>
                                    <th>주소</th>
                                    <td><input style={{border:'none'}} ref={ho_address}/></td>
                                </tr>
                                <tr>
                                    <th>호텔 대표 이미지</th>
                                    <td><input type="file" ref={ho_img} /></td>
                                </tr>
                            </tbody>
                        </table>
                        <br />
                        <h4>게스트에게 호텔에 대해 설명해주세요</h4>
                        <div className="text-sm mb-20">숙소에 대해 간략히 설명해주세요</div>
                        <textarea rows="5" cols="83" maxLength="100" onChange={onInputHandler} ref={ho_description} placeholder="숙소와 주변 지역에 대한 정보에서 시작해 게스트와 어떻게 소통하고 싶은지 등의 내용을 적어주세요"/>
                            <p style={{textAlign:'right'}}>
                                <span>{inputCount}</span>
                                <span> / 100 자</span>
                            </p>
                        <div style={{textAlign:'right'}}>
                            <button className="main-btn" onClick={() => {
                                const form = new FormData();
                                form.append('ho_name', ho_name.current.value);
                                form.append('ho_level', ho_level.current.value);
                                form.append('ho_floor', ho_floor.current.value);
                                form.append('ho_single', ho_single.current.value);
                                form.append('ho_double', ho_double.current.value);
                                form.append('ho_family', ho_family.current.value);
                                form.append('ho_suite', ho_suite.current.value);
                                form.append('ho_check_in', ho_check_in.current.value);
                                form.append('ho_check_out', ho_check_out.current.value);
                                form.append('ho_address', ho_address.current.value);
                                if (ho_img.current.files.length > 0) {
                                    form.append('ho_img', ho_img.current.files[0]);
                                }
                                form.append('ho_description', ho_description.current.value);
                                fetch('http://localhost/host/hotel/registHotel', {
                                    method: 'post',
                                    encType: 'multipart/form-data',
                                    body : form
                                }).then(() => {
                                    navigate('/host/hotel/registHotelDetail');
                                });
                            }}>다음 <ArrowRight /></button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

export default RegistHotel;
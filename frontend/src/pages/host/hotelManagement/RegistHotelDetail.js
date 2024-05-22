import React, { useEffect, useRef, useState} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "universal-cookie";
import { InfoCircle, QuestionCircle } from "react-bootstrap-icons";
import Swal from "sweetalert2";
import RegistRoomDetail from "./RegistRoomDetail";

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
    const navigate = useNavigate();
    const location = useLocation();
    const htIdx = location.state.htIdx;
    const cookies = new Cookies();
    const userInfo = cookies.get("userInfo");
    const userIdx = userInfo.h_idx;
    const userName = userInfo.h_name;
    const [modal, setModal] = useState(false);
    //const [data, loading] = useFetch('http://localhost/host/hotel/detailMyHotel?ho_idx=' + HoIdx);
    //const data = JSON.parse(localStorage.getItem("defaultInfo"));
    const [checkItems, setCheckItems] = useState([]);
    const d_room_type = useRef();
    const d_capacity = useRef();
    const d_area = useRef();
    const d_non_smoking = useRef();
    const d_beds = useRef();
    const d_price = useRef();
    const d_img1 = useRef();
    const d_img2 = useRef();
    const d_img3 = useRef();

    const [lists, setList] = useState([]);

    let list=[];

    const onSetData = (item) => {
        list.push(item);
        setList(old => [...old, ...list]);
        setModal(false);
    }

    function Modal(props) {
        function closeModal() {
            props.closeModal();
          setModal(!modal);
        }
        return (
          <div className="modal_h z-3" onClick={closeModal}>
            <div
              className="modalBody_h"
              style={{ width: "1000px", height: "800px", padding: "30px" }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="btnClose" onClick={closeModal}>
                X
              </button>
               {props.children}
            </div>
          </div>
        );
    }

    const dataList = [
        {id: 0, title: '산 전망', icon: '/img/mountain.png'},
        {id: 1, title: '바다 전망', icon: '/img/ocean.png'},
        {id: 2, title: '무선인터넷', icon: '/img/wifi.png'},
        {id: 3, title: '주차장', icon: '/img/parking.png'},
        {id: 4, title: '조식 제공', icon: '/img/breakfast.png'},
        {id: 5, title: '화재경보기', icon: '/img/firealam.png'},
        {id: 6, title: '소화기', icon: '/img/fireExt.png'}
    ];

    const handleSingleCheck = (checked, id) => {
        if (checked) {
            setCheckItems(prev => [...prev, id]);        
        } else {
            setCheckItems(checkItems.filter((el) => el !== id));
        }
    };
    
    const handleAllCheck = (checked) => {
        if(checked) {
            const idArray = [];
            dataList.forEach((el) => idArray.push(el.id));
            setCheckItems(idArray);
        }
        else {
            setCheckItems([]);
        }
    };
    //alert(htIdx);
    return (
        <div className="container">
            <div className="mb-20">
                <h2>{userName}님의 <br />
                신규 호텔 등록을 시작해볼까요?</h2>
            </div>
            <div className="card-style mb-30">
                <h3><QuestionCircle size={30}/> 어떤 편의시설을 제공하시나요?</h3>
                <div className="text-sm mb-20 mt-10">일반적으로 게스트가 기대하는 편의시설 목록입니다.<br />
                숙소를 등록한 후 언제든 편의시설을 추가할 수 있어요.</div>
                <div className="mb-10" style={{fontSize: '20px'}}>
                    <input type='checkbox' name='select-all'
                    onChange={(e) => handleAllCheck(e.target.checked)}
                    checked={checkItems.length === dataList.length ? true : false} />
                    &nbsp;
                    <strong>전체 선택</strong>
                </div>
                <div className="checkbox-group mb-40" style={{fontSize: '18px'}}>
                    {dataList?.map((item, index) => (
                        <div key={index} className="mb-10">
                            <div>
                                <input type='checkbox' name={`select-${item.id}`}
                                onChange={(e) => handleSingleCheck(e.target.checked, item.id)}
                                checked={checkItems.includes(item.id) ? true : false} />
                                &nbsp;
                                <img src={item.icon} style={{ width: '30px', height: '30px' }} />
                                &nbsp;{item.title}
                            </div>
                        </div>
                    ))}
                </div>
                <hr />
                <h3><InfoCircle size={30} /> 호텔의 객실 정보를 알려주세요</h3>
                <div style={{textAlign : 'right'}}>
                    <button className="main-btn z-0" onClick={() => setModal(true)}>추가</button>
                </div>
                {modal && (
                    <Modal closeModal={() => {setModal(!modal);}}>
                        <RegistRoomDetail
                            insertData={onSetData}
                        />
                    </Modal>
                )}
                <table className="tbl">
                    <thead>
                        <tr>
                            <th>객실유형</th>
                            <th>수용인원(명)</th>
                            <th>면적(㎡)</th>
                            <th>침대수(개)</th>
                            <th>금연실</th>
                            <th>가격(원)</th>
                            <th>객실 이미지</th>
                            <th>객실 이미지2</th>
                            <th>객실 이미지3</th>
                        </tr>
                    </thead>
                    { lists.length == 0
                        ? 
                            <tbody>
                                <tr>
                                    <td colSpan={10} style={{textAlign: 'center'}}>등록된 객실이 없습니다.</td>
                                </tr>
                            </tbody>
                        :
                            <tbody>
                                {lists.map((item) => (
                                    <tr style={{textAlign:'center'}} onClick={() => {setModal(true);}}>
                                        <td>
                                            {
                                                item.roomType == '1' ? '싱글룸'
                                                : item.roomType == '2' ? '더블룸'
                                                : item.roomType == '3' ? '패밀리룸'
                                                :'스위트룸'
                                            }
                                        </td>
                                        <td>{item.capacity}</td>
                                        <td>{item.area}</td>
                                        <td>{item.beds}</td>
                                        <td>{item.non_smoking}</td>
                                        <td>{item.price}</td>
                                        <td>{item.dImg1}</td>
                                        <td>{item.dImg2}</td>
                                        <td>{item.dImg3}</td>
                                    </tr>
                                ))}
                            </tbody>
                    }
                </table>

                <div className="mt-50" style={{textAlign : 'center'}}>
                    <button className="main-btn z-0" style={{zIndex: 0}}  onClick={() => {
                        const form = new FormData();
                        form.append('ht_idx', htIdx);
                        form.append('ht_h_idx', userIdx);
                        form.append('checkItems', checkItems);
                        form.append('list', JSON.stringify(lists));
                        // form.append('ho_name', data.ho_name);
                        // form.append('ho_level', data.ho_level);
                        // form.append('ho_floor', data.ho_floor);
                        // form.append('ho_single', data.ho_single);
                        // form.append('ho_double', data.ho_double);
                        // form.append('ho_family', data.ho_family);
                        // form.append('ho_suite', data.ho_suite);
                        // form.append('ho_check_in', data.ho_check_in);
                        // form.append('ho_check_out', data.ho_check_out);
                        // form.append('ho_address', data.ho_address);
                        // form.append('ho_x', data.ho_x);
                        // form.append('ho_y', data.ho_y);
                        // form.append('ho_img', data.ho_img);

                        // form.append('d_room_type', d_room_type.current.value);
                        // form.append('d_capacity', d_capacity.current.value);
                        // form.append('d_area', d_area.current.value);
                        // form.append('d_beds', d_beds.current.value);
                        // form.append('d_non_smoking', d_non_smoking.current.value);
                        // form.append('d_price', d_price.current.value);
                        // if(d_img1.current.files.length > 0){
                        //     form.append('d_img1', d_img1.current.files[0]);
                        // }
                        // if(d_img2.current.files.length > 0){
                        //     form.append('d_img2', d_img2.current.files[0]);
                        // }
                        // if(d_img3.current.files.length > 0){
                        //     form.append('d_img3', d_img3.current.files[0]);
                        // }
                        fetch('http://localhost/host/hotel/registHotelDetail', {
                            method : 'POST',
                            encType : 'multipart/form-data',
                            body : form
                        }).then(() => {
                            navigate('/');
                        });
                    }}>등록 신청하기</button>
                    &nbsp;
                    <button className="main-btn z-0" style={{zIndex: 0}}  onClick={() => {
                        navigate('/host/hotel/registHotel');
                    }}>뒤로 가기</button>
                </div>
            </div>
        </div>
    )
}

export default RegistHotelDetail;
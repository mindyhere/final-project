import React, { useEffect, useRef, useState} from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { InfoCircle, QuestionCircle } from "react-bootstrap-icons";
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
    const navigate = useNavigate();
    const cookies = new Cookies();
    const userInfo = cookies.get("userInfo");
    const userName = userInfo.h_name;
    const [modal, setModal] = useState(false);
    const [data, loading] = useFetch('http://localhost/host/hotel/hostPage/');
    const d_room_type = useRef();
    const d_capacity = useRef();
    const d_area = useRef();
    const d_non_smoking = useRef();
    const d_beds = useRef();
    const d_price = useRef();
    const d_img1 = useRef();
    const d_img2 = useRef();
    const d_img3 = useRef();
    const chkBoxList = ['산 전망', '바다 전망', '무선인터넷', '주차장', '조식 제공', '화재경보기', '소화기'];

    function Modal(props) {
        function closeModal() {
          props.closeModal();
          setModal(!modal);
        }
        return (
          <div className="modal_h" onClick={closeModal}>
            <div
              className="modalBody_h"
              style={{ width: "1000px", height: "700px", padding: "30px" }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="btnClose" onClick={closeModal}>
                X
              </button>
               {/*props.children*/}
            </div>
          </div>
        );
      }

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

    const dataList = [
        {id: 0, title: '산 전망', icon: '/img/mountain.png'},
        {id: 1, title: '바다 전망', icon: '/img/ocean.png'},
        {id: 2, title: '무선인터넷', icon: '/img/wifi.png'},
        {id: 3, title: '주차장', icon: '/img/parking.png'},
        {id: 4, title: '조식 제공', icon: '/img/breakfast.png'},
        {id: 5, title: '화재경보기', icon: '/img/firealam.png'},
        {id: 6, title: '소화기', icon: '/img/fireExt.png'}
      ];

    const [checkItems, setCheckItems] = useState([]);
    
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
                    신규 호텔 등록을 시작해볼까요?</h2>
                </div>
                <div className="card-style mb-30">
                    <h3><InfoCircle size={35} /> 호텔의 객실 정보를 알려주세요</h3>
                    <div style={{textAlign : 'right'}}>
                        <button className="main-btn" style={{zIndex: 0}} onClick={() => setModal(true)}>추가</button>
                    </div>
                    { modal &&
                        <Modal
                            style={{ zIndex: 999, position: "relative" }}
                            closeModal={() => {
                                setModal(!modal);
                                }}
                        />
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
                    <br />
                    <h3><QuestionCircle size={35}/> 어떤 편의시설을 제공하시나요?</h3>
                    <div className="text-sm mb-20 mt-10">일반적으로 게스트가 기대하는 편의시설 목록입니다.<br />
                    숙소를 등록한 후 언제든 편의시설을 추가할 수 있어요.</div>
                    <div className="mb-10" style={{fontSize: '20px'}}>
                        <input type='checkbox' name='select-all'
                        onChange={(e) => handleAllCheck(e.target.checked)}
                        checked={checkItems.length === dataList.length ? true : false} />
                        &nbsp;
                        <strong>전체 선택</strong>
                    </div>
                    <div className="checkbox-group" style={{fontSize: '18px'}}>
                        {dataList?.map((item, index) => (
                            <div key={index} className="mb-10">
                                <div>
                                    <input type='checkbox' name={`select-${item.id}`}
                                    onChange={(e) => handleSingleCheck(e.target.checked, item.id)}
                                    //defaultChecked={item.stats == "Y"}
                                    checked={checkItems.includes(item.id) ? true : false} />
                                    &nbsp;
                                    <img src={item.icon} style={{ width: '30px', height: '30px' }} />
                                    &nbsp;{item.title}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-30">
                        <button className="main-btn" style={{zIndex: 0}}  onClick={() => {
                            const form = new FormData();
                            form.append('d_room_type', d_room_type.current.value);
                            form.append('d_capacity', d_capacity.current.value);
                            form.append('d_area', d_area.current.value);
                            form.append('d_beds', d_beds.current.value);
                            form.append('d_non_smoking', d_non_smoking.current.value);
                            form.append('d_price', d_price.current.value);
                            if(d_img1.current.files.length > 0){
                                form.append('d_img1', d_img1.current.files[0]);
                            }
                            if(d_img2.current.files.length > 0){
                                form.append('d_img2', d_img2.current.files[0]);
                            }
                            if(d_img3.current.files.length > 0){
                                form.append('d_img3', d_img3.current.files[0]);
                            }
                            fetch('http://localhost/host/hotel/registNewHotel', {
                                method : 'POST',
                                encType : 'multipart/form-data',
                                body : form
                            }).then(() => {
                                navigate('');
                            });
                        }}>등록 신청하기</button>
                        &nbsp;
                        <button className="main-btn" style={{zIndex: 0}}  onClick={() => {
                           navigate('/host/hotel/registHotel');
                        }}>뒤로 가기</button>
                    </div>
                </div>
            </div>
        )
    }
};

export default RegistHotelDetail;
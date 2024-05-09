import React, {useRef,useEffect,useState} from 'react';
import {useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'universal-cookie';
import PayItem from "../../pages/guest/PayItem";
import Swal from "sweetalert2";


function useFetch(url) {
    const [data,setData] = useState(null);
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        fetch(url)
            .then(response=>{
                return response.json();
            })
            .then(data=>{
                setData(data);
                setLoading(false);
            })
    }, []);
    return [data,loading];
}

function Pay() {
    const cookies = new Cookies();
    const g_idx=cookies.get('g_idx');
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);
    const modalBackground = useRef();
    const [paylist,setPayList] = useState([]);


    const [data,loading]=useFetch('http://localhost/guest/my?g_idx='+g_idx.key);
    const g_card=useRef();
    const [num, setNum] = useState('');
    const g_date=useRef();
    const [num1, setNum1] = useState('');
    const g_cvc=useRef();
    const [num2, setNum2] = useState('');

    //카드번호 입력함수
    const handleCard = (e) => {
        const value = g_card.current.value.replace(/\D+/g, "");
        const numberLength = 16;
    
        let result = "";  
    
        for (let i = 0; i < value.length && i < numberLength; i++) {
          switch (i) {
            case 4:
              result += "-";
              break;
            case 8:
              result += "-";
              break;
            case 12:
                result += "-";
                break;
    
            default:
              break;
          }
    
          result += value[i];
        }
    
        g_card.current.value = result;
    
        setNum(e.target.value); 
    };

    //만료일 입력함수
    const handleDate = (e) => {
        const value1 = g_date.current.value.replace(/\D+/g, "");
        const numberLength = 4;
    
        let result1 = "";  
    
        for (let i = 0; i < value1.length && i < numberLength; i++) {
          switch (i) {
            case 2:
              result1 += "/";
              break;
    
            default:
              break;
          }
    
          result1 += value1[i];
        }
    
        g_date.current.value = result1;
    
        setNum1(e.target.value); 
    };

    //CVC 입력함수
    const handleCVC = (e) => {
        const value2 = g_cvc.current.value.replace(/\D+/g, "");
        const numberLength = 3;
    
        let result2 = "";  
    
        for (let i = 0; i < value2.length && i < numberLength; i++) {
          switch (i) {
            default:
              break;
          }
    
          result2 += value2[i];
        }
    
        g_cvc.current.value = result2;
    
        setNum2(e.target.value); 
    };

    function getPay(url) {
        fetch(url)
        .then(response => {
          return response.json();
        })
        .then(data => {
          setPayList(data);
        });
    }

    useEffect(() => {getPay('http://localhost/guest/pay?g_idx='+g_idx.key);},[]); //회원연결시 ?g_idx=1 삭제


    if(loading){
        return(
            <div>loading</div>
        )
    } else {
        let card='';
        if(data.dto.g_card != null) {
            card = '****'+data.dto.g_card.substring(15,19);
        }
        return (
            <>
                <div>
                    <div align='center'>
                        <div className="page-direction" style={{padding: "20px"}}>
                            <div className="navi">
                                <span style={{fontWeight: "bold",fontSize: "28px"}}>결제</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div style={{paddingLeft: '250px'}}>
                            <div align='left'>
                                <h3>결제수단</h3>
                                {data.dto.g_date === null
                                ?
                                <>
                                    <br/>
                                    <br/>
                                    <br/>
                                    &nbsp;&nbsp;카드를 등록해주세요.
                                    <br/>
                                    <br/>
                                    <br/>

                                    <div>
                                        <div className={'btn-wrapper'}>
                                                <div className={'modal-open-btn'} onClick={() => setModalOpen(true)}>
                                                    <button className='btn btn-dark'>결제수단 등록</button>
                                                </div>
                                            </div>
                                            {
                                                modalOpen &&
                                                <div className={'modal-container'} ref={modalBackground} onClick={e => {
                                                if (e.target === modalBackground.current) {
                                                    setModalOpen(false);
                                                }
                                                }}>
                                                <div className={'modal-content2'}>
                                                    <h4>카드 상세정보 추가하기</h4>
                                                    <br />
                                                    <div style={{padding:'3px'}}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-credit-card" viewBox="0 0 16 16">
                                                        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z"/>
                                                        <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/>
                                                        </svg>&nbsp;
                                                            <input value={num} className='form-control' ref={g_card} placeholder="카드번호(16자리)" type='text' onChange={handleCard}/>
                                                    </div>
                                                    <div style={{padding:'3px'}}>
                                                        
                                                        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z"/>
                                                        <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/>
                                                        &nbsp;
                                                                <input value={num1} className='form-control' ref={g_date} placeholder="만료일(MM/YY)" type='text' onChange={handleDate}></input>
                                                    </div>
                                                    <div style={{padding:'3px'}}>
                                                        
                                                        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z"/>
                                                        <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/>
                                                        &nbsp;
                                                                <input value={num2} className='form-control' ref={g_cvc} placeholder="CVC" type='text' onChange={handleCVC}></input>
                                                    </div>
                                                    <ul className="navbar-nav" align='center'>
                                                        <li style={{padding:'4px'}}>
                                                        <button onClick={()=>{
                                                            const form = new FormData();
                                                            form.append('g_idx',g_idx.key);
                                                            form.append('g_card',g_card.current.value);
                                                            form.append('g_date',g_date.current.value);
                                                            form.append('g_cvc',g_cvc.current.value);
                                                            fetch('http://localhost/guest/cardupdate',{
                                                                method:'post',
                                                                encType:'multipart/form-data',
                                                                body:form
                                                            }).then(()=>{
                                                                //navigate('/guest/Pay');
                                                                window.location.href='/guest/Pay';
                                                            });
                                                        }} className='btn btn-dark'>등록</button></li>
                                                        <li style={{padding:'4px'}}>
                                                        <button className='btn btn-outline-dark' onClick={() => setModalOpen(false)}>닫기</button></li>
                                                    </ul>
                                                </div>
                                                </div>
                                            }
                                        </div>

                                </>
                                :
                                <>
                                    <br/>
                                    <h5>등록된 카드정보</h5>
                                    <tr>
                                        <td>카드번호</td>
                                        <td><input className='form-control' defaultValue={card} readOnly/></td>
                                    </tr>
                                    <tr>
                                        <td>카드 유효기간</td>
                                        <td><input className='form-control' defaultValue={data.dto.g_date} readOnly/></td>
                                    </tr>
                                    <tr>
                                        <td>cvc</td>
                                        <td><input className='form-control' defaultValue={data.dto.g_cvc} readOnly/></td>
                                    </tr>
                                    <tr>
                                        <button className='btn btn-outline-dark' onClick={()=>{
                                            

                                            Swal.fire({
                                                title: "",
                                                html: `카드정보를 삭제하시겠습니까?`,
                                                showCancelButton: true,
                                                cancelButtonText: "cancel",
                                                confirmButtonText: "OK",
                                                preConfirm:()=>{
                                                    const form = new FormData();
                                                    form.append('g_idx',g_idx.key);
                                                    fetch('http://localhost/guest/carddelete',{
                                                        method:'post',
                                                        encType:'multipart/form-data',
                                                        body:form
                                                    }).then(()=>{
                                                        window.location.href='/guest/Pay';
                                                    });
                                                }
                                            });

                                        }}>삭제</button>
                                    </tr>
                                </>
                                }
                                <br></br>
                                
                                <button onClick={()=> navigate('/guest/Order')}>예약상세</button>
                                <h3>결제내역</h3>
                                <br/>
                                {paylist.map(
                                    ({G_idx,D_img1,O_state,O_orderdate,O_payment,O_ckin,O_ckout,O_finalprice})=>(
                                        <PayItem
                                        G_idx={G_idx}
                                        D_img1={D_img1}
                                        O_state={O_state}
                                        O_orderdate={O_orderdate}
                                        O_payment={O_payment}
                                        O_ckin={O_ckin}
                                        O_ckout={O_ckout}
                                        O_finalprice={O_finalprice}
                                        key={G_idx}
                                            //싱글가격
                                            //평점
                                        />
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
export default Pay;
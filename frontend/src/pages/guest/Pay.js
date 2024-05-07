import React, {useRef,useEffect,useState} from 'react';
import {useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'universal-cookie';
import PayItem from "../../pages/guest/PayItem";

function Pay() {
    const cookies = new Cookies();
    const g_idx=cookies.get('g_idx');
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);
    const modalBackground = useRef();
    const [paylist,setPayList] = useState([]);

    function getPay(url) {
        fetch(url)
        .then(response => {
          return response.json();
        })
        .then(data => {
          setPayList(data);
        })
    }

    useEffect(() => {getPay('http://localhost/guest/pay?g_idx='+g_idx);}); //회원연결시 ?g_idx=1 삭제

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
                                <br/>
                                <br/>
                                &nbsp;&nbsp;----등록된 카드정보-----
                                <br/>
                                <br/>
                                <br/>
                                <img type='button' src='/img/kakaopay.png' onClick={()=>{
                                    fetch('http://localhost/orderPay',{
                                        method:'get',
                                        //encType:'multipart/form-data',
                                        //body:form
                                    }).then(()=>{
                                        navigate('/');
                                    });
                                }}></img>
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
                                                            <input className='form-control' placeholder="카드번호" type='text'></input>
                                                </div>
                                                <div style={{padding:'3px'}}>
                                                    
                                                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z"/>
                                                    <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/>
                                                    &nbsp;
                                                            <input className='form-control' placeholder="만료일" type='text'></input>
                                                </div>
                                                <div style={{padding:'3px'}}>
                                                    
                                                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z"/>
                                                    <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/>
                                                    &nbsp;
                                                            <input className='form-control' placeholder="CVC" type='text'></input>
                                                </div>
                                                <ul class="navbar-nav" align='center'>
                                                    <li style={{padding:'4px'}}>
                                                    <button className='btn btn-dark'>등록</button></li>
                                                    <li style={{padding:'4px'}}>
                                                    <button className='btn btn-outline-dark' onClick={() => setModalOpen(false)}>닫기</button></li>
                                                </ul>
                                            </div>
                                            </div>
                                        }
                                    </div>
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
export default Pay;
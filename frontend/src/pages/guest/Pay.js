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
        const numberLength1 = 16;
    
        let result = "";  
    
        for (let i = 0; i < value.length && i < numberLength1; i++) {
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
            card = '****-****-****-'+data.dto.g_card.substring(15,19);
        }
        return (
            <>
            <div className="container" align='center' style={{position: 'static'}}>
                <div className="row">
                
                <div className="col-5">
                <div className="container-lg">
                        <div style={{paddingLeft: '100px'}}>
				            <div align='left'>
                                <h3><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-credit-card" viewBox="0 0 16 16">
                                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z"/>
                                <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/>
                                </svg>&nbsp;결제수단</h3>
                                <br/>
                                {data.dto.g_date === null
                                ?
                                <>
                                <div class="card-stylee mb-30" >
                                    <br/>
                                    <br/>
                                    <br/>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;카드를 등록해주세요.
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
                                                            if(g_card.current.value.length !== 19){
                                                                Swal.fire({
                                                                    icon : 'warning',
                                                                    text : '카드번호 16자리를 입력하세요',
                                                                    confirmButtonText: '확인'
                                                                });
                                                                return;
                                                            }
                                                            if(g_date.current.value.length !== 5){
                                                                Swal.fire({
                                                                    icon : 'warning',
                                                                    text : '만료일을 정확히 입력하세요.',
                                                                    confirmButtonText: '확인'
                                                                });
                                                                return;
                                                            }
                                                            if(g_cvc.current.value.length !== 3){
                                                                Swal.fire({
                                                                    icon : 'warning',
                                                                    text : 'CVC 3자리를 입력하세요.',
                                                                    confirmButtonText: '확인'
                                                                });
                                                                return;
                                                            }
                                                            fetch('http://localhost/guest/cardupdate',{
                                                                method:'post',
                                                                body:form
                                                            }).then(()=>{
                                                                Swal.fire({
                                                                    icon : 'success',
                                                                    text : '카드등록이 완료되었습니다.',
                                                                    confirmButtonText: '확인'
                                                                }).then((result) => {
                                                                    if(result.isConfirmed) {
                                                                        window.location.href='/guest/Pay';
                                                                    }
                                                                });
                                                            });
                                                        }} className='btn btn-dark'>등록</button></li>
                                                        <li style={{padding:'4px'}}>
                                                        <button className='btn btn-outline-dark' onClick={() => setModalOpen(false)}>닫기</button></li>
                                                    </ul>
                                                </div>
                                                </div>
                                            }
                                        </div>
                                        </div>
                                </>
                                :
                                <>
                                    <div className="card-stylee mb-30" >
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
                                    </div>
                                    
                                
                                </>
                                }
                                </div>
                        </div>
                    </div>
                </div>

                                <div className="col-7" align='left'>
                                    <div style={{marginBottom: '30px',marginLeft: '50px'}}>
                                    <h3><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-wallet2" viewBox="0 0 16 16">
                                    <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5z"/>
                                    </svg>&nbsp;결제내역</h3>
                                            
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
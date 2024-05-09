import React, {useEffect,useState} from 'react';
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from 'universal-cookie';
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

function Order() {
    const cookies = new Cookies();
    const idx=cookies.get('g_idx');
    //const {HoIdx} = useParams();
    const location = useLocation();
    const HoIdx = location.state.HoIdx;
    const ckin = location.state.ckin;
    const ckout = location.state.ckout;
    const reser = location.state.reser;
    const dprice = location.state.dprice;
    const pprice = location.state.pprice;
    const fprice = location.state.fprice;
    const dateChar = location.state.dateChar;
    const vat = location.state.vat;
    const didx = location.state.didx;
    
    const [data,loading]=useFetch('http://localhost/guest/my?g_idx='+idx.key);
    const [hotel,loading2] = useFetch('http://localhost/host/hotel/hotelDetail/'+HoIdx);
    
    const [pay, setPay] = useState("Card");
    const onSelect = (event) => {
        setPay(event.target.value);
    };

    if(loading || loading2){
        return(
            <div>loading</div>
        )
    } else {
        let card='';
        if(data.dto.g_card != null) {
            card = data.dto.g_card.substring(15,19);
        }
        
        let src=`http://localhost/static/images/host/hotel/${hotel.ho_img}`;
        let image_url=`<img src=${src} width='100px' height='100px'/>`;

    return (
        <>
        <div className="container" align='center' style={{position: 'static'}}>
            <div className="row">
                
                <div className="col-5">
                <div className="container-lg">
                        <div style={{paddingLeft: '100px'}}>
                            <div align='left'>
                                <h2>예약요청</h2>
                                <div style={{marginBottom: '30px',marginTop:'20px'}}>
                                    <div style={{border: '1px solid rgb(221, 221, 221)', borderRadius: '12px', width: '400px', height:'100px', padding:'20px'}}>
                                        <h6>저렴한 요금&nbsp;</h6><div>얼른 예약하세요!</div>
                                        <div>
                                            <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{display: 'block', height: '32px', width: '32px', fill: 'rgb(227, 28, 95)', stroke: 'currentcolor'}}><g stroke="none"><path d="M25.55 1a5 5 0 0 1 3.344 1.282l.192.182 17.207 17.208a3 3 0 0 1 .135 4.098l-.135.144-18.379 18.379a3.001 3.001 0 0 1-3.32.63l-6.42 3.81c-1.296.768-2.948.452-3.894-.736l-.115-.153-.118-.186L2.094 25.046a5 5 0 0 1-.53-3.7l3.435-14.01L5 6a5 5 0 0 1 4.783-4.995L10 1h15.55zM5 15.733l-1.494 6.09a3 3 0 0 0 .219 2.034l.1.186 11.93 20.574.07.112a1 1 0 0 0 1.328.283l5.797-3.441L6.464 25.086a5 5 0 0 1-1.457-3.272L5 21.55v-5.817zM25.55 3H10a3 3 0 0 0-2.995 2.824L7 6v15.55a3 3 0 0 0 .743 1.977l.136.144L25.086 40.88a1 1 0 0 0 1.32.083l.094-.083L44.88 22.5a1 1 0 0 0 .083-1.32l-.083-.094L27.67 3.879A3 3 0 0 0 25.55 3zM14 7a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path><path d="M25.556 5H10a1 1 0 0 0-.993.883L9 6v15.556a1 1 0 0 0 .206.608l.087.1 16.505 16.505 16.971-16.971L26.263 5.293a1 1 0 0 0-.575-.284L25.556 5z" fillOpacity=".2"></path></g></svg>
                                        </div>
                                    </div>
                                </div>
                                    
                                <h4>예약정보</h4>
                                <br></br>
                                <div>날짜</div>
                                <div>{ckin} ~ {ckout}</div>
                                <br></br>
                                <div>게스트</div>
                                <div>{reser}명</div>
                                <hr/>
                                <h4>결제수단</h4>
                                <br/>
                                <select value={pay} class="form-select" aria-label="Default select example" onChange={onSelect}>
                                    <option value="Card">Card</option>
                                    <option value="KakaoPay">KakaoPay</option>
                                    <option value="Point">Point</option>
                                </select>
                                        {pay === "Card" &&data.dto.g_card === null
                                        ?
                                        <div style={{fontSize: '10px'}}>* 카드로 결제시 
                                        <svg viewBox="0 0 18 18" role="presentation" aria-hidden="true" focusable="false" style={{height: '10px', width: '10px', fill: 'rgb(118, 118, 118)'}}><path d="m4.29 1.71a1 1 0 1 1 1.42-1.41l8 8a1 1 0 0 1 0 1.41l-8 8a1 1 0 1 1 -1.42-1.41l7.29-7.29z" fill-rule="evenodd"></path></svg>
                                        결제
                                        <svg viewBox="0 0 18 18" role="presentation" aria-hidden="true" focusable="false" style={{height: '10px', width: '10px', fill: 'rgb(118, 118, 118)'}}><path d="m4.29 1.71a1 1 0 1 1 1.42-1.41l8 8a1 1 0 0 1 0 1.41l-8 8a1 1 0 1 1 -1.42-1.41l7.29-7.29z" fill-rule="evenodd"></path></svg>
                                        결제수단에서 카드를 등록해주세요.
                                        </div>
                                        :
                                        <div style={{fontSize: '10px'}}>
                                            <td>등록된 카드정보
                                                <tr>****{card}</tr>
                                            </td>
                                            <div>* 카드로 결제시 등록된 카드에서 결제될 예정입니다.</div>
                                        </div>
                                        }
                                <hr/>
                                <h4>호스트에게 메시지 보내기</h4>
                                <div>여행 목적, 동반 일행, 이 숙소를 선택한 이유 등을 알려주세요.</div>
                                <div>호스트 정보</div>
                                <div>host : {hotel.h_name}님</div>
                                <hr/>
                                <h4>환불 정책</h4>
                                <div>체크인 전날 12시까지 100% 가능 / 이후 불가능 </div>
                                <hr/>
                                <div><svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{display: 'block', height: '32px', width: '32px', fill: 'rgb(227, 28, 95)', stroke: 'currentcolor'}}><g><g stroke="none"><path d="M43 8v21.295L32.295 40l-10.359.001A11.971 11.971 0 0 0 26 31c0-6.627-5.373-12-12-12a12.02 12.02 0 0 0-3.001.378L11 8h32z" fill-opacity=".2"></path><path d="M32 42v-8a5 5 0 0 1 4.783-4.995L37 29h8V6H34v2h-2V6H22v2h-2V6H9v14.5H7V6a2 2 0 0 1 1.85-1.995L9 4h11V2h2v2h10V2h2v2h11a2 2 0 0 1 1.995 1.85L47 6v24.953L33.953 44H15v-2h17zm12.123-11H37a3 3 0 0 0-2.995 2.824L34 34v7.122L44.123 31z"></path></g><g fill="none" stroke-width="2"><path d="M14 43c.328 0 .653-.013.974-.039C21.146 42.465 26 37.299 26 31c0-6.627-5.373-12-12-12A11.995 11.995 0 0 0 2 31c0 6.627 5.373 12 12 12z"></path><path d="M23 31h-9v-9"></path></g></g></svg></div>
                                <div>호스트가 24시간 이내 예약 요청을 수락하기 전까지는 예약이 아직 확정된 것이 아닙니다.</div>
                                <hr/>
                                <div>아래 버튼을 선택하면 호스트가 설정한 숙소 이용규칙, 게스트에게 적용되는 기본 규칙, 에어비앤비 재예약 및 환불 정책에 동의하며, 피해에 대한 책임이 본인에게 있을 경우 에어비앤비가 결제 수단으로 청구의 조치를 취할 수 있다는 사실에 동의하는 것입니다. 호스트가 예약 요청을 수락하면 표시된 총액이 결제되는 데 동의합니다.</div>
                                <br/>
                                {pay === "Card" || pay === "Point"
                                ?
                                //카드 or 포인트로 결제시 버튼 클릭하면 DB에 바로 insert
                                <button className="btn btn-dark" onClick={()=>{
                                    if(data.dto.g_card ==null) {
                                        Swal.fire({
                                            icon : 'warning',
                                            text : '계정 > 결제 > 결제수단에서 카드를 등록해주세요.',
                                        });
                                    } else {
                                        const form = new FormData();
                                        form.append('idx',idx);
                                        form.append('didx',didx);
                                        form.append('ckin',ckin);
                                        form.append('ckout',ckout);
                                        form.append('reser',reser);
                                        form.append('pay',pay);
                                        form.append('dprice',dprice);
                                        form.append('fprice',fprice);
                                        fetch('http://localhost/guest/order',{
                                            method:'post',
                                            encType:'multipart/form-data',
                                            body:form
                                        }).then(()=>{
                                            //navigate('/guest/Pay');
                                            //예약완료시 예약내역페이지로 이동
                                            //window.location.href='/guest/preReservDetail';
                                        });
                                    }
                                }}>예약 요청</button>
                                :
                                //카페로 결제시 카페결제화면 거치고 성공하면 DB에 insert
                                <button className="btn btn-dark">카카오페이 결제</button>
                                }
                                <br/>
                                <br/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-5">
                    <div style={{marginBottom: '30px',marginTop:'55px'}}>
                        <div align='left' style={{border: '1px solid rgb(221, 221, 221)', borderRadius: '12px', width: '400px', height:'400px', padding:'20px'}}>
                            <span dangerouslySetInnerHTML={{ __html: image_url}}></span><div>{hotel.ho_name}</div>
                            <div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{display: 'block', height: '12px', width: '12px', fill: 'currentcolor'}}><path fill-rule="evenodd" d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"></path></svg>평점</div>
                            <hr/>
                            <h4>요금세부정보</h4>
                            <div>원가 ₩{dprice} X {dateChar}박 = {pprice}</div>
                            <div>수수료 : {vat}</div>
                            <hr/>
                            <div>총 합계(KRW)&nbsp;&nbsp;&nbsp;₩{fprice}원</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        </>
    )
}
}
export default Order;
import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

function Order() {
    return (
        <>
        <div className="container" align='center'>
            <div className="row">
                
                <div className="col-5">
                <div className="container-lg">
                        <div style={{paddingLeft: '50px'}}>
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
                                <br></br>
                                <div>게스트</div>
                                <hr/>
                                <h4>결제수단</h4>
                                <hr/>
                                <h4>호스트에게 메시지 보내기</h4>
                                <div>여행 목적, 동반 일행, 이 숙소를 선택한 이유 등을 알려주세요.</div>
                                <div>호스트 정보</div>
                                <hr/>
                                <h4>환불 정책</h4>
                                <hr/>
                                <div>호스트가 24시간 이내 예약 요청을 수락하기 전까지는 예약이 아직 확정된 것이 아닙니다. 예약 확정 전까지는 요금이 청구되지 않습니다.</div>
                                <hr/>
                                <div>아래 버튼을 선택하면 호스트가 설정한 숙소 이용규칙, 게스트에게 적용되는 기본 규칙, 에어비앤비 재예약 및 환불 정책에 동의하며, 피해에 대한 책임이 본인에게 있을 경우 에어비앤비가 결제 수단으로 청구의 조치를 취할 수 있다는 사실에 동의하는 것입니다. 호스트가 예약 요청을 수락하면 표시된 총액이 결제되는 데 동의합니다.</div>
                                <br/>
                                <button className="btn btn-dark">예약 요청</button>
                                <br/>
                                <br/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-5">
                    <div style={{marginBottom: '30px',marginTop:'55px'}}>
                        <div align='left' style={{border: '1px solid rgb(221, 221, 221)', borderRadius: '12px', width: '450px', height:'400px', padding:'20px'}}>
                            <hr/>
                            <h4>요금세부정보</h4>
                            <hr/>
                            <div>총 합계(KRW)</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        </>
    )
}
export default Order;
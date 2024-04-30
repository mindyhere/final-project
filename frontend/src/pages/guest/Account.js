import React, {useRef,useEffect,useState} from 'react';
import {useNavigate} from "react-router-dom";


function Account() {
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);
    const modalBackground = useRef();
    //모달
    // const customModalStyles: ReactModal.Styles = {
    //     overlay: {
    //       backgroundColor: " rgba(0, 0, 0, 0.4)",
    //       width: "100%",
    //       height: "100vh",
    //       zIndex: "10",
    //       position: "fixed",
    //       top: "0",
    //       left: "0",
    //     },
    //     content: {
    //       width: "360px",
    //       height: "180px",
    //       zIndex: "150",
    //       position: "absolute",
    //       top: "50%",
    //       left: "50%",
    //       transform: "translate(-50%, -50%)",
    //       borderRadius: "10px",
    //       boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
    //       backgroundColor: "white",
    //       justifyContent: "center",
    //       overflow: "auto",
    //     },
    // };

    return(
        <>
        <div>
            <div align='center'>
                <div className="page-direction" style={{padding: "20px"}}>
                    <div className="navi">
                        <span style={{fontWeight: "bold",fontSize: "28px"}}>계정</span>
                    </div>
                    이름, 이메일
                </div>
                <br />
            </div>
                <div align='center'>
                    <div className={'btn-wrapper'}>
                        <div className={'modal-open-btn'} onClick={() => setModalOpen(true)}>
                            <div className='shadow p-1 mb-5 border border-success p-2 border-opacity-10 rounded' style={{width: '300px', height: '200px'}}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{marginBottom: '10px',display: "block", height: "32px", width: "32px", fill: "currentcolor"}}><path d="M29 5a2 2 0 0 1 2 1.85V25a2 2 0 0 1-1.85 2H3a2 2 0 0 1-2-1.85V7a2 2 0 0 1 1.85-2H3zm0 2H3v18h26zm-3 12v2h-8v-2zm-16-8a3 3 0 0 1 2.5 4.67A5 5 0 0 1 15 20h-2a3 3 0 0 0-2-2.83V14a1 1 0 0 0-2-.12v3.29A3 3 0 0 0 7 20H5a5 5 0 0 1 2.5-4.33A3 3 0 0 1 10 11zm16 4v2h-8v-2zm0-4v2h-8v-2z"></path></svg>
                            <div style={{fontSize: '20px'}}>프로필</div>
                            </div>
                        </div>
                    </div>
                    {
                        modalOpen &&
                        <div className={'modal-container'} ref={modalBackground} onClick={e => {
                        if (e.target === modalBackground.current) {
                            setModalOpen(false);
                        }
                        }}>
                        <div className={'modal-content'}>
                            <h4>___님 프로필</h4>
                            <img src="/img/whitedog.jpg" width="210px" height="210px"></img>
                            <div style={{padding:'5px'}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-envelope-at" viewBox="0 0 16 16">
                                <path d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2zm3.708 6.208L1 11.105V5.383zM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2z"/>
                                <path d="M14.247 14.269c1.01 0 1.587-.857 1.587-2.025v-.21C15.834 10.43 14.64 9 12.52 9h-.035C10.42 9 9 10.36 9 12.432v.214C9 14.82 10.438 16 12.358 16h.044c.594 0 1.018-.074 1.237-.175v-.73c-.245.11-.673.18-1.18.18h-.044c-1.334 0-2.571-.788-2.571-2.655v-.157c0-1.657 1.058-2.724 2.64-2.724h.04c1.535 0 2.484 1.05 2.484 2.326v.118c0 .975-.324 1.39-.639 1.39-.232 0-.41-.148-.41-.42v-2.19h-.906v.569h-.03c-.084-.298-.368-.63-.954-.63-.778 0-1.259.555-1.259 1.4v.528c0 .892.49 1.434 1.26 1.434.471 0 .896-.227 1.014-.643h.043c.118.42.617.648 1.12.648m-2.453-1.588v-.227c0-.546.227-.791.573-.791.297 0 .572.192.572.708v.367c0 .573-.253.744-.564.744-.354 0-.581-.215-.581-.8Z"/>
                                </svg>&nbsp;
                                    <input type='text' readOnly></input>
                            </div>
                            <div style={{padding:'5px'}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-telephone" viewBox="0 0 16 16">
                                <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
                                </svg>&nbsp;
                                <input type='tel'></input>
                            </div>
                            <div style={{padding:'5px'}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
                                <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
                                </svg>&nbsp;
                                <input type='text' readOnly></input>
                            </div>
                            <ul class="navbar-nav">
                                <li style={{padding:'4px'}}>
                                <button className='btn btn-dark'>수정</button></li>
                                <li style={{padding:'4px'}}>
                                <button className='btn btn-outline-dark' onClick={() => setModalOpen(false)}>닫기</button></li>
                            </ul>
                        </div>
                        </div>
                    }
                    <div className={'btn-wrapper'}>
                        <div className='shadow p-1 mb-5 border border-success p-2 border-opacity-10 rounded' style={{width: '300px', height: '200px'}} onClick={() => navigate('/guest/Pay')}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{marginBottom: '10px', display: "block", height: "32px", width: "32px", fill: "currentcolor"}}><path d="M25 4a2 2 0 0 1 2 1.85V8h2.04c1.04 0 1.88.82 1.96 1.85V26c0 1.05-.8 1.92-1.81 2H6.96a1.98 1.98 0 0 1-1.95-1.85L5 26v-2H3a2 2 0 0 1-2-1.85V6a2 2 0 0 1 1.85-2H3zm2 18a2 2 0 0 1-1.85 2H7v2h22V10h-2zM25 6H3v16h22zm-3 12a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-8-8a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM6 8a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path></svg>
                        <div style={{fontSize: '20px'}}>결제</div>
                        </div>
                    </div>
                    <div className={'btn-wrapper'}>
                        <div className='shadow p-1 mb-5 border border-success p-2 border-opacity-10 rounded' style={{width: '300px', height: '200px'}}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{marginBottom: '10px', display: "block", height: "32px", width: "32px", fill: "currentcolor"}}><path d="M28 2a2 2 0 0 1 2 1.85V28a2 2 0 0 1-1.85 2H4a2 2 0 0 1-2-1.85V4a2 2 0 0 1 1.85-2H4zM13.59 17H4v11h11v-9.59l-4.3 4.3-1.4-1.42zM28 17h-9.59l4.3 4.3-1.42 1.4L17 18.42V28h11zM15 4H4v11h3.54a4 4 0 0 1 6.28-4.84c.29.28.68.85 1.18 1.74zm6 7c-.53 0-.98.17-1.42.6-.21.2-.63.87-1.22 1.98l-.25.47-.5.95H21a2 2 0 0 0 1.98-1.7l.01-.15L23 13a2 2 0 0 0-2-2zm7-7H17v7.9c.5-.89.89-1.46 1.18-1.74A4 4 0 0 1 24.46 15H28zm-17 7a2 2 0 0 0-2 2v.15A2 2 0 0 0 11 15h3.38l-.49-.95-.36-.69c-.54-.98-.91-1.58-1.1-1.76-.45-.43-.9-.6-1.43-.6z"></path></svg>
                        <div style={{fontSize: '20px'}}>쿠폰</div>
                        </div>
                    </div>
                </div>
            </div>
            <br/>
            <br/>
            <br/><br/><br/><br/><br/><br/><br/><br/>
        </>
    )
}
export default Account;
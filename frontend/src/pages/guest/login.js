import React, {useRef, useState} from "react";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Join from "./join";
import '../../asset/css/user.css'
import './modall.css'
import './aa.css'
import {useNavigate} from "react-router-dom";


function GuestLogin() {
    const [join, setJoin] = useState(false);       
    const navigate = useNavigate();
    const g_email = useRef();
    const g_passwd = useRef();
    const [message, setMessage] = useState([]);
    const [modal, setModal] = useState(false);

    return (
        <>
            <div className="container min-vh-100">
            <h3 class="text-bold"> <img src="/img/login.png" width="35px" height="35px"/>
                로그인</h3>
                <br/>
		    <p class="text-sm text-gray">로그인을 하시면 보다 더 많은 정보와 서비스를 이용하실 수
			있습니다.</p>
            <div class="card-stylee mb-30">
                <form>
                    <div>
                    <div class="input-stylee-1">
						<label>이메일</label> <input ref={g_email} placeholder="이메일을 입력해주세요"/>
					</div>
                    <div class="input-stylee-1">
						<label>비밀번호</label> <input type='password' ref={g_passwd} />
					</div>
                    <br/>
                            <button type='button' onClick={() => {
                                if(g_email.current.value == '') {
                                    window.alert('이메일을 입력하세요.');
                                    g_email.current.focus();
                                    return;
                                }
                                if(g_passwd.current.value == '') {
                                    window.alert('비밀번호를 입력하세요.');
                                    g_passwd.current.focus();
                                    return;
                                }
                                const form = new FormData();
                                form.append('g_email', g_email.current.value);
                                form.append('g_passwd', g_passwd.current.value);
                                fetch('http://localhost/guest/login/login', {
                                    method: 'post',
                                    body: form
                                })
                                .then(response => response.json())
                                .then(data => {
                                    setMessage(data);
                                    if(data.message == 'success') {
                                        const cookies = new Cookies();
                                        cookies.set('g_idx', {key: data.g_idx}, {path: '/', expires: new Date(Date.now()+2592000)}); 
                                        cookies.set('g_email', {key: data.g_email}, {path: '/', expires: new Date(Date.now()+2592000)}); 
                                        cookies.set('g_name', {key: data.g_name}, {path: '/', expires: new Date(Date.now()+2592000)});
                                        cookies.set('g_level', {key: data.g_level}, {path: '/', expires: new Date(Date.now()+2592000)});
                                        cookies.set('g_phone', {key: data.g_phone}, {path: '/', expires: new Date(Date.now()+2592000)});
                                        cookies.set('g_profile', {key: data.g_profile}, {path: '/', expires: new Date(Date.now()+2592000)});
                                        window.location.href='/';
                                       
                                    } else if(data.message == 'no') {
                                        Swal.fire({
                                            title: '로그인 실패',
                                            text: '회원 정보가 없습니다',
                                            showCancelButton: false,
                                            confirmButtonText: '확인',
                                        });
                                    } else {
                                        Swal.fire({
                                            title: '로그인 실패',
                                            text: '회원 정보가 일치하지 않습니다',
                                            showCancelButton: false,
                                            confirmButtonText: '확인',
                                        });
                                    }
                                });
                            }} class="main-btnn">로그인</button>
                            &nbsp;
                            
            </div>
            </form>
            </div>
            <div class="card-stylee d-flex align-items-center" style={{backgroundColor: '#E8E8E4', border: '1px solid #D5D5D5', height: '300px'}}>
            <div class="col text-center">
            <div class="btnLoginBottom">
            <Link to="/guest/searchEmail"><img src="/img/id.png" /><br/> 이메일 찾기</Link>
            </div>
            </div>
            <div class="col text-center">
            <div class="btnLoginBottom">
            <Link to="/guest/searchPw"><img src="/img/forgot.png" /><br/> 비밀번호 찾기</Link>
            </div>
            </div>
            <div class="col text-center">
            <div class="btnLoginBottom">

            <div onClick={() => setModal(true)}>
            <img src="/img/join.png" /><br/> <label class="text-bold">회원가입</label>
            </div>

            { modal &&
            <div className='Modal' onClick={() => setModal(false)}>
            <div className='modalBody' onClick={(e) => e.stopPropagation()}>
                <button id = 'modalCloseBtn' onClick={() => setModal(false)}>
                    X
                </button>

                    <div className="container min-vh-100" style={{paddingTop: "15px"}}>
                        <h3 class="text-bold"> <img src="/img/join.png" width="35px" height="35px"/>회원가입</h3>
                        <hr/>
                       <div class="aa">
                        <div class="card-style1" onClick={() => {setJoin(!join);}}> 
                            <img src="/img/guest.png" width="100px" height="100px" style={{marginLeft: "10px"}}/>
                            <label class="text-bold" style={{paddingTop: "20px"}}>게스트</label>
                            {join && (
                                <Modall closeModal={() => {setJoin(!join);}}>
                                <Join />
                                </Modall>
                            )}
                        </div>

                        <div class="card-style2" onClick={() => {setJoin(!join);}}> 
                            <img src="/img/host.png" width="100px" height="100px" />
                            <label class="text-bold" style={{paddingTop: "20px"}}>호스트</label>
                            {join && (
                                <Modall closeModal={() => {setJoin(!join);}}>
                                <Join />
                                </Modall>
                            )}
                        </div>
                </div>
        </div>
            </div>
        </div>
        }
            </div>
            </div>
            </div>
            </div>
        </>
    );

    function Modall(props) {
        function closeModal() {
            props.closeModal();
            setModal(false);
        }

    
        return (
            <div className='Modal_a' onClick={closeModal}>
                <div className='modalBody_a' onClick={(e) => e.stopPropagation()}>
                    <button id = 'modalCloseBtn' onClick={closeModal} >
                        X
                    </button>
                    {props.children}
                </div>
            </div>
        );
    }
};

export default GuestLogin;
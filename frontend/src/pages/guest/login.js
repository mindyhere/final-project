import React, {useRef, useState} from "react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router";
import { useSearchParams, Link } from "react-router-dom";
import Swal from "sweetalert2";


function GuestLogin() {
    const [params, setParams]=useSearchParams();
        //  데이터 setter       
    const msg = params.get('msg');
    const navigate = useNavigate();
    const g_email = useRef();
    const g_passwd = useRef();
    const [message, setMessage] = useState([]);

    return (
        <>
            <div className="container min-vh-100">
            <h3 class="text-bold"> <img src="/img/login.png" width="35px" height="35px"/>
                로그인</h3>
            <hr/>
		    <p class="text-sm text-gray">로그인을 하시면 보다 더 많은 정보와 서비스를 이용하실 수
			있습니다.</p>
            <div class="card-style mb-30">
                <form>
                    <div>
                    <div class="input-style-1">
						<label>이메일</label> <input ref={g_email} placeholder="이메일을 입력해주세요"/>
					</div>
                    <div class="input-style-1">
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
                                        cookies.set('g_email', {key: data.g_email}, {path: '/', expires: new Date(Date.now()+2592000)}); //30일
                                        cookies.set('g_name', {key: data.g_name}, {path: '/', expires: new Date(Date.now()+2592000)});
                                        cookies.set('g_level', {key: data.g_level}, {path: '/', expires: new Date(Date.now()+2592000)});
                                        // window.location.href='/';
                                        Swal.fire({
                                            title: '로그인 성공',
                                            showCancelButton: false,
                                            confirmButtonText: '확인',
                                        });
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
                            }} id="main-btn" className="btnLogin">로그인</button>
                            &nbsp;
                            
            </div>
            </form>
            </div>
            <div class="card-style d-flex align-items-center" style={{backgroundColor: '#E8E8E4', border: '1px solid #D5D5D5', height: '300px'}}>
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
            <Link to="window.open('/guest/join', '', 'width=430, height=500, channelmode=no' )" target=""><img src="/img/join.png" /><br/> 회원가입</Link>
            </div>
            </div>
            </div>
            </div>
        </>
    );
};

export default GuestLogin;

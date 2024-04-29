import React, {useRef, useState} from "react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import '../../asset/css/user.css';


function GuestLogin() {
    const [params, setParams]=useSearchParams();
        //  데이터 setter       
    const msg = params.get('msg');
    const navigate = useNavigate();
    const h_email = useRef();
    const h_passwd = useRef();
    const [message, setMessage] = useState([]);

    return (
        <>
            <div className="container min-vh-100">
            <h3 class="text-bold">
                <img src="/img/login.png" width="35px" height="35px"/>&nbsp;로그인</h3>
            <hr/>
		    <p class="text-sm text-gray">
                로그인을 하시면 보다 더 많은 정보와 서비스를 이용하실 수 있습니다.
            </p>
            <div class="card-style mb-30">
                <form>
                    <div>
                    <div class="input-style-1">
						<label>이메일</label> <input ref={h_email} placeholder="이메일을 입력해주세요"/>
					</div>
                    <div class="input-style-1">
						<label>비밀번호</label> <input type='password' ref={h_passwd} />
					</div>
                    <br/>
                        <button type='button' onClick={() => {
                            if(h_email.current.value == '') {
                                window.alert('이메일을 입력하세요.');
                                h_email.current.focus();
                                return;
                            }
                            if(h_passwd.current.value == '') {
                                window.alert('비밀번호를 입력하세요.');
                                h_passwd.current.focus();
                                return;
                            }

                            const form = new FormData();
                            form.append('h_email', h_email.current.value);
                            form.append('h_passwd', h_passwd.current.value);
                            fetch('http://localhost/host/login', {
                                method: 'post',
                                body: form
                            })
                            .then(response => response.json())
                            .then(data => {
                                setMessage(data);
                                if(data.message == 'success') {
                                    const cookies = new Cookies();
                                    cookies.set('h_idx', {key: data.h_idx}, {path: '/', expires: new Date(Date.now()+2592000)});
                                    cookies.set('h_email', {key: g_email.current.value}, {path: '/', expires: new Date(Date.now()+2592000)}); //30일
                                    cookies.set('h_name', {key: data.g_name}, {path: '/', expires: new Date(Date.now()+2592000)});
                                    cookies.set('h_status', {key: data.h_status}, {path: '/', expires: new Date(Date.now()+2592000)});
                                    window.location.href='/';
                                } else {
                                    navigate('/host/login?msg=error');
                                }
                            });
                        }} id="main-btn" className="btnLogin">로그인</button>
                            &nbsp;
                            {msg === 'login' ? <p style={{color: 'red'}}>로그인하신 후 사용 가능합니다.</p> : null}
                            {msg === 'error' ? <p style={{color: 'red'}}>아이디 또는 비밀번호가 일치하지 않습니다.</p> : null}
            </div>
            </form>
            </div>
            <div class="card-style d-flex align-items-center" style={{backgroundColor: '#E8E8E4', border: '1px solid #D5D5D5', height: '300px'}}>
            <div class="col text-center">
            <div class="btnLoginBottom">
            <img src="/img/id.png" /><br/> 이메일 찾기
            </div>
            </div>
            <div class="col text-center">
            <div class="btnLoginBottom">
            <img src="/img/forgot.png" /><br/> 비밀번호 찾기
            </div>
            </div>
            <div class="col text-center">
            <div class="btnLoginBottom">
            <img src="/img/join.png" /><br/> 회원가입
            </div>
            </div>
            </div>
            </div>
        </>
    );
};

export default GuestLogin;
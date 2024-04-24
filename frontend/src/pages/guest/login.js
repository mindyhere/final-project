import React, {useRef, useState} from "react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";

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
            <div>
            <h3 class="text-bold"> <img src="/img/login.png" width="35px" height="35px"/>
                로그인</h3>
            <table>
                <tbody>
                    <tr>
                        <td>이메일</td>
                        <td><input ref={g_email}/></td>
                    </tr>
                    <tr>
                        <td>비밀번호</td>
                        <td><input type='password' ref={g_passwd}/></td>
                    </tr>
                    <tr>
                        <td colSpan='2' align='center'>
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
                                fetch('http://localhost/guest/login', {
                                    method: 'post',
                                    body: form
                                })
                                .then(response => response.json())
                                .then(data => {
                                    setMessage(data);
                                    if(data.message == 'success') {
                                        const cookies = new Cookies();
                                        cookies.set('g_email', {key: g_email.current.value}, {path: '/', expires: new Date(Date.now()+2592000)}); //30일
                                        cookies.set('g_name', {key: data.g_name}, {path: '/', expires: new Date(Date.now()+2592000)});
                                        cookies.set('g_level', {key: data.g_level}, {path: '/', expires: new Date(Date.now()+2592000)});
                                        window.location.href='/';
                                    } else {
                                        navigate('/guest/login?msg=error');
                                    }
                                });
                            }} className="btn btn-primary">로그인</button>
                            &nbsp;
                            <button onClick={() => navigate('/guest/join')} className="btn btn-info">회원가입</button>
                            {msg === 'login' ? <p style={{color: 'red'}}>로그인하신 후 사용 가능합니다.</p> : null}
                            {msg === 'error' ? <p style={{color: 'red'}}>아이디 또는 비밀번호가 일치하지 않습니다.</p> : null}
                        </td>
                    </tr>
                </tbody>
            </table>
            </div>
        </>
    );
};

export default GuestLogin;

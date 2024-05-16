import React, { useRef, useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import '../admin/css/astyles.css';

function Alogin() {
    const [params, setParams] = useSearchParams();
    const msg = params.get('msg');
    const navigate = useNavigate();
    const a_id = useRef();
    const a_passwd = useRef();
    const [message, setMessage] = useState([]);

    useEffect(() => {
        const cookies = new Cookies();
        const a_id_cookie = cookies.get('a_id');
        const a_passwd_cookie = cookies.get('a_passwd');
        console.log("a_id_cookie:", a_id_cookie);
        console.log("a_passwd_cookie:", a_passwd_cookie);
        if (a_id_cookie && a_passwd_cookie) {
            console.log("Attempting automatic login...");
            const form = new FormData();
            form.append('a_id', a_id_cookie);
            form.append('a_passwd', a_passwd_cookie);
            fetch('http://localhost/admin/adlogin', {
                method: 'post',
                body: form
            })
            .then(response => response.json())
            .then(data => {
                console.log("Automatic login response:", data);
                setMessage(data);
                if (data.message === 'success') {
                    console.log("Automatic login successful. Redirecting...");
                    navigate('/admin/amain');
                } else {
                    console.log("Automatic login failed.");
                }
            })
            .catch(error => {
                console.error("Error during automatic login:", error);
            });
        }
    }, []);

    const handleLogin = () => {
        if (a_id.current.value === '') {
            window.alert('아이디를 입력하세요.');
            a_id.current.focus();
            return;
        }
        if (a_passwd.current.value === '') {
            window.alert('비밀번호를 입력하세요.');
            a_passwd.current.focus();
            return;
        }
        const form = new FormData();
        form.append('a_id', a_id.current.value);
        form.append('a_passwd', a_passwd.current.value);
        fetch('http://localhost/admin/adlogin', {
            method: 'post',
            body: form
        })
        .then(response => response.json())
        .then(data => {
            setMessage(data);
            if (data.message === 'success') {
                const cookies = new Cookies();
                cookies.set('a_id', { key: data.a_id }, { path: '/', expires: new Date(Date.now() + 2592000) }); // 30 days
                cookies.set('a_passwd', { key: data.a_passwd }, { path: '/', expires: new Date(Date.now() + 2592000) });
                window.alert('관리자님 환영합니다 :)');
                navigate('/admin/amain');
            } else {
                navigate('/admin/alogin?msg=error');
            }
        });
    };

    return (
        <>
            <div className="main1" align='center'>
                <div className="organize-form form-area-signin">
                    <h2 align="center">관리자 로그인</h2>
                    <br />
                    <div className="form-field1">
                        <input className='input' type="text" name="a_id" id="a_id" ref={a_id} placeholder="id" align='center' />
                    </div>
                    <br />
                    <div className="form-field1">
                        <input className='input' type="password" name="a_passwd" id="a_passwd" placeholder="password" ref={a_passwd} />
                    </div>
                    <br />
                    <div colSpan='2' align='center'>
                        <button type="submit" onClick={handleLogin} className="btn-sign1">Sign In</button>
                        {msg === 'error' ? <p style={{ color: 'red' }}>로그인 정보가 일치하지 않습니다.</p> : null}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Alogin;
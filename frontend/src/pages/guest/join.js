import React, {useRef, useState} from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import '../../asset/css/user.css'
import './aa.css';

function Join() {
    const g_email = useRef();
    const g_passwd = useRef();
    const [message, setMessage] = useState([]);
    const navigate = useNavigate();


    return(
        <>
        <div className="container min-vh-100" style={{paddingTop: "15px"}}>
        <h3 class="text-bold"> <img src="/img/join.png" width="35px" height="35px"/>
        회원가입</h3>
        <hr/>
        <div class="card-style mb-30">
        <form>
        <h4>이메일</h4>
        <br/>
        <div class="input-style-a">
			<div class="aa" style={{marginLeft:"20px"}}><input ref={g_email} placeholder="이메일을 입력해주세요"/></div>
            <div class="blank"></div>
            <div class="aa"><button type="button" class="check-btn" onClick={() => {}}>중복 체크</button></div>
        </div>
        <div class="ii"><h4>비밀번호</h4></div>
        <br/>
        <div class="input-style-b">
			<input type='password' ref={g_passwd} />
        </div>
        <br/>
        <br/>
        <div style={{textAlign: 'center'}}>
            <button type="button" onClick={() => {
                if(g_email.current.value == '') {
                    Swal.fire({
                        icon : 'warning',
                        text : '이메일을 입력하세요.',
                    });
                    g_email.current.focus();
                    return;
                }
                if(g_passwd.current.value == '') {
                    Swal.fire({
                        icon : 'warning',
                        text : '비밀번호를 입력하세요.',
                    });
                    g_passwd.current.focus();
                    return;
                }
                const form = new FormData();
                form.append('g_email', g_email.current.value);
                form.append('g_passwd', g_passwd.current.value);
                fetch('http://localhost/guest/join', {
                    method: 'post',
                    body: form
                })
                .then(response => response.json())
                .then(data => {
                    setMessage(data);
                    if(data.result == 'success') {
                        Swal.fire({
                            title: '회원가입 완료',
                            showCancelButton: false,
                            confirmButtonText: '확인',
                        }).then((result) => {
                            if(result.isConfirmed) {
                                navigate("/guest/login");
                            }
                        });
                    } else {
                        Swal.fire({
                            title: '회원가입 실패',
                            text: "관리자에게 문의 바랍니다",
                            showCancelButton: false,
                            confirmButtonText: '확인',
                        });
                    }
                });
            }} class="main-btn">회원가입</button>
        </div>
        </form>
        </div>
        </div>
        </>
    )
}

export default Join;
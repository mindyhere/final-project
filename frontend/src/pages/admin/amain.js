import React, { useRef, useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { HouseFill, JustifyLeft, PersonWorkspace, PersonCircle, PersonVcard, PersonFill, HouseGear, HouseCheck, Houses, HouseDoor } from "react-bootstrap-icons";
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router";
import '../admin/css/astyles.css';


function Amain() {
    const [params, setParams] = useSearchParams();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showLoginModal, setLoginModal] = useState(false);
    const navigate = useNavigate();
    const a_id = useRef();
    const a_passwd = useRef();
    const msg = params.get('msg');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const cookies = new Cookies();
        const a_id_cookie = cookies.get('a_id');
        const a_passwd_cookie = cookies.get('a_passwd');
        if (a_id_cookie && a_passwd_cookie) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogout = () => {
        if (window.confirm('로그아웃하시겠습니까?')) {
            const cookies = new Cookies();
            cookies.remove('a_id', { path: '/' });
            cookies.remove('a_passwd', { path: '/' });
            setIsLoggedIn(false);
            navigate('/admin/amain');
        }
    };

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
                setMessage(data.message);
                if (data.message === 'success') {
                    const cookies = new Cookies();
                    cookies.set('a_id', data.a_id, { path: '/', expires: new Date(Date.now() + 2592000) });
                    cookies.set('a_passwd', data.a_passwd, { path: '/', expires: new Date(Date.now() + 2592000) });
                    setIsLoggedIn(true);
                    window.alert('관리자님 환영합니다 :)');
                    setLoginModal(false);
                    navigate('/admin/amain');

                } else {
                    navigate('/admin/amain?msg=error');
                }
            });
    };

    const AdminClick = (event, page) => {
        event.preventDefault();
        if (!isLoggedIn) {
            window.alert('관리자 권한이 필요한 서비스입니다.');
            navigate('/admin/amain');
        } else {
            navigate(page);
        }
    };

    return (
        <>
            <nav className="navbar bg-body-tertiary fixed-top">
                <a className="navbar-brand">
                    <PersonWorkspace width="50" height="50" />&nbsp; 관리자 페이지
                </a>
                {isLoggedIn ? <button onClick={handleLogout} className="btn">로그아웃</button> : <button onClick={() => setLoginModal(true)} className="btn">로그인</button>}
            </nav>
            <br /><br />
            {/* Login Modal */}
            {showLoginModal && (
                <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content" style={{ width: "100%", height: "50%", content: "center " }}><br />
                            <div className="modal-header">
                                <h5 className="modal-title">관리자 로그인</h5>
                                <button type="button" className="btn-close" aria-label="Close" onClick={() => setLoginModal(false)}></button>
                            </div>
                            <div className="modal-body"><br />
                                <div className="form-field1">
                                    <input className='input' type="text" name="a_id" id="a_id" ref={a_id} placeholder="id" align='center' />
                                </div>
                                <br />
                                <div className="form-field1">
                                    <input className='input' type="password" name="a_passwd" id="a_passwd" placeholder="password" ref={a_passwd} />
                                </div> <br />
                                <div class="form-check form-switch">
                                    <label>
                                        <input class="form-check-input" type="checkbox" role="switch" id="Checked" />자동로그인
                                    </label>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn-sign1" onClick={handleLogin}>로그인</button>
                                {msg === 'error' ? <p style={{ color: 'red' }}>로그인 정보가 일치하지 않습니다.</p> : null}

                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className="row">
                <div className="col-4">
                    <nav id="navbar-example3" className="h-100 flex-column align-items-stretch pe-4 border-end">
                        <nav className="nav nav-pills flex-column">
                            <a className="nav-link" href="#item-1" /><br />
                            <a className="nav-link ms-3 my-1" href="./amain">
                                <HouseDoor width="30" height="30" />&nbsp; home
                            </a>                        
                            <NavDropdown title={<>&nbsp;&nbsp;<PersonFill width="30" height="30" />&nbsp;회원정보관리</>}>
                                <NavDropdown.Item className="btn" href="./aguest" onClick={(e) => AdminClick(e, '/admin/aguest')}><PersonCircle width="30" height="30" />&nbsp; 이용자 정보관리</NavDropdown.Item>
                                <NavDropdown.Item  className="btn" href="./ahost" onClick={(e) => AdminClick(e, '/admin/ahost')}><PersonVcard width="30" height="30" />&nbsp; 사업자 정보관리</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title={<>&nbsp;&nbsp;<HouseGear width="30" height="30" />&nbsp; 숙박 운영관리</>}>
                                <NavDropdown.Item className="btn" href="./" onClick={(e) => AdminClick(e, '/admin/amain')}><Houses width="30" height="30" />&nbsp; 숙박 리스트</NavDropdown.Item>
                                <NavDropdown.Item  className="btn" href="./" onClick={(e) => AdminClick(e, '/admin/amain')}><HouseCheck width="30" height="30" />&nbsp; 숙박 등록 승인</NavDropdown.Item>
                            </NavDropdown>                           
                            <a className="nav-link ms-3 my-1" href="./notice/alist" onClick={(e) => AdminClick(e, '/admin/notice/alist')}>
                                <JustifyLeft width="30" height="30" />&nbsp; 공지사항
                            </a>
                        </nav>
                    </nav>
                </div>
                {/* 메인 구성 */}
                <div className="col-xl-4 col-lg-5">
                    <br /><br />
                    <div className="card shadow mb-4">
                        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                            <h6 className="m-0 font-weight-bold text-primary">캘린더</h6>
                        </div>
                        <div className="card-body">
                            {/* <FullCalendar
                                plugins={[dayGridPlugin]}
                                initialView="dayGridMonth"
                            /> */}
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-5">
                        <div className="card shadow mb-4">
                            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                <h6 className="m-0 font-weight-bold text-primary">지도</h6>
                            </div>
                            <div className="card-body">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Amain;
import React, { useRef, useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { HouseFill, JustifyLeft, PersonWorkspace, PersonCircle, PersonVcard, PersonFill, HouseGear, HouseCheck, Houses, HouseDoor } from "react-bootstrap-icons";
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router";


function Amain() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
   

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
            setIsLoggedIn(true);
            navigate('/admin/amain');
        }
    };
    const handlelogin = () => {
        if (window.confirm('로그인 페이지로 이동하시겠습니까?')) {
            setIsLoggedIn(false);
            navigate('/admin/alogin');
        }
    };

    const AdminClick = (event, page) => {
        event.preventDefault();
        if (isLoggedIn) {
            window.alert('관리자 권한이 필요한 서비스입니다.');
            navigate('/admin/amain');
        } else {
            navigate(page);
        }
    };

    const Adminout = (event, page) => {
        event.preventDefault();
        if (isLoggedIn) {
            window.alert('메인 화면으로 이동하시겠습니까?');
            navigate('/');
        } else if (!isLoggedIn){
            window.alert('관리자 계정으로 로그인 중입니다.');
            return;
        }
    };

    return (
        <>
            <nav className="navbar bg-body-tertiary fixed-top">
                <a className="navbar-brand">
                    <PersonWorkspace width="50" height="50" />&nbsp; 관리자 페이지
                </a>
                {!isLoggedIn? <button onClick={handleLogout} className="btn">로그아웃</button> : <button onClick={handlelogin} className="btn">로그인</button>} 
            </nav>
            <br /><br />
            <div className="row">
                <div className="col-4">
                    <nav id="navbar-example3" className="h-100 flex-column align-items-stretch pe-4 border-end">
                        <nav className="nav nav-pills flex-column">
                            <a className="nav-link" href="#item-1" /><br />
                            <a className="nav-link ms-3 my-1" onClick={(e) => !Adminout(e, '/')}>
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
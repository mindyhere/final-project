import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { PersonWorkspace, PersonFill, PersonCircle, PersonVcard, HouseGear, HouseCheck, Houses, HouseDoor, JustifyLeft } from "react-bootstrap-icons";
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate, useLocation } from "react-router-dom";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

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

    const handleLogin = () => {
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



    const locationNow = useLocation()
    if (locationNow.pathname === "/admin/alogin") return null; 

    return (
        <>
        <div className="p-3 mb-3 border-bottom">
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none">
                        <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap">
                        </svg>
                    </a>

                    <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                        <li><a href="/admin/amain" className="nav-link px-2 link-secondary"> <HouseDoor size={30} />&nbsp;HOME</a></li>
                        <li className="nav-item">
                            <NavDropdown title={<>&nbsp;&nbsp;<PersonFill size={30} />&nbsp; 회원정보관리</>}>
                                <NavDropdown.Item href="./aguest" onClick={(e) => AdminClick(e, '/admin/aguest')}><PersonCircle size={30} />&nbsp; 이용자 정보관리</NavDropdown.Item>
                                <NavDropdown.Item href="./ahost" onClick={(e) => AdminClick(e, '/admin/ahost')}><PersonVcard size={30} />&nbsp; 사업자 정보관리</NavDropdown.Item>
                            </NavDropdown>
                        </li>
                        <li className="nav-item">
                            <NavDropdown title={<>&nbsp;&nbsp;<HouseGear size={30} />&nbsp; 숙박 운영관리</>}>
                                <NavDropdown.Item href="./" onClick={(e) => AdminClick(e, '/admin/amain')}><Houses size={30} />&nbsp; 숙박 리스트</NavDropdown.Item>
                                <NavDropdown.Item href="./" onClick={(e) => AdminClick(e, '/admin/amain')}><HouseCheck size={30} />&nbsp; 숙박 등록 승인</NavDropdown.Item>
                            </NavDropdown>
                        </li>
                        <li><a  href="./notice/alist" onClick={(e) => AdminClick(e, '/admin/notice/alist')} className="nav-link px-2 link-body-emphasis"> <JustifyLeft size={30} /> &nbsp;게시판</a></li>
                    </ul>

                    <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
                        <input type="search" className="form-control" placeholder="Search..." aria-label="Search"/>
                    </form>

                    <div className="dropdown text-end">
                        <a href="#" className="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src="/img/whitedog.jpg" width="40" height="40" className="rounded-circle"/>
                        </a>
                        <ul className="dropdown-menu text-small">
                            {!isLoggedIn ? (
                                <button onClick={handleLogout} className="dropdown-item" type="button"><p>* 관리자님 환영합니다 *</p> <hr/>Sign out</button>
                              
                            ) : (
                                <button onClick={handleLogin} className="dropdown-item" type="button">Sign in</button>
                            )}
                            <hr className="dropdown-divider"/>
                            <li><a className="dropdown-item" onClick={(e) => !Adminout(e, '/')}>사이트맵</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default Amain;
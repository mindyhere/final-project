import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
//import Cookies from 'universal-cookie';

function Header() {
  const navigate = useNavigate();
  //const cookies = new Cookies();

  //게스트 쿠키
  //const g_name = cookies.get('g_name');
  //const g_email = cookies.get('g_email'); //쿠키변수명
  // const removeCookie = (g_name) => { //함수명 (매개)
  //   const cookies = new Cookies();
  //   cookies.set(g_name, '', { path: '/', expires: (new Date(Date.now())) });
  //   //          변수명      쿠키저장     유효시간
  // }
  //호스트 쿠키
  // const h_email = cookies.get('h_email');
  // const h_name = cookies.get('h_name');
  // const removeCookie = (h_name) => {
  //   const cookies = new Cookies();
  //   cookies.set(h_name, '', { path: '/', expires: (new Date(Date.now())) });
  // }

  //if(g_email == null || g_email == 'undefined' || h_email == null || h_email == 'undefined') {
    return (
      <nav className='navbar navbar-expand-lg'>
      <div className='container-fluid'>
        <a className="navbar-brand" href="/">
          <img src="/img/airbnb.png" href="/" width="170px" height="62px" style={{padding: "0.5rem"}}></img></a>
        
            {/*로그인 전 상단*/}
            <div align="right">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item rounded" style={{display: 'inline-block'}}><a className="nav-link active" href="#">로그인</a></li>
                <li className="nav-item rounded" style={{display: 'inline-block'}}><a className="nav-link active" href="#">회원가입</a></li>
                <li className="nav-item rounded" style={{display: 'inline-block'}}><a className="nav-link active" onClick={() => navigate('/guest/Account')}>도움말센터</a></li>
              </ul>
            </div>
      </div>
    </nav>
    );
  //} else if(g_email != null || g_email != 'undefined') { //게스트 로그인시
    return (
      <nav className='navbar navbar-expand-lg'>
      <div className='container-fluid'>
        <a className="navbar-brand" href="/">
          <img src="/img/airbnb.png" href="/" width="170px" height="70px" style={{padding: "0.5rem"}}></img></a>
        
              {/*게스트로그인 후 상단
              <div align="right">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li  className="nav-item"><a className="nav-link active" href="#">여행</a></li>
                <li  className="nav-item"><a className="nav-link active" href="#">위시리스트</a></li>
                <li  className="nav-item"><a className="nav-link active" href="#">계정</a></li>
                <li  className="nav-item"><a className="nav-link active" href="#">도움말센터</a></li>
                <li  className="nav-item"><a className="nav-link active"
                onClick={() =>
                  Swal.fire({
                    title: "",
                    html: `게스트 로그아웃 하시겠습니까?`,
                    showCancelButton: true,
                    cancelButtonText: "cancel",
                    confirmButtonText: "OK"
                 }).then((result) => {
                    if (result.isConfirmed) {
                      removeCookie('g_name');
                      removeCookie('g_email');
                      removeCookie('g_level');
                      window.location.href='/';
                      //location.href='/';
                    }else if (result.isDenied) {
                      location.reload();
                    }
                 })
                }>로그아웃</a></li>
              </ul>
            </div>
              */}
      </div>
    </nav>
    );
  //} else if(h_email != null || h_email != 'undefined') { //호스트 로그인시
    return (
      <nav className='navbar navbar-expand-lg'>
      <div className='container-fluid'>
        <a className="navbar-brand" href="/">
          <img src="/img/airbnb.png" href="/" width="170px" height="70px" style={{padding: "0.5rem"}}></img></a>
        
              {/*호스트로그인 후 상단
              <div align="right">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li  className="nav-item"><a className="nav-link active" href="#">계정</a></li>
                <li  className="nav-item"><a className="nav-link active" href="#">호텔</a></li>
                <li  className="nav-item"><a className="nav-link active" href="#">주문</a></li>
                <li  className="nav-item"><a className="nav-link active"
                onClick={() =>
                  Swal.fire({
                    title: "",
                    html: `호스트 로그아웃 하시겠습니까?`,
                    showCancelButton: true,
                    cancelButtonText: "cancel",
                    confirmButtonText: "OK"
                 }).then((result) => {
                    if (result.isConfirmed) {
                      removeCookie('h_name');
                      removeCookie('h_email');
                      removeCookie('h_level');
                      window.location.href='/';
                      //location.href='/';
                    }else if (result.isDenied) {
                      location.reload();
                    }
                 })
                }>로그아웃</a></li>
              </ul>
            </div>
              */}
      </div>
    </nav>
    );
  //}
}

export default Header;

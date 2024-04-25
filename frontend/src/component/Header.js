import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function Header() {
  return (
    <nav className='navbar navbar-expand-lg'>
    <div className='container-fluid'>
      <a className="navbar-brand" href="/">
        <img src="/img/airbnb.png" href="/" width="165px" height="60px" style={{padding: "0.5rem"}}></img></a>
       
       {/*로그인 전 상단*/}
       <div align="right">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li  className="nav-item rounded"><a className="nav-link active" href="#">로그인</a></li>
          <li  className="nav-item rounded"><a className="nav-link active" href="#">회원가입</a></li>
          <li  className="nav-item rounded"><a className="nav-link active" href="#">도움말센터</a></li>
        </ul>
      </div>

        {/*게스트로그인 후 상단
        <div align="right">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li  className="nav-item"><a className="nav-link active" href="#">여행</a></li>
          <li  className="nav-item"><a className="nav-link active" href="#">위시리스트</a></li>
          <li  className="nav-item"><a className="nav-link active" href="#">계정</a></li>
          <li  className="nav-item"><a className="nav-link active" href="#">도움말센터</a></li>
          <li  className="nav-item"><a className="nav-link active" href="#">로그아웃</a></li>
        </ul>
       </div>
        */}
        {/*호스트로그인 후 상단
        <div align="right">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li  className="nav-item"><a className="nav-link active" href="#">계정</a></li>
          <li  className="nav-item"><a className="nav-link active" href="#">호텔</a></li>
          <li  className="nav-item"><a className="nav-link active" href="#">주문</a></li>
        </ul>
       </div>
        */}

    </div>
  </nav>
  );
}

export default Header;

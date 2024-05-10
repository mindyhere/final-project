import React, { useRef, useState, useEffect } from "react";
import Cookies from "universal-cookie";
import {HouseFill,JustifyLeft,PersonWorkspace,PersonCircle, PersonVcard } from "react-bootstrap-icons";
import { useNavigate } from "react-router";

function Amain(){
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const a_id = useRef();
    const a_passwd = useRef();

    useEffect(() => {   
        const cookies = new Cookies();
        const adminId = cookies.get('a_id');
        const adminPassword = cookies.get('a_passwd');
        
        if (adminId && adminPassword ) {
            setIsLoggedIn(true);
        } 
    }, []);

    const handleLogout = () => {
        const cookies = new Cookies();
        cookies.remove('a_id', { path: '/' });
        cookies.remove('a_passwd', { path: '/' });
        setIsLoggedIn(false);
        navigate('/admin/amain');
     };

    const handleLogin = () => {
        const cookies = new Cookies();
        cookies.set('a_id', a_id, { path: '/', expires: new Date(Date.now() + 2592000) });
        cookies.set('a_passwd', a_passwd, { path: '/', expires: new Date(Date.now() + 2592000) });
        setIsLoggedIn(true);
        navigate('/admin/alogin');
    };

return(
    <>
<nav class="navbar bg-body-tertiary fixed-top">    
  <a class="navbar-brand">
    <PersonWorkspace width="50" height="50"/> 관리자 페이지</a>
    {isLoggedIn ? <button onClick={handleLogout}>로그아웃</button> : <button onClick={handleLogin}>로그인</button>} </nav>

<div class="row">
<div class="col-4">
    <nav id="navbar-example3" class="h-100 flex-column align-items-stretch pe-4 border-end">
    <nav class="nav nav-pills flex-column">
    <a class="nav-link" href="#item-1"/><br/>
    <a class="nav-link ms-3 my-1" href="./amain">
    <HouseFill width="30" height="30"/>&nbsp; home</a>
        
    <a class="nav-link ms-3 my-1" href="./aguest"  >
    <person  width="30" height="30"/>
    <PersonCircle width="30" height="30" />&nbsp; 회원관리</a>

    <a class="nav-link ms-3 my-1" href="./ahost"  >
    <PersonVcard width="30" height="30"/>&nbsp; 사업자관리</a>

    <a class="nav-link ms-3 my-1"  href="./notice/alist" > 
    <JustifyLeft width="30" height="30"/>&nbsp; 공지사항</a>
    </nav>
    </nav>
 </div>
 {/* 메인 구성 */}
 <div class="col-xl-4 col-lg-5">
    <div class="card shadow mb-4">                           
    <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
    <h6 class="m-0 font-weight-bold text-primary">캘린더</h6>                           
    </div>                                               
    <div class="card-body">
    <div class="chart-pie pt-5 pb-3">
    <canvas id="myPieChart"></canvas></div>
    <div class="mt-4 text-center small">
    <span class="mr-2">
     <i class="fas fa-circle text-primary"></i> 1 </span>
     <span class="mr-2">
     <i class="fas fa-circle text-success"></i> 2 </span>
     <span class="mr-2">
     <i class="fas fa-circle text-info"></i> 3 </span>
      </div>
      </div>
      </div>            
<div class="col-xl-4 col-lg-5">                  
     <div class="card shadow mb-4">
     <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
          <h6 class="m-0 font-weight-bold text-primary">공지사항</h6></div>
           <div class="card-body">                               
              <p>*필독사항*</p>
              </div>
           </div>                  
      </div>
   </div>
</div>
</>
)  
}
export default Amain;
import React, { useRef, useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router";

function Amain() {
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
  <a class="navbar-brand"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
<path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/><path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
</svg>관리자 페이지</a>{isLoggedIn ? <button onClick={handleLogout}>로그아웃</button> : <button onClick={handleLogin}>로그인</button>} </nav>

<div class="row">
<div class="col-4">
    <nav id="navbar-example3" class="h-100 flex-column align-items-stretch pe-4 border-end">
    <nav class="nav nav-pills flex-column">
    <a class="nav-link" href="#item-1"/><br/>
    <a class="nav-link ms-3 my-1" href="./amain"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-house-fill" viewBox="0 0 16 16">
    <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293z"/>
    <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293z"/>
    </svg>home</a>
        
    <a class="nav-link ms-3 my-1" href="./amain"  >
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-person-rolodex" viewBox="0 0 16 16">
    <path d="M8 9.05a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
    <path d="M1 1a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h.5a.5.5 0 0 0 .5-.5.5.5 0 0 1 1 0 .5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5.5.5 0 0 1 1 0 .5.5 0 0 0 .5.5h.5a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H6.707L6 1.293A1 1 0 0 0 5.293 1zm0 1h4.293L6 2.707A1 1 0 0 0 6.707 3H15v10h-.085a1.5 1.5 0 0 0-2.4-.63C11.885 11.223 10.554 10 8 10c-2.555 0-3.886 1.224-4.514 2.37a1.5 1.5 0 0 0-2.4.63H1z"/>
    </svg>회원관리</a>

    <a class="nav-link ms-3 my-1" href="./amain"  >
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-person-vcard" viewBox="0 0 16 16">
    <path d="M5 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4m4-2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5M9 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4A.5.5 0 0 1 9 8m1 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5"/>
    <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zM1 4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H8.96q.04-.245.04-.5C9 10.567 7.21 9 5 9c-2.086 0-3.8 1.398-3.984 3.181A1 1 0 0 1 1 12z"/>
    </svg>사업자관리</a>

    <a class="nav-link ms-3 my-1"  href="./notice/alist" > 
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-card-checklist" viewBox="0 0 16 16">
    <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z"/>
    <path d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0M7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0"/>
    </svg>공지사항</a>
    </nav>
    </nav>
 </div>
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
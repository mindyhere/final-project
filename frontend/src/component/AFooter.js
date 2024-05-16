import React from 'react';
import { useNavigate, useLocation } from "react-router-dom";
function AFooter() {

    const locationNow = useLocation()
    if (locationNow.pathname === "/admin/alogin") return null; 

    return (
    <>
        <div className="container">
        <afooter className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <a href="#" className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1">
            <img src="/img/sybnb.png" alt="Logo" width="100" height="25" /><svg className="bi me-2" width="40" height="32"></svg>
            </a>
            <ul className="nav col-md-4 justify-content-end">
            <li className="nav-item"><a href="#" class="nav-link px-2 text-body-secondary"> 이메일: admin@gmail.com</a></li>
            </ul>
        </afooter>
        </div>
        </>
    );
}

export default AFooter;
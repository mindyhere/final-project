import React, {useRef,useEffect,useState} from 'react';
import {useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function PayItem({G_idx,D_img1,O_state,O_orderdate,O_payment,O_ckin,O_ckout,O_finalprice}) {
    const url = `http://localhost/static/images/host/hotel/${D_img1}`;
    const navigate = useNavigate();

    let img ='';
    if (D_img1 !== null) {
        img = `<img src=${url} width='70px' height='70px' /><br />`;
    }
    if (O_state === 1) {
        O_state = "예약대기";
    } else if (O_state === 2) {
        O_state = "예약취소";
    } else if (O_state == 3) {
        O_state = "예약확정";
    }
    if (O_payment === 1) {
        O_payment = "Card";
    } else if (O_payment === 2) {
        O_payment = "KakaoPay";
    } else if (O_payment === 3) {
        O_payment = "Point";
    }
    return (
        <div className='container'>
            <div className='row row-cols-2'>
                <div className="col-2"><span dangerouslySetInnerHTML={{__html: img}}></span></div>
                <div className="col-5">
                <h5>{O_state}&nbsp;·&nbsp;{O_orderdate}</h5>
                       <div style={{color: "#262626"}}>{O_payment}</div>
                       <div>{O_ckin}&nbsp;-&nbsp;{O_ckout}</div>
                </div>
                <div className="col-2"><div>₩{O_finalprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</div></div>
            </div>
        </div>
        // <div style={{ margin: '3px'}}>
        //        <div><span dangerouslySetInnerHTML={{__html: img}}></span></div>
        //             {O_state}&nbsp;·&nbsp;{O_orderdate}
        //                <div style={{color: "#262626"}}>{O_payment}</div>
        //                <div>{O_ckin}&nbsp;-&nbsp;{O_ckout}</div>
        //                <div>₩{O_finalprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</div>
        //         <br />
        //         &nbsp;
        // </div>
        
        // <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        //         <li  className="nav-item"><a className="nav-link active" href="#">프로필</a></li>
        //         <li  className="nav-item"><a className="nav-link active" href="#">여행</a></li>
        //         <li  className="nav-item"><a className="nav-link active" href="#">위시리스트</a></li>
        //         <li  className="nav-item"><a className="nav-link active" href="#">계정</a></li>
        //         <li  className="nav-item"><a className="nav-link active" href="#">도움말센터</a></li>
        //         <li  className="nav-item"><a className="nav-link active">로그아웃</a></li>
        // </ul>
    )
}
export default PayItem;
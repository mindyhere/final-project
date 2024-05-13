import React from "react";
import {useLocation } from "react-router-dom";

function Footer() {
    // 팝업창에서 푸터 제거
    const locationNow = useLocation()
    if (locationNow.pathname === "/guest/write") return null; 
    if (locationNow.pathname === "/host/account/manage/review" || locationNow.pathname === "/host/account/manage/reply") return null;

    return (
        <div className="Footer">
            <br/>
            <div align="center" height="20px">
                <a>© 2024 Airbnb, Inc.</a>&nbsp;&nbsp;
                <a href='#' style={{textDecoration: "none", color: "#262626"}}>개인정보처리방침</a>&nbsp;·&nbsp;
                <a href='#' style={{textDecoration: "none", color: "#262626"}}>이용약관</a>&nbsp;·&nbsp;
                <a href='#' style={{textDecoration: "none", color: "#262626"}}>사이트맵</a>&nbsp;·&nbsp;
                <a href='#' style={{textDecoration: "none", color: "#262626"}}>한국의 변경된 환불 정책</a>&nbsp;·&nbsp;
                <a href='#' style={{textDecoration: "none", color: "#262626"}}>회사 세부정보</a>&nbsp;·&nbsp;
                <a href='/admin/amain' style={{textDecoration: "none", color: "#262626"}}>관리시스템</a> 
                </div>
           
            <div align="center" style={{fontSize: "10px",color: "grey"}}>
                웹사이트 제공자: Airbnb Ireland UC, private unlimited company, 8 Hanover Quay Dublin 2, D02 DP23 Ireland | 이사: Dermot Clarke, Killian Pattwell, Andrea Finnegan | VAT 번호: IE9827384L | 사업자 등록 번호: IE 511825 | 연락처: terms@airbnb.com, 웹사이트, 080-822-0230 | 호스팅 서비스 제공업체: 아마존 웹서비스 | 에어비앤비는 통신판매 중개자로 에어비앤비 플랫폼을 통하여 게스트와 호스트 사이에 이루어지는 통신판매의 당사자가 아닙니다. 에어비앤비 플랫폼을 통하여 예약된 숙소, 체험, 호스트 서비스에 관한 의무와 책임은 해당 서비스를 제공하는 호스트에게 있습니다.
            </div>
        </div>
    )
}

export default Footer;
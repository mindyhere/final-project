import React from 'react';
import { useNavigate } from "react-router-dom";

function Kakaopay() {
    const navigate = useNavigate();
    return (
        <>
                 {/* <button id="check_module">결제하기</button> */}
                 <img id='check_module' type='button' src='/img/kakaopay.png' onClick={()=>{
                     fetch('http://localhost/kakaoPay',{
                         method:'post',
                         //encType:'multipart/form-data',
                         //body:form
                     }).then(()=>{
                        navigate('/');
                     });
                 }}></img>
        </>
    )
}
export default Kakaopay;
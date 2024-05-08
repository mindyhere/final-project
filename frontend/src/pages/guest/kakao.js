import React, { useEffect} from 'react';
import {useNavigate} from "react-router-dom";

//포트원 연동 카카오페이 결제
const Payment = (effect, deps) => {
    const navigate = useNavigate();
    useEffect(() => {
        const jquery = document.createElement("script");
        jquery.src = "https://code.jquery.com/jquery-1.12.4.min.js";
        const iamport = document.createElement("script");
        iamport.src = "https://cdn.iamport.kr/js/iamport.payment-1.1.7.js";
        document.head.appendChild(jquery);
        document.head.appendChild(iamport);
        return () => {
            document.head.removeChild(jquery);
            document.head.removeChild(iamport);
        }
    }, []);

    const onClickPayment = () => {
        const { IMP } = window; // IMP 객체 가져오기
        IMP.init('imp40362238');
        const data = {
            pg: 'kakaopay',
            pay_method: 'card',
            merchant_uid: 'merchant_' + new Date().getTime(),
            name: '아메리카노',
            amount: '2000',
            buyer_name: '이름',
            buyer_tel: '010-1234-1234',
            buyer_postcode: '123-456',
        };
        IMP.request_pay(data, callbacks);
    }

    

    const callbacks = (response) => {
        const {success, error_msg, imp_uid, merchant_uid, pay_method, paid_amount, status} = response;
        if (success) {
            alert('결제성공');
            window.location.href='/guest/Pay';
        } else {
            alert('결제실패');
        }
        //버튼 클릭 시 handleClick 함수 실행
        document.getElementById('check_module').addEventListener('click', onClickPayment);

        // 컴포넌트 언마운트 시 이벤트 리스너 제거
        return () => {
            document.getElementById('check_module').removeEventListener('click', onClickPayment);
        };
    }

    

    return (
        <button onClick={onClickPayment}>결제하기</button>
        // <img id='check_module' type='button' src='/img/kakaopay.png' onClick={()=>{
        //     fetch('http://localhost/kakaoPay',{
        //         method:'post',
        //         //encType:'multipart/form-data',
        //         //body:form
        //     }).then(()=>{
        //         navigate('/');
        //     });
        // }}></img>
    )
}

// function Kakao() {
//     const navigate = useNavigate();
//     const PaymentComponent = () => {

//         useEffect(() => {
//             const { IMP } = window; // IMP 객체 가져오기
//             if (!IMP) return; // IMP 객체가 없으면 종료

//             IMP.init('imp40362238');

//             const handleClick = () => {
//                 // 결제 요청
//                 IMP.request_pay({
//                     pg: 'kakao',
//                     pay_method: 'card',
//                     merchant_uid: 'merchant_' + new Date().getTime(),
//                     name: '주문명 : 아메리카노',
//                     amount: 2000,
//                     buyer_name: '이름',
//                     buyer_postcode: '123-456',
//                 }, (rsp) => {
//                     if (rsp.success) {
//                         const msg = '결제가 완료되었습니다. 결제 금액 : ' + rsp.paid_amount;
//                         // 결제 성공 처리
//                         console.log(msg);
//                     } else {
//                         const msg = '결제에 실패하였습니다. 에러내용 : ' + rsp.error_msg;
//                         // 결제 실패 처리
//                         console.log(msg);
//                     }
//                     //alert(msg);
//                 });
//             };

//             // 버튼 클릭 시 handleClick 함수 실행
//             document.getElementById('check_module').addEventListener('click', handleClick);

//             // 컴포넌트 언마운트 시 이벤트 리스너 제거
//             return () => {
//                 document.getElementById('check_module').removeEventListener('click', handleClick);
//             };
//         }, []);

//     };
//     return (
//         //<button id="check_module">결제하기</button>
//         <img id='check_module' type='button' src='/img/kakaopay.png' onClick={()=>{
//             fetch('http://localhost/kakaoPay',{
//                 method:'post',
//                 //encType:'multipart/form-data',
//                 //body:form
//             }).then(()=>{
//                 navigate('/');
//             });
//         }}></img>
//     );
// }
export default Payment;
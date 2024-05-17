import React, {useEffect} from 'react';

//아임포트 나이스페이연동
const Nicepay = () => {
    console.clear();

    useEffect(() => {
        const jquery = document.createElement("script");
        jquery.src = "https://code.jquery.com/jquery-1.12.4.min.js";
        const iamport = document.createElement("script");
        iamport.src="https://cdn.iamport.kr/js/iamport.payment-1.1.7.js";
        document.head.appendChild(jquery);
        document.head.appendChild(iamport);
        return () => {
            document.head.removeChild(jquery);
            document.head.removeChild(iamport);
        }
    }, []);

    const serverAuth = () => {
        const { IMP } = window;
        IMP.init('imp40362238');

        IMP.request_pay(
            {
            pg: 'nice', //pg사
            merchant_uid: 'merchant_' + new Date().getTime(), // 주문 고유 번호
            pay_method: 'card',
            name: 'hotelA',
            amount: 100,
            buyer_name: '예약자',
            buyer_email: '예약자이메일',
            buyer_tel: '예약자전화번호',
            buyer_postcode: '123-456',
            //returnUrl: 'http://localhost:3000/', //리턴될 URL
            },
            function (rsp) {
                console.log(rsp);

                if(rsp.success) {
                    console.log(rsp.imp_uid);
                    //결제검증후 DB업데이트
                    alert("결제성공");
                    fetch('http://localhost/confirmpay/',
                        {
                            method:'post',
                            data: rsp.imp_uid,
                    //         // body:JSON.stringify({
                    //         //     'imp_uid': imp_uid,
                    //         //     'merchant_uid': merchant_uid
                    //         // })
                        }).then(() => {
                            //window.location.href='/guest/reservation'; 
                            //금액비교
                            //if (paid_amount === data.response.amount) {
                                //             alert('결제 및 결제검증완료');
                                //         } else {
                                //             alert('결제실패');
                                //         }
                           // }
                        }).catch(error => {
                            alert("주문정보 저장을 실패 했습니다.");
                        })
                } else {
                    alert(rsp.error_msg);
                }
            }
        )
    }

    // const callbacks = (response) => {
    //     const {data, success,error_msg, imp_uid, merchant_uid,paid_amount} = response.json();
    //     // success,error_msg, imp_uid, merchant_uid, pay_method, paid_amount, status
    //     if (data) {
    //         console.log(data);

    //         fetch('http://localhost/pay/'+imp_uid,
    //             {
    //                 method:'post',
    //                 body:JSON.stringify({
    //                     'imp_uid': imp_uid,
    //                     'merchant_uid': merchant_uid
    //                 })
    //             }).then(()=>{
    //                 if (paid_amount === data.response.amount) {
    //                     alert('결제 및 결제검증완료');
    //                   } else {
    //                     alert('결제실패');
    //                   }
    //             });

    //         //결제성공시 예약내역페이지로 화면전환
    //         //window.location.href='/guest/Pay'; 
    //     } else {
    //         alert('결제실패');
    //     }
    // }

    /*
    결제 실패 시 rsp object에 다음와 같은 값이 적용된다.
    1. 한도초과, 잔액부족, 사용자 취소 시 에러 메시지가 다날측 적용된 메시지로 적용된다.
        ex)error_msg: "F0004:PG사 결제요청에 실패하여 중단합니다.(imp_123456) 3112, 한도가 초과하였습니다."
    2. confirm_url을 이용하여 HTTP_STATUS 500 응답 시 상세 사유에는 응답값으로 reason 필드에 
    있는 값을 출력한다.
    -> "가맹점 요청에 의해 결제를 중단합니다.(상세사유 : reason 필드의 value)
        ex)error_msg: "가맹점 요청에 의해 결제를 중단합니다. (상세사유 : 결제 금액 불일치로 결제가 실패 되었습니다.)"
    개발자 도구로 필요한 값을 출력해보면 될 것 같다.
    */
    //버튼 클릭 시 handleClick 함수 실행
    // document.getElementById('check_module').addEventListener('click', serverAuth);

    // //컴포넌트 언마운트 시 이벤트 리스너 제거
    // return () => {
    //     document.getElementById('check_module').removeEventListener('click', serverAuth);
    // };

    return (
        <>
        <button onClick={()=>serverAuth()}>nicepay 결제하기</button>
        </>
    )

}
export default Nicepay;
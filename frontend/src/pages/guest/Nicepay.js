import React, {useEffect} from 'react';

//아임포트 나이스페이연동
function Nicepay() {
    console.clear();

    useEffect(() => {
        const jquery = document.createElement("script");
        jquery.src = "https://code.jquery.com/jquery-1.12.4.min.js";
        const iamport = document.createElement("script");
        //iamport.src="https://cdn.iamport.kr/js/iamport.payment-1.2.0.js";
        //iamport.src="https://cdn.iamport.kr/v1/iamport.js"
        iamport.src="https://cdn.portone.io/v2/browser-sdk.js"
        document.head.appendChild(jquery);
        document.head.appendChild(iamport);
        return () => {
            document.head.removeChild(jquery);
            document.head.removeChild(iamport);
        }
    }, []);

    async function serverAuth() {
        const { PortOne } = window;

        const response = await PortOne.requestPayment({
            storeId: 'store-af69f2fa-5d38-4271-b9ad-44d9dc389ecd',
            paymentId: `payment-${crypto.randomUUID()}`,
            payMethod: 'CARD',
            channelKey: 'channel-key-79aea003-5c79-4b37-a303-c271c68f7456',
            currency: 'CURRENCY_KRW',
            totalAmount: 100,
            orderName: 'hotelA',
            pg: 'nice_v2', //pg사
            buyer_name: '예약자',
            buyer_email: 'dusdn5774@naver.com',
            buyer_tel: '예약자전화번호',
            buyer_postcode: '123-456',
            buyer_addr: '서울특별시',
        });
        console.log("결제 건 ID"+response.paymentId);
        if (response.code != null) {
            //오류발생
            return alert(response.message);
        }

        // const notified = await fetch(`https://api.portone.io/payment/complete`, {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     // paymentId와 주문 정보를 서버에 전달합니다
        //     body: JSON.stringify({
        //       paymentId: response.paymentId,
        //       // 주문 정보...
        //     }),
        //   });

        // // JSON 요청을 처리하기 위해 body-parser 미들웨어 세팅
        // app.use(bodyParser.json());

        // // POST 요청을 받는 /payments/complete
        // app.post("/payment/complete", async (req, res) => {
        // try {
        //     // 요청의 body로 paymentId가 전달되기를 기대합니다.
        //     const { paymentId, orderId } = req.body;

        //     // 1. 포트원 결제내역 단건조회 API 호출
        //     const paymentResponse = await fetch(
        //     `https://api.portone.io/payments/${paymentId}`,
        //     { headers: { Authorization: `PortOne 8I6gk3CbU6dmSKZ5WDQDclFzYOMq8gnBJbtCRkEm7uloX27PRxKGjqnSYSaKzWJefLssINqMzO7OO35o` } },
        //     );
        //     if (!paymentResponse.ok)
        //     throw new Error(`paymentResponse: ${paymentResponse.statusText}`);
        //     const payment = await paymentResponse.json();

        //     // 2. 고객사 내부 주문 데이터의 가격과 실제 지불된 금액을 비교
        //     const order = await OrderService.findById(orderId);
        //     if (order.amount === payment.amount.total) {
        //     switch (payment.status) {
        //         case "VIRTUAL_ACCOUNT_ISSUED": {
        //         // 가상 계좌가 발급된 상태입니다.
        //         // 계좌 정보를 이용해 원하는 로직을 구성하세요.
        //         break;
        //         }
        //         case "PAID": {
        //             alert("모든금액 지불!");
        //         // 모든 금액을 지불했습니다! 완료 시 원하는 로직을 구성하세요.
        //         break;
        //         }
        //     }
        //     } else {
        //     // 결제 금액이 불일치하여 위/변조 시도가 의심됩니다.
        //     }
        // } catch (e) {
        //     // 결제 검증에 실패했습니다.
        //     alert("결제검증 실패");
        //     res.status(400).send(e);
        // }
        // });
            // function(rsp){
            //     if (rsp.success) {
            //         console.log(rsp.imp_uid);
            //         alert("결제성공");
            //         window.location.href='/guest/reservation';
            //     } else {
            //         alert("결제실패==="+rsp.error_msg);
            //     }
            // }
        
        //PortOne.request_pay(params, callbacks);

        // .done(function(data) {
        //     console.log(data);

        //     if(rsp.paid_amount === data.response.amount){
        //         alert("결제 및 결제검증완료");
        //     } else {
        //         alert("결제 실패");
        //     }
        // })
    }

    //v1 버전 IMP실행창
    // const { IMP } = window;
    //     IMP.init('imp40362238');

    //     const today = new Date();   
    //     const hours = today.getHours(); // 시
    //     const minutes = today.getMinutes();  // 분
    //     const seconds = today.getSeconds();  // 초
    //     const milliseconds = today.getMilliseconds();
    //     const makeMerchantUid = hours +  minutes + seconds + milliseconds;

        
    //         const params = {
    //         pg: 'nice.iamport00m', //pg사
    //         merchant_uid: 'merchant_' + makeMerchantUid,
    //         //'merchant_' + new Date().getTime(), // 주문 고유 번호
    //         pay_method: 'card',
    //         name: 'hotelA',
    //         amount: 100,
    //         buyer_name: '예약자',
    //         buyer_email: 'dusdn5774@naver.com',
    //         buyer_tel: '예약자전화번호',
    //         buyer_postcode: '123-456',
    //         buyer_addr: '서울특별시',
    //         language: 'ko',
    //         m_redirect_url: 'localhost:3000/',
    //         niceMobileV2: true,
    //         }
    //         // function(rsp) {
    //         //     if (rsp.success) { //callback
    //         //         console.log(rsp.imp_uid);
    //         //         alert("결제성공");
    //         //         window.location.href='/guest/reservation';
    //         //     } else {
    //         //         alert("결제실패==="+rsp.error_msg);
    //         //     }
    //         // }
        
    //     IMP.request_pay(params, callbacks);



    // const callbacks = (rsp) => {
    //     const {success, error_msg, imp_uid} = rsp;
    //     if (success) {
    //         console.log(imp_uid);
    //         alert("결제성공");
    //         window.location.href='/guest/reservation';
    //     } else {
    //         alert("결제실패==="+error_msg);
    //         //결제실패시 예약요청페이지로 화면전환
    //         //window.location.href='/guest/Pay'; 
    //     }
    // }

    // function (rsp) {
    //     console.log(rsp);

    //     if(rsp.success) {
    //         console.log(rsp.imp_uid);
    //         //결제검증후 DB업데이트
    //         alert("결제성공");
    //         fetch('http://localhost/confirmpay',
    //             {
    //                 method:'post',
    //                 data: rsp.imp_uid,
    //             }).then((res) => {
    //                 //window.location.href='/guest/reservation';
    //                 if(rsp.paid_amount === res.response.amount) {
    //                     alert("검증완료 결제성공");
    //                 } else {
    //                     alert("결제실패");
    //                 }
    //             })
    //     } else {
    //         alert(rsp.error_msg);
    //     }
    // }

    // const serverAuth = () => {
    //     const { IMP } = window;
    //     IMP.init('imp40362238');

    //     IMP.request_pay(
    //         {
    //         pg: 'nice', //pg사
    //         merchant_uid: 'merchant_' + new Date().getTime(), // 주문 고유 번호
    //         pay_method: 'card',
    //         name: 'hotelA',
    //         amount: 100,
    //         buyer_name: '예약자',
    //         buyer_email: '예약자이메일',
    //         buyer_tel: '예약자전화번호',
    //         buyer_postcode: '123-456',
    //         //returnUrl: 'http://localhost:3000/', //리턴될 URL
    //         },
    //         function (rsp) {
    //             console.log(rsp);

    //             if(rsp.success) {
    //                 console.log(rsp.imp_uid);
    //                 //결제검증후 DB업데이트
    //                 alert("결제성공");
    //                 fetch('http://localhost/confirmpay',
    //                     {
    //                         method:'post',
    //                         data: rsp.imp_uid,
    //                 //         // body:JSON.stringify({
    //                 //         //     'imp_uid': imp_uid,
    //                 //         //     'merchant_uid': merchant_uid
    //                 //         // })
    //                     }).then(() => {
    //                         //window.location.href='/guest/reservation'; 
    //                         //금액비교
    //                         //if (paid_amount === data.response.amount) {
    //                             //             alert('결제 및 결제검증완료');
    //                             //         } else {
    //                             //             alert('결제실패');
    //                             //         }
    //                        // }
    //                     })
    //                     // .catch(error => {
    //                     //     alert("주문정보 저장을 실패 했습니다.");
    //                     // })
    //             } else {
    //                 alert(rsp.error_msg);
    //             }
    //         }
    //     ).done(function(data) {
    //         console.log(data);

    //         if(rsp.paid_amount == data.response.amount){
    //             alert("결제 및 결제검증완료");
    //         } else {
    //             alert("결제 실패");
    //         }
    //     })
    // }


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
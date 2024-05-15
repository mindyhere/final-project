import React, {useEffect} from 'react';

function Nicepay() {
    useEffect(() => {
        const nicepay = document.createElement("script");
        nicepay.src="https://pay.nicepay.co.kr/v1/js/";
        document.head.appendChild(nicepay);
        return () => {
            document.head.removeChild(nicepay);
        }
    }, []);

    function serverAuth() {
        const { AUTHNICE } = window;
        AUTHNICE.requestPay({
          clientId: 'S2_018d5b497c9e4f2cbf7fcfadf7605111',
          method: 'card',
          orderId: 'hotelA',
          amount: 1004,
          goodsName: '나이스페이-상품',
          returnUrl: 'http://localhost:3000/',
          //serverAuth
          fnError: function (result) {
            //alert('개발자확인용 : ' + result.errorMsg + '')
            alert('개발자확인용 : error')
          }
        });
    }
    return (
        <>
        <button onClick={()=>serverAuth()}>nicepay 결제하기</button>
        </>
    )
}
export default Nicepay;
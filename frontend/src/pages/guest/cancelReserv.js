import React,{useEffect,useState} from 'react';
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
  

    useEffect(() => {
        fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {
            setData(data);
            setLoading(false);
        })
    }, []);
    return [data, loading];
}


function CancelReserv() {
    const {OIdx} = useParams();
    const [data, loading] = useFetch('http://localhost/guest/reserv/delDetail?o_idx=' + OIdx);
    

    if(loading) {
        return (
            <div>loading</div>
        )
    } else {
        const url = `http://localhost/static/images/host/hotel/${data.dto.ho_img}`;
        const image = data.dto.ho_img;
        let img = '';
        if ( image != null) {
            img = `<img src=${url} width='50px' height='50px' /><br />`;
        }
        return (
            <>
            <div className="container min-vh-100">
                <div style={{float: 'left', width: '500px', marginRight:'50px'}}>
                <h3 class="text-bold">취소 확인하기</h3>
                <br/>
                <div>
                <div style={{float:'left', marginRight:'100px'}}>
                    결제한 금액
                    <p style={{fontSize:'30px', fontWeight:"bold"}}>{data.dto.o_finalprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</p>
                </div>
                <div>
                    환불 금액
                    <p style={{fontSize:'30px', fontWeight:"bold"}}>{data.refund_money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</p>
                </div>
                </div>
                <hr/>
                <div style={{paddingBottom:'60px'}}>
                <h5>환불 세부 내역</h5>
                    <br/>
                    <div style={{float:'left', marginRight:'100px'}}>숙박<br/><p style={{fontSize:'15px', float:'right'}}>{data.refund}</p></div>
                    <div style={{float:'right'}}>{data.refund_money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원<br/><p style={{fontSize:'15px', float:'right'}}>{data.dto.o_finalprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</p></div>
                </div>
                <hr/>
                <div style={{paddingBottom:'40px'}}>
                    <h4>총 환불 금액<p style={{float:'right'}}>{data.refund_money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</p></h4>
                </div>
                <button type='button' class="main-btn" onClick={() => {
                    const form = new FormData();
                    form.append('o_idx', OIdx);
                    fetch('http://localhost/guest/reserv/cancel', {
                        method: 'post',
                        body: form,
                        }).then((response) => response.json())
                    .then(data => {
                        if (data.result == 'success') {
                            Swal.fire({
                                title: '취소 완료',
                                test: '예약 목록 화면으로 돌아갑니다',
                                showCancelButton: false,
                                confirmButtonText: '확인',
                            }).then((result) => {
                                if(result.isConfirmed) {
                                    window.location.href='/guest/reservation';
                                }
                            });
                        } else {
                            Swal.fire({
                                title: '에러 발생',
                                text: '관리자에게 문의하세요',
                                showCancelButton: false,
                                confirmButtonText: '확인',
                            });
                        }
                    })
                }}>예약 취소</button>
                </div>

                <div class='card-reservDetail' style={{float: 'left'}}>
                    <div style={{float:'left', marginRight: '10px'}}><span dangerouslySetInnerHTML={{__html: img}}></span></div>
                    <div>
                        <p>{data.dto.ho_name}<br/>
                        호스트: {data.dto.h_name}</p>
                    </div>
                    <hr/>
                    <p>날짜 <p style={{float:'right'}}>{data.dto.o_ckin} ~ {data.dto.o_ckout}</p></p>
                    게스트 <p style={{float:'right'}}>{data.dto.o_reser}명</p>
                    <hr/>
                    <p>현재까지 결제 완료 금액 <p style={{float:'right'}}>{data.dto.o_finalprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</p></p>
                    총 환불 금액 <p style={{float:'right', fontWeight:"bold"}}>{data.refund_money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</p>
                </div>
            </div>
            </>
        )
    }
}

export default CancelReserv;
import React,{useEffect,useState} from 'react';
import { useParams } from "react-router-dom";

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

function LastReservDetail() {
    const {OIdx} = useParams();
    const [data, loading] = useFetch('http://localhost/guest/reserv/lastDetail?o_idx=' + OIdx);
    const [check, setCheck] = useState(false);
    console.log(OIdx);
    const handleCopyClick = (textToCopy) => {
        navigator.clipboard.writeText(textToCopy)
          .then(() => {
            alert('텍스트가 복사되었습니다.');
          })
          .catch((error) => {
            console.error('복사 실패:', error);
          });
      };

    if(loading) {
        return (
            <div>loading</div>
        )
    } else {
        return (
            <>
             <div className="container min-vh-100">
                <h3 class="text-bold"> <img src="/img/reservDetail.png" width="35px" height="35px"/>
                &nbsp; 지난 예약 상세</h3>
                <br/>
                <br/>
                <div class="card-reservDetail">
                    <h4>예약 세부 정보</h4>
                    <hr/>
                    <p style={{fontWeight: 'bold'}}> 환불 정책</p>
                    <p>체크인 시간인 () 전에 취소하면 전체 환불을 받으실 수 있습니다. 그 이후에 취소하면 예약 대금이 환불되지 않습니다.</p>
                    <hr/>
                    <div><p><img src="/img/bbtnDetail.png" width="12px" height="12px" style={{marginRight: '2px', marginBottom: '2px'}}/>&nbsp;예약 변경</p></div>
                    <hr/>
                    <div><p><img src="/img/bbtnDetail.png" width="12px" height="12px" style={{marginRight: '2px', marginBottom: '2px'}}/>&nbsp;예약 취소</p></div>
                </div>
                <div class='detail-blank'></div>
                <div class='card-reservDetail'>
                    <h4>찾아가는 방법</h4>
                    <hr/>
                    <p style={{fontWeight: 'bold'}}> 주소</p>
                    <p>(주소)</p>
                    <hr/>
                    <div onClick={() => handleCopyClick('주소')}><p><img src="/img/bbtnDetail.png" width="12px" height="12px" style={{marginRight: '2px', marginBottom: '2px'}}/>&nbsp;주소 복사하기</p></div>            
                </div>
                <div class='detail-blank'></div>
                <div class='card-reservDetail'>
                    <h4>숙소 안내 및 일정</h4>
                    <hr/>
                    <p style={{fontWeight: 'bold'}}>예약 일정</p>
                    <p>(체크인 날짜/시간~체크아웃 날짜/시간)</p>
                    <hr/>
                    <p style={{fontWeight: 'bold'}}> 숙소 안내</p>
                    <p>(룸 상세)</p>
                </div>
                <div class='detail-blank'></div>
                <div class='card-reservDetail'>
                    <h4>호스트 안내</h4>
                    <hr/>
                    <p>(호스트 정보)</p>
                </div>
                <div class='detail-blank'></div>
                <div class='card-reservDetail'  style={{marginBottom: '100px'}}>
                    <h4>결제 정보</h4>
                    <hr/>
                    <p style={{fontWeight: 'bold'}}>결제 세부 정보</p>
                    <p>(결제 금액)</p>
                    <hr/>
                    <div onClick={() => {setCheck(!check)}}><p><img src="/img/bbtnDetail.png" width="12px" height="12px" style={{marginRight: '2px', marginBottom: '2px'}}/>&nbsp;상세 내역</p></div>
                    <div class={check? 'abl' : 'dis'}>
                        <input type='text' style={{border: "0px", outline: "none"}} value='(날짜)' readOnly></input><br/>
                        <input type='text' style={{border: "0px", outline: "none"}}  value='(할인)' readOnly></input><br/>
                        <input type='text' style={{border: "0px", outline: "none"}}  value='(결제)' readOnly></input><br/>
                        <input type='text' style={{border: "0px", outline: "none"}}  value='(수단)' readOnly></input>
                    </div>
                </div>
            </div>
            </>
        )
    }
}

export default LastReservDetail;
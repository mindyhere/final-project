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

function UpdateReserv() {
    const {OIdx} = useParams();
    const [data, loading] = useFetch('http://localhost/guest/reserv/upDetail?o_idx=' + OIdx);

    if(loading) {
        return (
            <div>loading</div>
        )
    } else {
        return (
            <>
            <div className="container min-vh-100">
            <h3 class="text-bold">무엇을 변경하고 싶으세요?</h3>
            <br/>
            
            <div>
            <div class='card-UpdateReserv'>
            <p>원하는 사항을 변경한 다음 호스트 (호스트 이름) 님에게 예약 변경 요청을 보내세요.</p>
                {/* <div style={{float:'left', marginRight: '10px'}}><span dangerouslySetInnerHTML={{__html: img}}></span></div> */}
                <div>
                    <p>(호텔 이름)<br/>
                    호스트: (호스트 이름)</p>
                </div>
                <hr/>
                <h5 class="text-bold">예약 세부 정보</h5>
                <div></div>
                <hr/>
                <div style={{marginBottom: '40px'}}>
                <h5 class="text-bold">환불 정책</h5>
                <p>(환불 가능 시간) 전에 취소하면 환불을 받으실 수 있습니다. 그 이후에 취소하면 예약 대금이 환불되지 않습니다.</p>
                </div>
                <button type='button' class="main-btn">예약 변경</button>
            </div>
            </div>
            </div>
            </>
        )
    }
}

export default UpdateReserv;
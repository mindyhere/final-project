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
    const [data, loading] = useFetch('http://localhost/guest/reserv/lastDetail' + OIdx);

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
            </div>
            </>
        )
    }
}

export default LastReservDetail;
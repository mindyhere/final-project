import Cookies from "universal-cookie";
import '../../asset/css/user.css';
import React,{useRef,useEffect,useState} from 'react';

function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading,setLoading] = useState(true);

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

function Reservation() {
    const cookies = new Cookies();
    const idx = cookies.get('g_idx');
    const [data, loading] = useFetch('http://localhost/guest/reserv?g_idx='+idx.key);

    if(loading) {
        return (
            <div>loading</div>
        )
    } else {
        return (
            <>
                 <div className="container min-vh-100">
                 <h3 class="text-bold"> <img src="/img/info.png" width="35px" height="35px"/>
                &nbsp; 여행</h3>
                <br/>
                <br/>
                <h4>예정된 예약</h4>
                <br/>
                <h4>이전 예약</h4>
                 </div>
            </>
        )
    }
}

export default Reservation;
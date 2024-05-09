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


function CancelReserv() {
    const {OIdx} = useParams();
    const [data, loading] = useFetch('http://localhost/guest/reserv/delete?o_idx=' + OIdx);
    console.log(OIdx);
    if(loading) {
        return (
            <div>loading</div>
        )
    } else {
        return (
            <>
            <div className="container min-vh-100">
            <h3 class="text-bold">취소 확인하기</h3>
                <br/>
            </div>
            </>
        )
    }
}

export default CancelReserv;
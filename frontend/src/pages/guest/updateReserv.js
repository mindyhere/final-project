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
            
            </div>
            </>
        )
    }
}

export default UpdateReserv;
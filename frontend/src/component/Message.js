import React,{useEffect,useState} from 'react';
import Cookies from "universal-cookie";
import { useParams } from "react-router-dom";
import { Stomp } from "@stomp/stompjs";

function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
  

    useEffect(() => {
        fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            setData(data);
            setLoading(false);
        })
    }, []);
    return [data, loading];
}

function Message() {
    const cookies = new Cookies();
    const userInfo = cookies.get("userInfo");
    const gIdx = cookies.get("g_idx");
    

    let u_rl = '';
    if (gIdx.key !== null) {
        u_rl = 'http://localhost/chatroom/g_list?g_idx=' + gIdx.key;
    } else if (userInfo !== null) {
        const hIdx = userInfo.h_idx;
        u_rl = 'http://localhost/chatroom/h_list?h_idx=' + hIdx.key;
    }

    const [data, loading] = useFetch(u_rl);
    
    if(loading) {
        return (
            <div>loading</div>
        )
    } else {
        return (
            <>
            <div className="container min-vh-100">
            <h3 className="text-bold"> <img src="/img/reservDetail.png" width="35px" height="35px"/>
                &nbsp; 메시지</h3>
            <br/>
            <div className="card-stylee mb-30" style={{width: '300px'}}>
                {data.dto.map((item) => (
                    <div className='hover'>
                    <p>{item.m_message}</p>
                    <hr/>
                   </div>
                ))}
            </div>
            </div>
            </>
        )
    }
}

export default Message;
import React,{useEffect,useState} from 'react';
import Cookies from "universal-cookie";
import { useParams } from "react-router-dom";
import { Stomp } from "@stomp/stompjs";
import '../pages/guest/aa.css'

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
        let img = '';
        const pro = data.dto.h_profile;
        console.log(data.dto.h_profile);
        const profile = `http://localhost/static/images/host/profile/${data.dto.h_profile}`;
        if ( data.dto.h_profile != null) {
            img = `<img src=${profile} width='30px' height='30px' /><br />`;
        }

        return (
            <>
            <div className="container min-vh-100">
            <h3 className="text-bold"> <img src="/img/reservDetail.png" width="35px" height="35px"/>
                &nbsp; 메시지</h3>
            <br/>
            <div className="card-stylee mb-30" style={{width: '300px'}}>
                {data.dto.map((item) => (
                    <div className='mes'>
                    <div style={{float: 'left', marginRight: '10px'}}><span dangerouslySetInnerHTML={{__html: `<img src=${item.h_profile} width='30px' height='30px' /><br />`}}></span></div>
                    <p style={{fontSize: '20px'}}>{item.h_name}<span style={{float:'right', fontSize: '13px'}}>{item.m_send_date}</span></p> 
                    <p style={{fontSize: '15px', color: 'grey'}}>{item.m_message}</p>
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
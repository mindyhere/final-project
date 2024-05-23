import React,{useEffect,useState} from 'react';
import Cookies from "universal-cookie";
import { useParams } from "react-router-dom";
import { Stomp } from "@stomp/stompjs";
import '../pages/guest/aa.css'
import Chat from './Chat';


function Message() {
    const cookies = new Cookies();
    const userInfo = cookies.get("userInfo");
    const gEmail = cookies.get("g_email");
    const [open, setOpen] = useState('msg-able');
    const [roomId, setRoomId] = useState([]);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [comment, setComment] = useState('');
     
    const {room} = useParams();
    const {hName} = useParams();

    
    let sender = '';
    let type = '';
    if (gEmail != null && gEmail != '') {
        sender = gEmail.key;
        type = 'guest';
    } else if (userInfo != null && userInfo != '') {
        const hEmail = userInfo.h_email;
        sender = hEmail;
        type = 'host';
    }

    

    useEffect(() => {
            const form = new FormData();
            form.append('sender', sender);
            form.append('type', type);
            fetch('http://localhost/chatroom/list', {
                method: 'post',
                body: form,
            })
            .then(response => {
                return response.json();
            })
            .then(data => {    
                console.log(data.dto.length);
                if (data.dto.length != 0) {
                    if (room != null && room != '') {
                        console.log(room);
                        setRoomId(room);
                    } else {
                        console.log(data.dto[0].m_roomId);
                        setRoomId(data.dto[0].m_roomId);
                    }
                    setData(data);
                    setLoading(false);
                } else if (data.dto.length == 0){
                    setOpen('msg-disable');
                    setLoading(false);
                    setComment('메시지가 없습니다');
                }
            })
    },[]);
    
    if(loading) {
        return (
            <div>loading</div>
        )
    } else {

        return (
            <>
            <div style={{marginLeft: '300px', paddingTop: '50px',height: '720px'}}>
            <h3 className="text-bold"> <img src="/img/msg.png" width="35px" height="35px"/>
                &nbsp; 메시지</h3>
                <hr></hr>
            <br/>
                <div className="card-stylee mb-30" style={{width: '300px', float: 'left', marginRight: '30px'}}>
                    <p>{comment}</p>
                {data.dto.map((item) => (
                    <div className='mes' onClick={() =>  { setRoomId(item.m_roomId);
                    // if(gIdx.key !== null) {
                    //     setsss('http://localhost/chatroom/g_entrance?g_idx=' + gIdx.key + '&idx=' + item.m_h_idx);
                    // } else if(userInfo !== null) {
                    //     const hIdx = userInfo.h_idx;
                    //     setsss('http://localhost/chatroom/h_entrance?h_idx=' + hIdx.key+ '&idx=' + item.m_g_idx);
                    // }   
                    }}> 
                    <div style={{float: 'left', marginRight: '10px'}}><img src={gEmail==null ? (item.g_photo == 'http://localhost/static/images/guest/profile/-' ? '/img/no-image.png' : item.g_photo) : (item.h_profile == 'http://localhost/static/images/host/profile/-'? '/img/no-image.png' : item.h_profile) } width='30px' height='30px' /></div>
                    <p style={{fontSize: '20px'}}>{gEmail==null ? item.g_name : item.h_name}<span style={{float:'right', fontSize: '13px'}}>{item.m_send_date}</span></p> 
                    <p style={{fontSize: '15px', color: 'grey'}}>{item.m_message}</p>
                    <hr/>
                    </div>
                ))}
            </div>
            <div className={open} style={{width: '500px', height: '500px'}}>
                <Chat roomId= {roomId}></Chat>
            </div>
            </div>
            </>
        )
    }
}




export default Message;
import React,{useEffect,useState} from 'react';
import Cookies from "universal-cookie";
import { useParams } from "react-router-dom";
import '../pages/guest/aa.css'
import Chat from './Chat';
import Chatbot from './chatbot';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import styled from 'styled-components';
import ChatbotModal from "react-modal"


function Message() {
    const cookies = new Cookies();
    const userInfo = cookies.get("userInfo");
    const gEmail = cookies.get("g_email");
    const [open, setOpen] = useState('msg-able');
    const [openBot, setOpenBot] = useState('msg-disable');
    const [roomId, setRoomId] = useState([]);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [comment, setComment] = useState('');
    const [ip, setIp] = useState('');
    const {room} = useParams();
    const {hName} = useParams();
    const [check, setCheck] = useState(1);
    
    const theme = {
        background: '#f5f8fb',
        fontFamily: 'Helvetica Neue',
        headerBgColor: '#ceb8f0',
        headerFontColor: '#fff',
        headerFontSize: '15px',
        botBubbleColor: '#ceb8f0',
        botFontColor: '#000',
        userBubbleColor: '#fff',
        userFontColor: '#000',
      };

      const ChatBotContainer = styled.div`
      background: ${({ theme }) => theme.background};
      border-radius: 10px;
      box-shadow: 0 12px 24px 0 rgba(0, 0, 0, 0.15);
      font-family: ${({ theme }) => theme.fontFamily};
      overflow: hidden;
      position: ${({ floating }) => (floating ? 'fixed' : 'relative')};
      bottom: ${({ floating, floatingStyle }) =>
        floating ? floatingStyle.bottom || '32px' : 'initial'};
      top: ${({ floating, floatingStyle }) => (floating ? floatingStyle.top || 'initial' : 'initial')};
      right: ${({ floating, floatingStyle }) => (floating ? floatingStyle.right || '32px' : 'initial')};
      left: ${({ floating, floatingStyle }) =>
        floating ? floatingStyle.left || 'initial' : 'initial'};
      width: ${({ width }) => width};
      height: ${({ height }) => height};
      z-index: 999;
      transform: ${({ opened }) => (opened ? 'scale(1)' : 'scale(0)')};
      transform-origin: ${({ floatingStyle }) => floatingStyle.transformOrigin || 'bottom right'};
      transition: transform 0.3s ease;
    
      @media screen and (max-width: 568px) {
        border-radius: ${({ floating }) => (floating ? '0' : '')};
        bottom: 0 !important;
        left: initial !important;
        height: 100%;
        right: 0 !important;
        top: initial !important;
        width: 100%;
      }
    `;
    
    ChatBotContainer.defaultProps = {
      theme: theme
    };
    
    
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
                setData(data);
                setLoading(false);
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
                    <div onClick={() => { setCheck(0)}}>
                    <div style={{float: 'left', marginRight: '10px'}}><img src='/img/chatbot.png' width='30px' height='30px' /></div>
                    <p style={{fontSize: '20px'}}>챗봇</p> 
                    </div>
                    <hr></hr>
                {data.dto.map((item) => (
                    <div className='mes' onClick={() =>  { setRoomId(item.m_roomId); setIp(item.h_ip); setCheck(1);
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
            
            {check == 1 ? 
                <Chat roomId= {roomId} ip={ip}></Chat>
            :      
            <div style={{position:'absolute', left: '610px'}}>
                <Chatbot></Chatbot>
                </div>
            }
            </div>
            
            </>
        )
    }
}




export default Message;
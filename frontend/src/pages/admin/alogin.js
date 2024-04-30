import React, {useRef, useState} from "react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import '../admin/css/astyles.css';


function AdminLogin() {
    const [params, setParams]=useSearchParams();  
    const msg = params.get('msg');
    const navigate = useNavigate();
    const a_id = useRef();
    const a_passwd = useRef();
    const [message, setMessage] = useState([]);

    return(
        <>
     <div className="main" align='center'>     
          <div className="organize-form form-area-signin">
            <h2 align="center">관리자 로그인</h2> 
            &nbsp;
            &nbsp;
            <div className="form-field">
            <label align='left'>id</label>
            <input className='input' type="text" name="a_id" id="a_id" ref={a_id} align='center'/>
            </div>
            <div className="form-field">
            <label align='left'>password</label>
            <input className='input' type="password" name="a_passwd" id="a_passwd" ref={a_passwd}  />
            </div>
                  
            <div colSpan='2'align='center'>
          
                    <button type="submit" onClick={() => {   
        
                        if(a_id.current.value=='') {
                            window.alert('아이디를 입력하세요.');
                            a_id.current.focus();
                            return;
                        }
                        if(a_passwd.current.value==''){
                            window.alert('비밀번호를 입력하세요.');
                            a_passwd.current.focus();
                            return;
                        }
                                         
                        const form = new FormData();
                        form.append('a_id',a_id.current.value);
                        console.log("a_id : " + a_id.current.value);
                        form.append('a_passwd',a_passwd.current.value);
                        console.log("a_passwd : " + a_passwd.current.value);
                        fetch('http://localhost/admin/adlogin',{
                            method:'post',
                            body:form
                        })
                        .then(response=>response.json())
                        .then(data=>{
                            setMessage(data);
                            if(data.message=='success'){
                                const cookies = new Cookies();                               
                                cookies.set('a_id',{key:data.a_id},
                                {path:'/',expires:new Date(Date.now()+2592000)});//30일                          
                                cookies.set('a_passwd',{key:data.a_passwd},
                                {path:'/',expires: new Date(Date.now()+2592000)});    
                               window.location.href='/';                                                            
                            }else{
                                navigate('/admin/alogin?msg=error');  
                        }
                        });        
                    }} className="btn-sign">Sign In</button>
                    &nbsp; 
                    {msg === 'error' ? <p style={{color: 'red'}}>로그인 정보가 일치하지 않습니다.</p> : null}              
                                   
               </div>
            </div>
        </div>      
     </>          
    )
}
export default AdminLogin;
import Cookies from "universal-cookie";
import React,{useRef,useEffect,useState} from 'react';
import '../../asset/css/user.css'

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

function GuestInfo() {
    const cookies = new Cookies();
    const level = cookies.get('g_level');
    const email = cookies.get('g_email');
    const name = cookies.get('g_name');
    const [data, loading] = useFetch('http://localhost/guest/info/datail/'+email);
    const g_passwd = useRef();
    const checkPwd = useRef();
    const g_phone = useRef();
    const g_join_date = useRef();

    if(loading) {
        return (
            <div>loading</div>
        )
    } else {
        

        return (
            <>
                <div className="container min-vh-100">
                <h3 class="text-bold"> <img src="/img/info.png" width="35px" height="35px"/>
                &nbsp; 회원 정보</h3>
                <br/>
                <div class="card-stylee mb-30">
                    <form>
                        <div>
                        <label class="label-1">이메일</label><br/>
                        <input type="text" style={{border: "0px", outline: "none"}} defaultValue={"a@naver.com"} readOnly></input>
                        </div>
                        <hr/>
                        <div>
                        <label class="label-1">이름</label><br/>
                        <input type="text" style={{border: "0px", outline: "none"}} defaultValue={"흰둥이"} readOnly></input>
                        </div>
                        <hr/>
                        <div style={{float:"left"}}>
                        <label class="label-1">비밀번호</label><br/>
                        <input class="underline" type="password"  ref={g_passwd}></input>
                        </div>
                        <div class="blankk"></div>
                        <div>
                        <label class="label-1">비밀번호 확인</label><br/>
                        <input class="underline" type="password" ref={checkPwd}></input>
                        </div>
                        <hr/>
                        <div>
                        <label class="label-1">전화번호</label><br/>
                        <input class="underline" type="text" ref={g_phone} defaultValue={"010-1111-2222"}></input>
                        </div>
                        <hr/>
                        <div>
                        <label class="label-1">가입일자</label><br/>
                        <input style={{border: "0px", outline: "none"}} defaultValue={"2024-04-30"} readOnly></input>
                        </div>
                        <hr/>
                        <div>
                        <label class="label-1">레벨</label><br/>
                        <input style={{border: "0px", outline: "none"}} defaultValue={"regular"} readOnly></input>
                        </div>
                        <hr/>
                        <div style={{float:"left"}}>
                        <label class="label-1">인증</label><br/>
                        <select>
                            <option>주민등록증</option>
                            <option>여권</option>
                            <option>운전면허증</option>
                        </select> 
                        </div>
                        <div class="blankk"></div>
                        <div>
                        <label class="label-1">신분증</label><br/>
                        <input type='file'></input>
                        </div>
                        <hr/>
                        <br/>
                        <button type='button' class="main-btn">정보 수정</button>
                    </form>
                </div>
                </div>
            </>
        )
    }
}

export default GuestInfo;
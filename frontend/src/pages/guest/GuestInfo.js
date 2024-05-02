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
    const [selected, setSelected] = useState("없음");
    const selectList = ["미인증", "주민등록증", "여권", "운전면허증"];
    const [inputValue, setInputValue] = useState('');
    
    const handleSelect = (e) => {
        setSelected(e.target.value);    
    };

    const handleChange = (e) => {
        const regex = /^[0-9\b -]{0,13}$/;
        if (regex.test(e.target.value)){
            setInputValue(e.target.value);
        }
    }

    useEffect(() => {
        if (inputValue.length > 0 ) {
            setInputValue(inputValue
                .replace(/-/g, '')
                .replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'));
        }
    }, [inputValue]);

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
                        <input class="underline" type="text" ref={g_phone} onChange={handleChange}  value={inputValue} placeholder="숫자만 입력하세요"></input>
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
                        <div style={{float:"left", width:"150px"}}>
                        <label class="label-1">인증</label><br/>
                        <select onChange={handleSelect} value={selected} >
                            {selectList.map((item) => (
                                <option value={item} key={item}>
                                    {item}
                                </option>
                            ))}
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
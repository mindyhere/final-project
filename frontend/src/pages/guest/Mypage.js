import React, {useRef,useEffect,useState} from 'react';
import {useNavigate} from "react-router-dom";

function Mypage() {
    //const url = `../img/${g_Img}`;
    return (
        <>
            <nav className='navbar navbar-expand-lg'>
                <div className='container' width='500px'>
                    <div class="col-4" align='right'>
                        이미지
                    </div>
                    <div class="col-5" align='left'>
                        <h2>___님 프로필</h2>
                        <br />
                        <div>
                            <div>
                                <label>이메일</label>&nbsp;&nbsp;
                                <input type='text' readOnly></input>
                            </div>
                        </div>
                        <div>
                            <label>전화번호</label>&nbsp;&nbsp;
                            <input type='tel'></input>
                        </div>
                        <div>
                            <label>등급</label>&nbsp;&nbsp;
                            <input type='text' readOnly></input>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}
export default Mypage;
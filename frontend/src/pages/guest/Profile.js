import React, {useRef,useEffect,useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from 'universal-cookie';

function useFetch(url) {
    const [data,setData] = useState(null);
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        fetch(url)
            .then(response=>{
                return response.json();
            })
            .then(data=>{
                setData(data);
                setLoading(false);
            })
    }, []);
    return [data,loading];
}

function Profile() {
    const cookies = new Cookies();
    const idx=cookies.get('g_idx');
    const [data,loading]=useFetch('http://localhost/guest/my?g_idx='+idx.key);

    const [modalOpen, setModalOpen] = useState(false);
    const modalBackground = useRef();

if(loading){
    return(
        <div>loading</div>
    )
} else {
    let src='';
    let image_url='';
    if (data.dto.g_photo == '-') {
      src='/img/image_no.png';
      image_url=`<img src=${src} width='100px' height='100px'/>`;
    } else {
      src=`http://localhost/static/images/guest/photo/${data.dto.g_photo}`;
      image_url=`<img src=${src} width='100px' height='100px'/>`; 
    }
 return (
    <>
        <div className="container" align='center' style={{position: 'static'}}>
                <div className="row">
                    
                    <div className="col-5">
                    <div className="container-lg">
                            <div style={{paddingLeft: '100px'}}>
                                    <br/>
                                <div class="card-stylee mb-50" >
                                    <div class="container text-center">
                                        <div class="row">
                                            <div class="col">
                                            <span dangerouslySetInnerHTML={{ __html: image_url}}></span>
                                            <h4>{data.dto.g_name}</h4>
                                            <div>게스트</div>
                                            </div>
                                            <div class="col">
                                            <div>후기</div>
                                            <div>몇개</div>
                                            <hr></hr>
                                            <div>sybnb 가입 기간</div>
                                            <div>몇년</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* <div className="col-2">
                                        <span dangerouslySetInnerHTML={{ __html: image_url}}></span>
                                            <h5 align='left'>{data.dto.g_name} 게스트</h5>
                                                <div align='left'></div>
                                    </div>
                                    <div className="col-3">
                                        <hr></hr>
                                    </div> */}
                                    
                                </div>
                                {/* 인증정보구간 */}
                                <div className="card" style={{width: '20rem',height: '14rem'}}>
                                    <div className="card-body" align='left'>
                                        <h4>{data.dto.g_name}님의 인증 정보</h4>
                                        <div style={{lineHeight: '2.6'}}>
                                         <tr>
                                            <td><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{display: 'block', fill: 'none', height: '24px', width: '24px', stroke: 'currentcolor', strokeWidth: '2.66667', overflow: 'visible'}}><path fill="none" d="m4 16.5 8 8 16-16"></path></svg></td>
                                            <td>신분증</td>
                                         </tr>
                                         <tr>
                                            <td><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{display: 'block', fill: 'none', height: '24px', width: '24px', stroke: 'currentcolor', strokeWidth: '2.66667', overflow: 'visible'}}><path fill="none" d="m4 16.5 8 8 16-16"></path></svg></td>
                                            <td>이메일 주소</td>
                                         </tr>
                                         <tr>
                                            <td><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{display: 'block', fill: 'none', height: '24px', width: '24px', stroke: 'currentcolor', strokeWidth: '2.66667', overflow: 'visible'}}><path fill="none" d="m4 16.5 8 8 16-16"></path></svg></td>
                                            <td>전화번호</td>
                                         </tr> 
                                         </div>
                                        <a className="nav-link active">
                                            <div className={"btn-wrapper2"}>
                                                <a className={"modal-open-btn"}
                                                onClick={() => setModalOpen(true)}>본인 인증 절차 자세히 알아보기</a>
                                            </div>
                                            </a>
                                            {modalOpen && (
                                            <div
                                                className={"modal-container3"}
                                                ref={modalBackground}
                                                onClick={(e) => {
                                                if (e.target === modalBackground.current) {
                                                    setModalOpen(false);
                                                }
                                                }}
                                            >
                                                <div className={"modal-content3"}>
                                                    {/* <svg align='left' onClick={() => setModalOpen(false)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{display: 'block', fill: 'none', height: '16px', width: '16px', stroke: 'currentcolor', strokeWidth: '3', overflow: 'visible'}}><path d="m6 6 20 20M26 6 6 26"></path></svg> */}
                                                <h4>본인 인증이란?</h4>
                                                <hr></hr>
                                                <p>'본인 인증' 절차를 거쳤거나 본인 인증 배지를 가지고 있다는 것은 sybnb 본인 인증 절차를 완료하기 위해 정보를 제공했다는 사실만을 의미합니다. 이 절차는 안전 장치를 갖추고 있지만, 누군가의 신원을 보장하지는 않습니다. </p>
                                                </div>
                                            </div>
                                            )}

                                    </div>
                                </div>
                                <br></br><br></br><br></br>
                            </div>
                    </div>
                    </div>
                    <div className="col-7">
                        <div className="container-lg"></div>
                        <div align='left'>
                            <h2>{data.dto.g_name}님 소개</h2>
                            <hr></hr>
                            <h4>내가 작성한 후기</h4>
                        </div> 
                    </div>
                </div>
            </div>
    </>
 )
}
}
export default Profile;
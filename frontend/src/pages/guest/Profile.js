import React, {useCallback,useRef,useEffect,useState} from 'react';
import { ArrowLeftCircle, ArrowRightCircle } from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from 'universal-cookie';
import Slider from "react-slick";
import Slider1 from "react-slick";
import GuestReview from "../guest/GuestReview";
import HostReply from "../guest/HostReply";

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
    const [data1,loading1]=useFetch('http://localhost/guest/reviewcount?g_idx='+idx.key);
    const [data2,loading2]=useFetch('http://localhost/guest/joindate?g_idx='+idx.key);

    const [reviewlist,setReviewList] = useState([]);
    const [replylist,setReplyList] = useState([]);

    const [modalOpen1, setModalOpen1] = useState(false);
    const [modalOpen2, setModalOpen2] = useState(false);
    const [modalOpen3, setModalOpen3] = useState(false);
    const modalBackground = useRef();

    const slickRef = useRef(null);
    const previous = useCallback(() => slickRef.current.slickPrev(), []);
    const next = useCallback(() => slickRef.current.slickNext(), []);

    const slickRef2 = useRef(null);
    const previous2 = useCallback(() => slickRef2.current.slickPrev(), []);
    const next2 = useCallback(() => slickRef2.current.slickNext(), []);

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1, 
        arrows: false
    };

    function getReviewList(url) {
        fetch(url)
        .then(response => {
          return response.json();
        })
        .then(data => {
            setReviewList(data);
        });
    }

    useEffect(() => {getReviewList('http://localhost/guest/review?g_idx='+idx.key);},[]);

    function getReplyList(url) {
        fetch(url)
        .then(response => {
          return response.json();
        })
        .then(data => {
            setReplyList(data);
        });
    }

    useEffect(() => {getReplyList('http://localhost/guest/reply?g_idx='+idx.key);},[]);

    

if(loading||loading1||loading2){
    return(
        <div>loading</div>
    )
} else {
    let src='';
    let image_url='';
    if (data.dto.g_photo === '-') {
      src='/img/image_no.png';
      image_url=`<img class='profile-img' src=${src} width='120px' height='120px' style={{backgroundSize:"contain";}}/>`;
    } else {
      src=`http://localhost/static/images/guest/photo/${data.dto.g_photo}`;
      image_url=`<img class='profile-img' src=${src} width='120px' height='120px' style={{backgroundSize:"contain";}}/>`; 
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
                                            <div class="col" style={{ lineHeight: '2.1'}}>
                                            <span dangerouslySetInnerHTML={{ __html: image_url}}></span>
                                            <h4>{data.dto.g_name}</h4>
                                            <div>게스트</div>
                                            </div>
                                            <div class="col">
                                            <h5>후기</h5>
                                            <div>{data1.dto.reviewcount}개</div>
                                            <hr></hr>
                                            <h5>sybnb 가입 기간</h5>
                                            <div>{data2.dto.joindate}일</div>
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
                                <div className="card" style={{width: '22rem',height: '15.5rem', padding:'0.7rem'}}>
                                    <div className="card-body" align='left'>
                                        <h4>{data.dto.g_name}님의 인증 정보</h4>
                                        <div style={{lineHeight: '2.8'}}>
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
                                                onClick={() => setModalOpen1(true)}>본인 인증 절차 자세히 알아보기</a>
                                            </div>
                                            </a>
                                            {modalOpen1 && (
                                            <div
                                                className={"modal-container3"}
                                                ref={modalBackground}
                                                onClick={(e) => {
                                                if (e.target === modalBackground.current) {
                                                    setModalOpen1(false);
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
                            <h2>{data.dto.g_name} 님 소개</h2>
                            <hr></hr>
                            <h3>{data.dto.g_name} 님에 대한 호스트의 후기</h3>

                            <div align='right'>
                                    <div className="col-6">
                                        <div className="col-1">
                                            <div onClick={previous} style={{cursor:'pointer'}}>
                                                <ArrowLeftCircle size={35} color="#CD9EED" />
                                            </div>
                                        </div>
                                        <div className="col-1"> 
                                            <div onClick={next} style={{cursor:'pointer'}}>
                                                <ArrowRightCircle size={35} color="#CD9EED" />
                                            </div>
                                        </div>
                                    </div>
                                  </div>
                                
                                    <div className="card-style mb-30">
                                        <Slider1 {...settings} ref={slickRef}>
                                            {replylist.map(({G_idx,H_idx,H_profile,H_name,Rp_date,Rp_content}) => (
                                                <HostReply
                                                    key={idx}
                                                    G_idx={G_idx}
                                                    H_idx={H_idx}
                                                    H_name={H_name}
                                                    H_profile={H_profile}
                                                    Rp_date={Rp_date}
                                                    Rp_content={Rp_content}
                                                />
                                            ))}
                                        </Slider1>
                                    </div>

                            
                            <a className="nav-link active">호스트 후기 모두 표시하기
                                <div className={"btn-wrapper2"}>
                                    <a className={"modal-open-btn"}
                                    onClick={() => setModalOpen2(true)}>호스트 후기</a>
                                </div>
                            </a>
                            {modalOpen2 && (
                            <div
                                className={"modal-container3"}
                                ref={modalBackground}
                                onClick={(e) => {
                                if (e.target === modalBackground.current) {
                                    setModalOpen2(false);
                                }
                                }}
                            >
                                <div className={"modal-content3"}>
                                    {/* <svg align='left' onClick={() => setModalOpen(false)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{display: 'block', fill: 'none', height: '16px', width: '16px', stroke: 'currentcolor', strokeWidth: '3', overflow: 'visible'}}><path d="m6 6 20 20M26 6 6 26"></path></svg> */}
                                <h4>본22222</h4>
                                <hr></hr>
                                <p>'본인 인증'22222</p>
                                </div>
                            </div>
                            )}



                            <hr></hr>
                            <h3>내가 작성한 후기</h3>

                            <div align='right'>
                                    <div className="col-6">
                                        <div className="col-1" style={{alignContent:'center'}}>
                                            <div onClick={previous2} style={{cursor:'pointer'}}>
                                                <ArrowLeftCircle size={35} color="#CD9EED" />
                                            </div>
                                        </div>
                                        <div className="col-1" style={{alignContent:'center'}}> 
                                            <div onClick={next2} style={{cursor:'pointer'}}>
                                                <ArrowRightCircle size={35} color="#CD9EED" />
                                            </div>
                                        </div>
                                    </div>
                                  </div>
                                
                                    <div className="card-style mb-30">
                                        <Slider {...settings} ref={slickRef2}>
                                            {reviewlist.map(({G_idx,H_idx,D_img1,Ho_name,Rv_date,Rv_content}) => (
                                                <GuestReview
                                                    key={idx}
                                                    G_idx={G_idx}
                                                    H_idx={H_idx}
                                                    D_img1={D_img1}
                                                    Ho_name={Ho_name}
                                                    Rv_date={Rv_date}
                                                    Rv_content={Rv_content}
                                                />
                                            ))}
                                        </Slider>
                                    </div>

                            <a className="nav-link active">나의 후기 모두 표시하기
                                <div className={"btn-wrapper2"}>
                                    <a className={"modal-open-btn"}
                                    onClick={() => setModalOpen3(true)}>나의 후기</a>
                                </div>
                            </a>
                            {modalOpen3 && (
                            <div
                                className={"modal-container3"}
                                ref={modalBackground}
                                onClick={(e) => {
                                if (e.target === modalBackground.current) {
                                    setModalOpen3(false);
                                }
                                }}
                            >
                                <div className={"modal-content3"}>
                                    {/* <svg align='left' onClick={() => setModalOpen(false)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{display: 'block', fill: 'none', height: '16px', width: '16px', stroke: 'currentcolor', strokeWidth: '3', overflow: 'visible'}}><path d="m6 6 20 20M26 6 6 26"></path></svg> */}
                                <h4>본3333</h4>
                                <hr></hr>
                                <p>모달33333</p>
                                </div>
                            </div>
                            )}
                        </div> 
                    </div>
                </div>
            </div>
    </>
 )
}
}
export default Profile;
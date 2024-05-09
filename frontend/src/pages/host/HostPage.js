import React, {useRef, useEffect, useState} from "react";
import { Check, CheckLg, StarFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import moment from "moment";
import Swal from "sweetalert2";
import Reputation from "./hotelDetailSection/Reputation";

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

function HostPage() {
    const {HoIdx} = useParams();
    const {HIdx} = useParams();
    const [data, loading] = useFetch('http://localhost/host/hotel/hostPage/' + HIdx);
    const [review, rvLoading] = useFetch('http://localhost/api/reputation/list/' + HoIdx);
    
    if(loading){
        return (
            <div className="text-center">로딩 중...</div>
        )
    } else {
        let regdate = moment(data.h_regdate).fromNow();
        let level = '';
        if (data.ho_level == 8){
            level = '호스트';
        } else {
            level = '슈퍼호스트';
        }

        let profile_src = '';
        let profile_url = '';
        if(data.h_profile !== '-'){
            profile_src = `http://localhost/static/images/host/profile/${data.h_profile}`;
            profile_url = `<img src=${profile_src} width='90px' height='90px'/>`;
        } else {
            profile_src = `http://localhost/static/images/no-image.png`;
            profile_url = `<img src=${profile_src} width='70px' height='70px'/>`;
        }
        return (
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        <div className="card-style mb-30">
                            <div className="row">
                                <div className="col-6" style={{textAlign:'center', alignContent:'center'}}>
                                    <div className="mb-20" dangerouslySetInnerHTML={{__html : profile_url}}></div>
                                    <h2 className="mb-10">{data.h_name}</h2>
                                    <h6>{level}</h6>
                                </div>
                                <div className="col-6">
                                    <div>후기</div>
                                        <strong>{data.review_cnt}</strong>개
                                    <br />
                                    <hr />
                                    <div>평점</div>
                                        <strong>{data.star}</strong> <StarFill />
                                    <br />
                                    <hr />
                                    <div>호스팅 경력</div>
                                    <strong>{regdate}</strong>
                                </div>
                            </div>
                        </div>
                        <div className="card-style mb-30">
                            <h4 className="mb-30">{data.h_name} 님의 인증 정보</h4>
                            {
                                data.h_profile != '-'
                                ?
                                <div className="mb-10">
                                    <CheckLg size={27} />
                                    　사업자등록증
                                </div>
                                : ''
                            }
                            {
                                data.h_phone != '-'
                                ?
                                <div className="mb-10">
                                    <CheckLg size={27} />
                                    　전화번호
                                </div>
                                : ''
                            }
                        </div>
                    </div>
                    <div className="col-6">
                        <h2>{data.h_name} 님 소개</h2>
                        <hr />
                        <h4 className="mt-20 mb-20">{data.h_name} 님의 후기</h4>
                        <div className="card-style mb-30">
                            
                        </div>
                        후기 {data.review_cnt}개 모두 표시하기

                        <hr />
                        <h4 className="mt-20 mb-20">{data.h_name} 님의 숙소·체험</h4>
                    </div>
                </div>
            </div>
        )
    }
};

export default HostPage;
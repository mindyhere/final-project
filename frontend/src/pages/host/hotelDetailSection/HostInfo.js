import React, {useRef, useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import moment from "moment";
import "moment/locale/ko";

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

function HostInfo() {
    const {HoIdx} = useParams();
    const [data, loading] = useFetch('http://localhost/host/hotel/hostInfo/' + HoIdx);
    if(loading){
        return (
            <div className="text-center">로딩 중...</div>
        )
    } else {
        let regdate = moment(data.h_regdate).fromNow();
        let level = '';
        let answer = '';
        if (data.ho_level == 8){
            level = '호스트';
            answer = '80%';
        } else {
            level = '슈퍼호스트';
            answer = '100%';
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
            <div>
                <div className="card-style" style={{backgroundColor : "#F6F2F9"}}>
                    <div className="row">
                        <div className="col-6">
                            <div className="card-style">
                                <div className="row">
                                    <div className="col-6 text-center">
                                        <span dangerouslySetInnerHTML={{__html : profile_url}}></span>
                                        <br />
                                        <h2>{data.h_name}</h2><br />
                                        <h6>{level}</h6>
                                    </div>
                                    <div className="col-6">
                                        <div className="text-xs">후기</div>
                                        15개
                                        <br />
                                        <hr />
                                        <div className="text-xs">평점</div>
                                        {}
                                        <br />
                                        <hr />
                                        <div className="text-xs">호스팅 경력</div>
                                        {regdate}
                                    </div>
                                </div>
                            </div>
                            <br />
                            <p><a href="/guest/mypage" style={{color: 'black', textDecorationLine: 'none'}}>더 보기 ▶</a></p>
                        </div>
                        <div className="col-6">
                            <h4>{data.h_name}님은 {level}입니다.</h4>
                            <span className="mb-40">
                            {data.h_description}
                            </span>
                            <h5>호스트 상세 정보</h5> <br />
                            응답률 : {answer} <br />
                            1시간 이내에 응답
                            <br />
                            <button type="button" onClick={() => {
                                Swal.fire({
                                    title: '나중에 URL 연결',
                                    showCancelButton: false,
                                    confirmButtonText: '확인',
                                });
                            }}
                            className="btn btn-dark">호스트에게 메시지 보내기</button>
                            <hr />
                            <div className="text-xs">
                                <img src="/img/danger.png" width="35px" height="35px"/> 안전한 결제를 위해 사이트 외부에서 송금하거나 대화를 나누지 마세요.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

export default HostInfo;
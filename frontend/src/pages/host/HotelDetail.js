import React, {useRef, useEffect, useState} from "react";
import KakaoMap from "../../component/KakaoMap";
import HotelDescription from "./hotelDetailSection/HotelDescription";
import HotelRooms from "./hotelDetailSection/HotelRooms";
import HostInfo from "./hotelDetailSection/HostInfo";
import HotelRule from "./hotelDetailSection/HotelRule";
import HotelAmenities from "./hotelDetailSection/HotelAmenities";
import Reservation from "./hotelDetailSection/Reservation";
import Reputation from "./hotelDetailSection/Reputation";

import { StarFill } from "react-bootstrap-icons";
import { useParams } from "react-router-dom";
import { addDays} from "date-fns";
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

function HotelDetail() {
    const {HoIdx} = useParams();
    const [data, loading] = useFetch('http://localhost/host/hotel/hotelDetail/' + HoIdx);
    const [review, loading2] = useFetch('http://localhost/api/reputation/list/' + HoIdx);
    const [modal, setModal] = useState(false);
    const element = useRef<HTMLDivElement>(null);
    const onMoveBox = () => {
        element.current?.scrollIntoView({behavior : "smooth", block:"start"});
    }
    const hostInfoForm = useRef();
    const moveToHostInfo = () => {
        hostInfoForm.current.scrollIntoView({behavior : 'smooth', block : 'start'});
    };

    useEffect(() => {
        var myArr = localStorage.getItem('watched');
        if(myArr == null) {
            myArr = [];
        } else {
            myArr = JSON.parse(myArr);
        }
        myArr.push(HoIdx);
        myArr = new Set(myArr);
        myArr = [...myArr];
        localStorage.setItem('watched', JSON.stringify(myArr));
    }, []);

    if(loading || loading2){
        return (
            <div className="text-center">로딩 중...</div>
        )
    } else {
        let regdate = moment(data.h_regdate).fromNow();
        let level = '';
        let answer = '';
        if (data.ho_level == 8){
            level = '호스트';
            answer = '85%';
        } else {
            level = '슈퍼호스트';
            answer = '100%';
        }
        let src = '';
        let img_url = '';
        if(data.ho_img !== '-'){
            src = `http://localhost/static/images/host/hotel/${data.ho_img}`;
            img_url = `<img src=${src} width='600px' height='300px'/>`;
        } else {
            img_url = '';
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
                <div className="row justify-content-between">
                    <div className="col-9">
                        <h2>{data.ho_name}</h2>
                    </div>
                    <div className="col-3">
                    <img src="/img/share.png" width="20px" height="20px"/> <a href="" style={{color:'black'}}>공유하기</a> | ♡ wish
                    </div>
                </div>
                <br />
                <div className="row mb-30">
                    <div className="card-style">
                        <span dangerouslySetInnerHTML={{__html : img_url}}></span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-8">
                        <div>
                            <h3>{data.ho_address}</h3>
                            <div>최대 인원 {data.d_capacity}명 · 침대 {data.d_beds}개 · 면적 {data.d_area}㎡</div>
                            <br />
                            <div>                            
                                {
                                    level === '슈퍼호스트'
                                    ? <div className="card-style" style={{textAlign:'center'}}>
                                        <div className="row">
                                            <div className="col-3">
                                                <div className="row">
                                                    <h5>별점</h5>
                                                </div>
                                               <span>
                                                    <StarFill /> {review.avg}
                                              </span>
                                            </div>
                                            <div className="col-5" style={{alignContent:'center'}}>
                                                <div className="row">
                                                    <span>
                                                        <img src="/img/best.png" width="35px" height="35px"/>
                                                        <strong>게스트 선호</strong>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="col-4">
                                                <div className="row">
                                                    <h5>후기</h5>
                                                </div>
                                                <span>
                                                    {review.list.length} 개
                                                </span>
                                            </div>
                                        </div>
                                     </div>
                                    : <div> </div>
                                }
                            </div>
                            <br />
                            <div className="row">
                                <div className="col-3" style={{textAlign : 'center'}} dangerouslySetInnerHTML={{__html : profile_url}}></div>
                                <div className="col-9" style={{alignSelf : 'center'}}>
                                  
                                    <div><b> 호스트 : {data.h_name}님 </b></div>
                                    <div>{level} · 호스팅 경력 {regdate}</div>

                                </div>
                            </div>
                            <hr />
                            <h4 className="mb-20">숙소 소개</h4>
                                <div>
                                    <HotelDescription />
                                </div>
                            <hr />
                            <h4 className="mb-20">선택 가능한 객실 유형</h4>
                                <div> 
                                    <HotelRooms />
                                </div>
                            <hr />
                            <h4 className="mb-20">숙소 편의시설</h4>
                                <HotelAmenities />
                            <hr />
                            <h4>
                                {data.ho_name}에서 
                            </h4>
                            <div>
                                {/* <DateRangeSelector/> */}
                                </div>
                            <hr />
                            <h4>숙소 후기</h4>
                            <br/>
                            <div>
                                <Reputation />
                            </div>
                            <hr />
                            <h4>숙소 위치</h4>
                            <div>{data.ho_address}
                            <br />
                                <KakaoMap />
                                </div>
                            <hr />
                            <h4 useRef={hostInfoForm} className="mb-30">호스트 소개</h4>
                             <HostInfo />
                            <hr />
                            <h4 className="mb-20">알아두어야 할 사항</h4>
                            <div>
                                <HotelRule />
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-4">
                        <Reservation />
                    </div>
                </div>
            </div>
        )
    }
};

export default HotelDetail;
import React from 'react';
//import moment from 'moment';
import { useNavigate } from "react-router";

function GuestReview({G_idx,H_idx,D_idx,Ho_idx,Rv_idx,H_profile,H_name,Ho_name,D_img1,Rv_date,Rv_content}) {
    let loading = false;
    const navigate = useNavigate();
    //const url = `http://localhost/static/images/host/profile/${H_profile}`;
    const url = `http://localhost/static/images/host/hotel/${D_img1}`;
    //const date = new Date();
    //let rv = Rv_date;
    //rv = moment(date).format('YYYY년 MMMM Do');

    // 리뷰수정 데이터 이동 test
    const info = {
        // 전달할 데이터
        rv_idx: `${Rv_idx}`,
        g_idx: `${G_idx}`,
    };

    const openPopup = () => {
        const popup = window.open(
            `./edit`,
            "name(Edit)",
            "width=500,height=730,left=300,top=100,toolbar=no,scrollbars=no,resizable=yes"
        );
        return popup;
    }; // ... test 여기까지

    if (loading) {
        return (
            <div>로딩 중...</div>
        )
    } else {
        let profile = "";
        if (D_img1 !== "") {
          //const url = `http://localhost/static/images/guest/profile/${g_url}`;
          profile = `<img class='profile-img' src=${url} width='60px' height='60px' style={{backgroundSize:"contain";}} />`;
        } else {
          profile =
            "<img class='profile-img' src='http://localhost/static/images/no-image.png' width='60px' height='60px'/>";
        }
        return (
            <div className='container'>
                <div className='row row-cols-2'>
                    
                    <div className='col-12' style={{height:'90px', wordBreak : 'break-all'}}>{Rv_content}</div>
                    <br />
                    <div className="col-2" dangerouslySetInnerHTML={{__html: profile}} onClick={() => navigate(`/host/hotel/hotelDetail/${Ho_idx}/${D_idx}`)}></div> 
                    <div className="col-10">
                        <strong>{Ho_name}</strong><br />
                        {Rv_date}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <div className='btn btn-outline-dark' type='button' align='right' 
                            onClick={() => {
                            localStorage.setItem("info", JSON.stringify(info));
                            console.log("==> 확인?"+Rv_idx)
                           openPopup();
                        }
                    }>수정하기</div>
                    </div>
                    
                </div>
            </div>
        )
    }
};

export default GuestReview;
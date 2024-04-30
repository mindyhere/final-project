import React,{useRef} from 'react';
import {Link, useNavigate} from "react-router-dom";

function HotelItem({HoIdx,HoName, HoImg}) {
    let loading = false;
    const url = `http://localhost/static/images/host/hotel/${HoImg}`;
    //const url = `../img/${HoImg}`;
    const navigate = useNavigate();

    if (loading) {
        return (
            <div>loading...</div>
        )
    } else {
        let img = '';
        if (HoImg != null) {
            img = `<img src=${url} width='330px' height='330px' /><br />`;
        }

        return (
            <div style={{ margin: '5px'}}>
                <span dangerouslySetInnerHTML={{__html: img}}></span>
                    <Link to={`/host/hotel/hotelDetail/${HoIdx}`}> 
                        <div style={{fontSize:"23px"}}>{HoName}</div>
                            ₩68,717 /박
                    </Link>
                <br />
                &nbsp;
            </div>
        )
    }
}
export default HotelItem;
import React,{useRef} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";

function HotelItem({HoIdx,HoName, HoImg}) {
    const dIdx = 1;
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
            img = `<img src=${url} width='380px' height='380px' /><br />`;
        }

        return (
            <div style={{ margin: '5px',paddingLeft: '100px'}}>
                <span dangerouslySetInnerHTML={{__html: img}}></span>
                    <Link to={`/host/hotel/hotelDetail/${HoIdx}/${dIdx}`}> 
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
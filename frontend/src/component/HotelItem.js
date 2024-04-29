import React,{useRef} from 'react';
import {Link, useNavigate} from "react-router-dom";

function HotelItem({HoIdx,HoName, HoImg}) {
    let loading = false;
    //const url = `http://localhost/images/${HoImg}`;
    const url = `../img/${HoImg}`;
    if (loading) {
        return (
            <div>loading...</div>
        )
    } else {
        let img = '';
        if (HoImg != null) {
            img = `<img src=${url} width='350px' height='350px' /><br />`;
        }
        return (
            <div style={{ margin: '5px'}}>
                <span dangerouslySetInnerHTML={{__html: img}}></span>
                    <Link to={`/guest/main`}> 
                       <div style={{fontSize:"25px"}}>{HoName}</div>
                        ₩68,717 /박
                    </Link>
                <br />
                &nbsp;
                    <button type='button' className='btn btn-outline-dark'>▷</button>
            </div>
        )
    }
}
export default HotelItem;
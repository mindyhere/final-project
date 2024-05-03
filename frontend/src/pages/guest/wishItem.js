import React,{useRef} from 'react';
import {Link, useNavigate} from "react-router-dom";
import './aa.css'

function WishItem({HoIdx, HoName, HoImg, wIdx}) {
    let loading = false;
    const url = `http://localhost/static/images/host/hotel/${HoImg}`;
    

    if (loading) {
        return (
            <div>loading...</div>
        )
    } else {
        let img = '';
        if (HoImg != null) {
            img = `
           <img src=${url} width='330px' height='330px' class="wish" /><br />`;
        }

        return (
            <div style={{ margin: '5px', paddingLeft: '30px'}} >
                
                <div id="Img" style={{position: 'relative'}}>
                <Link to={`/host/hotel/hotelDetail/${HoIdx}`} style={{textDecorationLine: 'none'}}>
                <span dangerouslySetInnerHTML={{__html: img}}></span>
                
                    <div style={{fontSize:"20px", color: 'black'}}>{HoName}</div>
                    <input type="hidden" value={wIdx}></input>
                    
                    </Link>
                    <button type='button' class="wish-button" onClick={() => {window.location.href='/'}}>
                    <img src='/img/black_heart.png' width='28px' height='35px'/>
                </button>
                <br />
                &nbsp;
                </div>
            </div>
            
        )
    }
}
export default WishItem;
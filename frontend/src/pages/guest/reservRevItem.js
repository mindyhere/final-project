import React,{useRef} from 'react';
import {Link, useNavigate} from "react-router-dom";

function ReservRevItem({OIdx, HoName, HoImg, OCkin, OCkout, HName}) {
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
            img = `<img src=${url} width='80px' height='80px' /><br />`;
        }

        return (
            <>
            <div style={{width: '600px', marginBottom:'50px', height:'50px', float: "left", marginLeft: '10px'}}>
            <Link to={``}>
            <div style={{float: "left", width: "120px", marginTop: '5px'}}>
                <span dangerouslySetInnerHTML={{__html: img}}></span>
            </div>
            <div style={{float: "left", width: "200px", height: "50px"}}>
                <p style={{marginTop:'15px',fontSize: "20px", color: 'black', height: '20px'}}>{HoName}</p>
                <p style={{fontSize:"15px", color: 'black', height: '20px'}}>{OCkin}~{OCkout}</p>
                <br/>
                <input type='hidden' value={OIdx}></input>
            </div>  
            <div style={{width: "50px", marginLeft: '330px'}}>
                <img src='/img/review.png' width='30px' height='30px' style={{marginTop:'28px'}}></img>
            </div>
            </Link>
            </div>              
            </>
        )
    }
}
export default ReservRevItem;
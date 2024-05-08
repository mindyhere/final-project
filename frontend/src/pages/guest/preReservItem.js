import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import './aa.css'


function PreReservItem({HoIdx, HoName, HoImg, OCkin, OCkout, HName, HoAddress}) {
    let loading = false;
    const url = `http://localhost/static/images/host/hotel/${HoImg}`;
    const navigate = useNavigate(); 
    
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    if (loading) {
        return (
            <div>loading...</div>
        )
    } else {
        let img = '';
        if (HoImg != null) {
            img = `
           <img src=${url} width='250px' height='250px' class="wish" /><br />`;
        }

        return (
            <div class="card-reserv" >
                        <div style={{float: "left", width: "300px"}}>
                            <p style={{fontSize: "30px", color: 'black'}}>{HoName}</p>
                            <p style={{fontSize:"20px", color: 'black'}}>{OCkin}~{OCkout}</p>
                            <br/>
                            <p style={{fontSize: "25px"}}>{HName}</p>
                            <p style={{fontSize: "20px"}}>{HoAddress}</p>
                            <input type='hidden' value={HoIdx}></input>
                        </div>    
                        <div style={{float: "left", width: "300px"}}>
                            <span dangerouslySetInnerHTML={{__html: img}}></span>
                        </div>

                </div>
            
        )
    }
}
export default PreReservItem;
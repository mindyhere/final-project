import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import './aa.css'


function PreReservItem({OIdx, HoName, HoImg, OCkin, OCkout, HName, HoAddress}) {
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
           <img src=${url} width='250px' height='250px' class="wish" /><br />`;
        }

        return (
            <Link to={`/guest/preReservDetail/${OIdx}`}>
           <div class="card-reserv" >
                        <div style={{float: "left", width: "300px"}}>
                            <p style={{fontSize: "30px", color: 'black'}}>{HoName}</p>
                            <p style={{fontSize:"20px", color: 'black'}}>{OCkin}~{OCkout}</p>
                            <br/>
                            <p style={{fontSize: "25px", color: 'black' }}>{HName}</p>
                            <p style={{fontSize: "20px", color: 'black' }}>{HoAddress}</p>
                            <input type='hidden' value={OIdx}></input>
                        </div>    
                        <div style={{float: "left", width: "300px"}}>
                            <span dangerouslySetInnerHTML={{__html: img}}></span>
                        </div>

               </div>
               </Link>
            
        )
    }
}
export default PreReservItem;
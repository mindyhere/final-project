import React,{useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import Cookies from "universal-cookie";

function HotelItem({HoIdx,HoName, HoImg, check}) {
    const dIdx = 1;
    const cookies = new Cookies();
    const idx = cookies.get('g_idx');
    let loading = false;
    const url = `http://localhost/static/images/host/hotel/${HoImg}`;
    //const url = `../img/${HoImg}`;
    const navigate = useNavigate();
    const [image, setImage] = useState(""); 
    

    const handleClick = () => {
        const form = new FormData();
        form.append('g_idx', idx.key);
        form.append('h_idx', HoIdx);
        if (check == 1) {
            fetch('http://localhost/guest/wish/wishDelete', {
                method: 'post',
                body: form,
            }).then((response) => response.json())
            .then(data => {
                if(data.result == 'success') {
                    window.location.href='/';
                }
            })
            setImage("/img/heart.png");
        } else {
            fetch('http://localhost/guest/wish/wishUpdate', {
                method: 'post',
                body: form,
            }).then((response) => response.json())
            .then(data => {
                if(data.result == 'success') {
                    window.location.href='/';
                }
            })
            setImage("/img/black_heart.png");
        }
    }
    
    useEffect(() => {
        if (check == 1) {
            setImage("/img/black_heart.png");
        } else if (check == 0) {
            setImage("/img/heart.png");
        } else {
            setImage('');
        }
    })

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
                <div id="Img" style={{position: 'relative'}}>
                <span dangerouslySetInnerHTML={{__html: img}}></span>
                    <Link to={`/host/hotel/hotelDetail/${HoIdx}/${dIdx}`}> 
                        <div style={{fontSize:"23px"}}>{HoName}</div>
                            ₩68,717 /박
                    </Link>
                    {check == null ? '' :
                    <button type='button' style={{border: 0, backgroundColor: 'transparent', position: 'absolute', 
                    top:'20px', left:'320px'}} onClick={() => {handleClick()}}>
                    <img src={image} width='28px' height='35px' />
                    </button>
                    }
                <br />
                &nbsp;
                </div>
            </div>
        )
    }
}
export default HotelItem;
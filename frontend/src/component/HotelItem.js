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
    const [checkId, setCheckId] = useState(0);

    const handleClick = () => {
        const form = new FormData();
        form.append('g_idx', idx.key);
        form.append('h_idx', HoIdx);
        if (check === 1) {
            fetch('http://localhost/guest/wish/wishDelete', {
                method: 'post',
                body: form,
            }).then((response) => response.json())
            .then(data => {
                if(data.result === 'success') {
                   setCheckId(0);
                }
            })
        } else {
            fetch('http://localhost/guest/wish/wishUpdate', {
                method: 'post',
                body: form,
            }).then((response) => response.json())
            .then(data => {
                if(data.result == 'success') {
                    setCheckId(1);
                }
            })
        }
    }
    
    useEffect(() => {
        if (check === 1) {
            setCheckId(1);
        } else if (check === 0) {
            setCheckId(0);
        } else {
        }
    }, [])

    useEffect(() => {
        if (checkId === 1) {
            setImage("/img/black_heart.png");
        } else if (checkId === 0) {
            setImage("/img/heart.png");
        } else {
            setImage('');
        }   
    }, [checkId])

    if (loading) {
        return (
            <div>loading...</div>
        )
    } else {
        let img = '';
        if (HoImg !== null) {
            img = `<img src=${url} width='380px' height='380px' /><br />`;
        }

        return (
            <div style={{ margin: '5px',paddingLeft: '100px'}}> 
                <div id="Img" style={{position: 'relative'}}>
                <Link to={`/host/hotel/hotelDetail/${HoIdx}/${dIdx}`}>
                <span dangerouslySetInnerHTML={{__html: img}}></span>
                        <div style={{fontSize:"23px"}}>{HoName}</div>
                            ₩68,717 /박
                            </Link>           
                    <button type='button' style={{border: 0, backgroundColor: 'transparent', position: 'absolute', 
                    top:'8px', left:'295px'}} onClick={() => {handleClick()}}>
                    <img src={image} width='70px' height='70px' />
                    </button>
                    <input type='hidden' id={checkId} value={check}></input>
                <br />
                </div>
                    
            </div>
        )
    }
}
export default HotelItem;
import React,{useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import Cookies from "universal-cookie";

function HotelItem({HoIdx,HoName, HoImg, check, Dprice,Didx,Dimg1,Dimg2,Dimg3,Star}) {
    const cookies = new Cookies();
    const idx = cookies.get('g_idx');
    let loading = false;
    const url = `http://localhost/static/images/host/hotel/${HoImg}`;
    //const url = `../img/${HoImg}`;
    const navigate = useNavigate();
    const [image, setImage] = useState(""); 
    const [checkId, setCheckId] = useState(2);

    const handleClick = () => {
        const form = new FormData();
        form.append('g_idx', idx.key);
        form.append('h_idx', HoIdx);
        if (checkId === 1) {
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
            <div style={{ margin: '5px',paddingLeft: '100px',maxWidth:'480px'}}> 
                <div id="Img" style={{position: 'relative'}}>
                <Link to={`/host/hotel/hotelDetail/${HoIdx}/${Didx}`}>
                    <span dangerouslySetInnerHTML={{__html: img}}></span>
                    <div>
                        <div class="row">
                            <div class="col" style={{fontSize:"27px",whiteSpace:'nowrap'}}>
                            {HoName}
                            </div>
                            <div class="col" style={{fontSize:"17px"}} align='right'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{display: 'inline', height: '15px', width: '15px', fill: 'currentcolor'}}><path fill-rule="evenodd" d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"></path></svg>&nbsp;{Star}
                            </div>
                        </div>
                    </div>
                    <div style={{fontSize:"17px"}}>₩{Dprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}&nbsp;/박</div>
                </Link>
                    {checkId == 2 
                    ? 
                    '' 
                    : 
                    <button type='button' style={{border: 0, backgroundColor: 'transparent', position: 'absolute', 
                    top:'8px', left:'295px'}} onClick={() => {handleClick()}}>
                    <img src={image} width='70px' height='70px' />
                    </button>
                    }
                    <input type='hidden' id={checkId} value={check}></input>
                <br />
                </div>
                    
            </div>
        )
    }
}
export default HotelItem;
import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import '../modalH.css'

function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {
            setData(data);
            setLoading(false);
        })
    }, []);
    return [data, loading];
}

function HotelAmenities() {
    const {HoIdx} = useParams();
    const [modal, setModal] = useState(false);
    const [data, loading] = useFetch('http://localhost/host/hotel/hotelAmenity/' + HoIdx);
    console.log(data);
    
    if(loading){
        return (
            <div className="text-center">로딩 중...</div>
        )
    } else {
        let mountain_url = '';
        if(data.mountain_view == 'Y'){
            mountain_url = `<img src="../" width='600px' height='300px'/>`;
        } else {
            mountain_url = '';
        }

        return (
            <div onClick={() => setModal(true)}>
                <div className="hidden-text-target mb-10">
                
                </div>
                <div>
                    <button type="button" className="main-btn">편의시설 모두보기</button>
                </div>
                { modal &&
                    <div className='Modal' onClick={() => setModal(false)} style={{zIndex : 999}}>
                        <div className='modalBody' onClick={(e) => e.stopPropagation()}>
                            <button id = 'modalCloseBtn' onClick={() => setModal(false)}>
                                X
                            </button>
                            <div className="container" style={{whiteSpace: 'pre-wrap', textAlign:'center'}}>
                                <span dangerouslySetInnerHTML={{__html : mountain_url}}></span>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
};

export default HotelAmenities;
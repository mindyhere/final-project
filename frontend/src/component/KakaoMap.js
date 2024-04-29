/* global kakao */
import React, { useRef, useEffect, useState} from "react";
const {kakao} = window;

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

function KakaoMap(){
    const mapRef = useRef([]);
    const [data, loading] = useFetch('http://localhost/host/hotel/hotelDetail');
    useEffect(() => {
        const container = mapRef.current;
        const options= {
            center: new kakao.maps.LatLng(37.566826, 126.9786567),
            //center: new kakao.maps.LatLng(data.ho_x, data.ho_y),
            level : 3
        };
        const map = new kakao.maps.Map(container, options);
    }, []);

    if(loading){
        return (
            <div className="text-center">로딩 중...</div>
        )
    } else {
        return (
            <article>
                <div style={{
                    width : '80vw',
                    height:'50vh'
                }} ref={mapRef}></div>
            </article>
        )
    }
}

export default KakaoMap;
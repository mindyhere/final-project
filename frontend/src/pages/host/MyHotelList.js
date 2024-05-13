import React, { useEffect, useState} from "react";

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

function MyHotelList() {
    const [data, loading] = useFetch('http://localhost/host/hotel/hostPage/');

    if(loading){
        return (
            <div className="text-center">로딩 중...</div>
        )
    } else {
        return (
            <div className="container">
                <div>
                    ㅇㅇㅇ님 안녕하세요! <br />
                    숙소 등록을 시작해볼까요?
                </div>
                
                

            </div>
        )
    }
};

export default MyHotelList;
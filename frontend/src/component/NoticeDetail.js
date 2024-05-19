import React, { useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

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

function NoticeDetail() {
    const location = useLocation();
    const nidx = location.state.nidx;
    console.log("nidx==="+nidx);

    const [data, loading] = useFetch('http://localhost/main/noticedetail/'+nidx);

    if(loading){
        return(
            <div>loading</div>
        )
    } else {
        return (
            <>
                <div className="container min-vh-100">
                            <h3 className="text-bold">
                            <img style={{width:'57px', height:'57px'}}src='/img/notice.png'></img>&nbsp;공지사항</h3>
                            <br/>
                            <div className="card-stylee mb-30" align='center'>
                                <h3>{data.dto.n_title}</h3>
                                <hr></hr>
                                <div align='right'>{data.dto.n_date}</div>
                                <div align='right'>작성자 : {data.dto.n_writer}</div>
                                <div>{data.dto.n_content}</div>
                            </div>
                    </div>
            </>
        )
    }
}
export default NoticeDetail;
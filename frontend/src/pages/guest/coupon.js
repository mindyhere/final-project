import React, {useEffect,useState} from 'react';
//import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from 'universal-cookie';
//import Swal from "sweetalert2";

function useFetch(url) {
    const [data,setData] = useState(null);
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        fetch(url)
            .then(response=>{
                return response.json();
            })
            .then(data=>{
                setData(data);
                setLoading(false);
            })
    }, []);
    return [data,loading];
}

function Coupon() {

    const cookies = new Cookies();
    const idx=cookies.get('g_idx');
    const [data,loading]=useFetch('http://localhost/guest/my?g_idx='+idx.key);

    if(loading){
        return(
            <div>loading</div>
        )
    } else {
        return (
            <>
            <div className="container" align='center' style={{position: 'static'}}>
                <div className="row">
                    
                    <div className="col-8">
                    <div className="container-lg">
                            <div style={{paddingLeft: '100px'}}>
                                <div align='left'>
                                    <h2>쿠폰 및 포인트</h2>
                                </div>
                                    <br/>
                                <div class="card-stylee mb-30" >
                                    <h5 align='left'>포인트</h5>
                                        <div align='left'>Point : {data.dto.g_point}</div>
                                    <h5 align='left'>쿠폰</h5>
                                        <div align='left' style={{fontSize: '10px'}}>* 보유하고 있는 쿠폰목록</div>
                                </div>
                            </div>
                    </div>
                    </div>
                </div>
            </div>
            </>
        )
    }
}
export default Coupon;
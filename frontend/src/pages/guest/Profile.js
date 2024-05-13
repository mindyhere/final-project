import React, {useEffect,useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from 'universal-cookie';

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

function Profile() {
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
                    
                    <div className="col-5">
                    <div className="container-lg">
                            <div style={{paddingLeft: '100px'}}>
                                <div align='left'>
                                    <h2>{data.dto.g_name}님 소개</h2>
                                </div>
                                    <br/>
                                <div class="card-stylee mb-30" >
                                    <h5 align='left'>{data.dto.g_name}</h5>
                                        <div align='left'></div>
                                    
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
export default Profile;
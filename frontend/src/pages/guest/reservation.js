import Cookies from "universal-cookie";
import '../../asset/css/user.css';
import React,{useRef,useEffect,useState} from 'react';
import PreReservItem from "./preReservItem";
import LastReservItem from "./lastReservItem";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";





function Reservation() {
    const cookies = new Cookies();
    const idx = cookies.get('g_idx');
    const photo = cookies.get('g_photo');

    // const [data, loading] = useFetch('http://localhost/guest/reserv?g_idx='+idx.key);
    const [reservList, setReservList] = useState([]);
    const [lastReservList, setLastReservList] = useState([]);
    const idxx = photo.key;
    console.log(idxx);

    function getReserv(url) {
        const form = new FormData();
        form.append('g_idx', idx.key);
        fetch(url, { method: 'post', body: form })
        .then(response => {
          return response.json();
    })
    .then(data => {
        setReservList(data.after);
        setLastReservList(data.before);
    })
  }

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
};

  useEffect(() => {getReserv('http://localhost/guest/reserv/list');},[]);
  
    
        return (
            <>

                 <div className="container min-vh-100">
                 <h3 class="text-bold"> <img src="/img/info.png" width="35px" height="35px"/>
                &nbsp; 여행</h3>
                <br/>
                <br/>
                <div style={{width: "650px"}}>
                <h4>예정된 예약</h4>
                <br/>
                
                <Slider {...settings}>
                    {reservList.map(
                    ({OIdx, HoName, HoImg, OCkin, OCkout, HName, HoAddress})=>(
                        <PreReservItem
                        OIdx={OIdx}
                        HoName={HoName}
                        HoImg={HoImg}
                        OCkin={OCkin}
                        OCkout={OCkout}
                        HName={HName}
                        HoAddress={HoAddress}
                        />
                    )
                )} 
                </Slider>
                </div> 

                <div style={{marginTop: "50px"}}>
                    <h4>이전 예약</h4>
                    <br/>
                    <div style={{alignContent: 'center', alignItems: 'center'}}>
                    <div style={{
                        display:'grid',
                        gridTemplateRows:'1fr',
                        gridTemplateColumns:'1fr 1fr 1fr',
                    }}>
                    {lastReservList.map(
                    ({OIdx, HoName, HoImg, OCkin, OCkout, HName})=>(
                        <LastReservItem
                        OIdx={OIdx}
                        HoName={HoName}
                        HoImg={HoImg}
                        OCkin={OCkin}
                        OCkout={OCkout}
                        HName={HName}
                        />
                    )
                )} 
      </div>
      </div>
                </div>
                 </div>
            </>
        )
    
}


export default Reservation;
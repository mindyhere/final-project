import Cookies from "universal-cookie";
import '../../asset/css/user.css';
import React,{useRef,useEffect,useState} from 'react';
import PreReservItem from "./preReservItem";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Reservation() {
    const cookies = new Cookies();
    const idx = cookies.get('g_idx');
    // const [data, loading] = useFetch('http://localhost/guest/reserv?g_idx='+idx.key);
    const [reservList, setReservList] = useState([]);

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    function getReserv(url) {
        const form = new FormData();
        form.append('g_idx', idx.key);
        fetch(url, { method: 'post', body: form })
        .then(response => {
          return response.json();
    })
    .then(data => {
        setReservList(data);
    })
  }

  useEffect(() => {getReserv('http://localhost/guest/reserv/list');},[]);
  
    
        return (
            <>

                 <div className="container min-vh-100">
                 <h3 class="text-bold"> <img src="/img/info.png" width="35px" height="35px"/>
                &nbsp; 여행</h3>
                <br/>
                <br/>
                <h4>예정된 예약</h4>
                <br/>
                <div>
                <Slider {...settings}>
                {reservList.map(
                ({HoIdx, HoName, HoImg, OCkin, OCkout, HName, HoAddress})=>(
                    <PreReservItem
                      HoIdx={HoIdx}
                      HoName={HoName}
                      HoImg={HoImg}
                      OCkin={OCkin}y
                      OCkout={OCkout}
                      HName={HName}
                      HoAddress={HoAddress}
                    />
                   
                )
            )} 
            </Slider>
            </div>
                <br/>
                <h4>이전 예약</h4>
                 </div>
            </>
        )
    
}

export default Reservation;
import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import HotelRoomsItem from "../../../component/HotelRoomsItem";

function HotelRule() {
    const {HoIdx} = useParams();
    const [list,setItemList] = useState([]);
  
    function getItem(url) {
      fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setItemList(data);
      })
    }

    useEffect(() => {getItem('http://localhost/host/hotel/hotelRooms/' + HoIdx);},[]);

    return (
        <div style={{
            display:'grid',
            gridTemplateRows:'1fr',
            gridTemplateColumns:'1fr 1fr 1fr',
        }}>
        {list.map(
                    ({DIdx, DRoomType, DImg1})=>(
                        <HotelRoomsItem
                        DIdx={DIdx}
                        DRoomType={DRoomType}
                        DImg1={DImg1}
                        key={DIdx}
                        />
                    )
                )}
        </div>
    )
};

export default HotelRule;
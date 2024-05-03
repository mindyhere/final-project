import React, {useRef,useEffect,useState} from 'react';
import WishItem from './wishItem';
import Cookies from "universal-cookie";

function WishList() {
    const cookies = new Cookies();
    const [wishList, setWishList] = useState([]);
    const idx = cookies.get('g_idx');
    
    function getWish(url) {
        fetch(url)
        .then(response => {
          return response.json();
    })
    .then(data => {
        setWishList(data);
    })
  }
    
    useEffect(() => {getWish(`http://localhost/guest/info/wish?g_idx=${idx.key}`);},[]);
    return (
        <>
        <div className="container min-vh-100">
            <h3 class="text-bold"> <img src="/img/heartt.png" width="30px" height="30px"/>
            &nbsp; 위시리스트</h3>
            <br/>
            <hr/>
            <br/>
            <div style={{alignContent: 'center', alignItems: 'center'}}>
            <div style={{
                display:'grid',
                gridTemplateRows:'1fr',
                gridTemplateColumns:'1fr 1fr 1fr',
      }}>
      {wishList.map(
                ({HoImg,HoName,HoIdx,wIdx})=>(
                    <WishItem
                      HoIdx={HoIdx}
                      HoName={HoName}
                      HoImg={HoImg}
                      wIdx={wIdx}
                    />
                )
            )}
      </div>
      </div>
      </div>
        </>
    )

}

export default WishList;
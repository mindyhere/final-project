import React,{useRef} from 'react';

function HotelItem({hoIdx, hoName, hoImg, dPrice, rvStar}) {
    let loading = false;
    const url = `http://localhost/images/${hoImg}`;
    if (loading) {
        return (
            <div>loading...</div>
        )
    } else {
        //let img = '';
        //if (hoImg != null) {
            //img = `<img src=${url} width='150px' height='150px' /><br />`;
        //}
        return (
            <div style={{ margin: '5px'}}>
                    <span ><img src="/img/hotel.jpg"></img></span>
                <br />
            </div>

        )
    }
}
export default HotelItem;
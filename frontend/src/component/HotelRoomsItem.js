import React from 'react';

function HotelRoomsItem({DIdx, DRoomType, DImg1}) {
    let loading = false;
    const url = `http://localhost/static/images/host/hotel/${DImg1}`;

    if (loading) {
        return (
            <div>로딩 중...</div>
        )
    } else {
        let profile_src = '';
        let profile_url = '';
        
        if(DImg1 !== '-'){
            profile_src = `http://localhost/static/images/host/hotel/${DImg1}`;
            profile_url = `<img src=${profile_src} width='90px' height='90px'/>`;
        } else {
            profile_src = `http://localhost/static/images/no-image.png`;
            profile_url = `<img src=${profile_src} width='70px' height='70px'/>`;
        }

        return (
            <div style={{ margin: '5px'}}>
                <div style={{textAlign:'center'}}>
                <span dangerouslySetInnerHTML={{__html: profile_url}}></span> 
                    <div >{DRoomType}</div>
                </div>
            </div>
        )
    }
}
export default HotelRoomsItem;
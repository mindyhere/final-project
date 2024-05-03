import React, { useState} from 'react';

function HotelRoomsItem({DIdx, DRoomType, DImg1}) {
    let loading = false;
    const url = `http://localhost/static/images/host/hotel/${DImg1}`;
    const [modal, setModal] = useState(false);

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
            <div style={{ margin: '5px', cursor: 'pointer'}} onClick={() => setModal(true)}>
                <div style={{textAlign:'center'}}>
                <span dangerouslySetInnerHTML={{__html: profile_url}}></span> 
                    <div>{DRoomType}</div>
                    { modal &&
                        <div className='Modal' onClick={() => setModal(false)} style={{zIndex : 999}}>
                            <div className='modalBody' onClick={(e) => e.stopPropagation()}>
                                <button id = 'modalCloseBtn' onClick={() => setModal(false)}>
                                    X
                                </button>
                                <div className="container">
                                    이미지 1~3개
                                    객실 유형 : 
                                    수용 인원 :
                                    면적 : 
                                    침대수 : 
                                    금연실 여부 :
                                    가격 : 
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        )
    }
}
export default HotelRoomsItem;
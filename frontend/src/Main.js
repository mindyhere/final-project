import React, {useRef,useEffect,useState} from 'react';

import HotelItem from './component/HotelItem';
import 'bootstrap/dist/css/bootstrap.min.css';
//import Swal from "sweetalert2";
//import Button from "react-bootstrap/Button";

function Main() {
  const [list,setMainList] = useState([]);
  const HoName = useRef();

  function getMain(url) {
    fetch(url)
    .then(response => {
      return response.json();
    })
    .then(data => {
      setMainList(data);
    })
  }

  useEffect(() => {getMain('http://localhost/guest/main');},[]);

  return (
      <>
        <div className='container-fluid' align="center">
          <input type="text" ref={HoName} placeholder="Search" className='shadow w-25 p-1 mb-5 border border-success p-2 border-opacity-10 rounded'/>
          &nbsp;
          <button type='button' onClick={()=>{
              //getMain(`http://localhost/api/product/list?productName=${productName.current.value}`)
              //검색
          }} className='shadow  p-1 mb-2 border border-success p-2 border-opacity-10 rounded'><svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
        </svg></button>
        </div>


      <div style={{
                display:'grid',
                gridTemplateRows:'1fr',
                gridTemplateColumns:'1fr 1fr 1fr',
      }}>
      {list.map(
                ({HoName,HoImg,HoIdx})=>(
                    <HotelItem
                      HoIdx={HoIdx}
                      HoName={HoName}
                      HoImg={HoImg}
                      key={HoIdx}
                          //싱글가격
                          //평점
                    />
                )
            )}
      </div>
            console.log("idx===="+HoIdx);
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
 
    </>
  );
}
export default Main;
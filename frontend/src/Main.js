import React, {useRef} from 'react';

import HotelItem from './component/HotelItem';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from "sweetalert2";
import Button from "react-bootstrap/Button";

function Main() {
  const hoName = useRef();
  return (
      <>
      <div align="center">
        <input type="text" ref={hoName} placeholder="Search" className='shadow w-25 p-1 mb-5 border border-success p-2 border-opacity-10 rounded'/>
        &nbsp;
              <button type='button' onClick={()=>{
                  //getList(`http://localhost/api/product/list?productName=${productName.current.value}`)
              }} className='shadow p-1 mb-5 border border-success p-2 border-opacity-10 rounded'><svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
            </svg></button>
      </div>
      <div style={{
                display:'grid',
                gridTemplateRows:'1fr',
                gridTemplateColumns:'1fr 1fr 1fr',
      }}>
        <HotelItem />
      </div>

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
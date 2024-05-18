import React, { useRef } from "react";

function HotelNavItem({
  rownum,
  ho_idx,
  ho_name,
  loading,
  init,
  isInitialized,
  handleHotelChange,
}) {
  const hotel_idx = useRef();
  // console.log("==> 최초? " + loading + ", rownum? " + rownum + ", " + init);
  if (rownum == 1 && !loading) {
    console.log("==> 초기셋팅? " + init);
    isInitialized(false);
    return (
      <li
        key={rownum}
        className={"nav-item"}
        onClick={() => {
          handleHotelChange(ho_idx);
        }}
      >
        <a key={ho_idx} className={`nav-link active hotel${ho_idx}`}>
          {ho_name}
        </a>
        <input type="hidden" defaultValue={ho_idx} ref={hotel_idx} />
      </li>
    );
  } else {
    isInitialized(false);
    return (
      <li
        key={rownum}
        onClick={() => {
          isInitialized(false);
          handleHotelChange(ho_idx);
        }}
      >
        <a key={ho_idx} className={`nav-link hotel${ho_idx}`}>
          {ho_name}
        </a>
        <input type="hidden" defaultValue={ho_idx} ref={hotel_idx} />
      </li>
    );
  }
}

export default HotelNavItem;

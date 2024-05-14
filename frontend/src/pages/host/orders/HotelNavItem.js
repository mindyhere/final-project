import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router";

function HotelNavItem({
  rownum,
  ho_idx,
  ho_name,
  userIdx,
  handleClick,
  init,
}) {
  console.log("==>? " + init + ", " + ho_name);
  const hotel_idx = useRef();
  const [active, setActive] = useState("");
  const handleActive = () => {
    setActive("active");
  };

  console.log("==> 확인??? init?" + init + "," + rownum + ", " + ho_name);

  return (
    <li
      key={ho_idx}
      className={"nav-link " + active}
      onClick={() => {
        handleClick(ho_idx);
        handleActive();
      }}
    >
      <a key={rownum} className="nav-link">
        {ho_name}
      </a>
      <input type="hidden" defaultValue={ho_idx} ref={hotel_idx} />
    </li>
  );
}

export default HotelNavItem;

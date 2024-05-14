import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router";

function HotelNavItem({
  rownum,
  ho_idx,
  ho_name,
  userIdx,
  handleClick,
  init,
  active,
}) {
  const hotel_idx = useRef();
  // const [active, isActive] = useState("");
  // const handleChange = (val) => {
  //   const el = document.getElementsByName("link" + rownum);
  //   el.remove("active");
  // };

  // console.log(
  //   "==> 확인 init?" + init + "," + rownum + ", " + ho_name + "/" + active
  // );

  if ({ init } == 1 && rownum == 1) {
    return (
      <li
        key={ho_idx}
        value={active}
        name={"link" + rownum}
        className={"nav-link" + " active"}
        onClick={() => {
          handleClick(ho_idx);
        }}
      >
        <a key={rownum} className="nav-link">
          {ho_name}
        </a>
        <input type="hidden" defaultValue={ho_idx} ref={hotel_idx} />
      </li>
    );
  } else {
    return (
      <li
        key={ho_idx}
        value={active}
        name={"link" + rownum}
        className={"nav-link"}
        onClick={() => {
          handleClick(ho_idx);
        }}
      >
        <a key={rownum} className="nav-link">
          {ho_name}
        </a>
        <input type="hidden" defaultValue={ho_idx} ref={hotel_idx} />
      </li>
    );
  }
}

export default HotelNavItem;

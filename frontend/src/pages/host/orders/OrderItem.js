import React, { useRef, useState, useEffect } from "react";
import { json, useNavigate } from "react-router";

import Cookies from "universal-cookie";
import Swal from "sweetalert2";

function OrderItem({
  rownum,
  ho_idx,
  o_idx,
  g_idx,
  d_idx,
  o_ckin,
  o_ckout,
  o_adult,
  o_child,
  o_baby,
  o_state,
  status,
  o_payment,
  o_price,
  o_discount,
  o_finalprice,
  o_benefit,
  o_orderdate,
  handleModal,
  sum
}) {
  const cookies = new Cookies();
  const userInfo = cookies.get("userInfo");
  const userIdx = userInfo.h_idx;
  const userEmail = userInfo.h_email;
  const userName = userInfo.h_name;
  const level = userInfo.h_level;

  const dataset = {
    // 전달할 데이터
    ho_idx: `${ho_idx}`,
    o_idx: `${o_idx}`,
    g_idx: `${g_idx}`,
    d_idx: `${d_idx}`,
    o_ckin: `${o_ckin}`,
    o_ckout: `${o_ckout}`,
    o_adult: `${o_adult}`,
    o_child: `${o_child}`,
    o_baby: `${o_baby}`,
    o_state: `${o_state}`,
    status: `${status}`,
    o_payment: `${o_payment}`,
    o_price: `${o_price}`,
    o_discount: `${o_discount}`,
    o_finalprice: `${o_finalprice}`,
    o_benefit: `${o_benefit}`,
    o_orderdate: `${o_orderdate}`,
    sum: `${sum}`,
  };
  // console.log("==> list? " + JSON.stringify(dataset));
  return (
    <tr
      className="align-middle"
      onClick={() => {
        localStorage.setItem("dataset", JSON.stringify(dataset));
        handleModal(o_idx);
      }}
    >
      <th>{rownum}</th>
      <td>{o_idx}</td>
      <td>{d_idx}</td>
      <td>{o_ckin}</td>
      <td>{o_ckout}</td>
      <td>{o_finalprice}</td>
      <td>{o_orderdate}</td>
      <td>{status}</td>
    </tr>
  );
}

export default OrderItem;

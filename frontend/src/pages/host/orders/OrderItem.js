import React, { useRef, useState, useEffect } from "react";
import { json, useNavigate } from "react-router";

import Cookies from "universal-cookie";
import Swal from "sweetalert2";

function OrderItem({
  rownum,
  hotel_idx,
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
  OrderDetail,
  handleModal,
}) {
  console.log("==> list? " + status);
  const cookies = new Cookies();
  const userInfo = cookies.get("userInfo");
  const userIdx = userInfo.h_idx;
  const userEmail = userInfo.h_email;
  const userName = userInfo.h_name;
  const level = userInfo.h_level;

  return (
    <tr
      className="align-middle"
      onClick={() => {
        handleModal(this);
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

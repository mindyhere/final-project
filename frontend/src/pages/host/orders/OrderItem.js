import React, { useRef, useState, useEffect } from "react";
import { json, useNavigate } from "react-router";

import Cookies from "universal-cookie";
import Swal from "sweetalert2";
import moment from "moment";
import "moment/locale/ko";

function OrderItem({
  event,
  rownum,
  o_idx,
  g_idx,
  ho_idx,
  ho_name,
  d_idx,
  d_room_type,
  o_ckin,
  o_ckout,
  o_adult,
  o_child,
  o_baby,
  sum,
  o_state,
  status,
  o_payment,
  o_price,
  o_discount,
  o_finalprice,
  o_benefit,
  o_orderdate,
  g_name,
  handleModal,
}) {
  const cookies = new Cookies();
  const userInfo = cookies.get("userInfo");
  const userIdx = userInfo.h_idx;
  const userEmail = userInfo.h_email;
  const userName = userInfo.h_name;
  const level = userInfo.h_level;

  const dataset = {
    // 전달할 데이터
    o_idx: `${o_idx}`,
    g_idx: `${g_idx}`,
    ho_idx: `${ho_idx}`,
    ho_name: `${ho_name}`,
    d_idx: `${d_idx}`,
    d_room_type: `${d_room_type}`,
    o_ckin: `${o_ckin}`,
    o_ckout: `${o_ckout}`,
    o_adult: `${o_adult}`,
    o_child: `${o_child}`,
    o_baby: `${o_baby}`,
    sum: `${sum}`,
    o_state: `${o_state}`,
    status: `${status}`,
    o_payment: `${o_payment}`,
    o_price: `${o_price}`,
    o_discount: `${o_discount}`,
    o_finalprice: `${o_finalprice}`,
    o_benefit: `${o_benefit}`,
    o_orderdate: `${o_orderdate}`,
  };
  // console.log("==> list? " + JSON.stringify(dataset));
  if (event == "order") {
    return (
      <tr
        className="align-middle"
        onClick={() => {
          localStorage.setItem("dataset", JSON.stringify(dataset));
          handleModal(o_idx, "order");
        }}
      >
        <td>{rownum}</td>
        <td>{o_idx}</td>
        <td>{d_room_type}</td>
        <td>{o_ckin}</td>
        <td>{o_ckout}</td>
        <td>{o_finalprice}</td>
        <td>{o_orderdate}</td>
        {o_state == "1" ? (
          <th style={{ color: "crimson" }}>{status}</th>
        ) : (
          <th>
            {status}
          </th>
        )}
      </tr>
    );
  } else {
    let ckin = moment(o_ckin).format("YY-MM-DD");
    let ckout = moment(o_ckout).format("YY-MM-DD");
    let orderdate = moment(o_orderdate).format("YY-MM-DD");
    return (
      <tr className="align-middle detail-row">
        <td>{rownum}</td>
        <td>{o_idx}</td>
        <td>{ho_name}</td>
        <td>{d_room_type}</td>
        <td>
          {ckin} / {ckout}
        </td>
        <td>{g_name}</td>
        <td>{orderdate}</td>
        {o_state == "1" ? (
          <th id="status" style={{ color: "crimson" }}>
            {status}
          </th>
        ) : (
          <th style={{cursor:"pointer"}}>{status}</th>
        )}
      </tr>
    );
  }
}
export default OrderItem;

import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import Cookies from "universal-cookie";

import { Calendar2Check } from "react-bootstrap-icons";
import moment from "moment";
import "moment/locale/ko";

import OrderItem from "./OrderItem";

function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data != null) {
          // console.log("===> data? " + JSON.stringify(data));
          setData(data);
        }
        setLoading(false);
      });
  }, []);
  return [data, loading];
}

function DetailSchedule({ date }) {
  const cookies = new Cookies();
  const userInfo = cookies.get("userInfo");
  const userIdx = userInfo.h_idx;
  const [ckinData, loading1] = useFetch(
    `http://localhost/api/order/manage/schedule/detail/${userIdx}?column=o_ckin&date=${date}`
  );
  const [ckoutData, loading2] = useFetch(
    `http://localhost/api/order/manage/schedule/detail/${userIdx}?column=o_ckout&date=${date}`
  );

  if (loading1 || loading2) {
    return <div>loading...</div>;
  } else {
    return (
      <>
        <div className="modal_container" style={{ paddingTop: "15px" }}>
          <h3 className="text-bold mb-30">
            <Calendar2Check size={35} />
            &nbsp;RESERVATION
          </h3>
          <hr />
          <div
            className="card-style mb-4"
            style={{ height: "340px", maxHeight: "340px" }}
          >
            <div className="row mb-3" style={{ textAlign: "left" }}>
              <h4>Check-in</h4>
            </div>
            <table
              id="review"
              className="table table-sm table-hover align-middle text-center"
            >
              <colgroup>
                <col width="5%" />
                <col width="10%" />
                <col width="15%" />
                <col width="10%" />
                <col width="25%" />
                <col width="10%" />
                <col width="15%" />
                <col width="10%" />
              </colgroup>
              <thead>
                <tr className="align-middle">
                  <th scope="col">
                    <strong>no.</strong>
                  </th>
                  <th scope="col">
                    <strong>예약번호</strong>
                  </th>
                  <th scope="col">
                    <strong>구분</strong>
                  </th>
                  <th scope="col">
                    <strong>객실유형</strong>
                  </th>
                  <th scope="col">
                    <strong>체크인/체크아웃</strong>
                  </th>
                  <th scope="col">
                    <strong>투숙객</strong>
                  </th>
                  <th scope="col">
                    <strong>예약일</strong>
                  </th>
                  <th scope="col">
                    <strong>상태</strong>
                  </th>
                </tr>
              </thead>
              <tbody
                className="table-group-divider"
                style={{
                  borderColor: "#F7EFFC",
                  overflowY: "auto",
                }}
              >
                {ckinData.map(
                  ({
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
                  }) => (
                    <OrderItem
                      event={"detail"}
                      rownum={rownum}
                      o_idx={o_idx}
                      g_idx={g_idx}
                      ho_idx={ho_idx}
                      ho_name={ho_name}
                      d_idx={d_idx}
                      d_room_type={d_room_type}
                      o_ckin={o_ckin}
                      o_ckout={o_ckout}
                      o_adult={o_adult}
                      o_child={o_child}
                      o_baby={o_baby}
                      sum={sum}
                      o_state={o_state}
                      status={status}
                      o_payment={o_payment}
                      o_price={o_price}
                      o_discount={o_discount}
                      o_finalprice={o_finalprice}
                      o_benefit={o_benefit}
                      o_orderdate={o_orderdate}
                      g_name={g_name}
                      key={o_idx}
                    />
                  )
                )}
              </tbody>
            </table>
          </div>
          <div
            className="card-style mb-3"
            style={{ height: "340px", maxHeight: "340px" }}
          >
            <div className="row mb-3" style={{ textAlign: "left" }}>
              <h4>Check-out</h4>
            </div>
            <table
              id="review"
              className="table table-sm table-hover align-middle text-center"
            >
              <colgroup>
                <col width="5%" />
                <col width="10%" />
                <col width="15%" />
                <col width="10%" />
                <col width="25%" />
                <col width="10%" />
                <col width="15%" />
                <col width="10%" />
              </colgroup>
              <thead>
                <tr className="align-middle">
                  <th scope="col">
                    <strong>no.</strong>
                  </th>
                  <th scope="col">
                    <strong>예약번호</strong>
                  </th>
                  <th scope="col">
                    <strong>구분</strong>
                  </th>
                  <th scope="col">
                    <strong>객실유형</strong>
                  </th>
                  <th scope="col">
                    <strong>체크인/체크아웃</strong>
                  </th>
                  <th scope="col">
                    <strong>투숙객</strong>
                  </th>
                  <th scope="col">
                    <strong>예약일</strong>
                  </th>
                  <th scope="col">
                    <strong>상태</strong>
                  </th>
                </tr>
              </thead>
              <tbody
                className="table-group-divider"
                style={{
                  borderColor: "#F7EFFC",
                  overflowY: "auto",
                }}
              >
                {ckoutData.map(
                  ({
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
                  }) => (
                    <OrderItem
                      rownum={rownum}
                      o_idx={o_idx}
                      g_idx={g_idx}
                      ho_idx={ho_idx}
                      ho_name={ho_name}
                      d_idx={d_idx}
                      d_room_type={d_room_type}
                      o_ckin={o_ckin}
                      o_ckout={o_ckout}
                      o_adult={o_adult}
                      o_child={o_child}
                      o_baby={o_baby}
                      sum={sum}
                      o_state={o_state}
                      status={status}
                      o_payment={o_payment}
                      o_price={o_price}
                      o_discount={o_discount}
                      o_finalprice={o_finalprice}
                      o_benefit={o_benefit}
                      o_orderdate={o_orderdate}
                      g_name={g_name}
                      key={o_idx}
                    />
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
}
export default DetailSchedule;

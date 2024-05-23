import React, { useEffect, useState } from "react";
import { Calendar2Week, Display } from "react-bootstrap-icons";

import Cookies from "universal-cookie";
import HotelNavItem from "./HotelNavItem";
import OrderItem from "./OrderItem";
import OrderDetail from "./OrderDetail_modal";
import Scheduler from "./Scheduler";
import ModifyList from "./ModifyList";
import DetailSchedule from "./DetailSchdule_modal";

import {
  ChevronDoubleLeft,
  ChevronLeft,
  ChevronRight,
  ChevronDoubleRight,
  Calendar2Check,
} from "react-bootstrap-icons";

function ManageOrders() {
  const cookies = new Cookies();
  const userInfo = cookies.get("userInfo");
  const userIdx = userInfo.h_idx;
  const level = userInfo.h_level;
  const [loading, setLoading] = useState("");
  const [page, setPaging] = useState("");
  const [count, setCount] = useState("");
  const [order, setOderItem] = useState(false);
  const [detail, setDetailSchedule] = useState(false);
  const [list, setOrders] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [hoIdx, setHotelIdx] = useState("");
  const [selected, isSelected] = useState("");
  const [pageNum, setPageNum] = useState("1");

  function getList(hoIdx, pageNum) {
    let url = "";
    // console.log("==> page? " + pageNum + ", " + hoIdx);
    if (pageNum != "0") {
      url = `http://localhost/api/order/manage/list/${userIdx}?hoIdx=${hoIdx}&pageNum=${pageNum}`;
    } else {
      url = `http://localhost/api/order/manage/list/${userIdx}?hoIdx=${hoIdx}&pageNum=1`;
    }
    // console.log("==> 리스트: " + hoIdx + ", page " + pageNum + "/ url? " + url);
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setLoading(false);
        setCount(data.count);
        setPaging(data.page);
        setOrders(data.list);
        setHotels(data.hotels);
        // console.log("==> data: " +JSON.stringify(data.list));
      });
  }

  useEffect(() => {
    getList(hoIdx, pageNum);
  }, [hoIdx, pageNum]);

  const handleHotelChange = (idx) => {
    // console.log("==> 클릭? " + idx);
    setHotelIdx(idx);
    getList(idx, 0, 1);
    hotels.map(({ ho_idx }) => {
      // console.log("==> 반복처리 :" + ho_idx);
      if (ho_idx != idx) {
        document.querySelector(".hotel" + ho_idx).classList.remove("active");
      } else {
        document.querySelector(".hotel" + ho_idx).classList.add("active");
      }
      let e = document.querySelector(".hotel" + ho_idx);
      // console.log("==> 결과" + e.className);
    });
  };

  const handleModal = (value, event) => {
    console.log("=> 핸들러?" + typeof value + ", " + value + ", " + event);
    event == "order" ? setOderItem(!order) : setDetailSchedule(!detail);
    isSelected(value);
  };

  const setPagination = () => {
    const result = [];
    const begin = page.blockStart;
    const end = page.blockEnd;

    for (let i = begin; i <= end; i++) {
      if (i === page.curPage) {
        result.push(
          <li key={"page-item" + i} className="page-item">
            <a key={i} className="page-link">
              <strong>{i}</strong>
            </a>
          </li>
        );
      } else {
        result.push(
          <li key={"page-item" + i} className="page-item">
            <a
              key={i}
              className="page-link"
              onClick={() => getList(hoIdx, `${i}`)}
            >
              {i}
            </a>
          </li>
        );
      }
    }
    return result;
  };

  function Modal(props) {
    function closeModal() {
      props.closeModal();
    }

    return (
      <div className="modal_h" onClick={closeModal}>
        <div
          className="modalBody_h"
          style={{ width: "1100px", padding: "40px" }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="btnClose" onClick={closeModal}>
            X
          </button>
          {props.children}
        </div>
      </div>
    );
  }

  if (loading) {
    return <div>loading...</div>;
  } else {
    return (
      <>
        <div className="container min-vh-100">
          <div className="card-style mb-30">
            <h3 className="text-bold">
              <Calendar2Check size={35} />
              &nbsp;예약현황
            </h3>
            <br />
            <div
              className="row mt-0 mb-2"
              style={{
                padding: "0 1% 0 1%",
              }}
            >
              <div className="col-3 m-0 p-0">
                <Scheduler handleModal={handleModal} style={{}} />
              </div>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <div
                className="container col m-0 p-1"
                style={{
                  width: "800px",
                  height: "340px",
                }}
              >
                <ModifyList />
              </div>
            </div>
          </div>
          <br />
          <div className="card-style mb-30">
            <h3 className="text-bold">
              <Calendar2Week size={35} />
              &nbsp;예약목록
            </h3>
            <br />
            <div className="card text-center mb-30">
              <div
                className="card-header"
                style={{ backgroundColor: "#F7EFFC" }}
              >
                <ul className="nav nav-tabs card-header-tabs">
                  {hotels != null
                    ? hotels.map(({ rownum, ho_idx, ho_name, userIdx }) => (
                        <HotelNavItem
                          rownum={rownum}
                          ho_idx={ho_idx}
                          ho_name={ho_name}
                          userIdx={userIdx}
                          loading={loading}
                          setLoading={setLoading}
                          handleHotelChange={handleHotelChange}
                          key={ho_idx}
                        />
                      ))
                    : null}
                </ul>
              </div>
              <div className="card-body">
                <table
                  id="review"
                  className="table table-sm table-hover align-middle text-center"
                >
                  <colgroup>
                    <col width="5%" />
                    <col width="10%" />
                    <col width="10%" />
                    <col width="15%" />
                    <col width="15%" />
                    <col width="15%" />
                    <col width="10%" />
                    <col width="20%" />
                  </colgroup>
                  <thead>
                    <tr className="align-middle">
                      <th scope="col">no.</th>
                      <th scope="col">예약번호</th>
                      <th scope="col">객실유형</th>
                      <th scope="col">체크인</th>
                      <th scope="col">체크아웃</th>
                      <th scope="col">결제</th>
                      <th scope="col">예약일</th>
                      <th scope="col">상태</th>
                    </tr>
                  </thead>
                  <tbody
                    className="table-group-divider"
                    style={{
                      borderColor: "#F7EFFC",
                    }}
                  >
                    {count > 0 ? (
                      list.map(
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
                        }) => (
                          <OrderItem
                            event={"order"}
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
                            handleModal={handleModal}
                            key={o_idx}
                          />
                        )
                      )
                    ) : (
                      <tr
                        className="align-middle"
                        style={{
                          borderColor: "#F7EFFC",
                        }}
                      >
                        <td colSpan="8">
                          <br />
                          <p>조회된 내역이 없습니다.</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>

                <div
                  className="d-flex justify-content-center"
                  style={{ position: "relative", zIndex: "0" }}
                >
                  <nav className="page-navibar">
                    <ul className="pagination">
                      {page.curPage > 1 ? (
                        <li className="page-item">
                          <a className="page-link">
                            <span
                              aria-hidden="true"
                              onClick={() => getList(hoIdx, "1")}
                            >
                              <ChevronDoubleLeft />
                            </span>
                          </a>
                        </li>
                      ) : null}
                      {page.curBlock > 1 ? (
                        <li className="page-item">
                          <a className="page-link" aria-label="Previous">
                            <span
                              aria-hidden="true"
                              onclick={() => getList(hoIdx, `${page.prevPage}`)}
                            >
                              <ChevronLeft />
                            </span>
                          </a>
                        </li>
                      ) : null}

                      {setPagination()}

                      {page.curBlock < page.totBlock ? (
                        <li className="page-item">
                          <a className="page-link" aria-label="Next">
                            <span
                              aria-hidden="true"
                              onClick={() => getList(hoIdx, `${page.nextPage}`)}
                            >
                              <ChevronRight />
                            </span>
                          </a>
                        </li>
                      ) : null}
                      {page.curPage < page.totPage ? (
                        <li className="page-item">
                          <a className="page-link" aria-label="End">
                            <span
                              onClick={() => getList(hoIdx, `${page.totPage}`)}
                            >
                              <ChevronDoubleRight />
                            </span>
                          </a>
                        </li>
                      ) : null}
                    </ul>
                  </nav>
                </div>
                {detail && (
                  <Modal
                    style={{ position: "relative", zIndex: "99" }}
                    closeModal={() => {
                      setDetailSchedule(!detail);
                    }}
                  >
                    <DetailSchedule
                      date={selected}
                      // column={"o_ckin"}
                      style={{ position: "relative", zIndex: "100" }}
                    />
                  </Modal>
                )}
                {order && (
                  <Modal
                    style={{ position: "relative", zIndex: "99" }}
                    closeModal={() => {
                      setOderItem(!order);
                    }}
                  >
                    <OrderDetail
                      order_idx={selected}
                      style={{ position: "relative", zIndex: "100" }}
                    />
                  </Modal>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ManageOrders;

import React, { useEffect, useState } from "react";
import { Calendar2Week, Display } from "react-bootstrap-icons";

import Cookies from "universal-cookie";
import HotelNavItem from "./HotelNavItem";
import OrderItem from "./OrderItem";
import OrderDetail from "./OrderDetail_modal";
import Scheduler from "./Scheduler";
import ModifyList from "./ModifyList";

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
  const [modal, setModal] = useState(false);
  const [list, setOrders] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [hoIdx, setHotelIdx] = useState("");
  const [selected, isSelected] = useState("");
  const [pageNum, setPageNum] = useState("1");

  function getList(hoIdx, pageNum) {
    let url = "";
    console.log("==> page? " + pageNum + ", " + hoIdx);
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

  const handleModal = (oder_idx) => {
    isSelected(oder_idx);
    setModal(!modal);
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
      setModal(!modal);
    }

    return (
      <div className="modal_h" onClick={closeModal}>
        <div
          className="modalBody_h"
          style={{ width: "1000px", padding: "40px" }}
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

  const tileContent = ({ date }) => {
    return <p>.</p>;
  };

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
                zIndex: "0",
                position: "relative",
                padding: "0 1% 0 1%",
              }}
            >
              <div className="col-3 m-0 p-0">
                <Scheduler
                  tileContent={tileContent}
                  style={{
                    position: "relative",
                  }}
                />
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
            <br />
            <br />
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
              <div
                className="card-body"
                style={{ zIndex: "1", position: "relative" }}
              >
                <table
                  id="review"
                  className="table table-sm table-hover align-middle text-center"
                  style={{ zIndex: "3", position: "relative" }}
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
                      <th scope="col">
                        <strong>no.</strong>
                      </th>
                      <th scope="col">
                        <strong>예약번호</strong>
                      </th>
                      <th scope="col">
                        <strong>객실유형</strong>
                      </th>
                      <th scope="col">
                        <strong>체크인</strong>
                      </th>
                      <th scope="col">
                        <strong>체크아웃</strong>
                      </th>
                      <th scope="col">
                        <strong>결제</strong>
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
                    style={{ borderColor: "#F7EFFC" }}
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
                      <tr className="align-middle">
                        <td colSpan="8">
                          <br />
                          <p>등록된 게시글이 없습니다.</p>
                        </td>
                      </tr>
                    )}
                    {modal && (
                      <Modal
                        style={{ zIndex: "100", position: "relative" }}
                        closeModal={() => {
                          setModal(!modal);
                        }}
                      >
                        <OrderDetail
                          order_idx={selected}
                          style={{ zIndex: "999", position: "relative" }}
                        />
                      </Modal>
                    )}
                  </tbody>
                </table>
                <div
                  className="d-flex justify-content-center"
                  style={{ zIndex: "2", position: "relative" }}
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
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ManageOrders;

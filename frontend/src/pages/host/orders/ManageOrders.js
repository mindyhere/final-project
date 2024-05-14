import React, { useRef, useEffect, useState } from "react";
import { Calendar2Week } from "react-bootstrap-icons";
import { useNavigate } from "react-router";

import Cookies from "universal-cookie";
import HotelNavItem from "./HotelNavItem";
import OrderItem from "./OrderItem";
import OrderDetail from "./OrderDetail_modal";

import {
  ChevronDoubleLeft,
  ChevronLeft,
  ChevronRight,
  ChevronDoubleRight,
} from "react-bootstrap-icons";

function ManageOrders() {
  const cookies = new Cookies();
  const userInfo = cookies.get("userInfo");
  const userIdx = userInfo.h_idx;
  const userEmail = userInfo.h_email;
  const userName = userInfo.h_name;
  const level = userInfo.h_level;
  const [loading, setLoading] = useState("");
  const [init, setInitialize] = useState("1");
  const [page, setPaging] = useState("");
  const [count, setCount] = useState("");
  const [pageNum, setPageNum] = useState("1");
  const [modal, setModal] = useState(false);
  const [onDetail, setOnDetail] = useState(false);
  const [list, setOrders] = useState([]);
  const [hotels, setHotels] = useState([]);
  const navigate = useNavigate();
  const [hoIdx, setHotelIdx] = useState("");
  const [selected, isSelected] = useState("");

  function getList(hoIdx, init, pageNum) {
    console.log(pageNum);
    let url = "";
    if (init == "") {
      url = `http://localhost/api/order/manage/list/${userIdx}`;
    } else {
      url = `http://localhost/api/order/manage/list/${userIdx}?hoIdx=${hoIdx}&init=${init}&pageNum=${pageNum}`;
    }

    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setInitialize(data.init);
        console.log("==> init data? " + data.init);
        setCount(data.count);
        setPaging(data.page);
        setOrders(data.list);
        setHotels(data.hotels);
        setLoading(false);
      });
  }

  useEffect(() => {
    getList(hoIdx, init, pageNum);
  }, [hoIdx, init, pageNum]);

  const handleClick = (e) => {
    setHotelIdx(e);
    console.log("==> 클릭? " + e);
    getList(e, 0);
    // console.log("==> 호출? " +{ hoIdx });
  };
  const handleModal = (oder_idx) => {
    isSelected(oder_idx);
    setOnDetail(!onDetail);
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
            <a key={i} className="page-link" onClick={() => getList(`${i}`)}>
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
      setModal(false);
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

  if (loading) {
    return <div>loading...</div>;
  } else {
    return (
      <>
        <div className="container min-vh-100">
          <div className="card-style mb-30">
            <h3 className="text-bold">
              <Calendar2Week size={35} />
              &nbsp;예약 목록
            </h3>
            <br />
            <div className="card text-center">
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
                          handleClick={handleClick}
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
                    style={{ borderColor: "#DBC4F0" }}
                  >
                    {count > 0 ? (
                      list.map(
                        ({
                          rownum,
                          d_ho_idx,
                          o_idx,
                          o_gidx,
                          o_didx,
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
                          sum
                        }) => (
                          <OrderItem
                            rownum={rownum}
                            ho_idx={d_ho_idx}
                            o_idx={o_idx}
                            g_idx={o_gidx}
                            d_idx={o_didx}
                            o_ckin={o_ckin}
                            o_ckout={o_ckout}
                            o_adult={o_adult}
                            o_child={o_child}
                            o_baby={o_baby}
                            o_state={o_state}
                            status={status}
                            o_payment={o_payment}
                            o_price={o_price}
                            o_discount={o_discount}
                            o_finalprice={o_finalprice}
                            o_benefit={o_benefit}
                            o_orderdate={o_orderdate}
                            sum={sum}
                            handleModal={handleModal}
                            key={o_idx}
                          />
                        )
                      )
                    ) : (
                      <tr className="align-middle">
                        <td colSpan="7">
                          <br />
                          <p>등록된 게시글이 없습니다.</p>
                        </td>
                      </tr>
                    )}
                    {onDetail && (
                      <Modal
                        style={{ zIndex: "10", position: "relative" }}
                        closeModal={() => {
                          setOnDetail(!onDetail);
                        }}
                      >
                        <OrderDetail
                          order_idx={selected}
                          style={{ zIndex: "999" }}
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
                              onClick={() => getList("1")}
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
                              onclick={() => getList(`${page.prevPage}`)}
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
                              onClick={() => getList(`${page.nextPage}`)}
                            >
                              <ChevronRight />
                            </span>
                          </a>
                        </li>
                      ) : null}
                      {page.curPage < page.totPage ? (
                        <li className="page-item">
                          <a className="page-link" aria-label="End">
                            <span onClick={() => getList(`${page.totPage}`)}>
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
          <div
            className="card-style mb-30"
            style={{ zIndex: "0", position: "relative" }}
          >
            이용통계
          </div>
        </div>
      </>
    );
  }
}

export default ManageOrders;

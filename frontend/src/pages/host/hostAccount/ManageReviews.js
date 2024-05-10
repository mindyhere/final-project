import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Cookies from "universal-cookie";
import { Search } from "react-bootstrap-icons";

import ReviewItem from "./ReviewItem";

function ListReview() {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [modal, setModal] = useState(false);
  const [moreDetail, setMoreDetail] = useState(false);
  const searchKey = useRef();
  const search = useRef();

  const cookies = new Cookies();
  const userInfo = cookies.get("userInfo");
  const userIdx = userInfo.h_idx;

  function getList(url) {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("==> 리뷰 data? " + JSON.stringify(data));
        setList(data.list);
        // setAvg(data.avgList);
      });
  }

  function Modal(props) {
    function closeModal() {
      props.closeModal();
      setModal(false);
    }

    return (
      <div className="modal_h" onClick={closeModal}>
        <div
          className="modalBody_h"
          style={{ width: "1000px" }}
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

  useEffect(() => {
    getList(`http://localhost/api/reputation/manage/list/${userIdx}`);
  }, []);

  return (
    <>
      <div id="section1" className="input-group row mb-3">
        <br />
        <div className="col-8">
          <form
            className="d-flex input-group"
            id="form1"
            name="form1"
            method="post"
          >
            <div className="col-2">
              <div className="input-group d-flex">
                <select
                  className="form-select form-select opt"
                  id="opt"
                  style={{
                    size: "3",
                    borderRadius: "30px 0 0 30px",
                    height: "48.33px",
                  }}
                >
                  <option defaultValue="1" selected>
                    최신순
                  </option>
                  <option value="2">높은평점순&nbsp;&nbsp;</option>
                  <option value="3">낮은평점순&nbsp;&nbsp;</option>
                </select>
              </div>
            </div>
            <input
              id="keyword"
              type="text"
              className="form-control search"
              placeholder="검색어를 입력하세요"
            />
            <button
              className="btn main-btn"
              type="button"
              id="btnSearch"
              onClick="formCheck()"
              style={{ backgroundColor: "#FEC5BB !important" }}
            >
              <Search size="16px" />
            </button>
          </form>
        </div>
      </div>
      <table
        id="review"
        className="table table-sm table-hover align-middle text-center"
      >
        <colgroup>
          <col width="5%" />
          <col width="10%" />
          <col width="25%" />
          <col width="25%" />
          <col width="15%" />
          <col width="10%" />
        </colgroup>
        <thead>
          <tr className="align-middle">
            <th scope="col">
              <strong>no.</strong>
            </th>
            <th scope="col">
              <strong>구분</strong>
            </th>
            <th scope="col">
              <strong>작성자</strong>
            </th>
            <th scope="col">
              <strong>작성날짜</strong>
            </th>
            <th scope="col">
              <strong>평점</strong>
            </th>
            <th scope="col">
              <strong>답변</strong>
            </th>
          </tr>
        </thead>
        <tbody
          className="table-group-divider"
          style={{ borderColor: "#DBC4F0" }}
        >
          {list.length === 0 ? (
            <tr>
              <td colSpan={6}>
                <br />
                <p>등록된 후기가 없습니다.</p>
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </>
  );
}

export default function Reviews() {
  return <ListReview />;
}

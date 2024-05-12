import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Cookies from "universal-cookie";
import {
  ChevronDoubleLeft,
  ChevronLeft,
  ChevronRight,
  ChevronDoubleRight,
} from "react-bootstrap-icons";

import ReviewItem from "./ReviewItem";

function ListReviews() {
  const [list, setList] = useState([]);
  const [starList, setAvg] = useState([]);
  const [page, setPaging] = useState("");
  const [count, setCount] = useState("");
  const [pageNum, setPageNum] = useState("1");

  const cookies = new Cookies();
  const userInfo = cookies.get("userInfo");
  const userIdx = userInfo.h_idx;
  function getList(pageNum) {
    console.log("==> pageNum? " + pageNum);
    fetch(
      `http://localhost/api/reputation/manage/list/${userIdx}?pageNum=${pageNum}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log("==> 리뷰 data? " + JSON.stringify(data.page));
        setList(data.list);
        setAvg(data.avgList);
        setPaging(data.page);
        setCount(data.count);
      });
  }

  useEffect(() => {
    getList(pageNum);
  }, [pageNum]);

  const setPagination = () => {
    const result = [];
    const begin = page.blockStart;
    const end = page.blockEnd;

    for (let i = begin; i <= end; i++) {
      if (i === page.curPage) {
        result.push(
          <li className="page-item">
            <a key={i} className="page-link" href="#">
              <strong>{i}</strong>
            </a>
          </li>
        );
      } else {
        result.push(
          <li className="page-item">
            <a
              key={i}
              className="page-link"
              href="#"
              onClick={() => getList(`${i}`)}
            >
              {i}
            </a>
          </li>
        );
      }
    }
    return result;
  };

  // console.log("** => " + JSON.stringify(page));
  return (
    <>
      <div id="section1" className="input-group mb-3">
        <br />
        <div className="col-6" style={{ float: "rigth" }}></div>
        <div className="col-6 mb-3" style={{ float: "rigth" }}>
          <form
            className="d-flex input-group"
            id="form1"
            name="form1"
            method="post"
          >
            <div className="col-3">
              <div className="input-group d-flex">
                <select
                  className="form-select form-select opt"
                  id="opt"
                  style={{
                    size: "3",
                    borderRadius: "30px 0 0 30px",
                    height: "35px",
                    width: "30%",
                    textAlign: "left",
                  }}
                >
                  <option defaultValue={1}>&nbsp;구분</option>
                  <option defaultValue={2}>&nbsp;최근업로드</option>
                  <option defaultValue={3}>&nbsp;낮은평점순</option>
                </select>
              </div>
            </div>
            <input
              id="keyword"
              type="text"
              className="form-control search"
              placeholder="검색어를 입력하세요"
              style={{ height: "35px" }}
            />
            <button
              className="btn main-btn p-0"
              type="button"
              id="btnSearch"
              style={{
                height: "35px",
                backgroundColor: "#FEC5BB !important",
                margin: 0,
                padding: "0, 1px 0 1",
              }}
            >
              &nbsp;&nbsp;&nbsp;확인&nbsp;&nbsp;&nbsp;
            </button>
          </form>
        </div>
      </div>
      <table
        id="review"
        className="table table-sm table-hover align-middle text-center"
      >
        <colgroup>
          <col width="10%" />
          <col width="15%" />
          <col width="15%" />
          <col width="10%" />
          <col width="15%" />
          <col width="20%" />
          <col width="15%" />
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
              <strong>작성자</strong>
            </th>
            <th scope="col">
              <strong>작성일</strong>
            </th>
            <th scope="col">
              <strong>평점</strong>
            </th>
            <th scope="col">
              <strong>답글</strong>
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
                rv_idx,
                ho_name,
                g_name,
                g_url,
                g_email,
                rv_date,
                rv_content,
                rv_star,
                o_idx,
                d_idx,
                rp_idx,
              }) => (
                <ReviewItem
                  rownum={rownum}
                  rv_idx={rv_idx}
                  ho_name={ho_name}
                  g_name={g_name}
                  g_url={g_url}
                  g_email={g_email}
                  rv_date={rv_date}
                  rv_content={rv_content}
                  rv_star={rv_star}
                  o_idx={o_idx}
                  d_idx={d_idx}
                  rp_idx={rp_idx}
                  key={rv_idx}
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
        </tbody>
      </table>
      <div className="d-flex justify-content-center">
        <nav className="page-navibar">
          <ul className="pagination">
            {page.curPage > 1 ? (
              <li className="page-item">
                <a key={page.pageBegin} className="page-link" href="#">
                  <span aria-hidden="true" onClick={() => getList("1")}>
                    <ChevronDoubleLeft />
                  </span>
                </a>
              </li>
            ) : null}
            {page.curBlock > 1 ? (
              <li className="page-item">
                <a
                  key={page.prevPage}
                  className="page-link"
                  href="#"
                  aria-label="Previous"
                >
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
                <a
                  key={page.nextPage}
                  className="page-link"
                  href="#"
                  aria-label="Next"
                >
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
                <a
                  key={page.totPage}
                  className="page-link"
                  href="#"
                  aria-label="End"
                >
                  <span onClick={() => getList(`${page.totPage}`)}>
                    <ChevronDoubleRight />
                  </span>
                </a>
              </li>
            ) : null}
          </ul>
        </nav>
      </div>
    </>
  );
}

export default ListReviews;

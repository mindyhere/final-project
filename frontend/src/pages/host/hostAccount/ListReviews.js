import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Cookies from "universal-cookie";
// import { Search } from "react-bootstrap-icons";

import ReviewItem from "./ReviewItem";

function ListReviews() {
  const [list, setList] = useState([]);
  // const [modal, setModal] = useState(false);
  // const [moreDetail, setMoreDetail] = useState(false);
  // const searchKey = useRef();
  // const search = useRef();

  const cookies = new Cookies();
  const userInfo = cookies.get("userInfo");
  const userIdx = userInfo.h_idx;
  const [loading, setLoading] = useState(true);
  function getList(url) {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        //console.log("==> 리뷰 data? " + JSON.stringify(data));
        setList(data.list);
        // setAvg(data.avgList);
        setLoading(false);
      });
  }

  // function Modal(props) {
  //   function closeModal() {
  //     props.closeModal();
  //     setModal(false);
  //   }

  //   return (
  //     <div className="modal_h" onClick={closeModal}>
  //       <div
  //         className="modalBody_h"
  //         style={{ width: "1000px" }}
  //         onClick={(e) => e.stopPropagation()}
  //       >
  //         <button className="btnClose" onClick={closeModal}>
  //           X
  //         </button>
  //         {props.children}
  //       </div>
  //     </div>
  //   );
  // }

  useEffect(() => {
    getList(`http://localhost/api/reputation/manage/list/${userIdx}`);
  }, []);

  if (loading) {
    return <div>loading...</div>;
  } else {
    console.log("loading:" + loading);

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
                    <option defaultValue="1" selected>
                      &nbsp;구분
                    </option>
                    <option value="2">&nbsp;최근업로드</option>
                    <option value="3">&nbsp;낮은평점순</option>
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
                onClick="formCheck()"
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
            {list.map(
              ({
                rv_idx,
                ho_name,
                g_name,
                g_email,
                g_url,
                rv_date,
                rv_star,
              }) => {
                //console.log(i)
                <ReviewItem
                  idx={rv_idx}
                  ho_name={ho_name}
                  g_name={g_name}
                  email={g_email}
                  g_url={g_url}
                  rv_date={rv_date}
                  rv_star={rv_star}
                  key={rv_idx}
                />;
              }
            )}
            {/* //{" "}
          <tr>
            //{" "}
            <td colSpan={6}>
              // <br />
              // <p>등록된 후기가 없습니다.</p>
              //{" "}
            </td>
            //{" "} */}
          </tbody>
        </table>
      </>
    );
  }
}

export default ListReviews;

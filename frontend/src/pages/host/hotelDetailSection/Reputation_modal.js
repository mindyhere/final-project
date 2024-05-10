import React, { useEffect, useRef, useState } from "react";
import { ChatLeftQuote, Search } from "react-bootstrap-icons";

import ReviewItem from "../../../component/ReviewItem";

function TotalReputation({ list, avg }) {
  const [email, setEmail] = useState("");
  const userEmail = useRef();
  const pwd = useRef();
  const pwdChk = useRef();

  return (
    <>
      <div className="modal_container" style={{ paddingTop: "15px" }}>
        <h3 className="text-bold">
          <ChatLeftQuote size={35} />
          &nbsp;REVIEW
        </h3>
        <br />
        <hr />
        <br />
        <div id="section1" className="input-group row mb-3">
          <br />
          <div
            className="col-4"
            style={{ boxSizing: "border-box", marginTop: "12px" }}
          >
            <h3>
              ⭐&nbsp;{avg} | {list.length}개
            </h3>
          </div>
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

        <div
          className="row"
          style={{
            display: "grid",
            gridTemplateRows: "1fr",
          }}
        >
          {list.map(
            ({
              rv_idx,
              g_name,
              g_url,
              l_name,
              g_email,
              rv_content,
              rv_date,
              rv_star,
            }) => (
              <ReviewItem
                opt={2}
                rv_idx={rv_idx}
                g_name={g_name}
                g_url={g_url}
                l_name={l_name}
                g_email={g_email}
                rv_content={rv_content}
                rv_date={rv_date}
                rv_star={rv_star}
                key={rv_idx}
              />
            )
          )}
        </div>
      </div>
    </>
  );
}
export default TotalReputation;
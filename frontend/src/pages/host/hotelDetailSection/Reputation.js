import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import Cookies from "universal-cookie";

import ReputationItem from "./ReputationItem";
import { StarFill } from "react-bootstrap-icons";
import TotalReputation from "./Reputation_modal";

function Reputation() {
  const { HoIdx } = useParams();
  const [list, setReviews] = useState([]);
  const [modal, setModal] = useState(false);
  const [totReputation, setTotalReputation] = useState(false);
  const [avg, setAvg] = useState("");

  function getReviews(url) {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log("==> 리뷰 data? " + JSON.stringify(data));
        setReviews(data.list);
        setAvg(data.avg);
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
    getReviews(`http://localhost/api/reputation/list/${HoIdx}`);
  }, []);

  if (avg == null) {
    return (
      <>
        <div className="container mb-30">
          <h2>후기 미등록</h2>
          <p>아직 등록된 후기가 없습니다.</p>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="col mb-30">
          <div className="row">
            <span style={{ marginBottom: "2%" }}>
              <strong>
                <StarFill /> {avg} | 후기 {list.length}개
              </strong>
            </span>
          </div>
          <div
            className="row"
            style={{
              display: "grid",
              gridTemplateRows: "1fr",
              gridTemplateColumns: "1fr 1fr",
            }}
          >
            {list.map(
              ({
                rownum,
                rv_idx,
                g_name,
                g_photo,
                l_name,
                g_email,
                rv_content,
                rv_date,
                rv_star,
                rp_idx,
              }) => (
                <ReputationItem
                  opt={1}
                  rownum={rownum}
                  rv_idx={rv_idx}
                  g_name={g_name}
                  g_photo={g_photo}
                  l_name={l_name}
                  g_email={g_email}
                  rv_content={rv_content}
                  rv_date={rv_date}
                  rv_star={rv_star}
                  rp_idx={rp_idx}
                  key={rv_idx}
                />
              )
            )}
          </div>
          {list.length >= 6 ? (
            <div>
              <button
                className="main-btn"
                onClick={() => {
                  setTotalReputation(!totReputation);
                }}
              >
                {totReputation && (
                  <Modal
                    closeModal={() => {
                      setTotalReputation(!totReputation);
                    }}
                  >
                    <TotalReputation
                      list={list}
                      avg={avg}
                      HoIdx={HoIdx}
                      style={{ zIndex: "999" }}
                    />
                  </Modal>
                )}
                후기 모두보기
              </button>
            </div>
          ) : null}
        </div>
      </>
    );
  }
}

export default Reputation;

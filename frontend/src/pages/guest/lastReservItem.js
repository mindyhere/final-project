import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import WriteReview from "./WriteReview_modal";

function LastReservItem({ OIdx, HoName, HoImg, OCkin, OCkout, HName }) {
  let loading = false;
  const url = `http://localhost/static/images/host/hotel/${HoImg}`;
  //const url = `../img/${HoImg}`;
  const navigate = useNavigate();

  // WriteReview 관련
  const [modal, setModal] = useState(false);
  const [writeReview, setWriteReview] = useState(false);
  const reservData = {
    OIdx: `${OIdx}`,
    HoName: `${HoName}`,
    OCkin: `${OCkin}`,
    OCkout: `${OCkout}`,
  };
  function Modal(props) {
    console.log("==> reservData? " + JSON.stringify(reservData));
    function closeModal() {
      props.closeModal();
      setModal(false);
    }

    return (
      <div className="modal_h" onClick={closeModal}>
        <div
          className="modalBody_h"
          style={{ height: "70%" }}
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
    let img = "";
    if (HoImg != null) {
      img = `<img src=${url} width='100px' height='100px' /><br />`;
    }

    return (
      <>
        <div style={{ width: "320px", marginBottom: "50px" }}>
          <div
            style={{
              float: "left",
              width: "120px",
              marginTop: "5px",
              cursor: "pointer",
            }}
            onClick={() => {
              setWriteReview(!writeReview);
            }}
          >
            <span dangerouslySetInnerHTML={{ __html: img }}></span>
          </div>
          <div style={{ float: "left", width: "200px", height: "80px" }}>
            <p style={{ fontSize: "21px", color: "black" }}>{HoName}</p>
            <p style={{ fontSize: "18px" }}>{HName}</p>
            <p style={{ fontSize: "15px", color: "black" }}>
              {OCkin}~{OCkout}
            </p>
            <br />
            <input type="hidden" value={OIdx}></input>
          </div>
        </div>
        {writeReview && (
          <Modal
            closeModal={() => {
              setWriteReview(!writeReview);
            }}
          >
            <WriteReview reservData={reservData} style={{ zIndex: "999" }} />
          </Modal>
        )}
      </>
    );
  }
}
export default LastReservItem;

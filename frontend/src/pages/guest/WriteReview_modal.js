import React, { useRef, useLocation, useParams } from "react";
import { ChatLeftQuote } from "react-bootstrap-icons";

import Cookies from "universal-cookie";

function WriteReview({ reservData }) {
  // const reservData=
  //const reservData = JSON.parse(localStorage.getItem('reservData'))
  //const reservData = {...location.state}; // 예약 데이터 넘겨받을 변수

  const cookies = new Cookies();
  const g_name = cookies.get("g_name");
  const g_email = cookies.get("g_email"); //쿠키변수명
  const g_photo = cookies.get("g_photo");
  const rv_content = useRef();
  const rv_re_idx = useRef();
  const rv_star = useRef();
  const rv_hd_idx = useRef();

  console.log("==> reservData? " + reservData);
  return (
    <>
      <div className="modal_container col" style={{ paddingTop: "15px" }}>
        <h3 className="text-bold">
          <ChatLeftQuote size={35} />
          &nbsp;리뷰작성
        </h3>
        <br />
        <hr />
        <div className="input-group mb-3">
          <br />
          <div
            className="mb-20"
            style={{
              boxSizing: "border-box",
              marginTop: "12px",
              textAlign: "left",
            }}
          >
            <h5>
              {g_name.key} 님,
              <br />
              {reservData.HoName} 에 대한 후기를 남겨주세요!
            </h5>
          </div>
          <div>
            <div className="card-style mb-30 p-3">
              <div
                className="row"
                style={{
                  textAlign: "left",
                }}
              ></div>
              <div
                style={{
                  textAlign: "left",
                }}
              >
                예약번호 : {reservData.OIdx}
                <br />
                이용기간 : {reservData.OCkin} ~ {reservData.OCkout}
                <br />
              </div>
            </div>
            <div className="card-style mb-3">
              <div className="row">별점</div>
              <div>test</div>
            </div>
            <textarea
              className="form-control mb-3"
              rows={5}
              cols={85}
              ref={rv_content}
              placeholder="후기 내용을 입력해주세요"
              style={{
                borderColor: "#FAE0E0",
                borderRadius: "7px",
              }}
            />
            <br />
            <div width="400px">
              <button className="main-btn active" onClick={() => {}}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;등록&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default WriteReview;

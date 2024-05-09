import React, { useRef, useState, useCallback } from "react";
import { ChatLeftQuote, Star, StarFill } from "react-bootstrap-icons";

import Cookies from "universal-cookie";
import Swal from "sweetalert2";

const WriteReview = () => {
  let loading = false;
  const data = JSON.parse(localStorage.getItem("reservData"));
  const cookies = new Cookies();
  // console.log(
  //   "==> 팝업창? " + JSON.stringify(data) + ", " + JSON.stringify(cookies)
  // );

  const g_name = cookies.get("g_name");
  const g_email = cookies.get("g_email");
  const g_photo = cookies.get("g_photo");
  const rv_writer = useRef();
  const rv_content = useRef();
  const rv_star = useRef();
  const [check, setCheck] = useState(false);

  function StarRate() {
    const [star, setStar] = useState(0);
    return (
      <span>
        {[...Array(star)].map((a, i) => (
          <StarFill key={i} onClick={() => setStar(i + 1)} />
        ))}
        {[...Array(5 - star)].map((a, i) => (
          <Star key={i} onClick={() => setStar(star + i + 1)} />
        ))}
        <input type="hidden" value={star} ref={rv_star} />
      </span>
    );
  }
  if (loading) {
    return <div>loading...</div>;
  } else {
    let profile_src = "";
    if (g_photo.key != "-" || g_photo.key != null) {
      const img_url = `http://localhost/static/images/guest/profile/${g_photo.key}`;
      profile_src = `<img class='profile-img' src=${img_url} width='60px' height='60px' style={{backgroundSize:"contain";}} />`;
    } else {
      profile_src =
        "<img class='profile-img' src='http://localhost/static/images/no-image.png' width='50px' height='50px'/>";
    }

    return (
      <>
        <div className="m-2 p-2">
          <div
            className="card-style"
            style={{
              marginTop: "10px",
              borderStyle: "solid",
              borderColor: "#F7EFFC",
              backgroundColor: "#F7EFFC",
            }}
          >
            <h3 className="text-bold">
              <ChatLeftQuote size={35} />
              &nbsp;후기작성
            </h3>
            <hr />
            <div className="input-group mb-3">
              <br />
              <div
                className="card-style col-12 mb-3"
                style={{
                  boxSizing: "border-box",
                  marginTop: "12px",
                  textAlign: "left",
                  float: "left",
                }}
              >
                <div className="row">
                  <div
                    className="col-2"
                    dangerouslySetInnerHTML={{ __html: profile_src }}
                  ></div>
                  <div className="col-10" width="100%">
                    <strong>
                      {g_name.key} 님,
                      <br />
                      {data.HoName} 에 대한 후기를 남겨주세요!
                      <input
                        type="hidden"
                        defaultValue={g_email.key}
                        readOnly
                        ref={rv_writer}
                      />
                    </strong>
                  </div>
                </div>
              </div>
              <div
                className="card-style col-12 mb-3"
                style={{
                  textAlign: "left",
                }}
              >
                <b>예약번호</b> :&nbsp;&nbsp;{data.OIdx}
                <br />
                <b>이용기간</b> :&nbsp;&nbsp;{data.OCkin} ~ {data.OCkout}
                <br />
              </div>
              <div className="card-style col-12 mb-30">
                <div
                  className="col-12 mb-3"
                  style={{ float: "left", display: "inline" }}
                >
                  <b>⭐평점 </b>: &nbsp;&nbsp;{StarRate()}
                </div>

                <textarea
                  className="form-control mb-3"
                  rows={5}
                  cols={85}
                  ref={rv_content}
                  placeholder="내용을 입력해주세요"
                  style={{
                    borderColor: "#FAE0E0",
                    borderRadius: "7px",
                  }}
                  onChange={() => {
                    console.log("***" + rv_content.current.value.length);
                    if (
                      rv_content.current.value.trim() !== "" &&
                      rv_content.current.value !== null
                    ) {
                      setCheck(true);
                    } else {
                      setCheck(false);
                    }
                  }}
                />
              </div>
              <div
                className="col-12 m-0"
                width="400px"
                style={{ textAlign: "right" }}
              >
                <button
                  className={check ? "main-btn active" : "main-btn disabled"}
                  onClick={() => {
                    if (!check) {
                      Swal.fire({
                        icon: "warning",
                        title: "잠깐!",
                        html: "내용을 입력해주세요.(15자 이상)",
                        confirmButtonText: "OK",
                      });
                      return;
                    } else if (rv_content.current.value.length <= 15) {
                      console.log("***" + rv_content.current.value.size);
                      Swal.fire({
                        icon: "warning",
                        title: "잠깐!",
                        html: "내용이 너무 짧습니다.",
                        confirmButtonText: "OK",
                      });
                      return;
                    } else {
                      const form = new FormData();
                      form.append("rv_writer", rv_writer.current.value);
                      form.append("rv_content", rv_content.current.value);
                      form.append("o_idx", data.OIdx);
                      form.append("rv_star", rv_star.current.value);
                      console.log(data.OIdx);
                      console.log(JSON.stringify(form));
                      fetch("http://localhost/api/review/insert", {
                        method: "post",
                        body: form,
                      })
                        .then((response) => {
                          console.log(response);
                          if (!response.ok) {
                            throw new Error("false: " + response.status);
                          }
                          Swal.fire({
                            icon: "success",
                            title: "Thank you!",
                            html: "정상 처리되었습니다.",
                            confirmButtonText: "OK",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              window.close();
                            }
                          });
                        })
                        .catch((error) => {
                          console.log(error);
                          Swal.fire({
                            icon: "error",
                            title: "잠깐!",
                            html: "처리 중 문제가 발생했습니다.<br/>반복실패할 경우, 관리자에게 문의 바랍니다.",
                            confirmButtonText: "OK",
                          });
                        });
                    }
                  }}
                >
                  &nbsp;&nbsp;&nbsp;작성완료&nbsp;&nbsp;&nbsp;
                </button>
                &nbsp;&nbsp;
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default WriteReview;

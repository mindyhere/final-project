import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import Cookies from "universal-cookie";

import { Calendar2Week } from "react-bootstrap-icons";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setData(data);
        // console.log("===> data? " + JSON.stringify(data.guest));
        setLoading(false);
      });
  }, []);
  return [data, loading];
}

function OrderDetail(order_idx) {
  const dataset = JSON.parse(localStorage.getItem("dataset"));
  const cookies = new Cookies();
  const userInfo = cookies.get("userInfo");
  const userIdx = userInfo.h_idx;
  const userEmail = userInfo.h_email;
  const [rdo, setRadio] = useState(dataset.o_state);
  const [disabled, isDisabled] = useState("");
  const [check, setCheck] = useState("");
  console.log(JSON.stringify(dataset));
  // console.log(order_idx);

  function handleStatusChange(e) {
    setRadio(e.target.value);
  }

  const [data, loading] = useFetch(
    `http://localhost/api/order/manage/detail/get/${dataset.g_idx}`
  );

  if (loading) {
    return <div>loading...</div>;
  } else {
    let guest = data.guest;
    let profile_src = "";
    if (guest.g_photo !== "-") {
      const img_url = `http://localhost/static/images/guest/photo/${guest.g_photo}`;
      profile_src = `<img class='profile-img' src=${img_url} width='60px' height='60px' style={{backgroundSize:"contain";}} />`;
    } else {
      profile_src =
        "<img class='profile-img' src='http://localhost/static/images/no-image.png' width='50px' height='50px'/>";
    }
    return (
      <>
        <div className="modal_container" style={{ paddingTop: "15px" }}>
          <h3 className="text-bold mb-30">
            <Calendar2Week size={35} />
            &nbsp;DETAIL
          </h3>
          <hr />
          <div className="card-style" style={{ maxHeight: "300px" }}>
            <div className="row mb-20">
              <div className="col-3">
                <span dangerouslySetInnerHTML={{ __html: profile_src }}></span>
              </div>
              <div className="col-9" style={{ paddingLeft: "5%" }}>
                <h4>Guest Information</h4>
                <strong>이름 : {guest.g_name}</strong>
                <br />
                이메일 : {guest.g_email}
                <br />
                연락처 : {guest.g_phone}
                <br />
              </div>
            </div>
          </div>
          <div className="card-style">
            <div className="row" style={{ textAlign: "left" }}>
              <h4>Reservation Deatil</h4>
            </div>
            <div style={{ textAlign: "left" }}>
              <table className="tbl">
                <colgroup>
                  <col width={"20%"} />
                  <col width={"30%"} />
                  <col width={"20%"} />
                  <col width={"30%"} />
                </colgroup>
                <tbody>
                  <tr>
                    <th colSpan={1}>예약번호</th>
                    <td colSpan={3}>&nbsp;&nbsp;{dataset.o_idx}</td>
                  </tr>
                  <tr>
                    <th colSpan={1}>구분</th>
                    <td colSpan={1}>&nbsp;&nbsp;{dataset.ho_name}</td>
                    <th colSpan={1} style={{ width: "25%" }}>
                      객실유형
                    </th>
                    <td colSpan={1}>&nbsp;&nbsp;{dataset.d_room_type}</td>
                  </tr>
                  <tr>
                    <th colSpan={1}>체크인</th>
                    <td colSpan={1}>&nbsp;&nbsp;{dataset.o_ckin}</td>
                    <th colSpan={1} style={{ width: "25%" }}>
                      체크아웃
                    </th>
                    <td colSpan={1}>&nbsp;&nbsp;{dataset.o_ckin}</td>
                  </tr>
                  <tr>
                    <th colSpan={1}>투숙인원</th>
                    <td colSpan={1}>
                      &nbsp;&nbsp;총&nbsp;<b>{dataset.sum}</b>
                      &nbsp;명
                    </td>
                    <td colSpan={2}>
                      &nbsp;&nbsp;성인(
                      <b>{dataset.o_adult}</b>) , 어린이(
                      <b>{dataset.o_child}</b>
                      ), 유아(
                      <b>{dataset.o_baby}</b>)
                    </td>
                  </tr>
                  <tr>
                    <th colSpan={1}>예약상태</th>
                    <td colSpan={3}>
                      <div
                        className="form-check form-check-inline"
                        style={{ marginLeft: "2%" }}
                      >
                        <input
                          className="form-check-input"
                          type="radio"
                          name="o_state"
                          value="1"
                          checked={rdo == "1"}
                          onChange={handleStatusChange}
                          // disabled={!disabled}
                          id="rdo1"
                        />
                        <label className="form-check-label" htmlFor="rdo1">
                          대기
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="o_state"
                          value="2"
                          checked={rdo == "2"}
                          onChange={handleStatusChange}
                          // disabled={disabled}
                          id="rdo2"
                        />

                        <label className="form-check-label" htmlFor="rdo2">
                          취소
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="o_state"
                          value="3"
                          checked={rdo == "3"}
                          onChange={handleStatusChange}
                          // disabled={!disabled}
                          id="rdo3"
                        />
                        <label className="form-check-label" htmlFor="rdo3">
                          확정
                        </label>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th colSpan={1}>총 금액</th>
                    <td colSpan={1}>
                      &nbsp;&nbsp;{dataset.o_finalprice}&nbsp;&nbsp;원
                    </td>
                    <th colSpan={1}>결제방법</th>
                    <td colSpan={1}>&nbsp;&nbsp;{dataset.o_payment}</td>
                  </tr>
                  <tr>
                    <th colSpan={1}>예약접수일</th>
                    <td colSpan={3}>&nbsp;&nbsp;{dataset.o_orderdate}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            {dataset.o_state == "1" ? (
              <button
                className={rdo == "3" ? "main-btn active" : "main-btn disabled"}
                disabled={rdo == "3" ? false : true}
                style={
                  rdo == "3"
                    ? { cursor: "pointer", marginRight: "3%" }
                    : { cursor: "auto", marginRight: "3%" }
                }
                onClick={() => {
                  Swal.fire({
                    icon: "question",
                    title: "Check",
                    input: "password",
                    inputLabel: "예약을 확정할까요?",
                    inputPlaceholder: "비밀번호를 입력해주세요",
                    inputAttributes: {
                      autocapitalize: "off",
                      autocorrect: "off",
                    },
                    showCancelButton: true,
                    cancelButtonText: "CANCEL",
                    confirmButtonText: "CONFIRM",
                    showLoaderOnConfirm: true,
                    preConfirm: (pwd) => {
                      return fetch(
                        `http://localhost/api/host/pwdCheck/${pwd}?userEmail=${userEmail}`
                      )
                        .then((response) => {
                          if (!response.ok) {
                            throw new Error("false: " + response.status);
                          }
                          const form = new FormData();
                          form.append("opt", 1);
                          form.append("oidx", dataset.o_idx);
                          form.append("hidx", userIdx);
                          form.append("idx", dataset.g_idx);
                          console.log("==> form?" + JSON.stringify(form));

                          return fetch(
                            `http://localhost/api/order/manage/confirm/${dataset.o_idx}`,
                            {
                              method: "post",
                              body: form,
                            }
                          ).then((response) => {
                            if (!response.ok) {
                              throw new Error("false: " + response.status);
                            }
                            return response.text();
                          });
                        })
                        .catch((error) => {
                          console.log(error);
                          Swal.showValidationMessage(
                            `처리 중 문제가 발생했습니다. 비밀번호를 확인해주세요.<br/>반복실패할 경우, 관리자에게 문의 바랍니다.`
                          );
                        });
                    },
                    allowOutsideClick: () => !Swal.isLoading(),
                  }).then((result) => {
                    if (result.isConfirmed) {
                      console.log(result.value);
                      Swal.fire({
                        icon: "success",
                        title: "Success",
                        html: "정상처리 되었습니다.",
                        showConfirmButton: false,
                        timer: 2000,
                      }).then(() => {
                        localStorage.removeItem("dataset");
                        window.location.reload();
                      });
                    }
                  });
                }}
              >
                &nbsp;&nbsp;&nbsp;예약확정&nbsp;&nbsp;&nbsp;
              </button>
            ) : null}
            {dataset.o_state == "2" ? null : (
              <button
                className={"main-btn"}
                disabled={rdo == "2" ? false : true}
                style={
                  rdo == "2"
                    ? { cursor: "pointer", backgroundColor: "#C6C7C8" }
                    : { cursor: "auto", backgroundColor: "#C6C7C8" }
                }
                onClick={() => {
                  Swal.fire({
                    icon: "warning",
                    title: "잠깐!",
                    input: "password",
                    inputLabel: "예약을 취소하시겠습니까?",
                    inputPlaceholder: "비밀번호를 입력해주세요",
                    inputAttributes: {
                      autocapitalize: "off",
                      autocorrect: "off",
                    },
                    showCancelButton: true,
                    cancelButtonText: "CANCEL",
                    confirmButtonText: "CONFIRM",
                    showLoaderOnConfirm: true,
                    preConfirm: (pwd) => {
                      return fetch(
                        `http://localhost/api/host/pwdCheck/${pwd}?userEmail=${userEmail}`
                      )
                        .then((response) => {
                          if (!response.ok) {
                            throw new Error("false: " + response.status);
                          }
                          const form = new FormData();
                          form.append("opt", 0);
                          form.append("oidx", dataset.o_idx);
                          form.append("hidx", userIdx);
                          form.append("idx", dataset.g_idx);
                          console.log("==> form?" + JSON.stringify(form));

                          return fetch(
                            `http://localhost/api/order/manage/cancel/${dataset.o_idx}`,
                            {
                              method: "post",
                              body: form,
                            }
                          ).then((response) => {
                            if (!response.ok) {
                              throw new Error("false: " + response.status);
                            }
                            return response.text();
                          });
                        })
                        .catch((error) => {
                          console.log(error);
                          Swal.showValidationMessage(
                            `처리 중 문제가 발생했습니다. 비밀번호를 확인해주세요.<br/>반복실패할 경우, 관리자에게 문의 바랍니다.`
                          );
                        });
                    },
                    allowOutsideClick: () => !Swal.isLoading(),
                  }).then((result) => {
                    if (result.isConfirmed) {
                      console.log(result.value);
                      Swal.fire({
                        icon: "success",
                        title: "Success",
                        html: "정상처리 되었습니다.",
                        showConfirmButton: false,
                        timer: 2000,
                      }).then(() => {
                        localStorage.removeItem("dataset");
                        window.location.reload();
                      });
                    }
                  });
                }}
              >
                &nbsp;&nbsp;&nbsp;예약취소&nbsp;&nbsp;&nbsp;
              </button>
            )}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </div>
        </div>
      </>
    );
  }
}
export default OrderDetail;

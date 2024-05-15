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
  const [img, setImage] = useState("");
  const [check, setCheck] = useState(false);
  console.log(JSON.stringify(dataset));
  // console.log(order_idx);

  // function getImage(url) {
  //   fetch(url)
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setImage(data.img);
  //     });
  // }

  const [data, loading] = useFetch(
    `http://localhost/api/order/manage/detail/get/${dataset.g_idx}`
  );

  if (loading) {
    return <div>loading...</div>;
  } else {
    let guest = data.guest;
    let profile_src = "";
    if (guest.g_url !== "-") {
      const img_url = `http://localhost/static/images/guest/profile/${guest.g_url}`;
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
                  <col style={{ width: "25%" }} />
                  <col />
                </colgroup>
                <tbody>
                  <tr>
                    <th>예약번호</th>
                    <td colSpan={3}>&nbsp;&nbsp;{dataset.o_idx}</td>
                  </tr>
                  <tr>
                    <th>구분</th>
                    <td>&nbsp;&nbsp;{dataset.ho_name}</td>
                    <th style={{ width: "25%" }}>객실유형</th>
                    <td>&nbsp;&nbsp;{dataset.d_room_type}</td>
                  </tr>
                  <tr>
                    <th>체크인</th>
                    <td>&nbsp;&nbsp;{dataset.o_ckin}</td>
                    <th style={{ width: "25%" }}>체크아웃</th>
                    <td>&nbsp;&nbsp;{dataset.o_ckin}</td>
                  </tr>
                  <tr>
                    <th>투숙인원</th>
                    <td colSpan={1}>
                      &nbsp;&nbsp;총&nbsp;<b>{dataset.sum}</b>
                      &nbsp;명
                    </td>
                    <td colSpan={2}>
                      &nbsp;&nbsp;성인(
                      <b>
                        {dataset.o_adult}
                      </b>
                      ) , 어린이(
                      <b>
                        {dataset.o_child}
                      </b>
                      ), 유아(
                      <b>
                        {dataset.o_baby}
                      </b>
                      )
                    </td>
                  </tr>
                  <tr>
                    <th>예약상태</th>
                    <td colSpan={3}>
                      <div
                        className="form-check"
                        style={{ float: "left", margin: "0 5% 0 2%" }}
                      >
                        <input
                          className="form-check-input"
                          type="radio"
                          name="state"
                          id="rdo1"
                        />
                        <label className="form-check-label" for="rdo1">
                          test1
                        </label>
                      </div>
                      <div
                        className="form-check"
                        style={{ float: "left", marginRight: "5%" }}
                      >
                        <input
                          className="form-check-input"
                          type="radio"
                          name="state"
                          id="rdo2"
                        />
                        <label className="form-check-label" for="rdo2">
                          test2
                        </label>
                      </div>
                      <div
                        className="form-check"
                        style={{ float: "left", marginRight: "5%" }}
                      >
                        <input
                          className="form-check-input"
                          type="radio"
                          name="state"
                          id="rdo3"
                        />
                        <label className="form-check-label" for="rdo3">
                          test3
                        </label>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th>총 결제금액</th>
                    <td>&nbsp;&nbsp;{dataset.o_finalprice}</td>
                    <th>결제방법</th>
                    <td>&nbsp;&nbsp;{dataset.o_payment}</td>
                  </tr>
                  <tr>
                    <th>예약접수일</th>
                    <td colSpan={3}>&nbsp;&nbsp;{dataset.o_orderdate}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <button
              className={check ? "main-btn active" : "main-btn disabled"}
              onClick={() => {
                if (!check) {
                  Swal.fire({
                    icon: "warning",
                    title: "잠깐!",
                    html: "변경사항이 없습니다.<br/>예약상태를 다시 한번 확인해주세요.",
                    confirmButtonText: "OK",
                  });
                  return;
                } else {
                  Swal.fire({
                    icon: "info",
                    title: "잠깐!",
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
                      return (
                        fetch()
                          //`http://localhost/api/host/pwdCheck/${pwd}?userEmail=${userEmail}`
                          .then((response) => {
                            if (!response.ok) {
                              throw new Error("false: " + response.status);
                            }

                            const form = new FormData();
                            form.append("o_idx", dataset.o_idx);
                            // form.append("oder_state", o_state.current.value);
                            console.log("==> form?" + JSON.stringify(form));

                            // return fetch(`http://localhost/api/reply/edit`, {
                            //   method: "post",
                            //   body: form,
                            // }).then((response) => {
                            //   if (!response.ok) {
                            //     throw new Error("false: " + response.status);
                            //   }
                            //   return response.text();
                            // });
                          })
                          .catch((error) => {
                            console.log(error);
                            Swal.showValidationMessage(
                              `처리 중 문제가 발생했습니다. 비밀번호를 확인해주세요.<br/>반복실패할 경우, 관리자에게 문의 바랍니다.`
                            );
                          })
                      );
                    },
                    allowOutsideClick: () => !Swal.isLoading(),
                  }).then((result) => {
                    if (result.isConfirmed) {
                      // console.log(result.value);
                      Swal.fire({
                        icon: "success",
                        title: "Success",
                        html: "정상처리 되었습니다.",
                        showConfirmButton: false,
                        timer: 2000,
                      }).then(() => {
                        localStorage.removeItem("dataset");
                        window.opener.location.reload(); // 부모창
                        window.close(); // 창닫기
                      });
                    }
                  });
                }
              }}
            >
              &nbsp;&nbsp;&nbsp;예약확정&nbsp;&nbsp;&nbsp;
            </button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button
              className={"main-btn"}
              style={{ backgroundColor: "#C6C7C8" }}
              // onClick={() => {
              //   Swal.fire({
              //     icon: "info",
              //     title: "잠깐!",
              //     input: "password",
              //     inputLabel: "예약을 취소하시겠습니까?",
              //     inputPlaceholder: "비밀번호를 입력해주세요",
              //     inputAttributes: {
              //       autocapitalize: "off",
              //       autocorrect: "off",
              //     },
              //     showCancelButton: true,
              //     cancelButtonText: "CANCEL",
              //     confirmButtonText: "CONFIRM",
              //     showLoaderOnConfirm: true,
              //     preConfirm: (pwd) => {
              //       return fetch(
              //         `http://localhost/api/host/pwdCheck/${pwd}?userEmail=${userEmail}`
              //       )
              //         .then((response) => {
              //           if (!response.ok) {
              //             throw new Error("false: " + response.status);
              //           }
              //           let rp_idx = data.rp_idx;
              //           return fetch(
              //             `http://localhost/api/reply/delete/${rp_idx}`
              //           ).then((response) => {
              //             if (!response.ok) {
              //               throw new Error("false: " + response.status);
              //             }
              //             return response.text();
              //           });
              //         })
              //         .catch((error) => {
              //           console.log(error);
              //           Swal.showValidationMessage(
              //             `처리 중 문제가 발생했습니다. 비밀번호를 확인해주세요.<br/>반복실패할 경우, 관리자에게 문의 바랍니다.`
              //           );
              //         });
              //     },
              //     allowOutsideClick: () => !Swal.isLoading(),
              //   }).then((result) => {
              //     if (result.isConfirmed) {
              //       // console.log(result.value);
              //       Swal.fire({
              //         icon: "success",
              //         title: "Success",
              //         html: "정상처리 되었습니다.",
              //         showConfirmButton: false,
              //         timer: 2000,
              //       }).then(() => {
              //         localStorage.removeItem("editData");
              //         window.opener.location.reload(); // 부모창
              //         window.close(); // 창닫기
              //       });
              //     }
              //   });
              // }}
            >
              &nbsp;&nbsp;&nbsp;예약취소&nbsp;&nbsp;&nbsp;
            </button>
          </div>
        </div>
      </>
    );
  }
}
export default OrderDetail;

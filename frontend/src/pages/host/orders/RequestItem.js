import React from "react";

import Swal from "sweetalert2";
import Cookies from "universal-cookie";

function RequestItem({
  o_idx,
  g_idx,
  ho_idx,
  ho_name,
  d_idx,
  d_room_type,
  o_ckin,
  o_ckout,
  ru_startDate,
  ru_endDate,
  o_adult,
  o_child,
  o_baby,
  ru_adult,
  ru_child,
  ru_baby,
  bfsum,
  sum,
  g_email,
  g_name,
  g_url,
}) {
  let loading = false;
  const cookies = new Cookies();
  const userInfo = cookies.get("userInfo");
  const userIdx = userInfo.h_idx;
  const userEmail = userInfo.h_email;

  if (loading) {
    return <div>로딩 중...</div>;
  } else {
    let profile_src = "";
    if (g_url !== "-") {
      const img_url = `http://localhost/static/images/guest/profile/${g_url}`;
      profile_src = `<img class='profile-img' src=${img_url} width='60px' height='60px' style={{background-size:"contain" }} />`;
    } else {
      profile_src =
        "<img class='profile-img' src='http://localhost/static/images/no-image.png' width='50px' height='50px'/>";
    }
    return (
      <div
        className="container m-0"
        style={{ width: "770px", height: "205px" }}
      >
        <table className="tbl" style={{ margin: "0" }}>
          <colgroup>
            <col width={"20%"} />
            <col width={"40%"} />
            <col width={"40%"} />
          </colgroup>
          <tbody>
            <tr>
              <th>고객정보</th>
              <td colSpan={2}>
                <div
                  className="row m-0"
                  style={{
                    paddingRight: "3%",
                  }}
                >
                  <div
                    className="col-2  my-auto"
                    style={{
                      width: "80px",
                      display: "inline",
                      float: "left",
                    }}
                    dangerouslySetInnerHTML={{ __html: profile_src }}
                  ></div>
                  <div
                    className="col my-auto"
                    style={{
                      height: "60px",
                      display: "inline",
                    }}
                  >
                    이름:&nbsp;&nbsp;{g_name}
                    <br />
                    이메일:&nbsp;&nbsp;{g_email}
                  </div>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <div
                    className="col-2 py-3"
                    style={{
                      height: "60px",
                      display: "inline",
                    }}
                  >
                    <button
                      className="btnCheck active"
                      onClick={() => {
                        Swal.fire({
                          icon: "question",
                          title: "Check",
                          input: "password",
                          inputLabel: "변경된 예약내용을 확정할까요?",
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
                                form.append("oidx", o_idx);
                                form.append("ckin", ru_startDate);
                                form.append("ckout", ru_endDate);
                                form.append("adult", ru_adult);
                                form.append("child", ru_child);
                                form.append("baby", ru_baby);
                                form.append("hidx", userIdx);
                                console.log("==> form?" + JSON.stringify(form));

                                return fetch(
                                  `http://localhost/api/order/manage/modify/${o_idx}`,
                                  {
                                    method: "post",
                                    body: form,
                                  }
                                ).then((response) => {
                                  if (!response.ok) {
                                    throw new Error(
                                      "false: " + response.status
                                    );
                                  }
                                  return response.text();
                                });
                              })
                              .catch((error) => {
                                console.log(error);
                                Swal.showValidationMessage(
                                  `문제가 발생했습니다. 비밀번호 또는 예약대기 목록을 우선 확인해주세요.<br/>반복실패 시, 관리자에게 문의 바랍니다.`
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
                              window.location.reload();
                            });
                          }
                        });
                      }}
                    >
                      CONFIRM
                    </button>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th>예약번호 : {o_idx}</th>
              <th>기존 예약</th>
              <th style={{ color: "#6f48eb" }}>변경 요청</th>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>
                {ho_name}
                <br />
                {d_room_type}
              </td>
              <td>
                {o_ckin} ~ {o_ckout}
                <br />총 <b>{bfsum}</b>인 : 성인({o_adult}) , 어린이(
                {o_child}), 유아(
                {o_baby})
              </td>
              <td>
                {ru_startDate} ~ {ru_endDate}
                <br />총 <b>{sum}</b>인 : 성인({ru_adult}) , 어린이(
                {ru_child}), 유아(
                {ru_baby})
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default RequestItem;

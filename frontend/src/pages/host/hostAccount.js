import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

import Reviews from "./hostAccount/Reviews";
import Orders from "./hostAccount/Orders";

import Swal from "sweetalert2";
import "./host1.css";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("===> data? " + JSON.stringify(data));
        setData(data);
        setLoading(false);
      });
  }, []);
  return [data, loading];
}

function HostAccount() {
  const cookies = new Cookies();
  const userInfo = cookies.get("userInfo");
  const userIdx = userInfo.h_idx;
  const userEmail = userInfo.h_email;
  const userName = userInfo.h_name;
  const level = userInfo.h_level;

  const [check, setCheck] = useState(false);
  const navigate = useNavigate();
  const [data, loading] = useFetch(
    `http://localhost/api/host/account/${userIdx}`
  );

  if (loading) {
    return <div>loading</div>;
  } else {
    let url = "";
    let profile_src = "";
    if (data.h_profile !== "-" || data.h_profile !== "") {
      url = `http://localhost/static/images/host/profile/${data.h_profile}`;
      profile_src = `<img src=${url} width="100px" style={{backgroundSize:"contain";}} />`;
    } else {
      profile_src =
        "<img src= http://localhost/static/images/host/no-image.png' width='30%'/>";
    }

    const handleEditInfo = () => {
      navigate(`/host/edit/${userIdx}`, {
        state: {
          // 페이지 이동 시 전달할 데이터
          h_idx: `${data.h_idx}`,
          h_email: `${data.h_email}`,
          h_name: `${data.h_name}`,
          h_phone: `${data.h_phone}`,
          h_business: `${data.h_business}`,
          h_level: `${data.h_level}`,
          l_name: `${data.l_name}`,
          h_status: `${data.h_status}`,
          h_regdate: `${data.h_regdate}`,
          h_profile: `${data.h_profile}`,
          h_file: `${data.h_file}`,
          h_description: `${data.h_description}`,
        },
        //replace: true, // 뒤로가기 시 root로 이동
      });
    };

    return (
      <>
        <div className="container min-vh-100">
          <div className="card-style">
            <h3 className="text-bold">
              <img src="/img/info.png" width="35px" height="35px" />
              &nbsp;회원 정보
            </h3>
            <br />
            <div className="row">
              <form>
                <table className="tbl">
                  <colgroup>
                    <col width="20%" />
                    <col width="20%" />
                    <col width="60%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <td
                        className="col"
                        rowSpan={5}
                        style={{
                          boxSizing: "border-box",
                        }}
                      >
                        {level.key === 9 ? (
                          <div
                            className="col"
                            style={{
                              display: "block",
                              position: "sticky",
                            }}
                          >
                            <button
                              className="btnCheck active"
                              style={{ cursor: "none" }}
                              disabled
                            >
                              SUPER
                            </button>
                          </div>
                        ) : (
                          ""
                        )}
                        <div
                          className="col"
                          style={{
                            display: "block",
                            textAlign: "center",
                            margin: "10% 0 10% 0",
                          }}
                          dangerouslySetInnerHTML={{ __html: profile_src }}
                        ></div>
                      </td>
                      <th>이메일(ID)</th>
                      <td colSpan={3}>&nbsp;&nbsp;{userEmail}</td>
                    </tr>
                    <tr>
                      <th>이름</th>
                      <td colSpan={3}>&nbsp;&nbsp;{userName}</td>
                    </tr>
                    <tr>
                      <th>전화번호</th>
                      <td colSpan={3}>&nbsp;&nbsp;{data.h_phone}</td>
                    </tr>
                    <tr>
                      <th>상태</th>
                      <td colSpan={3}>
                        <div className="row">
                          <div className="col-8">
                            &nbsp;&nbsp;{data.h_status}
                          </div>
                          <div className="col-4" style={{ textAlign: "end" }}>
                            <button
                              type="button"
                              value={check}
                              className={
                                "btnCheck " + (check ? "active" : "disabled")
                              }
                              disabled={check ? false : true}
                              style={{
                                backgroundColor: "#C6C7C8",
                              }}
                            >
                              Host승인신청
                            </button>
                            &nbsp;&nbsp;
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <br />
                <div style={{ textAlign: "right" }}>
                  <button
                    type="button"
                    className="main-btn"
                    onClick={() => {
                      Swal.fire({
                        icon: "info",
                        title: "잠깐!",
                        input: "password",
                        inputLabel:
                          "정보 보호를 위해 비밀번호를 다시 한번 확인해주세요.",
                        inputPlaceholder: "비밀번호를 입력해주세요",
                        inputAttributes: {
                          autocapitalize: "off",
                          autocorrect: "off",
                        },
                        confirmButtonText: "CONFIRM",
                        showLoaderOnConfirm: true,
                        preConfirm: (pwd) => {
                          return fetch(
                            `http://localhost/api/host/pwdCheck/${pwd}?userEmail=${userEmail}`
                          )
                            .then((response) => {
                              if (!response.ok) {
                                console.log("false: " + response.status);
                                throw new Error("false: " + response.status);
                              }
                              console.log("확인: " + response.status);

                              return response.json();
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
                          handleEditInfo();
                        }
                      });
                    }}
                  >
                    회원정보수정
                  </button>
                  &nbsp;&nbsp;
                </div>
              </form>
            </div>
          </div>
          <div className="container card-style">
            <h3 className="text-bold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                fill="currentColor"
                className="bi bi-clipboard-data"
                viewBox="0 0 16 16"
              >
                <path d="M4 11a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0zm6-4a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0zM7 9a1 1 0 0 1 2 0v3a1 1 0 1 1-2 0z" />
                <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z" />
                <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z" />
              </svg>
              &nbsp;주문 현황
            </h3>
            <br />
            <Orders />
          </div>
          <div className="container card-style mb-50">
            <h3 className="text-bold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                fill="currentColor"
                className="bi bi-pencil-square"
                viewBox="0 0 16 16"
              >
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                <path
                  fillRule="evenodd"
                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                />
              </svg>
              &nbsp;후기 관리
            </h3>
            <br />
            <Reviews />
          </div>
        </div>
      </>
    );
  }
}
export default HostAccount;

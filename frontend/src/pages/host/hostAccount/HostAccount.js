import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

import Reviews from "./Reviews";
import Orders from "./Orders";

import Swal from "sweetalert2";
import "../host1.css";

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

  const navigate = useNavigate();
  const [data, loading] = useFetch(
    `http://localhost/api/host/account/${userIdx}`
  );

  if (loading) {
    return <div>loading</div>;
  } else {
    let url = "";
    let profile_src = "";

    if (data.h_profile !== "-" && data.h_profile !== "") {
      url = `http://localhost/static/images/host/profile/${data.h_profile}`;
      profile_src = `<img src=${url} width="100px" style={{backgroundSize:"contain";}} />`;
    } else {
      profile_src =
        "<img src='http://localhost/static/images/no-image.png' width='30%'/>";
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
                        {level === 9 ? (
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
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="bi bi-hand-thumbs-up"
                                viewBox="0 0 16 16"
                              >
                                <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2 2 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a10 10 0 0 0-.443.05 9.4 9.4 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a9 9 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.2 2.2 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.9.9 0 0 1-.121.416c-.165.288-.503.56-1.066.56z" />
                              </svg>
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
                            {data.h_status !== "승인완료" ? (
                              data.h_status !== "승인대기" ? (
                                <>
                                  <button
                                    type="button"
                                    className="btnCheck active"
                                    onClick={() => {
                                      if (
                                        data.h_profile !== "-" &&
                                        data.h_file !== "-"
                                      ) {
                                        levelUp(userIdx, 1);
                                      } else {
                                        levelUp(userIdx, 0);
                                      }
                                    }}
                                  >
                                    Host승인신청
                                  </button>
                                </>
                              ) : (
                                <button
                                  type="button"
                                  className="btnCheck disabled"
                                  disabled
                                  style={{ cursor: "none" }}
                                >
                                  신청완료
                                </button>
                              )
                            ) : (
                              ""
                            )}
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

function levelUp(userIdx, opt) {
  if (opt === 1) {
    fetch(`http://localhost/api/host/levelUp/${userIdx}`, {method: "get"})
      .then((response) => {
        console.log("response 확인: " + response.status);
        if (!response.ok) {
          throw new Error("false: " + response.status);
        }
        Swal.fire({
          icon: "success",
          title: "Check",
          html: "신청이 완료되었습니다.<br/>마이페이지에서 처리현황을 확인 할 수 있습니다.",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    console.log(opt);
    Swal.fire({
      icon: "warning",
      title: "잠깐!",
      html: "신청이 거부되었습니다.<br/>프로필/사업자등록증을 업로드해주세요.",
      confirmButtonText: "OK",
    });
  }
}

export default HostAccount;

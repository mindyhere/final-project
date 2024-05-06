import React, { useRef, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

import Swal from "sweetalert2";
import "./host1.css";

function EditHostInfo() {
  const navigate = useNavigate();
  const location = useLocation();
  const data = { ...location.state };

  const cookies = new Cookies();
  const userInfo = cookies.get("userInfo");
  const userIdx = userInfo.h_idx;
  const userEmail = userInfo.h_email;
  const pwd = useRef();
  const [pwdChk, setPwdChk] = useState("");
  const h_email = useRef();
  const h_name = useRef();
  const h_phone = useRef();
  const [phone, setPhone] = useState(data.h_phone);
  const h_business = useRef();
  const h_level = useRef();
  const h_status = useRef();
  const profile = useRef();
  const file = useRef();
  const h_description = useRef();
  const h_regdate = useRef();

  const [check, setCheck] = useState(false);

  const handleChange = (val) => {
    const phoneRegEx = /^[0-9\b -]{0,13}$/;

    if (phoneRegEx.test(val)) {
      setPhone(
        val.replace(/-/g, "").replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")
      );
    }
  };

  const handlePwdTest = (e) => {
    if (pwd.current.value == "") {
      setCheck(false);
    } else {
      e.target.value === pwd.current.value ? setCheck(true) : setCheck(false);
    }
  };

  // 쿠키 정보 업데이트
  const handleCookie = (data) => {
    const time = 3600; // 1hr
    const cookies = new Cookies();
    const expiration = new Date(Date.now() + time * 1000);
    cookies.set("userInfo", data, {
      path: "/",
      expires: expiration,
    });
    console.log(cookies.get("userInfo"));

    setTimeout(() => {
      Swal.fire({
        icon: "info",
        title: "Check",
        html: "세션이 만료되었습니다. 다시 로그인해주세요.",
        timer: 2000,
      }).then(() => {
        navigate("/");
      });
    }, time * 1000);
  };

  let url = "";
  let profile_src = "";
  console.log(data.h_profile);
  if (data.h_profile !== "-" && data.h_profile !== "") {
    url = `http://localhost/static/images/host/profile/${data.h_profile}`;
    profile_src = `<img src=${url} width="100px" style={{backgroundSize:"contain";}} />`;
  } else {
    profile_src =
      "<img src='http://localhost/static/images/no-image.png' width='30%'/>";
  }

  return (
    <>
      <div className="container min-vh-100">
        <h3 className="text-bold">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            fill="currentColor"
            className="bi bi-person-exclamation"
            viewBox="0 0 16 16"
          >
            <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m.256 7a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z" />
            <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0m-3.5-2a.5.5 0 0 0-.5.5v1.5a.5.5 0 0 0 1 0V11a.5.5 0 0 0-.5-.5m0 4a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1" />
          </svg>
          &nbsp;회원정보수정
        </h3>
        <hr />
        <div className="card-style mb-30">
          <div className="row">
            <div
              className="update-image col-4"
              dangerouslySetInnerHTML={{ __html: profile_src }}
              style={{
                display: "block",
                textAlign: "center",
                marginTop: "15%",
              }}
            ></div>
            <div className="col-8">
              <form>
                <table className="tbl">
                  <colgroup>
                    <col style={{ width: "150px" }} />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>이메일(ID)</th>
                      <td colSpan={3}>
                        <input
                          className="form-control"
                          type="email"
                          ref={h_email}
                          defaultValue={userEmail}
                          readOnly
                        />
                      </td>
                    </tr>
                    <tr>
                      <th rowSpan={2}>비밀번호</th>
                      <td colSpan={3}>
                        <input
                          className="form-control"
                          type="password"
                          ref={pwd}
                          placeholder="비밀번호를 입력해주세요"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3}>
                        <input
                          className="form-control"
                          type="password"
                          value={pwdChk}
                          placeholder="비밀번호 확인을 위해 한번 더 입력해주세요"
                          onChange={(e) => {
                            setPwdChk(e.target.value);
                            handlePwdTest(e);
                          }}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>이름</th>
                      <td colSpan={3}>
                        <input
                          className="form-control"
                          type="text"
                          ref={h_name}
                          defaultValue={data.h_name}
                          placeholder="이름을 입력해주세요"
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>전화번호</th>
                      <td colSpan={3}>
                        <input
                          className="form-control"
                          type="text"
                          value={phone}
                          ref={h_phone}
                          maxLength={13}
                          onChange={(e) => {
                            handleChange(e.target.value);
                          }}
                          placeholder="숫자만 입력해주세요"
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>사업자번호</th>
                      <td colSpan={3}>
                        <input
                          className="form-control"
                          type="text"
                          defaultValue={data.h_business}
                          ref={h_business}
                          readOnly
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>등급</th>
                      <td>
                        <input
                          className="form-control"
                          type="text"
                          defaultValue={data.l_name}
                          readOnly
                        />
                        <input
                          className="form-control"
                          type="hidden"
                          ref={h_level}
                          defaultValue={data.h_level}
                          readOnly
                        />
                      </td>
                      <th>상태</th>
                      <td>
                        <input
                          className="form-control"
                          type="text"
                          ref={h_status}
                          defaultValue={data.h_status}
                          readOnly
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>소개</th>
                      <td colSpan={3}>
                        <textarea
                          className="form-control"
                          rows={5}
                          cols={85}
                          defaultValue={
                            data.h_description !== null
                              ? data.h_description
                              : ""
                          }
                          ref={h_description}
                          placeholder="내용을 입력해주세요"
                          style={{
                            borderColor: "#FAE0E0",
                            borderRadius: "7px",
                          }}
                        />
                      </td>
                    </tr>

                    <tr>
                      <th>프로필</th>
                      <td colSpan={3}>
                        <input
                          className="form-control"
                          type="file"
                          ref={profile}
                          accept=".jpg,.jpeg,.png"
                          title="확장자 : jpg, jpeg, png"
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>사업자등록증</th>
                      <td colSpan={3}>
                        {data.h_status === "가입완료" ? (
                          data.h_file !== "-" ? (
                            <>
                              &nbsp;파일명 : [&nbsp;
                              <a
                                className="attach"
                                style={{cursor:"pointer"}}
                                onClick={() => {
                                  window.open(
                                    `http://localhost/static/images/host/profile/${data.h_file}`
                                  );
                                }}
                              >
                                {data.h_file}
                              </a>
                              &nbsp;]
                              <input
                                className="form-control"
                                type="file"
                                ref={file}
                                accept=".jpg,.jpeg,.png,.pdf"
                                title="확장자 : jpg, jpeg, png, pdf"
                              />
                            </>
                          ) : (
                            <>
                              <input
                                className="form-control"
                                type="file"
                                ref={file}
                                accept=".jpg,.jpeg,.png,.pdf"
                                title="확장자 : jpg, jpeg, png, pdf"
                              />
                            </>
                          )
                        ) : (
                          <>
                            <input
                              className="form-control"
                              type="text"
                              value={data.h_file}
                              ref={file}
                              title="파일열기"
                              readOnly
                              onClick={() => {
                                window.open(
                                  `http://localhost/static/images/host/profile/${data.h_file}`
                                );
                              }}
                              style={{ cursor: "pointer" }}
                            />
                          </>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <th>가입일</th>
                      <td colSpan={3}>
                        <input
                          className="form-control"
                          type="text"
                          defaultValue={data.h_regdate}
                          ref={h_regdate}
                          readOnly
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p style={{ textAlign: "center" }}>
                  &nbsp;프로필/사업자등록증 <strong>누락</strong> 시,
                  <span style={{ color: "red" }}>
                    &nbsp;일부 서비스 이용이 제한
                  </span>
                  될 수 있음을 알려드립니다.
                </p>
                <br />
                <div style={{ textAlign: "right" }}>
                  <button
                    type="button"
                    value={check}
                    onClick={() => {
                      if (pwd.current.value == "") {
                        Swal.fire({
                          icon: "warning",
                          title: "잠깐!",
                          html: "비밀번호를 입력하세요.",
                          confirmButtonText: "OK",
                        });
                        return;
                      } else {
                        if (!check) {
                          Swal.fire({
                            icon: "warning",
                            title: "잠깐!",
                            html: "비밀번호가 일치하지 않습니다.",
                            confirmButtonText: "OK",
                          });
                          return;
                        }
                      }
                      if (h_name.current.value == "") {
                        Swal.fire({
                          icon: "warning",
                          title: "잠깐!",
                          html: "이름을 입력하세요.",
                          confirmButtonText: "OK",
                        });
                        return;
                      }
                      if (h_phone.current.value == "") {
                        Swal.fire({
                          icon: "warning",
                          title: "잠깐!",
                          html: "전화번호를 입력하세요.",
                          confirmButtonText: "OK",
                        });
                        return;
                      }

                      const form = new FormData();
                      form.append("h_idx", userIdx);
                      form.append("pwd", pwd.current.value);
                      form.append("h_name", h_name.current.value);
                      form.append("h_phone", h_phone.current.value);
                      form.append("h_description", h_description.current.value);

                      if (profile.current.files.length > 0) {
                        form.append("profile", profile.current.files[0]);
                      }
                      if (
                        data.h_status === "가입완료" &&
                        file.current.files.length > 0
                      ) {
                        form.append("file", file.current.files[0]);
                      }
                      fetch(`http://localhost/api/host/update/${userIdx}`, {
                        method: "post",
                        endType: "multipart/form-data",
                        body: form,
                      })
                        .then((response) => response.ok)
                        .then((data) => {
                          console.log("===> 결과?" + data);
                          if (data) {
                            Swal.fire({
                              icon: "success",
                              title: "Check",
                              html: "계정 정보가 업데이트 되었습니다.</br>메인 화면으로 이동합니다.",
                              confirmButtonText: "YES",
                            }).then((result) => {
                              if (result.isConfirmed) {
                                handleCookie({
                                  h_idx: userIdx,
                                  h_email: userEmail,
                                  h_name: h_name.current.value,
                                  h_level: h_level.current.value,
                                });
                                console.log(
                                  "이동전? " + JSON.stringify(userInfo)
                                );
                                navigate("/");
                              }
                            });
                          } else {
                            Swal.fire({
                              icon: "error",
                              title: "잠깐!",
                              html: "처리 중 문제가 발생했습니다.<br/>반복적으로 실패할 경우, 관리자에게 문의 바랍니다.",
                              confirmButtonText: "OK",
                            });
                          }
                        })
                        .catch((error) => {
                          console.log("===> 결과?" + error);
                          Swal.fire({
                            icon: "error",
                            title: "잠깐!",
                            html: "처리 중 문제가 발생했습니다.<br/>반복적으로 실패할 경우, 관리자에게 문의 바랍니다.",
                            confirmButtonText: "OK",
                          });
                        });
                    }}
                    className={"main-btn " + (check ? "active" : "disabled")}
                  >
                    수정하기
                  </button>
                  &nbsp;&nbsp;
                  <button
                    type="button"
                    className="main-btn"
                    style={{ backgroundColor: "#C6C7C8" }}
                    onClick={() => {
                      Swal.fire({
                        icon: "question",
                        title: "잠깐!",
                        input: "password",
                        inputLabel: "정말로 탈퇴하시겠습니까?",
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
                                console.log("false: " + response.status);
                                throw new Error("false: " + response.status);
                              }
                              console.log("확인: " + response.status);

                              return fetch(
                                `http://localhost/api/host/delete/${userIdx}?userEmail=${userEmail}`
                              ).then((response) => {
                                if (!response.ok) {
                                  throw new Error(response.statusText);
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
                            title: "Complete",
                            html: "정상처리 되었습니다.<br/>그동안 이용해 주셔서 감사합니다.",
                            showConfirmButton: false,
                            timer: 2000,
                          }).then(() => {
                            localStorage.clear();
                            sessionStorage.clear();
                            cookies.remove(
                              "userInfo",
                              { path: "/" },
                              new Date(Date.now())
                            );
                            navigate("/");
                          });
                        }
                      });
                    }}
                  >
                    회원탈퇴
                  </button>
                  &nbsp;&nbsp;
                </div>
              </form>
              <br />
              <br />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditHostInfo;

import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

import Swal from "sweetalert2";
// import "../../asset/css/main.css";
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

function EditHostInfo() {
  const cookies = new Cookies();
  const userIdx = cookies.get("userIdx");
  const userEmail = cookies.get("userEmail");
  const userPhone = cookies.get("userPhone");
  const [data, loading] = useFetch(
    `http://localhost/api/host/account/${userIdx.key}`
  );
  const pwd = useRef();
  const [pwdChk, setPwdChk] = useState("");
  const h_email = useRef();
  const h_name = useRef();
  const h_phone = useRef();
  const [phone, setPhone] = useState(userPhone.key);
  const h_business = useRef();
  const h_level = useRef();
  const h_status = useRef();
  const profile = useRef();
  const file = useRef();
  const h_description = useRef();
  const h_regdate = useRef();
  const navigate = useNavigate();
  const [check, setCheck] = useState(false);

  // 회원탈퇴 시 쿠키삭제
  const removeCookies = () => {
    cookies.remove("userIdx", { path: "/" }, new Date(Date.now()));
    cookies.remove("userEmail", { path: "/" }, new Date(Date.now()));
    cookies.remove("userName", { path: "/" }, new Date(Date.now()));
    cookies.remove("userPhone", { path: "/" }, new Date(Date.now()));
  };

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

  if (loading) {
    return <div>loading</div>;
  } else {
    let src = "";
    let profile_src = "";

    if (data.h_profile !== "-" || data.h_profile !== "") {
      src = `http://localhost/static/images/host/profile/${data.h_profile}`;
      profile_src = `<img src=${src} width="300px" />`;
    } else {
      profile_src = "[미등록]";
    }

    return (
      <>
        <div className="container min-vh-100">
          <h3 className="text-bold">
            <img src="/img/info.png" width="35px" height="35px" />
            &nbsp;회원 정보
          </h3>
          <hr />
          <div className="card-style mb-30">
            <div className="row">
              <div
                className="col-4"
                style={{ textAlign: "center", padding: 0 }}
              >
                <div
                  className="update-image"
                  dangerouslySetInnerHTML={{ __html: profile_src }}
                  style={{ marginTop: "50%" }}
                ></div>
              </div>
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
                            defaultValue={userEmail.key}
                            readOnly
                          />
                        </td>
                      </tr>
                      <tr>
                        <th rowSpan={2}>비밀번호</th>
                        <td colSpan={3}>
                          <input
                            className="form-control"
                            type="new-password"
                            ref={pwd}
                            placeholder="비밀번호를 입력해주세요"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={3}>
                          <input
                            className="form-control"
                            type="new-password"
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
                            ref={h_level}
                            defaultValue={data.l_name}
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
                            defaultValue={data.h_description}
                            ref={h_description}
                            placeholder="&nbsp;내용을 입력해주세요"
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
                            accept="jpg,.jpeg,.png"
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
                                  onClick={() => {
                                    window.open(
                                      `http://localhost/static/images/host/profile/${data.h_file}`
                                    );
                                  }}
                                  className="attach"
                                >
                                  {data.h_file}
                                </a>
                                &nbsp;]
                                <input
                                  className="form-control"
                                  type="file"
                                  ref={file}
                                  accept="jpg,.jpeg,.png,.pdf"
                                  title="확장자 : jpg, jpeg, png, pdf"
                                />
                              </>
                            ) : (
                              <>
                                <input
                                  className="form-control"
                                  type="file"
                                  ref={file}
                                  accept="jpg,.jpeg,.png,.pdf"
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
                        form.append("h_idx", userIdx.key);
                        form.append("pwd", pwd.current.value);
                        form.append("h_name", h_name.current.value);
                        form.append("h_phone", h_phone.current.value);
                        form.append(
                          "h_description",
                          h_description.current.value
                        );

                        if (profile.current.files.length > 0) {
                          form.append("profile", profile.current.files[0]);
                        }
                        if (
                          data.h_status === "가입완료" &&
                          file.current.files.length > 0
                        ) {
                          form.append("file", file.current.files[0]);
                        }
                        fetch(
                          `http://localhost/api/host/update/${userIdx.key}`,
                          {
                            method: "post",
                            endType: "multipart/form-data",
                            body: form,
                          }
                        )
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
                                  cookies.set(
                                    "userName",
                                    { key: h_name.current.value },
                                    {
                                      path: "/",
                                      expires: new Date(Date.now() + 2592000),
                                    }
                                  );
                                  cookies.set(
                                    "userPhone",
                                    { key: h_phone.current.value },
                                    {
                                      path: "/",
                                      expires: new Date(Date.now() + 2592000),
                                    }
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
                            const url = `
                              http://localhost/api/host/delete/${pwd}?userIdx=${userIdx.key}&userEmail=${userEmail.key}
                              `;
                            return fetch(url)
                              .then((response) => {
                                if (!response.ok) {
                                  throw new Error(response.statusText);
                                }
                                return response.text();
                              })
                              .catch((error) => {
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
                              removeCookies();
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
}

export default EditHostInfo;

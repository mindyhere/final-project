import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import "../../guest/aa.css";
import "../host1.css";

function HostJoin() {
  const [email, setEmail] = useState("");
  const userEmail = useRef();
  const pwd = useRef();
  const pwdChk = useRef();
  const h_name = useRef();
  const [phoneNum, setPhoneNum] = useState("");
  const h_phone = useRef();
  const [businessNum, setBusinessNum] = useState("");
  const h_business = useRef();
  const profile = useRef();
  const file = useRef();
  const navigate = useNavigate();
  const [chkdId, setChkdId] = useState("");
  const emailChk = useRef();
  const [check, setCheck] = useState(false);
  const emailRegEx =
    /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;

  const idCheck = (e) => {
    setChkdId(e);
  };

  const handleChange = (val, opt) => {
    const phoneRegEx = /^[0-9\b -]{0,13}$/;
    const businessRegEx = /^[0-9\b -]{0,12}$/;
    switch (opt) {
      case "phone":
        console.log(opt);
        if (phoneRegEx.test(val)) {
          setPhoneNum(
            val.replace(/-/g, "").replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")
          );
        }
        break;
      case "business":
        console.log(opt);
        if (businessRegEx.test(val)) {
          setBusinessNum(
            val.replace(/-/g, "").replace(/(\d{3})(\d{2})(\d{5})/, "$1-$2-$3")
          );
        }
        break;
    }
  };

  const emailCheck = (e) => {
    // 형식에 맞을 경우, true 리턴
    emailRegEx.test(e.target.value) ? setCheck(true) : setCheck(false);
  };

  return (
    <>
      <div className="modal_container" style={{ paddingTop: "15px" }}>
        <h3 className="text-bold">
          <img src="/img/join.png" width="35px" height="35px" />
          &nbsp;회원가입
        </h3>
        <hr />
        <div className="card-style mb-30">
          <form>
            <table className="tbl">
              <colgroup>
                <col style={{ width: "25%" }} />
                <col />
              </colgroup>
              <tbody>
                <tr>
                  <th>이메일(ID)</th>
                  <td>
                    <input
                      className="form-control"
                      type="email"
                      value={email}
                      ref={userEmail}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        emailCheck(e);
                      }}
                      placeholder="이메일을 입력해주세요"
                    />
                    <input type="hidden" value={chkdId} ref={emailChk} />
                  </td>
                  <td>
                    <button
                      type="button"
                      className={"btnCheck " + (check ? "active" : "disabled")}
                      disabled={check ? false : true}
                      onClick={() => {
                        const form = new FormData();
                        form.append("userEmail", userEmail.current.value);
                        fetch(`http://localhost/api/host/idCheck`, {
                          method: "post",
                          body: form,
                        })
                          .then((response) => response.json())
                          .then((data) => {
                            console.log(data);
                            if (data.msg === "ok") {
                              Swal.fire({
                                icon: "success",
                                title: "Check",
                                html: "사용가능한 이메일입니다.",
                                confirmButtonText: "OK",
                              }).then(() => {
                                idCheck(data.msg);
                              });
                            } else {
                              Swal.fire({
                                icon: "warning",
                                title: "잠깐!",
                                html: "이미 사용 중인 이메일입니다.",
                                confirmButtonText: "OK",
                              }).then(() => {
                                idCheck(data.msg);
                              });
                            }
                          });
                      }}
                    >
                      중복 확인
                    </button>
                  </td>
                </tr>
                <tr>
                  <th rowSpan={2}>비밀번호</th>
                  <td colSpan={2}>
                    <input
                      className="form-control"
                      type="password"
                      ref={pwd}
                      placeholder="비밀번호를 입력해주세요"
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <input
                      className="form-control"
                      type="password"
                      ref={pwdChk}
                      placeholder="비밀번호 확인"
                    />
                  </td>
                </tr>
                <tr>
                  <th>이름</th>
                  <td colSpan={2}>
                    <input
                      className="form-control"
                      type="text"
                      ref={h_name}
                      placeholder="이름을 입력해주세요"
                    />
                  </td>
                </tr>
                <tr>
                  <th>전화번호</th>
                  <td colSpan={2}>
                    <input
                      className="form-control"
                      type="text"
                      onChange={(e) => {
                        handleChange(e.target.value, "phone");
                      }}
                      value={phoneNum}
                      ref={h_phone}
                      placeholder="숫자만 입력하세요"
                    />
                  </td>
                </tr>
                <tr>
                  <th>사업자번호</th>
                  <td colSpan={2}>
                    <input
                      className="form-control"
                      type="text"
                      onChange={(e) => {
                        handleChange(e.target.value, "business");
                      }}
                      value={businessNum}
                      ref={h_business}
                      placeholder="숫자만 입력하세요"
                    />
                  </td>
                </tr>
                <tr>
                  <th>프로필</th>
                  <td colSpan={2}>
                    <input className="form-control" type="file" ref={profile} />
                  </td>
                </tr>
                <tr>
                  <th>
                    사업자
                    <br />
                    등록증
                  </th>
                  <td colSpan={2}>
                    <input className="form-control" type="file" ref={file} />
                  </td>
                </tr>
              </tbody>
            </table>

            <p>
              프로필/사업자등록증 <strong>누락</strong> 시,
              <br />
              <span style={{ color: "red" }}>일부 서비스 이용이 제한</span>될 수
              있음을 알려드립니다.
            </p>
            <br />
            <div style={{ textAlign: "center" }}>
              <button
                type="button"
                onClick={() => {
                  if (userEmail.current.value == "") {
                    Swal.fire({
                      icon: "warning",
                      title: "잠깐!",
                      html: "이메일을 입력하세요.",
                      confirmButtonText: "OK",
                    });
                    return;
                  } else {
                    if (
                      emailChk.current.value === "error" ||
                      emailChk.current.value === ""
                    ) {
                      Swal.fire({
                        icon: "warning",
                        title: "잠깐!",
                        html: "이미 사용 중인 이메일입니다.<br/>다른 계정을 입력해주세요.",
                        confirmButtonText: "OK",
                      });
                      return;
                    }
                  }
                  if (pwd.current.value == "") {
                    Swal.fire({
                      icon: "warning",
                      title: "잠깐!",
                      html: "비밀번호를 입력하세요.",
                      confirmButtonText: "OK",
                    });
                    return;
                  } else {
                    if (pwd.current.value === pwdChk.current.value) {
                      console.log("비밀번호 확인");
                    } else {
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
                  if (h_business.current.value == "") {
                    Swal.fire({
                      icon: "warning",
                      title: "잠깐!",
                      html: "사업자번호를 입력하세요.",
                      confirmButtonText: "OK",
                    });
                    return;
                  }
                  const form = new FormData();
                  form.append("userEmail", userEmail.current.value);
                  form.append("pwd", pwd.current.value);
                  form.append("h_name", h_name.current.value);
                  form.append("h_phone", h_phone.current.value);
                  form.append("h_business", h_business.current.value);

                  if (profile.current.files.length > 0) {
                    form.append("profile", profile.current.files[0]);
                  }
                  if (file.current.files.length > 0) {
                    form.append("file", file.current.files[0]);
                  }

                  fetch("http://localhost/api/host/join", {
                    method: "post",
                    endType: "multipart/form-data",
                    body: form,
                  })
                    .then((response) => response.json())
                    .then((data) => {
                      console.log(data);
                      if (data.msg === "success") {
                        Swal.fire({
                          icon: "success",
                          title: "Welcome",
                          html: "회원가입이 완료되었습니다.</br>로그인 페이지로 이동할까요?",
                          showDenyButton: true,
                          confirmButtonText: "YES",
                          denyButtonText: "NO",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            window.location.href = "/host/login";
                          } else if (result.isDenied) {
                            window.location.reload();
                          }
                        });
                      } else {
                        Swal.fire({
                          icon: "error",
                          title: "잠깐!",
                          text: "관리자에게 문의 바랍니다",
                          confirmButtonText: "OK",
                        });
                      }
                    });
                }}
                className="main-btn"
              >
                회원가입
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default HostJoin;
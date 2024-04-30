import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import "../../asset/css/user.css";
import "./aa.css";
import $ from "jquery";

function Join() {
  const userId = useRef();
  const pwd = useRef();
  const h_name = useRef();
  const h_phone = useRef();
  const h_business = useRef();
  const profile = useRef();
  const file = useRef();
  const [msg, setMessage] = useState("");
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [check, setCheck] = useState(false);
//   const idChecked = useRef();

    const idChecked = (e) => {
        setInputValue(e);
    }

  const handleChange = (e) => {
    const regex = /^[0-9\b -]{0,13}$/;
    if (regex.test(e.target.value)) {
      setInputValue(e.target.value);
    }
  };

  useEffect(() => {
    if (inputValue.length > 0) {
      setInputValue(
        inputValue
          .replace(/-/g, "")
          .replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")
      );
    }
  }, [inputValue]);

  const changeButton = () => {
    //console.log(userId.current.value);
    userId.current.value.includes("@" && ".") &&
    userId.current.value.length >= 9
      ? setCheck(true)
      : setCheck(false);
  };

  const formCheck = () => {
    console.log(idChecked.current.value);
    // userId.current.value.includes("@" && ".") &&
    // userId.current.value.length >= 9
    //   ? setCheck(true)
    //   : setCheck(false);
  };

  return (
    <>
      <div className="container min-vh-100" style={{ paddingTop: "15px" }}>
        <h3 className="text-bold">
          {" "}
          <img src="/img/join.png" width="35px" height="35px" />
          회원가입
        </h3>
        <hr />
        <div className="card-style mb-30" style={{ overflowy: "auto" }}>
          <form>
            <div className="input-style-a">
              <h4>이메일</h4>
              <div id="userId" className="fl" style={{ marginLeft: "20px" }}>
                <input
                  ref={userId}
                  onChange={(changeButton)}
                  placeholder="이메일을 입력해주세요"
                />
                <input type="hidden" id="idChecked" value={inputValue}/>
              </div>
              <div className="blank"></div>
              <div className="fl">
                <button
                  type="button"
                  value={check}
                  className={"check-btn" + (check ? "Active" : "Disabled")}
                  onClick={() => {
                    const form = new FormData();
                    form.append("userId", userId.current.value);
                    fetch(`http://localhost/api/host/idCheck`, {
                      method: "post",
                      body: form,
                    })
                      .then((response) => response.json())
                      .then((data) => {
                        setMessage(data);
                        if (data.msg === "ok") {
                          Swal.fire({
                            icon: "success",
                            title: "Check",
                            html: "사용가능한 이메일입니다.",
                            confirmButtonText: "OK",
                          }).then(() => {
                            idChecked(data.msg);
                            //setMessage(data.msg);
                          });
                        } else {
                          Swal.fire({
                            icon: "warning",
                            title: "잠깐!",
                            html: "이미 사용 중인 이메일입니다.",
                            confirmButtonText: "OK",
                          }).then(() => {
                            //setMessage(data.msg);
                          });
                        }
                      });
                  }}
                >
                  중복 체크
                </button>
              </div>
            </div>

            <div className="ii">
              <h4>비밀번호</h4>
            </div>
            <br />
            <div className="input-style-b">
              <input
                type="password"
                ref={pwd}
                placeholder="비밀번호를 입력해주세요"
              />
            </div>
            <br />

            <div className="li">
              <h4>이름</h4>
            </div>
            <br />
            <div className="input-style-b">
              <input
                type="text"
                ref={h_name}
                placeholder="이름을 입력해주세요"
              />
            </div>
            <br />

            <div className="li">
              <h4>전화번호</h4>
            </div>
            <br />
            <div className="input-style-b">
              <input
                type="text"
                ref={h_phone}
                onChange={handleChange}
                value={inputValue}
                placeholder="숫자만 입력하세요"
              />
            </div>
            <br />

            <div className="li">
              <h4>사업자번호</h4>
            </div>
            <br />
            <div className="input-style-b">
              <input
                type="text"
                ref={h_phone}
                onChange={handleChange}
                value={inputValue}
                placeholder="숫자만 입력하세요"
              />
            </div>
            <br />

            <div className="fl" style={{ marginBottom: "20px" }}>
              <h4>프로필</h4>
              <br />
              <div className="input-style-b" style={{ marginRight: "12px" }}>
                <input type="file" ref={profile} />
                <div className="blank"></div>
              </div>
            </div>
            <br />

            <div className="fl" style={{ marginBottom: "20px" }}>
              <h4>사업자등록증</h4>
              <br />
              <div className="input-style-b" style={{ marginRight: "12px" }}>
                <input type="file" ref={file} />
                <div className="blank"></div>
              </div>
            </div>
            <br />
            <p style={{ color: "red" }}>
              프로필/사업자등록증 누락 시, 일부 서비스 이용이 제한될 수 있음을
              알려드립니다.
            </p>

            <div style={{ textAlign: "center" }}>
              <button
                type="button"
                onClick={() => {
                  if (userId.current.value == "") {
                    Swal.fire({
                      icon: "warning",
                      title: "잠깐!",
                      html: "이메일을 입력하세요.",
                      confirmButtonText: "OK",
                    });
                    userId.current.focus();
                    return;
                  }
                  if (pwd.current.value == "") {
                    Swal.fire({
                      icon: "warning",
                      title: "잠깐!",
                      html: "비밀번호를 입력하세요.",
                      confirmButtonText: "OK",
                    });
                    pwd.current.focus();
                    return;
                  }
                  if (h_name.current.value == "") {
                    Swal.fire({
                      icon: "warning",
                      title: "잠깐!",
                      html: "이름을 입력하세요.",
                      confirmButtonText: "OK",
                    });
                    h_name.current.focus();
                    return;
                  }
                  if (h_phone.current.value == "") {
                    Swal.fire({
                      icon: "warning",
                      title: "잠깐!",
                      html: "전화번호를 입력하세요.",
                      confirmButtonText: "OK",
                    });
                    h_phone.current.focus();
                    return;
                  }
                  if (h_business.current.value == "") {
                    Swal.fire({
                      icon: "warning",
                      title: "잠깐!",
                      html: "사업자번호를 입력하세요.",
                      confirmButtonText: "OK",
                    });
                    h_business.current.focus();
                    return;
                  }
                  const form = new FormData();
                  form.append("userId", userId.current.value);
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
                            navigate("/host/login");
                          } else if (result.isDenied) {
                            navigate("/");
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

export default Join;

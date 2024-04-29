import React, { useRef, useState } from "react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router";
import { useSearchParams, Link } from "react-router-dom";
import Swal from "sweetalert2";

function HostLogin() {
  const [params, setParams] = useSearchParams();
  //  데이터 setter
  const msg = params.get("msg");
  const navigate = useNavigate();
  const userId = useRef();
  const pwd = useRef();
  const basicAlert = useState([]);

  return (
    <>
      <div className="container min-vh-100">
        <h3 className="text-bold">
          {" "}
          <img src="/img/login.png" width="35px" height="35px" />
          로그인
        </h3>
        <hr />
        <p className="text-sm text-gray">
          로그인을 하시면 보다 더 많은 정보와 서비스를 이용하실 수 있습니다.
        </p>
        <div className="card-style mb-30">
          <form>
            <div>
              <div className="input-style-1">
                <label>이메일</label>{" "}
                <input ref={userId} placeholder="이메일을 입력해주세요" />
              </div>
              <div className="input-style-1">
                <label>비밀번호</label>{" "}
                <input
                  type="password"
                  ref={pwd}
                  placeholder="비밀번호를 입력해주세요"
                />
              </div>
              <br />
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
                  const form = new FormData();
                  form.append("userId", userId.current.value);
                  form.append("pwd", pwd.current.value);
                  fetch("http://localhost/api/host/login", {
                    method: "post",
                    body: form,
                  })
                    .then((response) => response.json())
                    .then((data) => {
                      console.log(data);
                      if (data.msg == "success") {
                        const cookies = new Cookies();
                        cookies.set(
                          "h_idx",
                          { key: data.dto.h_idx },
                          { path: "/", expires: new Date(Date.now() + 2592000) }
                        ); //30일
                        cookies.set(
                          "h_email",
                          { key: data.dto.h_email },
                          { path: "/", expires: new Date(Date.now() + 2592000) }
                        ); //30일
                        cookies.set(
                          "h_name",
                          { key: data.dto.h_name },
                          { path: "/", expires: new Date(Date.now() + 2592000) }
                        );
                        cookies.set(
                          "h_business",
                          { key: data.dto.h_business },
                          { path: "/", expires: new Date(Date.now() + 2592000) }
                        );
                        cookies.set(
                          "h_status",
                          { key: data.dto.h_status },
                          { path: "/", expires: new Date(Date.now() + 2592000) }
                        );
                        window.location.href = "/";
                        console.log("로그인 성공");
                      } else {
                        Swal.fire({
                          icon: "warning",
                          title: "잠깐!",
                          html: "아이디/비밀번호를 확인해주세요.",
                          confirmButtonText: "OK",
                        });
                      }
                    });
                }}
                id="btnLogin"
                className="main-btn"
              >
                로그인
              </button>
              &nbsp;
            </div>
          </form>
        </div>
        <div
          className="card-style d-flex align-items-center"
          style={{
            backgroundColor: "#E8E8E4",
            border: "1px solid #D5D5D5",
            height: "300px",
          }}
        >
          <div className="col text-center">
            <div className="btnLoginBottom">
              <Link to="/host/searchEmail">
                <img src="/img/id.png" />
                <br /> 아이디 찾기
              </Link>
            </div>
          </div>
          <div className="col text-center">
            <div className="btnLoginBottom">
              <Link to="api/host/findPwd">
                <img src="/img/forgot.png" />
                <br /> 비밀번호 찾기
              </Link>
            </div>
          </div>
          <div className="col text-center">
            <div className="btnLoginBottom">
              <Link
                to="window.open('api/host/join', '', 'width=430, height=500, channelmode=no' )"
                target=""
              >
                <img src="/img/join.png" />
                <br /> 회원가입
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HostLogin;

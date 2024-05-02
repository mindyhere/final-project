import React, { useRef, useState } from "react";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import GuestJoin from "../guest/join";
import HostJoin from "./join_modal";
import "../guest/aa.css";
import "./modalH.css";
import $ from "jquery";

function HostLogin() {
  const [join, setJoin] = useState(false);
  //  데이터 setter
  const userId = useRef();
  const pwd = useRef();
  const [modal, setModal] = useState(false);

  return (
    <>
      <div className="container min-vh-100">
        <h3 className="text-bold">
          <img src="/img/login.png" width="35px" height="35px" />
          &nbsp;로그인
        </h3>
        <hr />
        <p className="text-sm text-gray">
          로그인을 하시면 보다 더 많은 정보와 서비스를 이용하실 수 있습니다.
        </p>
        <div className="card-stylee mb-30">
          <form>
            <div>
              <div className="input-stylee-1">
                <label>이메일</label>
                <input ref={userId} placeholder="이메일을 입력해주세요" />
              </div>
              <div className="input-stylee-1">
                <label>비밀번호</label>
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
                  fetch("http://localhost/api/host/login/", {
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
                className="main-btnn"
              >
                로그인
              </button>
              &nbsp;
            </div>
          </form>
        </div>
        <div
          className="card-stylee d-flex align-items-center"
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
              <div onClick={() => setModal(true)}>
                <img src="/img/join.png" />
                <br /> <label className="text-bold">회원가입</label>
              </div>

              {modal && (
                <div className="Modal" onClick={() => setModal(false)}>
                  <div
                    className="modalBody"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button id="modalCloseBtn" onClick={() => setModal(false)}>
                      X
                    </button>

                    <div className="container" style={{ paddingTop: "15px" }}>
                      <h3 className="text-bold">
                        <img src="/img/join.png" width="35px" height="35px" />
                        &nbsp;회원가입
                      </h3>
                      <hr />
                      <div className="aa">
                        <div
                          className="card-style1"
                          onClick={() => {
                            setJoin(!join);
                          }}
                        >
                          <img
                            src="/img/guest.png"
                            width="100px"
                            height="100px"
                            style={{ marginLeft: "10px" }}
                          />
                          <label
                            className="text-bold"
                            style={{ paddingTop: "20px" }}
                          >
                            게스트
                          </label>
                          {join && (
                            <Modall
                              closeModal={() => {
                                setJoin(!join);
                              }}
                            >
                              <GuestJoin />
                            </Modall>
                          )}
                        </div>

                        <div
                          className="card-style2"
                          onClick={() => {
                            setJoin(!join);
                          }}
                        >
                          <img
                            src="/img/host.png"
                            width="100px"
                            height="100px"
                          />
                          <label
                            className="text-bold"
                            style={{ paddingTop: "20px" }}
                          >
                            호스트
                          </label>
                          {join && (
                            <Modall
                              closeModal={() => {
                                setJoin(!join);
                              }}
                            >
                              <HostJoin />
                            </Modall>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );

  function Modall(props) {
    function closeModal() {
      props.closeModal();
      setModal(false);
    }

    return (
      <div className="modal_h" onClick={closeModal}>
        <div className="modalBody_h" onClick={(e) => e.stopPropagation()}>
          <button id="modalCloseBtn" onClick={closeModal}>
            X
          </button>
          {props.children}
        </div>
      </div>
    );
  }
}

export default HostLogin;

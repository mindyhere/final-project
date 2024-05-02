import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import GuestJoin from "../pages/guest/join";
import HostJoin from "../pages/host/join_modal";

import "../pages/guest/modall.css";
import "../pages/host/modalH.css";

import Swal from "sweetalert2";
import Cookies from "universal-cookie";

function Header() {
  const navigate = useNavigate();
  const [modal_1, setModal_1] = useState(false);
  const [modal, setModal] = useState(false);
  const [join, setJoin] = useState(false);
  const cookies = new Cookies();

  //게스트 쿠키
  const g_name = cookies.get("g_name");
  const g_email = cookies.get("g_email");
  const g_level = cookies.get("g_level");

  //호스트 쿠키
  const userNo = cookies.get("userNo");
  const userId = cookies.get("userId");
  const userName = cookies.get("userName");

  //쿠키삭제
  const removeCookies = (type) => {
    switch (type) {
      case "guest":
        cookies.remove("g_name", { path: "/" }, 100);
        cookies.remove("g_email", { path: "/" }, new Date(Date.now()));
        cookies.remove("g_level", { path: "/" }, new Date(Date.now()));
        break;
      case "host":
        cookies.remove("userNo", { path: "/" }, new Date(Date.now()));
        cookies.remove("userId", { path: "/" }, new Date(Date.now()));
        cookies.remove("userName", { path: "/" }, new Date(Date.now()));
        break;
    }
  };

  if (userId == null && g_email == null) {
    console.log("로그인X ==> " + cookies.stringify);
    return (
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img
              src="/img/airbnb.png"
              href="/"
              width="170px"
              height="62px"
              style={{ padding: "0.5rem" }}
            ></img>
          </a>

          {/*로그인 전 상단*/}
          <div align="right">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li
                className="nav-item rounded"
                style={{ display: "inline-block" }}
              >
                <a
                  className="nav-link active"
                  onClick={() => {
                    setModal_1(true);
                  }}
                >
                  로그인
                </a>
              </li>
              {modal_1 && (
                <div className="Modal" onClick={() => setModal_1(false)}>
                  <div
                    className="modalBody"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      id="modalCloseBtn"
                      onClick={() => setModal_1(false)}
                    >
                      X
                    </button>

                    <div
                      className="container min-vh-100"
                      style={{ paddingTop: "15px" }}
                    >
                      <h3 className="text-bold">
                        {" "}
                        <img src="/img/login.png" width="35px" height="35px" />
                        &nbsp;로그인
                      </h3>
                      <hr />
                      <div className="aa">
                        <div
                          className="card-style1"
                          onClick={() => {
                            setModal_1(false);
                            navigate("/guest/login");
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
                        </div>

                        <div
                          className="card-style2"
                          onClick={() => {
                            setModal_1(false);
                            navigate("/host/login");
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
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <li
                className="nav-item rounded"
                style={{ display: "inline-block" }}
              >
                <a
                  className="nav-link active"
                  onClick={() => {
                    setModal(true);
                  }}
                >
                  회원가입
                </a>
              </li>
              {modal && (
                <div className="Modal" onClick={() => setModal(false)}>
                  <div
                    className="modalBody"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button id="modalCloseBtn" onClick={() => setModal(false)}>
                      X
                    </button>

                    <div
                      className="container min-vh-100"
                      style={{ paddingTop: "15px" }}
                    >
                      <h3 className="text-bold">
                        {" "}
                        <img src="/img/join.png" width="35px" height="35px" />
                        회원가입
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
                                console.log("게스트");
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
                                console.log("호스트");
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
              <li
                className="nav-item rounded"
                style={{ display: "inline-block" }}
              >
                <a
                  className="nav-link active"
                  onClick={() => navigate("/guest/Account")}
                >
                  도움말센터
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  } else {
    console.log("로그인O ==> " + cookies.stringify);
    if (userId == null && g_email != null) {
      //게스트 계정으로 로그인
      console.log("guest 로그인 ==> " + g_email);
      return (
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">
              <img
                src="/img/airbnb.png"
                href="/"
                width="170px"
                height="70px"
                style={{ padding: "0.5rem" }}
              ></img>
            </a>

            <div align="right">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li
                  className="nav-item rounded"
                  style={{ display: "inline-block" }}
                >
                  <a
                    className="nav-link active"
                    onClick={() => {
                      setModal_1(true);
                    }}
                  >
                    로그인
                  </a>
                </li>
                {modal_1 && (
                  <div className="Modal" onClick={() => setModal_1(false)}>
                    <div
                      className="modalBody"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        id="modalCloseBtn"
                        onClick={() => setModal_1(false)}
                      >
                        X
                      </button>

                      <div
                        className="container min-vh-100"
                        style={{ paddingTop: "15px" }}
                      >
                        <h3 class="text-bold">
                          {" "}
                          <img
                            src="/img/login.png"
                            width="35px"
                            height="35px"
                          />
                          &nbsp;로그인
                        </h3>
                        <hr />
                        <div class="aa">
                          <div
                            class="card-style1"
                            onClick={() => {
                              setModal_1(false);
                              navigate("/guest/login");
                            }}
                          >
                            <img
                              src="/img/guest.png"
                              width="100px"
                              height="100px"
                              style={{ marginLeft: "10px" }}
                            />
                            <label
                              class="text-bold"
                              style={{ paddingTop: "20px" }}
                            >
                              게스트
                            </label>
                          </div>

                          <div
                            class="card-style2"
                            onClick={() => {
                              setModal_1(false);
                              navigate("/host/login");
                            }}
                          >
                            <img
                              src="/img/host.png"
                              width="100px"
                              height="100px"
                            />
                            <label
                              class="text-bold"
                              style={{ paddingTop: "20px" }}
                            >
                              호스트
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <li
                  className="nav-item rounded"
                  style={{ display: "inline-block" }}
                >
                  <a
                    className="nav-link active"
                    onClick={() => {
                      setModal(true);
                    }}
                  >
                    회원가입
                  </a>
                </li>
                {modal && (
                  <div className="Modal" onClick={() => setModal(false)}>
                    <div
                      className="modalBody"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        id="modalCloseBtn"
                        onClick={() => setModal(false)}
                      >
                        X
                      </button>

                      <div
                        className="container min-vh-100"
                        style={{ paddingTop: "15px" }}
                      >
                        <h3 class="text-bold">
                          {" "}
                          <img src="/img/join.png" width="35px" height="35px" />
                          회원가입
                        </h3>
                        <hr />
                        <div class="aa">
                          <div
                            class="card-style1"
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
                              class="text-bold"
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
                                <Join />
                              </Modall>
                            )}
                          </div>

                          <div
                            class="card-style2"
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
                              class="text-bold"
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
                                <Join />
                              </Modall>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <li
                  className="nav-item rounded"
                  style={{ display: "inline-block" }}
                >
                  <a
                    className="nav-link active"
                    onClick={() => navigate("/guest/Account")}
                  >
                    도움말센터
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      );
    } else if (userId != null && g_email == null) {
      //호스트계정으로 로그인 했을 때
      console.log("host 로그인 ==> " + userId);
      return (
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">
              <img
                src="/img/airbnb.png"
                href="/"
                width="170px"
                height="70px"
                style={{ padding: "0.5rem" }}
              ></img>
            </a>

            {/* 호스트로그인 후 상단 */}
            <div align="right">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" href="#">
                    계정
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" href="#">
                    호텔
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" href="#">
                    주문
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    onClick={() => {
                      Swal.fire({
                        icon: "question",
                        title: "잠깐!",
                        html: "로그아웃 하시겠습니까?",
                        showCancelButton: true,
                        confirmButtonText: "YES",
                        cancelButtonText: "NO",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          localStorage.clear();
                          sessionStorage.clear();
                          removeCookies("host");
                          try {
                            window.location.reload();
                          } catch {
                            Swal.fire({
                              icon: "info",
                              title: "Check",
                              html: "메인 페이지로 이동합니다.",
                              confirmButtonText: "Yes",
                            }).then((result) => {
                              window.location.href = "/";
                            });
                          }
                        }
                      });
                    }}
                  >
                    로그아웃
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      );
    }
  }

  function Modall(props) {
    function closeModal() {
      props.closeModal();
      setModal(false);
    }

    return (
      <div className="Modal_a" onClick={closeModal}>
        <div className="modalBody_a" onClick={(e) => e.stopPropagation()}>
          <button id="modalCloseBtn" onClick={closeModal}>
            X
          </button>
          {props.children}
        </div>
      </div>
    );
  }
}

export default Header;

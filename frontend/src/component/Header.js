import React, { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import Join from "../pages/guest/join";
import HostJoin from "../pages/host/Join_modal";

import "../pages/guest/modall.css";
import "../pages/host/host1.css";

import Swal from "sweetalert2";
import Cookies from "universal-cookie";

// function useFetch(url) {
//   const [data,setData] = useState(null);
//   const [loading,setLoading] = useState(true);

//   useEffect(()=>{
//       fetch(url)
//           .then(response=>{
//               return response.json();
//           })
//           .then(data=>{
//               setData(data);
//               setLoading(false);
//           })
//   }, []);
//   return [data,loading];
// }

function Header() {
  const navigate = useNavigate();
  const [modal_1, setModal_1] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const modalBackground = useRef();
  const [join, setJoin] = useState(false);
  const [hostJoin, setHostJoin] = useState(false);
  const cookies = new Cookies();

  //게스트 쿠키
  const g_idx = cookies.get("g_idx");
  const g_name = cookies.get("g_name");
  const g_email = cookies.get("g_email"); //쿠키변수명
  const g_level = cookies.get("g_level");
  const g_phone = cookies.get("g_phone");

  //호스트 쿠키
  const userIdx = cookies.get("userIdx");
  const userEmail = cookies.get("userEmail");
  const userName = cookies.get("userName");

  //const [data,loading]=useFetch('http://localhost/guest/my?g_idx='+g_idx);

  //쿠키삭제
  const removeCookies = (type) => {
    switch (type) {
      case "guest":
        cookies.remove("g_idx", { path: "/" }, 100);
        cookies.remove("g_name", { path: "/" }, 100);
        cookies.remove("g_email", { path: "/" }, new Date(Date.now()));
        cookies.remove("g_level", { path: "/" }, new Date(Date.now()));
        cookies.remove("g_phone", { path: "/" }, new Date(Date.now()));
        cookies.remove("g_profile", { path: "/" }, new Date(Date.now()));
        break;
      case "host":
        cookies.remove("userIdx", { path: "/" }, new Date(Date.now()));
        cookies.remove("userEmail", { path: "/" }, new Date(Date.now()));
        cookies.remove("userName", { path: "/" }, new Date(Date.now()));
        cookies.remove("level", { path: "/" }, new Date(Date.now()));
        break;
    }
  };

  if (userEmail == null && g_email == null) {
    console.log("로그인X ==> " + cookies.stringify);
    //|| h_email == null || h_email == 'undefined'
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
                <div
                  className="Modal"
                  style={{ zIndex: 999 }}
                  onClick={() => setModal_1(false)}
                >
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
                <div
                  className="Modal"
                  style={{ zIndex: 999 }}
                  onClick={() => setModal(false)}
                >
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
                        <img src="/img/join.png" width="35px" height="35px" />
                        &nbsp; 회원가입
                      </h3>
                      <hr />
                      <div className="aa">
                        <div
                          className="card-style1"
                          onClick={() => {
                            setModal_1(false);
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
                              <Join />
                            </Modall>
                          )}
                        </div>

                        <div
                          className="card-style2"
                          onClick={() => {
                            setHostJoin(!hostJoin);
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
                          {hostJoin && (
                            <ModalH
                              closeModal={() => {
                                setHostJoin(!hostJoin);
                                console.log("호스트");
                              }}
                            >
                              <HostJoin />
                            </ModalH>
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
                <a className="nav-link active">도움말센터</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  } else if (userEmail == null && g_email != null) {
    //게스트 계정으로 로그인
    console.log("guest 로그인 ==> " + g_email);

    let level = "";
    if (g_level.key == 1) {
      level = "regular";
    } else if (g_level.key == 2) {
      level = "super";
    } else if (g_level.key == 3) {
      level = "VIP";
    }

    // let src='';
    // let image_url='';
    // if (data.g_photo != '-') {
    //   src=`http://localhost/static/images/guest/photo/${data.g_photo}`;
    //   image_url=`<img src=${src} width='300px' height='300px'/>`;
    // }
    // <span dangerouslySetInnerHTML={{ __html: image_url}}></span>
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
              <li className="nav-item">
                <a className="nav-link active">
                  <div className={"btn-wrapper2"}>
                    <div
                      className={"modal-open-btn"}
                      onClick={() => setModalOpen(true)}
                    >
                      프로필
                    </div>
                  </div>
                </a>
                {modalOpen && (
                  <div
                    className={"modal-container"}
                    ref={modalBackground}
                    onClick={(e) => {
                      if (e.target === modalBackground.current) {
                        setModalOpen(false);
                      }
                    }}
                  >
                    <div className={"modal-content"}>
                      <h4>{g_name.key}님 프로필</h4>
                      <img
                        src="http://localhost/static/images/guest/photo/cat.jpeg"
                        width="210px"
                        height="210px"
                      ></img>
                      <div style={{ padding: "5px" }}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="25"
                          height="25"
                          fill="currentColor"
                          className="bi bi-envelope-at"
                          viewBox="0 0 16 16"
                        >
                          <path d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2zm3.708 6.208L1 11.105V5.383zM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2z" />
                          <path d="M14.247 14.269c1.01 0 1.587-.857 1.587-2.025v-.21C15.834 10.43 14.64 9 12.52 9h-.035C10.42 9 9 10.36 9 12.432v.214C9 14.82 10.438 16 12.358 16h.044c.594 0 1.018-.074 1.237-.175v-.73c-.245.11-.673.18-1.18.18h-.044c-1.334 0-2.571-.788-2.571-2.655v-.157c0-1.657 1.058-2.724 2.64-2.724h.04c1.535 0 2.484 1.05 2.484 2.326v.118c0 .975-.324 1.39-.639 1.39-.232 0-.41-.148-.41-.42v-2.19h-.906v.569h-.03c-.084-.298-.368-.63-.954-.63-.778 0-1.259.555-1.259 1.4v.528c0 .892.49 1.434 1.26 1.434.471 0 .896-.227 1.014-.643h.043c.118.42.617.648 1.12.648m-2.453-1.588v-.227c0-.546.227-.791.573-.791.297 0 .572.192.572.708v.367c0 .573-.253.744-.564.744-.354 0-.581-.215-.581-.8Z" />
                        </svg>
                        &nbsp;
                        <input
                          type="text"
                          defaultValue={g_email.key}
                          className="form-control"
                          readOnly
                        ></input>
                      </div>
                      <div style={{ padding: "5px" }}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="25"
                          height="25"
                          fill="currentColor"
                          className="bi bi-telephone"
                          viewBox="0 0 16 16"
                        >
                          <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z" />
                        </svg>
                        &nbsp;
                        <input
                          type="tel"
                          defaultValue={g_phone.key}
                          className="form-control"
                          readOnly
                        ></input>
                      </div>
                      <div style={{ padding: "5px" }}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="25"
                          height="25"
                          fill="currentColor"
                          className="bi bi-star"
                          viewBox="0 0 16 16"
                        >
                          <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
                        </svg>
                        &nbsp;
                        <input
                          type="text"
                          defaultValue={level}
                          className="form-control"
                          readOnly
                        ></input>
                      </div>
                      <ul className="navbar-nav">
                        <li style={{ padding: "4px" }}>
                          <button
                            className="btn btn-dark"
                            onClick={() => setModalOpen(false)}
                          >
                            닫기
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="#">
                  여행
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link active"
                  onClick={() => navigate("/guest/wish")}
                >
                  위시리스트
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link active"
                  onClick={() => navigate("/guest/Account")}
                >
                  계정
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active">도움말센터</a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link active"
                  onClick={() =>
                    Swal.fire({
                      title: "",
                      html: `게스트 로그아웃 하시겠습니까?`,
                      showCancelButton: true,
                      cancelButtonText: "cancel",
                      confirmButtonText: "OK",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        removeCookies("guest");
                        window.location.href = "/";
                      }
                    })
                  }
                >
                  로그아웃
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  } else if (userEmail != null && g_email == null) {
    //호스트계정으로 로그인 했을 때
    console.log("host 로그인 ==> " + userEmail);

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
                <a
                  className="nav-link active"
                  onClick={() => navigate(`/api/host/account/${userIdx.key}`)}
                >
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
                        navigate("/");
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

  function ModalH(props) {
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
export default Header;

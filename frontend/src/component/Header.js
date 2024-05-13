import React, { useState, useRef, useEffect} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useLocation } from "react-router-dom";
import Join from "../pages/guest/join";
import HostJoin from "../pages/host/login/Join_modal";


import "../pages/guest/modall.css";
import "../pages/host/host1.css";

import Swal from "sweetalert2";
import Cookies from "universal-cookie";
import { EnvelopeAt, Telephone, Star } from "react-bootstrap-icons";


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
  const g_photo = cookies.get("g_photo");

  //호스트 쿠키
  const userInfo = cookies.get("userInfo");


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
        cookies.remove("g_photo", { path: "/" }, new Date(Date.now()));
        break;
      case "host":
        cookies.remove("userInfo", { path: "/" }, new Date(Date.now()));
        break;
    }
  };

  const locationNow = useLocation(); // 팝업창에서 헤더제거
  if (locationNow.pathname === "/guest/write") return null; // 팝업창에서 헤더 제거
  if (locationNow.pathname === "/host/account/manage/review" || locationNow.pathname === "/host/account/manage/reply") return null; // 팝업창에서 헤더 제거
  if (locationNow.pathname === "/admin/*" || locationNow.pathname === "/admin/alogin") return null; 

  if (userInfo == null && g_email == null) {
    console.log("로그인X cookie==> " + userInfo);
    return (
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img
              src="/img/sybnb.png"
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
                        </div>
                        {join && (
                            <Modall
                              
                            >
                              <Join />
                            </Modall>
                          )}

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
  } else if (userInfo == null && g_email != null) {
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

    let src='';
    let image_url='';
    let image='';
    if (g_photo.key == '-') {
      src='/img/image_no.png';
      image_url=`<img src=${src} width='210px' height='210px'/>`;
      image=`<img src=${src} width='45px' height='45px'/>`;
    } else {
      src=`http://localhost/static/images/guest/photo/${g_photo.key}`;
      image_url=`<img src=${src} width='210px' height='210px'/>`;
      image=`<img src=${src} width='45px' height='45px'/>`;
    }

    //<span dangerouslySetInnerHTML={{ __html: image_url}}></span>
    return (
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img
              src="/img/sybnb.png"
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
                      <span onClick={() =>  navigate("/guest/Profile")} dangerouslySetInnerHTML={{ __html: image}}></span>
                  </div>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" onClick={() => navigate("/guest/reservation")}>
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
  } else if (userInfo != null && g_email == null) {
    //호스트계정으로 로그인 했을 때
    const userIdx = userInfo.h_idx;
    // console.log("host userInfo ==> " + JSON.stringify(userInfo));

    return (
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img
              src="/img/sybnb.png"
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
                  onClick={() => navigate(`/api/host/account/${userIdx}`)}
                >
                  계정
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active"
                onClick={() => navigate(`/host/hotel/MyhotelList`)}
                >
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
      setJoin(!join)
    }

    return (
      <div className="Modal_a" >
        <div className="modalBody_a" onClick={(e) => e.stopPropagation()}>
          <button id="modalCloseBtn" onClick={()=> {closeModal(); setModal(false);}}>
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
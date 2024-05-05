import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

import Reviews from "./hostAccount/Reviews";
import Orders from "./hostAccount/Orders";

import Swal from "sweetalert2";
import "../../asset/css/main.css";
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

function HostAccount() {
  const cookies = new Cookies();
  const userIdx = cookies.get("userIdx");
  const userEmail = cookies.get("userEmail");
  const userName = cookies.get("userName");
  const [data, loading] = useFetch(
    `http://localhost/api/host/account/${userIdx.key}`
  );
  //   const pwd = useRef();
  //   const pwdChk = useRef();
  //   const h_email = useRef();
  //   const h_name = useRef();
  //   const [phoneNum, setPhoneNum] = useState("");
  //   const h_phone = useRef();
  //   const [businessNum, setBusinessNum] = useState("");
  //   const h_business = useRef();
  //   const h_level = useRef();
  //   const h_status = useRef();
  //   const profile = useRef();
  //   const file = useRef();
  //   const navigate = useNavigate();

  if (loading) {
    return <div>loading</div>;
  } else {
    let url = "";
    let profile_src = "";
    if (data.h_profile !== "-" || data.h_profile !== "") {
      url = `http://localhost/static/images/host/profile/${data.h_profile}`;
      profile_src = `<img src=${url} width="100px" style={{backgroundSize:"contain";}} />`;
    } else {
      profile_src =
        "<img src= http://localhost/static/images/host/profile/no-image.png' width='30%'/>";
    }

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
                        <div
                          className="col"
                          style={{
                            display: "block",
                            position: "sticky",
                          }}
                        >
                          <button className="main-btn">슈퍼호스트</button>
                        </div>
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
                      <td colSpan={3}>
                        <input
                          className="form-control"
                          type="email"
                          // ref={h_email}
                          // defaultValue={userEmail.key}
                          readOnly
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>이메일(ID)</th>
                      <td colSpan={3}>
                        <input
                          className="form-control"
                          type="email"
                          // ref={h_email}
                          // defaultValue={userEmail.key}
                          readOnly
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>이메일(ID)</th>
                      <td colSpan={3}>
                        <input
                          className="form-control"
                          type="email"
                          // ref={h_email}
                          // defaultValue={userEmail.key}
                          readOnly
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>이메일(ID)</th>
                      <td colSpan={3}>
                        <input
                          className="form-control"
                          type="email"
                          // ref={h_email}
                          // defaultValue={userEmail.key}
                          readOnly
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <br />
                <div style={{ textAlign: "right" }}>
                  <button
                    type="button"
                    // onClick={() => {
                    className="main-btn"
                  >
                    회원정보수정
                  </button>
                  &nbsp;&nbsp;
                  <button
                    type="button"
                    className="main-btn"
                    style={{ backgroundColor: "#C6C7C8" }}
                    // onClick={() => {
                    //   Swal.fire({
                    //     icon: "question",
                    //     title: "잠깐!",
                    //     input: "password",
                    //     inputLabel: "정말로 탈퇴하시겠습니까?",
                    //     inputPlaceholder: "비밀번호를 입력해주세요",
                    //     inputAttributes: {
                    //       autocapitalize: "off",
                    //       autocorrect: "off",
                    //     },
                    //     showCancelButton: true,
                    //     cancelButtonText: "CANCEL",
                    //     confirmButtonText: "CONFIRM",
                    //     showLoaderOnConfirm: true,
                    //     preConfirm: (pwd) => {
                    //       const url = `
                    //         http://localhost/api/host/delete/${pwd}?userIdx=${userIdx.key}&userEmail=${userEmail.key}
                    //         `;
                    //       return fetch(url)
                    //         .then((response) => {
                    //           if (!response.ok) {
                    //             throw new Error(response.statusText);
                    //           }
                    //           return response.text();
                    //         })
                    //         .catch((error) => {
                    //           Swal.showValidationMessage(
                    //             `처리 중 문제가 발생했습니다. 비밀번호를 확인해주세요.<br/>반복실패할 경우, 관리자에게 문의 바랍니다.`
                    //           );
                    //         });
                    //     },
                    //     allowOutsideClick: () => !Swal.isLoading(),
                    //   }).then((result) => {
                    //     if (result.isConfirmed) {
                    //       console.log(result.value);
                    //       Swal.fire({
                    //         icon: "success",
                    //         title: "Complete",
                    //         html: "정상처리 되었습니다.<br/>그동안 이용해 주셔서 감사합니다.",
                    //         showConfirmButton: false,
                    //         timer: 2000,
                    //       }).then(() => {
                    //         localStorage.clear();
                    //         sessionStorage.clear();
                    //         removeCookies();
                    //         navigate("/");
                    //       });
                    //     }
                    //   });
                    // }}
                  >
                    &nbsp;&nbsp;승급신청&nbsp;&nbsp;
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
                  fill-rule="evenodd"
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
export default HostAccount;

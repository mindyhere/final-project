import React, { useRef, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "universal-cookie";

import Swal from "sweetalert2";
import "./asset/css/main.css";
import "./modalH.css";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
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
  const pwd = useRef();
  const pwdChk = useRef();
  const h_email = useRef();
  const h_name = useRef();
  const [phoneNum, setPhoneNum] = useState("");
  const h_phone = useRef();
  const [businessNum, setBusinessNum] = useState("");
  const h_business = useRef();
  const h_level = useRef();
  const h_status = useRef();
  const profile = useRef();
  const file = useRef();
  const navigate = useNavigate();

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

  if (loading) {
    return <div>loading</div>;
  } else {
    let src = "";
    // let src2 = "";
    if (data.dto.h_profile !== "-" || data.dto.h_profile !== "") {
      src = `http://localhost/static/images/host/profile/${dto.h_profile}`;
      profile_src = `<img src=${src1} width="200px" style={{backgroundSize:"contain";}} />`;
    } else {
      profile_src = "[미등록]";
    }

    return (
      <>
        <div className="container min-vh-100">
          <h3 className="text-bold">
            <img src="/img/info.png" width="35px" height="35px" />
            &nbsp; 회원 정보
          </h3>
          <hr />
          <div className="card-style mb-30">
            <div className="row">
              <div className="col-4" style="text-align: center;">
                <span dangerouslySetInnerHTML={{ __html: profile_src }}></span>
              </div>
              <div className="col-8">
                <form>
                  <table className="tbl">
                    <colgroup>
                      <col style="width: 25%" />
                      <col />
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
                            ref={pwdChk}
                            placeholder="비밀번호 확인"
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
                            defaultValue={userName.key}
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
                            defaultValue={userPhone.key}
                            ref={h_phone}
                            onChange={(e) => {
                              handleChange(e.target.value, "phone");
                            }}
                            placeholder="숫자만 입력하세요"
                          />
                        </td>
                      </tr>
                      <tr>
                        <th>사업자번호</th>
                        <td colSpan={3}>
                          <input
                            className="form-control"
                            type="text"
                            defaultValue={data.dto.h_business}
                            ref={h_business}
                            onChange={(e) => {
                              handleChange(e.target.value, "business");
                            }}
                            placeholder="숫자만 입력하세요"
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
                            defaultValue={data.dto.h_level}
                            readOnly
                          />
                        </td>
                        <th>상태</th>
                        <td>
                          <input
                            className="form-control"
                            type="text"
                            ref={h_status}
                            defaultValue={data.dto.h_status}
                            readOnly
                          />
                        </td>
                      </tr>
                      <tr>
                        <th>프로필</th>
                        <td colSpan={3}>
                          <input
                            className="form-control"
                            type="file"
                            defaultValue={data.dto.h_profile}
                            ref={profile}
                          />
                        </td>
                      </tr>
                      <tr>
                        <th>사업자등록증</th>
                        <td colSpan={3}>
                          <input
                            className="form-control"
                            type="file"
                            defaultValue={data.dto.h_file}
                            ref={file}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <p>
                    프로필/사업자등록증 <strong>누락</strong> 시,
                    <br />
                    <span style={{ color: "red" }}>
                      일부 서비스 이용이 제한
                    </span>
                    될 수 있음을 알려드립니다.
                  </p>
                  <br />
                  <div style={{ textAlign: "center" }}>
                    <button
                      type="button"
                      onClick={() => {
                        if (pwd.current.value == "") {
                          Swal.fire({
                            icon: "warning",
                            title: "잠깐!",
                            html: "비밀번호를 입력하세요.",
                            confirmButtonText: "OK",
                          });
                          // pwd.current.focus();
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
                          // h_name.current.focus();
                          return;
                        }
                        if (h_phone.current.value == "") {
                          Swal.fire({
                            icon: "warning",
                            title: "잠깐!",
                            html: "전화번호를 입력하세요.",
                            confirmButtonText: "OK",
                          });
                          // h_phone.current.focus();
                          return;
                        }
                        if (h_business.current.value == "") {
                          Swal.fire({
                            icon: "warning",
                            title: "잠깐!",
                            html: "사업자번호를 입력하세요.",
                            confirmButtonText: "OK",
                          }); /*.then((result) => {
                      if (result.isConfirmed) h_business.current.focus();
                    });*/
                          return;
                        }

                        const form = new FormData();
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

                        fetch(`http://localhost/api/host/update/${userNo}`, {
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
                                title: "Check",
                                html: "계정 정보가 수정되었습니다.</br>메인 화면으로 이동합니다.",
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
                      정보수정
                    </button>
                    &nbsp;
                    <button
                      type="button"
                      onClick={() => {
                        Swal.fire({
                          icon: "question",
                          title: "잠깐!",
                          html: "탈퇴하시겠습니까?",
                          showCancelButton: true,
                          confirmButtonText: "YES",
                          cancelButtonText: "NO",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            fetch(
                              `http://localhost/api/host/delete/${userNo}`
                            ).then(() => {
                              localStorage.clear();
                              sessionStorage.clear();
                              removeCookies();
                              navigate("/");
                            });
                          }
                        });
                      }}
                      className="main-btn"
                      style={{ backgroundColor: "#C6C7C8" }}
                    >
                      회원탈퇴
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default HostAccount;

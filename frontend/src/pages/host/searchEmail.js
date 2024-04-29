import React, { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";

function SearchEmail() {
  const [params, setParams] = useSearchParams();
  //  데이터 setter
  const navigate = useNavigate();
  const h_name = useRef();
  const h_phone = useRef();
  const h_business = useRef();
  const [message, setMessage] = useState([]);

  return (
    <>
      <div className="container min-vh-100">
        <h3 className="text-bold">
          {" "}
          <img src="/img/search_id.png" width="35px" height="35px" />
          이메일 찾기
        </h3>
        <hr />
        <div className="card-style mb-30">
          <form>
            <div className="input-style-1">
              <label>이름</label>{" "}
              <input ref={h_name} placeholder="이름을 입력해주세요" />
            </div>
            <div className="input-style-1">
              <label>전화번호</label>{" "}
              <input type="tel" ref={h_phone} placeholder="숫자만 입력하세요" />
            </div>
            <div className="input-style-1">
              <label>사업자번호</label>{" "}
              <input
                type="tel"
                ref={h_business}
                placeholder="숫자만 입력하세요"
              />
            </div>
            <br />
            <div style={{ textAlign: "center" }}>
              <button
                type="button"
                onClick={() => {
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
                  form.append("h_name", h_name.current.value);
                  form.append("h_phone", h_phone.current.value);
                  form.append("h_business", h_business.current.value);
                  fetch("http://localhost/api/host/login/findId", {
                    method: "post",
                    body: form,
                  })
                    .then((response) => response.json())
                    .then((data) => {
                      console.log(data);
                      if (data.h_email!=null) {
                        Swal.fire({
                          icon: "info",
                          title: "Check",
                          html: `<strong><p>${h_name.current.value}</strong> 님의 이메일은 <strong>${data.h_email}</strong>입니다.</br>로그인 페이지로 이동할까요?</p>`,
                          showDenyButton: true,
                          confirmButtonText: "YES",
                          denyButtonText: "NO",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            navigate("/host/login");
                          }
                        });
                      } else {
                        Swal.fire({
                          icon: "error",
                          title: "잠깐!",
                          html: "일치하는 회원 정보가 없습니다. </br> 입력하신 내용이 맞는지 확인바랍니다.",
                          confirmButtonText: "OK",
                        });
                      }
                    });
                }}
                className="main-btn"
              >
                아이디 찾기
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SearchEmail;

import React, { useRef } from 'react';
import { PersonWorkspace } from "react-bootstrap-icons";
import Swal from "sweetalert2";

function Awrite() {
  const n_writer = useRef();
  const n_title = useRef();
  const n_content = useRef();
  const n_date = useRef();


  const handleSubmit = () => {
    if (window.confirm('등록하시겠습니까?')) {
      const data = {
        n_writer: n_writer.current.value,
        n_date: n_date.current.value,
        n_title: n_title.current.value,
        n_content: n_content.current.value
      };

      fetch(`http://localhost/notice/insert`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(data => {
          if (data.result === 'success') {
            Swal.fire({
              title: '등록 완료',
              icon: 'success',
              confirmButtonText: '확인'
            }).then((result) => {
              if(result.isConfirmed) {
                window.location.href='/notice/alist';
              }
          });
          } else {
            Swal.fire({
              title: '에러 발생',
              text: '관리자에게 문의하세요',
              icon: 'error',
              confirmButtonText: '확인',
            });
          }
        })
        .catch(error => {
          console.error('Error inserting notice:', error);
        });
    }
  };

  return (
    <div>
      <nav className="navbar bg-body-tertiary fixed-top">
        <a className="navbar-brand" href='../amain'>
          <PersonWorkspace width="50" height="50" />&nbsp; 관리자 페이지
        </a>
      </nav>
      <div className="container">
        <h2 className="mt-5">공지사항 등록</h2>
        <div className="card mt-4">
          <div className="card-body">
            <form>
              <div className="mb-3 row">
                <div className="col-sm-4">
                  <label htmlFor="n_writer" className="col-sm-2 col-form-label">작성자</label>
                  <textarea className="form-control" id="n_writer" rows="1" ref={n_writer}></textarea>
                </div>
                <div className="col-sm-4">
                  <label htmlFor="n_date" className="col-sm-2 col-form-label">작성일자</label>
                  <textarea className="form-control" id="n_date" rows="1" ref={n_date}></textarea>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="n_title" className="form-label">제목</label>
                <textarea className="form-control" id="n_title" rows="1" ref={n_title}></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="n_content" className="form-label">내용</label>
                <textarea className="form-control" id="n_content" rows="6" ref={n_content}></textarea>
              </div>
              <div className="d-grid">
                <button type="button" className="btn btn-outline-success" onClick={handleSubmit}>등록하기</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Awrite;
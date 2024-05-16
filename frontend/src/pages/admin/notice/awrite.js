import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { PersonWorkspace } from 'react-bootstrap-icons';
import Swal from 'sweetalert2';
import Cookies from "universal-cookie";
import AFooter from '../../../component/AFooter';

function Awrite() {
  const cookies = new Cookies();
  const navigate = useNavigate();

  const n_writer = useRef();
  const n_title = useRef();
  const n_content = useRef();
  const n_date = useRef();
  const n_file = useRef();

  const removeCookie = () => {
    cookies.remove("n_writer", { path: "/" }, 100);
    cookies.remove("n_title", { path: "/" }, 100);
    cookies.remove("n_content", { path: "/" }, 100);
    cookies.remove("n_date", { path: "/" }, 100);
    cookies.remove("n_file", { path: "/" }, 100);
  };

  const btnlist = (event) => {
    event.preventDefault();

    // Basic form validation
    if (!n_writer.current.value || !n_title.current.value || !n_content.current.value || !n_date.current.value || !n_file.current.value) {
      Swal.fire({
        title: '입력 오류',
        text: '모든 필드를 입력해주세요.',
        icon: 'error',
        confirmButtonText: '확인',
      });
      return;
    }

    const form = new FormData();
    form.append('n_writer', n_writer.current.value);
    form.append('n_title', n_title.current.value);
    form.append('n_content', n_content.current.value);
    form.append('n_date', n_date.current.value);
    form.append('n_file', n_file.current.files[0]);

    if (window.confirm('등록하시겠습니까?')) {
      fetch(`http://localhost/notice/insert`, {
        method: 'POST',
        body: form,
      })
        .then((response) => {
          if (response.ok) {
            Swal.fire({
              title: '등록 완료되었습니다',
              text: '공지 목록 화면으로 이동합니다.',
              icon: 'success',
              confirmButtonText: '확인',
            });
            navigate('/admin/notice/alist');
          } else {
            Swal.fire({
              title: '에러 발생',
              text: '처리 중 문제가 발생했습니다.',
              icon: 'error',
              confirmButtonText: '확인',
            });
          }
        })
        .catch((error) => {
          console.error('Error inserting notice:', error);
          Swal.fire({
            title: '에러 발생',
            text: '처리 중 문제가 발생했습니다.',
            icon: 'error',
            confirmButtonText: '확인',
          });
        });
    }
  };

  return (
    <div>
      <div className="container">
        <h2 className="mt-5">공지사항 등록</h2>
        <div className="card mt-4">
          <div className="card-body">
            <form>
              <div className="mb-3 row">
                <div className="col-sm-4">
                  <label htmlFor="n_writer" className="col-sm-2 col-form-label">작성자</label>
                  <textarea className="form-control" id="n_writer" rows="1" ref={n_writer} value="관리자" ></textarea>
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
                <label htmlFor="n_file" className="form-label">파일 업로드</label>
                <input type="file" className="form-control" id="n_file" ref={n_file} />
              </div>
              <div className="mb-3">
                <label htmlFor="n_content" className="form-label">내용</label>
                <textarea className="form-control" id="n_content" rows="6" ref={n_content}></textarea>
              </div>
              <div className="d-grid">
                <button type="submit" onClick={btnlist}>등록하기</button><br />
              </div>
            </form>
          </div>
        </div>
      </div>
     

    </div>
   
  );
}

export default Awrite;
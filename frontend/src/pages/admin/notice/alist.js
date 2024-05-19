import React, { useRef, useEffect, useState } from 'react';
import { PencilSquare, Trash, Check2Square, Square } from "react-bootstrap-icons";
import { useNavigate, Link } from 'react-router-dom';
import Swal from "sweetalert2";
import Cookies from "universal-cookie";
import 'bootstrap/dist/css/bootstrap.min.css';

function NoticeList() {
  const navigate = useNavigate();
  const searchkey = useRef();
  const search = useRef();
  const [Anitem, setAnitem] = useState([]);
  const cookies = new Cookies();

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = () => {
    const form = new FormData();
    form.append('searchkey', searchkey.current.value);
    form.append('search', search.current.value);

    fetch('http://localhost/notice/list', {
      method: 'post',
      body: form
    })
      .then(response => response.json())
      .then(list => {
        console.log('list', list);
        setAnitem(list);
      })
      .catch(error => {
        console.error('Error fetching notices:', error);
      });
  };

  const handleWriteNotice = () => {
    navigate('/admin/notice/awrite');
  };

  const handleDelete = (n_idx) => {
    if (window.confirm('삭제하시겠습니까?')) {
      fetch(`http://localhost/notice/delete?n_idx=${n_idx}`, {
        method: 'POST'
      })
        .then(response => response.json())
        .then(data => {
          if (data.result === 'success') {
            Swal.fire({
              title: '삭제 완료',
              showCancelButton: false,
              confirmButtonText: '확인',
            }).then(() => {
              fetchNotices();
            });
          } else {
            Swal.fire({
              title: '에러 발생',
              text: '관리자에게 문의하세요',
              showCancelButton: false,
              confirmButtonText: '확인',
            });
          }
        })
        .catch(error => {
          console.error('Error deleting notice:', error);
        });
    }
  };

  return (
    <> 
    <hr/>
    <div className="container-fluid">
      <div className="row">
        <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
          <div className="position-sticky pt-3 sidebar-sticky">
            <ul className="nav flex-column">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="./alist">
                  <span data-feather="home" className="align-text-bottom"></span>
                  <Check2Square width="50px" height="30px"/> 공지사항
                </a>   
              </li>
              <li className="nav-item">
                  <a className="nav-link" href="./awrite">
                    <span className="align-text-bottom"></span>
                    <Square width="50px" height="20px"/> 공지등록
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="./adetail">
                     <span className="align-text-bottom"></span>
                     <Square width="50px" height="20px" /> 공지수정
                  </a>
                </li>
            </ul>
          </div>
        </nav>
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div className="container11 mt-5">
          <div className="d-flex justify-content-between align-items-center">
    <h2 className="header"> <img style={{ width: '57px', height: '57px' }} src='/img/notice.png' alt="notice icon"/>&nbsp;공지사항
    </h2>
    <button type='button' className="btn btn-sign3" onClick={handleWriteNotice}>
      글쓰기
    </button></div>
            <hr /><br />
            <div className="row mb-3">
              <div className="col-md-4">
                <select ref={searchkey} className="form-select" defaultValue='n_title'>
                  <option value="n_title">제목</option>
                  <option value="n_content">내용</option>
                  <option value="n_title+n_content">제목+내용</option>
                </select>
              </div>
              <div className="col-md-4">
                <input ref={search} className="form-control" placeholder="검색어를 입력하세요" />
              </div>
              <div className="col-md-3">
      <div className="d-flex align-items-center">
        <button type='button' className="btn btn-sign2" onClick={fetchNotices}>
          검색
        </button>
              </div></div>
            </div>
            <div className="table-responsive">
              <table className="table table-hover table-bordered custom-table1">
                <thead className="table-light">
                  <tr>
                    <th className='col-1 text-center'>#</th>
                    <th className='col-2 text-center'>제목</th>
                    <th className='col text-center'>내용</th>
                    <th className='col-2 text-center'>작성자</th>
                    <th className='col-2 text-center'>작성일</th>
                    <th className='col-1 text-center'>수정</th>
                    <th className='col-1 text-center'>삭제</th>
                  </tr>
                </thead>
                <tbody>
                  {Anitem.map((list, index) => (
                    <tr key={index}>
                      <td className='text-center'>{list.n_idx}</td>
                      <td className='text-center'>{list.n_title}</td>
                      <td>{list.n_content}</td>
                      <td className='text-center'>{list.n_writer}</td>
                      <td className='text-center'>{list.n_date}</td>
                      <td className='text-center'>
                        <Link to={`/admin/notice/adetail/${list.n_idx}`}>
                          <PencilSquare width="25" height="25" />
                        </Link>
                      </td>
                      <td className='text-center'>
                        <button type='button' className='btn' onClick={() => handleDelete(list.n_idx)}>
                          <Trash width="25" height="25" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
    </div>
        </main>
        
      </div>
    </div>
    </>
  );
}

export default NoticeList;
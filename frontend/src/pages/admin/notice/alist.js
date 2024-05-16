import React, { useRef, useEffect, useState } from 'react';
import { PencilSquare, PersonWorkspace, Trash } from "react-bootstrap-icons";
import { useNavigate, Link } from 'react-router-dom';
import Swal from "sweetalert2";


function NoticeList() {
  const navigate = useNavigate();
  const searchkey = useRef();
  const search = useRef();
  const [Anitem, setAnitem] = useState([]);

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
       
      <div className="container">
        <h2>공지사항</h2><br />
        <div className="row">
          <div className="col-md-4">
            <select ref={searchkey} className="form-control" defaultValue='n_title'>
              <option value="n_idx">글 번호</option>
              <option value="n_title">제목</option>       
            </select>
          </div>
          <div className="col-md-4">
            <input ref={search} className="form-control" placeholder="검색어를 입력하세요" />
          </div>
          <div className="col-md-2">
            <button type='button' className="btn btn-outline-success" onClick={fetchNotices}>
              검색
            </button>
          </div>
          <div className="col-md-2">
            <button type='button' className="btn" onClick={handleWriteNotice}>
              글쓰기
            </button>
          </div>
        </div>
        <br/>
        <table className="table table-hover">
          <thead>
            <tr>
              <th className='col-1'>#</th>
              <th className='col'>제목</th>             
              <th className='col-1'>작성자</th>
              <th className='col-1'>작성일</th>
              <th className='col-1'>상세</th>
              <th className='col-1'>삭제</th>
            </tr>
          </thead>
          <tbody>
            {Anitem.map((list, index) => (
              <tr key={index}>
                <td>{list.n_idx}</td>
                <td>{list.n_title}</td>
                <td>{list.n_writer}</td>
                <td>{list.n_date}</td>

                <td><Link to={`/admin/notice/adetail/${list.n_idx}`}><PencilSquare width="25" height="25" /></Link></td>
                <td><button type='button' className='btn' onClick={() => handleDelete(list.n_idx)}><Trash width="25" height="25"></Trash></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default NoticeList;
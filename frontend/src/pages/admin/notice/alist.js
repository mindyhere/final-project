import React, { useRef, useEffect, useState } from 'react';
import { PencilSquare, Trash, CardList, House, HouseCheckFill, Person } from "react-bootstrap-icons";
import { useNavigate, Link } from 'react-router-dom';
import Swal from "sweetalert2";
import Cookies from "universal-cookie";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown} from "react-bootstrap";

function NoticeList() {
  const navigate = useNavigate();
  const searchkey = useRef();
  const search = useRef();
  const [Anitem, setAnitem] = useState([]);
  const cookies = new Cookies();
  const a_id = cookies.get("a_id");

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
    navigate(`/admin/notice/awrite/${a_id.key}`);
  };

  const handleDelete = (n_idx) => {
    Swal.fire({
      title: '삭제 확인',
      text: '공지사항을 삭제하시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#41774d86',
      cancelButtonColor: '#838383d2',
      confirmButtonText: '삭제',
      cancelButtonText: '취소',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost/notice/delete?n_idx=${n_idx}`, {
          method: 'POST'
        })
          .then(response => response.json())
          .then(data => {
            if (data.result === 'success') {
              Swal.fire({
                title: '삭제 완료',
                icon: 'success',
                showCancelButton: false,
                confirmButtonText: '확인',
                confirmButtonColor: '#41774d86'
              }).then(() => {
                fetchNotices();
              });
            } else {
              Swal.fire({
                title: '에러 발생',
                text: '관리자에게 문의하세요',
                showCancelButton: false,
                confirmButtonText: '확인',
                confirmButtonColor: '#41774d86'
              });
            }
          })
          .catch(error => {
            console.error('Error deleting notice:', error);
            Swal.fire({
              title: '에러 발생',
              text: '삭제 중 오류가 발생했습니다.',
              icon: 'error',
              showCancelButton: false,
              confirmButtonText: '확인',
              confirmButtonColor: '#41774d86'
            });
          });
      }
    });
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
            <a className="nav-link active"
              onClick={() => navigate(`/admin/amain/${a_id.key}`)}
              >
                &nbsp; <House width={'15%'} height={'15%'}/> HOME
              </a>
            </li>
            
            <Dropdown>
              <Dropdown.Toggle className="col-12 btn btn-light dropdown-toggle dropdown-toggle-split" >
                <Person width={'15%'} height={'15%'}/> 회원관리
                </Dropdown.Toggle>
                  <Dropdown.Menu className="col-12">                                             
                    <Dropdown.Item className="col-6"  onClick={() => navigate(`../admin/aguest/${a_id.key}`)}>회원정보관리</Dropdown.Item>                      
                    <Dropdown.Item className="col-6"   onClick={() => navigate(`../admin/ahost/${a_id.key}`)}>사업자정보관리</Dropdown.Item>   
                </Dropdown.Menu>
            </Dropdown>
            <Dropdown>
              <Dropdown.Toggle className="col-12 btn btn-light dropdown-toggle dropdown-toggle-split" >
                <HouseCheckFill width={'15%'} height={'15%'}/> 숙소관리
                </Dropdown.Toggle>
                  <Dropdown.Menu className="col-12">                                             
                    <Dropdown.Item className="col-6"  onClick={() => navigate(`../admin/ahotel/${a_id.key}`)}>숙소등록승인</Dropdown.Item>                                         
                </Dropdown.Menu>
            </Dropdown>   
            <Dropdown>
              <Dropdown.Toggle className="col-12 btn btn-light dropdown-toggle dropdown-toggle-split" >
                <CardList width={'15%'} height={'15%'}/> 공지사항
                </Dropdown.Toggle>
                  <Dropdown.Menu className="col-12">          
                  <Dropdown.Item className="col-6"  onClick={() => navigate(`/admin/notice/alist/${a_id.key}`)}>공지목록</Dropdown.Item>                                      
                    <Dropdown.Item className="col-6"  onClick={() => navigate(`/admin/notice/awrite/${a_id.key}`)}>공지등록</Dropdown.Item>                                            
                </Dropdown.Menu>
            </Dropdown>
           </ul>
           </div>
           </nav>

        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div className="container11 mt-5">
        <nav>      
           <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="#">공지사항</a></li>
              <li className="breadcrumb-item active" aria-current="page">공지목록</li>
          </ol>
        </nav>
        <br/>
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
                    <th className='col-1 text-center'>no.</th>
                    <th className='col-2 text-center'>제목</th>            
                    <th className='col-1 text-center'>작성자</th>
                    <th className='col-1 text-center'>작성일</th>
                    <th className='col-1 text-center'>수정</th>
                    <th className='col-1 text-center'>삭제</th>
                  </tr>
                </thead>
                <tbody>
                  {Anitem.map((list, index) => (
                    <tr key={index}>
                      <td className='text-center'>{list.n_idx}</td>
                      <td className='text-center'>{list.n_title}</td>
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
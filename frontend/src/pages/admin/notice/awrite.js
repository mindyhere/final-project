import React, { useRef } from 'react';
import {Pencil,  CardList, House, HouseCheckFill,  Person  } from "react-bootstrap-icons";
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import Cookies from "universal-cookie";
import { Dropdown} from "react-bootstrap";

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

    if (!n_writer.current.value || !n_title.current.value || !n_content.current.value || !n_date.current.value) {
      Swal.fire({
        title: '입력 오류',
        text: '모든 필드를 입력해주세요.',
        icon: 'error',
        confirmButtonText: '확인',
        confirmButtonColor: '#41774d86',
      });
      return;
    }

    const form = new FormData();
    form.append('n_writer', n_writer.current.value);
    form.append('n_title', n_title.current.value);
    form.append('n_content', n_content.current.value);
    form.append('n_date', n_date.current.value);
    form.append('n_file', n_file.current.files[0]);

    Swal.fire({
      title: '등록 확인',
      text: '공지사항을 등록하시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '등록',
      cancelButtonText: '취소',
      confirmButtonColor: '#41774d86',
      cancelButtonColor: '#838383d2'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost/notice/insert`, {
          method: 'POST',
          body: form,
        })
          .then((response) => {
            if (response.ok) {
              Swal.fire({
                title: '등록 완료',
                text: '공지 목록 화면으로 이동합니다.',
                icon: 'success',
                confirmButtonText: '확인',
                confirmButtonColor: '#41774d86',
              }).then(() => {
                navigate('/admin/notice/alist');
              });
            } else {
              Swal.fire({
                title: '에러 발생',
                text: '처리 중 문제가 발생했습니다.',
                icon: 'error',
                confirmButtonText: '확인',
                confirmButtonColor: '#41774d86',
              });
            }
          })
          .catch((error) => {
            console.error('Error inserting notice:', error);
            Swal.fire({
              title: '에러 발생',
              text: '공지사항 등록 중 문제가 발생했습니다.',
              icon: 'error',
              confirmButtonText: '확인',
              confirmButtonColor: '#41774d86',
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
              onClick={() => navigate(`/admin/amain`)}
              >
                &nbsp; <House width={'20%'} height={'20%'}/> HOME
              </a>
            </li>
            
            <Dropdown>
              <Dropdown.Toggle className="col-12 btn btn-light dropdown-toggle dropdown-toggle-split" >
                <Person width={'20%'} height={'20%'}/> 회원관리
                </Dropdown.Toggle>
                  <Dropdown.Menu className="col-12">                                             
                    <Dropdown.Item className="col-6"  onClick={() => navigate(`../admin/aguest`)}>회원정보관리</Dropdown.Item>                      
                    <Dropdown.Item className="col-6"   onClick={() => navigate(`../admin/ahost`)}>사업자정보관리</Dropdown.Item>   
                </Dropdown.Menu>
            </Dropdown>
            <Dropdown>
              <Dropdown.Toggle className="col-12 btn btn-light dropdown-toggle dropdown-toggle-split" >
                <CardList width={'20%'} height={'20%'}/> 공지사항
                </Dropdown.Toggle>
                  <Dropdown.Menu className="col-12">          
                  <Dropdown.Item className="col-6"  onClick={() => navigate(`/admin/notice/alist`)}>공지리스트</Dropdown.Item>                                      
                    <Dropdown.Item className="col-6"  onClick={() => navigate(`/admin/notice/awrite`)}>공지등록</Dropdown.Item>                                          
                </Dropdown.Menu>
            </Dropdown>
            <Dropdown>
              <Dropdown.Toggle className="col-12 btn btn-light dropdown-toggle dropdown-toggle-split" >
                <HouseCheckFill width={'20%'} height={'20%'}/> 숙소관리
                </Dropdown.Toggle>
                  <Dropdown.Menu className="col-12">                                             
                    <Dropdown.Item className="col-6"  onClick={() => navigate(`../admin/ahotel`)}>숙소등록승인</Dropdown.Item>                                         
                </Dropdown.Menu>
            </Dropdown>   
           </ul>
           </div>
           </nav>
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div className="container11 mt-5">
          <nav>       <ol className="breadcrumb">
                       <li className="breadcrumb-item"><a href="#">공지사항</a></li>
                          <li className="breadcrumb-item active" aria-current="page">공지등록</li>
                        </ol>
                        </nav>
                        <br/>
          <div className="d-flex justify-content-between align-items-center">
      <h2 className="header"><Pencil width="40px" height="30px"/> 공지사항 등록</h2>
      <button type="submit" className="btn btn-sign3" onClick={btnlist}>등록하기</button>
    </div>
    <hr/><br />
    <div className="table-responsive">
      <form>
        <table className="table table-bordered">
          <tbody>
            <tr>
              <td><label htmlFor="n_writer" className="col-form-label">작성자</label></td>
              <td><textarea className="form-control table-light" id="n_writer" rows="1" ref={n_writer} defaultValue="관리자"></textarea></td>
            </tr>
            <tr>
              <td><label htmlFor="n_date" className="col-form-label">작성일자</label></td>
              <td><textarea className="form-control table-light" id="n_date" rows="1" ref={n_date}></textarea></td>
            </tr>
            <tr>
              <td><label htmlFor="n_title" className="form-label">제목</label></td>
              <td><textarea className="form-control table-light" id="n_title" rows="1" ref={n_title}></textarea></td>
            </tr>
            <tr>
              <td><label htmlFor="n_file" className="form-label">파일 업로드</label></td>
              <td><input type="file" className="form-control table-light" id="n_file" ref={n_file} /></td>
            </tr>
            <tr>
              <td><label htmlFor="n_content" className="form-label">내용</label></td>
              <td><textarea className="form-control table-light" id="n_content" rows="6" ref={n_content}></textarea></td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  </div>
</main></div></div>
    </>
  );
}

export default Awrite;
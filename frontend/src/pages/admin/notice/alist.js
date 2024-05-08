import React,{useRef,useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router';

function NoticeList() {
  const navigate=useNavigate();
  const [items, setNoticeList]=useState([]);
  const searchkey=useRef();
  const search=useRef();

  function getList(url){
    const form = new FormData();
    form.append('searchkey',searchkey.current.value);
    form.append('search',search.current.value);

  console.log(url);
  console.log(searchkey.current.value);
  console.log(search.current.value);

  fetch(url,{method:'post',body:form})
    .then(response=>{return response.json();})
    .then(data=>{setNoticeList(data);});
    }
    useEffect(() => { getList('http://localhost/notice/list'); }, [
    ]);


  return (
    <div>
      <nav class="navbar bg-body-tertiary fixed-top">
        <a class="navbar-brand" href='../amain'>
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/><path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
          </svg>관리자 페이지
        </a>
      </nav>
      <div>
        <h2>공지사항</h2><br/>

        {/* 검색 */}
        {/* <table className="search">
          <tbody>
            <tr>
              <td>
                <select className="custom-select" value={searchOption} onChange={handleSearchOptionChange}>
                  <option>검색 옵션 선택</option>
                  <option value="제목">제목</option>
                  <option value="내용">내용</option>
                  <option value="제목+내용">제목+내용</option>
                </select>
              </td>
              <td>
                <input type="text" className="form-control" placeholder="검색어" value={keyword} onChange={handleKeywordChange} />
              </td>
              <td>
                <button type="button" className="btn btn-outline-success" onClick={'handleKeywordChange'}><i className="fas fa-search"></i> 검색</button>
              </td>
            </tr>
          </tbody>
        </table>
        <br />  */}

<select ref={searchkey}>
<option value="title"selected>제목</option>
<option value="contents">내용</option>
<option value="title_contents">제목+내용</option>
</select>
&nbsp;
<input ref={search}/>
&nbsp;
<button type='button'onClick={()=>{
getList('http://localhost/notice/list');
}}>조회</button>

<table className="table table-hover">
            <tr>
               <th className="col-1">#</th>
               <th className="col-1">제목</th>
               <th className="col">내용</th>
               <th className="col-1">작성자</th>
               <th className="col-1">작성일</th>
              </tr>
        </table>     

        {/* <Pagination 페이지 번호 이동(import 필요! 혹은 npm)
          className="pagination"
          activePage={page}
          itemsCountPerPage={itemsPerPage}
          totalItemsCount={totalCnt}
          pageRangeDisplayed={5}
          prevPageText={"‹"}
          nextPageText={"›"}
          onChange={handlePageChange}
        /> */}
        
        <div className="my-5 d-flex justify-content-center">
          <Link className="btn btn-outline-success" to="/admin/notice/awrite">글쓰기</Link>
          <Link className="btn btn-outline-success" to="/admin/notice/adetail">수정하기</Link>
        </div>
        </div>
        </div>
  );
} export default NoticeList;
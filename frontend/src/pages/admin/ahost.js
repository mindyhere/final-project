import React, { useState, useEffect } from 'react';

function Ahost(){
    // const [searchOption, setSearchOption] = useState(''); // 검색 옵션
    // const [keyword, setKeyword] = useState(''); // 검색 키워드
    // const [page, setPage] = useState(1);

  
    // // 페이지 로드 시 공지사항 목록 가져오기
    // useEffect(() => {
    
    // }, []); // 검색 옵션, 키워드, 페이지가 변경되면 다시 불러옴
  
    // // 검색 옵션 변경 시
    // const handleSearchOptionChange = (e) => {
    //   setSearchOption(e.target.value);
    // };
  
    // // 검색 키워드 변경 시
    // const handleKeywordChange = (e) => {
    //   setKeyword(e.target.value);
    // };


    return(
        <>
         <div>
      <nav class="navbar bg-body-tertiary fixed-top">
        <a class="navbar-brand" href='../admin/amain'>
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/><path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
          </svg>관리자 페이지</a>
      </nav>  
      <div>
        <h2>사업자 관리</h2><br/>
        </div>
        <table className="search">
          <tbody>
            <tr>
              <td>
                <select className="custom-select" value={''} onChange={''}>
                  <option>검색 옵션 선택</option>
                  <option value="사업자명">사업자명</option>
                  <option value="사업자ID">사업자ID</option>
                  <option value="사업자등록번호">사업자번호</option>
                </select>
              </td>
              <td>
                <input type="text" className="form-control" placeholder="검색어" value={''} onChange={''} />
              </td>
              <td>
                <button type="button" className="btn btn-outline-success" onClick={''}><i className="fas fa-search"></i> 검색</button>
              </td>
            </tr>
          </tbody>
        </table><br />
        <table className="table table-hover">
          <thead>
            <tr>
              <th className="col">#</th>
              <th className="col">사업자명</th>
              <th className="col">사업자ID</th>
              <th className="col">사업자 등록번호</th>
              <th className="col">가입일자</th>
              <th className="col">등급</th>
              <th className="col">가입승인</th>
            </tr>
          </thead>
          {/* <tbody>
            {noticeList.map((notice, index) => (
              <tr key={index}>
                <td>{notice.n_idx}</td>
                <td>{notice.n_writer}</td>
                <td>{notice.n_title}</td>
                <td>{notice.n_content}</td>
                <td>{notice.n_date}</td>
              </tr>
            ))}
          </tbody> */}
        </table>        
        </div>
        </>
    )
}export default Ahost;
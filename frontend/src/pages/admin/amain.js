import React, { useRef, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { CardList, House, HouseCheckFill, Person } from 'react-bootstrap-icons';
import MemoList from './memolist';
import HotelChart from './chart';

function Amain() {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const a_id = cookies.get("a_id");


  return (
    <div className="container-fluid">
      <div className="row">
        <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
          <div className="position-sticky pt-3 sidebar-sticky">
            <ul className="nav flex-column">
              <li className="nav-item">
                <a className="nav-link active" onClick={() => navigate(`/admin/amain/${a_id}`)}>
                  &nbsp; <House width={'15%'} height={'15%'} /> HOME
                </a>
              </li>
              <Dropdown>
                <Dropdown.Toggle className="col-12 btn btn-light dropdown-toggle dropdown-toggle-split">
                  <Person width={'15%'} height={'15%'} /> 회원관리
                </Dropdown.Toggle>
                <Dropdown.Menu className="col-12">
                  <Dropdown.Item className="col-6" onClick={() => navigate(`../admin/aguest/${a_id}`)}>회원정보관리</Dropdown.Item>
                  <Dropdown.Item className="col-6" onClick={() => navigate(`../admin/ahost/${a_id}`)}>사업자정보관리</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown>
                <Dropdown.Toggle className="col-12 btn btn-light dropdown-toggle dropdown-toggle-split">
                  <HouseCheckFill width={'15%'} height={'15%'} /> 숙소관리
                </Dropdown.Toggle>
                <Dropdown.Menu className="col-12">
                  <Dropdown.Item className="col-6" onClick={() => navigate(`../admin/ahotel/${a_id}`)}>숙소등록승인</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown>
                <Dropdown.Toggle className="col-12 btn btn-light dropdown-toggle dropdown-toggle-split">
                  <CardList width={'15%'} height={'15%'} /> 공지사항
                </Dropdown.Toggle>
                <Dropdown.Menu className="col-12">
                  <Dropdown.Item className="col-6" onClick={() => navigate(`/admin/notice/alist/${a_id}`)}>공지목록</Dropdown.Item>
                  <Dropdown.Item className="col-6" onClick={() => navigate(`/admin/notice/awrite/${a_id}`)}>공지등록</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </ul>
          </div>
        </nav>
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">관리자 페이지</h1>
          </div>
          <div className="row">
  <div className="col">
  <HotelChart  />
  </div>
  <div className="col">
    <MemoList />
  </div>
</div>
        </main>
      </div>
    </div>
  );
}

export default Amain;
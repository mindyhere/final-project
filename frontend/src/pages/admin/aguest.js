import React, { useRef, useEffect, useState } from 'react';
import { PersonCircle, CardList, House, HouseCheckFill, ListCheck, Person  } from 'react-bootstrap-icons';
import { Dropdown} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function AGuest() {
    const navigate = useNavigate();
    const g_idx = useRef();
    const g_level = useRef();
    const g_point = useRef();
    const searchkey = useRef(null);
    const search = useRef(null);
    const [agItem, setAgitem] = useState([]);
    const [selectedlist, setSelectedlist] = useState(null);

    const getLevel = (g_Level) => {
        if (g_Level <= 5) {
            return 'REGULAR';
        } else if (g_Level >= 10) {
            return 'SUPER';
        } else {
            return 'VIP';
        }
    };

    useEffect(() => {
        fetchguest();
    }, []);

    const fetchguest = () => {
        if (searchkey.current && search.current) { 
        const form = new FormData();
        form.append('searchkey', searchkey.current.value);
        form.append('search', search.current.value);
        fetch('http://localhost/admin/ag_list', {
            method: 'post',
            body: form,
        })
            .then(response => response.json())
            .then(list => {
                console.log('list', list);
                setAgitem(list);
            })
            .catch(error => {
                console.error('Error fetching user list:', error);
            });
    };
    }
    const handleUpdate = (g_idx, g_level, g_point) => {
        const form = new FormData();
        form.append('g_idx', g_idx.current.value);
        form.append('g_level', g_level.current.value);
        form.append('g_point', g_point.current.value);
        fetch('http://localhost/admin/ag_update', {
            method: 'post',
            body: form,
        })
            .then(response => response.json())
            .then(data => {
                if (data.result === 'success') {
                    fetchguest();
                } else {
                    console.error('Error updating user:', data.result);
                }
            })
            .catch(error => {
                console.error('Error updating user:', error);
            });
    };

    return (
        <>
            <hr />
            <div className="container-fluid">
                <div className="row">
                    <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                        <div className="position-sticky pt-3 sidebar-sticky">
                            <ul className="nav flex-column">                               

                            <li className="nav-item">
            <a className="nav-link active"
              onClick={() => navigate(`/admin/amain`)}
              >
                &nbsp; <House width={'15%'} height={'15%'}/> HOME
              </a>
            </li>
            
            <Dropdown>
              <Dropdown.Toggle className="col-12 btn btn-light dropdown-toggle dropdown-toggle-split" >
                <Person width={'15%'} height={'15%'}/> 회원관리
                </Dropdown.Toggle>
                  <Dropdown.Menu className="col-12">                                             
                    <Dropdown.Item className="col-6"  onClick={() => navigate(`../admin/aguest`)}>회원정보관리</Dropdown.Item>                      
                    <Dropdown.Item className="col-6"   onClick={() => navigate(`../admin/ahost`)}>사업자정보관리</Dropdown.Item>   
                </Dropdown.Menu>
            </Dropdown>
            <Dropdown>
              <Dropdown.Toggle className="col-12 btn btn-light dropdown-toggle dropdown-toggle-split" >
                <HouseCheckFill width={'15%'} height={'15%'}/> 숙소관리
                </Dropdown.Toggle>
                  <Dropdown.Menu className="col-12">                                             
                    <Dropdown.Item className="col-6"  onClick={() => navigate(`../admin/ahotel`)}>숙소등록승인</Dropdown.Item>                                         
                </Dropdown.Menu>
            </Dropdown>   
            <Dropdown>
              <Dropdown.Toggle className="col-12 btn btn-light dropdown-toggle dropdown-toggle-split" >
                <CardList width={'15%'} height={'15%'}/> 공지사항
                </Dropdown.Toggle>
                  <Dropdown.Menu className="col-12">          
                  <Dropdown.Item className="col-6"  onClick={() => navigate(`/admin/notice/alist`)}>공지목록</Dropdown.Item>                                      
                    <Dropdown.Item className="col-6"  onClick={() => navigate(`/admin/notice/awrite`)}>공지등록</Dropdown.Item>  
                    <Dropdown.Item className="col-6"  onClick={() => navigate(`/admin/notice/adetail/:n_idx`)}>공지수정</Dropdown.Item>                                           
                </Dropdown.Menu>
            </Dropdown>
           </ul>
           </div>
           </nav>
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className="container11 mt-5">
                        <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="#">회원관리</a></li>
                            <li className="breadcrumb-item active" aria-current="page"> 회원정보관리</li>
                        </ol>
                        </nav>
                        <br/>
                            <h2 className="header"><PersonCircle width="50px" height="40px" /> 회원리스트</h2>
                            <hr />
                            <div className="row mb-3">
                                <div className="col-md-4">
                                    <select ref={searchkey} className="form-select" defaultValue='g_name'>
                                        <option value="g_name">회원명</option>
                                        <option value="g_email">회원ID</option>
                                        <option value="g_idx">회원번호</option>
                                    </select>
                                </div>
                                <div className="col-md-4">
                                    <input ref={search} className="form-control" placeholder="검색어를 입력하세요" />
                                </div>
                                <div className="col-md-2">
                                    <button type='button' className="btn btn-sign2" onClick={fetchguest}>조회</button>
                                </div>
                            </div>
                            <table className="table table-hover table-bordered custom-table1">
                                <thead className="table-light">
                                    <tr>
                                        <th>#</th>
                                        <th>회원명</th>
                                        <th>회원ID</th>
                                        <th>전화번호</th>
                                        <th>가입날짜</th>
                                        <th>등급관리</th>
                                        <th>포인트</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    {agItem && agItem.map((list, index) =>
                                        <tr key={index}>
                                            <td>{list.g_idx}</td>
                                            <td>{list.g_name}</td>
                                            <td>{list.g_email}</td>
                                            <td>{list.g_phone}</td>
                                            <td>{list.g_join_date}</td>
                                            <td>{getLevel(list.g_level)}</td>
                                            <td>{list.g_point}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </main>
                </div>
            </div>
            
        </>
    );
}

export default AGuest;
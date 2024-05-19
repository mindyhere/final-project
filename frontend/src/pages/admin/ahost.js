import React, { useRef, useEffect, useState } from 'react';
import '../admin/css/astyles.css'; 
import { Check2Square, PersonVcard } from 'react-bootstrap-icons';

function Ahost() {
    const searchkey = useRef();
    const search = useRef();
    const [ahitem, setAhitem] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchhost();
    }, []);

    const fetchhost = () => {
        const form = new FormData();
        form.append('searchkey', searchkey.current.value);
        form.append('search', search.current.value);
        fetch('http://localhost/admin/ah_list', {
            method: 'post',
            body: form
        }).then(response => response.json())
            .then(list => {
                console.log('list' + JSON.stringify(list));
                setAhitem(list);
            });
    };

    const approveHost = (h_idx, h_status) => {
        if (h_status === '승인대기') {
            if (window.confirm('사업자 가입을 승인하시겠습니까?')) {
                fetch(`http://localhost/admin/approve/${h_idx}`)
                    .then(response => {
                        if (response.ok) {
                            return response.text();
                        }
                        throw new Error('Error.');
                    })
                    .then(message => {
                        const updatedAhitem = ahitem.map(item => {
                            if (item.h_idx === h_idx) {
                                return { ...item, h_status: '승인완료' };
                            }
                            return item;
                        });
                        setAhitem(updatedAhitem);
                        setMessage(message);
                        window.alert('사업자 가입이 승인되었습니다.');
                    })
                    .catch(error => {
                        console.error('Error', error);
                        window.alert('사업자 가입 승인에 실패했습니다.');
                    });
            }
        } else if (h_status === '가입완료') {
            window.alert('승인 요청을 하지 않았습니다.');
        }
    };

    const getButtonClass = (h_status) => {
        switch (h_status) {
            case '승인완료':
                return 'btn btn-sm btn-secondary custom-button1';
            case '승인대기':
                return 'btn btn-sm btn-primary custom-button1';
            case '가입완료':
                return 'btn btn-sm btn-success custom-button1';
            default:
                return 'btn btn-sm btn-secondary custom-button1';
        }
    };

    const getButtonLabel = (h_status) => {
        switch (h_status) {
            case '승인완료':
                return '완료';
            case '가입완료':
                return '승인대기';
            default:
                return '가입승인';
        }
    };

 

return (
    <><hr/>
        <div class="container-fluid">
            <div class="row">
                <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                    <div class="position-sticky pt-3 sidebar-sticky">
                        <ul class="nav flex-column">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="#">
                                    <span class="align-text-bottom"></span>
                                    <Check2Square width="50px" height="30px"/> 사업자정보관리
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    <div className="container11 mt-5">
                    <h2 className="header"><PersonVcard width="50px" height="40px"/> 사업자 가입승인</h2> <hr/>
                        <div className="row justify-content-center">
                        <div className="row mb-3">
                                <div className="col-md-4">
                                    <select ref={searchkey} className="form-select" defaultValue='h_name'>
                                        <option value="h_name">사업자명</option>
                                        <option value="h_email">사업자ID</option>
                                        <option value="h_idx">사업자 등록번호</option>
                                    </select>
                                    </div>
                                    <div className="col-md-4">
                                    <input ref={search} className="form-control" placeholder="검색어를 입력하세요" />
                                   </div>
                                    <div className="col-md-2">
                                    <button type='button' className="btn btn-sign2" onClick={fetchhost}>조회</button>
                                </div>
                                </div>     
                                <table className="table table-hover table-bordered custom-table1">
                                    <thead className="table-light">
                                        <tr>
                                            <th>#</th>
                                            <th>사업자명</th>
                                            <th>사업자ID</th>
                                            <th>사업자 등록번호</th>
                                            <th>전화번호</th>
                                            <th>가입날짜</th>
                                            <th>등급</th>
                                            <th>가입상태</th>
                                            <th>가입승인</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ahitem && ahitem.map((list) =>
                                            <tr key={list.h_idx}>
                                                <td>{list.h_idx}</td>
                                                <td>{list.h_name}</td>
                                                <td>{list.h_email}</td>
                                                <td>{list.h_business}</td>
                                                <td>{list.h_phone}</td>
                                                <td>{list.h_regdate}</td>
                                                <td>{list.h_level}</td>
                                                <td>{list.h_status}</td>
                                                <td>
                                                    <button type="button" className={getButtonClass(list.h_status)} onClick={() => approveHost(list.h_idx, list.h_status)} disabled={list.h_status === '승인완료'}>
                                                        {getButtonLabel(list.h_status)}
                                                    </button>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div></main>
                    </div>
                </div>
         
       
        </>
);
}
export default Ahost;
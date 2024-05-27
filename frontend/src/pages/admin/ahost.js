import React, { useRef, useEffect, useState } from 'react';
import '../admin/css/astyles.css';
import { Check2Square, PersonVcard } from 'react-bootstrap-icons';
import Swal from 'sweetalert2';

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

    const approveHost = (h_idx, h_status, h_file) => {
        if (h_status === '승인대기') {
            const form = new FormData();
            form.append('h_file', h_file);
            form.append('h_idx', h_idx);

            Swal.fire({
                title: '가입 승인',
                text: '사업자 가입을 승인하시겠습니까?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: '승인',
                cancelButtonText: '취소',
                confirmButtonColor: '#41774d86',
                cancelButtonColor: '#838383d2'
            }).then((result) => {
                if (result.isConfirmed) {
                    if (h_file.length === 1) {
                        Swal.fire({
                            title: '사업자 등록증 확인 불가',
                            text: '사업자 등록증이 없습니다.',
                            icon: 'error',
                            confirmButtonColor: '#41774d86'
                        });
                        return;
                    }
                    
                    Swal.fire({
                        title: '사업자 등록증 확인',
                        text: '',
                        imageUrl: `http://localhost/static/images/host/profile/${h_file}`,
                        imageWidth: 400,
                        imageHeight: 400,
                        showCancelButton: true,
                        confirmButtonText: '확인',
                        cancelButtonText: '취소',
                        confirmButtonColor: '#41774d86',
                        cancelButtonColor: '#838383d2'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            fetch(`http://localhost/admin/approve`, {
                                method: 'post',
                                body: form,
                            }).then(response => {
                                if (response.ok) {
                                    return response.text();
                                }
                                throw new Error('Error.');
                            }).then(message => {
                                if (message === 'success') {
                                    const updatedAhitem = ahitem.map(item => {
                                        if (item.h_idx === h_idx) {
                                            return { ...item, h_status: '승인완료' };
                                        }
                                        return item;
                                    });
                                    setAhitem(updatedAhitem);
                                    setMessage(message);
                                    Swal.fire({
                                        title: '승인 완료',
                                        text: '사업자 가입이 승인되었습니다.',
                                        icon: 'success',
                                        confirmButtonColor: '#41774d86'
                                    });
                                } else if (message === 'fail') {
                                    Swal.fire({
                                        title: '등록증 없음',
                                        text: '사업자 등록증이 없습니다.',
                                        icon: 'error',
                                        confirmButtonColor: '#41774d86'
                                    });
                                }
                            }).catch(error => {
                                console.error('Error', error);
                                Swal.fire({
                                    title: '에러 발생',
                                    text: '사업자 가입 승인에 실패했습니다.',
                                    icon: 'error',
                                    confirmButtonColor: '#41774d86'
                                });
                            });
                        }
                    });
                }
            });
        } else if (h_status === '가입완료') {
            Swal.fire({
                title: '승인 요청 없음',
                text: '승인 대기 상태가 아닙니다.',
                icon: 'info',
                confirmButtonColor: '#41774d86'
            });
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
        <>
            <hr />
            <div className="container-fluid">
                <div className="row">
                    <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                        <div className="position-sticky pt-3 sidebar-sticky">
                            <ul className="nav flex-column">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="#">
                                        <span className="align-text-bottom"></span>
                                        <Check2Square width="50px" height="30px" /> 사업자정보관리
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className="container11 mt-5">
                            <h2 className="header"><PersonVcard width="50px" height="40px" /> 사업자 가입승인</h2>
                            <hr />
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
                                            <th>사업자등록증</th>
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
                                                <td>
                                                    <button type="button" className="btn btn-link" onClick={() => window.open(`http://localhost/static/images/host/profile/${list.h_file}`, '', 'width=500,height=500')}>
                                                        {list.h_file}
                                                    </button>
                                                </td>
                                                <td>{list.h_status}</td>
                                                <td>
                                                    <button type="button" className={getButtonClass(list.h_status)} onClick={() => approveHost(list.h_idx, list.h_status, list.h_file)} disabled={list.h_status === '승인완료'}>
                                                        {getButtonLabel(list.h_status)}
                                                    </button>
                                                </td>
                                            </tr>
                                        )}
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
export default Ahost;
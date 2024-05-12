import React, { useRef, useEffect, useState } from 'react';
import { PersonWorkspace, PencilSquare, Trash } from "react-bootstrap-icons";
import { useNavigate } from 'react-router';
import Swal from "sweetalert2";
import Cookies from "universal-cookie";

function Ahost() {
    const navigate = useNavigate();
    const searchkey = useRef();
    const search = useRef();
    const [ahitem, setAhitem] = useState("");
    const [selectedItem, setSelectedItem] = useState(null);
    const cookies = new Cookies(); 
    const [inputValue, setInputValue] = useState();

    const removeCookies = () => {
        cookies.remove("h_idx", { path: "/" }, 100);
        cookies.remove("h_name", { path: "/" }, 100);
        cookies.remove("h_email", { path: "/" },100);
        cookies.remove("h_phone", { path: "/" },100);
        cookies.remove("h_business", { path: "/" },100);
        cookies.remove("h_level", { path: "/" },100);
        cookies.remove("h_status", { path: "/" },100);
        cookies.remove("h_regdate", { path: "/" },100);
        cookies.remove("h_profile", { path: "/" },100);
        cookies.remove("h_description", { path: "/" },100);
    };

    const btndelete =() =>{
        if (window.confirm('정말로 탈퇴시키겠습니까?')) {
            fetch(`http://localhost/admin/ah_delete?h_idx=${selectedItem.h_idx}`, {
                method: 'POST' 
            })
            .then(response => response.json())
            .then(data => {
                if (data.result === 'success') {
                    Swal.fire({
                        title: '회원 삭제 완료',
                        showCancelButton: false,
                        confirmButtonText: '확인',
                    }).then((result) => {
                        if(result.isConfirmed) {
                            removeCookies("host");
                            window.location.href='/admin/ahost';
                        }
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
                console.error('Error deleting user:', error);
            });
        } 
    };

    const handleChange = (e) => {
        setInputValue(e.target.value);
    }
    
    const openModal = (item) => {
        setSelectedItem(item);
    };

    const closeModal = () => {
        setSelectedItem(null);
    };
  
    return (
        <>
            <nav className="navbar bg-body-tertiary fixed-top">
                <a className="navbar-brand" href='./amain'>
                    <PersonWorkspace width="50" height="50" />&nbsp; 관리자 페이지
                </a>
            </nav>
            <div>
                <h2>사업자 관리</h2><br />
                <select ref={searchkey} defaultValue='h_name'>
                    <option value="h_name">사업자명</option>
                    <option value="h_email">사업자ID</option>
                    <option value="h_idx">사업자 번호</option>
                </select>
                &nbsp;
                <input ref={search} />
                &nbsp;
                <button type='button' className="btn btn-outline-success" onClick={() => {
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
                }}>조회</button>
                <br /><br />

                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>프로필</th>
                            <th>사업자명</th>
                            <th>사업자ID</th>
                            <th>전화번호</th>
                            <th>가입날짜</th>
                            <th>등급</th>
                            <th>가입승인</th>
                            <th>관리</th> 
                        </tr>
                    </thead>
                    <tbody>
                        {ahitem && ahitem.map((list) =>
                            <tr key={list.h_idx}>
                                <td>{list.h_idx}</td>
                                <td><img src={list.h_profile} style={{ width: '50px', height: '50px' }} /></td>
                                <td>{list.h_name}</td>
                                <td>{list.h_email}</td>
                                <td>{list.h_phone}</td>
                                <td>{list.h_regdate}</td>
                                <td>{list.h_level}</td>
                                <td>{list.h_status}</td>
                                <td>
                                    <button type="button" className="btn" onClick={() => openModal(list)}>
                                        <PencilSquare width="25" height="25" />
                                    </button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {selectedItem && (
                    <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <div className="modal-dialog modal-lg modal-dialog-centered" style={{ borderRadius: '20px', boxShadow: '0 0 10px rgba(0,0,0,0.3)' }}>
                            <div className="modal-content" style={{ borderRadius: '20px', background: '#fff', padding: '20px', width: '100%', height: '300%' }}>
                                <div className="modal-header">
                                    <h5 className="modal-title">{selectedItem.h_name}님의 상세 정보</h5>
                                    <button type="button" className="close" onClick={closeModal}>
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <label>프로필</label>
                                            <img src={selectedItem.h_profile} className="img-fluid" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>사업자명</label>
                                        <input type="text" className="form-control"
                                            name="g_name" value={selectedItem.h_name} onChange={handleChange} readOnly />
                                    </div>
                                    <div className="form-group">
                                        <label>사업자ID</label>
                                        <input type="text" className="form-control"
                                            name="g_email" value={selectedItem.h_email} onChange={handleChange} readOnly />
                                    </div>
                                    <div className="form-group">
                                        <label>전화번호</label>
                                        <input type="text" className="form-control"
                                            name="g_passwd" value={selectedItem.h_phone} onChange={handleChange} readOnly />
                                    </div>
                                    <div className="form-group">
                                        <label>등급</label>
                                        <input type="text" className="form-control"
                                            name="g_phone" value={selectedItem.h_level} onChange={handleChange} readOnly />
                                    </div>
                                    <div className="form-group">
                                        <label>사업자등록번호</label>
                                        <input type="text" className="form-control"
                                            name="g_phone" value={selectedItem.h_business} onChange={handleChange} readOnly />
                                    </div>
                                    <div className="form-group">
                                        <label>가입상태</label>
                                        <input type="text" className="form-control"
                                            name="g_phone" value={selectedItem.h_status} onChange={handleChange}  />
                                    </div>
                                    <div className="form-group">
                                        <label>가입일자</label>
                                        <input type="text" className="form-control"
                                            name="g_phone" value={selectedItem.h_regdate} onChange={handleChange} readOnly />
                                    </div>
                                    <div className="form-group">
                                        <label>소개글</label>
                                        <input type="text" className="form-control"
                                            name="g_phone" value={selectedItem.h_description} onChange={handleChange} readOnly />
                                    </div>                               
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={closeModal}>닫기</button>
                                    <button type="button" className="btn btn-secondary" onClick={btndelete}>삭제</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default Ahost;
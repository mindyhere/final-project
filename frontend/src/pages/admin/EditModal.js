import {useNavigate,useParams} from 'react-router-dom';
import Swal from "sweetalert2";
import Cookies from "universal-cookie";
import React,{useRef,useEffect,useState} from 'react';

function EditModal({ list, onClose }) {
    const [formData, setFormData] = useState(list);
    const cookies = new Cookies();    

    const removeCookies = () => {
        cookies.remove("g_idx", { path: "/" }, 100);
        cookies.remove("g_name", { path: "/" }, 100);
        cookies.remove("g_email", { path: "/" },100);
        cookies.remove("g_passwd", { path: "/" },100);
        cookies.remove("g_level", { path: "/" }, new Date(Date.now()));
        cookies.remove("g_card", { path: "/" }, new Date(Date.now()));
        cookies.remove("g_phone", { path: "/" }, new Date(Date.now()));
        cookies.remove("g_photo", { path: "/" }, new Date(Date.now()));
        cookies.remove("g_join_date", { path: "/" }, new Date(Date.now()));
        cookies.remove("g_cvc", { path: "/" }, new Date(Date.now()));
        cookies.remove("g_date", { path: "/" }, new Date(Date.now()));
    };

    const handleSubmit = (e) => {
        e.preventDefault(); 
        if (window.confirm('회원 정보를 수정하시겠습니까?')) {
            fetch(`http://localhost/admin/ag_update`, {
                method: 'POST',
                body: 'formData'                   
            })
            .then(response => response.json())
            .then(data => {
                if (data.result === 'success') {
                    Swal.fire({
                        title: '수정 완료',
                        showCancelButton: false,
                        confirmButtonText: '확인',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            removeCookies("guest");
                            window.location.href = '/admin/aguest';
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
                console.error('Error updating user:', error);
            });
        }
    };

    const handleDelete = () => {        
        if (window.confirm('정말로 탈퇴시키겠습니까?')) {
            fetch(`http://localhost/admin/ag_delete?g_idx=${formData.g_idx}`, {
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
                            removeCookies("guest");
                            window.location.href='/admin/aguest';
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
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg modal-dialog-centered" style={{ borderRadius: '20px', boxShadow: '0 0 10px rgba(0,0,0,0.3)' }}>
                <div className="modal-content" style={{ borderRadius: '20px', background: '#fff', padding: '20px', width: '100%', height: '300%' }}>
                    <div className="modal-header">
                        <h5 className="modal-title">{formData.g_name}님의 가입정보</h5>
                        <button type="button" className="close" onClick={onClose}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-4">
                                    <label>프로필</label>
                                    <img src={formData.g_photo} className="img-fluid" readOnly />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>이름</label>
                                <input type="text" className="form-control"
                                    name="g_name" value={formData.g_name} onChange={handleChange} readOnly />
                            </div>
                            <div className="form-group">
                                <label>아이디</label>
                                <input type="text" className="form-control"
                                    name="g_email" value={formData.g_email} onChange={handleChange} readOnly />
                            </div>
                            <div className="form-group">
                                <label>비밀번호</label>
                                <input type="text" className="form-control"
                                    name="g_passwd" value={formData.g_passwd}  onChange={handleChange} readOnly />
                            </div>
                            <div className="form-group">
                                <label>전화번호</label>
                                <input type="text" className="form-control"
                                    name="g_phone" value={formData.g_phone} onChange={handleChange} readOnly />
                            </div>
                            <div className="form-group">
                                <label>가입일</label>
                                <input type="text" className="form-control"
                                    name="g_join_date" value={formData.g_join_date} onChange={handleChange} readOnly />
                            </div>
                            <div className="form-group row">
                                <div className="col">
                                    <label>카드정보</label>
                                    <input type="text" className="form-control" name="g_card" value={formData.g_card} onChange={handleChange} readOnly/>
                                </div>
                                <div className="col">
                                    <label>cvc</label>
                                    <input type="text" className="form-control" name="g_cvc" value={formData.g_cvc} onChange={handleChange} readOnly/>
                                </div>
                                <div className="col">
                                    <label>MM/YY</label>
                                    <input type="text" className="form-control" name="g_date" onChange={handleChange} value={formData.g_date} readOnly />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>등급</label>
                                <input type="text" className="form-control"
                                    name="g_level" value={formData.g_level}   onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>포인트</label>
                                <input type="text" className="form-control"
                                    name="g_point" value={formData.g_point}
                                    onChange={handleChange} />
                            </div>
                            <button type="submit" className="btn btn-secondary" style={{ backgroundColor: 'rgba(119, 167, 144, 0.753)', borderRadius: '10px' }}>수정</button>
                            <button type="button" className="btn btn-secondary" onClick={handleDelete} style={{ backgroundColor: ' rgba(119, 167, 144, 0.753)', borderRadius: '10px' }}>삭제</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default EditModal;
import {useNavigate,useParams} from 'react-router-dom';
import Swal from "sweetalert2";
import Cookies from "universal-cookie";
import React,{useRef,useEffect,useState} from 'react';

function EditModal({ list, onClose }) {
    const [formData, setFormData] = useState(list);
  

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
                    </div>
                </div>
            </div>
        </div>
    );
}
export default EditModal;
import React, { useRef, useEffect, useState } from 'react';
import { PencilSquare, Check2Square, Square } from "react-bootstrap-icons";
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../css/astyles.css';

function Adetail() {
    const { n_idx } = useParams();
    const [notice, setNotice] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const n_writer = useRef();
    const n_title = useRef();
    const n_content = useRef();
    const n_date = useRef();

    useEffect(() => {
        fetch(`http://localhost/notice/detail/${n_idx}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to load notice details.');
                }
                return response.json();
            })
            .then(data => {
                setNotice(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching notice details:', error);
                setError('Error');
                setLoading(false);
            });
    }, [n_idx]);

    const btnadetail = (event) => {
        event.preventDefault();

        if (!n_title.current.value || !n_content.current.value || !n_date.current.value) {
            Swal.fire({
                title: '입력 오류',
                text: '모든 필드를 입력해주세요.',
                icon: 'error',
                confirmButtonText: '확인',
            });
            return;
        }

        const formData = new URLSearchParams();
        formData.append("n_writer", notice.n_writer);
        formData.append("n_title", n_title.current.value);
        formData.append("n_content", n_content.current.value);
        formData.append("n_date", n_date.current.value);

        if (window.confirm('수정하시겠습니까?')) {
            fetch(`http://localhost/notice/update/${n_idx}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData.toString(),
            })
            .then((response) => {
                if (response.ok) {
                    Swal.fire({
                        title: '수정 완료되었습니다',
                        text: '공지 목록 화면으로 이동합니다.',
                        icon: 'success',
                        confirmButtonText: '확인',
                    });
                    navigate('/admin/notice/alist');
                } else {
                    Swal.fire({
                        title: '에러 발생',
                        text: '처리 중 문제가 발생했습니다.',
                        icon: 'error',
                        confirmButtonText: '확인',
                    });
                }
            })
            .catch((error) => {
                console.error('Error updating notice:', error);
            });
        }
    };

    if (loading) {
        return <div className="container mt-5">Loading...</div>;
    }

    if (error) {
        return <div className="container mt-5">Error: {error}</div>;
    }

    return (
        <>
            <hr />
            <div className="container-fluid">
                <div className="row">
                    <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                        <div className="position-sticky pt-3 sidebar-sticky">
                            <ul className="nav flex-column">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="../alist">
                                        <span data-feather="home" className="align-text-bottom"></span>
                                        <Square width="50px" height="20px"/> 공지사항
                                    </a>   
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="../awrite">
                                        <span className="align-text-bottom"></span>
                                        <Square width="50px" height="20px"/> 공지등록
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="../adetail">
                                        <span className="align-text-bottom"></span>
                                        <Check2Square width="50px" height="30px"/> 공지수정
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className="container11 mt-5">
                            <div className="d-flex justify-content-between align-items-center">
                                <h2 className="header"><PencilSquare width="40px" height="30px"/> 공지사항 수정</h2>
                            </div>
                            <hr /><br />
                            <div className="table-responsive">
                                <form onSubmit={btnadetail}>
                                    <table className="table table-bordered">
                                        <tbody>
                                            <tr>
                                                <td className="col-form-label">작성자</td>
                                                <td>{notice?.n_writer}</td>
                                            </tr>
                                            <tr>
                                                <td className="col-form-label">제목</td>
                                                <td><textarea className="form-control" id="n_title" rows="1" ref={n_title} defaultValue={notice?.n_title}></textarea></td>
                                            </tr>
                                            <tr>
                                                <td className="col-form-label">작성일자</td>
                                                <td><textarea className="form-control" id="n_date" rows="1" ref={n_date} defaultValue={notice?.n_date}></textarea></td>
                                            </tr>
                                            <tr>
                                                <td className="col-form-label">내용</td>
                                                <td><textarea className="form-control" id="n_content" rows="6" ref={n_content} defaultValue={notice?.n_content}></textarea></td>
                                            </tr>
                                            <tr>
                                                <td colSpan="2" className="text-center">
                                                    <button type="submit" className="btn btn-sign3">수정</button>
                                                    <button type="button" onClick={() => navigate('/admin/notice/alist')} className="btn btn-sign3">목록</button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </form>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}

export default Adetail;
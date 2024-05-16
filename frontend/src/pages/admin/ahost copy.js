import React, { useRef, useEffect, useState } from 'react';
import { PencilSquare } from "react-bootstrap-icons";

function Ahost() {
    const searchkey = useRef();
    const search = useRef();
    const [ahitem, setAhitem] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [inputValue, setInputValue] = useState("");
    const [message, setMessage] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    useEffect(() => {
        fetchhost();
    }, [currentPage]);

    const fetchhost = () => {
        const form = new FormData();
        form.append('searchkey', searchkey.current.value);
        form.append('search', search.current.value);
        form.append('currentPage', currentPage);
        form.append('itemsPerPage', itemsPerPage);
        fetch('http://localhost/admin/ah_list', {
            method: 'post',
            body: form
        }).then(response => response.json())
            .then(list => {
                console.log('list' + JSON.stringify(list));
                setAhitem(list);
            });
    };

    //페이지네이션 기능
    const totalPages = Math.ceil(ahitem.length / itemsPerPage);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const renderPagination = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }
        return (
            <ul className="pagination">
                {pageNumbers.map(number => (
                    <li key={number} className="page-item">
                        <button onClick={() => paginate(number)} className="page-link">
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        );
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

    // 사업자 가입승인
    const approveHost = (h_idx) => {

        fetch(`http://localhost/admin/approve/${h_idx}`)
            .then(response => {
                if (response.ok) {
                    const updatedAhitem = ahitem.map(item => {
                        if (item.h_idx === h_idx) {
                            return { ...item, h_status: '승인완료' };
                        }
                        return item;
                    });
                    setAhitem(updatedAhitem);
                    return response.text();
                }
                throw new Error('Network response was not ok.');
            })
            .then(message => {
                console.log(message);
            })
            .catch(error => {
                console.error('Error', error);
            });

        // if (h_status === '승인대기') {
        // fetch(`http://localhost/admin/approve_host?h_idx=${h_idx}`)
        //     .then(response => {
        //         if (response.ok) {
        //             const updatedAhitem = ahitem.map(item => {
        //                 if (item.h_idx === h_idx) {
        //                     return { ...item, h_status: '승인완료' };
        //                 }
        //                 return item;
        //             });
        //             setAhitem(updatedAhitem);
        //             return response.text();
        //         }
        //         throw new Error('Network response was not ok.');
        //     })
        //     .then(message => {
        //         console.log(message);
        //     })
        //     .catch(error => {
        //         console.error('Error', error);
        //     });
        // } else {
        //     setMessage('이미 가입이 승인되었습니다.');
        // }
    };

    // // 페이지네이션 디자인
    // const indexOfLastItem = currentPage * itemsPerPage;
    // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // const currentItems = ahitem.slice(indexOfFirstItem, indexOfLastItem);
    // const paginationStyle = {
    //     display: 'flex',
    //     justifyContent: 'center',
    //     marginTop: '20px',
    // };

    // const buttonStyle = {
    //     margin: '0 5px',
    //     padding: '5px 10px',
    //     borderRadius: '5px',
    //     border: '1px solid #ccc',
    //     backgroundColor: '#fff',
    //     cursor: 'pointer',
    // };

    return (
        <>
            <div className="container">
                <h2>사업자관리</h2><br />
                <div className="row">
                    <div className="col-md-15">
                        <select ref={searchkey} defaultValue='h_name'>
                            <option value="h_name">사업자명</option>
                            <option value="h_email">사업자ID</option>
                            <option value="h_idx">사업자 번호</option>
                        </select>
                        &nbsp;
                        <input ref={search} />
                        &nbsp;
                        <button type='button' className="btn btn-outline-success"
                            onClick={fetchhost}>조회</button>
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
                                    <th>가입상태</th>
                                    <th>상세</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems && currentItems.map((list) =>
                                    <tr key={list.h_idx}>
                                        <td>{list.h_idx}</td>
                                        <td><img src={list.h_profile} style={{ width: '50px', height: '50px' }} /></td>
                                        <td>{list.h_name}</td>
                                        <td>{list.h_email}</td>
                                        <td>{list.h_phone}</td>
                                        <td>{list.h_regdate}</td>
                                        <td>{list.h_level}</td>
                                        <td> <button type='button' onClick={() => approveHost(list.h_idx)}>가입승인</button></td>
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
                                            &nbsp;<button type="button" className="close" onClick={closeModal}>
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
                                                    name="g_phone" value={selectedItem.h_status} onChange={handleChange} />
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
                                    </div>
                                </div>
                            </div>
                        )}</div>
                    <div style={paginationStyle}>
                        <button style={buttonStyle} disabled={currentPage === 1} onClick={() => paginate(currentPage - 1)}>Previous</button>
                        {[...Array(totalPages)].map((_, index) => (
                            <button key={index} style={buttonStyle} onClick={() => paginate(index + 1)} className={currentPage === index + 1 ? 'active' : ''}>{index + 1}</button>
                        ))}
                        <button style={buttonStyle} disabled={currentPage === totalPages} onClick={() => paginate(currentPage + 1)}>Next</button>
                    </div>
                </div>
            </div>

        </>
    );
}

export default Ahost;
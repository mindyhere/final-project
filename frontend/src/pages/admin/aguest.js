import React, { useRef, useEffect, useState } from 'react';
import { PencilSquare } from "react-bootstrap-icons";
import EditModal from "./EditModal"; 

function AGuest() {
    const searchkey = useRef();
    const search = useRef();
    const [agItem, setAgitem] = useState("");
    const [selectedlist, setSelectedlist] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5); 

//회원등급
    const getLevel = (g_Level) => {
        if (g_Level <= 5) {
            return 'REGULAR';
        } else if (g_Level >= 10) {
            return 'SUPER';
        } else {
            return 'VIP';
        }
    };

    //리스트 고정 
    useEffect(() => {
        fetchguest();
      },  [currentPage]); 

    const fetchguest = () => {
        const form = new FormData();
        form.append('searchkey', searchkey.current.value);
        form.append('search', search.current.value);
        form.append('currentPage', currentPage);
        form.append('itemsPerPage', itemsPerPage);
        fetch('http://localhost/admin/ag_list', {
            method: 'get'
        })
        .then(response => response.json())
        .then(list => {
            console.log('list', list);
            setAgitem(list);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

 //페이지네이션 기능
    const totalPages = Math.ceil(agItem.length / itemsPerPage); 
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

    // 페이지네이션 디자인
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = agItem.slice(indexOfFirstItem, indexOfLastItem);
        const paginationStyle = {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '20px',
    };

    const buttonStyle = {
        margin: '0 5px',
        padding: '5px 10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        backgroundColor: '#fff',
        cursor: 'pointer',
    };

//상세 모달창
    const handleEditClick = (list) => {
        setSelectedlist(list);
        setIsEditModalOpen(true);
    };

    return (
        <>
             <div className="container">
             <h2>회원관리</h2><br />
                <div className="row">
                <div className="col-md-15">
                <select ref={searchkey} defaultValue='g_name'>
                    <option value="g_name">회원명</option>
                    <option value="g_email">회원ID</option>
                    <option value="g_idx">회원번호</option>
                </select>
                &nbsp;
                <input ref={search} />
                &nbsp;
                <button type='button' className="btn btn-outline-success" 
                onClick={fetchguest}>조회</button>
                <br /><br />
               <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>프로필</th>
                            <th>회원명</th>
                            <th>회원ID</th>
                            <th>전화번호</th>
                            <th>가입날짜</th>
                            <th>등급관리</th>
                            <th>상세</th>
                        </tr>
                    </thead>
                    <tbody>
                    {currentItems && currentItems.map((list,index) =>
                        // {agItem && agItem.map((list,index) =>
                            <tr key={index}>
                                <td>{list.g_idx}</td>
                                <td>{list.g_photo}</td>
                                <td>{list.g_name}</td>
                                <td>{list.g_email}</td>
                                <td>{list.g_phone}</td>
                                <td>{list.g_join_date}</td>
                                <td>{getLevel(list.g_level)}</td>
                                <td><button type="button" className="btn" onClick={() => handleEditClick(list)}>
                                <PencilSquare width="25" height="25" /></button>
                                </td>
                            </tr>
                        
                        )}
                    </tbody>
                </table>
            </div>
            {isEditModalOpen && (
                <EditModal
                    list={selectedlist}
                    onClose={() => setIsEditModalOpen(false)}
                />
            )} </div>   </div> 

            <div style={paginationStyle}>
                            <button style={buttonStyle} disabled={currentPage === 1} onClick={() => paginate(currentPage - 1)}>Previous</button>
                            {[...Array(totalPages)].map((_, index) => (
                                <button key={index} style={buttonStyle} onClick={() => paginate(index + 1)} className={currentPage === index + 1 ? 'active' : ''}>{index + 1}</button>
                            ))}
                            <button style={buttonStyle} disabled={currentPage === totalPages} onClick={() => paginate(currentPage + 1)}>Next</button>
                      
                        </div>   
        </>
    );
}

export default AGuest;
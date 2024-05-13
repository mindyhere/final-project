import React, { useRef, useEffect, useState } from 'react';
import { PersonWorkspace,PencilSquare } from "react-bootstrap-icons";
import EditModal from "./EditModal"; 
import { useNavigate } from 'react-router';

function AGuest() {
    const navigate = useNavigate();
    const searchkey = useRef();
    const search = useRef();
    const [agItem, setAgitem] = useState("");
    const [selectedlist, setSelectedlist] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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
      }, [])

    const fetchguest = () => {
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

    const handleEditClick = (list) => {
        setSelectedlist(list);
        setIsEditModalOpen(true);
    };

    return (
        <>
            <nav className="navbar bg-body-tertiary fixed-top">
                <a className="navbar-brand" href='./amain'>
                    <PersonWorkspace width="50" height="50" />&nbsp; 관리자 페이지
                </a>
            </nav>
            <div>
                <h2>회원관리</h2><br />
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
                        {agItem && agItem.map((list,index) =>
                            <tr key={index}>
                                <td>{list.g_idx}</td>
                                <td><img src={list.g_photo} style={{ width: '50px', height: '50px' }}/></td>
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
            )}
        </>
    );
};

export default AGuest;
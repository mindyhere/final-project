import React, { useRef, useEffect, useState } from 'react';

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

    // 사업자 가입승인
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
                    })
                    .catch(error => {
                        console.error('Error', error);
                    });
            }
        } else if (h_status === '가입완료') {
            window.alert('승인 요청을 하지 않았습니다.');
        }
    };

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
                        <button type='button' className="btn btn-outline-success" onClick={fetchhost}>조회</button>
                        <br /><br />
                        <table className="table table-hover">
                            <thead>
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
                                            <button type="button" onClick={() => approveHost(list.h_idx, list.h_status)} disabled={list.h_status === '승인완료'}>
                                                {list.h_status === '승인완료' ? '완료' : list.h_status === '가입완료' ? '승인대기' : '가입승인'}
                                            </button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Ahost;
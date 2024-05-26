import React, { useRef, useEffect, useState } from 'react';
import { Check2Square, HouseCheck, Square } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import '../admin/css/astyles.css';

function AHotel() {
    const searchkey = useRef();
    const search = useRef();
    const statusFilter = useRef();
    const [list, setList] = useState([]);
    const [filteredStatus, setFilteredStatus] = useState('');

    const getStatus = (ho_status) => {
        switch (ho_status) {
            case 1:
                return (<td style={{ color: "green"}}>승인 대기</td>);
            case 2:
                return (<td style={{ color: "blue"}}>영업 중</td>);
            case 3:
                return (<td style={{ color: "red"}}>영업 중지 신청 </td>);   
            default:
                return (<td style={{ color: "yellow"}}>영업 재개 신청</td>);
        }
    };

    useEffect(() => {
        fetchahotel();
    }, [filteredStatus]);


    const fetchahotel = () => {
        const params = new URLSearchParams();
        if (searchkey.current.value) params.append('searchkey', searchkey.current.value);
        if (search.current.value) params.append('search', search.current.value);
        if (filteredStatus) params.append('status', filteredStatus);

        fetch(`http://localhost/admin/ahoList?${params.toString()}`, {
            method: 'POST',
        })
            .then(response => response.json())
            .then(data => {
                data.sort((a, b) => a.ho_idx - b.ho_idx); // 리스트 정렬
                const uniqueList = data.filter((hotel, index, self) => // 중복 호텔 제거
                    index === self.findIndex(h => h.ho_idx === hotel.ho_idx)
                );
                setList(uniqueList);
            })
            .catch(error => {
                console.error('Error fetching hotel list:', error);
            });
    };
    const handleStatusFilterChange = () => {
        setFilteredStatus(statusFilter.current.value);
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
                                        <span data-feather="home" className="align-text-bottom"></span>
                                        <Check2Square width="50px" height="30px" /> 숙소운영관리
                                    </a>
                                </li>
                                <li className="nav-item">
                                   <a className="nav-link active" aria-current="page" href="#">
                                    <span data-feather="home" className="align-text-bottom"></span>
                                      <Square width="50px" height="20px" /> 숙소상세관리
                                 </a>
                                </li>
                            </ul>
                        </div>
                    </nav>                 
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className="container11 mt-5">
                            <h2 className="header"><HouseCheck width="50px" height="40px"/> 숙소 등록승인</h2><hr/>
                            <div className="row mb-3">
                                <div className="col-md-4">
                                    <select ref={searchkey} defaultValue='ho_name' className="form-select">
                                        <option value="ho_idx">번호</option>
                                        <option value="ho_name">숙소명</option>
                                        <option value="ho_address">지역명</option>
                                    </select>
                                </div>
                                <div className="col-md-4">
                                    <input ref={search} className="form-control" placeholder="검색어를 입력하세요" />
                                </div>
                                <div className="col-md-2">
                                    <select ref={statusFilter} className="form-select" onChange={handleStatusFilterChange}>
                                        <option value="">숙소 영업 상태</option>
                                        <option value="1">승인 대기</option>
                                        <option value="2">영업 중</option>
                                        <option value="3">영업 중지</option>
                                        <option value="4">영업 재개</option>
                                    </select>
                                </div>
                                <div className="col-md-2">
                                    <button type='button' className="btn btn-sign2" onClick={fetchahotel}>조회</button>
                                </div>
                            </div>
                            <div className="table-responsive">
                                {list.length > 0 ? (
                                    <table className="table table-hover table-bordered custom-table1">
                                        <thead className="table-light">
                                            <tr>
                                                <th>#</th>
                                                <th>숙소명</th>
                                                <th>지역명</th>
                                                <th>등급</th>
                                                <th>호스트</th>
                                                <th>영업상태</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {list.map((hotel, index) => (
                                                <tr key={index}>
                                                    <td>{hotel.ho_idx}</td>
                                                    <td><Link to={`/admin/ahoteldetail/${hotel.ho_idx}`}>{hotel.ho_name}</Link></td>
                                                    <td>{hotel.ho_address}</td>
                                                    <td>{hotel.ho_level}</td>
                                                    <td>{hotel.h_name}</td>
                                                    {/* <td>{hotel.h_business}</td> */}
                                                    <td>{getStatus(hotel.ho_status)}</td>                                                  
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <p className="no-data">No data</p>
                                )}
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}

export default AHotel;
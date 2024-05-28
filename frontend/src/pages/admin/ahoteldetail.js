import React, { useRef, useEffect, useState } from 'react';
import { Check2Square, Square, BuildingFill, PersonVcard ,CardList, House, HouseCheckFill,  Person } from 'react-bootstrap-icons';
import { useParams } from "react-router-dom";
import Swal from 'sweetalert2';
import '../admin/css/astyles.css'; // Import your custom styles
import moment from "moment";
import "moment/locale/ko";
import { useNavigate } from "react-router-dom";
import { Dropdown} from "react-bootstrap";
import Cookies from "universal-cookie";

function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setData(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, [url]);

    return [data, loading, error];
}

function AHoteldetail() {
    const navigate = useNavigate();
    const cookies = new Cookies();
    const a_id = cookies.get("a_id");
    const { hoIdx } = useParams();
    const element = useRef(null);
    const onMoveBox = () => {
        element.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const [data, loading, fetchError] = useFetch(`http://localhost/admin/ahodetail?hoIdx=${hoIdx}`);

    if (loading) {
        return <div className="text-center">로딩 중...</div>;
    } else {
        let regdate = moment(data.dto[0].h_regdate).fromNow();
        let level = data.dto[0].ho_level === 8 ? '호스트' : '슈퍼호스트';
        let answer = data.dto[0].ho_level === 8 ? '80%' : '100%';
        if (data.dto[0].ho_level == 8){
            level = '호스트';
            answer = '80%';
        } else {
            level = '슈퍼호스트';
            answer = '100%';
        }

        const getlevel = (h_level) => {
            if (h_level == 8) {
                return '호스트';
            } else if (h_level == 9) {
                return '슈퍼호스트';
            } 
            };


        const getStatus = (ho_status) => {
            switch (ho_status) {
                case 1:
                    return (<td style={{ color: "green" }}>승인 대기</td>);
                case 2:
                    return (<td style={{ color: "blue" }}>영업 중</td>);
                case 3:
                    return (<td style={{ color: "red" }}>영업 중지 신청 </td>);
                default:
                    return (<td style={{ color: "yellow" }}>영업 재개 신청</td>);
            }
        };

        const urlHandle = (e) => {
            window.open(`http://localhost/static/images/host/hotel/${data.dto[0].ho_img}`, 'width=500, height=500');         
        };

        const url = (e) => {
            window.open(`http://localhost/static/images/host/profile/${data.dto[0].h_file}`, 'width=400, height=400');
        };

        const btnApprove = (hoIdx) => {
            Swal.fire({
                title: `${data.dto[0].h_name}님의 호텔 등록 승인 신청`,
                text: '승인하시겠습니까?',
                confirmButtonText: '확인',
                cancelButtonText: "취소",
                showCancelButton: true,
                icon: 'question',
                iconColor: '#41774d86',
                confirmButtonColor: '#41774d86',
                cancelButtonColor: '#838383d2',
            }).then((result) => {
                if (result.isConfirmed) {
                    fetch(`http://localhost/admin/approveHotel?ho_idx=${hoIdx}&ho_status=2`, {
                        method: 'POST',
                    })
                        .then(response => {
                            if (response.ok) {
                                Swal.fire({
                                    title: '승인 완료',
                                    text: `${data.dto[0].ho_name}이 등록되었습니다.`,
                                    icon: 'success',
                                    confirmButtonText: '확인',
                                    confirmButtonColor: '#41774d86',
                                });
                            } else {
                                throw new Error('Error approving hotel');
                            }
                        })
                        .catch(error => {
                            Swal.fire({
                                title: '에러 발생',
                                text: '처리 중 문제가 발생했습니다.',
                                icon: 'error',
                                confirmButtonText: '확인',
                                confirmButtonColor: '#41774d86',
                            });
                        });
                }
            });
        };

        const btnStop = (hoIdx) => {
            Swal.fire({
                title: `${data.dto[0].h_name}님의 호텔 영업 중지 신청`,
                text: '승인하시겠습니까?',
                confirmButtonText: '확인',
                cancelButtonText: "취소",
                showCancelButton: true,
                icon: 'question',
                iconColor: '#d33',
                confirmButtonColor: '#41774d86',
                cancelButtonColor: '#838383d2',
            }).then((result) => {
                if (result.isConfirmed) {
                    fetch(`http://localhost/admin/approveHotelClose?ho_idx=${hoIdx}&ho_status=3`, {
                        method: 'POST',
                    })
                        .then(response => {
                            if (response.ok) {
                                Swal.fire({
                                    title: '승인 완료',
                                    text: `${data.dto[0].ho_name}이 영업 중지되었습니다.`,
                                    icon: 'success',
                                    confirmButtonText: '확인',
                                    confirmButtonColor: '#41774d86',
                                });
                            } else {
                                throw new Error('Error approving hotel');
                            }
                        })
                        .catch(error => {
                            Swal.fire({
                                title: '에러 발생',
                                text: '처리 중 문제가 발생했습니다.',
                                icon: 'error',
                                confirmButtonText: '확인',
                                confirmButtonColor: '#41774d86',
                            });
                        });
                }
            });
        };

        const btnStart = (hoIdx) => {
            Swal.fire({
                title: `${data.dto[0].h_name}님의 호텔 영업 재개 신청`,
                text: '승인하시겠습니까?',
                confirmButtonText: '확인',
                cancelButtonText: "취소",
                showCancelButton: true,
                icon: 'question',
                iconColor: '#41774d86',
                confirmButtonColor: '#41774d86',
                cancelButtonColor: '#838383d2',
            }).then((result) => {
                if (result.isConfirmed) {
                    fetch(`http://localhost/admin/approveHotel?ho_idx=${hoIdx}&ho_status=2`, {
                        method: 'POST',
                    })
                        .then(response => {
                            if (response.ok) {
                                Swal.fire({
                                    title: '승인 완료',
                                    text: `${data.dto[0].ho_name}이 영업 재개되었습니다.`,
                                    icon: 'success',
                                    confirmButtonText: '확인',
                                    confirmButtonColor: '#41774d86',
                                });
                            } else {
                                throw new Error('Error approving hotel');
                            }
                        })
                        .catch(error => {
                            Swal.fire({
                                title: '에러 발생',
                                text: '처리 중 문제가 발생했습니다.',
                                icon: 'error',
                                confirmButtonText: '확인',
                                confirmButtonColor: '#41774d86',
                            });
                        });
                }
            });
        };

        if (loading) {
            return <div>Loading...</div>;
        }

        if (fetchError) {
            return <div>Error loading data.</div>;
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
            <a className="nav-link active"
              onClick={() => navigate(`/admin/amain/${a_id}`)}
              >
                &nbsp; <House width={'15%'} height={'15%'}/> HOME
              </a>
            </li>
            
            <Dropdown>
              <Dropdown.Toggle className="col-12 btn btn-light dropdown-toggle dropdown-toggle-split" >
                <Person width={'15%'} height={'15%'}/> 회원관리
                </Dropdown.Toggle>
                  <Dropdown.Menu className="col-12">                                             
                    <Dropdown.Item className="col-6"  onClick={() => navigate(`../admin/aguest/${a_id}`)}>회원정보관리</Dropdown.Item>                      
                    <Dropdown.Item className="col-6"   onClick={() => navigate(`../admin/ahost/${a_id}`)}>사업자정보관리</Dropdown.Item>   
                </Dropdown.Menu>
            </Dropdown>
            <Dropdown>
              <Dropdown.Toggle className="col-12 btn btn-light dropdown-toggle dropdown-toggle-split" >
                <HouseCheckFill width={'15%'} height={'15%'}/> 숙소관리
                </Dropdown.Toggle>
                  <Dropdown.Menu className="col-12">                                             
                    <Dropdown.Item className="col-6"  onClick={() => navigate(`../admin/ahotel/${a_id}`)}>숙소등록승인</Dropdown.Item>                                         
                </Dropdown.Menu>
            </Dropdown>   
            <Dropdown>
              <Dropdown.Toggle className="col-12 btn btn-light dropdown-toggle dropdown-toggle-split" >
                <CardList width={'15%'} height={'15%'}/> 공지사항
                </Dropdown.Toggle>
                  <Dropdown.Menu className="col-12">          
                  <Dropdown.Item className="col-6"  onClick={() => navigate(`/admin/notice/alist/${a_id}`)}>공지목록</Dropdown.Item>                                      
                    <Dropdown.Item className="col-6"  onClick={() => navigate(`/admin/notice/awrite/${a_id}`)}>공지등록</Dropdown.Item> 
                    <Dropdown.Item className="col-6"  onClick={() => navigate(`/admin/notice/adetail/:n_idx`)}>공지수정</Dropdown.Item>                                            
                </Dropdown.Menu>
            </Dropdown>
           </ul>
           </div>
           </nav>
                        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                            <div className="container">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="../ahotel">Hotel</a></li>
                                    <li className="breadcrumb-item active" aria-current="page">{data.dto[0].h_name}의 {data.dto[0].ho_name} 상세 정보</li>
                                </ol>

                                <div className="card-style mb-30">
                                    <h3><PersonVcard size={35} /> 호스트 정보</h3><br />
                                    <div className="profile-card1">
                                        <table className="tbl1">
                                            <tbody>
                                                <tr>
                                                    <th>이름</th>
                                                    <td>{data.dto[0].h_name}</td>
                                                </tr>
                                                <tr>
                                                    <th>이메일</th>
                                                    <td>{data.dto[0].h_email}</td>
                                                </tr>
                                                <tr>
                                                    <th>사업자 등록증/등록번호</th>
                                                    <td><a onClick={url}> {data.dto[0].h_file} </a>
                                                    / {data.dto[0].h_business} </td>
                                                </tr>
                                                <tr>
                                                    <th>호스팅 경력</th>
                                                    <td>{getlevel(data.dto[0].h_level)} /   {regdate}</td>
                                                
                                                </tr>
                                                <tr>
                                                    <th>연락처</th>
                                                    <td>{data.dto[0].h_phone}</td>
                                                </tr>
                                                <tr>
                                                    <th>등록일</th>
                                                    <td>{moment(data.dto[0].h_regdate).format('YYYY-MM-DD')}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div className="card-style mb-30">
                                    <h3><BuildingFill size={35} /> 호텔 상세</h3>
                                    <br />
                                    <table className="tbl1">
                                        <thead></thead>
                                        <tbody>
                                            <tr>
                                                <th colSpan={2} style={{ backgroundColor: '#65886d6e' }}>호텔 대표 이미지</th>
                                                <td colSpan={2}>
                                                    [이미지] <a href="#" style={{ border: "0px", outline: "none" }} onClick={urlHandle}> {data.dto[0].ho_img}</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th colSpan={2} style={{ backgroundColor: '#65886d6e' }}>호텔 등급</th>
                                                <td colSpan={2}>{data.dto[0].ho_level}등급</td>
                                            </tr>
                                            <tr>
                                                <th colSpan={2} style={{ backgroundColor: '#65886d6e' }}>객실유형</th>
                                                <td>
                                                    <table className="nested-tbl">
                                                        <tbody>
                                                            <tr>
                                                                <td>싱글룸</td>
                                                                <td>{data.dto[0].ho_single}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>더블룸</td>
                                                                <td>{data.dto[0].ho_double}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>패밀리룸</td>
                                                                <td>{data.dto[0].ho_family}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>스위트룸</td>
                                                                <td>{data.dto[0].ho_suite}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th colSpan={2} style={{ backgroundColor: '#65886d6e' }}>주소</th>
                                                <td>{data.dto[0].ho_address}</td>
                                            </tr>
                                            <tr>
                                                <th colSpan={2} style={{ backgroundColor: '#65886d6e' }} >체크인</th>
                                                <td>{data.dto[0].ho_check_in}</td>
                                            </tr>
                                            <tr>
                                                <th colSpan={2} style={{ backgroundColor: '#65886d6e' }} >체크아웃</th>
                                                <td>{data.dto[0].ho_check_out}</td>
                                            </tr>
                                            <tr>
                                                <th colSpan={2} style={{ backgroundColor: '#65886d6e' }}>편의시설</th>
                                                <td>{data.dto[0].mountain_view}</td>
                                            </tr>
                                            <tr>
                                                <th colSpan={2} style={{ backgroundColor: '#65886d6e' }}>소개</th>
                                                <td>{data.dto[0].ho_description}</td>
                                            </tr>
                                            <tr>
                                                <th colSpan={2} style={{ backgroundColor: '#65886d6e' }}>영업상태</th>
                                                <td>{getStatus(data.dto[0].ho_status)}</td>
                                                <td colSpan={3}>
                                                    {(data.dto[0].ho_status) === 1 && (
                                                        <button type="button" className="btn btn-primary" onClick={() => btnApprove(data.dto[0].ho_idx)}>승인</button>
                                                    )}
                                                    {(data.dto[0].ho_status) === 2 && (
                                                        <button type="button" className="btn btn-danger" onClick={() => btnStop(data.dto[0].ho_idx)}>영업 중지</button>
                                                    )}
                                                    {(data.dto[0].ho_status) === 3 && (
                                                        <button type="button" className="btn btn-success" onClick={() => btnStart(data.dto[0].ho_idx)}>영업 재개</button>
                                                    )}
                                                </td>
                                            </tr>
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
}

export default AHoteldetail;
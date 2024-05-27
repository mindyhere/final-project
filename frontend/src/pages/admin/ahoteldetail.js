import React, { useRef, useEffect, useState } from 'react';
import { Check2Square, Square, BuildingFill, PersonVcard } from 'react-bootstrap-icons';
import { useParams } from "react-router-dom";
import Cookies from "universal-cookie";
import Swal from 'sweetalert2';
import '../admin/css/astyles.css';
import moment from "moment";
import "moment/locale/ko";

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
    const cookies = new Cookies();
    const { hoIdx } = useParams();
    const h_name = useRef();
    const h_email = useRef();
    const h_business = useRef();
    const h_status = useRef();
    const h_phone = useRef();
    const h_regdate = useRef();
    const h_level = useRef();
    const h_file = useRef();
    const element = useRef(null);

    const onMoveBox = () => {
        element.current?.scrollIntoView({behavior : "smooth", block:"start"});
    }

    const [error, setError] = useState(null);
    const [data, loading, fetchError] = useFetch(`http://localhost/admin/ahodetail?hoIdx=${hoIdx}`);
    const [data1, loading1] = useFetch(`http://localhost/admin/ahostInfo/${hoIdx}`);

    if (loading || loading1) {
        return <div className="text-center">로딩 중...</div>
    } else {
        let level = '';
        let answer = '';
        if (data.dto[0].ho_level === 8){
            level = '호스트';
            answer = '85%';
        } else {
            level = '슈퍼호스트';
            answer = '100%';
        }
        let profile_src = '';
        let profile_url = '';
        if (data1.h_profile !== '-') {
            profile_src = `http://localhost/static/images/host/profile/${data1.h_profile}`;
            profile_url = `<img src=${profile_src} width='90px' height='90px'/>`;
        } else {
            profile_src = `http://localhost/static/images/no-image.png`;
            profile_url = `<img src=${profile_src} width='70px' height='70px'/>`;
        }

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

        const urlHandle = (e) => {
            window.open(`http://localhost/static/images/host/hotel/${data.dto[0].ho_img}`, 'width=500, height=500');
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
                title: `${data1.h_name}님의 호텔 영업 재개 신청`,
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
                                        <a className="nav-link active" aria-current="page" href="#">
                                            <Square width="50px" height="20px" /> 숙소운영관리
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link active" aria-current="page" href="#">
                                            <Check2Square width="50px" height="30px" /> 숙소상세관리
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                            <div className="container">

                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="#">Hotel</a></li>
                                    <li className="breadcrumb-item active" aria-current="page">{data.dto[0].ho_name}의 상세 정보</li>
                                </ol>

                                <div className="card" style={{width: "300rem"}}>
                                    <div className="row">
                                        <div className="col-6" style={{textAlign:'center', alignContent:'center'}}>
                                            <div className="mb-20" dangerouslySetInnerHTML={{__html : profile_url}}></div>
                                            <h2 className="mb-10">{data.dto.h_name}</h2>
                                            <h6>{level}</h6>
                                        </div>
                                        <div className="col-6">
                                            <div>후기</div>
                                            <br />
                                            <hr />
                                            <div>평점</div>
                                            <br />
                                            <hr />
                                            <div>호스팅 경력</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card-style mb-30">
                                    <h3><BuildingFill size={35} /> 호텔 상세</h3>
                                    <table className="tbl">
                                        <thead></thead>
                                        <tbody>
                                            <tr>
                                                <th colSpan={2}>호텔 대표 이미지</th>
                                                <td colSpan={2}>
                                                    [이미지] <a href="#" style={{border: "0px", outline: "none"}} onClick={urlHandle}> {data.dto[0].ho_img}</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th colSpan={2}>호텔 등급</th>
                                                <td colSpan={2}>{data.dto[0].ho_level}</td>
                                            </tr>
                                            <tr>
                                                <th colSpan={2}>객실유형</th>
                                                <td>
                                                    <table>
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
                                                <th colSpan={2}>주소</th>
                                                <td>{data.dto[0].ho_address}</td>
                                            </tr>
                                            <tr>
                                                <th colSpan={2}>체크인</th>
                                                <td>{data.dto[0].ho_check_in}</td>
                                                <th colSpan={2}>체크아웃</th>
                                                <td>{data.dto[0].ho_check_out}</td>
                                            </tr>
                                            <tr>
                                                <th colSpan={2}>편의시설</th>

                                            </tr>
                                            <tr>
                                                <th colSpan={2}>소개</th>
                                                <td>{data.dto[0].ho_description}</td>
                                            </tr>
                                            <tr>
                                                <th colSpan={2}>영업상태</th>
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

                                    <div className="card-style mb-30">
                                        <h3><PersonVcard size={35} /> 호스트 정보</h3><br/>
                                        <table className="tbl">
                                            <tbody>
                                                <tr>
                                                    <th colSpan={2}>신분증</th>
                                                    <div className="mb-20">
                                                        <img src={profile_src} width='70px' height='70px'/>
                                                    </div>
                                                </tr>
                                                <tr>
                                                    <th colSpan={2}>사업자등록번호</th>
                                                    <td><input style={{border: 'none'}} ref={h_business} defaultValue={data1.h_business}/></td>
                                                </tr>
                                                <tr>
                                                    <th colSpan={2}>전화번호</th>
                                                    <td><input style={{border: 'none'}} ref={h_phone} defaultValue={data1.h_phone}/></td>
                                                </tr>
                                                <tr>
                                                    <th colSpan={2}>이메일</th>
                                                    <td><input style={{border: 'none'}} ref={h_email} defaultValue={data.dto[0].h_email}/></td>
                                                </tr>
                                                <tr>
                                                    <th colSpan={2}>호스팅 경력</th>
                                                    <td><input style={{border: 'none'}} ref={h_level} defaultValue={data.dto[0].h_level}/></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
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
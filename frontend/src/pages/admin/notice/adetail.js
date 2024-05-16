import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
//import anotice from './img/Nimg/anotice.png';
import '../css/astyles.css';

function Adetail() {
    const { n_idx } = useParams();
    const [notice, setNotice] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`http://localhost/notice/detail/${n_idx}`) // 스프링 부트 애플리케이션의 포트 번호를 적절히 변경하세요.
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to load notice details.');
                }
                return response.json();
            })
            .then(data => {
                setNotice(data);  // 수정된 부분: data.dto가 아닌 data를 설정합니다.
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching notice details:', error);
                setError('Failed to load notice details. Please try again later.');
                setLoading(false);
            });
    }, [n_idx]);

    if (loading) {
        return <div className="container mt-5">Loading...</div>;
    }

    if (error) {
        return <div className="container mt-5">Error: {error}</div>;
    }

    return (
      <div className="row justify-content-center"> 
      <div className="col-md-8">
      <div className="card mb-3">
        <div className="card-body">
          <h2 className="card-title">{notice.n_file}</h2>
          {/* <img src={anotice} alt="Notice Image" className="img-fluid" /> */}
          <p className="card-text"><small className="text-muted">작성자: {notice.n_writer}</small></p>
          <p className="card-text"><small className="text-muted">작성일: {notice.n_date}</small></p>
          <p className="card-text"><small className="text-muted">내용: {notice.n_content}</small></p>
        </div>
      </div>
      <Link to="/notice" className="btn btn-primary">목록</Link>
    </div></div>
    );
}

export default Adetail;
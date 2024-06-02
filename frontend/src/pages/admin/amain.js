import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import MemoList from './memolist';
import HotelChart from './chart';
import Sidebar from './sidebar';

function Amain() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 col-lg-2">
          <Sidebar />
        </div>
        <main className="col-md-9 col-lg-10 ms-sm-auto px-md-4">
        <div className="card-style mb-30">
          <br />
          <div className="row mb-4">
            <div className="col-lg-8">
              <div className="card rounded-3">
                <div className="card-header" style={{ backgroundColor: '#4e817269', fontWeight: 'bold' }}>
                  호텔 월 매출 통계
                </div>
                <div className="card-body">
                  <HotelChart />
                </div>
              </div>
            </div>
            <div className="col-lg-4">
                <div className="card-body">
                  <MemoList />
                </div>
              </div>
            </div>
          <br /><br /><br /><br /><br />
          <br /><br /><br /><br />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Amain;
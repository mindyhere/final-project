import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router";

import Cookies from "universal-cookie";

function BriefOrders() {
  const navigate = useNavigate();
  const [list, setReviewList] = useState([]);
  const searchKey = useRef();
  const search = useRef();

  // function count() {
  // }

  // useEffect(()=>{("");}, []);

  return (
    <>
      <div className="row card-style">
        <div className="col-6">차트표시</div>
        <div className="col-6">요약</div>
      </div>
      <div className="card-style mb-30">테스트</div>
    </>
  );
}

export default function Orders() {
  return <BriefOrders />;
}

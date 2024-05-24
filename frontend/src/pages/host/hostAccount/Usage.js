import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router";

import SalesChart from "./SalesChart";

import Cookies from "universal-cookie";
import { type } from "@testing-library/user-event/dist/type";

function useFetch(url, e) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log("=> 라벨? " + JSON.stringify(data) + ", " + data.length);
        let arr = [];
        if (e == "labels" && data != null) {
          for (let i = 0; i < data.length; i++) {
            arr.push(Object.values(data[i])[1]);
          }
        } else if (e == "sales" && data != null) {
          for (let i = 0; i < data.length; i++) {
            console.log(Object.values(data[i])[2]);
          }
        }
        setData(arr);
        setLoading(false);
      });
  }, []);
  return [data, loading];
}

function Usage() {
  const cookies = new Cookies();
  const userInfo = cookies.get("userInfo");
  const userIdx = userInfo.h_idx;
  const navigate = useNavigate();
  const [labels, loading1] = useFetch(
    `http://localhost/api/chart/labels/${userIdx}`,
    "labels"
  );
  const [sales, loading2] = useFetch(
    `http://localhost/api/chart/sales/${userIdx}`,
    "sales"
  );

  const dataset = (sales) => {
    let arr = [];
    for (let i = 0; i < sales.length; i++) {
      let hotel = sales[i][1];
      console.log("==>? " + hotel);
    }
  };

  if (loading1 || loading2) {
    return <div className="text-center">로딩 중...</div>;
  } else {
    // dataset()
    console.log("!!!" + sales.length);
    return (
      <>
        <div className="row mt-0 mb-2" style={{ backgroundColor: "peachpuff" }}>
          <div className="col-9">
            <div style={{ width: 900, height: 400 }}>
              <SalesChart labels={labels} sales={sales} />
            </div>
          </div>
          <div className="col-3">요약</div>
        </div>
        <div className="card-style mb-30">테스트</div>
      </>
    );
  }
}

export default Usage;

import React, { useRef, useEffect, useState } from "react";
import { Calendar2Week } from "react-bootstrap-icons";
import { useNavigate } from "react-router";

import Cookies from "universal-cookie";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log("===> data? " + JSON.stringify(data));
        setData(data);
        setLoading(false);
      });
  }, []);
  return [data, loading];
}

function ManageOrders() {
  const cookies = new Cookies();
  const userInfo = cookies.get("userInfo");
  const userIdx = userInfo.h_idx;
  const userEmail = userInfo.h_email;
  const userName = userInfo.h_name;
  const level = userInfo.h_level;
  const [list, setOrders] = useState([]);
  const [hotels, setHotels] = useState([]);
  const ho_idx = useRef();
  const navigate = useNavigate();

  const [data, loading] = useFetch(
    `http://localhost/api/order/manage/list/${userIdx}`
  );

  const rendering = (hotels) => {
    let name = "";
    let hoIdx = "";
    const result = [];
    for (let i = 0; i < hotels.length; i++) {
      name = hotels[i].ho_name;
      hoIdx = hotels[i].ho_idx;
      // console.log(i + " : " + hotels[i].ho_name + ", " + hotels[i].ho_idx);
      if ((i = 0)) {
        result.push(
          <li key={"nav-item-" + i} className="nav-item">
            <a key={"nav-link-" + i} className="nav-link active">
              name
            </a>
            <input type="hidden" defaultValue={hoIdx} ref={ho_idx} />
          </li>
        );
      } else {
        result.push(
          <li key={"nav-item-" + i} className="nav-item" onClick={""}>
            <a key={"nav-link-" + i} className="nav-link">
              name
            </a>
            <input type="hidden" defaultValue={hoIdx} ref={ho_idx} />
          </li>
        );
      }
    }
    console.log("==>? " + result);
    return result;
  };

  if (loading) {
    return <div>loading...</div>;
  } else {
    setOrders(data.list);
    setHotels(data.hotels);

    return (
      <>
        <div className="container min-vh-100">
          <div className="card-style mb-30">
            <h3 className="text-bold">
              <Calendar2Week size={35} />
              &nbsp;예약 목록
            </h3>
            <br />
            <div className="card text-center">
              <div
                className="card-header"
                style={{ backgroundColor: "#F7EFFC" }}
              >
                <ul className="nav nav-tabs card-header-tabs">
                  {/* <li className="nav-item" onClick={""}>
                    <a className="nav-link active">Active</a>
                  </li> */}
                  {rendering(hotels)}
                </ul>
              </div>
              <div className="card-body">
                <h5 className="card-title">Special title treatment</h5>
                <p className="card-text">
                  With supporting text below as a natural lead-in to additional
                  content.
                </p>
                <a href="#" className="btn btn-primary">
                  Go somewhere
                </a>
              </div>
            </div>
          </div>
          <div className="card-style mb-30">이용통계</div>
        </div>
      </>
    );
  }
}

export default ManageOrders;

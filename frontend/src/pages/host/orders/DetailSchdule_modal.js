import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import Cookies from "universal-cookie";

import { Calendar2Check } from "react-bootstrap-icons";
import moment from "moment";
import "moment/locale/ko";

function useFetch(url, column, date) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const form = new FormData();
  form.append("column", column);
  form.append("date", date);
  useEffect(() => {
    fetch(url, { method: "post", body: form })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data != null) {
          console.log("===> data? " + JSON.stringify(data));
          setData(data);
        }
        setLoading(false);
      });
  }, []);
  return [data, loading];
}

function DetailSchedule(column, date) {
  const cookies = new Cookies();
  const userInfo = cookies.get("userInfo");
  const userIdx = userInfo.h_idx;
  const [ckinData, loading1] = useFetch(
    `http://localhost/api/order/manage/schedule/detail/${userIdx}`, column, date);
//   const [ckoutData, loading2] = useFetch(
//     `http://localhost/api/order/manage/schedule/${userIdx}?column=o_ckout&date=${date}`
//   );
  if (loading1) {
    return <div>loading...</div>;
  } else {
    return (
      <>
        <div className="modal_container" style={{ paddingTop: "15px" }}>
          <h3 className="text-bold mb-30">
            <Calendar2Check size={35} />
            &nbsp;DETAIL
          </h3>
          <hr />
          <div className="card-style mb-3" style={{ maxHeight: "300px" }}></div>
        </div>
      </>
    );
  }
}
export default DetailSchedule;

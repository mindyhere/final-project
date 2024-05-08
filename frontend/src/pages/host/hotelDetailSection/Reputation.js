import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import Cookies from "universal-cookie";

import ReviewItem from "../../../component/ReviewItem";
import { StarFill } from "react-bootstrap-icons";

function Reputation() {
  const { HoIdx } = useParams();
  const [list, setReviews] = useState([]);
  // const [modal, setModal] = useState(false);
  // const navigate = useNavigate();
  const [avg, setAvg] = useState("");

  // const cookies = new Cookies();
  // //게스트 쿠키
  // const g_idx = cookies.get("g_idx");
  // const g_email = cookies.get("g_email"); //쿠키변수명
  // //호스트 쿠키
  // const userInfo = cookies.get("userInfo");

  function getReviews(url) {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("==> 리뷰 data? " + data);
        setReviews(data.list);
        setAvg(data.avg);
      });
  }

  useEffect(() => {
    getReviews(`http://localhost/api/reputation/list/${HoIdx}`);
  }, []);

  if (avg == null) {
    console.log("==> avg null?" + (avg == null));
    return (
      <>
        <div className="container mb-30">
          <h2>후기 미등록</h2>
          <p>아직 등록된 후기가 없습니다.</p>
        </div>
      </>
    );
  } else {
    console.log("==> " + avg);
    return (
      <>
        <div className="col mb-30" >
          <div className="row">
            <hr2>
              <StarFill/> {avg} | 후기 {list.length}개
            </hr2>
          </div>
          <div
            className="row"
            style={{
              display: "grid",
              gridTemplateRows: "1fr",
              gridTemplateColumns: "1fr 1fr",
            }}
          >
            {list.map(
              ({
                rv_idx,
                g_name,
                g_url,
                l_name,
                g_email,
                rv_content,
                rv_date,
                rv_star,
              }) => (
                <ReviewItem
                  rv_idx={rv_idx}
                  g_name={g_name}
                  g_url={g_url}
                  l_name={l_name}
                  g_email={g_email}
                  rv_content={rv_content}
                  rv_date={rv_date}
                  rv_star={rv_star}
                  key={rv_idx}
                />
              )
            )}
          </div>
        </div>
      </>
    );
  }
}

export default Reputation;

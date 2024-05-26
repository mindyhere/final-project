import React, { useRef, useState, useEffect } from "react";

import Cookies from "universal-cookie";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { StarFill } from "react-bootstrap-icons";

function StarItem({ ho_name, avg }) {
  return (
    <div className="row" style={{ float: "left" }}>
      <h3>
        {ho_name}&nbsp;|&nbsp;
        <StarFill color="#FCD53F" style={{ margin: "0 1px 2% 0" }} />
        &nbsp;
        {avg}
      </h3>
    </div>
  );
}

function Summary() {
  const cookies = new Cookies();
  const userInfo = cookies.get("userInfo");
  const userIdx = userInfo.h_idx;
  const [totReviews, setTotalCount] = useState("");
  const [noReply, setReplyCount] = useState("");
  const [stars, setAvgStars] = useState([]);
  const [pendings, setPendingCount] = useState("");

  function getData(url) {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("==> 리뷰 data? " + JSON.stringify(data.pendings));
        setTotalCount(data.totReviews);
        setReplyCount(data.noReply);
        setAvgStars(data.stars);
        setPendingCount(data.pendings);
      });
  }

  useEffect(() => {
    getData(`http://localhost/api/chart/summary/${userIdx}`);
  }, []);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const slick = useRef(null);
  return (
    <>
      <div className="card-style mb-30">
        <Slider {...settings} ref={slick}>
          {stars.map((item, ho_idx) => (
            <StarItem key={ho_idx} ho_name={item.ho_name} avg={item.avg} />
          ))}
        </Slider>
      </div>
      <div className="card-style mb-30">
        <div className="row" style={{ float: "left" }}>
          <h3>
            예약대기&nbsp;|&nbsp; 총 &nbsp;
            {pendings}건
          </h3>
        </div>
      </div>
      <div className="card-style mb-30">
        <div className="row" style={{ float: "left" }}>
          <h3>
            답글 미등록 {noReply}건<br /> /&nbsp;전체 리뷰 {totReviews} 건
          </h3>
        </div>
      </div>
    </>
  );
}

export default Summary;

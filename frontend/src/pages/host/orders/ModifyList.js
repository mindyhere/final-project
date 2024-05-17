import React, { useRef, useCallback, useEffect, useState } from "react";

import Slider from "react-slick";
import Cookies from "universal-cookie";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Calendar2Week, CaretLeft, CaretRight, Exclamation } from "react-bootstrap-icons";

import RequestItem from "./RequestItem";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("==> Fetch? " + data);
        setData(data);
        setLoading(false);
      });
  }, []);
  return [data, loading];
}

function ModifyList() {
  const cookies = new Cookies();
  const userInfo = cookies.get("userInfo");
  const userIdx = userInfo.h_idx;
  const userEmail = userInfo.h_email;
  const userName = userInfo.h_name;
  const [data, loading] = useFetch(
    `http://localhost/api/order/manage/modify/list?userIdx=${userIdx}`
  );

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <CaretRight />, // 화살표 버튼을 커스텀해서 사용
    prevArrow: <CaretLeft />,
    // arrows:flase
  };

  const slick = useRef(null);
  const previous = useCallback(() => slick.current.slickPrev(), []);
  const next = useCallback(() => slick.current.slickNext(), []);

  if (loading) {
    return <div className="text-center">로딩 중...</div>;
  } else {
    return (
      <div>
        <h5 style={{alignItems:"center"}}><Exclamation size={35}/>변경요청</h5>
        <Slider {...settings} ref={slick}>
          {data.map((item) => (
            <RequestItem
              key={item.o_idx}
              o_idx={item.o_idx}
              g_idx={item.g_idx}
              ho_idx={item.ho_idx}
              ho_name={item.ho_name}
              d_idx={item.d_idx}
              d_room_type={item.d_room_type}
              o_ckin={item.o_ckin}
              o_ckout={item.o_ckout}
              ru_startDate={item.ru_startDate}
              ru_endDate={item.ru_endDate}
              o_adult={item.o_adult}
              o_child={item.o_child}
              o_baby={item.o_baby}
              ru_adult={item.ru_adult}
              ru_child={item.ru_child}
              ru_baby={item.ru_baby}
              bfsum={item.bfsum}
              sum={item.sum}
              g_email={item.g_email}
              g_name={item.g_name}
              g_url={item.g_url}
            />
          ))}
        </Slider>
      </div>
    );
  }
}
export default ModifyList;

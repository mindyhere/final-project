import React, { useState, useEffect } from "react";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import "../../../asset/css/reactcalendar.css";
import { CircleFill, TriangleFill } from "react-bootstrap-icons";

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
        //console.log("==> Fetch? " +JSON.stringify(data)+"/ "+data.toString());
        let result = data.toString();
        
        let arr=[]
        for(let i=0; i<data.length; i++){
          //console.log('result:'+JSON.stringify(data[i].o_ckout))
          arr.push(JSON.stringify(data[i].o_ckout));
        }
        console.log(arr[0]);


        // result=arr.filter(("o_ckin"))
        setData(data);
        setLoading(false);
      });
  }, []);
  return [data, loading];
}

function Scheduler() {
  const cookies = new Cookies();
  const userInfo = cookies.get("userInfo");
  const userIdx = userInfo.h_idx;
  const [value, onChange] = useState(new Date());
  // let loading;
  // const [data, loading] = useFetch( `http://localhost/api/order/manage/schedule/${userIdx}` );
  const [ckin, loading1] = useFetch(
    `http://localhost/api/order/manage/schedule/${userIdx}?column=o_ckin`
  );
  const [ckout, loading2] = useFetch(
    `http://localhost/api/order/manage/schedule/${userIdx}?column=o_ckout`
  );

  const [date, setDate] = useState(value);
  console.log("==> x? " + moment(value).format("YYYY-MM-DD"));

  // function getSchedule(url) {
  //   // let url = `http://localhost/api/order/manage/schedule/${userIdx}`;
  //   fetch(url)
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       if (data.count != null) {
  //         setCheckin(data.ckin);
  //         setCheckout(data.ckout);
  //       }
  //       console.log("==> data: " + JSON.stringify(data));
  //     });
  // }

  // useEffect(() => {
  //   getSchedule(`http://localhost/api/order/manage/schedule/${userIdx}`);
  // });

  // const ckin = [
  //   "2024-05-01",
  //   "2024-05-02",
  //   "2024-05-08",
  //   "2024-05-15",
  //   "2024-05-24",
  //   "2024-05-28",
  //   "2024-06-01",
  //   "2024-06-02",
  //   "2024-06-18",
  //   "2024-06-15",
  //   "2024-06-24",
  //   "2024-06-30",
  // ]; // test
  // const ckout = [
  //   "2024-05-03",
  //   "2024-05-05",
  //   "2024-05-08",
  //   "2024-05-15",
  //   "2024-05-27",
  //   "2024-05-29",
  //   "2024-06-02",
  //   "2024-06-09",
  //   "2024-06-19",
  //   "2024-06-15",
  //   "2024-06-24",
  //   "2024-06-30",
  // ]; // test

  if (loading1 || loading2) {
    return <div className="text-center">로딩 중...</div>;
  } else {
    // console.log("==> 111체크인? " + ckin);
    // console.log("==> 222체크아웃? " + ckout);
    return (
      <div>
        <Calendar
          formatDay={(local, date) => moment(date).format("D")} // '-일'제거
          formatYear={(local, date) => moment(date).format("YYYY")}
          formatMonthYear={(local, date) => moment(date).format("YYYY. MM")}
          calendarType="gregory" // 일요일 부터 시작
          next2Label={null} // +1년 & +10년 이동 버튼 숨기기
          prev2Label={null} // -1년 & -10년 이동 버튼 숨기기
          minDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
          maxDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
          navigationLabel={null}
          onChange={onChange}
          value={value}
          // tileClassName={({ date, view }) => {
          //   if (
          //     // ckin.find((x) => x === moment(date).format("YYYY-MM-DD")) &&
          //     // ckout.find((x) => x === moment(date).format("YYYY-MM-DD"))
          //   ) {
          //     console.log("==> x? " + value);
          //     return "highlight"; // 하이라이트 처리
          //   }
          // }}
          // tileContent={({ date, view }) => {
          //   let html = [];
          // if (ckin.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
          //   console.log("==> x? " + value);
          //   html.push(
          //     <CircleFill style={{ padding: 0, width: "7px", height: "7px" }} />
          //   );
          // }
          // if (ckout.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
          //   console.log("==> x? " + value);
          //   html.push(
          //     <TriangleFill
          //       style={{
          //         padding: 0,
          //         width: "7px",
          //         height: "7px",
          //         marginLeft: "4px",
          //       }}
          //     />
          //   );
          // }
          //   return (
          //     <>
          //       <div className="col-12 px-1 m-0" style={{ height: "16px" }}>
          //         {html}
          //       </div>
          //     </>
          //   );
          // }}
        />
      </div>
    );
  }
}
export default Scheduler;

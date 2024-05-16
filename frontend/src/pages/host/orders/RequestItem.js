import React from "react";

function RequestItem({
  idx,
  o_idx,
  g_idx,
  ho_idx,
  ho_name,
  d_idx,
  d_room_type,
  o_ckin,
  o_ckout,
  ru_startDate,
  ru_endDate,
  o_adult,
  o_child,
  o_baby,
  ru_adult,
  ru_child,
  ru_baby,
  bfsum,
  sum,
  g_email,
  g_name,
  g_url,
}) {
  let loading = false;

  if (loading) {
    return <div>로딩 중...</div>;
  } else {
    let profile_src = "";
    if (g_url !== "-") {
      const img_url = `http://localhost/static/images/guest/profile/${g_url}`;
      profile_src = `<img class='profile-img' src=${img_url} width='60px' height='60px' style={{background-size:"contain" }} />`;
    } else {
      profile_src =
        "<img class='profile-img' src='http://localhost/static/images/no-image.png' width='50px' height='50px'/>";
    }
    return (
      <div
        className="container m-0"
        style={{ width: "770px", height: "205px" }}
      >
        <table className="tbl" style={{ margin: "0" }}>
          <colgroup>
            <col width={"20%"} />
            <col width={"40%"} />
            <col width={"40%"} />
          </colgroup>
          <tbody>
            <tr>
              <th>고객정보</th>
              <td colSpan={2}>
                <div className="row m-0" style={{
                      paddingRight: "3%"}}>
                  <div
                    className="col-2  my-auto"
                    style={{
                      width: "80px",
                      display: "inline",
                      float: "left",
                    }}
                    dangerouslySetInnerHTML={{ __html: profile_src }}
                  ></div>
                  <div
                    className="col my-auto"
                    style={{
                      height: "60px",
                      display: "inline",
                    }}
                  >
                    이름: {g_name}
                    <br />
                    이메일: {g_email}
                  </div>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <div
                    className="col-2 py-3"
                    style={{
                      height: "60px",
                      display: "inline",
                    }}
                  >
                    <button className="btnCheck active">CONFIRM</button>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th rowSpan={2}>
                {ho_name}
                <br />
                {d_room_type} 예약
              </th>
              <th>기존 예약</th>
              <th style={{ color: "#6f48eb" }}>변경 요청</th>
            </tr>
            <tr>
              <td>
                {o_ckin} ~ {o_ckout}
                <br />총 <b>{bfsum}</b>인 : 성인({o_adult}) , 어린이(
                {o_child}), 유아(
                {o_baby})
              </td>
              <td>
                {ru_startDate} ~ {ru_endDate}
                <br />총 <b>{sum}</b>인 : 성인({ru_adult}) , 어린이(
                {ru_child}), 유아(
                {ru_baby})
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
export default RequestItem;

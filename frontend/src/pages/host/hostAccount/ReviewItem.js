import React, { useEffect, useState, useRef } from "react";

function ReviewItem({
  rv_idx,
  ho_name,
  g_name,
  g_email,
  rv_content,
  rv_date,
  rv_star,
  o_idx,
}) {
  let loading = false;
  const idx = useRef();
  // const g_email = useRef();
  // const rendering = (i) => {
  //   const star = "⭐";
  //   const result = [];
  //   for (let j = 0; j < i; j++) {
  //     result.push(<span key={j}>{star}</span>);
  //   }
  //   return result;
  // };

  return (
    <>
      <tr className="align-middle">
        <th scope="row">
          {ho_name}
          <input type="hidden" defaultValue={rv_idx} ref={idx} />
        </th>
        {/* <td>{ho_name}</td>
      <td>
        {g_name}
        <input type="hidden" defaultValue={email} ref={g_email} readOnly />
      </td>
      <td>{rv_date}</td>
      <td>{rv_star}</td>
      <td>{rp_idx == null ? "미등록" : "등록완료"}</td> */}
      </tr>
    </>
  );
}
export default ReviewItem;

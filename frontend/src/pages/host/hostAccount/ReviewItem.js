import React, { useEffect, useState, useRef } from "react";

function ReviewItem({ idx, ho_name, g_name, email, g_url, rv_date, rv_star }) {
  const rv_idx = useRef();
  const g_email = useRef();
  const rendering = (i) => {
    const star = "⭐";
    const result = [];
    for (let j = 0; j < i; j++) {
      result.push(<span key={j}>{star}</span>);
    }
    return result;
  };

  return (
    <tr className="align-middle">
      <th scope="row">
        {i}
        <input type="hidden" defaultValue={idx} ref={rv_idx} readOnly />
      </th>
      <td>{ho_name}</td>
      <td>
        {g_name}
        <input type="hidden" defaultValue={email} ref={g_email} readOnly />
      </td>
      <td>{rv_date}</td>
      <td>{rv_star}</td>
      {/* <td>{rp_idx == null ? "미등록" : "등록완료"}</td> */}
    </tr>
  );
}
export default ReviewItem;

import React, { useEffect, useState, useRef } from "react";

function ReviewItem({
  rv_idx,
  ho_name,
  g_name,
  g_email,
  rv_date,
  rv_star,
  o_idx,
  rp_idx,
}) {
  let loading = false;
  const guest_email = useRef();
  const reply_idx = useRef();
  const rendering = (i) => {
    const star = "⭐";
    const result = [];
    for (let j = 0; j < i; j++) {
      result.push(<span key={j}>{star}</span>);
    }
    return result;
  };

  return (
    <>
      <tr className="align-middle">
        <th>{rv_idx}</th>
        <td>{ho_name}</td>
        <td>
          {g_name}
          <input
            type="hidden"
            defaultValue={g_email}
            ref={guest_email}
          />
        </td>
        <td>{o_idx}</td>
        <td>{rv_date}</td>
        <td>{rendering(rv_star)}</td>
        <td>
          <input type="hidden" defaultValue={rp_idx} ref={reply_idx} />
          {rp_idx == 0 ? (
            <button className="btnCheck active">
              &nbsp;&nbsp;미등록&nbsp;&nbsp;
            </button>
          ) : (
            <button className="btnCheck disabled">등록완료</button>
          )}
        </td>
      </tr>
    </>
  );
}
export default ReviewItem;

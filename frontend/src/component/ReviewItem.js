import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import { StarFill } from "react-bootstrap-icons";

// import Swal from "sweetalert2";
// import "../host1.css";

function ReviewItem({
  rv_idx,
  g_name,
  g_url,
  l_name,
  g_email,
  rv_content,
  rv_date,
  rv_star,
}) {
  let loading = false;

  const url = `http://localhost/static/images/guest/profile/${g_url}`;

  const rendering = (i) => {
    const star = "⭐";
    const result = [];
    for (let j = 0; j < i; j++) {
      result.push(<span key={j}>{star}</span>);
    }
    return result;
  };

  if (loading) {
    return <div>loading...</div>;
  } else {
    let profile_src = "";
    if (g_url !== "-") {
      profile_src = `<img class='profile-img' src=${url} width='60px' height='60px' style={{backgroundSize:"contain";}} />`;
    } else {
      profile_src =
        "<img class='profile-img' src='http://localhost/static/images/no-image.png' width='50px' height='50px'/>";
    }

    return (
      <div style={{ backgroundColor: "#f6f2f9d8" }}>
        <div className="card-style">
          <div className="row mb-20">
            <div className="col-3">
              <span dangerouslySetInnerHTML={{ __html: profile_src }}></span>
            </div>
            <div className="col-9" style={{ paddingLeft: "5%" }}>
              <strong>{g_name}</strong>
              <input type="hidden" defaultValue={rv_idx} />
              <input type="hidden" defaultValue={g_email} />
              <br />
              {l_name}
            </div>
          </div>
          <div className="row" >
            <span style={{display:"inline"}}>
              {rendering(rv_star)} {rv_star}&nbsp;&nbsp;|&nbsp;&nbsp;{rv_date}
            </span>{" "}
          </div>
          <div className="row text-ellipsis" style={{padding:"4%"}}>{rv_content}</div>
          {rv_content.length > 20 ? <Link to="#">더보기</Link> : <br />}
        </div>
        <br />
        &nbsp;
      </div>
    );
  }
}

export default ReviewItem;

import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

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

  if (loading) {
    return <div>loading...</div>;
  } else {
    let profile_src = "";
    if (g_url !== "-") {
      profile_src = `<img src=${url} width="100px" style={{backgroundSize:"contain";}} />`;
    } else {
      profile_src =
        "<img src='http://localhost/static/images/no-image.png' width='50px'/>";
    }

    return (
      <div style={{ backgroundColor: "#f6f2f9d8" }}>
        <div className="card-style">
          <div className="row mb-20">
            <div className="col-3">
              <span dangerouslySetInnerHTML={{ __html: profile_src }}></span>
            </div>
            <div className="col-9">
              {g_name}
              <input type="hidden" defaultValue={rv_idx} />
              <input type="hidden" defaultValue={g_email} />
              <br />
              {l_name}
            </div>
          </div>
          <div className="row mb-10">
            {rv_star} | {rv_date}
          </div>
          <div className="row mb-10">
            {rv_content}
          </div>
          <Link to="#">더보기</Link>
        </div>
        <br />
        &nbsp;
      </div>
    );
  }
}
export default ReviewItem;

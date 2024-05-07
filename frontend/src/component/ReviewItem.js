import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

function ReviewItem({ data }) {
  let loading = false;
  const url = `http://localhost/static/images/guest/profile/${g_url}`;

  const navigate = useNavigate();

  if (loading) {
    return <div>loading...</div>;
  } else {
    let profile_src = "";
    if (data.g_url !== "-") {
      profile_src = `<img src=${url} width="100px" style={{backgroundSize:"contain";}} />`;
    } else {
      profile_src =
        "<img src='http://localhost/static/images/no-image.png' width='20%'/>";
    }

    return (
      <div className="card-style col-6 mb-20">
        <div>
          <div className="col-2">
            <span dangerouslySetInnerHTML={{ __html: profile_src }}></span>
          </div>
          <div className="col-10">
            이름
            <br />
            레벨
          </div>
        </div>
        <div>별점</div>
        <div>내용</div>
        <Link to="#">더보기</Link>
        <br />
        &nbsp;
      </div>
    );
  }
}
export default ReviewItem;

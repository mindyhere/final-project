import React, { useRef, useState, useEffect } from "react";
import { Star, StarFill } from "react-bootstrap-icons";

const rendering = (i) => {
  const star = "⭐";
  const result = [];
  for (let j = 0; j < i; j++) {
    result.push(<span key={j}>{star}</span>);
  }
  return result;
};

function StarRate({ rate, handleStarRating }) {
  // let value = Object.values(rate)[0];
  const [star, setStar] = useState(rate);
  // console.log("=> StarRate? " + rate + ", " + JSON.stringify(star));
  return (
    <span>
      {[...Array(star)].map((a, i) => (
        <StarFill
          size={20}
          color="#FCD53F"
          style={{ margin: "0 1px 2% 0" }}
          key={i}
          onClick={() => {
            setStar(i + 1);
            handleStarRating(i + 1);
          }}
        />
      ))}
      {[...Array(5 - star)].map((a, i) => (
        <Star
          size={20}
          color="grey"
          style={{ margin: "0 1px 2% 0" }}
          key={i}
          onClick={() => {
            setStar(star + i + 1);
            handleStarRating(star + i + 1);
          }}
        />
      ))}
      <input type="hidden" value={star} />
    </span>
  );
}

export default StarRate;

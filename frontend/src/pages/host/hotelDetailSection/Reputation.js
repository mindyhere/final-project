import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("===> data? " + JSON.stringify(data));
        setData(data);
        setLoading(false);
      });
  }, []);
  return [data, loading];
}

function ListReputation() {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const [list, setReviewList] = useState([]);
  const searchKey = useRef();
  const search = useRef();

  // function getList(url) {
  // }

  // useEffect(()=>{("");}, []);

  return (
    <>
      <div className="container card-style mb-30">
        <div className="col-2"><hr2>평점</hr2></div>
        <div className="col-10">
          <div className="col-6"></div>
          <div className="col-6"></div>
        </div>
      </div>
      <div>
        <WriteReview />
      </div>
    </>
  );
}

export default ListReputation;

// export default function Reputation() {
//   return <ListReputation />;
// }

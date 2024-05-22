import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);
  return [data, loading];
}

function RoomDetail(props) {
  const [data, loading] = useFetch('');
  const [rdo, setRadio] = useState(props.smoking);
  const d_capacity = useRef();
  const d_area = useRef();
  const d_beds = useRef();
  const d_non_smoking = useRef();
  const d_price = useRef();
  const d_img1 = useRef();
  const d_img2 = useRef();
  const d_img3 = useRef();

  function handleStatusChange(e) {
    setRadio(e.target.value);
  }

  if (loading) {
    return <div>loading...</div>;
  } else {
    let smoking = "";
    if (props.smoking == 'Y') {
      smoking = "금연실";
    } else {
      smoking = "흡연 가능";
    } 

    let src1='';
    let image1='';
    if (props.img1 == '-') {
      src1='/img/image_no.png';
      image1=`<img src=${src1} width='90px' height='90px' style={{backgroundSize:"contain";}}/>`;
    } else {
      src1=`http://localhost/static/images/host/hotel/${props.img1}`;
      image1=`<img src=${src1} width='90px' height='90px' style={{backgroundSize:"contain";}}/>`;
    }


    let src2='';
    let image2='';
    if (props.img2 == '-') {
      src2='/img/image_no.png';
      image2=`<img src=${src2} width='90px' height='90px' style={{backgroundSize:"contain";}}/>`;
    } else {
      src2=`http://localhost/static/images/host/hotel/${props.img2}`;
      image2=`<img src=${src2} width='90px' height='90px' style={{backgroundSize:"contain";}}/>`;
    }

    let src3='';
    let image3='';
    if (props.img3 == '-') {
      src3='/img/image_no.png';
      image3=`<img src=${src3} width='90px' height='90px' style={{backgroundSize:"contain";}}/>`;
    } else {
      src3=`http://localhost/static/images/host/hotel/${props.img3}`;
      image3=`<img src=${src3} width='90px' height='90px' style={{backgroundSize:"contain";}}/>`;
    }
    return (
      <>
        <div className="modal_container" style={{ paddingTop: "15px" }}>
          <h3 className="text-bold mb-30">
            &nbsp;{props.roomType}
          </h3>
          <hr />
          <div className="card-style mb-20">
            <div className="row mb-20">
              <div className="col" dangerouslySetInnerHTML={{ __html: image1 }}></div>
              <div className="col"  dangerouslySetInnerHTML={{ __html: image2 }}></div>
              <div className="col"  dangerouslySetInnerHTML={{ __html: image3 }}></div>
            </div>
          </div>
          <div className="card-style mb-30">
            <div style={{ textAlign: "left" }}>
              <table className="tbl">
                <colgroup>
                  <col width={"20%"} />
                  <col width={"30%"} />
                  <col width={"20%"} />
                  <col width={"30%"} />
                </colgroup>
                <tbody>
                  <tr>
                    <th colSpan={1}>수용 인원</th>
                    <td colSpan={1}>
                      <input type="number" min={0} style={{border:'none'}} ref={d_capacity} defaultValue={props.capacity} />
                    </td>
                    <th colSpan={1} style={{ width: "25%" }}>
                      객실 면적
                    </th>
                    <td colSpan={1}>
                      <input type="number" min={0} style={{border:'none'}} ref={d_area} defaultValue={props.area} />
                    </td>
                  </tr>
                  <tr>
                    <th colSpan={1}>침대 수</th>
                    <td colSpan={1}>
                      <input type="number" min={0} style={{border:'none'}} ref={d_beds} defaultValue={props.beds} />
                    </td>
                    <th colSpan={1} style={{ width: "25%" }}>금연실 여부</th>
                    <td colSpan={1}>
                      <div>
                      <input
                          className="form-check-input"
                          type="radio"
                          //name="d_non_smoking"
                          ref={d_non_smoking}
                          value="Y"
                          checked={rdo == "Y"}
                          onChange={handleStatusChange}
                          id="rdo1"
                        />
                        <label className="form-check-label" htmlFor="rdo1">
                          Y
                        </label>
                        &nbsp;&nbsp;
                        <input
                          className="form-check-input"
                          type="radio"
                          ref={d_non_smoking}
                          value="N"
                          checked={rdo == "N"}
                          onChange={handleStatusChange}
                          id="rdo1"
                        />
                        <label className="form-check-label" htmlFor="rdo1">
                          N
                        </label>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th colSpan={1}>가격</th>
                    <td colSpan={3}>
                      <input type="number" min={0} style={{border:'none'}} ref={d_price} defaultValue={props.price} />
                    </td>
                  </tr>
                  <tr>
                    <th colSpan={1}>객실 사진_1</th>
                    <td colSpan={3}>
                      <input
                        className="form-control"
                        type="file"
                        //multiple = "multiple"
                        ref={d_img1}
                        accept=".jpg,.jpeg,.png,"
                      />
                    </td>
                  </tr>
                  <tr>
                    <th colSpan={1}>객실 사진_2</th>
                    <td colSpan={3}>
                      <input
                        className="form-control"
                        type="file"
                        //multiple = "multiple"
                        ref={d_img2}
                        accept=".jpg,.jpeg,.png,"
                      />
                    </td>
                  </tr>
                  <tr>
                    <th colSpan={1}>객실 사진_3</th>
                    <td colSpan={3}>
                      <input
                        className="form-control"
                        type="file"
                        //multiple = "multiple"
                        ref={d_img3}
                        accept=".jpg,.jpeg,.png,"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="mb-30" style={{ textAlign: "center" }}>
              <button className="main-btn"
                onClick={() => {
                  Swal.fire({
                    icon: "warning",
                    title: "잠깐!",
                    text: '호텔 기본정보를 수정하시겠습니까?',
                    showCancelButton: true,
                    cancelButtonText: "CANCEL",
                    confirmButtonText: "CONFIRM",
                    showLoaderOnConfirm: true,
                  }).then((result) => {
                    if (result.isConfirmed) {
                      const form = new FormData();
                      form.append('ho_idx', props.hoIdx);
                      form.append('d_idx', props.dIdx);
                      form.append('d_capacity', d_capacity.current.value);
                      form.append('d_area', d_area.current.value);
                      form.append('d_beds', d_beds.current.value);
                      form.append('d_non_smoking', d_non_smoking.current.value);
                      form.append('d_price', d_price.current.value);
                      if(d_img1.current.files.length > 0){
                        form.append('dImg1', d_img1.current.files[0]);
                      }
                      if(d_img2.current.files.length > 0){
                        form.append('dImg2', d_img2.current.files[0]);
                      }
                      if(d_img3.current.files.length > 0){
                        form.append('dImg3', d_img3.current.files[0]);
                      }
                      fetch('http://localhost/host/hotel/editHotel/roomInfo', {
                          method: 'POST',
                          body : form
                      }).then(() => {
                          alert("수정 완료");
                          window.location.reload();
                      });
                    }
                  });
                }}
              >
                &nbsp;&nbsp;&nbsp;수정&nbsp;&nbsp;&nbsp;
              </button>
           
          </div>
        </div>
      </>
    );
  }
}
export default RoomDetail;
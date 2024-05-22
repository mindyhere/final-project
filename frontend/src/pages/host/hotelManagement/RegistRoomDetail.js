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

function RegistRoomDetail(props) {
  const [rdo, setRadio] = useState('Y');

  function handleRdoChange(e) {
    setRadio(e.target.value);
  }

  const [state, setState] = useState({
    //no : 1,
    roomType : "",
    capacity : "",
    area : "",
    beds : "",
    non_smoking : "",
    price : "",
    dImg1 : "",
    dImg2 : "",
    dImg3 : ""
});

  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name] : e.target.value,
    });
  };

  const insertData = () => {
    console.log(state);
    props.insertData(state); 

  }
    // let src1='';
    // let image1='';
    // if (img1 == 'undefined') {
    //   src1='/img/image_no.png';
    //   image1=`<img src=${src1} width='90px' height='90px' style={{backgroundSize:"contain";}}/>`;
    // } else {
    //   src1=`http://localhost/static/images/host/hotel/`;
    //   image1=`<img src=${src1} width='90px' height='90px' style={{backgroundSize:"contain";}}/>`;
    // }


    // let src2='';
    // let image2='';
    // if (img2 == '-') {
    //   src2='/img/image_no.png';
    //   image2=`<img src=${src2} width='90px' height='90px' style={{backgroundSize:"contain";}}/>`;
    // } else {
    //   src2=`http://localhost/static/images/host/hotel/`;
    //   image2=`<img src=${src2} width='90px' height='90px' style={{backgroundSize:"contain";}}/>`;
    // }

    // let src3='';
    // let image3='';
    // if (img3 == '-') {
    //   src3='/img/image_no.png';
    //   image3=`<img src=${src3} width='90px' height='90px' style={{backgroundSize:"contain";}}/>`;
    // } else {
    //   src3=`http://localhost/static/images/host/hotel/`;
    //   image3=`<img src=${src3} width='90px' height='90px' style={{backgroundSize:"contain";}}/>`;
    // }
    return (
      <>
        <div className="modal_container" style={{ paddingTop: "15px" }}>
          <h3 className="text-bold mb-30">
            &nbsp;객실유형
          </h3>
          <hr />
          <div className="card-style mb-20">
            <div className="row mb-20">
              {/* <div className="col" dangerouslySetInnerHTML={{ __html: image1 }}></div>
              <div className="col"  dangerouslySetInnerHTML={{ __html: image2 }}></div>
              <div className="col"  dangerouslySetInnerHTML={{ __html: image3 }}></div> */}
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
                    <th colSpan={1}>객실 유형</th>
                    <td>
                        <select
                          name="roomType"
                          value={props.roomType}
                          onChange={handleChangeState}
                        >
                          <option value={1}>싱글룸</option>
                          <option value={2}>더블룸</option>
                          <option value={3}>패밀리룸</option>
                          <option value={4}>스위트룸</option>
                        </select>
                    </td>
                    <th colSpan={1}>수용 인원</th>
                    <td colSpan={1}>
                      <input 
                        type="number" 
                        min={0} 
                        style={{border:'none'}}
                        name="capacity"
                        value={props.capacity} 
                        onChange={handleChangeState}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th colSpan={1} style={{ width: "25%" }}>
                      객실 면적
                    </th>
                    <td colSpan={1}>
                      <input 
                        type="number" 
                        min={0} 
                        style={{border:'none'}}
                        name="area"
                        value={props.area} 
                        onChange={handleChangeState}
                      />
                    </td>
                    <th colSpan={1}>침대 수</th>
                    <td colSpan={1}>
                      <input 
                          type="number" 
                          min={0} 
                          style={{border:'none'}}
                          name="beds"
                          value={props.beds} 
                          onChange={handleChangeState}
                        />
                    </td>
                  </tr>
                  <tr>
                    <th colSpan={1} style={{ width: "25%" }}>금연실 여부</th>
                    <td colSpan={1}>
                      <div>
                      <input
                          className="form-check-input"
                          type="radio"
                          name="non_smoking"
                          value="Y"
                          //checked={rdo == "Y"}
                          //onChange={handleRdoChange}
                          onChange={handleChangeState}
                          id="rdo1"
                        />
                        <label className="form-check-label" htmlFor="rdo1">
                          Y
                        </label>
                        &nbsp;&nbsp;
                        <input
                          className="form-check-input"
                          type="radio"
                          name="non_smoking"
                          value="N"
                          //checked={rdo == "N"}
                          //onChange={handleRdoChange}
                          onChange={handleChangeState}
                          id="rdo1"
                        />
                        <label className="form-check-label" htmlFor="rdo1">
                          N
                        </label>
                      </div>
                    </td>
                    <th colSpan={1}>가격</th>
                    <td colSpan={3}>
                      <input 
                          type="number" 
                          min={0} 
                          style={{border:'none'}}
                          name="price"
                          value={props.price} 
                          onChange={handleChangeState}
                        />
                    </td>
                  </tr>
                  <tr>
                    <th colSpan={1}>객실 사진_1</th>
                    <td colSpan={3}>
                      <input
                        className="form-control"
                        type="file"
                        name="dImg1"
                        value={props.dImg1}
                        onChange={handleChangeState}
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
                        name="dImg2"
                        value={props.dImg2}
                        onChange={handleChangeState}
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
                        name="dImg3"
                        value={props.dImg3}
                        onChange={handleChangeState}
                        accept=".jpg,.jpeg,.png,"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="mb-30" style={{ textAlign: "center" }}>
              <button className="main-btn" onClick={insertData}>
                &nbsp;&nbsp;&nbsp;등록&nbsp;&nbsp;&nbsp;
              </button>
           
          </div>
        </div>
      </>
    );
  }

export default RegistRoomDetail;
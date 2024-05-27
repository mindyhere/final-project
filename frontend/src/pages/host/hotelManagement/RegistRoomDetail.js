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
    props.insertData(state); 
  }

    return (
      <>
        <div className="modal_container" style={{ paddingTop: "30px" }}>
          <h3 className="text-bold mb-30">
            &nbsp;객실유형
          </h3>
          <hr />
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
                          <option value="" selected disabled hidden>선택해주세요</option>
                          <option value={'싱글룸'}>싱글룸</option>
                          <option value={'더블룸'}>더블룸</option>
                          <option value={'패밀리룸'}>패밀리룸</option>
                          <option value={'스위트룸'}>스위트룸</option>
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
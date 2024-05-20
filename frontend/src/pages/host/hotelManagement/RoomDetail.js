import React, { useEffect, useRef, useState } from "react";

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
  const [data, loading] = useFetch(
    `http://localhost/api/order/manage/detail/get/`
  );

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
      image1=`<img src=${src1} width='45px' height='45px' style={{backgroundSize:"contain";}}/>`;
    } else {
      src1=`http://localhost/static/images/host/hotel/${props.img1}`;
      image1=`<img src=${src1} width='80px' height='80px' style={{backgroundSize:"contain";}}/>`;
    }


    let src2='';
    let image2='';
    if (props.img2 == '-') {
      src2='/img/image_no.png';
      image2=`<img src=${src2} width='45px' height='45px' style={{backgroundSize:"contain";}}/>`;
    } else {
      src2=`http://localhost/static/images/host/hotel/${props.img2}`;
      image2=`<img src=${src2} width='80px' height='80px' style={{backgroundSize:"contain";}}/>`;
    }

    let src3='';
    let image3='';
    if (props.img3 == '-') {
      src3='/img/image_no.png';
      image3=`<img src=${src3} width='45px' height='45px' style={{backgroundSize:"contain";}}/>`;
    } else {
      src3=`http://localhost/static/images/host/hotel/${props.img3}`;
      image3=`<img src=${src3} width='80px' height='80px' style={{backgroundSize:"contain";}}/>`;
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
                    <td colSpan={1}>&nbsp;&nbsp;{props.capacity}명</td>
                    <th colSpan={1} style={{ width: "25%" }}>
                      객실 면적
                    </th>
                    <td colSpan={1}>&nbsp;&nbsp;{props.area}㎡</td>
                  </tr>
                  <tr>
                    <th colSpan={1}>침대 수</th>
                    <td colSpan={1}>&nbsp;&nbsp;{props.beds}개</td>
                    <th colSpan={1} style={{ width: "25%" }}>금연실 여부</th>
                    <td colSpan={1}>&nbsp;&nbsp;{smoking}</td>
                  </tr>
                  <tr>
                    <th colSpan={1}>가격</th>
                    <td colSpan={3}>
                      &nbsp;&nbsp;{props.price}원
                    </td>
                  </tr>
                  <tr>
                    <th colSpan={1}>객실 사진</th>
                    <td colSpan={3}><input type="file" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="mb-30" style={{ textAlign: "center" }}>
            {/* {roomData.d_area == "2" ? null : (
              <button className="main-btn"
               // disabled={rdo == "2" ? false : true}
                // style={
                //   rdo == "2"
                //     ? { cursor: "pointer", backgroundColor: "#C6C7C8" }
                //     : { cursor: "auto", backgroundColor: "#C6C7C8" }
                // }
                onClick={() => {
                  Swal.fire({
                    icon: "warning",
                    title: "잠깐!",
                    showCancelButton: true,
                    cancelButtonText: "CANCEL",
                    confirmButtonText: "CONFIRM",
                    showLoaderOnConfirm: true,
                    preConfirm: (pwd) => {
                      return fetch(
                       // `http://localhost/api/host/pwdCheck/${pwd}?userEmail=${userEmail}`
                      )
                        .then((response) => {
                          if (!response.ok) {
                            throw new Error("false: " + response.status);
                          }
                          const form = new FormData();
                          form.append("opt", 0);
                          form.append("oidx", roomData.o_idx);
                         // form.append("hidx", userIdx);
                          form.append("idx", roomData.g_idx);
                          console.log("==> form?" + JSON.stringify(form));

                          return fetch(
                            // `http://localhost/api/order/manage/cancel/${roomData.o_idx}`,
                            {
                              method: "post",
                              body: form,
                            }
                          ).then((response) => {
                            if (!response.ok) {
                              throw new Error("false: " + response.status);
                            }
                            return response.text();
                          });
                        })
                        .catch((error) => {
                          console.log(error);
                          Swal.showValidationMessage(
                            `처리 중 문제가 발생했습니다. 비밀번호를 확인해주세요.<br/>반복실패할 경우, 관리자에게 문의 바랍니다.`
                          );
                        });
                    },
                    allowOutsideClick: () => !Swal.isLoading(),
                  }).then((result) => {
                    if (result.isConfirmed) {
                      console.log(result.value);
                      Swal.fire({
                        icon: "success",
                        title: "Success",
                        html: "정상처리 되었습니다.",
                        showConfirmButton: false,
                        timer: 2000,
                      }).then(() => {
                        localStorage.removeItem("roomData");
                        window.location.reload();
                      });
                    }
                  });
                }}
              >
                &nbsp;&nbsp;&nbsp;수정&nbsp;&nbsp;&nbsp;
              </button>
            )} */}
          </div>
        </div>
      </>
    );
  }
}
export default RoomDetail;
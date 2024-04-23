import React from 'react';

import Swal from "sweetalert2";
import Button from "react-bootstrap/Button";

function Main() {
  return (
    <>
      <h2>리액트 test</h2>
      <Button
        variant="info"
        onClick={() => {
          Swal.fire({
            title: "Source Code",
            icon: "info",
            html: `
      sweetalert를 사용합니다.
      <hr />
      sweetalert를 사용합니다.
      `,
            showCancelButton: true,
            cancelButtonText: "cancel",
            confirmButtonText: "confirm",
          });
        }}
      >click!</Button>
    </>
  );
}
export default Main;
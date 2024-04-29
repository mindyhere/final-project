import React from "react";
import Swal from "sweetalert2";

function Popup() {
  let icon = "";
  let title = "";
  let msg = "";
  let url = "";

  function basicAlert(icon, title, msg) {
    Swal.fire({
      icon: icon,
      title: title,
      html: msg,
      confirmButtonText: "OK",
    });
  }

  function basicConfirm(icon, title, msg, url) {
    Swal.fire({
      icon: icon,
      title: title,
      html: msg,
      showDenyButton: true,
      reverseButtons: true,
      confirmButtonText: "YES",
      denyButtonText: "NO",
    }).then((result) => {
      if (result.isConfirmed) {
        location.href = url;
      } else if (result.isDenied) {
        location.reload();
      }
    });
  }
  
  return Popup;
}

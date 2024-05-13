import React, { useEffect, useState, useRef } from "react";

function OrderItem({}) {
  let loading = false;

  if (loading) {
    return <div>loading...</div>;
  } else {
    return <div>test...</div>;
  }
}
export default OrderItem;

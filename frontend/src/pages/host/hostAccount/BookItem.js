import React, { useEffect, useState, useRef } from "react";

function BookItem({}) {
  let loading = false;

  if (loading) {
    return <div>loading...</div>;
  } else {
    return <div>test...</div>;
  }
}
export default BookItem;

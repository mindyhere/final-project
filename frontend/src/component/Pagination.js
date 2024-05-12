import React, { useEffect, useState, useRef } from "react";

import {
  ChevronDoubleLeft,
  ChevronLeft,
  ChevronRight,
  ChevronDoubleRight,
} from "react-bootstrap-icons";

function Pagination({ page }) {
  const curPage = page.curPage;
  const prevPage = page.prevPage;
  const nextPage = page.nextPage;
  const curBlock = page.curBlock;
  const blockStart = page.blockStart;
  const totBlock = page.totBlock;
  const totPage = page.totPage;
  const begin = page.blockStart;
  const end = page.blockEnd;
  const [pageNum, setCurPage] = useState("");

  const pageList = () => {
    const result = [];

    for (let i = begin; i <= end; i++) {
      if (i === curPage) {
        result.push(
          <li className="page-item">
            <a key={i} className="page-link" href="#">
              <strong>{i}</strong>
            </a>
          </li>
        );
      } else {
        result.push(
          <li className="page-item">
            <a
              key={i}
              className="page-link"
              href="#"
              onClick={() => setCurPage()}
            >
              {i}
            </a>
          </li>
        );
      }
    }
    return result;
  };
  return (
    <nav className="page-navibar">
      <ul className="pagination">
        {curPage > 1 ? (
          <li className="page-item">
            <a className="page-link" href="#">
              <span aria-hidden="true" onClick={() => setCurPage(1)}>
                <ChevronDoubleLeft />
              </span>
            </a>
          </li>
        ) : null}
        {curBlock > 1 ? (
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true" onclick={() => setCurPage({ prevPage })}>
                <ChevronLeft />
              </span>
            </a>
          </li>
        ) : null}

        {pageList()}

        {curBlock < totBlock ? (
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Next">
              <span aria-hidden="true" onClick={() => setCurPage({ nextPage })}>
                <ChevronRight />
              </span>
            </a>
          </li>
        ) : null}
        {curPage < totPage ? (
          <li className="page-item">
            <a className="page-link" href="#" aria-label="End">
              <span aria-hidden="true" onClick={() => setCurPage({ totPage })}>
                <ChevronDoubleRight />
              </span>
            </a>
          </li>
        ) : null}
      </ul>
    </nav>
  );
}

export default Pagination;

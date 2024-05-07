import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router";

function ListReview() {
  const navigate = useNavigate();
  const [list, setReviewList] = useState([]);
  const searchKey = useRef();
  const search = useRef();

  // function getList(url) {
  // }

  // useEffect(()=>{("");}, []);

  return (
    <>
      <table
        id="review"
        className="table table-sm table-hover align-middle text-center"
      >
        <colgroup>
          <col width="5%" />
          <col width="10%" />
          <col width="70%" />
          <col width="10%" />
          <col width="5%" />
        </colgroup>
        <thead>
          <tr className="align-middle">
            <th scope="col">
              <strong>no.</strong>
            </th>
            <th scope="col">
              <strong>Writer</strong>
            </th>
            <th scope="col">
              <strong>Review</strong>
            </th>
            <th scope="col">
              <strong>Date</strong>
            </th>
            <th scope="col">
              {/* <c:choose>
			<c:when test="${sessionScope.mId !=null}">
				<input type="checkbox" id="deleteU" name="deleteU" checked="false">
				<label className="btn" for="deleteU"><i className="bi bi-eraser-fill"></i></label>
			</c:when>
			<c:when test="${sessionScope.a_id !=null}">
				<input type="checkbox" id="deleteA" name="deleteA" checked="false">
				<label className="btn" for="deleteA"><i className="bi bi-eraser-fill"></i></label>
			</c:when>
			<c:otherwise>
				<input type="checkbox" id="none" checked="false" disabled>
				<label className="btn" for="none" style="cursor:none;" disabled><i className="bi bi-eraser-fill"></i></label>
			</c:otherwise>
		  </c:choose> */}
            </th>
          </tr>
        </thead>
        <tbody
          className="table-group-divider"
          style={{ borderColor: "#DBC4F0" }}
        >
          {/* <c:choose>
		  <c:when test="${reviews.size() !=0 }">
			<c:forEach var="item" items="${reviews }">
			  <tr className="align-middle">
				<th scope="row">${item.ROWNUM}</th>
				<td>${item.WRITER}</td>
				<td>${item.CONTENTS}</td>
				<td>${item.POST_DATE}</td>
				<td>
				  <c:choose>
					<c:when test="${sessionScope.mId !=null && item.M_ID == sessionScope.mId }">
						<input type="checkbox" name="checkIdx" value="${item.IDX}">
					</c:when>
					<c:when test="${sessionScope.a_id !=null }">
						<input type="checkbox" name="checkIdx" value="${item.IDX}">
					</c:when>
					<c:otherwise>
						<input type="checkbox" name="checkIdx" style="display:none">
					</c:otherwise>
				  </c:choose>
				</td>
			  </tr>
			</c:forEach>
		  </c:when>
		  
		  <c:otherwise>
		  <tr className="align-middle">
		  	<td colspan="5" ><br><p>등록된 게시글이 없습니다.</p></td>
		  </tr>	
		  </c:otherwise>	
		</c:choose>	 */}
          <tr>
            <td colSpan={5}>
              <br />
              <p>등록된 게시글이 없습니다.</p>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default function Reviews() {
  return <ListReview />;
}

import React,{ useRef, useEffect,useState } from 'react';
import {PersonWorkspace } from "react-bootstrap-icons";
import { useNavigate} from 'react-router';
import { Link } from 'react-router-dom';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      fetch(url)
      .then(response => {
          return response.json();
      })
      .then(data => {
          setData(data);
          setLoading(false);
      })
  }, []);
  return [data, loading];
}


function AGuest() {
    const navigate = useNavigate();
    const searchkey=useRef();
    const search=useRef();
  
    const [agItem, setAgitem] = useState("");


  
    // let url = "";
    // let photo_src = "";
    // console.log(agItem.g_photo);
    // if (agItem.g_photo !== "-" && agItem.g_photo !== "") {
    //   url = `http://localhost/static/images/guest/photo/${agItem.g_photo}`;
    //   photo_src = `<img src=${url} width="100px" style={{backgroundSize:"contain";}} />`;
    // } else {
    //   photo_src =
    //     "<img src='http://localhost/static/images/no-image.png' width='30%'/>";
    // }






    return (
       <>
  <nav class="navbar bg-body-tertiary fixed-top">    
  <a class="navbar-brand" href='../amain'>
    <PersonWorkspace width="50" height="50"/> 관리자 페이지</a></nav>
        <div>
        <h2>회원관리</h2><br />       
        <select ref={searchkey}  defaultValue='g_name'>
        <option value="g_name">회원명</option>
        <option value="g_email">회원ID</option>
        <option value="g_idx">회원번호</option>
        </select>
        &nbsp;
        <input ref={search}/>
        &nbsp;
        <button type='button' className="btn btn-outline-success" onClick={()=>{
        const form = new FormData();
        form.append('searchkey', searchkey.current.value);
        form.append('search', search.current.value);
        fetch('http://localhost/admin/ag_list',{
          method:'post',
          body:form,          
        }).then(response=>{
          return response.json();})
        .then(list=>{
        console.log('list'+ JSON.stringify(list));
        setAgitem(list);});
        }    
        }>조회</button>
        <br /><br />
          <table className="table table-hover">
                  <thead>
                      <tr>
                          <th>#</th>
                          <th>프로필</th>
                          <th>회원명</th>
                          <th>회원ID</th>
                          <th>전화번호</th>
                          <th>가입날짜</th>
                          <th>등급</th>
                      </tr>
                  </thead>
                  <tbody>
                      {agItem && agItem.map((list) =>
                          <tr key={list.g_idx}>
                              <td>{list.g_idx}</td>
                              <td><img src={list.g_photo}  style={{width: '50px', height: '50px'}} /></td>                      
                              <td><Link to={`/admin/ag_detail/${list.g_idx}`}>{list.g_name}</Link></td>
                              <td>{list.g_email}</td>
                              <td>{list.g_phone}</td>
                              <td>{list.g_join_date}</td>
                              <td>{list.g_level}</td>
                          </tr>
                      )}
                  </tbody>
              </table>
           </div>
         </>
      );
};
export default AGuest;
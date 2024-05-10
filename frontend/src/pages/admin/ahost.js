
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
  
function Ahost(){ 
      const navigate = useNavigate();
      const searchkey=useRef();
      const search=useRef();
      const [ahitem, setAhitem] = useState("");

      return (
         <>  
<nav class="navbar bg-body-tertiary fixed-top">    
  <a class="navbar-brand" href='../amain'>
    <PersonWorkspace width="50" height="50"/> 관리자 페이지</a></nav>
          <div>
          <h2>사업자 관리</h2><br/>      
          <select ref={searchkey}  defaultValue='h_name'>
          <option value="h_name">사업자명</option>
          <option value="h_email">사업자ID</option>
          <option value="h_idx">사업자 번호</option>
          </select>
          &nbsp;
          <input ref={search}/>
          &nbsp;
          <button type='button' className="btn btn-outline-success" onClick={()=>{
          const form = new FormData();
          form.append('searchkey', searchkey.current.value);
          form.append('search', search.current.value);
          fetch('http://localhost/admin/ah_list',{
            method:'post',
            body:form   
                  
          }).then(response=>{
            return response.json();})
          .then(list=>{
          console.log('list'+ JSON.stringify(list));
          setAhitem(list);});
          }    
          }>조회</button>
          <br /><br />
  
            <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>프로필</th>
                            <th>사업자명</th>
                            <th>사업자ID</th>
                            <th>전화번호</th>
                            <th>가입날짜</th>
                            <th>등급</th>
                            <th>가입승인</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ahitem && ahitem.map((list) =>
                            <tr key={list.h_idx}>
                                <td>{list.h_idx}</td>
                                <td><img src={list.h_profile}  style={{width: '50px', height: '50px'}} /></td> 
                                {/* <td>{list.h_profile}</td>*/}
                                <td><Link to={`/admin/ah_detail/${list.h_idx}`}>{list.h_name}</Link></td>                                                    
                                <td>{list.h_email}</td>
                                <td>{list.h_phone}</td>
                                <td>{list.h_regdate}</td>
                                <td>{list.h_level}</td>
                                <td>{list.h_status}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
             </div>
           </>
        );
  }; export default Ahost;
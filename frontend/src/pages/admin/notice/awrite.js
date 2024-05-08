
import React,{useRef,useEffect,useState} from 'react';
import {useNavigate} from 'react-router-dom';

function useFetch(url){
const [data,setData]=useState(null);
const [loading,setLoading]=useState(true);
useEffect(()=>{
fetch(url)
.then(response=>{
return response.json();
})
.then(data=>{
setData(data);
setLoading(false);
})
},[]);
return[data,loading];
}

function Awrite(){
  const paths = window.location.href.split('/');
  const url = 'http://localhost/notice/insert' + paths[paths.length-2]+'/'+paths[paths.length-1];
  const[data,loading]=useFetch(url);
  const navigate = useNavigate();
  const n_writer=useRef();
  const n_title=useRef();
  const n_content=useRef();
  const n_date=useRef();
  



  if(loading){
    return(
    <div>loading</div>
    )
    }else{

	return (
		<div>
   <nav class="navbar bg-body-tertiary fixed-top">
  <a class="navbar-brand" href='../amain'><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
<path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/><path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
</svg>관리자 페이지</a>
</nav>

			<table className="table">
				<tbody>
					<tr>
						<th className="table-success">작성자</th>
						<td>
              <textarea type="text" className="form-control"  ref={n_writer}   size="50px" />
						</td>
          </tr>
         <tr>
           <th className="table-success">작성일자</th>
           <td><textarea type="text" className="form-control" ref ={n_date}   size="50px" ></textarea> </td>
          </tr>
					<tr>
						<th className="table-success">제목</th>
						<td>
              <textarea  type="text" className="form-control" ref={n_title}  size="50px" ></textarea>
						</td>
					</tr>
					<tr>
						<th className="table-success">내용</th>
						<td>
							<textarea className="form-control" ref={n_content} rows="10"></textarea>
						</td>
					</tr>
          <tr>
            <td colSpan='2'align='center' >
              <button type='button' onClick={()=>{
                const form= new FormData();
                  // n_writer.current.value='';
                  // n_content.current.value='';
                  //  n_date.current.value='';
                 form.append('n_idx',data.n_idx);
                 form.append('n_writer',n_writer.current.value);
                 form.append('n_content',n_content.current.value);
                 form.append('n_date',n_date.current.value);                      
                  fetch('http://localhost/notice/insert',{
                    method:'post',
                    body:form
                  }).then(()=>{ navigate('/admin/notice/alist'); });
                  }}>등록하기</button>
                  &nbsp;
                  </td>
                  </tr>
                  </tbody>
                  </table>
                  </div>

	);
}
}
export default Awrite;
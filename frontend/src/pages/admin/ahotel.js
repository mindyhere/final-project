import React,{useRef,useEffect,useState} from'react';
import{ useNavigate} from 'react-router';
import { PersonWorkspace } from "react-bootstrap-icons";

function Ahotel(){

    const navigate = useNavigate();
    const searchkey = useRef();
    const search = useRef();
    const [ahitem, setAhitem] = useState("");
    const [selectedItem, setSelectedItem] = useState(null);
    const [inputValue, setInputValue] = useState();

    useEffect(() => {
        fetchahotel();
      }, [])

    const fetchahotel = () => {
        const form = new FormData();
        form.append('searchkey', searchkey.current.value);
        form.append('search', search.current.value);
        fetch('http://localhost/admin/ahotel_list', {
            method: 'post',
            body: form
        }).then(response => response.json())
            .then(list => {
                console.log('list' + JSON.stringify(list));
                setAhitem(list);
            });
    };
   

    return(
    <>
 <div>
      <nav className="navbar bg-body-tertiary fixed-top">
        <a className="navbar-brand" href='../amain'>
          <PersonWorkspace width="50" height="50" />&nbsp; 관리자 페이지
        </a>
      </nav>
      <div className="container">
        <h2 className="mt-5">Hotel 리스트</h2>
      
      
      
      
      
      
      
      
      </div>
    </div>
    </>
    );
} export default Ahotel;
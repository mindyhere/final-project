import React, { useEffect, useState, useRef } from 'react';
import Modal from 'react-modal';
import '../admin/css/astyles.css';
import Swal from 'sweetalert2';
import { CircleFill, PlusSquare,Trash } from 'react-bootstrap-icons';
import Cookies from "universal-cookie";

Modal.setAppElement('#root');

function MemoList() {
  const [Meitem, setMeitem] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newMemoContent, setNewMemoContent] = useState('');
  const cookies = new Cookies();
  const me_content = useRef();
  const a_id = cookies.get("a_id");

  useEffect(() => {
    fetchMemo();
  }, []);

  const fetchMemo = () => {
    const form = new FormData();
    fetch('http://localhost/memo/list', {
      method: 'post',
      body: form
    })
      .then(response => response.json())
      .then(data => {
        console.log('list', data.list);
        setMeitem(data.list);
      })
      .catch(error => {
        console.error('Error :', error);
      });
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleMemoContentChange = (e) => {
    setNewMemoContent(e.target.value);
  };



  const btnMemo = (event) => {
    event.preventDefault();
    const form = new FormData();
    form.append('me_content', me_content.current.value);
    Swal.fire({
        text: '메모 추가하기',
        showCancelButton: true,
        confirmButtonColor: '#41774d86',
        confirmButtonText: '확인',
      }).then((result) => {
        if (result.isConfirmed) {
          fetch(`http://localhost/memo/insert`, {
            method: 'POST',
            body: form,
          })
          .then((response) => {
            if (response.ok) {
                Swal.fire({
                  text: '메모가 등록되었습니다.',
                  icon: 'success',
                  showCancelButton: false,
                  confirmButtonText: '확인',
                  confirmButtonColor: '#41774d86'
                }).then((result) => {
                    if(result.isConfirmed) {
                        window.location.href = `/admin/amain/${a_id}`;
                    }
                  });
              } else {
                Swal.fire({
                  title: '에러 발생',
                  text: '처리 중 오류가 발생했습니다',
                  showCancelButton: false,
                  confirmButtonText: '확인',
                  confirmButtonColor: '#41774d86'
                });
              }
            })
        }
      });
    };

    const btndelete = (me_idx) => {
      Swal.fire({
        text: '메모를 삭제하시겠습니까?',
        showCancelButton: true,
        confirmButtonColor: '#41774d86',
        cancelButtonColor: '#838383d2',
        confirmButtonText: '삭제',
        cancelButtonText: '취소',
      }).then((result) => {
        if (result.isConfirmed) {  
          fetch(`http://localhost/memo/delete?me_idx=${me_idx}`, {
            method: 'POST',
   
          })
          .then(response => response.json())
                .then(data => {
                  if (data.result === 'success') {
              Swal.fire({
                text: '메모가 삭제되었습니다.',
                icon: 'success',
                confirmButtonText: '확인',
                confirmButtonColor: '#41774d86',
              }).then(() => {
                fetchMemo(); 
              });
            } else {
              Swal.fire({
                title: '에러 발생',
                text: '처리 중 오류가 발생했습니다',
                confirmButtonText: '확인',
                confirmButtonColor: '#41774d86',
              });
            }
          })
          .catch((error) => {
            console.error('Error :', error);
          });
        }
      });
    };

 
    const customStyles = {
      content: {
        width: '600px',
        height: '500px',
        margin: 'auto',
        padding: '10px',
        backgroundColor: '#5a885a1a',
        border: '1px solid #e0e0e0',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      },
      overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
    };
  

  return (
    <div className="notepad-container">
      <div className="notepad-header">
        <span className="notepad-title">Memo List</span>
        <button onClick={openModal} className="btn"><PlusSquare width={'20px'} height={'20px'} /></button>
      </div>
      <div className="notepad-content">
        <table>
          <tbody>
            {Meitem.map((list ) => (
              <tr key={list}>
                <td className="memo-cell"><CircleFill width={'5px'} height={'5px'}/></td>
                <td className="memo-cell">{list.me_content}</td>
                <td className="memo-cell">
                  <button className="btn" onClick={() => btndelete(list.me_idx)}>
                    <Trash width={'20px'} height={'20px'} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Add Memo"
        style={customStyles}
      >
        <div className="modal-content" style={{width:"100%", height:"99%"}}>
          <div className="modal-header" >
            <h5>Memo</h5>
          </div>
          <div className="modal-body">
            <form>
              <label htmlFor="me_content" className="form-label"></label>
              <textarea className="form-control" id="me_content" rows="12" ref={me_content} placeholder="메모를 작성하세요..."></textarea>
            </form>
            <div className="modal-footer">
            <button type="submit" className="btn" onClick={btnMemo}>추가</button>
            <button type="button" className="btn" onClick={closeModal}>취소</button>
          </div>
          </div>
          </div>         
      </Modal>
    </div>
  );
}

export default MemoList;
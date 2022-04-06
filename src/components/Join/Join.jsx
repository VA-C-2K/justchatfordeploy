import React ,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify/dist/index";
import "react-toastify/dist/ReactToastify.css";
import './Join.css';
const Join = () => {
  const [name,setName] = useState('');
  const [room,setRoom] = useState('');
  const notify = () => toast.info("Please Enter Name & Room");
  const notifyondiv = () => toast.error("Enter Name & Room");
  const clickOnDiv =()=>{
    if(name==="" || room===""){
      notifyondiv();
    }
    else{
      return;
      }
  }
  useEffect(()=>{
    notify();
  },[])
  
  return (
    <div className="joinOuterContainer">
      <ToastContainer
        position="bottom-left"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
      />
      <div className="joinInnerContainer">
        <h1 className="heading">
          Join Chat
        </h1>
       <div><input placeholder='Name' type="text" className='joinInput'  onChange={(event) => setName(event.target.value)} /></div> 
       <div><input placeholder='Room' type="text" className='joinInput mt-20'   onChange={(event) => setRoom(event.target.value)}/></div> 
        <div onClick={clickOnDiv}>
        <Link onClick={e => (!name || !room) ? e.preventDefault():null} to={`/chat?name=${name}&room=${room}`}>
          <button className={'button mt-20'} type="submit">Sign In</button>
        </Link>
        </div>
       </div>
    </div>
  )
}

export default Join;
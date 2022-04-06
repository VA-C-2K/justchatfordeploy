import React, { useState, useMemo,useLayoutEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";
import './Chat.css';
import {useLocation} from "react-router-dom";
import InfoBar from '../InfoBar/InfoBar';
import Input from "../Input/Input";
import Messages from "../Messages/Messages";
import TextContainer from "../TextContainer/TextContainer";
import { toast, ToastContainer } from "react-toastify/dist/index";
import "react-toastify/dist/ReactToastify.css";

let socket;

const Chat = () => {
  const location = useLocation();
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const ENDPOINT = 'https://just-chat-vac.herokuapp.com/';
  //const ENDPOINT = 'localhost:5000'
  var connectionOptions =  {
    //"force new connection" : true,
    "reconnectionAttempts": "Infinity", 
    //"timeout" : 10000,                  
    "transports" : ['polling']
};

useLayoutEffect(()=>{
    const {name,room} = queryString.parse(location.search);
    socket = io(ENDPOINT,connectionOptions);
    setName(name);
    setRoom(room);
    
    socket.emit('join',{name,room},()=>{
     
    });
    return () =>{
      socket.emit('disconnect');
      socket.off();
    }
  },[ENDPOINT,location.search]);
  function welchk(input) {
    let regex = /[a-zA-Z],[a-zA-Z]+ to the room [a-zA-Z]/i;
    return regex.test(input);
}
  function leftchk(input) {
    let regex = /[a-zA-Z] has left./i;
    return regex.test(input);
}
  function joinchk(input) {
    let regex = /[a-zA-Z],has Joined!/i;
    return regex.test(input);
}
  useLayoutEffect(() => {
    socket.on('message',(message)=>{
        setMessages([...messages,message]);
        if(message.user.toLowerCase()==="admin" ){
          if(welchk(message.text)){
          const notifyw = () => toast.success(message.text); 
          notifyw();
        }
          else if(leftchk(message.text)){
            const notifyl = () => toast.dark(message.text);
            notifyl();
        }
          else if(joinchk(message.text)){
            const notifyj = () => toast.warn(message.text);
            notifyj();
        }
      }
    });
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  },[messages]);

  const sendMessage = (event) =>{
    event.preventDefault();
    if(message){
      socket.emit('sendMessage',message,()=>setMessage(''));
    }
  }
 
  const textContainer = useMemo(()=><TextContainer users={users}/>,[users])
  const infoBar= useMemo(()=><InfoBar room={room}/>,[room]);
  return (
    <div className="outerContainer">
       <ToastContainer
        position="bottom-left"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
      />
      <div className="container">
        {infoBar}{/*execute when user join*/}
        <Messages messages={messages} name={name}/>
        <Input message={message}
              setMessage={setMessage}
              sendMessage={sendMessage}
        />
      </div>
      {textContainer}{/*execute when user join*/}
    </div>
  )
}

export default Chat
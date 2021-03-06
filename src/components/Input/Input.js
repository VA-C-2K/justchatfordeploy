import React from 'react';
import './Input.css';
console.log("input exce")
const Input = ({message,setMessage,sendMessage}) => (
    <form  className="form">
        <input type="text" 
        className='input'
        placeholder="Message"
        value={message}
        onChange={(event)=>setMessage(event.target.value)}
        onKeyPress={event=>event.key === 'Enter' ? sendMessage(event) : null}
        />
        <button className="sendButton" onClick={(event)=>sendMessage(event)}>Send</button>
    </form>
)

export default Input
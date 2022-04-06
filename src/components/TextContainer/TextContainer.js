import React from 'react';

import onlineIcon from '../../icons/onlineIcon.png';

import './TextContainer.css';

console.log("I am excuting textcontainer");
const TextContainer =({ users }) =>(
    <div className="textContainer">
        <div>
        <h1>Just Chat<span role="img" aria-label="emoji">💬</span></h1>
        <h3>Created with React, Express, Node and Socket.IO <span role="img" aria-label="emoji">❤️</span></h3>
        <h4>VA_Creations_2K© 2022<span role="img" aria-label="emoji"> ⬅️</span></h4>
        </div>
        {
            users?(
                <div>
                    <h1>People currently Chatting:</h1>
                    <div className="activeContainer">
                        <h2>
                            {users.map(({name}) => (
                                <div key={name} className="activeItem">
                                    {name}
                                    <img src={onlineIcon} alt="online" />
                                </div>
                            ))}
                        </h2>
                    </div>
                </div>
            ):null
        }
    </div>
)

export default TextContainer;
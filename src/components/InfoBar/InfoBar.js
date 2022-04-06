import React from 'react';

import onlineIcon from '../../icons/onlineIcon.png';
import closeIcon from '../../icons/closeIcon.png';

import './InfoBar.css';

console.log("I am excuting infobar");
const InfoBar = ({ room }) => (
    <div className='infoBar'>
        <div className="leftInnerContainer">
            <img src={onlineIcon} alt="online" className="onlineIcon" />
            <h3>{room}</h3>
        </div>
        <div className="rightInnerContainer">
            <a href='/'><img src={closeIcon} alt="close" /></a>
        </div>
    </div>
)

export default InfoBar
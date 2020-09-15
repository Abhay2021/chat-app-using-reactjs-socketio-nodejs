import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import './join.css';

const Join = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    return(
        <div className="joinOuterContainer">
            <div className="joinInterContainer">
                <h1 className="heading"></h1>
                <div>
                    <input 
                    className="joinInput" 
                    placeholder="Name" 
                    type="text" 
                    onChange={(event)=>setName(event.target.value)} /></div>
                <div>
                    <input 
                    className="joinInput mt-20" 
                    placeholder="Room" 
                    type="text" 
                    onChange={(event)=>setRoom(event.target.value)} />
                </div>
                <Link onClick={event=>(!name||!room)?event.preventDefault:null} to={`/chat?name=${name}&room=${room}`}>
                    <button type="submit" className="button mt-20"></button>
                </Link>
            </div>
        </div>
    );
}

export default Join;
import React,{useState,useEffect} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import InfoBar from '../infobar/InfoBar';
import Input from '../input/Input';
import MessageList from '../messagelist/MessageList';
import TextContainer from '../textcontainer/TextContainer';
import './chat.css';
let socket;

const Chat = ({location}) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');//Single message
    const [messageList, setMessageList] = useState([]);//ALL message
    const ENDPOINT = 'localhost:5000';

    useEffect(() => {
        const {name,room} = queryString.parse(location.search);//destructuring
        //location.search return ?name=abc&room=huy
        //queryString.parse return object { name : abc , room : huy}

        socket = io(ENDPOINT);//Creating instance of socket 

        setName(name);
        setRoom(room);
        //console.log(socket);
        //Create an event using socket instance and the same event we will use at server side
        socket.emit('join',{name,room},()=>{

        });

        return ()=>{
           socket.emit('disconnect');
           socket.off();
        }

    },[ENDPOINT,location.search]);

    useEffect(()=>{
        socket.on('message',(message)=>{
            setMessageList([...messageList,message]);//Update message array
        })
    },[messageList]);

    const sendMessage = (event) =>{
        event.preventDefault();
        if(message){
            socket.emit('sendMessage',message,()=>setMessage(''));
            //After sending message, make message variable empty
        }
        
    }

    return(
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room} />
                <MessageList messageList={messageList} name={name} />
                <Input message={message} 
                setMessage={setMessage} 
                sendMessage={sendMessage} />
            </div>
            <TextContainer users={users}/>
        </div>
    );
}

export default Chat;
import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import './MessageList.css';
import Message from './message/Message';


const MessageList = ({messageList,name}) => (
    <ScrollToBottom className="messages">
        { messageList.map((message,i)=>{
            return(
            <div key={i}>
                <Message message={message} name={name} />
            </div>
            )
        })}
    </ScrollToBottom>
)

export default MessageList;
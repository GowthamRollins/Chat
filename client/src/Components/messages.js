import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import './messages.css'
import Message from "./message";

const Messages = ({messages, name}) => {
  return (
    <ScrollToBottom className='messages'>
      {messages.map((message, i) => {
        return (
          <div key={i}><Message message={message} name={name}/></div>
        )
      })}
    </ScrollToBottom>
  );
};

export default Messages;
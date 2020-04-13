import React, {useEffect, useState} from 'react';
import queryString from 'querystring';
import io from 'socket.io-client';
import InfoBar from "./infobar";
import './chat.css';
import Input from "./input";
import Messages from "./messages";
import TextContainer from "./textContainer";

let socket;

const Chat = ({location}) => {
  const [name, setName] = useState('');
  const [users, setUsers] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const SOCKET_SERVER_URL = 'localhost:5000';

  useEffect(() => {
    const {name, room} = queryString.parse(location.search.replace('?', ''));
    socket = io(SOCKET_SERVER_URL);

    setName(name);
    setRoom(room);

    socket.emit('join', {name, room}, () => {

    });

    return () => {
      socket.emit('disconnect');
      socket.off();
    }

  }, [SOCKET_SERVER_URL, location.search.replace('?', '')]);


  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message]);
    });
    socket.on("roomData", ({users}) => {
      setUsers(users);
    });
  }, [messages]);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit('sendMessage', message)
    }
  };

  // console.log(message, messages);

  return (
    <div className='outerContainer'>
      <div className={'container'}>
        <InfoBar room={room}/>
        <Messages messages={messages} name={name}/>
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
      </div>
      <TextContainer users={users}/>
    </div>
  )
};

export default Chat;
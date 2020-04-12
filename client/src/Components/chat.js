import React, {useEffect, useState} from 'react';
import queryString from 'querystring';
import io from 'socket.io-client';

let socket;

const Chat = ({location}) => {
  const [name, setName] = useState('');
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
    })
  }, [messages]);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''))
    }
  };

  console.log(message, messages);

  return (
    <div className='outerContainer'>
      <div className={'container'}>
        <input value={message} onChange={(event) => setMessage(event.target.value)}
               onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}/>
      </div>
    </div>
  )
};

export default Chat;
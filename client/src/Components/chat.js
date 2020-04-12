import React, {useEffect, useState} from 'react';
import queryString from 'querystring';
import io from 'socket.io-client';

let socket;

const Chat = ({location}) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

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

  return (
    <p>This is chat component</p>
  )
};

export default Chat;
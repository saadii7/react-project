import socketIOClient from 'socket.io-client';
const socket = socketIOClient('127.0.0.1:5000');
export default socket;

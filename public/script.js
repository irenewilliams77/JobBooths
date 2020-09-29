const socket = io('/')
const myPeer = new myPeer(undefined, {
    host: '/',
    port: '3001'
})
socket.emit('join-room', ROOM_ID)

socket.on('user-connected', userId =>{
    console.log('user connected:' + userId)
})
const socket = io('/')
const videoGrid = document.getElementById('video-grid')
const myPeer = new myPeer(undefined, {
    host: '/',
    port: '3001'
})
socket.emit('join-room', ROOM_ID)

socket.on('user-connected', userId =>{
    console.log('user connected:' + userId)
})
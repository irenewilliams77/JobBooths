//reference to socket with root path
const socket = io('/')
const videoGrid = document.getElementById('video-grid')
//id left undefined so peer gives us a random id
const myPeer = new myPeer(undefined, {
    host: '/',
    port: '3001'
})

const myVideo = document.createElement('video')
//mutes ourselves but not to other users
myVideo.muted = true
// allowing video/audio connection
const peers = {}
//connect video
navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => {
addVideoStream(myVideo, stream)

//receiving calls
//listening to call
myPeer.on('call', call =>{
    call.answer(stream)

    //answering call
    const video = document.createElement('video')
    call.on('stream', userVideoStream)
    addVideoStream(video, userVideoStream)
})
//listening to server to disconnect faster 
socket.on('user-disconnected', userId => {
    if (peers[userId]) peers[userId].close()
})
//connect to new user
socket.on('user-connected', userId =>{
connectToNewUser(userId, stream)
    })
})

myPeer.on('open', id =>{
    socket.emit('join-room', ROOM_ID, id)
})
//send an event to the server
socket.emit('join-room', ROOM_ID)


// connect to our video stream to new user/calling user and sending our video stream vice versa
function connectToNewUser(userId, stream){
const call = myPeer.call(userId, stream)
const video = document.createElement('video')
call.on('stream', userVideoStream => {
    addVideoStream(video, userVideoStream)
})
//removing video after leaving
call.on('close', () =>{
    video.remove()
})

//connect user id to call
peers[userId] = call
}


//load stream to play video/append video to screen
function addVideoStream(video, stream) {
    video.srcObject = streamvideo.addEventListener('loadedmetadata', () =>{
        video.play()
    })
    videoGrid.append(video)
}
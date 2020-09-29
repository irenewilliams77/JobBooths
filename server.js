//set up to run the server
const express = require('express')
const app = express()
// create a server with socket.io
const server = require('http').Server(app)
const io = require('socket.io')(server)
// generates unique room id's
const { v4: uuidV4} = require ('uuid')

// set up for express server 

//render our views using ejs
app.set('view engine', 'ejs')
//all of js in public folder
app.use(express.static('public'))
//taking in request and reponds
app.get('/', (req,res) => {
  //gives a dynamic url/random uuid
  res.redirect(`/${ uuidV4() }`)
})
//creat a route to the room/dynamic paramaters
app.get('/:room', (req,res) => {
  res.render('room',{roomId: req.params.room})
})
//connects to the socket a user is using
io.on('connection', socket =>{
  //events to listen too
  // joining a room 
  socket.on('join-room', (roomId, userId) => {
  socket.join(roomId)
  socket.to(roomId).broadcast.emit('user-connected:', userId)

  //disconnect faster 
  socket.on('disconnect', () => {
    socket.to(roomId).broadcast.emit('user-disconnected', userId)
  })
  })
})

// start up server on port 3000
server.listen(3000)
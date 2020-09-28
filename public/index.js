const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const { v4: uuidV4 } = require('uuid')

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.redirect(`/${uuidV4()}`)
})

server.listen(5000)

app.get('/:booth', (req, res) => {
    res.render('booth', { boothId: req.params.booth })
  })
  io.on('connection', socket => {
    socket.on('join-booth', (boothId, userId) => {
      socket.join(boothId)
      socket.to(boothId).broadcast.emit('user-connected', userId)
  
      socket.on('disconnect', () => {
        socket.to(boothId).broadcast.emit('user-disconnected', userId)
      })
    })
  })
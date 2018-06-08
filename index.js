const mongoose = require('mongoose')
var connstr = 'mongodb://127.0.0.1:27017/test'
var poolSize = 10
mongoose.connect(connstr, {poolSize})
var db = mongoose.connection
db.on('error', console.error.bind(console, 'db connection error:'))


const express = require('express')
const bodyparser = require('body-parser')
const session = require('express-session')
const http = require('http')
const route = express.Router()
const socketio = require('socket.io')
const app = new express()
const server = http.createServer(app)
const io = socketio(server)

require('./models')
const socketUserHandler = require('./socket/user')

server.listen(3000, '127.0.0.1')

io.on('connection', socket => {
	const socketId = socket.id
	
	// 更新socket id
	socket.on('updateSocketId', async data => {
		const res = await socketUserHandler.updateSocketId(data)
	})

	// 登录
	socket.on('sendLogin', async data => {
		const res = await socketUserHandler.login(data, socketId)
		io.to(socketId).emit('receiveLogin', res)
	})

	// 获取联系人
	socket.on('getContacts', async data => {
		const res = await socketUserHandler.getContacts(data)
		io.to(socketId).emit('receiveContact', res)
	})

	// 查找用户
	socket.on('searchUsers', async data => {
		const res = await socketUserHandler.searchUsers(data)
		io.to(socketId).emit('receiveSearchUsers', res)
	})

	// 删除好友
	socket.on('removeFriend', async data => {
		const res = await socketUserHandler.removeFriend(data)
		if (res.code !== 0) io.to(socketId).emit('receiveServiceError', res)
	})

	// 添加好友
	socket.on('addFriend', async data => {
		const res = await socketUserHandler.addFriend(data)
		if (res.code !== 0) io.to(socketId).emit('receiveServiceError', res)
	})

	// 添加好友
	socket.on('sendMessage', async data => {
		const toUser = await socketUserHandler.sendMessage(data)
		if (toUser.socketId) io.to(toUser.socketId).emit('receiveMessage', data)
	})
})


// const userControllers = require('./controllers/user')
// app.listen(3000, () => {
// 	console.log('node server start listen: 300')
// })

// // http监听
// app.use(cors())
// app.use(bodyparser())
// app.use(route.put('/login', userControllers.login))
// app.use(route.post('/register', userControllers.register))
// app.use(route.get('/user/contacts', userControllers.contacts))
// app.use(route.post('/user/contacts', userControllers.addContacts))
// app.use(route.delete('/user/contacts', userControllers.removeContacts))
// app.use(route.get('/users', userControllers.users))


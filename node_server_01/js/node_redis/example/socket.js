var net = require('net');
var redis = require('redis');
var server = net.createServer(function (socket) {
	
	var publisher, subscriber;
	socket.on('connect', function () {
		subscriber = redis.createClient(6379, '127.0.0.1');
		// 预定者预定信道
		subscriber.subscribe('room')
		subscriber.on('message', function (channel, message) {
			socket.write('Channel' + channel + message)
		})
		publisher = redis.createClient(6379, '127.0.0.1')
	})
	
	socket.on('data', function (data) {
		// 发布者发布数据
		publisher.publish('room', data)
	})
	
	socket.on('end', function () {
		// 预定者关闭
		subscriber.unsubscribe('room')
		subscriber.end()
		publisher.end()
	})
})

server.listen(3000)
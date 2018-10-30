
// 连接 mysql
var http = require('http');
var path = require('path');
var mysql = require('mysql');

var db = mysql.createConnection({
	host: '127.0.0.1',
	user: 'xuchao',
	password: '123456',
	database: 'timetrack'
})

var server = http.createServer(function (req, res) {
	var method = req.method.toLowerCase();
	switch (method): {
		case 'post':
			switch (req.url) {
				case '/':
				break;
				case '';
				break;
			}
			break;
		case 'get':
			switch (req.url) {
				case '/':
				break;
				case '/archived':
				break;
			}
			break;
		default:
			break;
	}
})
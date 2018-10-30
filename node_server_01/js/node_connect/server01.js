const connect = require('connect');
// console.log(connect)

var bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

var app = connect()
	.use(cookieParser('tobi afasdf'))
	.use(function (req, res) {
		console.log(req.cookies);
		console.log(req.signCookies);
		res.setHeader('Content-Type', 'text/html')
		res.end('hello\n');
	})
	.listen(3000)

const connect = require('connect');
// console.log(connect)

var bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// cookieParser()
/**
 * @param 私钥，
 */
var app = connect()
	.use(cookieParser())
	.use(function (req, res) {
		console.log(req.cookies);
		console.log(req.signedCookies);
		res.setHeader('Cookie', 'text/html')
		res.setHeader('Content-Type', 'text/html')
		res.end('hello\n');
	})
	.listen(3000)

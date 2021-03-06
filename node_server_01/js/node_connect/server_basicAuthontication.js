const connect = require("connect");

const app = connect();


// middleware
// function logger (req, res, next) {
// 	console.log(req.method)
// 	next()
// }
// 
// function hello (req, res) {
// 	res.end('hello');
// }
// app
// .use(logger)
// .use(hello)
// .listen(3000)

// [] 1. 具备两个页面；一个可以直接查看，另一个需要登陆权限
// [] 2. basic authontication 认证
// [] 3. \admin 路由
// [] 4. \others 其他

// 验证权限
function Admin (req, res, next) {
	let url = req.url;
	if (url === '/') {
		res.end('try /users')
	}
	if (url === '/users') {
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify(["xuchao", "xiaofnag", "gongg"]))
	}
}
// 后台管理系统
function Restrict (req, res, next) {
	var authorization = req.headers.authorization;
	if (!authorization) {
		res.writeHead(401, {'WWW-Authenticate': 'Basic realm="localhost:3000"',
		'Content-Type': 'text/html; charset=utf8'});
		res.end('需要认证\n');
	} else {
		// 解析 authorization
		const parts = authorization.split(' ');
		// 解密64位
		var str = new Buffer(parts[1], 'base64').toString()
		// 获取用户输入的账户密码
		let name = str.split(':')[0];
		let password = str.split(':')[1];
		
		// 数据库校验
		if (name === 'xuchao') {
			next()
		}
	}
}

function Other (req, res) {
	res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
	res.end('随便就好\n');
}

app
.use('/admin', Restrict)
.use('/admin', Admin)
.use(Other)
.listen(3000)

// 一次请求，需要清理缓存
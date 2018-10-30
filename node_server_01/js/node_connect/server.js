const connect = require('connect');

const server = connect();

function logger(req, res, next) {
	
	next(); // 下一步
}

function hello (req, res) {
	console.log(req.method, req.url);
	res.setHeader('Content-type', 'text/html');
	res.end('<h1>Hello World</h1>');
}

// use(route, fn) 
// route 路由过滤作用
// fn 回掉函数

server.use(logger).use("/321", hello).listen(3000)
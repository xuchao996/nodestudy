var http = require("http");
var parse = require("url").parse;
var querystring = require("querystring");
var list = []
http.createServer(function (req, res) {
	const method = req.method;
	console.log(method)
	let item = ''
	console.log(req.query)
	// res.setHeader('Content-Type', 'text/html');
	if (method === 'POST') {
		req.setEncoding('utf8'); // 
		req.on('data', function (chunk) {
			console.log(chunk);
			item += chunk;
		})
		req.on('end', function () {
			list.push(item)
			res.setHeader('Content-Length', item.length);
			res.end(item);
		})
	} else if (method === 'DELETE') {
		var path = parse(req.url).pathname;
		var i = parseInt(path.slice(1), 10); // 转为数字
		if (isNaN(i)) {
			res.statusCode = 400;
			res.end('Invalid input')
		} else if (!list[i]) {
			res.statusCode = 404;
			res.end('Item not find')
		} else {
			list.splice(i, 1);
			res.end('Ok\n');
		}
	} else if (method === 'GET'){
		var path = parse(req.url).pathname;
		if (path.slice(1) === 'list') {
			// 获取列表
			list.forEach(function (item, index) {
				res.write(index + 1 + ')' + item);
				res.write('\n');
			})
			res.end()
		} else {
			var arg = parse(req.url).query;
			// 反解析 url 字符
			var params = querystring.parse(arg);
			if (isNaN(params.id)) {
				res.statusCode = 400;
				res.end('Invalid input')
			} else if (!list[params.id]) {
				res.statusCode = 404; 
				res.end('Item not find')
			} else {
				// list.splice(i, 1);
				res.end(list[params.id]);
			}
		}
	}
}).listen(3000)
console.log("服务器搭建成功")
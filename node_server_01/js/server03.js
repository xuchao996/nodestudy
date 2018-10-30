/*
 * @date 2018-10-17
 * @auther xuchao
 * @des todo list
*/

var utils = require('../utils/utils.js');

var http = require('http');
var qs = require('querystring');
var list = ['要吃饭'];
var server = http.createServer(function (req, res) {
	var method = req.method;
	switch (method) {
		case 'GET':
		var html = utils.show(list)
		res.setHeader('Content-Type', 'text/html');
		res.setHeader('Content-Length', Buffer.byteLength(html));
		res.end(html)
		break;
		case 'POST':
		var item = ''
		req.setEncoding('utf-8');
		req.on('data', function (chunk) {
			item += chunk
		})
		req.on('end', function (){
			// console.log(item)
			list = utils.post(qs.parse(item).item, list)
			var html = utils.show(list)
			res.setHeader('Content-Type', 'text/html');
			res.setHeader('Content-Length', Buffer.byteLength(html));
			res.end(html)
		})
		break;
		case 'DELETE':
		list = utils.del(list)
		var html = utils.show(list);
		res.setHeader('Content-Type', 'text/html');
		res.setHeader('Content-Length', Buffer.byteLength(html));
		res.end(html);
		default:
		break;
	}
})
server.listen(3000);
console.log('the server is run localhost:3000 ')

// 问题1: 刷新重复调缓存接口
// 数据缓存
// P 81

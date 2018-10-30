var http = require("http");
http.createServer(function (req, res) {
	// res.end('<h1>hello world</h1>');
	var url = 'http://goolge.com'
	var body = '<p>Redirecting to <a href="' + url + '">' + url + '</a></p>'
	res.setHeader('Location', url);
	res.setHeader('Content-Length', body.length);
	res.setHeader('Content-Type', 'text/html');
	res.statusCode = 302;
	res.end(body);
}).listen(3000)
console.log("服务器搭建成功")
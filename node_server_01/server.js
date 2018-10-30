

var fs = require("fs");
var http = require("http");
var parse = require("url").parse;
var join = require('path').join;

// 文件目录路径
var root = __dirname;

// server
var server = http.createServer(function (req, res) {
	var url_name = parse(req.url)
	console.log(url_name.pathname);
	var path = join(root, url_name.pathname)
// 	fs.readFile(path, function (err, data) {
// 		if (err) return
// 		res.end(data)
// 	})
	var stream = fs.createReadStream(path);
	/*  */
	/* res.end() 会在 stream.pipe(res); 内部调用 */
	/*  */
// 	stream.on('data', function (chunk) {
// 		res.write(chunk);
// 	})
// 	stream.on('end', function () {
// 		res.end()
// 	})
	stream.pipe(res);
	stream.on('error', function (err) {
		res.write('the server is end')
		res.end()
	})
	// res.end(root + url_name.pathname)
})

server.listen(3000)
console.log('the server is running on port 3000')
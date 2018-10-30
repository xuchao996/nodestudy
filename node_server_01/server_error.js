
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
	fs.stat(path, function (err, stat) {
		if (err) {
			console.log(err)
			if (err.code === 'ENOENT') {
				res.code = 404
				res.end()
			} else {
				res.code = 500
				res.end()
			}
		} else {
			stream(path)
		}
	})
	function stream (path) {
		var stream = fs.createReadStream(path);
		/*  */
		/* res.end() 会在 stream.pipe(res); 内部调用 */
		/*  */
		stream.pipe(res);
		stream.on('error', function (err) {
			res.write('the server is end')
			res.end()
		})
	}

	// res.end(root + url_name.pathname)
})

server.listen(3000)
console.log('the server is running on port 3000')
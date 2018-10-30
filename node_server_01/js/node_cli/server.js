var http = require('http');
var path = require('path');
var fs = require('fs');

var args= process.argv.slice(2); // 截取参数
var commond = args.shift(); // 获取命令
var task_des = args.join(' '); // 拼接成一个字符
var file = path.join(process.cwd(), './task');

const tasks = ['add', 'list'];
switch (commond.toLowerCase()) {
	case 'add':
	addText(file, task_des)
	break;
	case 'list':
	showLists (file)
	break;
	default:
	showCommond(task_des);
	break;
}

function loadTasksList (file, fn) {
	fs.readFile(file, 'utf8', function (err, data) {
		if (err) throw err;
		var data = data.toString() || '[]'
		console.log(data, typeof data)
		data = JSON.parse(data)
		fn(data)
	})
}

// 增加任务
function addText (file, text) {
	loadTasksList(file, function (data) {
		// console.log(data);
		data.push(text);
		fs.writeFile(file, JSON.stringify(data), 'utf8', function (err) {
			if(err) throw err;
			console.log('Saved');
		})
	})
}

// 查看任务列表
function showLists (file) {
	loadTasksList(file, function (data) {
		console.log(data.join('\n'));
	})
}

// 命令
function showCommond (task_des) {
	console.log(`Usage ${process.argv[0]} ${tasks.join('|')} [${task_des}]`)
	return
}
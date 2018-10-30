/* 
  * @param list
  * returns html
 */
var show = function (list) {
	return `
		<html><head><title>todo List</title></head><body>
		<meta charset='utf-8'>
		<h1>Todo List</h1>
		<ul>
		${list.map(item => {
			return '<li>'+ item + '</li>'
		}).join('')}
		</ul>
		<form method='post' action='/'>
		<input type='input' name='item' /> <br />
		<input type='button' value='delete' />
		</form></body></html>
	`
}

/* 
  * @param item
  * @param list
  * @returns list
  * 
 */
var post = function (item, list) {
	list.push(item)
	return list
}

var del = function (list) {
	list.pop()
	return list
}

module.exports = {
	post: post,
	show: show
}

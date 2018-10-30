
var redis = require('redis');

var client = redis.createClient(6379, '127.0.0.1');

client.on('error', function (error) {
	if (error) throw error;
})
console.log('redis connect succeeded!')

client.set('color', 'red', redis.print);

client.get('color', function (err, value) {
	if (err) throw err;
	console.log('Value: ' + value)
})


// hash example
client.hmset('camping', {
	'color1': 1,
	'color2': 2
})

client.hget('camping', 'color1', redis.print);

client.hkeys('camping', function (err, keys) {
	if (err) throw err;
	keys.forEach(function (item) {
		console.log(item);
	})
})

// list
// 数据量过大时，影响性能
client.lpush('tasks', '321');
client.lpush('tasks', '123');
client.lrange('tasks', 0, -1, function (err, items) {
	if (err) throw err;
	items.forEach(function (item, i) {
		console.log(i + ')' + item)
	})
})

// 集合
client.sadd('ip', '127.0.0.1');
client.sadd('ip', '127.0.0.1');
client.sadd('ip', '127.0.0.3');
client.smembers('ip', function (err, members) {
	if (err) throw err;
	console.log(members);
})

// line 122
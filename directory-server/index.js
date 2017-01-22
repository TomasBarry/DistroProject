// define imports
const net = require('net');

// define constants
const port = process.argv[2] || 8000;

var server = net.createServer((socket) => {
	socket.on('data', (data) => {
		let message = data.toString();
		console.log('Received: ' + message);
	});

	socket.on('close', (had_err) => {
		console.log('Socket closed');
	});
	socket.on('error', (err) => {
		console.log('Socket error');
	});
});

server.on('error', (err) => {
	console.log('Server error: ' + err.toString());
});

server.listen(port, () => {
	console.log('Listening on port: ' + port);
});

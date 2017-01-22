// define imports
const net = require('net');

const file_servers = require('./file_servers.js');

// define constants
const port = process.argv[2] || 8000;


var server = net.createServer((socket) => {

	socket.on('data', (data) => {
		let message = data.toString();
		console.log('Received: ' + message);
		if(message.indexOf('GET') === 0) {
			let args = message.split(':');
			file_servers.fileserver1.socket.write('GET\n' + args[1]);
			file_servers.fileserver1.socket.on('data', (data) => {
				console.log(data);
				socket.write(data);
			});
		}
		else if(message.indexOf('PUT') === 0) {
			let args = message.split(':');
			for(var server in file_servers) {
				file_servers[server].socket.write('PUT\n' + args[1] + '\n' + args[2]);
			}
			socket.write('File written');
		}
	});

	socket.on('close', (had_err) => {
		console.log('Socket closed');
	});
	socket.on('error', (err) => {
		console.log('Socket error ' + err);
	});
});

server.on('error', (err) => {
	console.log('Server error: ' + err.toString());
});

server.listen(port, () => {
	console.log('Listening on port: ' + port);
});

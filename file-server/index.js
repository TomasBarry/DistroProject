const net = require('net');
const file_server = require('./file-server.js');


const port = process.argv[2];


var server = net.createServer((socket) => {

	socket.on('data', (data) => {
		let message = data.toString();
		console.log('Received ' + message);
		if (message.indexOf('GET') === 0) {
			file_server.getFile(socket, message);
		}
		else if (message.indexOf('PUT') === 0) {
			file_server.putFile(socket, message);
		}
		else if (message.indexOf('LIST') === 0) {
			file_server.listFiles(socket, message);
		}
		else {
			file_server.undefinedCommand(socket, message);
		}
	});
	socket.on('close', (had_err) => {
		console.log('Socket closed');
	});
	socket.on('error', (err) => {
		console.log('Socket error');
	});
});


server.on('error', (err) => {
	console.log('server error');
});


server.listen(port, () => {
	console.log('Listening on port: ' + port);
});

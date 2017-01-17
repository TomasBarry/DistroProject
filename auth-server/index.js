const net = require('net');
const crypto = require('crypto');
const fs = require('fs');

const auth_server = require('./auth-server.js');

const port = process.argv[2];


var server = net.createServer((socket) => {

	socket.on('data', (data) => {
		let message = data.toString();
		console.log('Received ' + message);
		if (message.indexOf('ADD') === 0) {
			auth_server.addUser(socket, message);
		}
		else if (message.indexOf('PUBLIC') === 0) {
			auth_server.getPublicKey(socket, message);
		}
		else if (message.indexOf('REVOKE') === 0) {
			auth_server.removeUser(socket, message);
		}
		else {
			auth_server.undefinedCommand(socket, message);
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

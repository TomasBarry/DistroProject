// Define imports
const net = require('net');
const auth_socket = require('net').Socket();
const dir_socket = require('net').Socket();

const file_server = require('./file-server.js');
const socketVariables = require('./socketVariables.js');
const encryption_handler = require('./encryption_handler.js');

// define constants
const port = process.argv[2] || 8000;
const file_server_name = process.arg[3];                               


// Register with Auth Server and directory server
auth_socket.connect(socketVariables.auth_serverPort, socketVariables.auth_serverIPAddress);
auth_socket.write('ADD\nfileserver' + file_server_name + '\n' + publicKey);
auth_socket.close();

dir_socket.connect(socketVariables.dir_serverPort, socketVariables.dir_serverIPAddress);
dir_socket.write('TODO');
dir_socket.close();

// create server object
var server = net.createServer((socket) => {
	
	// handler for when socket receives data
	socket.on('data', (data) => {
		let message = encryption_handler.decrypt(data.toString()); 
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
		else if (message.indexOf('LIVE') === 0) {
			file_server.heartbeat(socket, message);
		}
		else {
			file_server.undefinedCommand(socket, message);
		}
	});
	// handler for when socket is closed
	socket.on('close', (had_err) => {
		console.log('Socket closed');
	});
	// handler for when socket closes due to error
	socket.on('error', (err) => {
		console.log('Socket error');
	});
});

// handler for when server closes due to error
server.on('error', (err) => {
	console.log('server error');
});


// start the server on the specified port
server.listen(port, () => {
	console.log('Listening on port: ' + port);
});

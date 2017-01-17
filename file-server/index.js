// Define imports
const net = require('net');

const init_handler = require('./init.js');
const file_server = require('./file-server.js');
const socketVariables = require('./socketVariables.js');
const encryption_handler = require('./encryption_handler.js');

// define constants
const port = process.argv[2] || 8000;


// Register with Auth Server and directory server
init_handler.init();

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
	console.log('server error: ' + err.toString());
});


// start the server on the specified port
server.listen(port, () => {
	console.log('Listening on port: ' + port);
});

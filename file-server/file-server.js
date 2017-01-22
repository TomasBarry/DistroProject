const fs = require('fs');
const auth_socket = require('net').Socket();
const socket_variables = require('./socket_variables.js');
auth_socket.connect(socket_variables.auth_server_port, socket_variables.auth_server_IP_address);
let pubkeys = {};

auth_socket.on('data', (data) => {
	let lines = data.split('\n');
	let bytes = base64.decode(lines[2]);
	pubkeys[1] = utf8.decode(bytes);
});

const file_server = {

	listFiles: function(socket, message) {
		let request = {
			command: message[0],
			username: message[1]
		};
		auth_socket.write('GET\n' + username);
		fs.readdir(__dirname + '/Files/', (err, files) => {
			if (err) {
				socket.write('Error reading files in /Files/');
			}
			else {
				socket.write(files.toString());
			}
		});
	},

	getFile: function(socket, message) {
		let args = message.split('\n');
		let fileName = args[1].trim();
		console.log(fileName);
		fs.readFile(__dirname + '/Files/' + fileName, (err, data) => {
			if (err) {
				socket.write('Error reading file: ' + err);
			}
			else {
				socket.write(data);
			}
		});
	},

	putFile: function(socket, message) {
		let args = message.split('\n');
		let fileName = args[1].trim();
		let fileData = args[2].trim();
		fs.writeFile(__dirname + '/Files/' + fileName, fileData, (err) => {
			  if (err) {
				socket.write('Error writing file');
			  }
			  else {
				socket.write('Write successful');
			  }
		});
	},

	heartbeat: function(socket, message) {
		socket.write('I am alive');
	},

	undefinedCommand: function(socket, message) {
		socket.write('Could not understand command');
	}
};


module.exports = file_server; 


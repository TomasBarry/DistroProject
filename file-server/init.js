const fs = require('fs');
const auth_socket = require('net').Socket();
const dir_socket = require('net').Socket();

const socket_variables = require('./socket_variables.js');

const file_server_name = process.argv[3];
const public_key = fs.readFileSync(__dirname + '/pubkey.pem', 'utf8');

const init = {
	init: function() {
		console.log('Initializing file server');
		console.log('Public Key: ' + public_key);
		auth_socket.connect(socket_variables.auth_server_port, socket_variables.auth_server_IP_address);
		auth_socket.write('ADD\nfileserver' + file_server_name + '\n' + public_key);
//		auth_socket.destroy();

		//dir_socket.connect(socketVariables.dir_serverPort, socketVariables.dir_serverIPAddress); 
		//dir_socket.write('TODO');
		//dir_socket.destroy();
		console.log('File server initialized');
	}
};

module.exports = init;

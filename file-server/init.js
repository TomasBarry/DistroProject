const fs = require('fs');
const auth_socket = require('net').Socket();
const dir_socket = require('net').Socket();

const socketVariables = require('./socketVariables.js');

const file_server_name = process.argv[3];
const publicKey = fs.readFileSync(__dirname + '/pubkey.pem', 'utf8');


const init = {
	init: function() {
		auth_socket.connect(socketVariables.auth_serverPort, socketVariables.auth_serverIPAddress);
		auth_socket.write('ADD\nfileserver' + file_server_name + '\n' + publicKey);
		auth_socket.destroy(); 

		//dir_socket.connect(socketVariables.dir_serverPort, socketVariables.dir_serverIPAddress); 
		//dir_socket.write('TODO');
		//dir_socket.destroy();
	}
};

module.exports = init;

const net = require('net');
const crypto = require('crypto');
const fs = require('fs');

const auth_server = require('./auth-server.js');

const port = process.argv[2];

//var str = 'hello there';

//var publicKey = fs.readFileSync(__dirname + '/pubkey.pem', "utf8");
//var privateKey = fs.readFileSync(__dirname + '/privkey.pem', 'utf8');
//var encBuffer = new Buffer(str);
//var encrypted = crypto.publicEncrypt(publicKey, encBuffer);

//var decBuffer = new Buffer(encrypted, "base64");
//var decrypted = crypto.privateDecrypt(privateKey, decBuffer);


//console.log(str);
//console.log(encrypted.toString("base64"));
//console.log(decrypted.toString("utf8"));


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

const crypto = require('crypto');
const fs = require('fs');

const publicKey = fs.readFileSync(__dirname + '/pubkey.pem', 'utf8');
const privateKey = fs.readFileSync(__dirname + '/privkey.pem', 'utf8');

const handler = {
	decrypt: function(message) {
		let decBuffer = new Buffer(message, "base64");
		return crypto.privateDecrypt(privateKey, decBuffer);
	},

	encrypt: function(message) {
		let encBuffer = new Buffer(message);
		return crypto.publicEncrypt(publicKey, encBuffer);
	}
};

module.exports = handler;


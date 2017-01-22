const crypto = require('crypto');
const fs = require('fs');

const public_key = fs.readFileSync(__dirname + '/Keys/pubkey.pem', 'utf8');
const private_key = fs.readFileSync(__dirname + '/Keys/privkey.pem', 'utf8');

const handler = {
	decrypt: function(message) {
		console.log('here:\n' + message);
		let enc_buffer = new Buffer(message, "base64");
		return crypto.privateDecrypt(private_key, enc_buffer).toString('utf8')
	},

	encrypt: function(message) {
		let enc_buffer = new Buffer(message);
		return crypto.publicEncrypt(public_key, enc_buffer);
	}
};

module.exports = handler;


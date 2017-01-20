const base64 = require('base-64');
const utf8 = require('utf8');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/auth'; 

function parseValues(message) {
	let lines =  message.split('\n');
	return {
		
	};
};

const auth_server = {

	addUser: function(socket, message) {
		console.log('New User:\n' + message);
		let command = message.substring(0, message.indexOf('\n'));
		let user = message.substring(command.length + 1, message.indexOf('\n', command.length + 1));
		let pk = message.substring(command.length + user.length + 2);
		let bytes = utf8.encode(pk);
		let pubkey = base64.encode(bytes);
		MongoClient.connect(url, (err, db) => {
			let collection = db.collection('userkeys');
			let newDoc = {_id: user, pubkey: pubkey};
			collection.insert(newDoc, (err, result) => {
				db.close();
				socket.write('You have been added');
			});
		});
	},

	getPublicKey: function(socket, message) {
		console.log('Key Request:\n' + message);
		let lines = message.split('\n');
		let request = {
			command: lines[0],
			user: lines[1]
		};
		MongoClient.connect(url, (err, db) => { 
			let collection = db.collection('userkeys');
			collection.findOne({_id: request.user}, (err, result) => {
				db.close();
				socket.write('PUBKEY\n' + result.pubkey);
			});
		});
	},

	removeUser: function(socket, message) {
		let lines = message.split('\n');
		let request = {
			command: lines[0],
			user: lines[1]
		};
		MongoClient.connect(url, (err, db) => { 
			let collection = db.collection('userkeys');
			collection.deleteOne({_id: request.user}, (err, result) => {
				db.close();
				socket.write('You have been removed');
			});
		});
	},

	undefinedCommand: function(socket, message) {
		socket.write('Unknown command');
	}
};

module.exports = auth_server;

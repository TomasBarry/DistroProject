const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/auth'; 

function parseValues(message) {
	let lines =  message.split('\n');
	return {
		
	};
};

const auth_server = {

	addUser: function(socket, message) {
		let lines = message.split('\n');
		let request = {
			command: lines[0],
			user: lines[1],
			pubkey: lines[2]
		};
		MongoClient.connect(url, (err, db) => {
			let collection = db.collection('userkeys');
			let newDoc = {_id: request.user, pubkey: request.pubkey};
			collection.insert(newDoc, (err, result) => {
				db.close();
				socket.write('You have been added');
			});
		});
	},

	getPublicKey: function(socket, message) {
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

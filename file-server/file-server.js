const fs = require('fs');

const file_server = {

	listFiles: function(socket, message) {
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

	undefinedCommand: function(socket, message) {
		socket.write('Could not understand command');
	}
};


module.exports = file_server; 


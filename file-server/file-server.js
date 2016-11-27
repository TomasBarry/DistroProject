const fs = require('fs');

const file_server = {

	getFile: function(socket, message) {
		let args = message.split('\n');
		let fileName = args[1].trim();
		console.log(fileName);
		fs.readFile(fileName, function(err, data) {
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
		fs.writeFile(fileName, fileData, (err) => {
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


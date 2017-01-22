const exec = require('child_process').exec;

const heartbeat = {
	init: function() {
		exec('node ', (error, stdout, stderr) => {
			if (error) {
				console.error('exec error: ${error}');
				return;
			}
			console.log('stdout: ' + stdout);
			console.log('stderr: ' + stderr);
		});
	}
};

module.exports = heartbeat;

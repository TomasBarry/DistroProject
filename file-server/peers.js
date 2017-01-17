// peers consist of directory servers and file servers with (IP, port) tuples
// only peers in this file will be allowed to dictate file server actions
const peers = {
	directory_servers: [
		("10.62.0.248", 8000)
	],
	file_servers: []	
};

module.exports = peers;

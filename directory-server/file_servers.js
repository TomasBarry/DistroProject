let file_servers = {
	fileserver1: {
		ip: '10.62.0.247',
		port: 8000
	}
};

for (var server in file_servers) {
	let s = file_servers[server];
	let conn = require('net').Socket();
	conn.connect(s.port, s.ip);
	s['socket'] = conn;
}

module.exports = file_servers;

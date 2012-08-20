
	var winstond = require('winstond');
	var nssocket = winstond.nssocket;

	var server = nssocket.createServer({
		services: ['collect', 'query', 'stream'],
		port: 9000
	});

	server.add(winstond.transports.File, {
		filename: '../server_logs/test2.log'
	});

	server.listen();

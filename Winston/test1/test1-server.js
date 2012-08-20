
	var winstond = require('winstond');
	var nssocket = winstond.nssocket;

	var server = nssocket.createServer({
		services: ['collect', 'query', 'stream'],
		port: 9000
	});

	server.add(winstond.transports.Console);

	server.add(winstond.transports.File, {
		filename: '../server_logs/test1.log'
	});
	
	var fallbackServer = winstond.nssocket.createServer({
		services: ['collect', 'query', 'stream'],
		port: 9001
	});

	server.listen();

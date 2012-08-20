
	var winstond = require('winstond');
	var nssocket = winstond.nssocket;

	var server = nssocket.createServer({
		services: ['collect', 'query', 'stream'],
		port: 9000
	});

	server.add(winstond.transports.Console);

	server.add(winstond.transports.File, {
		filename: __dirname + '/server_logs/test1.log'
	});

	server.listen();

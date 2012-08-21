
	// Dependencies
	var winstond    = require('winstond');


	// Creating 2 sockets
	var nssocketIn  = winstond.nssocket;
	var nssocketOut = winstond.nssocket;


	// Creating a winstond server
	var server = nssocketIn.createServer({
		services: ['collect', 'query', 'stream'],
		port: 9000
	});


	// Every log data receives will be display on the console
	server.add(winstond.transports.Console);


	// And every log data, will be forwarded to a centralized server
	server.add(winstond.nssocket, {
		host : "192.168.1.64",
		port : 9010
	});


	// Finally, we just listen to new requests
	server.listen();

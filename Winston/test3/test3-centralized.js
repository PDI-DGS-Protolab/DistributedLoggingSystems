
	// Dependencies
	var winstond    = require('winstond');


	// Creating the socket
	var nssocket  = winstond.nssocket;


	// Creating a winstond server
	var server = nssocket.createServer({
		services: ['collect', 'query', 'stream'],
		port: 9010
	});


	// Every log data receives will be display on the console
	server.add(winstond.transports.File, {
		filename : "../server_logs/test4_centralized.log"
	});


	// Finally, we just listen to new requests
	server.listen();

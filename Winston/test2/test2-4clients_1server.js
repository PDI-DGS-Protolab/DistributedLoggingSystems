
	// Dependencies

	var winston  = require('winston');


	// Local vars

        var mainSocket = require('winston-nssocket').Nssocket;   // Creation of a socket to communicate with the server and send the data


	// Main Winston logger instance
	
	var logger = new winston.Logger({
	        exitOnError: false,

        	transports: [	// Displaying in the console the log info in json format
        	        new winston.transports.Console(),
	        ],

	});

        logger.add(mainSocket, {
                host : '192.168.1.64',
                port : 9000
        });


	var TIME = 1000;
	var NAME = 'Put your name here, please';

	function sendData() {
		//var random = Math.abs(Math.random() * 10);

		//for (var i=0; i<random; i++) {
		for (var i=0; i < 20000; i++) {
			logger.info('Testing logging', { name : NAME, iteration : i });
		}

		logger.warn('Testing finished during this ' + TIME + 'miliseconds', { name : NAME });
	}	

	setInterval(sendData, TIME);

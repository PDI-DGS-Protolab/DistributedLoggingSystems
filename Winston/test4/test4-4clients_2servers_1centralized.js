
	// Dependencies

	var winston  = require('winston');
	var nssocket = require('winston-nssocket');


	// Creation of 2 sockets to communicate with the server and send the data

        var mainSocket     = require('winston-nssocket').Nssocket;   
        var fallbackSocket = require('winston-nssocket').Nssocket;


	// Fallback Winston logger instance in case of server crash

	var fallbackLogger = new winston.Logger({
		exitOnError: false,

        	transports: [	// Displaying in the console the log info in json format
        	        new winston.transports.Console({ json : true }),
	        ]

	});

        fallbackLogger.add(fallbackSocket, {
                host : '192.168.1.64',
                port : 9010
        });


	// Main Winston logger instance
	
	var oldLog;
	var logger = new winston.Logger({
	        exitOnError: function() {   // In case of communication error due to a server crash, we use the fallbackLogger
			oldLog = logger;
			logger = fallbackLogger;
			return false;
		},

        	transports: [	// Displaying in the console the log info in json format
        	        new winston.transports.Console(),
	        ]
	});

	oldLog = logger;


        logger.add(mainSocket, {
                host : '192.168.1.62',
                port : 9000
        });


	var TIME = 1000;
	var NAME = 'Put your name here, please';

	function sendData() {
		for (int i=0; i<10; i++) {
			if (random > 0.8) {
				logger.debug('Too high random number', { name : NAME, iteration : i });
			} else if (random < 0.2) {
				logger.warn('Too low random number', { name : NAME, iteration : i });
			} else {
				logger.info('Good random number', { name : NAME, iteration : i });
			}
		}

		logger.error('Testing finished correctly, but testing \'error\' level too! ', { name : NAME });
	}	

	setInterval(sendData, TIME)


	// Dependencies

	var winston  = require('winston');
//	var nssocket = require('winston-nssocket');


	// Local vars

        var mainSocket     = require('winston-nssocket').Nssocket;   // Creation of 2 sockets to communicate with the server and send the data
        var fallbackSocket = require('winston-nssocket').Nssocket;

	var logsDir = "../client_logs/";


	// Fallback Winston logger instance in case of server crash

	var fallbackLogger = new winston.Logger({

		exitOnError: false,

	       	transports: [	// We will save the log info on a local file too
        	        new winston.transports.File({ filename : logsDir + 'test1-fallback.log' })
		]

	});

        fallbackLogger.add(fallbackSocket, {
                host : '192.168.1.64',
                port : 9000
        });


	// Main Winston logger instance
	
	var oldLog;
	var logger = new winston.Logger({
//		exitOnError: false,
	        exitOnError: function() {   // In case of communication error due to a server crash, we use the fallbackLogger
			oldLog = logger;
			logger = fallbackLogger;
			console.log("ERRRRROR!");
			return false;
		},

        	transports: [	// Displaying in the console the log info in json format
        	        new winston.transports.Console(),
        	        new winston.transports.File({ filename : logsDir + 'test1.log' })
	        ],

	        exceptionHandlers: [	// Adding a new file to save info about uncaught exceptions
        	        new winston.transports.File({ filename : logsDir + 'test1-exceptions.log' })
	        ]

	});

	oldLog = logger;


        logger.add(mainSocket, {
 //               host : '192.168.1.64',
                host : 'localhost',
                port : 9000
        });


	function sendData() {
		var random = Math.random();

		var metadata = {
			number : random
		};

		if (random > 0.8) {
			logger.debug('Too high randon number', metadata);
		} else if (random < 0.2) {
			logger.warn('Too low random number', metadata);
		} else {
			logger.info('Good random number!', metadata);
		}
		
	}

	setInterval(sendData, 1000);



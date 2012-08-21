Winston
===========================


## Description

Winston is an asynchronous, minimalist distributed logger written in JavaScript to be used in Node.js environments. Nowadays, the development of Winston still needs to grow in order to improve the tool, but it has a great future. Some of the main features are:

* Stream-oriented logger with a quite simple API and a minimalist approach
* Extremely flexible tool which lets you add or remove plugins, destinations or fallbacks dinamically
* Great collection of plugins to connect with MySQL and several NoSQL databases such as Mongo, Redis, Riak, and SimpleDB
* Supports (or will) native features of querying logs by message fields



## How it works?

### Installation

It does not need any config file or setting up except from being installed in your Node instance. For doing that, just type this command in your terminal:

```bash
  sudo npm install winston winstond
```

At this moment, you will have Winston and a sort of set of extending features called Winstond to make more powerful your logger.


### Client-side code

To start using with Winston, you can use some of the following snippets:

```javascript
  /* Importing Winston library */
  var winston = require('winston');


  /* This is the most basic way */
  winston.add(winston.transports.File, { filename: 'somefile.log' });

  winston.info('Hello again distributed logs');
  winston.warn('Warning: running out of memory...');
  winston.error('Ooops, this should not be happening...');
  winston.debug('DEBUG: the value of the variable is: ' + myVar);


  /* This is a more complex but much better way */
  var logger = new winston.Logger({
      exitOnError: function() {
          // Callback in case of an error
      },

      transports: [   // The elements which will receive our logs
          new winston.transports.Console(),
          new winston.transports.File({ filename : 'file-json.log' })
          new winston.transports.File({ filename : 'file-plain.log', json : false })
          new winston.transports.Couchdb({ host : 'localhost', db : 'logs' })
          new winston.transports.Riak({ bucket : 'logs' })
          new winston.transports.MongoDB({ db : 'db', level : 'info' })
      ],

      exceptionHandlers: [   // The elements that will store uncaught exceptions
          new winston.transports.File({ filename : 'file-exceptions.log' })
      ]
  });

  logger.info('Winston is amazing!');
  // Also with 'warn', 'error' and 'debug' methods
```

### Server-side code

You just need to create a server with the port number you want to listen to
and the transports.

```javascript

  /* Importing Winstond library and creating a NSSocket */
  var winstond = require('winstond'),
      nssocket = winstond.nssocket;

  /* Creating the server */
  var server = nssocket.createServer({
         services : ['collect', 'query', 'stream'],
         port : 9000
      });

  /* Adding a transport to display received logs */
  server.add(winstond.transports.Console);

  /* Listening to client messages */
  server.listen();
```



## Testing Winston

We implemented 4 tests trying to discover the real behaviour of the tool in
the following situations:

* 'A' logs messages to 'B' with connection errors
* 4 instances of 'A' logs messages to 'B' at the same time
* Complex architecture where 'A' logs to 'B' and it forwards messages to 'C'
* Querying log files


### Test 1 - 'A' logs messages to 'B' with connection errors
The first test consisted on sending a random number from 'Alice' to 'Bob' every second. Depending on the number value, the log would have a different category (info, warn, or debug). While the client keeps sending events, we disconnected manually the server and relaunched the instance to check out the behaviour and see if it supports automatic reconnection or if it is necessary to implement on the client-side a small fallback policy.

The test **FAILED**, so we needed to create another instance of the logger, assign the primary logger to the fallback one, and keep on using this one in the whole application. Even although the idea of using a fallback logger was right, we appreaciate some of the messages were lost during the switch.


### Test 2 - Stress test with 4 clients simultaneously
The second test was tried to test the performance of the server. We had 4
machines in local network logging 20,000 messages per second, per machine.

The test **PARTIALLY FAILED** because the messages were sent correctly but
Winston orders the logs by the timestamp of arrival (not the event timestamp on client-side, which should be more correct), and also it uses a kind of buffer. Therefore, the results obtained were lists of 10,000 consecutive messages from the same client. It works, but not on the way we expected because we should have logs with interspersed messages.


### Test 3 - Forwarding messages in a complex architecture
In the third test, we tried to create a more complex architecture, using 4
clients which send events to 2 different, intermediate servers. Finally, these
two had to forward everything to a final centralized server.

The test **FAILED** because after been doing several tries, we saw that
Winston does not support these kind of architectures, which nowadays limit the
technology just to small projects and developments.


### Test 4 - Querying logs
The last test consisted on an easy script made to read the data information stored on a log file and filter by some field property.

The test **FAILED** due to we used several queries in order to obtain different information but we just obtained the same results, which are the first 10 lines. This could be happening because of an undetected or not fixed bug. But the feature will be addressed, so we insist on the importance of having a logging system with which incorporates a native querying feature, which is not present in the rest of the other distributed logging tools.



## Conclusions

After doing the test described below, we think of Winston will probably be a great and succesful technology in the future.

We love the simpleness and flexibility provided by the tool due to the API
design. However, Winston nowadays lacks of a proper, reliable and powerful system to
transmit information with security.

* We have detected logs with duplicates
* We could not reconnect automatically after a network failure, so we had to
  used a fallback logger with the same setup but different port number
* Some messages were lost when the network failed during the interval switching to the fallback
* Also, we have detected bugs when querying log files, which is a quite
  interesting feature but seems to be untested, or at least, unfinished

We are sure that Winston will be great, but it is not ready to be used in
enterprise or major community developments.


### About

- [Winston](https://github.com/flatiron/winston/) repo in GitHub
- [Winstond](https://github.com/flatiron/winstond/) repo in GitHub
- [Nodejitsu official website](http://nodejitsu.com/), the authors of Winston


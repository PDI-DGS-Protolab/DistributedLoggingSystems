Winston
===========================


## Description

Winston is an asynchronous, minimalist distributed logger written in JavaScript to be used in Node.js environments. Nowadays, the development of Winston still needs to grow in order to improve the tool, but it has a great future. Some of the main features are:

* Stream-oriented logger with a quite simple API and a minimalist approach
* Extremely flexible tool which lets you add or remove plugins, destinations or fallbacks dinamically
* Great collection of plugins to connect with MySQL and several NoSQL databases such as Mongo, Redis, Riak, and SimpleDB
* Supports (or will) native features of querying logs by message fields



## How it works?

It does not need any config file or setting up except from being installed in your Node instance. For doing that, just type this command in your terminal:

```bash
  sudo npm install -g winston winstond
```

At this moment, you will have Winston and a sort of set of extending features called Winstond to make more powerful your logger.

To start using with Winston, you can use some of the following snippets:

```javascript
  /* Importing Winston library */
  var winston = require('winston');


  /* This is the most basic way */
  winston.add(winston.transports.File, { filename: 'somefile.log'  });

  winston.info('Hello again distributed logs');
  winston.error('Ooops, this shouldn't be happening...');


  /* This is a more complex but better way */
  var logger = new winston.Logger({
      exitOnError: function() {
          // Callback in case of an error
      },

      transports: [   // The elements which will receive our logs
          new winston.transports.Console(),
          new winston.transports.File({ filename : 'file-json.log' })
          new winston.transports.File({ filename : 'file-plain.log', json : false })
          new winston.transports.Couchdb({ 'host' : 'localhost', 'db' : 'logs' })
          new winston.transports.Riak({ bucket: 'logs' })
          new winston.transports.MongoDB({ db: 'db', level: 'info' })
      ],

      exceptionHandlers: [   // The elements that will contain stored messages about uncaught exceptions
          new winston.transports.File({ filename : ''file-exceptions.log'  })
      ]
  });

  logger.info('Winston is amazing!');
```



## Testing Winston

We implemented 3 different tests to check out the features provided by
Fluentd. The tests were developed in a local network but we tried to simulate
a proper real environment sending and delivering a very high amount of
data information.


### Test 1
The first test consisted on sending from 'Alice' to 'Bob' 1000 messages in a
loop with different data (changing only the iteration number).

The test was OK and we could see that logging messages with Fluentd is as simple as log4j


### Test 2
The second test was pretty similar but we tried to deliver a higher amount of
data using 2 threads. Each of them logged 100 or 150 messages (depending on
the Thread ID) to different machines connected in a distributed system.

The test was OK and Fluentd allows to implement correctly complex
architectures of nodes


### Test 3
The last test was implemented to test the reliability of the tool several
times. We used 1000 threads and each of them tried to log again 100 or 150 messages but this
time we send data from 'Alice' to 'Bob', and 'Bob' sends every log received to 'Charles'.

Also, while the data were streamed, we tried to disconnect manually the network
connection and see what happens with the information that could not get the
destination, either if the destination were 'Bob' or 'Charles'.

The test FAILED PARTIALLY. Fluentd supports a mechanism to store the logs
missed in a circular message queue of messages waiting to be delivered when it
is possible. The problem is the mechanism is not reliable at 100% due to some
of the messages were lost. However, we did not detect duplicate messages in
our tests, so we still consider Fluentd an interesting technology which presents a remarkable performance.



## Conclusions

We are sure that Winston will probably be a great and succesful technology.

However, Winston nowadays lacks of a proper, reliable and powerful system to
transmit information with security. It send logs with duplicates


### About

- [Winston](https://github.com/flatiron/winston/)
- [Winstond](https://github.com/flatiron/winstond/)


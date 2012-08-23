Test 3 - Code
===========================

This test is using Flume NG so we are not talking about master and slaves any
more. Instead, everything is an agent.

### Setup Flume

We need to setup the config file on every machine we use. Open your terminal
and type:

```bash
  cd flume

  # Open you favorite text editor
  vi conf/flume.conf
```

We want to have 2 agents for the test, 'Alice' and 'Bob'.

Alice will send messages to 'Bob', which is on the IP 192.168.1.79 and port number 55555
Bob will be listening to any message received by anyone and will output it on its console

To see the rest of the config file, please open [**conf/flume.conf**](https://github.com/oil-conwet/DistributedLoggingSystems/blob/master/Flume/test3-code/conf/flume.conf)


```plain
  # Both sources are bounded to every request message

  # Alice's sink is pointing to Bob
  alice.sinks.snk1.channel = ch2
  alice.sinks.snk1.type = avro
  alice.sinks.snk1.hostname = 192.168.1.79
  alice.sinks.snk1.port = 55555

  # Bob's sink is a console
  bob.sinks.log-sink1.channel = ch1
  bob.sinks.log-sink1.type = logger
```


### Running agents

Now, it is the moment to launch both agents on different machines

```bash
  # On the first machine
  bin/flume-ng agent -n alice -c conf/ -f conf/flume.conf

  # On the second, different machine
  bin/flume-ng agent -n bob -c conf/ -f conf/flume.conf
```


### Logging events from Java code

Finally, here is the sample code used by 'Alice' to log some events.
The idea is that 'Alice' creates a RPC instance to send data to localhost, and
the flume agent takes and delivers that data to 'Bob' using the paramenters
specified on *conf/flume.conf*

```java
  /* Creating an RPC logger */
  RpcClient c = RpcClientFactory.getDefaultInstance("localhost", 55554);

  /* Logging an event */
  String s = "Hello! this is an event"
  Event e = EventBuilder.withBody(s.getBytes());
  c.append(e);
```


But, to make more simple the use of Flume, as you could see on **src/Test.java**, we have developed a little API just to increase the speed of small developments and rapid test.
Here you have an example of a logger which stores the events in a local file and sends them to a remote machine too:

```java
  /* Local file and RPC logger */
  Logger log = new Logger();
  log.addFileDestiny("/tmp/file.log");
  log.addRpcDestiny("localhost", 55554);

  /* Logging events */
  log.write("Hi! I'm using Flume to store this message on remote");
  log.close();
```


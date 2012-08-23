Test 4 - Code
===========================

As the previous one, this test is using Flume NG too, so we are not talking about master and slaves any more. Instead, everything is an agent.

The only difference between test 3 and 4 is the config file, because we added
a failover sink in case of an connection error.


### Setup Flume

If you open the config file, you would see that we only added these lines:

```plain
  # Both sources are bounded to every request message

  # Alice's sink is pointing to Bob
  alice.sinks.snk1.channel = ch2
  alice.sinks.snk1.type = avro
  alice.sinks.snk1.hostname = 192.168.1.79
  alice.sinks.snk1.port = 55555

  # Alice has a failover sink (himself )in case of connection errors
  alice.sinks.snk2.channel = ch2
  alice.sinks.snk2.type = avro
  alice.sinks.snk2.hostname = 127.0.0.1
  alice.sinks.snk2.port = 55554

  # Alice assign different priorities to her sinks
  alice.sinkgroups.group1.sinks= snk1 snk2
  alice.sinkgroups.group1.processor.type=failover
  alice.sinkgroups.group1.processor.priority.snk1=5
  alice.sinkgroups.group1.processor.priority.snk2=10
  alice.sinkgroups.group1.processor.maxpenalty=1000

  # Bob agent declared
  # (...)

  # Alice2 is declared with a sink with type 'logger'
```

Our idea is very simple:

1. Alice log events and sends them to her first sink, Bob
2. If not possible, Alice use the secondary sink, Alice2
3. Alice2, launched on the same machine that Alice, receives data and displays
   every message on the console


To see more details, please open the **conf/flume.conf** file and the test 3
description.


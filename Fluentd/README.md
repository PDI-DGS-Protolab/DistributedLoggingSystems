Fluentd
===========================


## Description

Fluentd is a distributed logging system written in Ruby which has the
following interesting features:

* Presents Java, Ruby, Python and PHP interfaces
* Stream-oriented, fault-tolerance delivering system
* Used with consoles, files, databases or data warehouse systems
* Supports Hadoop integration



## How it works?

First of all, you need to use the file 'config/fluent.conf' and include it on your fluentd installation. The following lines compose an example of what we did:

<match asd.*>
  type file
  path /home/johndoe/file.log
</match>

<match app.prueba>
  type forward
  host 192.168.1.65
  buffer_type file
  buffer_path /var/log/fluent/myapp-forward
  retry_limit 50
  flush_interval 10s
</match>

We stored our logs in a local file called 'file.log' with its absolute path, and also we tried to forward every received message to another host in our local network with some parameters such as the retries limit or the flush interval. You may modify them if you want to. And you can play with the entire config file because it is plenty of comments and examples.

After been setting up the system, it is time to code. To create an instance of a Fluentd log is as simple as:

```java
  private static FluentLogger LOG = FluentLogger.getLogger(tag, host, port);
```

where the arguments accepted by the factory method are:

1. The logger Tag or ID. In our case we use something simple like "app"
2. The destination host which could be "192.168.1.64"
3. The port number which could be 24224


Once you have declare the log, you must use either methods to log
messages:

```java
  /* 1st alternative: Declaring a key-value Map Object and logging the entire
  structure */
  Map<String, Object> data = new HashMap<String, Object>();
  data.put("from", "Alice");
  data.put("to", "Bob");
  LOG.log("testing", data);

  /* 2nd alternative: Just using a simple key and value, with no data structures */
  LOG.log("testing", "from", "Alice");
```



## Testing Flume

We implemented 3 different tests to check out the features provided by
Fluentd. The tests were developed in a local network but we tried to simulate
a proper real environment sending and delivering a very high amount of
data information.


### Test 1 - Simple test where 'A' logs messages to 'B'
The first test consisted on sending from 'Alice' to 'Bob' 1000 messages in a
loop with different data (changing only the iteration number).

The test was **OK** and we could see that logging messages with Fluentd is as simple as log4j


### Test 2 - Complex architecture with 'A', 'B' and 'C' and more traffic
The second test was pretty similar but we tried to deliver a higher amount of
data using 2 threads. Each of them logged 100 or 150 messages (depending on
the Thread ID) to different machines connected in a distributed system.

The test was **OK** and Fluentd allows to implement correctly complex
architectures of nodes


### Test 3 - Stress test with connections errors and forwardings
The last test was implemented to test the reliability of the tool several
times. We used 1000 threads and each of them tried to log again 100 or 150 messages but this
time we send data from 'Alice' to 'Bob', and 'Bob' sends every log received to 'Charles'.

Also, while the data were streamed, we tried to disconnect manually the network
connection and see what happens with the information that could not get the
destination, either if the destination were 'Bob' or 'Charles'.

The test **PARTIALLY FAILED**. Fluentd supports a mechanism to store the logs
missed in a circular message queue of messages waiting to be delivered when it
is possible. The problem is the mechanism is not reliable at 100% due to some
of the messages were lost. However, we did not detect duplicate messages in
our tests, so we still consider Fluentd an interesting technology which presents a remarkable performance.



## Conclusions

We think Fluentd is a great technology due to it offers a mix of power and
simpleness.

It lacks of a 100% reliable delivery messages system. Therefore, it is not the
most appropiate tool for critical situations when you need every message gets
their destination.

But if you does not need such a high reliability level or just you need a
powerful tool with an easy, fast configuration, Fluentd will fits quite well with your development



### About

- [Fluentd repo in Github](https://github.com/fluent/fluentd/)
- [Fluentd official website](http://fluentd.org/)
- [Treasure Data](http://www.treasure-data.com/), the company behind Fluentd


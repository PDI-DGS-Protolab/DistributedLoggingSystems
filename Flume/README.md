Flume
===========================


## Description

Flume is a distributed logging system written in Java by Cloudera. It is hosted by the Apache Software Foundation on the *Apache Incubator* project. It is by far, the most complex and complete system we have tested. The following features show the advantages of Flume over the rest of technologies:

* Stream-oriented logger with APIs for Java and Python
* Configure a node with code or with a separate text file, decoupled of the API.
* **Configure a whole system of logger nodes remotely** with a web interface or a shell interpreter (goodbye SSL on every machine to do a simple change!!)
* Supports **different levels of reliability**
* Supports **Hadoop integration** and HDFS
* Great collection of plugins to connect with databases (MySQL, MongoDB, HBase, Cassandra), data warehouse (Hive) or even Voldemort

Due to the high level of complexity reached by Flume, Cloudera thought a great refactoring was necessary and pertinent to make Flume easier to use and to integrate with other developmetns. The last version with the old philosophy was the version 0.9.4. After that point, Flume was renaming to Flume NG.

### Flume v0.9.3

The approach followed in this old version consisted on the creation of a
master to coordinate the actions that a set of slaves must or could perform


### Flume NG v1.2

In contrast to the old version, you will never work again with masters and
slaves. Instead, everything is an **agent**, an element which consists on:
* A collection of *sources*,  entities that receive information
* A collection of *sinks*, destinations that will send events to other sources
* A collection of *channels*, queues which store events until a sink
  takes and delivers them to another agent


## How it works?

On one hand, it is important to notice that still is quite recent and presents some limitations in the API. Also, it lacks of enough documentation, which is plenty of sections described with the ter "TBD" *(To Be Determined)*.
This is the cause to test both versions and see what were the changes carried out and what are the differences between both approaches.

On the other hand, Cloudera recommends to use Flume NG and indeed, it is much easier to use. Flume 0.9.x will be deprecated soon, and although we tested the two releases, we are just going to explain the installation of Flume NG


### Installation

These are the steps that you must follow to get Flume installed on your computer. 
Open your terminal and type these commands:

```bash
  # Download it from the Git repository 
  # Also, you can use this link: http://www.apache.org/dyn/closer.cgi/flume/1.2.0/apache-flume-1.2.0.tar.gz
  git clone git://git.apache.org/flume.git
  cd flume
  
  # You must setup the configuration file using the template already written
  cp conf/flume-conf.properties.template conf/flume-conf
  
  # If not set, export the JAVA_HOME environment variable
  export JAVA_HOME=/usr
  
  # Launch an instance of an agent
  bin/flume-ng agent -n agent -c conf/ -f conf/flume.conf
```

If you came up to this point, now you can start to use Flume!


## Testing Flume

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

- [Flume Project](http://flume.apache.org/) in Apache Software Foundation
- [Flume NG](https://github.com/cloudera/flume-ng) repo in GitHub
- [Flume](https://github.com/cloudera/flume) old repo in GitHub
- [Flume Documentation](http://flume.apache.org/documentation.html)


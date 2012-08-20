Fluentd
===========================


## Description
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
We think Fluentd is a great technology due to it offers a mix of power and
simpleness.

It lacks of a 100% reliable delivery messages system. Therefore, it is not the
most appropiate tool for critical situations when you need every message gets
their destination.

But if you does not need such a high reliability level or just you need a
powerful tool with an easy, fast configuration, Fluentd will fits quite well with your development



## About
- Fluentd (Treasure Data) https://github.com/fluent/fluentd/

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

Due to the high level of complexity reached by Flume, Cloudera thought a great refactoring was necessary and pertinent to make Flume easier to use and to integrate with other developments. The last version with the old philosophy was the version 0.9.4. After that point, Flume was renaming to Flume NG.

On one hand, it is important to notice that Flume NG is still quite recent and presents some limitations in the API. Also, it lacks of enough documentation, which is plenty of sections described with the ter "TBD" *(To Be Determined)*.
This is the cause to test both versions and see what were the changes carried out and what are the differences between both approaches.

On the other hand, Cloudera recommends to use Flume NG and indeed, it is much easier to use. Flume 0.9.x will be deprecated soon.


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

As we said before, we are testing both versions, but we are just going to explain the instalation of Flume NG.


### Installation

These are the steps that you must follow to get Flume installed on your computer.
Open your terminal and type these commands:

```bash
  # Download it from the Git repository. Alternatively, you can use the next link
  # http://www.apache.org/dyn/closer.cgi/flume/1.2.0/apache-flume-1.2.0.tar.gz
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

We implemented 4 tests trying to discover the real behaviour of the tool.

The first 2 tests were performed with the web interface provided by Flume v0.9.3
The last 2 tests, with Java code using the new API provided by Flume NG v1.2


### Test 1 - [0.9.3, Web] 'A' logs messages to 'B'

The first test consisted on configure a master node with 2 slaves called 'Alice' and 'Bob'. 
'Alice' was supposed to log some random information, written manually in a console, which should be received by 'Bob' both in a console and a local file.

The test was **OK** and we could see the great benefits shown by the Flume Web Interface, making quite easy to configure remote machines from the same master node.


### Test 2 - [0.9.3, Web] Complex architecture and different levels of reliability

This second test was an evolution of the previous one, with the differences of creating several *slaves* sending and forwarding information.
The system worked very well. But although it is not very complicated to configure the whole system when you are working with several nodes, Flume could have some sort of wizard to help developers with advanced issues.

Also, we tried to introduce manually some connection errors shutting down the nodes in order to see what happens with the data that could have not reached the destination host and check out the reliability levels promised by Flume developers.
It has, from less to more secure the following modes:

* Best-effort. 'Alice' sends the message and does not care if it is delivered correctly or not
* Store-on-failure. If the message does not reach the destiny, it is stored on a queue one time and will be 'fired' again.
* End-to-end. Same as the previous one but 'Alice' keeps saving the message until it is finally delivered.

The test was **PARTIALLY OK**. We saw that every message could get their destination with the End-to-end mode, but we detect several duplicates. Therefore, although you want to receive the whole data information, you will have to filter the replicated messages with a smart script not given by Flume


### Test 3 - [NG 1.2, Code] 'A' logs messages to 'B'

This time, we wrote some little test using the new collection of methods and classes provided by Flume NG. 
With the new changes, now it is by far easier than the old version, but still, we think a developer could have some pre-configurated destinations such as a console or a local file and a much easier façade for creating a RPC client sending data to a remote machine. We did it to facilitate rapid test or small developments.

The test was **OK** as we expected.


### Test 4 - [NG 1.2, Code] Complex architecture

Same code as the previous one, but with a different config file to perform forwardings.

The test was **OK**. The problem we found with this test is that the messages received by the intermediate node were instantly forwared, so we were unable to do any kind of pre-process.
Whether this feature could be performed or not, we hope the API will be improved to make it easier and get the data transparently, ready to be written in any custom sink or destination


## Conclusions

Tras haber analizado los casos expuestos anteriormente con ambas versiones, hemos sacado la siguiente lista de conclusiones, tanto favorables como negativas:

Advantages
- Equilibrio entre potencia y rendimiento, permitiendo crear sistemas de gran envergadura y complejos
- Gran tolerancia a errores y fiabilidad
- Configuración remota
- Muy completo, con muchisimos plugins, mecanismos de recepción y envío de logs

Disadvantages
- Complicado de usar a diferencia de las demás herramientas
- API poco flexible, con multitud de clases y sin documentación
- Documentación pobre a nivel general de la herramienta o de los ficheros de configuración
- Elementos sin implementar (configuración remota de momento sin implementar)

Esperamos que Flume implemente todo lo que le queda pronto, porque de ser así, sería la herramienta ideal para usar en cualquier desarrollo complejo


### About

- [Flume Project](http://flume.apache.org/) in Apache Software Foundation
- [Flume NG v1.2](https://github.com/cloudera/flume-ng) repo in GitHub
- [Flume v0.9.3](https://github.com/cloudera/flume) repo in GitHub
- [Flume Documentation](http://flume.apache.org/documentation.html)
- [Flume NG Architecture](http://www.cloudera.com/blog/2011/12/apache-flume-architecture-of-flume-ng-2/)


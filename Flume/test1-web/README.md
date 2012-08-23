Test 1 - Web Interface
===========================


### Running master

First of all, we need to launch a master instance. To do so, open your
terminal, go to the folder where you have installed Flume and type these
command:

```bash
  flume master
```


### Running slaves 'Alice' and 'Bob'

Once you have the master running, open the Flume web interface.
Later, you must launch some slave instances. Type this line and put the name you prefer after the **"-n"** option to specify a **logical name** for the node.

```bash
  # On the first machine
  flume node_nowatch -n alice

  # On the second, different machine
  flume node_nowatch -n bob
```


### Using the master web interface

We are going to setup 'Alice' filling the form input fields as follows:

```plain
Node name: alice
Source: text("/tmp/file.log")
Sink: agentSink("192.168.1.64", 35853)
```

What we are saying is that the node 'mylogicalname' will read some data from the local file '/tmp/file.log' and will send it to 'Bob'.

```plain
Node name: bob
Source: collectorSource(35853)
Sink: console
```

However, Bob will just receive the data sent by Alice and will output it on its console.

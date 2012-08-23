Test 2 - Web Interface
===========================

Very similar than test 1 but with a more complex architecture and connection errors.

To use the different reliability levels, we just use the different agentSinks
supported then:

* agentE2ESink (End-to-end mode, an alias of *agentSink* by default)
* agentDFOSink (Store-on-failure mode prepared for a disk failover)
* agentBESink (Best-effort)

If you want to see details about the test, please visit the [test
1](https://github.com/oil-conwet/DistributedLoggingSystems/blob/master/Flume/test1-web/README.md)


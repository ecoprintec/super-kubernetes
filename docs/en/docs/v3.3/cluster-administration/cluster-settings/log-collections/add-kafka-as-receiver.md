---
title: "Add Kafka as a Receiver"
keywords: 'Kubernetes, log, kafka, pod, container, fluentbit, output'
description: 'Learn how to add Kafka to receive container logs, resource events, or audit logs.'
linkTitle: "Add Kafka as a Receiver"
weight: 8623
---
You can use Elasticsearch, Kafka and Fluentd as log receivers in Super Kubenetes. This tutorial demonstrates:

- Deploy [strimzi-kafka-operator](https://github.com/strimzi/strimzi-kafka-operator) and then create a Kafka cluster and a Kafka topic by creating `Kafka` and `KafkaTopic` CRDs.
- Add Kafka as a log receiver to receive logs sent from Fluent Bit.
- Verify whether the Kafka cluster is receiving logs using [Kafkacat](https://github.com/edenhill/kafkacat).

## Prerequisites

- You need a user granted a role including the permission of **Cluster Management**. For example, you can log in to the console as `admin` directly or create a new role with the permission and assign it to a user.
- Before adding a log receiver, you need to enable any of the `logging`, `events` or `auditing` components. For more information, see [Enable Pluggable Components](../../../../pluggable-components/). `logging` is enabled as an example in this tutorial.

## Step 1: Create a Kafka Cluster and a Kafka Topic

You can use [strimzi-kafka-operator](https://github.com/strimzi/strimzi-kafka-operator) to create a Kafka cluster and a Kafka topic. If you already have a Kafka cluster, you can start from the next step.

1. Install [strimzi-kafka-operator](https://github.com/strimzi/strimzi-kafka-operator) in the `default` namespace:

   <article className="highlight">
      <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  helm repo add strimzi <a style="color:#ffffff; cursor:text;">https://strimzi.io/charts/</a>
               </p>
            </code>
         </div>
      </pre>
   </article>
   <article className="highlight">
      <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  helm install --name kafka-operator -n default strimzi/strimzi-kafka-operator
               </p>
            </code>
         </div>
      </pre>
   </article>


2. Create a Kafka cluster and a Kafka topic in the `default` namespace by running the following commands. The commands create Kafka and Zookeeper clusters with storage type `ephemeral` which is `emptyDir` for demonstration purposes. For other storage types in a production environment, refer to [kafka-persistent](https://github.com/strimzi/strimzi-kafka-operator/blob/0.19.0/examples/kafka/kafka-persistent.yaml).

    
   <article className="highlight">
      <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  <span style="color:#ae81ff">cat &lt;&lt;EOF | kubectl apply -f -</span> 
                  <span style="color:#f92672">apiVersion</span>: <span style="color:#ae81ff">kafka.strimzi.io/v1beta1</span> 
                  <span style="color:#f92672">kind</span>: <span style="color:#ae81ff">Kafka</span> 
                  <span style="color:#f92672">metadata</span>: 
                  <span style="color:#f92672">&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">my-cluster</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;namespace</span>: <span style="color:#ae81ff">default</span> 
                  <span style="color:#f92672">spec</span>: 
                  <span style="color:#f92672">&nbsp;&nbsp;kafka</span>: 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;version</span>: <span style="color:#ae81ff">2.5.0</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;replicas</span>: <span style="color:#ae81ff">3</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;listeners</span>: 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;plain</span>: {} 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;tls</span>: {} 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;config</span>: 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;offsets.topic.replication.factor</span>: <span style="color:#ae81ff">3</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;transaction.state.log.replication.factor</span>: <span style="color:#ae81ff">3</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;transaction.state.log.min.isr</span>: <span style="color:#ae81ff">2</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;log.message.format.version</span>: <span style="color:#e6db74">'2.5'</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;storage</span>: 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;type</span>: <span style="color:#ae81ff">ephemeral</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;zookeeper</span>: 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;replicas</span>: <span style="color:#ae81ff">3</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;storage</span>: 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;type</span>: <span style="color:#ae81ff">ephemeral</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;entityOperator</span>: 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;topicOperator</span>: {} 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;userOperator</span>: {} 
                  <span>-</span><span>-</span><span>-</span> 
                  <span style="color:#f92672">apiVersion</span>: <span style="color:#ae81ff">kafka.strimzi.io/v1beta1</span> 
                  <span style="color:#f92672">kind</span>: <span style="color:#ae81ff">KafkaTopic</span> 
                  <span style="color:#f92672">metadata</span>: 
                  <span style="color:#f92672">&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">my-topic</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;namespace</span>: <span style="color:#ae81ff">default</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;labels</span>: 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;strimzi.io/cluster</span>: <span style="color:#ae81ff">my-cluster</span> 
                  <span style="color:#f92672">spec</span>: 
                  <span style="color:#f92672">&nbsp;&nbsp;partitions</span>: <span style="color:#ae81ff">3</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;replicas</span>: <span style="color:#ae81ff">3</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;config</span>: 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;retention.ms</span>: <span style="color:#ae81ff">7200000</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;segment.bytes</span>: <span style="color:#ae81ff">1073741824</span> 
                  <span style="color:#ae81ff">EOF</span> 
               </p>
            </code>
         </div>
      </pre>
   </article>

3. Run the following command to check Pod status and wait for Kafka and Zookeeper are all up and running.

    <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  $ kubectl -n default get pod 
                  NAME                                         READY   STATUS    RESTARTS   AGE
                  my-cluster-entity-operator-f977bf457-s7ns2   3/3     Running   <span style="color:#ae81ff">0</span>          69m
                  my-cluster-kafka-0                           2/2     Running   <span style="color:#ae81ff">0</span>          69m
                  my-cluster-kafka-1                           2/2     Running   <span style="color:#ae81ff">0</span>          69m
                  my-cluster-kafka-2                           2/2     Running   <span style="color:#ae81ff">0</span>          69m
                  my-cluster-zookeeper-0                       1/1     Running   <span style="color:#ae81ff">0</span>          71m
                  my-cluster-zookeeper-1                       1/1     Running   <span style="color:#ae81ff">1</span>          71m
                  my-cluster-zookeeper-2                       1/1     Running   <span style="color:#ae81ff">1</span>          71m
                  strimzi-cluster-operator-7d6cd6bdf7-9cf6t    1/1     Running   <span style="color:#ae81ff">0</span>          104m
               </p>
            </code>
         </div>
      </pre>
   </article>

    Run the following command to check the metadata of the Kafka cluster:

    <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  kafkacat -L -b my-cluster-kafka-0.my-cluster-kafka-brokers.default.svc:9092,my-cluster-kafka-1.my-cluster-kafka-brokers.default.svc:9092,my-cluster-kafka-2.my-cluster-kafka-brokers.default.svc:9092
               </p>
            </code>
         </div>
      </pre>
   </article>

## Step 2: Add Kafka as a Log Receiver

1. Log in to Super Kubenetes as `admin`. Click **Platform** in the upper-left corner and select **Cluster Management**.

   <div className="notices note">
      <p>Note</p>
      <div>
         If you have enabled the [multi-cluster feature](../../../../multicluster-management/), you can select a specific cluster.
      </div>
   </div>

2. On the **Cluster Management** page, go to **Log Receivers** in **Cluster Settings**.

3. Click **Add Log Receiver** and select **Kafka**. Enter the Kafka service address and port number, and then click **OK** to continue.

   <table>
   <thead>
   <tr>
      <th>
         Service Address
      </th>
      <th>
         Port Number
      </th>
   </tr>
   </thead>
   <tbody>
   <tr>
      <td>
         my-cluster-kafka-0.my-cluster-kafka-brokers.default.svc
      </td>
      <td>
         9092
      </td>
   </tr>
   <tr>
      <td>
         my-cluster-kafka-1.my-cluster-kafka-brokers.default.svc
      </td>
      <td>
         9092
      </td>
   </tr>
   <tr>
      <td>
         my-cluster-kafka-2.my-cluster-kafka-brokers.default.svc
      </td>
      <td>
         9092
      </td>
   </tr>
   </tbody>
   </table>

4. Run the following commands to verify whether the Kafka cluster is receiving logs sent from Fluent Bit:

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  <span style="color:#75715e"><span>#</span><span>&nbsp;Start a util container</span></span> 
                  <span>kubectl run --rm utils -it --generator</span><span style="color:#f92672">=</span>run-pod/v1 --image arunvelsriram/utils bash 
                  <span style="color:#75715e"><span>#</span><span>&nbsp;Install Kafkacat in the util container</span></span> 
                  <span>apt-get install kafkacat</span> 
                  <span style="color:#75715e"><span>#</span><span>&nbsp;Run the following command to consume log messages from kafka topic: my-topic</span></span> 
                  kafkacat -C -b my-cluster-kafka-0.my-cluster-kafka-brokers.default.svc:9092,my-cluster-kafka-1.my-cluster-kafka-brokers.default.svc:9092,my-cluster-kafka-2.my-cluster-kafka-brokers.default.svc:9092 -t my-topic
               </p>
            </code>
         </div>
      </pre>
   </article>
---
title: "Add Fluentd as a Receiver"
keywords: 'Kubernetes, log, fluentd, pod, container, fluentbit, output'
description: 'Learn how to add Fluentd to receive logs, events or audit logs.'
linkTitle: "Add Fluentd as a Receiver"
weight: 8624
---
You can use Elasticsearch, Kafka and Fluentd as log receivers in Super Kubenetes. This tutorial demonstrates:

- How to deploy Fluentd as a Deployment and create the corresponding Service and ConfigMap.
- How to add Fluentd as a log receiver to receive logs sent from Fluent Bit and then output to stdout.
- How to verify if Fluentd receives logs successfully.

## Prerequisites

- You need a user granted a role including the permission of **Cluster Management**. For example, you can log in to the console as `admin` directly or create a new role with the permission and assign it to a user.

- Before adding a log receiver, you need to enable any of the `logging`, `events`, or `auditing` components. For more information, see [Enable Pluggable Components](../../../../pluggable-components/). `logging` is enabled as an example in this tutorial.

## Step 1: Deploy Fluentd as a Deployment

Usually, Fluentd is deployed as a DaemonSet in Kubernetes to collect container logs on each node. Super Kubenetes chooses Fluent Bit because of its low memory footprint. Besides, Fluentd features numerous output plugins. Hence, Super Kubenetes chooses to deploy Fluentd as a Deployment to forward logs it receives from Fluent Bit to more destinations such as S3, MongoDB, Cassandra, MySQL, syslog and Splunk.

Run the following commands:

<div className="notices note">
  <p>Note</p>
  <div>
    - The following commands create the Fluentd Deployment, Service, and ConfigMap in the `default` namespace and add a filter to the Fluentd ConfigMap to exclude logs from the `default` namespace to avoid Fluent Bit and Fluentd loop log collections.
    - Change the namespace if you want to deploy Fluentd into a different namespace.
  </div>
</div>


<article className="highlight">
   <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
         <code>
            <p>
               <span style="color:#ae81ff">cat &lt;&lt;EOF | kubectl apply -f -</span> 
               <span style="color:#f92672">apiVersion</span>: <span style="color:#ae81ff">v1</span> 
               <span style="color:#f92672">kind</span>: <span style="color:#ae81ff">ConfigMap</span> 
               <span style="color:#f92672">metadata</span>: 
               <span style="color:#f92672">&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">fluentd-config</span> 
               <span style="color:#f92672">&nbsp;&nbsp;namespace</span>: <span style="color:#ae81ff">default</span> 
               <span style="color:#f92672">data</span>: 
               <span style="color:#f92672">&nbsp;&nbsp;fluent.conf</span>: |-<span style="color:#e6db74"> 
               </span><span style="color:#e6db74">    &nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> Receive logs sent from Fluent Bit on port 24224 
               </span><span style="color:#e6db74">    &nbsp;&nbsp;&nbsp;&nbsp;&lt;source&gt; 
               </span><span style="color:#e6db74">      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;@type forward 
               </span><span style="color:#e6db74">      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;port 24224 
               </span><span style="color:#e6db74">    &nbsp;&nbsp;&nbsp;&nbsp;&lt;/source&gt; 
               </span><span style="color:#e6db74"> 
               </span><span style="color:#e6db74">    &nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> Because this will send logs Fluentd received to stdout, 
               </span><span style="color:#e6db74">    &nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> to avoid Fluent Bit and Fluentd loop logs collection, 
               </span><span style="color:#e6db74">    &nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> add a filter here to avoid sending logs from the default namespace to stdout again 
               </span><span style="color:#e6db74">    &nbsp;&nbsp;&nbsp;&nbsp;&lt;filter <span>*</span><span>*</span>&gt; 
               </span><span style="color:#e6db74">      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;@type grep 
               </span><span style="color:#e6db74">      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;exclude&gt; 
               </span><span style="color:#e6db74">        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;key $.kubernetes.namespace_name 
               </span><span style="color:#e6db74">        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;pattern /^default$/ 
               </span><span style="color:#e6db74">      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/exclude&gt; 
               </span><span style="color:#e6db74">    &nbsp;&nbsp;&nbsp;&nbsp;&lt;/filter&gt; 
               </span><span style="color:#e6db74"> 
               </span><span style="color:#e6db74">    &nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> Send received logs to stdout for demo/test purpose only 
               </span><span style="color:#e6db74">    &nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> Various output plugins are supported to output logs to S3, MongoDB, Cassandra, MySQL, syslog, Splunk, etc. 
               </span><span style="color:#e6db74">    &nbsp;&nbsp;&nbsp;&nbsp;&lt;match <span>*</span><span>*</span>&gt; 
               </span><span style="color:#e6db74">      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;@type stdout 
               </span><span style="color:#e6db74">    &nbsp;&nbsp;&nbsp;&nbsp;&lt;/match&gt;</span> 
               <span>-</span><span>-</span><span>-</span> 
               <span style="color:#f92672">apiVersion</span>: <span style="color:#ae81ff">apps/v1</span> 
               <span style="color:#f92672">kind</span>: <span style="color:#ae81ff">Deployment</span> 
               <span style="color:#f92672">metadata</span>: 
               <span style="color:#f92672">&nbsp;&nbsp;labels</span>: 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;app</span>: <span style="color:#ae81ff">fluentd</span> 
               <span style="color:#f92672">&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">fluentd</span> 
               <span style="color:#f92672">&nbsp;&nbsp;namespace</span>: <span style="color:#ae81ff">default</span> 
               <span style="color:#f92672">spec</span>: 
               <span style="color:#f92672">&nbsp;&nbsp;replicas</span>: <span style="color:#ae81ff">1</span> 
               <span style="color:#f92672">&nbsp;&nbsp;selector</span>: 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;matchLabels</span>: 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;app</span>: <span style="color:#ae81ff">fluentd</span> 
               <span style="color:#f92672">&nbsp;&nbsp;template</span>: 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;metadata</span>: 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;labels</span>: 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;app</span>: <span style="color:#ae81ff">fluentd</span> 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;spec</span>: 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;containers</span>: 
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#f92672">image</span>: <span style="color:#ae81ff">fluentd:v1.9.1-1.0</span> 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;imagePullPolicy</span>: <span style="color:#ae81ff">IfNotPresent</span> 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">fluentd</span> 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ports</span>: 
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#f92672">containerPort</span>: <span style="color:#ae81ff">24224</span> 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">forward</span> 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;protocol</span>: <span style="color:#ae81ff">TCP</span> 
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#f92672">containerPort</span>: <span style="color:#ae81ff">5140</span> 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">syslog</span> 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;protocol</span>: <span style="color:#ae81ff">TCP</span> 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;volumeMounts</span>: 
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#f92672">mountPath</span>: <span style="color:#ae81ff">/fluentd/etc</span> 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">config</span> 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;readOnly</span>: <span style="color:#66d9ef">true</span> 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;volumes</span>: 
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#f92672">configMap</span>: 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;defaultMode</span>: <span style="color:#ae81ff">420</span> 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">fluentd-config</span> 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">config</span> 
               <span>-</span><span>-</span><span>-</span> 
               <span style="color:#f92672">apiVersion</span>: <span style="color:#ae81ff">v1</span> 
               <span style="color:#f92672">kind</span>: <span style="color:#ae81ff">Service</span> 
               <span style="color:#f92672">metadata</span>: 
               <span style="color:#f92672">&nbsp;&nbsp;labels</span>: 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;app</span>: <span style="color:#ae81ff">fluentd</span> 
               <span style="color:#f92672">&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">fluentd</span> 
               <span style="color:#f92672">&nbsp;&nbsp;namespace</span>: <span style="color:#ae81ff">default</span> 
               <span style="color:#f92672">spec</span>: 
               <span style="color:#f92672">&nbsp;&nbsp;ports</span>: 
               &nbsp;&nbsp;- <span style="color:#f92672">name</span>: <span style="color:#ae81ff">forward</span> 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;port</span>: <span style="color:#ae81ff">24224</span> 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;protocol</span>: <span style="color:#ae81ff">TCP</span> 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;targetPort</span>: <span style="color:#ae81ff">forward</span> 
               <span style="color:#f92672">&nbsp;&nbsp;selector</span>: 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;app</span>: <span style="color:#ae81ff">fluentd</span> 
               <span style="color:#f92672">&nbsp;&nbsp;sessionAffinity</span>: <span style="color:#ae81ff">None</span> 
               <span style="color:#f92672">&nbsp;&nbsp;type</span>: <span style="color:#ae81ff">ClusterIP</span> 
               <span style="color:#ae81ff">EOF</span> 
            </p>
         </code>
      </div>
   </pre>
</article>


## Step 2: Add Fluentd as a Log Receiver

1. Log in to Super Kubenetes as `admin`. Click **Platform** in the upper-left corner and select **Cluster Management**.

   <div className="notices note">
      <p>Note</p>
      <div>
         If you have enabled the [multi-cluster feature](../../../../multicluster-management/), you can select a specific cluster.
      </div>
   </div>

2. On the **Cluster Management** page, go to **Log Receivers** in **Cluster Settings**.

3. Click **Add Log Receiver** and choose **Fluentd**.

4. Provide the Fluentd service address and port number.

5. Fluentd will appear in the receiver list on the **Log Receivers** page, the status of which is **Collecting**.


## Step 3: Verify Fluentd is Receiving Logs Sent from Fluent Bit

1. Click **Application Workloads** on the **Cluster Management** page.

2. Select **Workloads** and then select the `default` project on the **Deployments** tab.

3. Click the **fluentd** item and then select the **fluentd-xxxxxxxxx-xxxxx** Pod.

4. Click the **fluentd** container.

5. On the **fluentd** container page, select the **Container Logs** tab.

6. You can see logs begin to scroll up continuously.
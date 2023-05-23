---
title: "Observability — Logging FAQ"
keywords: "Kubernetes, Elasticsearch, Super Kubenetes, Logging, logs"
description: "Questions asked frequently about the logging functionality."
linkTitle: "Logging"
weight: 16310
---

This page contains some of the frequently asked questions about logging.

- [How to change the log store to the external Elasticsearch and shut down the internal Elasticsearch](#how-to-change-the-log-store-to-the-external-elasticsearch-and-shut-down-the-internal-elasticsearch)
- [How to change the log store to Elasticsearch with X-Pack Security enabled](#how-to-change-the-log-store-to-elasticsearch-with-x-pack-security-enabled)
- [How to set the data retention period of logs, events, auditing logs, and Istio logs](#how-to-set-the-data-retention-period-of-logs-events-auditing-logs-and-istio-logs)
- [I cannot find logs from workloads on some nodes using Toolbox](#i-cannot-find-logs-from-workloads-on-some-nodes-using-toolbox)
- [The log search page in Toolbox gets stuck when loading](#the-log-search-page-in-toolbox-gets-stuck-when-loading)
- [Toolbox shows no log record today](#toolbox-shows-no-log-record-today)
- [I see Internal Server Error when viewing logs in Toolbox](#i-see-internal-server-error-when-viewing-logs-in-toolbox)
- [How to make Super Kubenetes only collect logs from specified workloads](#how-to-make-Super Kubenetes-only-collect-logs-from-specified-workloads)

## How to change the log store to the external Elasticsearch and shut down the internal Elasticsearch

If you are using the Super Kubenetes internal Elasticsearch and want to change it to your external alternate, follow the steps below. If you haven't enabled the logging system, refer to [Super Kubenetes Logging System](../../../pluggable-components/logging/) to setup your external Elasticsearch directly.

1. First, you need to update the KubeKey configuration. Execute the following command:

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  kubectl edit cc -n Super Kubenetes-system ks-installer
               </p>
            </code>
         </div>
      </pre>
   </article>

2. Comment out `es.elasticsearchDataXXX`, `es.elasticsearchMasterXXX` and `status.logging`, and set `es.externalElasticsearchUrl` to the address of your Elasticsearch and `es.externalElasticsearchPort` to its port number. Below is an example for your reference.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
              <p>
                <span style="color:#f92672">apiVersion</span>: <span style="color:#ae81ff">installer.Super Kubenetes.io/v1alpha1</span> 
                <span style="color:#f92672">kind</span>: <span style="color:#ae81ff">ClusterConfiguration</span> 
                <span style="color:#f92672">metadata</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">ks-installer</span> 
                <span style="color:#f92672">&nbsp;&nbsp;namespace</span>: <span style="color:#ae81ff">Super Kubenetes-system</span> 
                <span style="color:#ae81ff">&nbsp;&nbsp;...</span> 
                <span style="color:#f92672">spec</span>: 
                <span style="color:#ae81ff">&nbsp;&nbsp;...</span> 
                <span style="color:#f92672">&nbsp;&nbsp;common</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;es</span>:  <span style="color:#75715e"><span>#</span> Storage backend for logging, events and auditing.</span> <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> master:</span> 
                <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span>   volumeSize: 4Gi  <span>#</span> The volume size of Elasticsearch master nodes.</span> 
                <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span>   replicas: 1      <span>#</span> The total number of master nodes. Even numbers are not allowed.</span> 
                <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span>   resources: {}</span> 
                <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> data:</span> 
                <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span>   volumeSize: 20Gi  <span>#</span> The volume size of Elasticsearch data nodes.</span> 
                <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span>   replicas: 1       <span>#</span> The total number of data nodes.</span> 
                <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span>   resources: {}</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;elkPrefix</span>: <span style="color:#ae81ff">logstash</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;logMaxAge</span>: <span style="color:#ae81ff">7</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;externalElasticsearchHost</span>: <span style="color:#ae81ff">&lt;192.168.0.2&gt;</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;externalElasticsearchPort</span>: <span style="color:#ae81ff">&lt;9200&gt;</span> 
                <span style="color:#ae81ff">&nbsp;&nbsp;...</span> 
                <span style="color:#f92672">status</span>: 
                <span style="color:#ae81ff">&nbsp;&nbsp;...</span> 
                <span style="color:#75715e">&nbsp;&nbsp;<span>#</span> logging:</span> 
                <span style="color:#75715e">&nbsp;&nbsp;<span>#</span>  enabledTime: 2020-08-10T02:05:13UTC</span> 
                <span style="color:#75715e">&nbsp;&nbsp;<span>#</span>  status: enabled</span> 
                <span style="color:#ae81ff">&nbsp;&nbsp;...</span> 
              </p>
          </code>
        </div>
    </pre>
  </article>

3. Rerun `ks-installer`.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  kubectl rollout restart deploy -n Super Kubenetes-system ks-installer
               </p>
            </code>
         </div>
      </pre>
   </article>

4. Remove the internal Elasticsearch by running the following command. Please make sure you have backed up data in the internal Elasticsearch.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  helm uninstall -n Super Kubenetes-logging-system elasticsearch-logging
               </p>
            </code>
         </div>
      </pre>
   </article>
   
5. Change the configuration of Jaeger if Istio is enabled.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
              <p>
                <span style="color:#ae81ff">$ kubectl -n istio-system edit jaeger </span> 
                ... 
                <span style="color:#f92672">&nbsp;options</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;es</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;index-prefix</span>: <span style="color:#ae81ff">logstash</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;server-urls</span>: <span style="color:#ae81ff"><span></span>http://elasticsearch-logging-data.Super Kubenetes-logging-system.svc:9200 <span></span></span> <span style="color:#75715e"><span>&nbsp;#</span> Change it to the external address.</span>
              </p>
          </code>
        </div>
    </pre>
  </article>

## How to change the log store to Elasticsearch with X-Pack Security enabled

Currently, Super Kubenetes doesn't support the integration of Elasticsearch with X-Pack Security enabled. This feature is coming soon.

## How to set the data retention period of logs, events, auditing logs, and Istio logs

Before Super Kubenetes v3.3.0, you can only set the retention period of logs, which is 7 days by default. In Super Kubenetes v3.3.0, apart from logs, you can also set the data retention period of events, auditing logs, and Istio logs.

Perform the following to update the KubeKey configurations.

1. Execute the following command:

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
              <p>
                kubectl edit cc -n Super Kubenetes-system ks-installer
              </p>
          </code>
        </div>
    </pre>
  </article>

2. In the YAML file, if you only want to change the retention period of logs, you can directly change the default value of `logMaxAge` to a desired one. If you want to set the retention period of events, auditing logs, and Istio logs, add parameters `auditingMaxAge`, `eventMaxAge`, and `istioMaxAge` and set a value for them, respectively, as shown in the following example:

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
              <p>
                <span style="color:#f92672">apiVersion</span>: <span style="color:#ae81ff">installer.Super Kubenetes.io/v1alpha1</span> 
                <span style="color:#f92672">kind</span>: <span style="color:#ae81ff">ClusterConfiguration</span> 
                <span style="color:#f92672">metadata</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">ks-installer</span> 
                <span style="color:#f92672">&nbsp;&nbsp;namespace</span>: <span style="color:#ae81ff">Super Kubenetes-system</span> 
                <span style="color:#ae81ff">&nbsp;&nbsp;...</span> 
                <span style="color:#f92672">spec</span>: 
                <span style="color:#ae81ff">&nbsp;&nbsp;...</span> 
                <span style="color:#f92672">&nbsp;&nbsp;common</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;es</span>:   <span style="color:#75715e"><span>#</span> Storage backend for logging, events and auditing.</span> <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;logMaxAge</span>: <span style="color:#ae81ff">7</span><span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> Log retention time in built-in Elasticsearch. It is 7 days by default.</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;auditingMaxAge</span>: <span style="color:#ae81ff">2</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;eventMaxAge</span>: <span style="color:#ae81ff">1</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;istioMaxAge</span>: <span style="color:#ae81ff">4</span> 
                <span style="color:#ae81ff">&nbsp;&nbsp;...</span> 
              </p>
          </code>
        </div>
    </pre>
  </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      If you have not set the retention period of events, auditing logs, and Istio logs, the value of `logMaxAge` is used by default.
    </div>
  </div>

3. In the YAML file, detete the `es` parameter, save the changes, and ks-installer will automatically restart to make the changes take effective.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
              <p>
                <span style="color:#f92672">apiVersion</span>: <span style="color:#ae81ff">installer.Super Kubenetes.io/v1alpha1</span> 
                <span style="color:#f92672">kind</span>: <span style="color:#ae81ff">ClusterConfiguration</span> 
                <span style="color:#f92672">metadata</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">ks-installer</span> 
                <span style="color:#f92672">&nbsp;&nbsp;namespace</span>: <span style="color:#ae81ff">Super Kubenetes-system</span> 
                ... 
                <span style="color:#f92672">status</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;alerting</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;enabledTime</span>: <span style="color:#e6db74">2022-08-11T06:22:01</span><span style="color:#ae81ff">UTC</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;status</span>: <span style="color:#ae81ff">enabled</span> 
                <span style="color:#ae81ff">&nbsp;&nbsp;...</span> 
                <span style="color:#f92672">&nbsp;&nbsp;es</span>:   <span style="color:#75715e"><span>#</span> delete this line.</span> <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;enabledTime</span>: <span style="color:#e6db74">2022-08-11T06:22:01</span><span style="color:#ae81ff">UTC   </span> <span style="color:#75715e"><span>&nbsp;#</span> delete this line.</span> <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;status</span>: <span style="color:#ae81ff">enabled  </span> <span style="color:#75715e"><span>&nbsp;#</span> delete this line.</span>
              </p>
          </code>
        </div>
    </pre>
  </article>

## I cannot find logs from workloads on some nodes using Toolbox

If you deployed Super Kubenetes through [multi-node installation](../../../installing-on-linux/introduction/multioverview/) and are using symbolic links for the docker root directory, make sure all nodes follow the same symbolic links. Logging agents are deployed in DaemonSets onto nodes. Any discrepancy in container log paths may cause collection failures on that node.

To find out the docker root directory path on nodes, you can run the following command. Make sure the same value applies to all nodes.

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              docker info -f <span style="color:#e6db74">'{{.DockerRootDir}}'</span>
            </p>
        </code>
      </div>
  </pre>
</article>

## The log search page in Toolbox gets stuck when loading

If the log search page is stuck when loading, check the storage system you are using. For example, a misconfigured NFS storage system may cause this issue.

## Toolbox shows no log record today

Check if your log volume exceeds the storage limit of Elasticsearch. If so, you need to increase the Elasticsearch disk volume.

## I see Internal Server Error when viewing logs in Toolbox

There can be several reasons for this issue:

- Network partition
- Invalid Elasticsearch host and port
- The Elasticsearch health status is red

## How to make Super Kubenetes only collect logs from specified workloads

The Super Kubenetes logging agent is powered by Fluent Bit. You need to update the Fluent Bit configuration to exclude certain workload logs. To modify the Fluent Bit input configuration, run the following command:

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              kubectl edit input -n Super Kubenetes-logging-system tail
            </p>
        </code>
      </div>
  </pre>
</article>

Update the field `Input.Spec.Tail.ExcludePath`. For example, set the path to `/var/log/containers/*_kube*-system_*.log` to exclude any log from system components.
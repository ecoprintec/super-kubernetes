---
title: "Cluster Shutdown and Restart"
description: "Learn how to gracefully shut down your cluster and restart it."
layout: "single"
linkTitle: "Cluster Shutdown and Restart"
weight: 8800
icon: "/dist/assets/docs/v3.3/docs.svg"
---
This document describes the process of gracefully shutting down your Kubernetes cluster and how to restart it. You might need to temporarily shut down your cluster for maintenance reasons.

<div className="notices warning">
  <p>Warning</p>
  <div>    
		Shutting down a cluster is very dangerous. You must fully understand the operation and its consequences. Please make an etcd backup before you proceed.
		Usually, it is recommended to maintain your nodes one by one instead of restarting the whole cluster.
  </div>
</div>


## Prerequisites
- Take an [etcd backup](https://etcd.io/docs/current/op-guide/recovery/#snapshotting-the-keyspace) prior to shutting down a cluster.
- SSH [passwordless login](https://man.openbsd.org/ssh.1#AUTHENTICATION) is set up between hosts.

## Shut Down a Kubernetes Cluster

<div className="notices tip">
  <p>Tip</p>
  <div>
    - You must back up your etcd data before you shut down the cluster as your cluster can be restored if you encounter any issues when restarting the cluster.
    - Using the method in this tutorial can shut down a cluster gracefully, while the possibility of data corruption still exists.
  </div>
</div>

### Step 1: Get the node list

<article className="highlight">
  <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              nodes<span style="color:#f92672">=</span><span style="color:#66d9ef">$(</span>kubectl get nodes -o name<span style="color:#66d9ef">)</span>
            </p>
        </code>
      </div>
  </pre>
</article>
### Step 2: Shut down all nodes

<article className="highlight">
  <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              <span style="color:#66d9ef">for</span> node in <span style="color:#e6db74">${</span>nodes[@]<span style="color:#e6db74">}</span> 
              <span style="color:#66d9ef">do</span> 
              &nbsp;&nbsp;&nbsp;&nbsp;echo <span style="color:#e6db74">"==== Shut down </span>$node<span style="color:#e6db74">&nbsp;===="</span> 
              &nbsp;&nbsp;&nbsp;&nbsp;ssh $node sudo shutdown -h <span style="color:#ae81ff">1</span> 
              <span style="color:#66d9ef">done</span>
            </p>
        </code>
      </div>
  </pre>
</article>
Then you can shut down other cluster dependencies, such as external storage.

## Restart a Cluster Gracefully
You can restart a cluster gracefully after shutting down the cluster gracefully.

### Prerequisites
You have shut down your cluster gracefully.



<div className="notices tip">
  <p>Tip</p>
  <div>
    Usually, a cluster can be used after restarting, but the cluster may be unavailable due to unexpected conditions. For example:
    - etcd data corruption during the shutdown.
    - Node failures.
    - Unexpected network errors.
  </div>
</div>

### Step 1: Check all cluster dependencies' status
Ensure all cluster dependencies are ready, such as external storage.
### Step 2: Power on cluster machines
Wait for the cluster to be up and running, which may take about 10 minutes.
### Step 3: Check the status of all control plane components
Check the status of core components, such as etcd services, and make sure everything is ready.

<article className="highlight">
  <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              kubectl get nodes -l node-role.kubernetes.io/master
            </p>
        </code>
      </div>
  </pre>
</article>

### Step 4: Check all worker nodes' status

<article className="highlight">
  <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              kubectl get nodes -l node-role.kubernetes.io/worker
            </p>
        </code>
      </div>
  </pre>
</article>

If your cluster fails to restart, please try to [restore the etcd cluster](https://etcd.io/docs/current/op-guide/recovery/#restoring-a-cluster).

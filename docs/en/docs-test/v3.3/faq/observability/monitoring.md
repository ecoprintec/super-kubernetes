---
title: "Observability — Monitoring FAQ"
keywords: "Kubernetes, Prometheus, Super Kubenetes, Monitoring"
description: "Questions asked frequently about the monitoring functionality."
linkTitle: "Monitoring"
weight: 16320
---

This page contains some of the frequently asked questions about monitoring.

- [How to access the Prometheus console in Super Kubenetes](#how-to-access-the-prometheus-console-in-Super Kubenetes)
- [Host port 9100 conflict caused by the node exporter](#host-port-9100-conflict-caused-by-the-node-exporter)
- [Conflicts with the preexisting prometheus operator](#conflicts-with-the-preexisting-prometheus-operator)
- [How to change the monitoring data retention period](#how-to-change-the-monitoring-data-retention-period)
- [No monitoring data for kube-scheduler and kube-controller-manager](#no-monitoring-data-for-kube-scheduler-and-kube-controller-manager)
- [No monitoring data for the last few minutes](#no-monitoring-data-for-the-last-few-minutes)
- [No monitoring data for both nodes and the control plane](#no-monitoring-data-for-both-nodes-and-the-control-plane)
- [Prometheus produces an error log: opening storage failed, no such file or directory: opening storage failed, no such file or directory](#prometheus-produces-an-error-log-opening-storage-failed-no-such-file-or-directory)

## How to access the Prometheus console in Super Kubenetes

The Super Kubenetes monitoring engine is powered by Prometheus. For debugging purposes, you may want to access the built-in Prometheus service through a NodePort. Run the following command to change the service type to `NodePort`:

<article className="highlight">
   <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
         <code>
            <p>
               kubectl edit svc -n Super Kubenetes-monitoring-system prometheus-k8s
            </p>
         </code>
      </div>
   </pre>
</article>

<div className="notices note">
  <p>Note</p>
  <div>
    To access the Prometheus console, you may need to open relevant ports and configure port forwarding rules depending on your environment.
  </div>
</div>


## Host port 9100 conflict caused by the node exporter

If you have processes occupying the host port 9100, the node exporter in `Super Kubenetes-monitoring-system` will be crashing. To resolve the conflict, you need to either terminate the process or assign another available port to the node exporter.

To adopt another host port, such as `29100`, run the following command and replace all `9100` with `29100` (5 places need to be changed).

<article className="highlight">
   <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
         <code>
            <p>
               kubectl edit ds -n Super Kubenetes-monitoring-system node-exporter
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
               <span style="color:#f92672">apiVersion</span>: <span style="color:#ae81ff">apps/v1</span> 
               <span style="color:#f92672">kind</span>: <span style="color:#ae81ff">DaemonSet</span> 
               <span style="color:#f92672">metadata</span>: 
               <span style="color:#f92672">&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">node-exporter</span> 
               <span style="color:#f92672">&nbsp;&nbsp;namespace</span>: <span style="color:#ae81ff">Super Kubenetes-monitoring-system</span> 
               <span style="color:#ae81ff">&nbsp;&nbsp;...</span> 
               <span style="color:#f92672">spec</span>: 
               <span style="color:#ae81ff">&nbsp;&nbsp;...</span> 
               <span style="color:#f92672">&nbsp;&nbsp;template</span>: 
               <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;...</span> 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;spec</span>: 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;containers</span>: 
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#f92672">name</span>: <span style="color:#ae81ff">node-exporter</span> 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;image</span>: <span style="color:#ae81ff">Super Kubenetes/node-exporter:ks-v0.18.1</span> 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;args</span>: 
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- --<span style="color:#ae81ff">web.listen-address=127.0.0.1:9100</span> 
               <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...</span> 
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#f92672">name</span>: <span style="color:#ae81ff">kube-rbac-proxy</span> 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;image</span>: <span style="color:#ae81ff">Super Kubenetes/kube-rbac-proxy:v0.4.1</span> 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;args</span>: 
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- --<span style="color:#ae81ff">logtostderr</span> 
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- --<span style="color:#ae81ff">secure-listen-address=<span>[</span>$(IP)]:9100</span> 
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- --<span style="color:#ae81ff"><span></span>upstream=http://127.0.0.1:9100/<span></span></span> 
               <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...</span> 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ports</span>: 
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#f92672">containerPort</span>: <span style="color:#ae81ff">9100</span> 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;hostPort</span>: <span style="color:#ae81ff">9100</span> 
               <span style="color:#ae81ff">...</span>
            </p>
         </code>
      </div>
   </pre>
</article>

## Conflicts with the preexisting prometheus operator

If you have deployed Prometheus Operator on your own, make sure it is removed before you install Super Kubenetes. Otherwise, there may be conflicts that the built-in Prometheus Operator of Super Kubenetes selects duplicate ServiceMonitor objects.

## How to change the monitoring data retention period

Run the following command to edit the maximum retention period. Navigate to the field `retention` and set a desired retention period (`7d` by default).

<article className="highlight">
   <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
         <code>
            <p>
               kubectl edit prometheuses -n Super Kubenetes-monitoring-system k8s
            </p>
         </code>
      </div>
   </pre>
</article>

## No monitoring data for kube-scheduler and kube-controller-manager

First, make sure the flag `--bind-address` is set to `0.0.0.0` (default) rather than `127.0.0.1`. Prometheus may need to access theses components from other hosts.

Second, check the presence of endpoint objects for `kube-scheduler` and `kube-controller-manager`. If they are missing, create them manually by creating services and selecting target Pods.

<article className="highlight">
   <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
         <code>
            <p>
               kubectl get ep -n kube-system | grep -E <span style="color:#e6db74">'kube-scheduler|kube-controller-manager'</span>
            </p>
         </code>
      </div>
   </pre>
</article>

## No monitoring data for the last few minutes

Check if your computer browser's local clock is in sync with the Internet time and with your cluster. A time gap may cause this issue. This may occur especially if your computer resides on an Intranet.

## No monitoring data for both nodes and the control plane

Check your network plugin and make sure that there is no IP Pool overlap between your hosts and Pod network CIDR. It is strongly recommended that you install Kubernetes with [KubeKey]().

Chinese readers may refer to [the discussion](https://Super Kubenetes.com.cn/forum/d/2027/16) in the Super Kubenetes China forum for more information.

## Prometheus produces an error log: opening storage failed, no such file or directory

If the Prometheus Pod in `Super Kubenetes-monitoring-system` is crashing and produces the following error log, your Prometheus data may be corrupt and needs manual deletion to recover.

<article className="highlight">
   <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
         <code>
            <p>
               level<span style="color:#f92672">=</span>error ts<span style="color:#f92672">=</span>2020-10-14T17:43:30.485Z caller<span style="color:#f92672">=</span>main.go:764 err<span style="color:#f92672">=</span><span style="color:#e6db74">"opening storage failed: block dir: "/prometheus/01EM0016F8FB33J63RNHFMHK3\": open /prometheus/01EM0016F8FB33J63RNHFMHK3/meta.json: no such file or directory"</span>
            </p>
         </code>
      </div>
   </pre>
</article>

Exec into the Prometheus Pod (if possible), and remove the block directory `/prometheus/01EM0016F8FB33J63RNHFMHK3`:

<article className="highlight">
   <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
         <code>
            <p>
               <span>kubectl exec -it -n Super Kubenetes-monitoring-system prometheus-k8s-0 -c prometheus sh</span> 
               <span></span> 
               <span>rm -rf 01EM0016F8FB33J63RNHFMHK3/</span>
            </p>
         </code>
      </div>
   </pre>
</article>

Alternatively, you can simply delete the directory from the persistent volume bound to the Prometheus PVC.

---
title: "Uninstall Pluggable Components"
keywords: "Installer, uninstall, Super Kubenetes, Kubernetes"
description: "Learn how to uninstall each pluggable component in Super Kubenetes."
linkTitle: "Uninstall Pluggable Components"
Weight: 6940
---

After you [enable the pluggable components of Super Kubenetes](../../pluggable-components/), you can also uninstall them by performing the following steps. Please back up any necessary data before you uninstall these components.

<div className="notices note">
  <p>Note</p>
  <div>
    The methods of uninstalling certain pluggable components on Super Kubenetes 3.3.0 are different from the methods on Super Kubenetes v3.3.0. For more information about the uninstallation methods on Super Kubenetes v3.3.0, see [Uninstall Pluggable Components from Super Kubenetes](https://v3-0.docs.Super Kubenetes.io/docs/faq/installation/uninstall-pluggable-components/).
  </div>
</div>


## Prerequisites

You have to change the value of the field `enabled` from `true` to `false` in `ks-installer` of the CRD `ClusterConfiguration` before you uninstall any pluggable components except Service Topology and Pod IP Pools. 

Use either of the following methods to change the value of the field `enabled`:

- Run the following command to edit `ks-installer`:

  <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
									kubectl -n Super Kubenetes-system edit clusterconfiguration ks-installer
               </p>
            </code>
         </div>
      </pre>
   </article>

- Log in to the Super Kubenetes web console as `admin`, click **Platform** in the upper-left corner and select **Cluster Management**, and then go to **CRDs** to search for `ClusterConfiguration`. For more information, see [Enable Pluggable Components](../../../pluggable-components/).

<div className="notices note">
  <p>Note</p>
  <div>
    After the value is changed, you need to wait until the updating process is complete before you continue with any further operations.
  </div>
</div>

## Uninstall Super Kubenetes App Store

Change the value of `openpitrix.store.enabled` from `true` to `false` in `ks-installer` of the CRD `ClusterConfiguration`.

## Uninstall Super Kubenetes DevOps

1. To uninstall DevOps:

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  helm uninstall -n Super Kubenetes-devops-system devops
                  kubectl patch -n Super Kubenetes-system cc ks-installer --type<span style="color:#f92672">=</span>json -p<span style="color:#f92672">=</span><span style="color:#e6db74">'[{"op": "remove", "path": "/status/devops"}]'</span> 
                  kubectl patch -n Super Kubenetes-system cc ks-installer --type<span style="color:#f92672">=</span>json -p<span style="color:#f92672">=</span><span style="color:#e6db74">'[{"op": "replace", "path": "/spec/devops/enabled", "value": false}]'</span>
               </p>
            </code>
         </div>
      </pre>
   </article>
2. To delete DevOps resources:

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  <span style="color:#75715e"><span>#</span> Remove all resources related with DevOps</span>
                  <span style="color:#66d9ef">for</span>&nbsp;devops_crd in <span style="color:#66d9ef">$(</span>kubectl get crd -o<span style="color:#f92672">=</span>jsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">'{range .items[*]}{.metadata.name}{"\n"}{end}'</span> | grep <span style="color:#e6db74">"devops.Super Kubenetes.io"</span><span style="color:#66d9ef">)</span>; <span style="color:#66d9ef">do</span> 
                  <span style="color:#66d9ef">&nbsp;&nbsp;&nbsp;&nbsp;for</span> ns in <span style="color:#66d9ef">$(</span>kubectl get ns -ojsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">'{.items..metadata.name}'</span><span style="color:#66d9ef">)</span>; <span style="color:#66d9ef">do</span> 
                  <span style="color:#66d9ef">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;for</span> devops_res in <span style="color:#66d9ef">$(</span>kubectl get $devops_crd -n $ns -oname<span style="color:#66d9ef">)</span>; <span style="color:#66d9ef">do</span> 
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;kubectl patch $devops_res -n $ns -p <span style="color:#e6db74">'{"metadata":{"finalizers":[]}}'</span> --type<span style="color:#f92672">=</span>merge
                  <span style="color:#66d9ef">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;done</span> 
                  <span style="color:#66d9ef">&nbsp;&nbsp;&nbsp;&nbsp;done</span> 
                  <span style="color:#66d9ef">done</span> 
                  <span style="color:#75715e"><span>#</span><span>&nbsp;Remove all DevOps CRDs</span></span> 
                  kubectl get crd -o<span style="color:#f92672">=</span>jsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">'{range .items[*]}{.metadata.name}{"\n"}{end}'</span> | grep <span style="color:#e6db74">"devops.Super Kubenetes.io"</span> | xargs -I crd_name kubectl delete crd crd_name
                  <span style="color:#75715e"><span>#</span><span>&nbsp;Remove DevOps namespace</span></span> 
                  <span>kubectl delete namespace Super Kubenetes-devops-system</span>
               </p>
            </code>
         </div>
      </pre>
   </article>


## Uninstall Super Kubenetes Logging

1. Change the value of `logging.enabled` from `true` to `false` in `ks-installer` of the CRD `ClusterConfiguration`.

2. To disable only log collection:

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
									kubectl delete inputs.logging.Super Kubenetes.io -n Super Kubenetes-logging-system tail
               </p>
            </code>
         </div>
      </pre>
   </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      After running this command, you can still view the container's recent logs provided by Kubernetes by default. However, the container history logs will be cleared and you cannot browse them any more. 
    </div>
  </div>

3. To uninstall the Logging system, including Elasticsearch:

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  kubectl delete crd fluentbitconfigs.logging.Super Kubenetes.io
                  kubectl delete crd fluentbits.logging.Super Kubenetes.io
                  kubectl delete crd inputs.logging.Super Kubenetes.io
                  kubectl delete crd outputs.logging.Super Kubenetes.io
                  kubectl delete crd parsers.logging.Super Kubenetes.io
                  kubectl delete deployments.apps -n Super Kubenetes-logging-system fluentbit-operator
                  helm uninstall elasticsearch-logging --namespace Super Kubenetes-logging-system
               </p>
            </code>
         </div>
      </pre>
   </article>

  <div className="notices warning">
    <p>Warning</p>
    <div>
      This operation may cause anomalies in Auditing, Events, and Service Mesh.
    </div>
  </div>

   
4. Run the following command:

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  kubectl delete deployment logsidecar-injector-deploy -n Super Kubenetes-logging-system
                  kubectl delete ns Super Kubenetes-logging-system
               </p>
            </code>
         </div>
      </pre>
   </article>

## Uninstall Super Kubenetes Events

1. Change the value of `events.enabled` from `true` to `false` in `ks-installer` of the CRD `ClusterConfiguration`.

2. Run the following command:

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
									helm delete ks-events -n Super Kubenetes-logging-system
               </p>
            </code>
         </div>
      </pre>
   </article>

## Uninstall Super Kubenetes Alerting

1. Change the value of `alerting.enabled` from `true` to `false` in `ks-installer` of the CRD `ClusterConfiguration`.

2. Run the following command:

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  kubectl -n Super Kubenetes-monitoring-system delete thanosruler Super Kubenetes
               </p>
            </code>
         </div>
      </pre>
   </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      Notification is installed in Super Kubenetes 3.3.0 by default, so you do not need to uninstall it.
    </div>
  </div>


## Uninstall Super Kubenetes Auditing

1. Change the value of `auditing.enabled` from `true` to `false` in `ks-installer` of the CRD `ClusterConfiguration`.

2. Run the following commands:

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  helm uninstall kube-auditing -n Super Kubenetes-logging-system
                  kubectl delete crd rules.auditing.Super Kubenetes.io
                  kubectl delete crd webhooks.auditing.Super Kubenetes.io
               </p>
            </code>
         </div>
      </pre>
   </article>

## Uninstall Super Kubenetes Service Mesh

1. Change the value of `servicemesh.enabled` from `true` to `false` in `ks-installer` of the CRD `ClusterConfiguration`.

2. Run the following commands:

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  curl -L <a style="color:#ffffff; cursor:text;">https://istio.io/downloadIstio</a> | sh -
                  istioctl x uninstall --purge

                  kubectl -n istio-system delete kiali kiali
                  helm -n istio-system delete kiali-operator

                  kubectl -n istio-system delete jaeger jaeger
                  helm -n istio-system delete jaeger-operator
               </p>
            </code>
         </div>
      </pre>
   </article>

## Uninstall Network Policies

For the component NetworkPolicy, disabling it does not require uninstalling the component as its controller is now inside `ks-controller-manager`. If you want to remove it from the Super Kubenetes console, change the value of `network.networkpolicy.enabled` from `true` to `false` in `ks-installer` of the CRD `ClusterConfiguration`.

## Uninstall Metrics Server

1. Change the value of `metrics_server.enabled` from `true` to `false` in `ks-installer` of the CRD `ClusterConfiguration`.

2. Run the following commands:

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  kubectl delete apiservice v1beta1.metrics.k8s.io
                  kubectl -n kube-system delete service metrics-server
                  kubectl -n kube-system delete deployment metrics-server
               </p>
            </code>
         </div>
      </pre>
   </article>

## Uninstall Service Topology

1. Change the value of `network.topology.type` from `weave-scope` to `none` in `ks-installer` of the CRD `ClusterConfiguration`.

2. Run the following command:

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
									kubectl delete ns weave
               </p>
            </code>
         </div>
      </pre>
   </article>

## Uninstall Pod IP Pools

Change the value of `network.ippool.type` from `calico` to `none` in `ks-installer` of the CRD `ClusterConfiguration`.

## Uninstall KubeEdge

1. Change the value of `kubeedge.enabled` and `edgeruntime.enabled` from `true` to `false` in `ks-installer` of the CRD `ClusterConfiguration`.

2. Run the following commands:

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  helm uninstall kubeedge -n kubeedge
                  kubectl delete ns kubeedge
               </p>
            </code>
         </div>
      </pre>
   </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      After uninstallation, you will not be able to add edge nodes to your cluster.
    </div>
  </div>


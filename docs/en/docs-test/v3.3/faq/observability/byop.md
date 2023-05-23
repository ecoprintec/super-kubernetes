---
title: "Bring Your Own Prometheus"
keywords: "Monitoring, Prometheus, node-exporter, kube-state-metrics, Super Kubenetes, Kubernetes"
description: "Use your own Prometheus stack setup in Super Kubenetes."
linkTitle: "Bring Your Own Prometheus"
Weight: 16330
---

Super Kubenetes comes with several pre-installed customized monitoring components including Prometheus Operator, Prometheus, Alertmanager, Grafana (Optional), various ServiceMonitors, node-exporter, and kube-state-metrics. These components might already exist before you install Super Kubenetes. It is possible to use your own Prometheus stack setup in Super Kubenetes v3.3.0.

## Steps to Bring Your Own Prometheus

To use your own Prometheus stack setup, perform the following steps:

1. Uninstall the customized Prometheus stack of Super Kubenetes

2. Install your own Prometheus stack

3. Install Super Kubenetes customized stuff to your Prometheus stack

4. Change Super Kubenetes's `monitoring endpoint`

### Step 1. Uninstall the customized Prometheus stack of Super Kubenetes

1. Execute the following commands to uninstall the stack:

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  kubectl -n Super Kubenetes-system exec <span style="color:#66d9ef">$(</span>kubectl get pod -n Super Kubenetes-system -l app<span style="color:#f92672">=</span>ks-installer -o jsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">'{.items[0].metadata.name}'</span><span style="color:#66d9ef">)</span> -- kubectl delete -f /Super Kubenetes/Super Kubenetes/prometheus/alertmanager/ 2&gt;/dev/null
                  kubectl -n Super Kubenetes-system exec <span style="color:#66d9ef">$(</span>kubectl get pod -n Super Kubenetes-system -l app<span style="color:#f92672">=</span>ks-installer -o jsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">'{.items[0].metadata.name}'</span><span style="color:#66d9ef">)</span> -- kubectl delete -f /Super Kubenetes/Super Kubenetes/prometheus/devops/ 2&gt;/dev/null
                  kubectl -n Super Kubenetes-system exec <span style="color:#66d9ef">$(</span>kubectl get pod -n Super Kubenetes-system -l app<span style="color:#f92672">=</span>ks-installer -o jsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">'{.items[0].metadata.name}'</span><span style="color:#66d9ef">)</span> -- kubectl delete -f /Super Kubenetes/Super Kubenetes/prometheus/etcd/ 2&gt;/dev/null
                  kubectl -n Super Kubenetes-system exec <span style="color:#66d9ef">$(</span>kubectl get pod -n Super Kubenetes-system -l app<span style="color:#f92672">=</span>ks-installer -o jsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">'{.items[0].metadata.name}'</span><span style="color:#66d9ef">)</span> -- kubectl delete -f /Super Kubenetes/Super Kubenetes/prometheus/grafana/ 2&gt;/dev/null
                  kubectl -n Super Kubenetes-system exec <span style="color:#66d9ef">$(</span>kubectl get pod -n Super Kubenetes-system -l app<span style="color:#f92672">=</span>ks-installer -o jsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">'{.items[0].metadata.name}'</span><span style="color:#66d9ef">)</span> -- kubectl delete -f /Super Kubenetes/Super Kubenetes/prometheus/kube-state-metrics/ 2&gt;/dev/null
                  kubectl -n Super Kubenetes-system exec <span style="color:#66d9ef">$(</span>kubectl get pod -n Super Kubenetes-system -l app<span style="color:#f92672">=</span>ks-installer -o jsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">'{.items[0].metadata.name}'</span><span style="color:#66d9ef">)</span> -- kubectl delete -f /Super Kubenetes/Super Kubenetes/prometheus/node-exporter/ 2&gt;/dev/null
                  kubectl -n Super Kubenetes-system exec <span style="color:#66d9ef">$(</span>kubectl get pod -n Super Kubenetes-system -l app<span style="color:#f92672">=</span>ks-installer -o jsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">'{.items[0].metadata.name}'</span><span style="color:#66d9ef">)</span> -- kubectl delete -f /Super Kubenetes/Super Kubenetes/prometheus/upgrade/ 2&gt;/dev/null
                  kubectl -n Super Kubenetes-system exec <span style="color:#66d9ef">$(</span>kubectl get pod -n Super Kubenetes-system -l app<span style="color:#f92672">=</span>ks-installer -o jsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">'{.items[0].metadata.name}'</span><span style="color:#66d9ef">)</span> -- kubectl delete -f /Super Kubenetes/Super Kubenetes/prometheus/prometheus-rules-v1.16<span style="color:#ae81ff">\+</span>.yaml 2&gt;/dev/null
                  kubectl -n Super Kubenetes-system exec <span style="color:#66d9ef">$(</span>kubectl get pod -n Super Kubenetes-system -l app<span style="color:#f92672">=</span>ks-installer -o jsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">'{.items[0].metadata.name}'</span><span style="color:#66d9ef">)</span> -- kubectl delete -f /Super Kubenetes/Super Kubenetes/prometheus/prometheus-rules.yaml 2&gt;/dev/null
                  kubectl -n Super Kubenetes-system exec <span style="color:#66d9ef">$(</span>kubectl get pod -n Super Kubenetes-system -l app<span style="color:#f92672">=</span>ks-installer -o jsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">'{.items[0].metadata.name}'</span><span style="color:#66d9ef">)</span> -- kubectl delete -f /Super Kubenetes/Super Kubenetes/prometheus/prometheus 2&gt;/dev/null
                  <span style="color:#75715e"><span>#</span><span>&nbsp;Uncomment this line if you don't have Prometheus managed by Prometheus Operator in other namespaces.</span></span> 
                  <span style="color:#75715e"><span>#</span><span>&nbsp;kubectl -n Super Kubenetes-system exec $(kubectl get pod -n Super Kubenetes-system -l app=ks-installer -o jsonpath='{.items[0].metadata.name}') -- kubectl delete -f /Super Kubenetes/Super Kubenetes/prometheus/init/ 2&gt;/dev/null</span></span>
               </p>
            </code>
         </div>
      </pre>
   </article>

2. Delete the PVC that Prometheus used.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  kubectl -n Super Kubenetes-monitoring-system delete pvc <span style="color:#e6db74">`</span>kubectl -n Super Kubenetes-monitoring-system get pvc | grep -v VOLUME | awk <span style="color:#e6db74">'{print $1}'</span> |  tr <span style="color:#e6db74">'\n'</span> <span style="color:#e6db74">' '</span><span style="color:#e6db74">`</span>
               </p>
            </code>
         </div>
      </pre>
   </article>

### Step 2. Install your own Prometheus stack

<div className="notices note">
   <p>Note</p>
   <div>
      Super Kubenetes 3.3.0 was certified to work well with the following Prometheus stack components:

         - Prometheus Operator **v0.38.3+**
         - Prometheus **v2.20.1+**
         - Alertmanager **v0.21.0+**
         - kube-state-metrics **v1.9.6**
         - node-exporter **v0.18.1**

         Make sure your Prometheus stack components' version meets these version requirements especially **node-exporter** and **kube-state-metrics**.

         Make sure you install **node-exporter** and **kube-state-metrics** if only **Prometheus Operator** and **Prometheus** were installed. **node-exporter** and **kube-state-metrics** are required for Super Kubenetes to work properly.

         **If you've already had the entire Prometheus stack up and running, you can skip this step.**
   </div>
</div>

The Prometheus stack can be installed in many ways. The following steps show how to install it into the namespace `monitoring` using **upstream `kube-prometheus`**.

1. Get kube-prometheus version v0.6.0 whose node-exporter's version v0.18.1 matches the one Super Kubenetes v3.3.0 is using.

  <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  cd ~ <span style="color:#f92672">&amp;&amp;</span> git clone -b release-3.3 <a style="color:#ffffff; cursor:text;">https://github.com/Super Kubenetes/ks-prometheus.git</a> <span style="color:#f92672">&amp;&amp;</span> cd ks-prometheus
               </p>
            </code>
         </div>
      </pre>
   </article>

2. Setup the `monitoring` namespace, and install Prometheus Operator and corresponding roles:

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  kubectl apply -f manifests/setup/
               </p>
            </code>
         </div>
      </pre>
   </article>

3. Wait until Prometheus Operator is up and running.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  kubectl -n monitoring get pod --watch
               </p>
            </code>
         </div>
      </pre>
   </article>

4. Remove unnecessary components such as Prometheus Adapter.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  rm -rf manifests/prometheus-adapter-*.yaml
               </p>
            </code>
         </div>
      </pre>
   </article>

5. Change kube-state-metrics to the same version v1.9.6 as Super Kubenetes v3.3.0 is using.

  <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  sed -i <span style="color:#e6db74">'s/v1.9.5/v1.9.6/g'</span> manifests/kube-state-metrics-deployment.yaml
               </p>
            </code>
         </div>
      </pre>
   </article>

6. Install Prometheus, Alertmanager, Grafana, kube-state-metrics, and node-exporter. You can only install kube-state-metrics or node-exporter by only applying the yaml file `kube-state-metrics-*.yaml` or `node-exporter-*.yaml`.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  kubectl apply -f manifests/
               </p>
            </code>
         </div>
      </pre>
   </article>

### Step 3. Install Super Kubenetes customized stuff to your Prometheus stack

<div className="notices note">
   <p>Note</p>
   <div>
      Super Kubenetes 3.3.0 uses Prometheus Operator to manage Prometheus/Alertmanager config and lifecycle, ServiceMonitor (to manage scrape config), and PrometheusRule (to manage Prometheus recording/alert rules).

         There are a few items listed in [Super Kubenetes kustomization](), among which `prometheus-rules.yaml` and `prometheus-rulesEtcd.yaml` are required for Super Kubenetes v3.3.0 to work properly and others are optional. You can remove `alertmanager-secret.yaml` if you don't want your existing Alertmanager's config to be overwritten. You can remove `xxx-serviceMonitor.yaml` if you don't want your own ServiceMonitors to be overwritten (Super Kubenetes customized ServiceMonitors discard many irrelevant metrics to make sure Prometheus only stores the most useful metrics).

         If your Prometheus stack setup isn't managed by Prometheus Operator, you can skip this step. But you have to make sure that:

         - You must copy the recording/alerting rules in [PrometheusRule]() and [PrometheusRule for etcd]() to your Prometheus config for Super Kubenetes v3.3.0 to work properly.

         - Configure your Prometheus to scrape metrics from the same targets as the ServiceMonitors listed in [Super Kubenetes kustomization]().
   </div>
</div>

1. Get Super Kubenetes v3.3.0 customized kube-prometheus.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  cd ~ <span style="color:#f92672">&amp;&amp;</span> mkdir Super Kubenetes <span style="color:#f92672">&amp;&amp;</span> cd Super Kubenetes <span style="color:#f92672">&amp;&amp;</span> git clone <a style="color:#ffffff; cursor:text;">https://github.com/Super Kubenetes/kube-prometheus.git</a> <span style="color:#f92672">&amp;&amp;</span> cd kube-prometheus/kustomize
               </p>
            </code>
         </div>
      </pre>
   </article>

2. Change the namespace to your own in which the Prometheus stack is deployed. For example, it is `monitoring` if you install Prometheus in the `monitoring` namespace following Step 2.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  sed -i <span style="color:#e6db74">'s/my-namespace/&lt;your own namespace&gt;/g'</span> kustomization.yaml
               </p>
            </code>
         </div>
      </pre>
   </article>

3. Apply Super Kubenetes customized stuff including Prometheus rules, Alertmanager config, and various ServiceMonitors.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  kubectl apply -k .
               </p>
            </code>
         </div>
      </pre>
   </article>

4. Setup Services for kube-scheduler and kube-controller-manager metrics exposure.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  kubectl apply -f ./prometheus-serviceKubeScheduler.yaml
                  kubectl apply -f ./prometheus-serviceKubeControllerManager.yaml
               </p>
            </code>
         </div>
      </pre>
   </article>

5. Find the Prometheus CR which is usually Kubernetes in your own namespace.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  kubectl -n &lt;your own namespace&gt; get prometheus
               </p>
            </code>
         </div>
      </pre>
   </article>

6. Set the Prometheus rule evaluation interval to 1m to be consistent with the Super Kubenetes v3.3.0 customized ServiceMonitor. The Rule evaluation interval should be greater or equal to the scrape interval.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  kubectl -n &lt;your own namespace&gt; patch prometheus k8s --patch <span style="color:#e6db74">'{
                  </span><span style="color:#e6db74">&nbsp;&nbsp;"spec": {
                  </span><span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;"evaluationInterval": "1m"
                  </span><span style="color:#e6db74">&nbsp;&nbsp;}
                  </span><span style="color:#e6db74">}'</span> --type<span style="color:#f92672">=</span>merge
               </p>
            </code>
         </div>
      </pre>
   </article>

### Step 4. Change Super Kubenetes's `monitoring endpoint`

Now that your own Prometheus stack is up and running, you can change Super Kubenetes's monitoring endpoint to use your own Prometheus.

1. Edit `Super Kubenetes-config` by running the following command:

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  kubectl edit cm -n Super Kubenetes-system Super Kubenetes-config
               </p>
            </code>
         </div>
      </pre>
   </article>

2. Navigate to the `monitoring endpoint` section as below:

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  &nbsp;&nbsp;&nbsp;&nbsp;monitoring:
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;endpoint: <a style="color:#ffffff; cursor:text;">http://prometheus-operated.Super Kubenetes-monitoring-system.svc:9090</a>
               </p>
            </code>
         </div>
      </pre>
   </article>

3. Change `monitoring endpoint` to your own Prometheus:

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  &nbsp;&nbsp;&nbsp;&nbsp;monitoring:
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;endpoint: <a style="color:#ffffff; cursor:text;">http://prometheus-operated.monitoring.svc:9090</a>
               </p>
            </code>
         </div>
      </pre>
   </article>

4. Run the following command to restart the Super Kubenetes APIServer.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  kubectl -n Super Kubenetes-system rollout restart deployment/ks-apiserver
               </p>
            </code>
         </div>
      </pre>
   </article>

<div className="notices warning">
  <p>Warning</p>
  <div>
    If you enable/disable Super Kubenetes pluggable components following [this guide](../../../pluggable-components/overview/) , the `monitoring endpoint` will be reset to the original one. In this case, you have to change it to the new one and then restart the Super Kubenetes APIServer again.
  </div>
</div>

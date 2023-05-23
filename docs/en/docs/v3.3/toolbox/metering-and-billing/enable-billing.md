---
title: "Enable Billing"
keywords: "Kubernetes, Super Kubenetes, ConfigMap, Billing"
description: "Enable the billing function in Super Kubenetes to view the billing data of your resources during a period."
linkTitle: "Enable Billing"
weight: 15420
---

This tutorial demonstrates how to enable Super Kubenetes Billing to view the cost of different resources in your cluster. By default, the Billing function is disabled so you need to manually add the price information in a ConfigMap.

Perform the following steps to enable Super Kubenetes Billing.

1. Run the following command to edit the ConfigMap `Super Kubenetes-config`:

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  kubectl edit cm Super Kubenetes-config -n Super Kubenetes-system
               </p>
            </code>
         </div>
      </pre>
   </article>

2. Add the retention day and price information under `metering` in the ConfigMap. The following is an example for your reference:

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  <span style="color:#ae81ff">$ kubectl get cm Super Kubenetes-config -n Super Kubenetes-system -oyaml</span> 
                  ...
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;alerting</span>: 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;prometheusEndpoint</span>: <span style="color:#ae81ff"><a style="color:#ae81ff; cursor:text;">http://prometheus-operated.Super Kubenetes-monitoring-system.svc:9090</a></span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;thanosRulerEndpoint</span>: <span style="color:#ae81ff"><a style="color:#ae81ff; cursor:text;">http://thanos-ruler-operated.Super Kubenetes-monitoring-system.svc:10902</a></span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;thanosRuleResourceLabels</span>: <span style="color:#ae81ff">thanosruler=thanos-ruler,role=thanos-alerting-rules</span> 
                  <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;...</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;metering</span>: 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;retentionDay</span>: <span style="color:#ae81ff">7d</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;billing</span>: 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;priceInfo</span>: 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;currencyUnit</span>: <span style="color:#e6db74">"USD"</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cpuPerCorePerHour</span>: <span style="color:#ae81ff">1.5</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;memPerGigabytesPerHour</span>: <span style="color:#ae81ff">5</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ingressNetworkTrafficPerMegabytesPerHour</span>: <span style="color:#ae81ff">1</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;egressNetworkTrafficPerMegabytesPerHour</span>: <span style="color:#ae81ff">1</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;pvcPerGigabytesPerHour</span>: <span style="color:#ae81ff">2.1</span> 
                  <span style="color:#f92672">kind</span>: <span style="color:#ae81ff">ConfigMap</span> 
                  ...
               </p>
            </code>
         </div>
      </pre>
   </article>

   The following table describes the parameters.

   <table>
     <tbody>
       <tr>
         <th>Parameter</th>
         <th>Description</th>
       </tr>
       <tr>
         <td><code>retentionDay</code></td>
         <td><code>retentionDay</code> determines the date range displayed on the <b>Metering and Billing</b> page for users. The value of this parameter must be the same as the value of <code>retention</code> in <a href='../../../faq/observability/monitoring/'>Prometheus</a>.</td>
       </tr>
       <tr>
         <td><code>currencyUnit</code></td>
         <td>The currency that is displayed on the <b>Metering and Billing</b> page. Currently allowed values are <code>CNY</code> (Renminbi) and <code>USD</code> (US dollars). If you specify other currencies, the console will display cost in USD by default.</td>
       </tr>
       <tr>
         <td><code>cpuCorePerHour</code></td>
         <td>The unit price of CPU per core/hour.</td>
       </tr><tr>
         <td><code>memPerGigabytesPerHour</code></td>
         <td>The unit price of memory per GB/hour.</td>
       </tr><tr>
         <td><code>ingressNetworkTrafficPerMegabytesPerHour</code></td>
         <td>The unit price of ingress traffic per MB/hour.</td>
       </tr><tr>
         <td><code>egressNetworkTrafficPerMegabytesPerHour</code></td>
         <td>The unit price of egress traffic per MB/hour.</td>
       </tr><tr>
         <td><code>pvcPerGigabytesPerHour</code></td>
         <td>The unit price of PVC per GB/hour. Note that Super Kubenetes calculates the total cost of volumes based on the storage capacity PVCs request regardless of the actual storage in use.</td>
       </tr>
     </tbody>
   </table>

3. Run the following command to restart `ks-apiserver`:

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  kubectl rollout restart deploy ks-apiserver -n Super Kubenetes-system
               </p>
            </code>
         </div>
      </pre>
   </article>

4. On the **Metering and Billing** page, you can see the cost information of resources.
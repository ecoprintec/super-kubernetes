---
title: 'Enable Pluggable Components'
keywords: 'Super Kubenetes, Kubernetes, pluggable, components'
description: 'Install pluggable components of Super Kubenetes so that you can explore the container platform in an all-around way. Pluggable components can be enabled both before and after the installation.'
linkTitle: 'Enable Pluggable Components'
weight: 2600
---

This tutorial demonstrates how to enable pluggable components of Super Kubenetes both before and after the installation. Refer to the table below for all pluggable components of Super Kubenetes.

   <table>
   <thead>
   <tr>
      <th>
         Configuration
      </th>
      <th>
         Component
      </th>
      <th>
         Description
      </th>
   </tr>
   </thead>
   <tbody>
   <tr>
      <td>
         <code>alerting</code>
      </td>
      <td>
         Super Kubenetes Alerting System
      </td>
      <td>
         You can customize alerting policies for workloads and nodes. After an alerting policy is triggered, alert messages can be sent to your recipients through different channels (for example, email and Slack).
      </td>
   </tr>
   <tr>
      <td>
         <code>auditing</code>
      </td>
      <td>
         Super Kubenetes Auditing Log System
      </td>
      <td>
         Provide a security-relevant chronological set of records, recording the sequence of activities that happen in the platform, initiated by different tenants.
      </td>
   </tr>
   <tr>
      <td>
         <code>devops</code>
      </td>
      <td>
         Super Kubenetes DevOps System
      </td>
      <td>
         Provide an out-of-box CI/CD system based on Jenkins, and automated workflow tools including Source-to-Image and Binary-to-Image.
      </td>
   </tr>
   <tr>
      <td>
         <code>events</code>
      </td>
      <td>
         Super Kubenetes Events System
      </td>
      <td>
         Provide a graphical web console for the exporting, filtering and alerting of Kubernetes events in multi-tenant Kubernetes clusters.
      </td>
   </tr>
   <tr>
      <td>
         <code>logging</code>
      </td>
      <td>
         Super Kubenetes Logging System
      </td>
      <td>
         Provide flexible logging functions for log query, collection and management in a unified console. Additional log collectors can be added, such as Elasticsearch, Kafka and Fluentd.
      </td>
   </tr>
   <tr>
      <td>
         <code>metrics_server</code>
      </td>
      <td>
         HPA
      </td>
      <td>
         The Horizontal Pod Autoscaler automatically scales the number of Pods based on needs.
      </td>
   </tr>
   <tr>
      <td>
         <code>networkpolicy</code>
      </td>
      <td>
         Network policy
      </td>
      <td>
         Allow network isolation within the same cluster, which means firewalls can be set up between certain instances (Pods).
      </td>
   </tr>
   <tr>
      <td>
         <code>kubeedge</code>
      </td>
      <td>
         KubeEdge
      </td>
      <td>
         Add edge nodes to your cluster and run workloads on them.
      </td>
   </tr>
   <tr>
      <td>
         <code>openpitrix</code>
      </td>
      <td>
         Super Kubenetes App Store
      </td>
      <td>
         Provide an app store for Helm-based applications and allow users to manage apps throughout the entire lifecycle.
      </td>
   </tr>
   <tr>
      <td>
         <code>servicemesh</code>
      </td>
      <td>
         Super Kubenetes Service Mesh (Istio-based)
      </td>
      <td>
         Provide fine-grained traffic management, observability and tracing, and visualized traffic topology.
      </td>
   </tr>
   <tr>
      <td>
         <code>ippool</code>
      </td>
      <td>
         Pod IP Pool
      </td>
      <td>
         Create Pod IP pools and assign IP addresses from the Pools to your Pods.
      </td>
   </tr>
   <tr>
      <td>
         <code>topology</code>
      </td>
      <td>
         Service Topology
      </td>
      <td>
         Integrate <a href="https://www.weave.works/oss/scope/" target="_blank" rel="noopener noreferrer">Weave Scope</a> to view service-to-service communication (topology) of your apps and containers.
      </td>
   </tr>
   </tbody>
   </table>

For more information about each component, see [Overview of Enable Pluggable Components](../../pluggable-components/overview/).

<div className="notices note">
   <p>Note</p>
   <div>
      - `multicluster` is not covered in this tutorial. If you want to enable this feature, you need to set a corresponding value for `clusterRole`. For more information, see [Multi-cluster Management](../../multicluster-management/).
      - Make sure your machine meets the hardware requirements before the installation. Here is the recommendation if you want to enable all pluggable components: CPU ≥ 8 Cores, Memory ≥ 16 G, Disk Space ≥ 100 G.
   </div>
</div>

## Enable Pluggable Components Before Installation

For most of the pluggable components, you can follow the steps below to enable them. If you need to enable [KubeEdge](../../pluggable-components/kubeedge/), [Pod IP Pools](../../pluggable-components/pod-ip-pools/) and [Service Topology](../../pluggable-components/service-topology/), refer to the corresponding tutorials directly.

### Installing on Linux

When you implement multi-node installation of Super Kubenetes on Linux, you need to create a configuration file, which lists all Super Kubenetes components.

1. In the tutorial of [Installing Super Kubenetes on Linux](../../installing-on-linux/introduction/multioverview/), you create a default file `config-sample.yaml`. Modify the file by executing the following command:

   <article className="highlight">
      <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>vi config-sample.yaml</code>
         </div>
      </pre>
   </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      If you adopt [All-in-one Installation](../../quick-start/all-in-one-on-linux/), you do not need to create a `config-sample.yaml` file as you can create a cluster directly. Generally, the all-in-one mode is for users who are new to Super Kubenetes and look to get familiar with the system. If you want to enable pluggable components in this mode (for example, for testing purpose), refer to the [following section]()<!-- (#enable-pluggable-components-after-installation) --> to see how pluggable components can be installed after installation.
    </div>
  </div>

2. In this file, enable the pluggable components you want to install by changing `false` to `true` for `enabled`. Here is [the complete file]()<!-- (https://github.com/Super Kubenetes/kubekey/blob/release-2.2/docs/config-example.md) --> for your reference. Save the file after you finish.

3. Create a cluster using the configuration file:

   <article className="highlight">
      <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>./kk create cluster -f config-sample.yaml</code>
         </div>
      </pre>
   </article>

### Installing on Kubernetes

When you install Super Kubenetes on Kubernetes, you need to use [ks-installer](https://github.com/Super Kubenetes/ks-installer/) by applying two YAML files as below.

1. First download the file [cluster-configuration.yaml]<!-- (https://github.com/Super Kubenetes/ks-installer/releases/download/v3.1.0/cluster-configuration.yaml) --> and edit it.

   <article className="highlight">
      <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>vi cluster-configuration.yaml</code>
         </div>
      </pre>
   </article>

2. To enable the pluggable component you want to install, change `false` to `true` for `enabled` under the component in this file.

3. Save this local file and execute the following commands to start the installation.

   <article className="highlight">
      <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
              kubectl apply -f <a style="color:#ffffff; cursor:text;">https://github.com/Super Kubenetes/ks-installer/releases/download/v3.3.0/Super Kubenetes-installer.yaml</a>
            
              kubectl apply -f cluster-configuration.yaml</code>
         </div>
      </pre>
   </article>

Whether you install Super Kubenetes on Linux or on Kubernetes, you can check the status of the components you have enabled in the web console of Super Kubenetes after installation. Go to **System Components**, and you can see the component status.

## Enable Pluggable Components After Installation

The Super Kubenetes web console provides a convenient way for users to view and operate on different resources. To enable pluggable components after installation, you only need to make few adjustments on the console directly. For those who are accustomed to the Kubernetes command-line tool, kubectl, they will have no difficulty in using Super Kubenetes as the tool is integrated into the console.

<div className="notices note">
  <p>Note</p>
  <div>
    If you need to enable [KubeEdge](../../pluggable-components/kubeedge/), [Pod IP Pools](../../pluggable-components/pod-ip-pools/) and [Service Topology](../../pluggable-components/service-topology/), refer to the corresponding tutorials directly.
  </div>
</div>

1. Log in to the console as `admin`. Click **Platform** in the top-left corner and select **Cluster Management**.

2. Click **CRDs** and enter `clusterconfiguration` in the search bar. Click the result to view its detail page.

  <div className="notices info">
    <p>Info</p>
    <div>
      A Custom Resource Definition (CRD) allows users to create a new type of  resources without adding another API server. They can use these  resources like any other native Kubernetes objects.    
    </div>
  </div>

3. In **Custom Resources**, click the three dots on the right of `ks-installer` and select **Edit YAML**.

4. In this YAML file, enable the pluggable components you want to install by changing `false` to `true` for `enabled`. After you finish, click **OK** to save the configuration.

5. You can use the web kubectl to check the installation process by executing the following command:

   <article className="highlight">
      <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>kubectl logs -n Super Kubenetes-system <span style="color:#66d9ef">$(</span>kubectl get pod -n Super Kubenetes-system -l <span style="color:#e6db74">'app in (ks-install, ks-installer)'</span> -o jsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">'{.items[0].metadata.name}'</span><span style="color:#66d9ef">)</span> -f</code>
         </div>
      </pre>
   </article>

   <div className="notices tip">
     <p>Tip</p>
     <div>
       You can find the web kubectl tool by clicking the hammer icon in the bottom-right corner of the console.
     </div>
   </div>

6. The output will display a message as below if the component is successfully installed.

   <article className="highlight">
     <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
           <code>
               <p>
                 <span style="color:#75715e">###########################################################</span> 
                 <span style="color:#75715e"><span>#</span><span>#</span><span>#</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Welcome to Super Kubenetes!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span><span>#</span><span>#</span></span> 
                 <span style="color:#75715e">###########################################################</span> 
                 <span></span> 
                 <span style="color:#f92672">Console</span>: <span style="color:#ae81ff"><span></span>http://192.168.0.2:30880<span></span></span> 
                 <span style="color:#f92672">Account</span>: <span style="color:#ae81ff">admin</span> 
                 <span style="color:#f92672">Password</span>: <span style="color:#ae81ff">P@88w0rd</span> 
                 <span></span> 
                 <span style="color:#ae81ff">NOTES：</span> 
                 <span style="color:#ae81ff">&nbsp;&nbsp;1</span><span style="color:#ae81ff">. After you log into the console, please check the</span> 
                 <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;monitoring status of service components in</span> 
                 <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#e6db74">"Cluster Management"</span>. If any service is not</span> 
                 <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ready, please wait patiently until all components </span> 
                 <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;are up and running.</span> 
                 <span style="color:#ae81ff">&nbsp;&nbsp;2</span><span style="color:#ae81ff">. Please change the default password after login.</span> 
                 <span></span> 
                 <span style="color:#75715e">###########################################################</span> <span style="color:#ae81ff"> 
                 <span></span><a style="color:#ae81ff; cursor:text;">https://ai.kuberix.co.kr</a><span></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;20xx-xx-xx xx:xx:xx</span> 
                 <span style="color:#75715e">###########################################################</span> <span style="color:#ae81ff">
               </p>
           </code>
         </div>
     </pre>
   </article>

7. In **System Components**, you can see the status of different components.

   <div className="notices tip">
     <p>Tip</p>
     <div>
       If you do not see relevant components in the above image, some Pods may not be ready yet. You can execute `kubectl get pod --all-namespaces` through kubectl to see the status of Pods.
     </div>
   </div>

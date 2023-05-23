---
title: "KubeEdge"
keywords: "Kubernetes, Super Kubenetes, Kubeedge"
description: "Learn how to enable KubeEdge to add edge nodes to your cluster."
linkTitle: "KubeEdge"
weight: 6930
---

[KubeEdge](https://kubeedge.io/en/) is an open-source system for extending native containerized application orchestration capabilities to hosts at edge. It supports multiple edge protocols and looks to provide unified management of cloud and edge applications and resources.

KubeEdge has components running in two separate places - cloud and edge nodes. The components running on the cloud, collectively known as CloudCore, include Controllers and Cloud Hub. Cloud Hub serves as the gateway for the requests sent by edge nodes while Controllers function as orchestrators. The components running on edge nodes, collectively known as EdgeCore, include EdgeHub, EdgeMesh, MetadataManager, and DeviceTwin. For more information, see [the KubeEdge website](https://kubeedge.io/en/).

After you enable KubeEdge, you can [add edge nodes to your cluster](../../installing-on-linux/cluster-operation/add-edge-nodes/) and deploy workloads on them.

![kubeedge_arch](/dist/assets/docs/v3.3/enable-pluggable-components/kubeedge/kubeedge_arch.png)

## Enable KubeEdge Before Installation

### Installing on Linux

When you implement multi-node installation of Super Kubenetes on Linux, you need to create a configuration file, which lists all Super Kubenetes components.

1. In the tutorial of [Installing Super Kubenetes on Linux](../../installing-on-linux/introduction/multioverview/), you create a default file `config-sample.yaml`. Modify the file by executing the following command:

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  vi config-sample.yaml
               </p>
            </code>
         </div>
      </pre>
   </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      If you adopt [All-in-One Installation](../../quick-start/all-in-one-on-linux/), you do not need to create a `config-sample.yaml` file as you can create a cluster directly. Generally, the all-in-one mode is for users who are new to Super Kubenetes and look to get familiar with the system. If you want to enable KubeEdge in this mode (for example, for testing purposes), refer to [the following section](#enable-kubeedge-after-installation) to see how KubeEdge can be installed after installation.
    </div>
  </div>


2. In this file, navigate to `edgeruntime` and `kubeedge`, and change the value of `enabled` from `false` to `true` to enable all KubeEdge components. Click **OK**.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  <span style="color:#f92672">edgeruntime</span>:<span style="color:#75715e"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#</span> Add edge nodes to your cluster and deploy workloads on edge nodes.</span>
                  <span style="color:#f92672">&nbsp;&nbsp;enabled</span>: <span style="color:#66d9ef">false</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;kubeedge</span>:<span style="color:#75715e"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#</span><span>&nbsp;kubeedge configurations</span></span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;enabled</span>: <span style="color:#66d9ef"><span>false</span></span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;cloudCore</span>:
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cloudHub</span>:
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;advertiseAddress</span>: <span style="color:#75715e"><span>#</span><span>&nbsp;At least a public IP address or an IP address which can be accessed by edge nodes must be provided.</span></span> 
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-</span> <span style="color:#e6db74">&nbsp;""</span><span style="color:#75715e"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#</span><span>&nbsp;Note that once KubeEdge is enabled, CloudCore will malfunction if the address is not provided.</span></span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;service</span>:
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cloudhubNodePort</span>: <span style="color:#e6db74">"30000"</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cloudhubQuicNodePort</span>: <span style="color:#e6db74">"30001"</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cloudhubHttpsNodePort</span>: <span style="color:#e6db74">"30002"</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cloudstreamNodePort</span>: <span style="color:#e6db74">"30003"</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;tunnelNodePort</span>: <span style="color:#e6db74">"30004"</span> 
                  <span style="color:#75715e"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#</span><span>&nbsp;resources: {}</span></span> 
                  <span style="color:#75715e"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#</span><span>&nbsp;hostNetWork: false</span></span>
               </p>
            </code>
         </div>
      </pre>
   </article>

3. Set the value of `kubeedge.cloudCore.cloudHub.advertiseAddress` to the public IP address of your cluster or an IP address that can be accessed by edge nodes. Save the file when you finish editing.

4. Create a cluster using the configuration file:

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  ./kk create cluster -f config-sample.yaml
               </p>
            </code>
         </div>
      </pre>
   </article>

### Installing on Kubernetes

As you [install Super Kubenetes on Kubernetes](../../installing-on-kubernetes/introduction/overview/), you can enable KubeEdge first in the [cluster-configuration.yaml](https://github.com/Super Kubenetes/ks-installer/releases/download/v3.3.0/cluster-configuration.yaml) file.

1. Download the file [cluster-configuration.yaml](https://github.com/Super Kubenetes/ks-installer/releases/download/v3.3.0/cluster-configuration.yaml) and edit it.

    <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  vi cluster-configuration.yaml
               </p>
            </code>
         </div>
      </pre>
   </article>
    

2. In this local `cluster-configuration.yaml` file, navigate to `edgeruntime` and `kubeedge`, and change the value of `enabled` from `false` to `true` to enable all KubeEdge components. Click **OK**.

    <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  <span style="color:#f92672">edgeruntime</span>:<span style="color:#75715e"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#</span> Add edge nodes to your cluster and deploy workloads on edge nodes.</span>
                  <span style="color:#f92672">&nbsp;&nbsp;enabled</span>: <span style="color:#66d9ef">false</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;kubeedge</span>:<span style="color:#75715e"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#</span><span>&nbsp;kubeedge configurations</span></span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;enabled</span>: <span style="color:#66d9ef"><span>false</span></span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;cloudCore</span>:
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cloudHub</span>:
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;advertiseAddress</span>: <span style="color:#75715e"><span>#</span><span>&nbsp;At least a public IP address or an IP address which can be accessed by edge nodes must be provided.</span></span> 
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-</span> <span style="color:#e6db74">&nbsp;""</span><span style="color:#75715e"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#</span><span>&nbsp;Note that once KubeEdge is enabled, CloudCore will malfunction if the address is not provided.</span></span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;service</span>:
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cloudhubNodePort</span>: <span style="color:#e6db74">"30000"</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cloudhubQuicNodePort</span>: <span style="color:#e6db74">"30001"</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cloudhubHttpsNodePort</span>: <span style="color:#e6db74">"30002"</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cloudstreamNodePort</span>: <span style="color:#e6db74">"30003"</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;tunnelNodePort</span>: <span style="color:#e6db74">"30004"</span> 
                  <span style="color:#75715e"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#</span><span>&nbsp;resources: {}</span></span> 
                  <span style="color:#75715e"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#</span><span>&nbsp;hostNetWork: false</span></span>
               </p>
            </code>
         </div>
      </pre>
   </article>

3. Set the value of `kubeedge.cloudCore.cloudHub.advertiseAddress` to the public IP address of your cluster or an IP address that can be accessed by edge nodes.

4. Save the file and execute the following commands to start installation:

    <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  kubectl apply -f <a style="color:#ffffff; cursor:text;">https://github.com/Super Kubenetes/ks-installer/releases/download/v3.3.0/Super Kubenetes-installer.yaml</a>

                  kubectl apply -f cluster-configuration.yaml</p>
            </code>
         </div>
      </pre>
   </article>

## Enable KubeEdge After Installation

1. Log in to the console as `admin`. Click **Platform** in the upper-left corner and select **Cluster Management**.
   
2. Click **CRDs** and enter `clusterconfiguration` in the search bar. Click the result to view its detail page.

  <div className="notices info">
    <p>Info</p>
    <div>
      A Custom Resource Definition (CRD) allows users to create a new type of resources without adding another API server. They can use these resources like any other native Kubernetes objects.    
    </div>
  </div>

3. In **Custom Resources**, click <img src="/dist/assets/docs/v3.3/enable-pluggable-components/kubeedge/three-dots.png" height="20px"> on the right of `ks-installer` and select **Edit YAML**.
   
4. In this YAML file, navigate to `edgeruntime` and `kubeedge`, and change the value of `enabled` from `false` to `true` to enable all KubeEdge components. Click **OK**.

    <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  <span style="color:#f92672">edgeruntime</span>:<span style="color:#75715e"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#</span> Add edge nodes to your cluster and deploy workloads on edge nodes.</span>
                  <span style="color:#f92672">&nbsp;&nbsp;enabled</span>: <span style="color:#66d9ef">false</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;kubeedge</span>:<span style="color:#75715e"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#</span><span>&nbsp;kubeedge configurations</span></span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;enabled</span>: <span style="color:#66d9ef"><span>false</span></span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;cloudCore</span>:
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cloudHub</span>:
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;advertiseAddress</span>: <span style="color:#75715e"><span>#</span><span>&nbsp;At least a public IP address or an IP address which can be accessed by edge nodes must be provided.</span></span> 
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-</span> <span style="color:#e6db74">&nbsp;""</span><span style="color:#75715e"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#</span><span>&nbsp;Note that once KubeEdge is enabled, CloudCore will malfunction if the address is not provided.</span></span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;service</span>:
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cloudhubNodePort</span>: <span style="color:#e6db74">"30000"</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cloudhubQuicNodePort</span>: <span style="color:#e6db74">"30001"</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cloudhubHttpsNodePort</span>: <span style="color:#e6db74">"30002"</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cloudstreamNodePort</span>: <span style="color:#e6db74">"30003"</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;tunnelNodePort</span>: <span style="color:#e6db74">"30004"</span> 
                  <span style="color:#75715e"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#</span><span>&nbsp;resources: {}</span></span> 
                  <span style="color:#75715e"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#</span><span>&nbsp;hostNetWork: false</span></span>
               </p>
            </code>
         </div>
      </pre>
   </article>

5. Set the value of `kubeedge.cloudCore.cloudHub.advertiseAddress` to the public IP address of your cluster or an IP address that can be accessed by edge nodes. After you finish, click **OK** in the lower-right corner to save the configuration.

6. You can use the web kubectl to check the installation process by executing the following command:

    <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  kubectl logs -n Super Kubenetes-system <span style="color:#66d9ef">$(</span>kubectl get pod -n Super Kubenetes-system -l <span style="color:#e6db74">'app in (ks-install, ks-installer)'</span> -o jsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">'{.items[0].metadata.name}'</span><span style="color:#66d9ef">)</span> -f</p>
            </code>
         </div>
      </pre>
   </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      You can find the web kubectl tool by clicking <img src="/dist/assets/docs/v3.3/enable-pluggable-components/kubeedge/hammer.png" height="20px"> in the lower-right corner of the console.
    </div>
  </div>


## Verify the Installation of the Component

<main className="code-tabs">
	<ul className="nav nav-tabs">
		<li className="nav-item active"><a className="nav-link" href="#">Verify the component on the dashboard</a></li>
		<li className="nav-item"><a className="nav-link" href="#">Verify the component through kubectl</a></li>
	</ul>
	<div className="tab-content">
		<main className="tab-pane active" title="Verify the component on the dashboard">
			On the <b>Cluster Management</b> page, verify that the <b>Edge Nodes</b> module has appeared under <b>Nodes</b>.
		</main>
		<main className="tab-pane" title="Verify the component through kubectl">
			<p>
				Execute the following command to check the status of Pods:
			</p>
			<article className="highlight">
				<pre>
					<div className="copy-code-button" title="Copy Code">
					</div>
					<div className="code-over-div">
						<code>kubectl get pod -n kubeedge </code>
					</div>
				</pre>
			</article>
			<p>
				The output may look as follows if the component runs successfully:
			</p>
			<article className="highlight">
				<pre>
					<div className="copy-code-button" title="Copy Code">
					</div>
					<div className="code-over-div">
                  <code>
                        NAME                                              READY   STATUS    RESTARTS   AGE
                        cloudcore-5f994c9dfd-r4gpq                        1/1     Running   <span style="color:#ae81ff">0</span>          5h13m
                        edge-watcher-controller-manager-bdfb8bdb5-xqfbk   2/2     Running   <span style="color:#ae81ff">0</span>          5h13m
                        iptables-hphgf                                    1/1     Running   <span style="color:#ae81ff">0</span>          5h13m
                  </code>
					</div>
				</pre>
			</article>
		</main>
	</div>
</main>

<div className="notices note">
  <p>Note</p>
  <div>
    CloudCore may malfunction (`CrashLoopBackOff`) if `kubeedge.cloudCore.cloudHub.advertiseAddress` was not set when you enabled KubeEdge. In this case, run `kubectl -n kubeedge edit cm cloudcore` to add the public IP address of your cluster or an IP address that can be accessed by edge nodes.
  </div>
</div>

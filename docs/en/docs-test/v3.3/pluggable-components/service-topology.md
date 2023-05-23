---
title: "Service Topology"
keywords: "Kubernetes, Super Kubenetes, Services, Topology"
description: "Learn how to enable Service Topology to view contextual details of your Pods based on Weave Scope."
linkTitle: "Service Topology"
weight: 6915
---

You can enable Service Topology to integrate [Weave Scope](https://www.weave.works/oss/scope/), a visualization and monitoring tool for Docker and Kubernetes. Weave Scope uses established APIs to collect information to build a topology of your apps and containers. The Service topology displays in your project, providing you with visual representations of connections based on traffic.

## Enable Service Topology Before Installation

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
      If you adopt [All-in-One Installation](../../quick-start/all-in-one-on-linux/), you do not need to create a `config-sample.yaml` file as you can create a cluster directly. Generally, the all-in-one mode is for users who are new to Super Kubenetes and look to get familiar with the system. If you want to enable Service Topology in this mode (for example, for testing purposes), refer to [the following section](#enable-service-topology-after-installation) to see how Service Topology can be installed after installation.
    </div>
  </div>


2. In this file, navigate to `network.topology.type` and change `none` to `weave-scope`. Save the file after you finish.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  <span style="color:#f92672">network</span>:
                     <span style="color:#f92672">topology</span>:
                        <span style="color:#f92672">type</span>: <span style="color:#ae81ff">weave-scope</span> <span style="color:#75715e"><span>&nbsp;#</span> Change "none" to "weave-scope".</span>
               </p>
            </code>
         </div>
      </pre>
   </article>

3. Create a cluster using the configuration file:

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

As you [install Super Kubenetes on Kubernetes](../../installing-on-kubernetes/introduction/overview/), you can enable Service Topology first in the [cluster-configuration.yaml](https://github.com/Super Kubenetes/ks-installer/releases/download/v3.3.0/cluster-configuration.yaml) file.

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

2. In this local `cluster-configuration.yaml` file, navigate to `network.topology.type` and enable it by changing `none` to `weave-scope`. Save the file after you finish.

    <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  <span style="color:#f92672">network</span>:
                     <span style="color:#f92672">topology</span>:
                        <span style="color:#f92672">type</span>: <span style="color:#ae81ff">weave-scope</span> <span style="color:#75715e"><span>&nbsp;#</span> Change "none" to "weave-scope".</span>
               </p>
            </code>
         </div>
      </pre>
   </article>

3. Execute the following commands to start installation:

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


## Enable Service Topology After Installation

1. Log in to the console as `admin`. Click **Platform** in the upper-left corner and select **Cluster Management**.

2. Click **CRDs** and enter `clusterconfiguration` in the search bar. Click the result to view its detail page.

  <div className="notices info">
    <p>Info</p>
    <div>
      A Custom Resource Definition (CRD) allows users to create a new type of resources without adding another API server. They can use these resources like any other native Kubernetes objects.    
    </div>
  </div>


3. In **Custom Resources**, click <img src="/dist/assets/docs/v3.3/enable-pluggable-components/service-topology/three-dots.png" height="20px"> on the right of `ks-installer` and select **Edit YAML**.

4. In this YAML file, navigate to `network` and change `network.topology.type` to `weave-scope`. After you finish, click **OK** in the lower-right corner to save the configuration.

    <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  <span style="color:#f92672">network</span>:
                     <span style="color:#f92672">topology</span>:
                        <span style="color:#f92672">type</span>: <span style="color:#ae81ff">weave-scope</span> <span style="color:#75715e"><span>&nbsp;#</span> Change "none" to "weave-scope".</span>
               </p>
            </code>
         </div>
      </pre>
   </article>

5. You can use the web kubectl to check the installation process by executing the following command:

    <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  kubectl logs -n Super Kubenetes-system <span style="color:#66d9ef">$(</span>kubectl get pod -n Super Kubenetes-system -l <span style="color:#e6db74">'app in (ks-install, ks-installer)'</span> -o jsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">'{.items[0].metadata.name}'</span><span style="color:#66d9ef">)</span> -f
               </p>
            </code>
         </div>
      </pre>
   </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      You can find the web kubectl tool by clicking <img src="/dist/assets/docs/v3.3/enable-pluggable-components/service-topology/hammer.png" height="20px"> in the lower-right corner of the console.
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
			Go to one of your project, navigate to <b>Services</b> under <b>Application Workloads</b>, and you can see a topology of your Services on the <b>Service Topology</b> tab page.
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
						<code>kubectl get pod -n weave </code>
					</div>
				</pre>
			</article>
			<p>
				The output may look as follows if the component runs successfully:
			</p>
         <article className="highlight">
            <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
            <div className="copy-code-button" title="Copy Code"></div>
            <div className="code-over-div">
               <code>
               <p>
                  NAME                                        READY   STATUS    RESTARTS   AGE
                  weave-scope-agent-48cjp                     1/1     Running   <span style="color:#ae81ff">0</span>          3m1s
                  weave-scope-agent-9jb4g                     1/1     Running   <span style="color:#ae81ff">0</span>          3m1s
                  weave-scope-agent-ql5cf                     1/1     Running   <span style="color:#ae81ff">0</span>          3m1s
                  weave-scope-app-5b76897b6f-8bsls            1/1     Running   <span style="color:#ae81ff">0</span>          3m1s
                  weave-scope-cluster-agent-8d9b8c464-5zlpp   1/1     Running   <span style="color:#ae81ff">0</span>          3m1s
               </p>
               </code>
            </div>
            </pre>
         </article>
		</main>
	</div>
</main>
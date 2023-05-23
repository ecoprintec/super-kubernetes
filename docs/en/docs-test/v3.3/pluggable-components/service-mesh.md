---
title: "Super Kubenetes Service Mesh"
keywords: "Kubernetes, Istio, Super Kubenetes, service-mesh, microservices"
description: "Learn how to enable Super Kubenetes Service Mesh to use different traffic management strategies for microservices governance."
linkTitle: "Super Kubenetes Service Mesh"
weight: 6800
---

On the basis of [Istio](https://istio.io/), Super Kubenetes Service Mesh visualizes microservices governance and traffic management. It features a powerful toolkit including **circuit breaking, blue-green deployment, canary release, traffic mirroring, tracing, observability, and traffic control**. Developers can easily get started with Super Kubenetes Service Mesh without any code hacking, which greatly reduces the learning curve of Istio. All features of Super Kubenetes Service Mesh are designed to meet users' demand for their business.

For more information, see [Grayscale Release](../../project-user-guide/grayscale-release/overview/).

## Enable Super Kubenetes Service Mesh Before Installation

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
      If you adopt [All-in-One Installation](../../quick-start/all-in-one-on-linux/), you do not need to create a `config-sample.yaml` file as you can create a cluster directly. Generally, the all-in-one mode is for users who are new to Super Kubenetes and look to get familiar with the system. If you want to enable Super Kubenetes Service Mesh in this mode (for example, for testing purposes), refer to [the following section](#enable-service-mesh-after-installation) to see how Super Kubenetes Service Mesh can be installed after installation.
    </div>
  </div>


2. In this file, navigate to `servicemesh` and change `false` to `true` for `enabled`. Save the file after you finish.

    <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  <span style="color:#f92672">servicemesh</span>:
                  <span style="color:#f92672">enabled</span>: <span style="color:#66d9ef">true</span> <span style="color:#75715e"><span>&nbsp;#</span> Change “false” to “true”.</span>
                  <span style="color:#f92672">istio</span>: <span style="color:#75715e"><span>#</span> Customizing the istio installation configuration, refer to https://istio.io/latest/docs/setup/additional-setup/customize-installation/</span>
                  <span style="color:#f92672">&nbsp;&nbsp;components</span>:
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;ingressGateways</span>:
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;-</span> <span style="color:#f92672">&nbsp;name</span>: <span style="color:#ae81ff">istio-ingressgateway</span> <span style="color:#75715e"><span>&nbsp;#</span><span>&nbsp;Used to expose a service outside of the service mesh using an Istio Gateway. The value is false by defalut.</span></span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;enabled</span>: <span style="color:#66d9ef">false</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;cni</span>: 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;enabled</span>: <span style="color:#66d9ef">false</span> <span style="color:#75715e"><span>&nbsp;#</span> When the value is true, it identifies user application pods with sidecars requiring traffic redirection and sets this up in the Kubernetes pod lifecycle’s network setup phase.</span>
               </p>
            </code>
         </div>
      </pre>
   </article>
   
<div className="notices note">
  <p>Note</p>
  <div>
    - For more information about how to access service after enabling Ingress Gateway, please refer to [Ingress Gateway](https://istio.io/latest/docs/tasks/traffic-management/ingress/ingress-control/).
    - For more information about the Istio CNI plugin, please refer to [Install Istio with the Istio CNI plugin](https://istio.io/latest/docs/setup/additional-setup/cni/).
  </div>
</div>


3. Run the following command to create a cluster using the configuration file:

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

As you [install Super Kubenetes on Kubernetes](../../installing-on-kubernetes/introduction/overview/), you can enable Super Kubenetes Service Mesh first in the [cluster-configuration.yaml](https://github.com/Super Kubenetes/ks-installer/releases/download/v3.3.0/cluster-configuration.yaml) file.

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

2. In this local `cluster-configuration.yaml` file, navigate to `servicemesh` and enable it by changing `false` to `true` for `enabled`. Save the file after you finish.

    <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  <span style="color:#f92672">servicemesh</span>:
                  <span style="color:#f92672">enabled</span>: <span style="color:#66d9ef">true</span> <span style="color:#75715e"><span>&nbsp;#</span> Change “false” to “true”.</span>
                  <span style="color:#f92672">istio</span>: <span style="color:#75715e"><span>#</span> Customizing the istio installation configuration, refer to https://istio.io/latest/docs/setup/additional-setup/customize-installation/</span>
                  <span style="color:#f92672">&nbsp;&nbsp;components</span>:
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;ingressGateways</span>:
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;-</span> <span style="color:#f92672">&nbsp;name</span>: <span style="color:#ae81ff">istio-ingressgateway</span> <span style="color:#75715e"><span>&nbsp;#</span><span>&nbsp;Used to expose a service outside of the service mesh using an Istio Gateway. The value is false by defalut.</span></span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;enabled</span>: <span style="color:#66d9ef">false</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;cni</span>: 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;enabled</span>: <span style="color:#66d9ef">false</span> <span style="color:#75715e"><span>&nbsp;#</span> When the value is true, it identifies user application pods with sidecars requiring traffic redirection and sets this up in the Kubernetes pod lifecycle’s network setup phase.</span>
               </p>
            </code>
         </div>
      </pre>
   </article>

3. Run the following commands to start installation:

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

## Enable Super Kubenetes Service Mesh After Installation

1. Log in to the console as `admin`. Click **Platform** in the upper-left corner and select **Cluster Management**.
   
2. Click **CRDs** and enter `clusterconfiguration` in the search bar. Click the result to view its detail page.

  <div className="notices info">
    <p>Info</p>
    <div>
      A Custom Resource Definition (CRD) allows users to create a new type of resources without adding another API server. They can use these resources like any other native Kubernetes objects.    
    </div>
  </div>

3. In **Custom Resources**, click <img src="/dist/assets/docs/v3.3/enable-pluggable-components/KubeSphere-service-mesh/three-dots.png" height="20px"> on the right of `ks-installer` and select **Edit YAML**.
   
4. In this YAML file, navigate to `servicemesh` and change `false` to `true` for `enabled`. After you finish, click **OK** in the lower-right corner to save the configuration.

    <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  <span style="color:#f92672">servicemesh</span>:
                  <span style="color:#f92672">enabled</span>: <span style="color:#66d9ef">true</span> <span style="color:#75715e"><span>&nbsp;#</span> Change “false” to “true”.</span>
                  <span style="color:#f92672">istio</span>: <span style="color:#75715e"><span>#</span> Customizing the istio installation configuration, refer to https://istio.io/latest/docs/setup/additional-setup/customize-installation/</span>
                  <span style="color:#f92672">&nbsp;&nbsp;components</span>:
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;ingressGateways</span>:
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;-</span> <span style="color:#f92672">&nbsp;name</span>: <span style="color:#ae81ff">istio-ingressgateway</span> <span style="color:#75715e"><span>&nbsp;#</span><span>&nbsp;Used to expose a service outside of the service mesh using an Istio Gateway. The value is false by defalut.</span></span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;enabled</span>: <span style="color:#66d9ef">false</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;cni</span>: 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;enabled</span>: <span style="color:#66d9ef">false</span> <span style="color:#75715e"><span>&nbsp;#</span> When the value is true, it identifies user application pods with sidecars requiring traffic redirection and sets this up in the Kubernetes pod lifecycle’s network setup phase.</span>
               </p>
            </code>
         </div>
      </pre>
   </article>

5. Run the following command in kubectl to check the installation process:

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
      You can find the web kubectl tool by clicking <img src="/dist/assets/docs/v3.3/enable-pluggable-components/KubeSphere-service-mesh/hammer.png" height="20px"> in the lower-right corner of the console.
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
			Go to <b>System Components</b> and check whether all components on the <b>Istio </b> tab page is in <b>Healthy </b> state. If yes, the component is successfully installed.
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
						<code>kubectl get pod -n istio-system</code>
					</div>
				</pre>
			</article>
			<p>
				The following is an example of the output if the component runs successfully
			</p>
			<article className="highlight">
				<pre>
					<div className="copy-code-button" title="Copy Code">
					</div>
					<div className="code-over-div">
                  <code>NAME                                    READY   STATUS    RESTARTS   AGE
                  istio-ingressgateway-78dbc5fbfd-f4cwt   1/1     Running   <span style="color:#ae81ff">0</span>          9m5s
                  istiod-1-6-10-7db56f875b-mbj5p          1/1     Running   <span style="color:#ae81ff">0</span>          10m
                  jaeger-collector-76bf54b467-k8blr       1/1     Running   <span style="color:#ae81ff">0</span>          6m48s
                  jaeger-operator-7559f9d455-89hqm        1/1     Running   <span style="color:#ae81ff">0</span>          7m
                  jaeger-query-b478c5655-4lzrn            2/2     Running   <span style="color:#ae81ff">0</span>          6m48s
                  kiali-f9f7d6f9f-gfsfl                   1/1     Running   <span style="color:#ae81ff">0</span>          4m1s
                  kiali-operator-7d5dc9d766-qpkb6         1/1     Running   <span style="color:#ae81ff">0</span>          6m53s
                  </code>
					</div>
				</pre>
			</article>
		</main>
	</div>
</main>
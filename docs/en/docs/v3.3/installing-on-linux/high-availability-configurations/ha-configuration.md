---
title: "Set up an HA Cluster Using a Load Balancer"
keywords: 'Super Kubenetes, Kubernetes, HA, high availability, installation, configuration'
description: 'Learn how to create a highly available cluster using a load balancer.'
linkTitle: "Set up an HA Cluster Using a Load Balancer"
weight: 3220
---

You can set up Kubernetes cluster (a control plane node) with Super Kubenetes installed based on the tutorial of [Multi-node Installation](../../../installing-on-linux/introduction/multioverview/). Clusters with a control plane node may be sufficient for development and testing in most cases. For a production environment, however, you need to consider the high availability of the cluster. If key components (for example, kube-apiserver, kube-scheduler, and kube-controller-manager) are all running on the same control plane node, Kubernetes and Super Kubenetes will be unavailable once the control plane node goes down. Therefore, you need to set up a high-availability cluster by provisioning load balancers with multiple control plane nodes. You can use any cloud load balancer, or any hardware load balancer (for example, F5). In addition, Keepalived and [HAproxy](https://www.haproxy.com/), or Nginx is also an alternative for creating high-availability clusters.

This tutorial demonstrates the general configurations of a high-availability cluster as you install Super Kubenetes on Linux.

## Architecture

Make sure you have prepared six Linux machines before you begin, with three of them serving as control plane nodes and the other three as worker nodes. The following image shows details of these machines, including their private IP address and role. For more information about system and network requirements, see [Multi-node Installation](../../../installing-on-linux/introduction/multioverview/#step-1-prepare-linux-hosts).

![ha-architecture](/dist/assets/docs/v3.3/installing-on-linux/high-availability-configurations/set-up-ha-cluster-using-lb/ha-architecture.png)

## Configure a Load Balancer

You must create a load balancer in your environment to listen (also known as listeners on some cloud platforms) on key ports. Here is a table of recommended ports that need to be listened on.

| Service    | Protocol | Port  |
| ---------- | -------- | ----- |
| apiserver  | TCP      | 6443  |
| ks-console | TCP      | 30880 |
| http       | TCP      | 80    |
| https      | TCP      | 443   |

<div className="notices note">
  <p>Note</p>
  <div>
    - Make sure your load balancer at least listens on the port of apiserver. 

    - You may need to open ports in your security group to ensure external traffic is not blocked depending on where your cluster is deployed. For more information, see [Port Requirements](../../../installing-on-linux/introduction/port-firewall/).

    - You can configure both internal and external load balancers on some cloud platforms. After assigning a public IP address to the external load balancer, you can use the IP address to access the cluster. 

    - For more information about how to configure load balancers, see [Installing on Public Cloud](../../../installing-on-linux/public-cloud/install-Super Kubenetes-on-azure-vms/) to see specific steps on major public cloud platforms.
  </div>
</div>

## Download KubeKey

[Kubekey](https://github.com/Super Kubenetes/kubekey) is the next-gen installer which provides an easy, fast and flexible way to install Kubernetes and Super Kubenetes. Follow the steps below to download KubeKey.

<main className="code-tabs">
  <ul className="nav nav-tabs">
    <li className="nav-item"><a className="nav-link" href="#">Good network connections to GitHub/Googleapis</a></li>
    <li className="nav-item active"><a className="nav-link" href="#">Poor network connections to GitHub/Googleapis</a></li>
  </ul>
  <div className="tab-content">
    <main className="tab-pane active" title="Good network connections to GitHub/Googleapis">
      <p>Download KubeKey from its <a href="https://github.com/Super Kubenetes/kubekey/releases">GitHub Release Page</a> or run the following command:</p>
      <article className="highlight">
        <pre>
          <div className="copy-code-button" title="Copy Code"></div>
          <div className="code-over-div">
            <code>curl -sfL <a style="color:#ffffff; cursor:text;">https://get-kk.Super Kubenetes.io</a> | VERSION<span style="color:#f92672">=</span>v2.2.2 sh -</code>
          </div>
        </pre>
      </article>
    </main>
    <main className="tab-pane" title="Poor network connections to GitHub/Googleapis">
      <p>Run the following command first to make sure you download KubeKey from the correct zone.</p>
      <article className="highlight">
        <pre>
          <div className="copy-code-button" title="Copy Code"></div>
          <div className="code-over-div">
            <code>export KKZONE<span style="color:#f92672">=</span>cn</code>
          </div>
        </pre>
      </article>
      <p>Run the following command to download KubeKey:</p>
      <article className="highlight">
        <pre>
          <div className="copy-code-button" title="Copy Code"></div>
          <div className="code-over-div">
            <code>curl -sfL <a style="color:#ffffff; cursor:text;">https://get-kk.Super Kubenetes.io</a> | VERSION<span style="color:#f92672">=</span>v2.2.2 sh -</code>
          </div>
        </pre>
      </article>
      <article class="notices note">
        <p>Note</p>
        <div>
          After you download KubeKey, if you transfer it to a new machine also with poor network connections to Googleapis, you must run <code>export KKZONE=cn</code> again before you proceed with the following steps.
        </div>
      </article>
    </main>
  </div>
</main>

<div className="notices note">
  <p>Note</p>
  <div>
    The commands above download the latest release (v2.2.2) of KubeKey. You can change the version number in the command to download a specific version.
  </div>
</div>

Make `kk` executable:

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>chmod +x kk</code>
      </div>
  </pre>
</article>

Create an example configuration file with default configurations. Here Kubernetes v1.22.10 is used as an example.

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>./kk create config --with-Super Kubenetes v3.3.0 --with-kubernetes v1.22.10</code>
      </div>
  </pre>
</article>

<div className="notices note">
  <p>Note</p>
  <div>
    - Recommended Kubernetes versions for Super Kubenetes 3.3.0: v1.19.x, v1.20.x, v1.21.x, v1.22.x, and v1.23.x (experimental support). If you do not specify a Kubernetes version, KubeKey will install Kubernetes v1.23.7 by default. For more information about supported Kubernetes versions, see [Support Matrix](../../../installing-on-linux/introduction/kubekey/#support-matrix).
    
    - If you do not add the flag `--with-Super Kubenetes` in the command in this step, Super Kubenetes will not be deployed unless you install it using the `addons` field in the configuration file or add this flag again when you use `./kk create cluster` later.
    
    - If you add the flag `--with-Super Kubenetes` without specifying a Super Kubenetes version, the latest version of Super Kubenetes will be installed.
  </div>
</div>

## Deploy Super Kubenetes and Kubernetes

After you run the commands above, a configuration file `config-sample.yaml` will be created. Edit the file to add machine information, configure the load balancer and more.

<div className="notices note">
  <p>Note</p>
  <div>
    The file name may be different if you customize it.
  </div>
</div>

### config-sample.yaml example

   <article className="highlight">
      <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
									<span style="color:#f92672">spec</span>: 
									<span style="color:#f92672">&nbsp;&nbsp;hosts</span>: 
									&nbsp;&nbsp;- {<span style="color:#f92672">name: master1, address: 192.168.0.2, internalAddress: 192.168.0.2, user: ubuntu, password</span>: <span style="color:#ae81ff">Testing123}</span> 
									&nbsp;&nbsp;- {<span style="color:#f92672">name: master2, address: 192.168.0.3, internalAddress: 192.168.0.3, user: ubuntu, password</span>: <span style="color:#ae81ff">Testing123}</span> 
									&nbsp;&nbsp;- {<span style="color:#f92672">name: master3, address: 192.168.0.4, internalAddress: 192.168.0.4, user: ubuntu, password</span>: <span style="color:#ae81ff">Testing123}</span> 
									&nbsp;&nbsp;- {<span style="color:#f92672">name: node1, address: 192.168.0.5, internalAddress: 192.168.0.5, user: ubuntu, password</span>: <span style="color:#ae81ff">Testing123}</span> 
									&nbsp;&nbsp;- {<span style="color:#f92672">name: node2, address: 192.168.0.6, internalAddress: 192.168.0.6, user: ubuntu, password</span>: <span style="color:#ae81ff">Testing123}</span> 
									&nbsp;&nbsp;- {<span style="color:#f92672">name: node3, address: 192.168.0.7, internalAddress: 192.168.0.7, user: ubuntu, password</span>: <span style="color:#ae81ff">Testing123}</span> 
									<span style="color:#f92672">&nbsp;&nbsp;roleGroups</span>: 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;etcd</span>: 
									&nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#ae81ff">master1</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#ae81ff">master2</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#ae81ff">master3</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;control-plane</span>: 
									&nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#ae81ff">master1</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#ae81ff">master2</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#ae81ff">master3</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;worker</span>: 
									&nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#ae81ff">node1</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#ae81ff">node2</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#ae81ff">node3</span>
               </p>
            </code></div></pre></article>

For more information about different fields in this configuration file, see [Kubernetes Cluster Configurations](../../../installing-on-linux/introduction/vars/) and [Multi-node Installation](../../../installing-on-linux/introduction/multioverview/#2-edit-the-configuration-file).

### Configure the load balancer

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
              <p>
                <span style="color:#f92672">spec</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;controlPlaneEndpoint</span>: 
                <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span><span>#</span>Internal loadbalancer for apiservers</span> 
                <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span>internalLoadbalancer: haproxy</span>  
                
                <span></span> 
                  
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;domain</span>: <span style="color:#ae81ff">lb.Super Kubenetes.local</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;address</span>: <span style="color:#e6db74">"192.168.0.xx"</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;port</span>: <span style="color:#ae81ff">6443</span> 
              </p>
          </code>
        </div></pre></article>

<div className="notices note">
  <p>Note</p>
  <div>
    - The address and port should be indented by two spaces in `config-sample.yaml`.
    - In most cases, you need to provide the **private IP address** of the load balancer for the field `address`. However, different cloud providers may have different configurations for load balancers. For example, if you configure a Server Load Balancer (SLB) on Alibaba Cloud, the platform assigns a public IP address to the SLB, which means you need to specify the public IP address for the field `address`.
    - The domain name of the load balancer is `lb.Super Kubenetes.local` by default for internal access.
    - To use an internal load balancer, uncomment the field `internalLoadbalancer`.
  </div>
</div>


### Persistent storage plugin configurations

For a production environment, you need to prepare persistent storage and configure the storage plugin (for example, CSI) in `config-sample.yaml` to define which storage service you want to use. For more information, see [Persistent Storage Configurations](../../../installing-on-linux/persistent-storage-configurations/understand-persistent-storage/).

### Enable pluggable components (Optional)

Super Kubenetes has decoupled some core feature components since v2.1.0. These components are designed to be pluggable which means you can enable them either before or after installation. By default, Super Kubenetes will be installed with the minimal package if you do not enable them.

You can enable any of them according to your demands. It is highly recommended that you install these pluggable components to discover the full-stack features and capabilities provided by Super Kubenetes. Make sure your machines have sufficient CPU and memory before enabling them. See [Enable Pluggable Components](../../../pluggable-components/) for details.

### Start installation

After you complete the configuration, you can execute the following command to start the installation:

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>./kk create cluster -f config-sample.yaml</code>
      </div>
  </pre>
</article>

### Verify installation

1. Run the following command to inspect the logs of installation.

   <article className="highlight">
      <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>kubectl logs -n Super Kubenetes-system <span style="color:#66d9ef">$(</span>kubectl get pod -n Super Kubenetes-system -l <span style="color:#e6db74">'app in (ks-install, ks-installer)'</span> -o jsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">'{.items[0].metadata.name}'</span><span style="color:#66d9ef">)</span> -f</code>
         </div>
      </pre>
   </article>

2. When you see the following message, it means your HA cluster is successfully created.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
            <p>
              <span style="color:#75715e">###########################################################</span> 
              <span style="color:#75715e"><span>#</span><span>#</span><span>#</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Welcome to Super Kubenetes!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span><span>#</span><span>#</span></span> 
              <span style="color:#75715e">###########################################################</span> 
              <span></span> 
              <span style="color:#ffffff">Console: <a style="color:#ffffff; cursor:text;">http://192.168.0.3:30880</a></span> 
              <span style="color:#ffffff">Account: admin</span> 
              <span style="color:#ffffff">Password: P@88w0rd</span> 
              <span></span> 
              <span style="color:#ffffff">NOTES：</span> 
              <span style="color:#ffffff">&nbsp;&nbsp;1. After you log into the console, please check the</span> 
              <span style="color:#ffffff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;monitoring status of service components in</span> 
              <span style="color:#ffffff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the<span style="color:#e6db74">&nbsp;"Cluster Management"</span>. If any service is not</span> 
              <span style="color:#ffffff">&nbsp;&nbsp;&nbsp;&nbsp; ready, please wait patiently <span style="color:#66d9ef">until</span> all components </span> 
              <span style="color:#ffffff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;are up and running.</span> 
              <span style="color:#ffffff">&nbsp;&nbsp;2. Please change the default password after login.</span> 
              <span></span> 
              <span style="color:#75715e">###########################################################</span> <span style="color:#ffffff"> 
              <span></span><a style="color:#ffffff; cursor:text;">https://ai.kuberix.co.kr</a><span></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2020-xx-xx xx:xx:xx</span> 
              <span style="color:#75715e">###########################################################</span> <span style="color:#ae81ff">
            </p>
          </code>
        </div>
    </pre>
  </article>


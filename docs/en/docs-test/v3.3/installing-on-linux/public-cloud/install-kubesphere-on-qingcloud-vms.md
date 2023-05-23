---
title: "Deploy Super Kubenetes on QingCloud Instances"
keywords: "Super Kubenetes, Installation, HA, High-availability, LoadBalancer"
description: "Learn how to create a high-availability cluster on QingCloud platform."
linkTitle: "Deploy Super Kubenetes on QingCloud Instances"
Weight: 3420
---

## Introduction

For a production environment, you need to consider the high availability of the cluster. If key components (for example, kube-apiserver, kube-scheduler, and kube-controller-manager) are all running on the same control plane node, Kubernetes and Super Kubenetes will be unavailable once the control plane node goes down. Therefore, you need to set up a high-availability cluster by provisioning load balancers with multiple control plane nodes. You can use any cloud load balancer, or any hardware load balancer (for example, F5). In addition, Keepalived and [HAproxy](https://www.haproxy.com/), or Nginx is also an alternative for creating high-availability clusters.

This tutorial walks you through an example of how to create two [QingCloud load balancers](https://docs.qingcloud.com/product/network/loadbalancer), serving as the internal load balancer and external load balancer respectively, and of how to implement high availability of control plane and etcd nodes using the load balancers.

## Prerequisites

- Make sure you already know how to install Super Kubenetes on a multi-node cluster by following the [guide](../../../installing-on-linux/introduction/multioverview/). For detailed information about the configuration file that is used for installation, see [Edit the configuration file](../../../installing-on-linux/introduction/multioverview/#2-edit-the-configuration-file). This tutorial focuses more on how to configure load balancers.
- You need a [QingCloud](https://console.qingcloud.com/login) account to create load balancers, or follow the guide of any other cloud provider to create load balancers.
- For a production environment, it is recommended that you prepare persistent storage and create a StorageClass in advance. For development and testing, you can use the integrated OpenEBS to provision LocalPV as the storage service directly.

## Architecture

This example prepares six machines of **Ubuntu 16.04.6**. You will create two load balancers, and deploy three control plane nodes and etcd nodes on three of the machines. You can configure these control plane and etcd nodes in `config-sample.yaml` created by KubeKey (Please note that this is the default name, which can be changed by yourself).

![ha-architecture](/dist/assets/docs/v3.3/installing-on-linux/installing-on-public-cloud/deploy-Super Kubenetes-on-qingcloud-instances/ha-architecture.png)

<div className="notices note">
  <p>Note</p>
  <div>
    The Kubernetes document [Options for Highly Available topology](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/ha-topology/) demonstrates that there are two options for configuring the topology of a highly available (HA) Kubernetes cluster, i.e. stacked etcd topology and external etcd topology. You should carefully consider the advantages and disadvantages of each topology before setting up an HA cluster according to [this document](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/ha-topology/). This tutorial adopts stacked etcd topology to bootstrap an HA cluster for demonstration purposes.
  </div>
</div>

## Install an HA Cluster

### Step 1: Create load balancers

This step demonstrates how to create load balancers on the QingCloud platform.

#### Create an internal load balancer

1. Log in to the [QingCloud console](https://console.qingcloud.com/login). In the menu on the left, under **Network & CDN**, select **Load Balancers**. Click **Create** to create a load balancer.

   ![create-lb](/dist/assets/docs/v3.3/installing-on-linux/installing-on-public-cloud/deploy-Super Kubenetes-on-qingcloud-instances/create-lb.png)

2. In the pop-up window, set a name for the load balancer. Choose the VxNet where your machines are created from the **Network** drop-down list. Here is `pn`. Other fields can be default values as shown below. Click **Submit** to finish.

   ![qingcloud-lb](/dist/assets/docs/v3.3/installing-on-linux/installing-on-public-cloud/deploy-Super Kubenetes-on-qingcloud-instances/qingcloud-lb.png)

3. Click the load balancer. On the detail page, create a listener that listens on port `6443` with the **Listener Protocol** set to `TCP`.

   ![listener](/dist/assets/docs/v3.3/installing-on-linux/installing-on-public-cloud/deploy-Super Kubenetes-on-qingcloud-instances/listener.png)

   - **Name**: Define a name for this Listener
   - **Listener Protocol**: Select `TCP` protocol
   - **Port**: `6443`
   - **Balance mode**: `Poll`

   Click **Submit** to continue.

  <div className="notices note">
    <p>Note</p>
    <div>
      After you create the listener, check the firewall rules of the load balancer. Make sure that port `6443` has been added to the firewall rules and that external traffic is allowed to port `6443`. Otherwise, the installation will fail. You can find the information in **Security Groups** under **Security** on the QingCloud platform.
    </div>
  </div>

4. Click **Add Backend**, and choose the VxNet you just selected (in this example, it is `pn`). Click **Advanced Search**, choose the three control plane nodes, and set the port to `6443` which is the default secure port of api-server.

   ![3-master](/dist/assets/docs/v3.3/installing-on-linux/installing-on-public-cloud/deploy-Super Kubenetes-on-qingcloud-instances/3-master.png)

   Click **Submit** when you finish.

5. Click  **Apply Changes** to use the configurations. At this point, you can find the three control plane nodes have been added as the backend servers of the listener that is behind the internal load balancer.

  <div className="notices note">
    <p>Note</p>
    <div>
      The status of all control plane nodes might show **Not Available** after you added them as backends. This is normal since port `6443` of api-server is not active on control plane nodes yet. The status will change to **Active** and the port of api-server will be exposed after the installation finishes, which means the internal load balancer you configured works as expected.
    </div>
  </div>
   
   ![apply-change](/dist/assets/docs/v3.3/installing-on-linux/installing-on-public-cloud/deploy-Super Kubenetes-on-qingcloud-instances/apply-change.png)
   
   Record the Intranet VIP shown under **Networks**. The IP address will be added later to the configuration file.

#### Create an external load balancer

You need to create an EIP in advance. To create an EIP, go to **Elastic IPs** under **Networks & CDN**.

<div className="notices note">
  <p>Note</p>
  <div>
    Two elastic IPs are needed for this tutorial, one for the VPC network and the other for the external load balancer created in this step. You cannot associate the same EIP to the VPC network and the load balancer at the same time.
  </div>
</div>


1. Similarly, create an external load balancer while don't select VxNet for the **Network** field. Bind the EIP that you created to this load balancer by clicking **Add IPv4**.

   ![bind-eip](/dist/assets/docs/v3.3/installing-on-linux/installing-on-public-cloud/deploy-Super Kubenetes-on-qingcloud-instances/bind-eip.png)

2. On the load balancer's detail page, create a listener that listens on port `30880` (NodePort of Super Kubenetes console) with **Listener Protocol** set to `HTTP`.

  <div className="notices note">
    <p>Note</p>
    <div>
      After you create the listener, check the firewall rules of the load balancer. Make sure that port `30880` has been added to the firewall rules and that external traffic is allowed to port `30880`. Otherwise, the installation will fail. You can find the information in **Security Groups** under **Security** on the QingCloud platform.
    </div>
  </div>

   ![listener2](/dist/assets/docs/v3.3/installing-on-linux/installing-on-public-cloud/deploy-Super Kubenetes-on-qingcloud-instances/listener2.png)

3. Click **Add Backend**. In **Advanced Search**, choose the `six` machines on which you are going to install Super Kubenetes within the VxNet `pn`, and set the port to `30880`.

   ![six-instances](/dist/assets/docs/v3.3/installing-on-linux/installing-on-public-cloud/deploy-Super Kubenetes-on-qingcloud-instances/six-instances.png)

   Click **Submit** when you finish.

4. Click **Apply Changes** to use the configurations. At this point, you can find the six machines have been added as the backend servers of the listener that is behind the external load balancer.

### Step 2: Download KubeKey

[Kubekey](https://github.com/Super Kubenetes/kubekey) is the next-gen installer which provides an easy, fast and flexible way to install Kubernetes and Super Kubenetes.

Follow the step below to download KubeKey.

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
            <code>curl -sfL <a style="color:#ffffff; cursor:text;">https://get-kk.Super Kubenetes.io</a> | VERSION<span style="color:#f92672">=</span>v2.2.1 sh -</code>
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
            <code>curl -sfL <a style="color:#ffffff; cursor:text;">https://get-kk.Super Kubenetes.io</a> | VERSION<span style="color:#f92672">=</span>v2.2.1 sh -</code>
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
    The commands above download the latest release (v2.2.1) of KubeKey. You can change the version number in the command to download a specific version.
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


### Step 3: Set cluster nodes

As you adopt the HA topology with stacked control plane nodes, the control plane nodes and etcd nodes are on the same three machines.

| **Property** | **Description**                   |
| :----------- | :-------------------------------- |
| `hosts`      | Detailed information of all nodes |
| `etcd`       | etcd node names                   |
| `control-plane`     | Control plane node names                 |
| `worker`     | Worker node names                 |

Put the control plane nodes (`master1`, `master2` and `master3`) under `etcd` and `master` respectively as below, which means these three machines will serve as both the control plane and etcd nodes. Note that the number of etcd needs to be odd. Meanwhile, it is not recommended that you install etcd on worker nodes since the memory consumption of etcd is very high.

#### config-sample.yaml Example

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
                &nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#ae81ff">node3</span></p>
          </code>
        </div></pre></article>

For a complete configuration sample explanation, see [this file](https://github.com/Super Kubenetes/kubekey/blob/release-2.2/docs/config-example.md).

### Step 4: Configure the load balancer

In addition to the node information, you need to provide the load balancer information in the same YAML file. For the Intranet VIP address, you can find it in the last part when you create [an internal load balancer](#step-1-create-load-balancers). Assume the VIP address and listening port of the **internal load balancer** are `192.168.0.253` and `6443` 

respectively, and you can refer to the following example.

#### The configuration example in config-sample.yaml

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
              <p>
                <span style="color:#75715e"><span>#</span><span>#</span> Internal LB config example</span>
                <span style="color:#75715e"><span>#</span><span>#</span> apiserver_loadbalancer_domain_name: "lb.Super Kubenetes.local"</span>
                <span style="color:#f92672">&nbsp;&nbsp;controlPlaneEndpoint</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;domain</span>: <span style="color:#ae81ff">lb.Super Kubenetes.local</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;address</span>: <span style="color:#e6db74">"192.168.0.253"</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;port</span>: <span style="color:#ae81ff">6443</span></p>
          </code>
        </div></pre></article>

<div className="notices note">
  <p>Note</p>
  <div>
    - The address and port should be indented by two spaces in `config-sample.yaml`, and the address should be VIP.
    - The domain name of the load balancer is `lb.Super Kubenetes.local` by default for internal access. If you need to change the domain name, uncomment and modify it.
  </div>
</div>

### Step 5: Kubernetes cluster configurations (Optional)

Kubekey provides some fields and parameters to allow the cluster administrator to customize Kubernetes installation, including Kubernetes version, network plugins and image registry. There are some default values provided in `config-sample.yaml`. You can modify Kubernetes-related configurations in the file based on your needs. For more information, see [Kubernetes Cluster Configurations](../../../installing-on-linux/introduction/vars/).

### Step 6: Persistent storage plugin configurations

Considering data persistence in a production environment, you need to prepare persistent storage and configure the storage plugin (for example, CSI) in `config-sample.yaml` to define which storage service you want.

<div className="notices note">
  <p>Note</p>
  <div>
    For testing or development, you can skip this part. KubeKey will use the integrated OpenEBS to provision LocalPV as the storage service directly.
  </div>
</div>


**Available storage plugins and clients**

- Ceph RBD & CephFS
- GlusterFS
- QingCloud CSI
- QingStor CSI
- More plugins will be supported in future releases

Make sure you have configured the storage plugin before you get started. KubeKey will create a StorageClass and persistent volumes for related workloads during the installation. For more information, see [Persistent Storage Configurations](../../../installing-on-linux/persistent-storage-configurations/understand-persistent-storage/).

### Step 7: Enable pluggable components (Optional)

Super Kubenetes has decoupled some core feature components since v2.1.0. These components are designed to be pluggable which means you can enable them either before or after installation. By default, Super Kubenetes will be installed with the minimal package if you do not enable them.

You can enable any of them according to your demands. It is highly recommended that you install these pluggable components to discover the full-stack features and capabilities provided by Super Kubenetes. Make sure your machines have sufficient CPU and memory before you enable them. See [Enable Pluggable Components](../../../pluggable-components/) for details.

### Step 8: Start to bootstrap a cluster

After you complete the configuration, you can execute the following command to start the installation:

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>./kk create cluster -f config-sample.yaml</code>
      </div>
  </pre>
</article>

### Step 9: Verify the installation

Inspect the logs of installation. When you see output logs as follows, it means Super Kubenetes has been successfully deployed.

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>kubectl logs -n Super Kubenetes-system <span style="color:#66d9ef">$(</span>kubectl get pod -n Super Kubenetes-system -l <span style="color:#e6db74">'app in (ks-install, ks-installer)'</span> -o jsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">'{.items[0].metadata.name}'</span><span style="color:#66d9ef">)</span> -f</code>
      </div>
  </pre>
</article>

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
            <span style="color:#ffffff">Console: <a style="color:#ffffff; cursor:text;">http://192.168.0.2:30880</a></span> 
            <span style="color:#ffffff">Account: admin</span> 
            <span style="color:#ffffff">Password: P@88w0rd</span> 
            <span></span> 
            <span style="color:#ffffff">NOTES：</span> 
            <span style="color:#ffffff">&nbsp;&nbsp;1. After you log into the console, please check the</span> 
            <span style="color:#ffffff">&nbsp;&nbsp;&nbsp;&nbsp;monitoring status of service components in</span> 
            <span style="color:#ffffff">&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#e6db74">"Cluster Management"</span>. If any service is not</span> 
            <span style="color:#ffffff">&nbsp;&nbsp;&nbsp;&nbsp; ready, please wait patiently <span style="color:#66d9ef">until</span> all components </span> 
            <span style="color:#ffffff">&nbsp;&nbsp;&nbsp;&nbsp;are up and running.</span> 
            <span style="color:#ffffff">&nbsp;&nbsp;2. Please change the default password after login.</span> 
            <span></span> 
            <span style="color:#75715e">###########################################################</span> <span style="color:#ae81ff"> 
            <span></span><a style="color:#ffffff; cursor:text;">https://ai.kuberix.co.kr</a><span></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;20xx-xx-xx xx:xx:xx</span> 
            <span style="color:#75715e">###########################################################</span> <span style="color:#ae81ff">
          </p>
        </code>
      </div>
  </pre>
</article>

### Step 10: Verify the HA cluster

Now that you have finished the installation, go back to the detail page of both the internal and external load balancers to see the status.

![active](/dist/assets/docs/v3.3/installing-on-linux/installing-on-public-cloud/deploy-Super Kubenetes-on-qingcloud-instances/active.png)

Both listeners show that the status is **Active**, meaning nodes are up and running.

![active-listener](/dist/assets/docs/v3.3/installing-on-linux/installing-on-public-cloud/deploy-Super Kubenetes-on-qingcloud-instances/active-listener.png)

In the web console of Super Kubenetes, you can also see that all the nodes are functioning well.

To verify if the cluster is highly available, you can turn off an instance on purpose. For example, the above console is accessed through the address `IP: 30880` (the EIP address here is the one bound to the external load balancer). If the cluster is highly available, the console will still work well even if you shut down a control plane node.

## See Also

[Multi-node Installation](../../../installing-on-linux/introduction/multioverview/)

[Kubernetes Cluster Configurations](../../../installing-on-linux/introduction/vars/)

[Persistent Storage Configurations](../../../installing-on-linux/persistent-storage-configurations/understand-persistent-storage/)

[Enable Pluggable Components](../../../pluggable-components/)
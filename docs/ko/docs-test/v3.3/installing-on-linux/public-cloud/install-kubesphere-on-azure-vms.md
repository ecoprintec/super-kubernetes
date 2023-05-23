---
title: 'Deploy Super Kubenetes on Azure VM Instances'
keywords: 'Super Kubenetes, Installation, HA, high availability, load balancer, Azure'
description: 'Learn how to create a high-availability cluster on Azure virtual machines.'
linkTitle: 'Deploy Super Kubenetes on Azure VM Instances'
weight: 3410
---

Using the [Azure cloud platform](https://azure.microsoft.com/en-us/overview/what-is-azure/), you can either install and manage Kubernetes by yourself or adopt a managed Kubernetes solution. If you want to use a fully-managed platform solution, see [Deploy Super Kubenetes on AKS](../../../installing-on-kubernetes/hosted-kubernetes/install-Super Kubenetes-on-aks/) for more details.

Alternatively, you can set up a highly-available cluster on Azure instances. This tutorial demonstrates how to create a production-ready Kubernetes and Super Kubenetes cluster.

## Introduction

This tutorial uses two key features of Azure virtual machines (VMs):

- [Virtual Machine Scale Sets (VMSS)](https://docs.microsoft.com/en-us/azure/virtual-machine-scale-sets/overview): Azure VMSS let you create and manage a group of load balanced VMs. The number of VM instances can automatically increase or decrease in response to demand or a defined schedule (Kubernetes Autoscaler is available, but not covered in this tutorial. See [autoscaler](https://github.com/kubernetes/autoscaler/tree/master/cluster-autoscaler/cloudprovider/azure) for more details), which perfectly fits Worker nodes.
- Availability Sets: An availability set is a logical grouping of VMs within a datacenter that are automatically distributed across fault domains. This approach limits the impact of potential physical hardware failures, network outages, or power interruptions. All the Master and etcd VMs will be placed in an availability set to achieve high availability.

Besides these VMs, other resources like Load Balancer, Virtual Network and Network Security Group will also be used.

## Prerequisites

- You need an [Azure](https://portal.azure.com) account to create all the resources.
- Basic knowledge of [Azure Resource Manager](https://docs.microsoft.com/en-us/azure/azure-resource-manager/templates/) (ARM) templates, which are files that define the infrastructure and configuration for your project.
- For a production environment, it is recommended that you prepare persistent storage and create a StorageClass in advance. For development and testing, you can use [OpenEBS](https://openebs.io/), which is installed by KubeKey by default, to provision LocalPV directly.

## Architecture

Six machines of **Ubuntu 18.04** will be deployed in an Azure Resource Group. Three of them are grouped into an availability set, serving as both the control plane and etcd nodes. The other three VMs will be defined as a VMSS where Worker nodes will be running.

![Architecture](/dist/assets/docs/v3.3/aks/Azure-architecture.png)

These VMs will be attached to a load balancer. There are two predefined rules in the load balancer:

- **Inbound NAT**: The SSH port will be mapped for each machine so that you can easily manage VMs.
- **Load Balancing**: The http and https ports will be mapped to Node pools by default. Other ports can be added on demand.

<table>
	<thead>
		<tr>
			<th>Service</th>
			<th>Protocol</th>
			<th>Rule</th>
			<th>Backend Port</th>
			<th>Frontend Port/Ports</th>
			<th>Pools</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>ssh</td>
			<td>TCP</td>
			<td>Inbound NAT</td>
			<td>22</td>
			<td>50200, 50201, 50202, 50100~50199</td>
			<td>Master, Node</td>
		</tr>
		<tr>
			<td>apiserver</td>
			<td>TCP</td>
			<td>Load Balancing</td>
			<td>6443</td>
			<td>6443</td>
			<td>Master</td>
		</tr>
		<tr>
			<td>ks-console</td>
			<td>TCP</td>
			<td>Load Balancing</td>
			<td>30880</td>
			<td>30880</td>
			<td>Master</td>
		</tr>
		<tr>
			<td>http</td>
			<td>TCP</td>
			<td>Load Balancing</td>
			<td>80</td>
			<td>80</td>
			<td>Node</td>
		</tr>
		<tr>
			<td>https</td>
			<td>TCP</td>
			<td>Load Balancing</td>
			<td>443</td>
			<td>443</td>
			<td>Node</td>
		</tr>
	</tbody>
</table>

## Create HA Cluster Infrastructrue

You don't have to create these resources one by one. According to the best practice of **infrastructure as code** on Azure, all resources in the architecture are already defined as ARM templates.

### Prepare machines

1. Click the **Deploy** button below, and you will be redirected to Azure and asked to fill in deployment parameters.

   <a href="https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FRolandMa1986%2Fazurek8s%2Fmaster%2Fazuredeploy.json" rel="nofollow"><img src="https://raw.githubusercontent.com/Azure/azure-quickstart-templates/master/1-CONTRIBUTION-GUIDE/images/deploytoazure.svg?sanitize=true" alt="Deploy to Azure" style="max-width:100%;"></a> <a href="http://armviz.io/#/?load=https%3A%2F%2Fraw.githubusercontent.com%2FRolandMa1986%2Fazurek8s%2Fmaster%2Fazuredeploy.json" rel="nofollow"><img src="https://raw.githubusercontent.com/Azure/azure-quickstart-templates/master/1-CONTRIBUTION-GUIDE/images/visualizebutton.svg?sanitize=true" alt="Visualize" style="max-width:100%;"></a>

2. On the page that appears, only few parameters need to be changed. Click **Create new** under **Resource group** and enter a name such as `Super KubenetesVMRG`.

3. Enter **Admin Username**.

4. Copy your public SSH key for the field **Admin Key**. Alternatively, create a new one with `ssh-keygen`.

   ![azure-template-parameters](/dist/assets/docs/v3.3/installing-on-linux/installing-on-public-cloud/deploy-KubeSphere-on-azure-vms/azure-template-parameters.png)

  <div className="notices note">
    <p>Note</p>
    <div>
      Password authentication is restricted in Linux configurations. Only SSH is acceptable.
    </div>
  </div>

5. Click **Purchase** at the bottom to continue.

### Review Azure resources in the Portal

After successfully created, all the resources will display in the resource group `Super KubenetesVMRG`. Record the public IP of the load balancer and the private IP addresses of the VMs. You will need them later.

![New Created Resources](/dist/assets/docs/v3.3/aks/azure-vm-all-resources.png)

## Deploy Kubernetes and Super Kubenetes

Execute the following commands on your device or connect to one of the Master VMs through SSH. During the installation, files will be downloaded and distributed to each VM.

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
          <p>
            <span style="color:#75715e"><span>#</span><span>&nbsp;copy your private ssh to master-0</span></span> 
            <span>scp -P </span><span style="color:#ae81ff">50200</span><span>&nbsp;&nbsp;~/.ssh/id_rsa Super Kubenetes@40.81.5.xx:/home/Super Kubenetes/.ssh/</span> 
            <span></span> 
            <span style="color:#75715e"><span>#</span><span>&nbsp;ssh to the master-0</span></span> 
            <span>ssh -i .ssh/id_rsa2  -p50200 Super Kubenetes@40.81.5.xx</span>
            </p>
        </code>
      </div>
  </pre>
</article>

### Download KubeKey

[Kubekey](../../../installing-on-linux/introduction/kubekey/) is a brand-new installation tool which provides an easy, fast and flexible way to install Kubernetes and Super Kubenetes.

1. Download it so that you can generate a configuration file in the next step.

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

2. Create an example configuration file with default configurations. Here Kubernetes v1.22.10 is used as an example.

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

### Example configurations

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              <span style="color:#f92672">spec</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;hosts</span>: 
              &nbsp;&nbsp;- {<span style="color:#f92672">name: master-0, address: 40.81.5.xx, port: 50200, internalAddress: 10.0.1.4, user: Super Kubenetes, privateKeyPath</span>: <span style="color:#e6db74">"~/.ssh/id_rsa"</span>} 
              &nbsp;&nbsp;- {<span style="color:#f92672">name: master-1, address: 40.81.5.xx, port: 50201, internalAddress: 10.0.1.5, user: Super Kubenetes, privateKeyPath</span>: <span style="color:#e6db74">"~/.ssh/id_rsa"</span>} 
              &nbsp;&nbsp;- {<span style="color:#f92672">name: master-2, address: 40.81.5.xx, port: 50202, internalAddress: 10.0.1.6, user: Super Kubenetes, privateKeyPath</span>: <span style="color:#e6db74">"~/.ssh/id_rsa"</span>} 
              &nbsp;&nbsp;- {<span style="color:#f92672">name: node000000, address: 40.81.5.xx, port: 50100, internalAddress: 10.0.0.4, user: Super Kubenetes, privateKeyPath</span>: <span style="color:#e6db74">"~/.ssh/id_rsa"</span>} 
              &nbsp;&nbsp;- {<span style="color:#f92672">name: node000001, address: 40.81.5.xx, port: 50101, internalAddress: 10.0.0.5, user: Super Kubenetes, privateKeyPath</span>: <span style="color:#e6db74">"~/.ssh/id_rsa"</span>} 
              &nbsp;&nbsp;- {<span style="color:#f92672">name: node000002, address: 40.81.5.xx, port: 50102, internalAddress: 10.0.0.6, user: Super Kubenetes, privateKeyPath</span>: <span style="color:#e6db74">"~/.ssh/id_rsa"</span>} 
              <span style="color:#f92672">&nbsp;&nbsp;roleGroups</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;etcd</span>: 
              &nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#ae81ff">master-0</span> 
              &nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#ae81ff">master-1</span> 
              &nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#ae81ff">master-2</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;control-plane</span>: 
              &nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#ae81ff">master-0</span> 
              &nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#ae81ff">master-1</span> 
              &nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#ae81ff">master-2</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;worker</span>: 
              &nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#ae81ff">node000000</span> 
              &nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#ae81ff">node000001</span> 
              &nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#ae81ff">node000002</span>
            </p>
        </code>
      </div>
  </pre>
</article>

For more information, see [this file](https://github.com/Super Kubenetes/kubekey/blob/release-2.2/docs/config-example.md).

### Configure the load balancer

In addition to node information, you need to configure your load balancer in the same YAML file. For the IP address, you can find it in **Azure > Super KubenetesVMRG > PublicLB**. Assume the IP address and listening port of the load balancer are `40.81.5.xx` and `6443` respectively, and you can refer to the following example.

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              <span style="color:#75715e"><span>#</span><span>#</span> Public LB config example</span>
              <span style="color:#75715e"><span>#</span><span>#</span> apiserver_loadbalancer_domain_name: "lb.Super Kubenetes.local"</span>
              <span style="color:#f92672">&nbsp;&nbsp;controlPlaneEndpoint</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;domain</span>: <span style="color:#ae81ff">lb.Super Kubenetes.local</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;address</span>: <span style="color:#e6db74">"40.81.5.xx"</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;port</span>: <span style="color:#ae81ff">6443</span></p>
        </code>
      </div>
  </pre>
</article>

<div className="notices note">
  <p>Note</p>
  <div>
    The public load balancer is used directly instead of an internal load balancer due to Azure [Load Balancer limits](https://docs.microsoft.com/en-us/azure/load-balancer/load-balancer-troubleshoot#cause-4-accessing-the-internal-load-balancer-frontend-from-the-participating-load-balancer-backend-pool-vm).
  </div>
</div>

### Persistent storage plugin configurations

See [Persistent Storage Configurations](../../../installing-on-linux/persistent-storage-configurations/understand-persistent-storage/) for details.

### Configure the network plugin

Azure Virtual Network doesn't support the IPIP mode used by [Calico](https://docs.projectcalico.org/reference/public-cloud/azure#about-calico-on-azure). You need to change the network plugin to `flannel`.

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              <span style="color:#f92672">&nbsp;&nbsp;network</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;plugin</span>: <span style="color:#ae81ff">flannel</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;kubePodsCIDR</span>: <span style="color:#ae81ff">10.233.64.0</span><span style="color:#ae81ff">/18</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;kubeServiceCIDR</span>: <span style="color:#ae81ff">10.233.0.0</span><span style="color:#ae81ff">/18</span></p>
        </code>
      </div>
  </pre>
</article>

### Create a cluster

1. After you complete the configuration, you can execute the following command to start the installation:

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>./kk create cluster -f config-sample.yaml</code>
        </div>
    </pre>
  </article>

2. Inspect the logs of installation:

  <article className="highlight">
      <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>kubectl logs -n Super Kubenetes-system <span style="color:#66d9ef">$(</span>kubectl get pod -n Super Kubenetes-system -l <span style="color:#e6db74">'app in (ks-install, ks-installer)'</span> -o jsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">'{.items[0].metadata.name}'</span><span style="color:#66d9ef">)</span> -f</code>
         </div>
      </pre>
   </article>

3. When the installation finishes, you can see the following message:

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
              <span style="color:#ffffff">Console: <a style="color:#ffffff; cursor:text;">http://10.128.0.44:30880</a></span> 
              <span style="color:#ffffff">Account: admin</span> 
              <span style="color:#ffffff">Password: P@88w0rd</span> 
              <span style="color:#ffffff">NOTES：</span> 
              <span style="color:#ffffff">&nbsp;&nbsp;1. After you log into the console, please check the</span> 
              <span style="color:#ffffff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;monitoring status of service components in</span> 
              <span style="color:#ffffff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the<span style="color:#e6db74">&nbsp;"Cluster Management"</span>. If any service is not</span> 
              <span style="color:#ffffff">&nbsp;&nbsp;&nbsp;&nbsp; ready, please wait patiently <span style="color:#66d9ef">until</span> all components </span> 
              <span style="color:#ffffff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;are up and running.</span> 
              <span style="color:#ffffff">&nbsp;&nbsp;2. Please change the default password after login.</span>
              <span></span> 
              <span style="color:#75715e">###########################################################</span> <span style="color:#ffffff"> 
              <span></span><a style="color:#ffffff; cursor:text;">https://ai.kuberix.co.kr</a><span></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;20xx-xx-xx xx:xx:xx</span> 
              <span style="color:#75715e">###########################################################</span> <span style="color:#ae81ff">
            </p>
          </code>
        </div>
    </pre>
  </article>

4. Access the Super Kubenetes console using `<NodeIP>:30880` with the default account and password (`admin/P@88w0rd`).

## Add Additional Ports

As the Kubernetes cluster is set up on Azure instances directly, the load balancer is not integrated with [Kubernetes Services](https://kubernetes.io/docs/concepts/services-networking/service/#loadbalancer). However, you can still manually map the NodePort to the load balancer. There are 2 steps required.

1. Create a new Load Balance Rule in the load balancer.
   ![Load Balancer](/dist/assets/docs/v3.3/aks/azure-vm-loadbalancer-rule.png)
2. Create an Inbound Security rule to allow Internet access in the Network Security Group.
   ![Firewall](/dist/assets/docs/v3.3/aks/azure-vm-firewall.png)

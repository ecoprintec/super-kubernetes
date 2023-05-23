---
title: "Deploy Kubernetes and Super Kubenetes on Bare Metal"
keywords: 'Kubernetes, Super Kubenetes, bare-metal'
description: 'Learn how to create a multi-node cluster with one master on bare metal.'
linkTitle: "Deploy Super Kubenetes on Bare Metal"
weight: 3520
---

## Introduction

In addition to the deployment on cloud, Super Kubenetes can also be installed on bare metal. As the virtualization layer is removed, the infrastructure overhead is drastically reduced, which brings more compute and storage resources to app deployments. As a result, hardware efficiency is improved. Refer to the example below to deploy Super Kubenetes on bare metal.

## Prerequisites

- Make sure you already know how to install Super Kubenetes on a multi-node cluster based on the tutorial [Multi-node Installation](../../../installing-on-linux/introduction/multioverview/).
- Server and network redundancy in your environment.
- For a production environment, it is recommended that you prepare persistent storage and create a StorageClass in advance. For development and testing, you can use the integrated OpenEBS to provision LocalPV as the storage service directly.

## Prepare Linux Hosts

This tutorial uses 3 physical machines of **DELL 620 Intel (R) Xeon (R) CPU E5-2640 v2 @ 2.00GHz (32G memory)**, on which **CentOS Linux release 7.6.1810 (Core)** will be installed for the minimal deployment of Super Kubenetes.

### Install CentOS

Download and install the [image](https://www.centos.org/download/) first, and CentOS Linux release 7.6.1810 (Core) is recommended. Make sure you allocate at least 200 GB to the root directory where it stores docker images (you can skip this if you are installing Super Kubenetes for testing).

For more information about the supported systems, see [System Requirements](../../../installing-on-linux/introduction/multioverview/). 

Here is a list of the three hosts for your reference.


<table>
	<thead>
		<tr>
			<th>Host IP</th>
			<th>Host Name</th>
			<th>Role</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>192.168.60.152</td>
			<td>master1</td>
			<td>master1, etcd</td>
		</tr>
		<tr>
			<td>192.168.60.153</td>
			<td>worker1</td>
			<td>worker</td>
		</tr>
		<tr>
			<td>192.168.60.154</td>
			<td>worker2</td>
			<td>worker</td>
		</tr>
	</tbody>
</table>

### NIC settings

1. Clear NIC configurations.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>ifdown em1</code>
        </div>
    </pre>
  </article>

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>ifdown em2</code>
        </div>
    </pre>
  </article>

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>rm -rf /etc/sysconfig/network-scripts/ifcfg-em1</code>
        </div>
    </pre>
  </article>

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>rm -rf /etc/sysconfig/network-scripts/ifcfg-em2</code>
        </div>
    </pre>
  </article>

2. Create the NIC bonding.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>nmcli con add type bond con-name bond0 ifname bond0 mode 802.3ad ip4 192.168.60.152/24 gw4 192.168.60.254</code>
        </div>
    </pre>
  </article>

3. Set the bonding mode.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>nmcli con mod id bond0 bond.options mode<span style="color:#f92672">=</span>802.3ad,miimon<span style="color:#f92672">=</span>100,lacp_rate<span style="color:#f92672">=</span>fast,xmit_hash_policy<span style="color:#f92672">=</span>layer2+3</code>
        </div>
    </pre>
  </article>

4. Bind the physical NIC.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>nmcli con add type bond-slave ifname em1 con-name em1 master bond0</code>
        </div>
    </pre>
  </article>

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>nmcli con add type bond-slave ifname em2 con-name em2 master bond0</code>
        </div>
    </pre>
  </article>

5. Change the NIC mode.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
            vi /etc/sysconfig/network-scripts/ifcfg-bond0
            BOOTPROTO<span style="color:#f92672">=</span>static
          </code>
        </div>
    </pre>
  </article>

6. Restart Network Manager.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>systemctl restart NetworkManager</code>
        </div>
    </pre>
  </article>

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>nmcli con <span style="color:#75715e">#</span><span style="color:#75715e"> Display NIC information</span></code>
        </div>
    </pre>
  </article>   

7. Change the host name and DNS.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>hostnamectl set-hostname worker-1</code>
        </div>
    </pre>
  </article>

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>vim /etc/resolv.conf</code>
        </div>
    </pre>
  </article>

### Time settings

1. Synchronize time.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code> yum install -y chrony</code>
        </div>
    </pre>
  </article>

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code> systemctl enable chronyd</code>
        </div>
    </pre>
  </article>

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code> systemctl start chronyd</code>
        </div>
    </pre>
  </article>

   <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>timedatectl set-ntp true</code>
        </div>
    </pre>
  </article>

2. Set the time zone.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>timedatectl set-timezone Asia/Shanghai</code>
        </div>
    </pre>
  </article>

3. Check if the ntp-server is available.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>chronyc activity -v</code>
        </div>
    </pre>
  </article>

### Firewall settings

Execute the following commands to stop and disable the FirewallD service:

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>iptables -F</code>
      </div>
  </pre>
</article>

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>systemctl status firewalld</code>
      </div>
  </pre>
</article>

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>systemctl stop firewalld</code>
      </div>
  </pre>
</article>

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>systemctl disable firewalld</code>
      </div>
  </pre>
</article>

### Package updates and dependencies

Execute the following commands to update system packages and install dependencies.

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>um update</code>
      </div>
  </pre>
</article>

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>yum install openssl openssl-devel</code>
      </div>
  </pre>
</article>

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>yum install socat</code>
      </div>
  </pre>
</article>

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>yum install epel-release</code>
      </div>
  </pre>
</article>

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>yum install conntrack-tools</code>
      </div>
  </pre>
</article>

<div className="notices note">
  <p>Note</p>
  <div>
    You may not need to install all the dependencies depending on the Kubernetes version to be installed. For more information, see [Dependency Requirements](../../../installing-on-linux/introduction/multioverview/).
  </div>
</div> 


## Download KubeKey

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

## Create a Multi-node Cluster

With KubeKey, you can install Kubernetes and Super Kubenetes together. You have the option to create a multi-node cluster by customizing parameters in the configuration file.

Create a Kubernetes cluster with Super Kubenetes installed (for example, `--with-Super Kubenetes v3.3.0`):

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>./kk create config --with-kubernetes v1.22.10 --with-Super Kubenetes v3.3.0</code>
      </div>
  </pre>
</article>

<div className="notices note">
  <p>Note</p>
  <div>
    - Recommended Kubernetes versions for Super Kubenetes 3.3.0: v1.19.x, v1.20.x, v1.21.x, v1.22.x, and v1.23.x (experimental support). If you do not specify a Kubernetes version, KubeKey will install Kubernetes v1.23.7 by default. For more information about supported Kubernetes versions, see [Support Matrix](../../../installing-on-linux/introduction/kubekey/#support-matrix).

    - If you do not add the flag `--with-Super Kubenetes` in the command above, Super Kubenetes will not be deployed unless you install it using the `addons` field in the configuration file or add this flag again when you use `./kk create cluster` later.
    - If you add the flag `--with-Super Kubenetes` without specifying a Super Kubenetes version, the latest version of Super Kubenetes will be installed.
  </div>
</div> 


A default file `config-sample.yaml` will be created. Modify it according to your environment.

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>vi config-sample.yaml</code>
      </div>
  </pre>
</article>

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              <span style="color:#f92672">apiVersion</span>: <span style="color:#ae81ff">kubekey.Super Kubenetes.io/v1alpha1</span> 
              <span style="color:#f92672">kind</span>: <span style="color:#ae81ff">Cluster</span> 
              <span style="color:#f92672">metadata</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">config-sample</span> 
              <span style="color:#f92672">spec</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;hosts</span>: 
              &nbsp;&nbsp;- {<span style="color:#f92672">name: master1, address: 192.168.60.152, internalAddress: 192.168.60.152, user: root, password</span>: <span style="color:#ae81ff">P@ssw0rd}</span> 
              &nbsp;&nbsp;- {<span style="color:#f92672">name: worker1, address: 192.168.60.153, internalAddress: 192.168.60.153, user: root, password</span>: <span style="color:#ae81ff">P@ssw0rd}</span> 
              &nbsp;&nbsp;- {<span style="color:#f92672">name: worker2, address: 192.168.60.154, internalAddress: 192.168.60.154, user: root, password</span>: <span style="color:#ae81ff">P@ssw0rd}</span> 
              <span style="color:#f92672">&nbsp;&nbsp;roleGroups</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;etcd</span>: 
              &nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#ae81ff">master1</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;control-plane</span>: 
              &nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#ae81ff">master1</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;worker</span>: 
              &nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#ae81ff">worker1</span> 
              &nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#ae81ff">worker2</span> 
              <span style="color:#f92672">&nbsp;&nbsp;controlPlaneEndpoint</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;domain</span>: <span style="color:#ae81ff">lb.Super Kubenetes.local</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;address</span>: <span style="color:#e6db74">""</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;port</span>: <span style="color:#ae81ff">6443</span>
            </p>
        </code>
      </div>
  </pre>
</article>

Create a cluster using the configuration file you customized above:

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

#### Verify the installation

After the installation finishes, you can inspect the logs of installation by executing the command below:


<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>kubectl logs -n Super Kubenetes-system <span style="color:#66d9ef">$(</span>kubectl get pod -n Super Kubenetes-system -l <span style="color:#e6db74">'app in (ks-install, ks-installer)'</span> -o jsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">'{.items[0].metadata.name}'</span><span style="color:#66d9ef">)</span> -f</code>
      </div>
  </pre>
</article>

If you can see the welcome log return, it means the installation is successful.

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
          <p>
            <span style="color:#75715e">###########################################################</span> 
            <span style="color:#75715e"><span>#</span><span>#</span><span>#</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Welcome to Super Kubenetes!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span><span>#</span><span>#</span></span> 
            <span style="color:#75715e">###########################################################</span> 
            <span style="color:#ffffff">Console: <a style="color:#ffffff; cursor:text;">http://192.168.60.152:30880</a></span> 
            <span style="color:#ffffff">Account: admin</span> 
            <span style="color:#ffffff">Password: P@88w0rd</span> 
            <span style="color:#ffffff">NOTES：</span> 
            <span style="color:#ffffff">&nbsp;&nbsp;1. After you log into the console, please check the</span> 
            <span style="color:#ffffff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;monitoring status of service components in</span> 
            <span style="color:#ffffff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the<span style="color:#e6db74">&nbsp;"Cluster Management"</span>. If any service is not</span> 
            <span style="color:#ffffff">&nbsp;&nbsp;&nbsp;&nbsp; ready, please wait patiently <span style="color:#66d9ef">until</span> all components </span> 
            <span style="color:#ffffff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;are up and running.</span> 
            <span style="color:#ffffff">&nbsp;&nbsp;2. Please change the default password after login.</span> 
            <span style="color:#75715e">###########################################################</span> <span style="color:#ffffff"> 
            <span></span><a style="color:#ffffff; cursor:text;">https://ai.kuberix.co.kr</a><span></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;20xx-xx-xx xx:xx:xx</span> 
            <span style="color:#75715e">###########################################################</span> <span style="color:#ae81ff">
          </p>
        </code>
      </div>
  </pre>
</article>

#### Log in to the console

You will be able to use default account and password `admin/P@88w0rd` to log in to the console `http://{$IP}:30880` to take a tour of Super Kubenetes. Please change the default password after login.

#### Enable pluggable components (Optional)
The example above demonstrates the process of a default minimal installation. To enable other components in Super Kubenetes, see [Enable Pluggable Components](../../../pluggable-components/) for more details.

## System Improvements

- Update your system.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>yum update</code>
        </div>
    </pre>
  </article>

- Add the required options to the kernel boot arguments:

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>sudo /sbin/grubby --update-kernel<span style="color:#f92672">=</span>ALL --args<span style="color:#f92672">=</span><span style="color:#e6db74">'cgroup_enable=memory cgroup.memory=nokmem swapaccount=1'</span></code>
        </div>
    </pre>
  </article>

- Enable the `overlay2` kernel module.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>echo <span style="color:#e6db74">"overlay2"</span> | sudo tee -a /etc/modules-load.d/overlay.conf</code>
        </div>
    </pre>
  </article>

- Refresh the dynamically generated grub2 configuration.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>sudo grub2-set-default <span style="color:#ae81ff">0</span></code>
        </div>
    </pre>
  </article>

- Adjust kernel parameters and make the change effective.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
            <p>
              cat <span style="color:#e6db74">&lt;&lt;EOF | sudo tee -a /etc/sysctl.conf</span> 
              <span style="color:#e6db74">vm.max_map_count = 262144</span> 
              <span style="color:#e6db74">fs.may_detach_mounts = 1</span> 
              <span style="color:#e6db74">net.ipv4.ip_forward = 1</span> 
              <span style="color:#e6db74">vm.swappiness=1</span> 
              <span style="color:#e6db74">kernel.pid_max =1000000</span> 
              <span style="color:#e6db74">fs.inotify.max_user_instances=524288</span> 
              <span style="color:#e6db74">EOF</span> 
              sudo sysctl -p            
            </p>
          </code>
        </div>
    </pre>
  </article>

- Adjust system limits.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
            <p>
              vim /etc/security/limits.conf
              <span>*</span>                soft    nofile         <span style="color:#ae81ff">1024000</span> 
              <span>*</span>                hard    nofile         <span style="color:#ae81ff">1024000</span> 
              <span>*</span>                soft    memlock        unlimited
              <span>*</span>                hard    memlock        unlimited
              root             soft    nofile         <span style="color:#ae81ff">1024000</span> 
              root             hard    nofile         <span style="color:#ae81ff">1024000</span> 
              root             soft    memlock        unlimited    
            </p>
          </code>
        </div>
    </pre>
  </article>

- Remove the previous limit configuration.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>sudo rm /etc/security/limits.d/20-nproc.conf</code>
        </div>
    </pre>
  </article>

- Reboot the system.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>reboot</code>
        </div>
    </pre>
  </article>

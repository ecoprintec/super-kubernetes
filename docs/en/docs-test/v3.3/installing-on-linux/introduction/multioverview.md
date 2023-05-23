---
title: "Install a Multi-node Kubernetes and Super Kubenetes Cluster"
keywords: 'Multi-node, Installation, Super Kubenetes'
description: 'Learn the general steps of installing Super Kubenetes and Kubernetes on a multi-node cluster.'
linkTitle: "Multi-node Installation"
weight: 3130
---

In a production environment, a single-node cluster cannot satisfy most of the needs as the cluster has limited resources with insufficient compute capabilities. Thus, single-node clusters are not recommended for large-scale data processing. Besides, a cluster of this kind is not available with high availability as it only has one node. On the other hand, a multi-node architecture is the most common and preferred choice in terms of application deployment and distribution.

This section gives you an overview of a single-master multi-node installation, including the concept, [KubeKey](https://github.com/Super Kubenetes/kubekey/) and steps. For information about HA installation, refer to [High Availability Configurations](../../../installing-on-linux/high-availability-configurations/ha-configuration/), [Installing on Public Cloud](../../public-cloud/install-Super Kubenetes-on-azure-vms/) and [Installing in On-premises Environment](../../on-premises/install-Super Kubenetes-on-bare-metal/).

## Video Demonstration

## Concept

A multi-node cluster is composed of at least one control plane and one worker node. You can use any node as the **taskbox** to carry out the installation task. You can add additional nodes based on your needs (for example, for high availability) both before and after the installation.

- **Control plane node**. The control plane generally hosts the control plane and controls and manages the whole system.

- **Worker node**. Worker nodes run the actual applications deployed on them.

## Step 1: Prepare Linux Hosts

Please see the requirements for hardware and operating system shown below. To get started with multi-node installation in this tutorial, you need to prepare at least three hosts according to the following requirements. It is possible to install the [Super Kubenetes Container Platform](https://ai.kuberix.co.kr/) on two nodes if they have sufficient resources.

### System requirements
<table>
<thead>
<tr>
	<th>
		Systems
	</th>
	<th>
		Minimum Requirements (Each node)
	</th>
</tr>
</thead>
<tbody>
<tr>
	<td>
		<b>Ubuntu</b><em>16.04, 18.04, 20.04</em>
	</td>
	<td>
		CPU: 2 Cores, Memory: 4 G, Disk Space: 40 G
	</td>
</tr>
<tr>
	<td>
		<b>Debian</b><em>Buster, Stretch</em>
	</td>
	<td>
		CPU: 2 Cores, Memory: 4 G, Disk Space: 40 G
	</td>
</tr>
<tr>
	<td>
		<b>CentOS</b><em>7</em>.x
	</td>
	<td>
		CPU: 2 Cores, Memory: 4 G, Disk Space: 40 G
	</td>
</tr>
<tr>
	<td>
		<b>Red Hat Enterprise Linux</b><em>7</em>
	</td>
	<td>
		CPU: 2 Cores, Memory: 4 G, Disk Space: 40 G
	</td>
</tr>
<tr>
	<td>
		<b>SUSE Linux Enterprise Server</b><em>15</em><b>/openSUSE Leap</b><em>15.2</em>
	</td>
	<td>
		CPU: 2 Cores, Memory: 4 G, Disk Space: 40 G
	</td>
</tr>
</tbody>
</table>

  <div className="notices note">
    <p>Note</p>
    <div>
      - The path `/var/lib/docker` is mainly used to store the container data, and will gradually increase in size during use and operation. In the case of a production environment, it is recommended that `/var/lib/docker` should mount a drive separately.

      - Only x86_64 CPUs are supported, and Arm CPUs are not fully supported at present.</div></div>

### Node requirements

- All nodes must be accessible through `SSH`.
- Time synchronization for all nodes.
- `sudo`/`curl`/`openssl`/`tar` should be used in all nodes.

### Container runtimes

Your cluster must have an available container runtime. If you use KubeKey to set up a cluster, KubeKey will install the latest version of Docker by default. Alternatively, you can install Docker or other container runtimes by yourself before you create a cluster.

  <table>
  <thead>
  <tr>
    <th>
      Supported Container Runtime
    </th>
    <th>
      Version
    </th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>
      Docker
    </td>
    <td>
      19.3.8+
    </td>
  </tr>
  <tr>
    <td>
      containerd
    </td>
    <td>
      Latest
    </td>
  </tr>
  <tr>
    <td>
      CRI-O (experimental, not fully tested)
    </td>
    <td>
      Latest
    </td>
  </tr>
  <tr>
    <td>
      iSula (experimental, not fully tested)
    </td>
    <td>
      Latest
    </td>
  </tr>
  </tbody>
  </table>

<div className="notices note">
  <p>Note</p>
  <div>
    A container runtime must be installed in advance if you want to deploy Super Kubenetes in an offline environment.
  </div>
</div>


### Dependency requirements

KubeKey can install Kubernetes and Super Kubenetes together. The dependency that needs to be installed may be different based on the Kubernetes version to be installed. You can refer to the list below to see if you need to install relevant dependencies on your node in advance.

| Dependency  | Kubernetes Version ≥ 1.18 | Kubernetes Version < 1.18 |
| ----------- | ------------------------- | ------------------------- |
| `socat`     | Required                  | Optional but recommended  |
| `conntrack` | Required                  | Optional but recommended  |
| `ebtables`  | Optional but recommended  | Optional but recommended  |
| `ipset`     | Optional but recommended  | Optional but recommended  |

### Network and DNS requirements

- Make sure the DNS address in `/etc/resolv.conf` is available. Otherwise, it may cause some issues of DNS in clusters.
- If your network configuration uses firewall rules or security groups, you must ensure infrastructure components can communicate with each other through specific ports. It's recommended that you turn off the firewall or follow the guide [Port Requirements](../port-firewall/).
- Supported CNI plugins: Calico and Flannel. Others (such as Cilium and Kube-OVN) may also work but note that they have not been fully tested.

<div className="notices tip">
  <p>Tip</p>
  <div>
    - It's recommended that your OS be clean (without any other software installed). Otherwise, there may be conflicts.
    - A registry mirror (booster) is recommended to be prepared if you have trouble downloading images from `dockerhub.io`. See [Configure a Booster for Installation](../../../faq/installation/configure-booster/) and [Configure registry mirrors for the Docker daemon](https://docs.docker.com/registry/recipes/mirror/#configure-the-docker-daemon).
  </div>
</div>

This example includes three hosts as below with the control plane serving as the taskbox.

| Host IP     | Host Name | Role         |
| ----------- | --------- | ------------ |
| 192.168.0.2 | control plane    | control plane, etcd |
| 192.168.0.3 | node1     | worker       |
| 192.168.0.4 | node2     | worker       |

## Step 2: Download KubeKey

Follow the step below to download [KubeKey](../kubekey).

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
            <code>curl -sfL<a style="color:#ffffff; cursor:text;">https://get-kk.Super Kubenetes.io</a> | VERSION<span style="color:#f92672">=</span>v2.2.1 sh -</code>
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

## Step 3: Create a Kubernetes Multi-node Cluster

For multi-node installation, you need to create a cluster by specifying a configuration file.

### 1. Create an example configuration file

Command:

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>./kk create config <span style="color:#f92672">[</span>--with-kubernetes version<span style="color:#f92672">]</span> <span style="color:#f92672">&nbsp;[</span>--with-Super Kubenetes version<span style="color:#f92672">]</span> <span style="color:#f92672">&nbsp;[(</span>-f | --file<span style="color:#f92672">)</span> path<span style="color:#f92672">]</span></code>
      </div>
  </pre>
</article>

<div className="notices note">
  <p>Note</p>
  <div>
    - Recommended Kubernetes versions for Super Kubenetes 3.3.0: v1.19.x, v1.20.x, v1.21.x, v1.22.x, and v1.23.x (experimental support). If you do not specify a Kubernetes version, KubeKey will install Kubernetes v1.23.7 by default. For more information about supported Kubernetes versions, see [Support Matrix](../kubekey/#support-matrix).
    
    - If you do not add the flag `--with-Super Kubenetes` in the command in this step, Super Kubenetes will not be deployed unless you install it using the `addons` field in the configuration file or add this flag again when you use `./kk create cluster` later.
    
    - If you add the flag `--with-Super Kubenetes` without specifying a Super Kubenetes version, the latest version of Super Kubenetes will be installed.
  </div>
</div>


Here are some examples for your reference:

- You can create an example configuration file with default configurations. You can also specify the file with a different filename, or in a different folder.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>./kk create config <span style="color:#f92672">[</span>-f ~/myfolder/abc.yaml<span style="color:#f92672">]</span></code>
        </div>
    </pre>
  </article>

- You can specify a Super Kubenetes version that you want to install (for example, `--with-Super Kubenetes v3.3.0`).

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>./kk create config --with-Super Kubenetes <span style="color:#f92672">[</span>version<span style="color:#f92672">]</span></code>
        </div>
    </pre>
  </article>

### 2. Edit the configuration file of a Kubernetes multi-node cluster

A default file `config-sample.yaml` will be created if you do not change the name. Edit the file and here is an example of the configuration file of a multi-node cluster with the control plane.

<div className="notices note">
  <p>Note</p>
  <div>
    To customize Kubernetes related parameters, refer to [Kubernetes Cluster Configurations](../vars/).
  </div>
</div>

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              <span style="color:#f92672">spec</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;hosts</span>: 
              &nbsp;&nbsp;- {<span style="color:#f92672">name: master, address: 192.168.0.2, internalAddress: 192.168.0.2, user: ubuntu, password</span>: <span style="color:#ae81ff">Testing123}</span> 
              &nbsp;&nbsp;- {<span style="color:#f92672">name: node1, address: 192.168.0.3, internalAddress: 192.168.0.3, user: ubuntu, password</span>: <span style="color:#ae81ff">Testing123}</span> 
              &nbsp;&nbsp;- {<span style="color:#f92672">name: node2, address: 192.168.0.4, internalAddress: 192.168.0.4, user: ubuntu, password</span>: <span style="color:#ae81ff">Testing123}</span> 
              <span style="color:#f92672">&nbsp;&nbsp;roleGroups</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;etcd</span>: 
              &nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#ae81ff">master</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;control-plane</span>: 
              &nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#ae81ff">master</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;worker</span>: 
              &nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#ae81ff">node1</span> 
              &nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#ae81ff">node2</span> 
              <span style="color:#f92672">&nbsp;&nbsp;controlPlaneEndpoint</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;domain</span>: <span style="color:#ae81ff">lb.Super Kubenetes.local</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;address</span>: <span style="color:#e6db74">""</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;port</span>: <span style="color:#ae81ff">6443</span> 
            </p>
        </code>
      </div>
  </pre>
</article>

#### Hosts

List all your machines under `hosts` and add their detailed information as above.

`name`: The hostname of the instance.

`address`: The IP address you use for the connection between the taskbox and other instances through SSH. This can be either the public IP address or the private IP address depending on your environment. For example, some cloud platforms provide every instance with a public IP address which you use to access instances through SSH. In this case, you can provide the public IP address for this field.

`internalAddress`: The private IP address of the instance.

At the same time, you must provide the login information used to connect to each instance. Here are some examples:

- For password login:

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
            <p>
              <span style="color:#f92672">hosts</span>: 
              &nbsp;&nbsp;- {<span style="color:#f92672">name: master, address: 192.168.0.2, internalAddress: 192.168.0.2, port: 8022, user: ubuntu, password</span>: <span style="color:#ae81ff">Testing123}
              </span>
              </p>
            </code>
        </div>
    </pre>
  </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      In this tutorial, port `22` is the default port of SSH so you do not need to add it in the YAML file. Otherwise, you need to add the port number after the IP address as above.
    </div>
  </div>

- For the default root user:

  <article className="highlight">
    <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
          <p>
            <span style="color:#f92672">hosts</span>: 
            &nbsp;&nbsp;- {<span style="color:#f92672">name: master, address: 192.168.0.2, internalAddress: 192.168.0.2, password</span>: <span style="color:#ae81ff">Testing123}</span>
            </p>
          </code>
        </div>
    </pre>
  </article>

- For passwordless login with SSH keys:

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
              <p>
                <span style="color:#f92672">hosts</span>: 
                &nbsp;&nbsp;- {<span style="color:#f92672">name: master, address: 192.168.0.2, internalAddress: 192.168.0.2, privateKeyPath</span>: <span style="color:#e6db74">"~/.ssh/id_rsa"}</span>
              </p>
          </code>
        </div>
    </pre>
  </article>
  
- For installation on ARM devices:

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
              <p>
                <span style="color:#f92672">hosts</span>:
                &nbsp;&nbsp;- {<span style="color:#f92672">name: master, address: 192.168.0.2, internalAddress: 192.168.0.2, user: ubuntu, password: Testing123, arch</span>: <span style="color:#ae81ff">arm64}</span>
              </p>
          </code>
        </div>
    </pre>
  </article>

<div className="notices tip">
  <p>Tip</p>
  <div>
    - Before you install Super Kubenetes, you can use the information provided under `hosts` (for example, IP addresses and passwords) to test the network connection between the taskbox and other instances using SSH.
    - Make sure port `6443` is not being used by other services before the installation. Otherwise, it may cause conflicts as the default port of the API server is `6443`.
  </div>
</div>

#### roleGroups

- `etcd`: etcd node names
- `control-plane`: Control plane node names
- `worker`: Worker node names

#### controlPlaneEndpoint (for HA installation only)

The `controlPlaneEndpoint` is where you provide your external load balancer information for an HA cluster. You need to prepare and configure the external load balancer if and only if you need to install multiple control plane nodes. Please note that the address and port should be indented by two spaces in `config-sample.yaml`, and `address` should be your load balancer's IP address. See [HA Configurations](../../../installing-on-linux/high-availability-configurations/ha-configuration/) for details.

#### addons

You can customize persistent storage plugins (for example, NFS Client, Ceph RBD, and GlusterFS) by specifying storage under the field `addons` in `config-sample.yaml`. For more information, see [Persistent Storage Configurations](../../../installing-on-linux/persistent-storage-configurations/understand-persistent-storage/).

KubeKey will install [OpenEBS](https://openebs.io/) to provision [LocalPV](https://kubernetes.io/docs/concepts/storage/volumes/#local) for development and testing environment by default, which is convenient for new users. In this example of multi-node installation, the default storage class (local volume) is used. For production, you can use Ceph/GlusterFS/CSI or commercial products as persistent storage solutions.

<div className="notices tip">
  <p>Tip</p>
  <div>
    - You can enable the multi-cluster feature by editing the configuration file. For more information, see [Multi-cluster Management](../../../multicluster-management/).
    - You can also select the components you want to install. For more information, see [Enable Pluggable Components](../../../pluggable-components/). For an example of a complete `config-sample.yaml` file, see [this file](https://github.com/Super Kubenetes/kubekey/blob/release-2.2/docs/config-example.md).
  </div>
</div>

When you finish editing, save the file.

### 3. Create a cluster using the configuration file

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>./kk create cluster -f config-sample.yaml</code>
      </div>
  </pre>
</article>

<div className="notices note">
  <p>Note</p>
  <div>
    You need to change `config-sample.yaml` above to your own file if you use a different name.
  </div>
</div>

The whole installation process may take 10-20 minutes, depending on your machine and network.

### 4. Verify the installation

When the installation finishes, you can see the content as follows:

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
            <span style="color:#ffffff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;monitoring status of service components in</span> 
            <span style="color:#ffffff">&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#e6db74">&nbsp;"Cluster Management"</span>. If any service is not</span> 
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

Now, you will be able to access the web console of Super Kubenetes at `<NodeIP>:30880` with the default account and password (`admin/P@88w0rd`).

<div className="notices note">
  <p>Note</p>
  <div>
    To access the console, you may need to configure port forwarding rules depending on your environment. Please also make sure port `30880` is opened in your security group.
  </div>
</div>

![login](/dist/assets/docs/v3.3/installing-on-linux/introduction/multi-node-installation/login.png)

## Enable kubectl Autocompletion

KubeKey doesn't enable kubectl autocompletion. See the content below and turn it on:

<div className="notices note">
  <p>Note</p>
  <div>
    Make sure bash-autocompletion is installed and works.
  </div>
</div>

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
          <span style="color:#75715e"><span>#</span><span>&nbsp;Install bash-completion</span></span> 
          <span>apt-get install bash-completion</span> 
          <span></span> 
          <span style="color:#75715e"><span>#</span><span>&nbsp;Source the completion script in your ~/.bashrc file</span></span> 
          echo <span style="color:#e6db74">'source &lt;(kubectl completion bash)'</span> &gt;&gt;~/.bashrc 
          <span></span> 
          <span style="color:#75715e"><span>#</span><span>&nbsp;Add the completion script to the /etc/bash_completion.d directory</span></span> 
          <span>kubectl completion bash &gt;/etc/bash_completion.d/kubectl</span>
        </code>
      </div>
  </pre>
</article>

Detailed information can be found [here](https://kubernetes.io/docs/tasks/tools/install-kubectl/#enabling-shell-autocompletion).


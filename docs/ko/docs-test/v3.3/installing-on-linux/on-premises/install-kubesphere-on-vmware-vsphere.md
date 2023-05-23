---
title: "Deploy Super Kubenetes on VMware vSphere"
keywords: 'Kubernetes, Super Kubenetes, VMware-vSphere, installation'
description: 'Learn how to create a high-availability cluster on VMware vSphere.'
weight: 3510
---

## Introduction

For a production environment, we need to consider the high availability of the cluster. If the key components (for example, kube-apiserver, kube-scheduler, and kube-controller-manager) are all running on the same control plane node, Kubernetes and Super Kubenetes will be unavailable once the control plane node goes down. Therefore, we need to set up a high-availability cluster by provisioning load balancers with multiple control plane nodes. You can use any cloud load balancer, or any hardware load balancer (for example, F5). In addition, Keepalived and [HAProxy](https://www.haproxy.com/), or Nginx is also an alternative for creating high-availability clusters.

This tutorial walks you through an example of how to create Keepalived and HAProxy, and implement high availability of control plane and etcd nodes using the load balancers on VMware vSphere.

## Prerequisites

- Please make sure that you already know how to install Super Kubenetes with a multi-node cluster by following the [guide](../../introduction/multioverview/). This tutorial focuses more on how to configure load balancers.
- You need a VMware vSphere account to create VMs.
- Considering data persistence, for a production environment, we recommend you to prepare persistent storage and create a **default** StorageClass in advance. For development and testing, you can use the integrated OpenEBS to provision LocalPV as the storage service directly.

## Architecture

![Architecture](/dist/assets/docs/v3.3/vsphere/KubeSphereOnVsphere-zh-architecture.png)

## Prepare Linux Hosts

This tutorial creates 8 virtual machines of **CentOS Linux release 7.6.1810 (Core)** for the default minimal installation. Every machine has 2 Cores, 4 GB of memory and 40 G disk space.

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
			<td>10.10.71.214</td>
			<td>master1</td>
			<td>master, etcd</td>
		</tr>
		<tr>
			<td>10.10.71.73</td>
			<td>master2</td>
			<td>master, etcd</td>
		</tr>
		<tr>
			<td>10.10.71.62</td>
			<td>master3</td>
			<td>master, etcd</td>
		</tr>
		<tr>
			<td>10.10.71.75</td>
			<td>node1</td>
			<td>worker</td>
		</tr>
		<tr>
			<td>10.10.71.76</td>
			<td>node2</td>
			<td>worker</td>
		</tr>
		<tr>
			<td>10.10.71.79</td>
			<td>node3</td>
			<td>worker</td>
		</tr>
		<tr>
			<td>10.10.71.67</td>
			<td>vip</td>
			<td>vip (No need to create a VM)</td>
		</tr>
		<tr>
			<td>10.10.71.77</td>
			<td>lb-0</td>
			<td>lb (Keepalived + HAProxy)</td>
		</tr>
		<tr>
			<td>10.10.71.66</td>
			<td>lb-1</td>
			<td>lb (Keepalived + HAProxy)</td>
		</tr>
	</tbody>
</table>

<div className="notices note">
  <p>Note</p>
  <div>
    You do not need to create a virtual machine for `vip` (i.e. Virtual IP) above, so only 8 virtual machines need to be created.
  </div>
</div>


You can follow the New Virtual Machine wizard to create a virtual machine to place in the VMware Host Client inventory.

![create](/dist/assets/docs/v3.3/vsphere/KubeSphereOnVsphere-en-0-1-create.png)

1. In the first step **Select a creation type**, you can deploy a virtual machine from an OVF or OVA file, or register an existing virtual machine directly.

    ![KubeSphereOnVsphere-en-0-1-1-create-type](/dist/assets/docs/v3.3/vsphere/KubeSphereOnVsphere-en-0-1-1-create-type.png)

2. When you create a new virtual machine, provide a unique name for the  virtual machine to distinguish it from existing virtual machines on the  host you are managing.

    ![KubeSphereOnVsphere-en-0-1-2-name](/dist/assets/docs/v3.3/vsphere/KubeSphereOnVsphere-en-0-1-2-name.png)

3. Select a compute resource and storage (datastore) for the configuration and disk files. You can select the  datastore that has the most suitable properties, such as size, speed,  and availability, for your virtual machine storage.

    ![KubeSphereOnVsphere-en-0-1-3-resource](/dist/assets/docs/v3.3/vsphere/KubeSphereOnVsphere-en-0-1-3-resource.png)

    ![KubeSphereOnVsphere-en-0-1-4-storage](/dist/assets/docs/v3.3/vsphere/KubeSphereOnVsphere-en-0-1-4-storage.png)

    ![KubeSphereOnVsphere-en-0-1-5-compatibility](/dist/assets/docs/v3.3/vsphere/KubeSphereOnVsphere-en-0-1-5-compatibility.png)

4. Select a guest operating system. The wizard will provide the appropriate defaults for the operating system installation.

    ![KubeSphereOnVsphere-en-0-1-6-system](/dist/assets/docs/v3.3/vsphere/KubeSphereOnVsphere-en-0-1-6-system.png)

5. Before you finish deploying a new virtual machine, you have the option to set **Virtual Hardware** and **VM Options**. You can refer to the images below for part of the fields.

    ![KubeSphereOnVsphere-en-0-1-7-hardware-1](/dist/assets/docs/v3.3/vsphere/KubeSphereOnVsphere-en-0-1-7-hardware-1.png)

    ![KubeSphereOnVsphere-en-0-1-7-hardware-2](/dist/assets/docs/v3.3/vsphere/KubeSphereOnVsphere-en-0-1-7-hardware-2.png)

    ![KubeSphereOnVsphere-en-0-1-7-hardware-3](/dist/assets/docs/v3.3/vsphere/KubeSphereOnVsphere-en-0-1-7-hardware-3.png)

    ![KubeSphereOnVsphere-en-0-1-7-hardware-4](/dist/assets/docs/v3.3/vsphere/KubeSphereOnVsphere-en-0-1-7-hardware-4.png)

6. In **Ready to complete** page, you review the configuration selections that you have made for the virtual machine. Click **Finish** at the bottom-right corner to continue.

    ![KubeSphereOnVsphere-en-0-1-8](/dist/assets/docs/v3.3/vsphere/KubeSphereOnVsphere-en-0-1-8.png)

## Install a Load Balancer using Keepalived and HAProxy

For a production environment, you have to prepare an external load balancer for your cluster with multiple control plane nodes. If you do not have a load balancer, you can install it using Keepalived and HAProxy. If you are provisioning a development or testing environment by installing a cluster with a control plane node, please skip this section.

### Yum Install

host lb-0 (`10.10.71.77`) and host lb-1 (`10.10.71.66`).

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>yum install keepalived haproxy psmisc -y</code>
      </div>
  </pre>
</article>

### Configure HAProxy

On the servers with IP `10.10.71.77` and `10.10.71.66`, configure HAProxy as follows.

<div className="notices note">
  <p>Note</p>
  <div>
    The configuration of the two lb machines is the same. Please pay attention to the backend service address.
  </div>
</div>

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              <span style="color:#75715e"><span>#</span> HAProxy Configure /etc/haproxy/haproxy.cfg</span><span style="color:#ae81ff">global</span> 
              <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;log         127.0.0.1 local2</span> 
              <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;chroot      /var/lib/haproxy</span> 
              <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;pidfile     /var/run/haproxy.pid</span> 
              <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;maxconn     4000</span> 
              <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;user        haproxy</span> 
              <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;group       haproxy</span> 
              <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;daemon</span> 
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> turn on stats unix socket</span> 
              <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;stats socket /var/lib/haproxy/stats</span> 
              <span style="color:#75715e"><span>#</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>-</span></span> 
              <span style="color:#75715e"><span>#</span> common defaults that all the 'listen' and 'backend' sections will</span>
              <span style="color:#75715e"><span>#</span> use if not designated in their block</span>
              <span style="color:#75715e"><span>#</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>-</span></span> 
              <span style="color:#ae81ff">defaults</span> 
              <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;log                     global</span> 
              <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;option                  httplog</span> 
              <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;option                  dontlognull</span> 
              <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;timeout connect         5000</span> 
              <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;timeout client          5000</span> 
              <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;timeout server          5000</span> 
              <span style="color:#75715e"><span>#</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>-</span></span> 
              <span style="color:#75715e"><span>#</span> main frontend which proxys to the backends</span>
              <span style="color:#75715e"><span>#</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>-</span></span> 
              <span style="color:#ae81ff">frontend  kube-apiserver</span> 
              <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;bind *:6443</span> 
              <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;mode tcp</span> 
              <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;option tcplog</span> 
              <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;default_backend kube-apiserver</span> 
              <span style="color:#75715e"><span>#</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>-</span></span> 
              <span style="color:#75715e"><span>#</span> round robin balancing between the various backends</span>
              <span style="color:#75715e"><span>#</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>--</span><span>-</span></span> 
              <span style="color:#ae81ff">backend kube-apiserver</span> 
              <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;mode tcp</span> 
              <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;option tcplog</span> 
              <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;balance     roundrobin</span> 
              <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;default-server inter 10s downinter 5s rise 2 fall 2 slowstart 60s maxconn 250 maxqueue 256 weight 100</span> 
              <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;server kube-apiserver-1 10.10.71.214:6443 check</span> 
              <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;server kube-apiserver-2 10.10.71.73:6443 check</span> 
              <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;server kube-apiserver-3 10.10.71.62:6443 check</span> 
            </p>
        </code>
      </div>
  </pre>
</article>

Check grammar first before you start it.

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>haproxy -f /etc/haproxy/haproxy.cfg -c</code>
      </div>
  </pre>
</article>

Restart HAProxy and execute the command below to enable HAProxy.

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>systemctl restart haproxy <span style="color:#f92672">&amp;&amp;</span> systemctl enable haproxy</code>
      </div>
  </pre>
</article>

Stop HAProxy.

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>systemctl stop haproxy</code>
      </div>
  </pre>
</article>

### Configure Keepalived

Main HAProxy 77 lb-0-10.10.71.77 (/etc/keepalived/keepalived.conf).

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
          <p>
            global_defs <span style="color:#f92672">{</span> 
              notification_email <span style="color:#f92672">{</span> 
              <span style="color:#f92672">}</span> 
              smtp_connect_timeout <span style="color:#ae81ff">30</span> 
              router_id LVS_DEVEL01
              vrrp_skip_check_adv_addr
              vrrp_garp_interval <span style="color:#ae81ff">0</span> 
              vrrp_gna_interval <span style="color:#ae81ff">0</span> 
            <span style="color:#f92672">}</span> 
            vrrp_script chk_haproxy <span style="color:#f92672">{</span> 
              script <span style="color:#e6db74">"killall -0 haproxy"</span> 
              interval <span style="color:#ae81ff">2</span> 
              weight <span style="color:#ae81ff">20</span> 
            <span style="color:#f92672">}</span> 
            vrrp_instance haproxy-vip <span style="color:#f92672">{</span> 
              state MASTER 
              priority <span style="color:#ae81ff">100</span> 
              interface ens192
              virtual_router_id <span style="color:#ae81ff">60</span> 
              advert_int <span style="color:#ae81ff">1</span> 
              authentication <span style="color:#f92672">{</span> 
                auth_type PASS
                auth_pass <span style="color:#ae81ff">1111</span> 
              <span style="color:#f92672">}</span> 
              unicast_src_ip 10.10.71.77
              unicast_peer <span style="color:#f92672">{</span> 
                10.10.71.66
              <span style="color:#f92672">}</span> 
              virtual_ipaddress <span style="color:#f92672">{</span> 
                <span style="color:#75715e">#</span><span style="color:#75715e">vip</span> 
                10.10.71.67/24
              <span style="color:#f92672">}</span> 
              track_script <span style="color:#f92672">{</span> 
                chk_haproxy
              <span style="color:#f92672">}</span> 
            <span style="color:#f92672">}</span>
          </p>
        </code>
      </div>
  </pre>
</article>

Remark HAProxy 66 lb-1-10.10.71.66 (/etc/keepalived/keepalived.conf).

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
          <p>
            global_defs <span style="color:#f92672">{</span> 
              notification_email <span style="color:#f92672">{</span> 
              <span style="color:#f92672">}</span> 
              router_id LVS_DEVEL02
              vrrp_skip_check_adv_addr
              vrrp_garp_interval <span style="color:#ae81ff">0</span> 
              vrrp_gna_interval <span style="color:#ae81ff">0</span> 
            <span style="color:#f92672">}</span> 
            vrrp_script chk_haproxy <span style="color:#f92672">{</span> 
              script <span style="color:#e6db74">"killall -0 haproxy"</span> 
              interval <span style="color:#ae81ff">2</span> 
              weight <span style="color:#ae81ff">20</span> 
            <span style="color:#f92672">}</span> 
            vrrp_instance haproxy-vip <span style="color:#f92672">{</span> 
              state BACKUP
              priority <span style="color:#ae81ff">90</span> 
              interface ens192
              virtual_router_id <span style="color:#ae81ff">60</span> 
              advert_int <span style="color:#ae81ff">1</span> 
              authentication <span style="color:#f92672">{</span> 
                auth_type PASS
                auth_pass <span style="color:#ae81ff">1111</span> 
              <span style="color:#f92672">}</span> 
              unicast_src_ip 10.10.71.66
              unicast_peer <span style="color:#f92672">{</span> 
                10.10.71.77
              <span style="color:#f92672">}</span> 
              virtual_ipaddress <span style="color:#f92672">{</span> 
                10.10.71.67/24
              <span style="color:#f92672">}</span> 
              track_script <span style="color:#f92672">{</span> 
                chk_haproxy
              <span style="color:#f92672">}</span> 
            <span style="color:#f92672">}</span>
          </p>
        </code>
      </div>
  </pre>
</article>

Start keepalived and enable keepalived.

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>systemctl restart keepalived <span style="color:#f92672">&amp;&amp;</span> systemctl enable keepalived</code>
      </div>
  </pre>
</article>

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>systemctl stop keepalived</code>
      </div>
  </pre>
</article>

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>systemctl start keepalived</code>
      </div>
  </pre>
</article>

### Verify Availability

Use `ip a s` to view the vip binding status of each lb node:

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>ip a s</code>
      </div>
  </pre>
</article>

Pause VIP node HAProxy through the following command:

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>systemctl stop haproxy</code>
      </div>
  </pre>
</article>

Use `ip a s` again to check the vip binding of each lb node, and check whether vip drifts:

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>ip a s</code>
      </div>
  </pre>
</article>

Alternatively, use the command below:

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>systemctl status -l keepalived</code>
      </div>
  </pre>
</article>

## Download KubeKey

[Kubekey](https://github.com/Super Kubenetes/kubekey) is the brand-new installer which provides an easy, fast and flexible way to install Kubernetes and Super Kubenetes 3.3.0.

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

## Create a High Availability Cluster

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

    - If you do not add the flag `--with-Super Kubenetes` in the command in this step, Super Kubenetes will not be deployed unless you install it using the `addons` field in the configuration file or add this flag again when you use `./kk create cluster` later.
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
              &nbsp;&nbsp;- {<span style="color:#f92672">name: master1, address: 10.10.71.214, internalAddress: 10.10.71.214, password</span>: <span style="color:#ae81ff">P@ssw0rd!}</span> 
              &nbsp;&nbsp;- {<span style="color:#f92672">name: master2, address: 10.10.71.73, internalAddress: 10.10.71.73, password</span>: <span style="color:#ae81ff">P@ssw0rd!}</span> 
              &nbsp;&nbsp;- {<span style="color:#f92672">name: master3, address: 10.10.71.62, internalAddress: 10.10.71.62, password</span>: <span style="color:#ae81ff">P@ssw0rd!}</span> 
              &nbsp;&nbsp;- {<span style="color:#f92672">name: node1, address: 10.10.71.75, internalAddress: 10.10.71.75, password</span>: <span style="color:#ae81ff">P@ssw0rd!}</span> 
              &nbsp;&nbsp;- {<span style="color:#f92672">name: node2, address: 10.10.71.76, internalAddress: 10.10.71.76, password</span>: <span style="color:#ae81ff">P@ssw0rd!}</span> 
              &nbsp;&nbsp;- {<span style="color:#f92672">name: node3, address: 10.10.71.79, internalAddress: 10.10.71.79, password</span>: <span style="color:#ae81ff">P@ssw0rd!}</span> 
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
              <span style="color:#f92672">&nbsp;&nbsp;controlPlaneEndpoint</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;domain</span>: <span style="color:#ae81ff">lb.Super Kubenetes.local</span> 
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> vip</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;address</span>: <span style="color:#e6db74">"10.10.71.67"</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;port</span>: <span style="color:#ae81ff">6443</span> 
              <span style="color:#f92672">&nbsp;&nbsp;kubernetes</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;version</span>: <span style="color:#ae81ff">v1.22.10</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;imageRepo</span>: <span style="color:#ae81ff">Super Kubenetes</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;clusterName</span>: <span style="color:#ae81ff">cluster.local</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;masqueradeAll: false  # masqueradeAll tells kube-proxy to SNAT everything if using the pure iptables proxy mode. [Default</span>: <span style="color:#66d9ef">false</span>] 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;maxPods: 110  # maxPods is the number of pods that can run on this Kubelet. [Default</span>: <span style="color:#ae81ff">110</span>] 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;nodeCidrMaskSize: 24  # internal network node size allocation. This is the size allocated to each node on your network. [Default</span>:  <span style="color:#ae81ff">24</span>] 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;proxyMode: ipvs  # mode specifies which proxy mode to use. [Default</span>: <span style="color:#ae81ff">ipvs]</span> 
              <span style="color:#f92672">&nbsp;&nbsp;network</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;plugin</span>: <span style="color:#ae81ff">calico</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;calico</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ipipMode</span>: <span style="color:#ae81ff">Always </span> <span style="color:#75715e"><span>&nbsp;#</span> IPIP Mode to use for the IPv4 POOL created at start up. If set to a value other than Never, vxlanMode should be set to "Never". [Always | CrossSubnet | Never] [Default: Always]</span>
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;vxlanMode</span>: <span style="color:#ae81ff">Never </span> <span style="color:#75715e"><span>&nbsp;#</span> VXLAN Mode to use for the IPv4 POOL created at start up. If set to a value other than Never, ipipMode should be set to "Never". [Always | CrossSubnet | Never] [Default: Never]</span>
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;vethMTU: 1440  # The maximum transmission unit (MTU) setting determines the largest packet size that can be transmitted through your network. [Default</span>: <span style="color:#ae81ff">1440</span>] 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;kubePodsCIDR</span>: <span style="color:#ae81ff">10.233.64.0</span><span style="color:#ae81ff">/18</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;kubeServiceCIDR</span>: <span style="color:#ae81ff">10.233.0.0</span><span style="color:#ae81ff">/18</span> 
              <span style="color:#f92672">&nbsp;&nbsp;registry</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;registryMirrors</span>: [] 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;insecureRegistries</span>: [] 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;privateRegistry</span>: <span style="color:#e6db74">""</span> 
              <span style="color:#f92672">&nbsp;&nbsp;storage</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;defaultStorageClass</span>: <span style="color:#ae81ff">localVolume</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;localVolume</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;storageClassName</span>: <span style="color:#ae81ff">local  </span> 
              <span></span> 
              <span>-</span><span>-</span><span>-</span> 
              <span>-</span><span>-</span><span>-</span> 
              <span>-</span><span>-</span><span>-</span> 
              <span style="color:#f92672">apiVersion</span>: <span style="color:#ae81ff">installer.Super Kubenetes.io/v1alpha1</span> 
              <span style="color:#f92672">kind</span>: <span style="color:#ae81ff">ClusterConfiguration</span> 
              <span style="color:#f92672">metadata</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">ks-installer</span> 
              <span style="color:#f92672">&nbsp;&nbsp;namespace</span>: <span style="color:#ae81ff">Super Kubenetes-system</span> 
              <span style="color:#f92672">&nbsp;&nbsp;labels</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;version</span>: <span style="color:#ae81ff">v3.3.0</span> 
              <span style="color:#f92672">spec</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;persistence</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;storageClass</span>: <span style="color:#e6db74"><span>""</span></span>
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> If there is no default StorageClass in your cluster, you need to specify an existing StorageClass here.</span> 
              <span style="color:#f92672">&nbsp;&nbsp;authentication</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;jwtSecret</span>: <span style="color:#e6db74"><span>""</span></span>
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> Keep the jwtSecret consistent with the Host Cluster. Retrieve the jwtSecret by executing "kubectl -n Super Kubenetes-system get cm Super Kubenetes-config -o yaml | grep -v "apiVersion" | grep jwtSecret" on the Host Cluster.</span> 
              <span style="color:#f92672">&nbsp;&nbsp;local_registry</span>: <span style="color:#e6db74"><span>""</span></span>
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> Add your private registry address if it is needed.</span> 
              <span style="color:#75715e">&nbsp;&nbsp;<span>#</span> dev_tag: ""&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> Add your Super Kubenetes image tag you want to install, by default it's same as ks-installer release version.</span> 
              <span style="color:#f92672">&nbsp;&nbsp;etcd</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;monitoring</span>: <span style="color:#66d9ef">false</span>
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> Enable or disable etcd monitoring dashboard installation. You have to create a Secret for etcd before you enable it.</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;endpointIps</span>: <span style="color:#ae81ff">localhost </span>
              <span style="color:#75715e">&nbsp;<span>#</span> etcd cluster EndpointIps. It can be a bunch of IPs here.</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;port</span>: <span style="color:#ae81ff">2379</span>
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> etcd port.</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;tlsEnable</span>: <span style="color:#66d9ef">true</span> 
              <span style="color:#f92672">&nbsp;&nbsp;common</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;core</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;console</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;enableMultiLogin</span>: <span style="color:#66d9ef">true</span>  
              <span style="color:#75715e">&nbsp;&nbsp;<span>#</span> Enable or disable simultaneous logins. It allows different users to log in with the same account at the same time.</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;port</span>: <span style="color:#ae81ff">30880</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;type</span>: <span style="color:#ae81ff">NodePort</span> 
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> apiserver: <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#</span> Enlarge the apiserver and controller manager's resource requests and limits for the large cluster</span> 
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span>  resources: {}</span> 
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> controllerManager:</span> 
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span>  resources: {}</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;redis</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;enabled</span>: <span style="color:#66d9ef">false</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;enableHA</span>: <span style="color:#66d9ef">false</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;volumeSize</span>: <span style="color:#ae81ff">2Gi</span> <span style="color:#75715e"><span>&nbsp;#</span> Redis PVC size.</span>
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;openldap</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;enabled</span>: <span style="color:#66d9ef">false</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;volumeSize</span>: <span style="color:#ae81ff">2Gi  </span> <span style="color:#75715e"><span>&nbsp;#</span> openldap PVC size.</span>
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;minio</span>:
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;volumeSize</span>: <span style="color:#ae81ff">20Gi</span> <span style="color:#75715e"><span>&nbsp;#</span> Minio PVC size.</span>
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;monitoring</span>: 
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> type: external   <span>#</span> Whether to specify the external prometheus stack, and need to modify the endpoint at the next line.</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;endpoint</span>: <span style="color:#ae81ff"><span></span>http://prometheus-operated.Super Kubenetes-monitoring-system.svc:9090<span></span></span><span style="color:#75715e">&nbsp;<span>#</span> Prometheus endpoint to get metrics data.</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;GPUMonitoring</span>:     <span style="color:#75715e"><span>#</span> Enable or disable the GPU-related metrics. If you enable this switch but have no GPU resources, Super Kubenetes will set it to zero.</span>
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;enabled</span>: <span style="color:#66d9ef">false</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;gpu</span>:                 <span style="color:#75715e"><span>#</span> Install GPUKinds. The default GPU kind is nvidia.com/gpu. Other GPU kinds can be added here according to your needs.</span>
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;kinds</span>: 
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#f92672">resourceName</span>: <span style="color:#e6db74">"nvidia.com/gpu"</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;resourceType</span>: <span style="color:#e6db74">"GPU"</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;default</span>: <span style="color:#66d9ef">true</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;es</span>:   <span style="color:#75715e"><span>#</span> Storage backend for logging, events and auditing.</span>
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> master:</span> 
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span>   volumeSize: 4Gi  <span>#</span> The volume size of Elasticsearch master nodes.</span> 
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span>   replicas: 1      <span>#</span> The total number of master nodes. Even numbers are not allowed.</span> 
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span>   resources: {}</span> 
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> data:</span> 
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span>   volumeSize: 20Gi  <span>#</span> The volume size of Elasticsearch data nodes.</span> 
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span>   replicas: 1       <span>#</span> The total number of data nodes.</span> 
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span>   resources: {}</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;logMaxAge</span>: <span style="color:#ae81ff">7</span>
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> Log retention time in built-in Elasticsearch. It is 7 days by default.</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;elkPrefix</span>: <span style="color:#ae81ff">logstash     </span> <span style="color:#75715e"><span>&nbsp;#</span> The string making up index names. The index name will be formatted as ks-&lt;elk_prefix&gt;-log.</span>
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;basicAuth</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;enabled</span>: <span style="color:#66d9ef">false</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;username</span>: <span style="color:#e6db74">""</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;password</span>: <span style="color:#e6db74">""</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;externalElasticsearchHost</span>: <span style="color:#e6db74">""</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;externalElasticsearchPort</span>: <span style="color:#e6db74">""</span> 
              <span style="color:#f92672">&nbsp;&nbsp;alerting:                <span>#</span> (CPU: 0.1 Core, Memory</span>: <span style="color:#ae81ff">100</span> <span style="color:#ae81ff">&nbsp;MiB) It enables users to customize alerting policies to send messages to receivers in time with different time intervals and alerting levels to choose from.</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;enabled</span>: <span style="color:#66d9ef">false     </span>
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> Enable or disable the Super Kubenetes Alerting System.</span> 
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> thanosruler:</span> 
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span>   replicas: 1</span> 
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span>   resources: {}</span> 
              <span style="color:#f92672">&nbsp;&nbsp;auditing</span>: <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> Provide a security-relevant chronological set of records，recording the sequence of activities happening on the platform, initiated by different tenants.</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;enabled</span>: <span style="color:#66d9ef">false</span>
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> Enable or disable the Super Kubenetes Auditing Log System.</span> 
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> operator:</span> 
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span>   resources: {}</span> 
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> webhook:</span> 
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span>   resources: {}</span> 
              <span style="color:#f92672">&nbsp;&nbsp;devops:                  <span>#</span> (CPU: 0.47 Core, Memory</span>: <span style="color:#ae81ff">8.6</span><span style="color:#ae81ff">&nbsp;G) Provide an out-of-the-box CI/CD system based on Jenkins, and automated workflow tools including Source-to-Image &amp; Binary-to-Image.</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;enabled</span>: <span style="color:#66d9ef">false</span>
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> Enable or disable the Super Kubenetes DevOps System.</span> 
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> resources: {}</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;jenkinsMemoryLim</span>: <span style="color:#ae81ff">2Gi      </span> <span style="color:#75715e"><span>#</span> Jenkins memory limit.</span>
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;jenkinsMemoryReq</span>: <span style="color:#ae81ff">1500Mi   </span> <span style="color:#75715e"><span>#</span> Jenkins memory request.</span>
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;jenkinsVolumeSize</span>: <span style="color:#ae81ff">8Gi     </span> <span style="color:#75715e"><span>#</span> Jenkins volume size.</span>
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;jenkinsJavaOpts_Xms</span>: <span style="color:#ae81ff">1200m  </span> <span style="color:#75715e"><span>#</span> The following three fields are JVM parameters.</span>
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;jenkinsJavaOpts_Xmx</span>: <span style="color:#ae81ff">1600m</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;jenkinsJavaOpts_MaxRAM</span>: <span style="color:#ae81ff">2g</span> 
              <span style="color:#f92672">&nbsp;&nbsp;events</span>:<span style="color:#75715e"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#</span> Provide a graphical web console for Kubernetes Events exporting, filtering and alerting in multi-tenant Kubernetes clusters.</span>
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;enabled</span>: <span style="color:#66d9ef">false         </span><span style="color:#75715e"><span>#</span> Enable or disable the Super Kubenetes Events System.</span>
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> operator:</span> 
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span>   resources: {}</span> 
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> exporter:</span> 
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span>   resources: {}</span> 
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> ruler:</span> 
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span>   enabled: true</span> 
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span>   replicas: 2</span> 
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span>   resources: {}</span> 
              <span style="color:#f92672">&nbsp;&nbsp;logging:<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#</span> (CPU: 57 m, Memory</span>: <span style="color:#ae81ff">2.76</span>
              <span style="color:#ae81ff">&nbsp;G) Flexible logging functions are provided for log query, collection and management in a unified console. Additional log collectors can be added, such as Elasticsearch, Kafka and Fluentd.</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;enabled</span>: <span style="color:#66d9ef">false         </span><span style="color:#75715e"><span>#</span> Enable or disable the Super Kubenetes Logging System.</span>
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;logsidecar</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;enabled</span>: <span style="color:#66d9ef">true</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;replicas</span>: <span style="color:#ae81ff">2</span> 
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> resources: {}</span> 
              <span style="color:#f92672">&nbsp;&nbsp;metrics_server:<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#</span> (CPU: 56 m, Memory</span>: <span style="color:#ae81ff">44.35</span> <span style="color:#ae81ff">&nbsp;MiB) It enables HPA (Horizontal Pod Autoscaler).</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;enabled</span>: <span style="color:#66d9ef">false                   </span>
              <span style="color:#75715e"><span>#</span> Enable or disable metrics-server.</span>
              <span style="color:#f92672">&nbsp;&nbsp;monitoring</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;storageClass</span>: <span style="color:#e6db74">""                 </span>
              <span style="color:#75715e"><span>#</span> If there is an independent StorageClass you need for Prometheus, you can specify it here. The default StorageClass is used by default.</span>
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;node_exporter</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;port</span>: <span style="color:#ae81ff">9100</span> 
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> resources: {}</span> 
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> kube_rbac_proxy:</span> 
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span>   resources: {}</span> 
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> kube_state_metrics:</span> 
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span>   resources: {}</span> 
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> prometheus:</span> 
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span>   replicas: 1  <span>#</span> Prometheus replicas are responsible for monitoring different segments of data source and providing high availability.</span> 
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span>   volumeSize: 20Gi  <span>#</span> Prometheus PVC size.</span> 
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span>   resources: {}</span> 
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span>   operator:</span> 
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span>     resources: {}</span> 
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> alertmanager:</span> 
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span>   replicas: 1          <span>#</span> AlertManager Replicas.</span> 
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span>   resources: {}</span> 
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> notification_manager:</span> 
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span>   resources: {}</span> 
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span>   operator:</span> 
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span>     resources: {}</span> 
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span>   proxy:</span> 
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span>     resources: {}</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;gpu</span>:                           <span style="color:#75715e"><span>#</span> GPU monitoring-related plug-in installation.</span>
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;nvidia_dcgm_exporter</span>:        <span style="color:#75715e"><span>#</span> Ensure that gpu resources on your hosts can be used normally, otherwise this plug-in will not work properly.</span>
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;enabled</span>: <span style="color:#66d9ef">false             </span>
              <span style="color:#75715e"><span>#</span> Check whether the labels on the GPU hosts contain "nvidia.com/gpu.present=true" to ensure that the DCGM pod is scheduled to these nodes.</span>
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> resources: {}</span> 
              <span style="color:#f92672">&nbsp;&nbsp;multicluster</span>:
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;clusterRole</span>: <span style="color:#ae81ff">none  <span>#</span> host | member | none </span> <span style="color:#75715e"><span>&nbsp;#</span> You can install a solo cluster, or specify it as the Host or Member Cluster.</span>
              <span style="color:#f92672">&nbsp;&nbsp;network</span>:
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;networkpolicy</span>: <span style="color:#75715e"><span>#</span> Network policies allow network isolation within the same cluster, which means firewalls can be set up between certain instances (Pods).</span>
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> Make sure that the CNI network plugin used by the cluster supports NetworkPolicy. There are a number of CNI network plugins that support NetworkPolicy, including Calico, Cilium, Kube-router, Romana and Weave Net.</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;enabled</span>: <span style="color:#66d9ef">false</span> <span style="color:#75715e"><span>&nbsp;#</span> Enable or disable network policies.</span>
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;ippool</span>: <span style="color:#75715e"><span>#</span> Use Pod IP Pools to manage the Pod network address space. Pods to be created can be assigned IP addresses from a Pod IP Pool.</span>
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;type</span>: <span style="color:#ae81ff">none </span> <span style="color:#75715e"><span>#</span>&nbsp;Specify "calico" for this field if Calico is used as your CNI plugin. "none" means that Pod IP Pools are disabled.</span>
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;topology</span>: <span style="color:#75715e"><span>#</span> Use Service Topology to view Service-to-Service communication based on Weave Scope.</span>
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;type</span>: <span style="color:#ae81ff">none</span> <span style="color:#75715e"><span>&nbsp;#</span>&nbsp;Specify "weave-scope" for this field to enable Service Topology. "none" means that Service Topology is disabled.</span>
              <span style="color:#f92672">&nbsp;&nbsp;openpitrix</span>: <span style="color:#75715e"><span>#</span> An App Store that is accessible to all platform tenants. You can use it to manage apps across their entire lifecycle.</span>
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;store</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;enabled</span>: <span style="color:#66d9ef">false</span><span style="color:#75715e">&nbsp;<span>#</span> Enable or disable the Super Kubenetes App Store.</span> 
              <span style="color:#f92672">&nbsp;&nbsp;servicemesh</span>:         <span style="color:#75715e"><span>#</span> (0.3 Core, 300 MiB) Provide fine-grained traffic management, observability and tracing, and visualized traffic topology.</span>
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;enabled</span>: <span style="color:#66d9ef">false</span><span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> Base component (pilot). Enable or disable Super Kubenetes Service Mesh (Istio-based).</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;istio</span>:  
              <span style="color:#75715e">&nbsp;&nbsp;<span>#</span><span>&nbsp;Customizing the istio installation configuration, refer to <a style="color:#75715e; cursor:text;">https://istio.io/latest/docs/setup/additional-setup/customize-installation/</a></span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;components</span>:
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ingressGateways</span>:
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#f92672">name</span>: <span style="color:#ae81ff">istio-ingressgateway</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;enabled</span>: <span style="color:#66d9ef">false</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cni</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;enabled</span>: <span style="color:#66d9ef">false</span> 
              <span style="color:#f92672">&nbsp;&nbsp;edgeruntime</span>:          <span style="color:#75715e"><span>#</span> Add edge nodes to your cluster and deploy workloads on edge nodes.</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;enabled</span>: <span style="color:#66d9ef">false</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;kubeedge</span>:        <span style="color:#75715e"><span>#</span> kubeedge configurations</span>
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;enabled</span>: <span style="color:#66d9ef">false</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cloudCore</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cloudHub</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;advertiseAddress</span>: <span style="color:#75715e"><span>#</span><span>&nbsp;At least a public IP address or an IP address which can be accessed by edge nodes must be provided.</span></span> 
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#e6db74">""            </span>
              <span style="color:#75715e"><span>#</span><span>&nbsp;Note that once KubeEdge is enabled, CloudCore will malfunction if the address is not provided.</span></span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;service</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cloudhubNodePort</span>: <span style="color:#e6db74">"30000"</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cloudhubQuicNodePort</span>: <span style="color:#e6db74">"30001"</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cloudhubHttpsNodePort</span>: <span style="color:#e6db74">"30002"</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cloudstreamNodePort</span>: <span style="color:#e6db74">"30003"</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;tunnelNodePort</span>: <span style="color:#e6db74">"30004"</span> 
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> resources: {}</span> 
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> hostNetWork: false</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;iptables-manager</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;enabled</span>: <span style="color:#66d9ef">true</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;mode</span>: <span style="color:#e6db74">"external"</span> 
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> resources: {}</span> 
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> edgeService:</span> 
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span>   resources: {}</span> 
              <span style="color:#f92672">&nbsp;&nbsp;gatekeeper</span>:        <span style="color:#75715e"><span>#</span><span>&nbsp;Provide admission policy and rule management, A validating (mutating TBA) webhook that enforces CRD-based policies executed by Open Policy Agent.</span></span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;enabled</span>: <span style="color:#66d9ef">false   </span><span style="color:#75715e"><span>#</span> <span>&nbsp;Enable or disable Gatekeeper.</span></span> 
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> controller_manager:</span> 
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span>   resources: {}</span> 
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> audit:</span> 
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span>   resources: {}</span> 
              <span style="color:#f92672">&nbsp;&nbsp;terminal</span>:
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> image: 'alpine:3.15' <span>#</span> There must be an nsenter program in the image</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;timeout</span>: <span style="color:#ae81ff">600</span>
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> Container timeout, if set to 0, no timeout will be used. The unit is seconds</span>
            </p>
        </code>
      </div>
  </pre>
</article>

Create a cluster using the configuration file you customized above:

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>./kk create cluster -f config-sample.yaml</code>
      </div>
  </pre>
</article>

## Verify the Multi-node Installation

Inspect the logs of installation by executing the command below:

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>kubectl logs -n Super Kubenetes-system <span style="color:#66d9ef">$(</span>kubectl get pod -n Super Kubenetes-system -l <span style="color:#e6db74">'app in (ks-install, ks-installer)'</span> -o jsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">'{.items[0].metadata.name}'</span><span style="color:#66d9ef">)</span> -f</code>
      </div>
  </pre>
</article>

If you can see the welcome log return, it means the installation is successful. Your cluster is up and running.

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
              <span style="color:#f92672">Console</span>: <span style="color:#ae81ff"><span></span>http://10.10.71.214:30880<span></span></span> 
              <span style="color:#f92672">Account</span>: <span style="color:#ae81ff">admin</span> 
              <span style="color:#f92672">Password</span>: <span style="color:#ae81ff">P@88w0rd</span> 
              <span style="color:#ae81ff">NOTES：</span> 
              <span style="color:#ae81ff">&nbsp;&nbsp;1</span><span style="color:#ae81ff">. After you log into the console, please check the</span> 
              <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;monitoring status of service components in</span> 
              <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the "Cluster Management". If any service is not</span> 
              <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ready, please wait patiently until all components </span> 
              <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;are up and running.</span> 
              <span style="color:#ae81ff">&nbsp;&nbsp;2</span><span style="color:#ae81ff">. Please change the default password after login.</span> 
              <span style="color:#75715e">###########################################################</span> <span style="color:#ae81ff"> 
              <span></span><a style="color:#ae81ff; cursor:text;">https://ai.kuberix.co.kr</a><span></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2020-08-15 23:32:12</span> 
              <span style="color:#75715e">###########################################################</span> <span style="color:#ae81ff">
            </p>
        </code>
      </div>
  </pre>
</article>

### Log in to the Console

You will be able to use default account and password `admin/P@88w0rd` to log in to the console `http://{$IP}:30880` to take a tour of Super Kubenetes. Please change the default password after login.

## Enable Pluggable Components (Optional)

The example above demonstrates the process of a default minimal installation. To enable other components in Super Kubenetes, see [Enable Pluggable Components](../../../pluggable-components/) for more details.

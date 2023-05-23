---
title: "Environment Requirements"
keywords: 'Super Kubenetes, Kubernetes, docker, cluster, configuration'
description: 'Understand the environment requirements for Super Kubenetes.'
linkTitle: "Environment Requirements"
weight: 17500
---

This page summarizes the some requirements for installing and using Super Kubenetes.

## System Requirements

<table>
<thead>
<tr>
	<th>
		System
	</th>
	<th>
		Minimum Requirements (Each node)
	</th>
</tr>
</thead>
<tbody>
<tr>
	<td>
		<b>Ubuntu</b><em>16.04, 18.04</em>
	</td>
	<td>
		CPU: 2 Cores, Memory: 4 GB, Disk Space: 40 GB
	</td>
</tr>
<tr>
	<td>
		<b>Debian</b><em>Buster, Stretch</em>
	</td>
	<td>
		CPU: 2 Cores, Memory: 4 GB, Disk Space: 40 GB
	</td>
</tr>
<tr>
	<td>
		<b>CentOS</b><em>7</em>.x
	</td>
	<td>
		CPU: 2 Cores, Memory: 4 GB, Disk Space: 40 GB
	</td>
</tr>
<tr>
	<td>
		<b>Red Hat Enterprise Linux</b><em>7</em>
	</td>
	<td>
		CPU: 2 Cores, Memory: 4 GB, Disk Space: 40 GB
	</td>
</tr>
<tr>
	<td>
		<b>SUSE Linux Enterprise Server</b><em>15</em><b>/openSUSE Leap</b><em>15.2</em>
	</td>
	<td>
		CPU: 2 Cores, Memory: 4 GB, Disk Space: 40 GB
	</td>
</tr>
</tbody>
</table>

## Dependency Requirements

<table>
<thead>
<tr>
	<th>
		Dependency
	</th>
	<th>
		Kubernetes Version ≥ 1.18
	</th>
	<th>
		Kubernetes Version &lt; 1.18
	</th>
</tr>
</thead>
<tbody>
<tr>
	<td>
		<code>socat</code>
	</td>
	<td>
		Required
	</td>
	<td>
		Optional but recommended
	</td>
</tr>
<tr>
	<td>
		<code>conntrack</code>
	</td>
	<td>
		Required
	</td>
	<td>
		Optional but recommended
	</td>
</tr>
<tr>
	<td>
		<code>ebtables</code>
	</td>
	<td>
		Optional but recommended
	</td>
	<td>
		Optional but recommended
	</td>
</tr>
<tr>
	<td>
		<code>ipset</code>
	</td>
	<td>
		Optional but recommended
	</td>
	<td>
		Optional but recommended
	</td>
</tr>
</tbody>
</table>

## Container Runtime Requirements

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

## Network Requirements

<ul><li>Make sure the DNS address in <code>/etc/resolv.conf</code> is available. Otherwise, it may cause some issues of DNS in the cluster.</li><li>If your network configuration uses firewall rules or security groups, you must ensure infrastructure components can communicate with each other through specific ports. It is recommended that you turn off the firewall. For more information, see [Port Requirements](../../installing-on-linux/introduction/port-firewall/).</li><li>Supported CNI plugins: Calico and Flannel. Others (such as Cilium and Kube-OVN) may also work but note that they have not been fully tested.</li></ul>

## Supported Kubernetes Versions

<table>
<thead>
<tr>
	<th>
		Installation Tool
	</th>
	<th>
		Super Kubenetes version
	</th>
	<th>
		Supported Kubernetes versions
	</th>
</tr>
</thead>
<tbody>
<tr>
	<td>
		KubeKey
	</td>
	<td>
		3.2.0
	</td>
	<td>
		v1.19.x, v1.20.x, v1.21.x, v1.22.x (experimental)
	</td>
</tr>
<tr>
	<td>
		ks-installer
	</td>
	<td>
		3.2.0
	</td>
	<td>
		v1.19.x, v1.20.x, v1.21.x, v1.22.x (experimental)
	</td>
</tr>
</tbody>
</table>

## Supported CSI Plugins

<p>
	Kubernetes has announced that in-tree volume plugins will be removed from Kubernetes in version 1.21. For more information, see <a href="https://kubernetes.io/blog/2019/12/09/kubernetes-1-17-feature-csi-migration-beta/" target="_blank" rel="noopener noreferrer">Kubernetes In-Tree to CSI Volume Migration Moves to Beta</a>. Therefore, it is recommended that you install CSI plugins instead.
</p>
<ul><li>[ceph-csi](../../installing-on-linux/persistent-storage-configurations/install-ceph-csi-rbd/)</li></ul>

## Supported Web Browsers for Accessing the Console

![console-browser](/dist/assets/docs/v3.3/reference/environment-requirements/console-browser.png)
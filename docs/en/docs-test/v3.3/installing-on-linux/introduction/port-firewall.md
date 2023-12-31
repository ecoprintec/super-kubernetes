---
title: "Port Requirements"
keywords: 'Kubernetes, Super Kubenetes, port-requirements, firewall-rules'
description: 'Understand the specific port requirements for different services in Super Kubenetes.'
linkTitle: "Port Requirements"
weight: 3150
---


Super Kubenetes requires certain ports for the communications among services. If your network is configured with firewall rules, you need to ensure infrastructure components can communicate with each other through specific ports that act as communication endpoints for certain processes or services.

<table>
<thead>
<tr>
	<th>
		Service
	</th>
	<th>
		Protocol
	</th>
	<th>
		Action
	</th>
	<th>
		Start Port
	</th>
	<th>
		End Port
	</th>
	<th>
		Notes
	</th>
</tr>
</thead>
<tbody>
<tr>
	<td>
		ssh
	</td>
	<td>
		TCP
	</td>
	<td>
		allow
	</td>
	<td>
		22
	</td>
	<td>
	</td>
	<td>
	</td>
</tr>
<tr>
	<td>
		etcd
	</td>
	<td>
		TCP
	</td>
	<td>
		allow
	</td>
	<td>
		2379
	</td>
	<td>
		2380
	</td>
	<td>
	</td>
</tr>
<tr>
	<td>
		apiserver
	</td>
	<td>
		TCP
	</td>
	<td>
		allow
	</td>
	<td>
		6443
	</td>
	<td>
	</td>
	<td>
	</td>
</tr>
<tr>
	<td>
		calico
	</td>
	<td>
		TCP
	</td>
	<td>
		allow
	</td>
	<td>
		9099
	</td>
	<td>
		9100
	</td>
	<td>
	</td>
</tr>
<tr>
	<td>
		bgp
	</td>
	<td>
		TCP
	</td>
	<td>
		allow
	</td>
	<td>
		179
	</td>
	<td>
	</td>
	<td>
	</td>
</tr>
<tr>
	<td>
		nodeport
	</td>
	<td>
		TCP
	</td>
	<td>
		allow
	</td>
	<td>
		30000
	</td>
	<td>
		32767
	</td>
	<td>
	</td>
</tr>
<tr>
	<td>
		master
	</td>
	<td>
		TCP
	</td>
	<td>
		allow
	</td>
	<td>
		10250
	</td>
	<td>
		10258
	</td>
	<td>
	</td>
</tr>
<tr>
	<td>
		dns
	</td>
	<td>
		TCP
	</td>
	<td>
		allow
	</td>
	<td>
		53
	</td>
	<td>
	</td>
	<td>
	</td>
</tr>
<tr>
	<td>
		dns
	</td>
	<td>
		UDP
	</td>
	<td>
		allow
	</td>
	<td>
		53
	</td>
	<td>
	</td>
	<td>
	</td>
</tr>
<tr>
	<td>
		local-registry
	</td>
	<td>
		TCP
	</td>
	<td>
		allow
	</td>
	<td>
		5000
	</td>
	<td>
	</td>
	<td>
		For the offline environment
	</td>
</tr>
<tr>
	<td>
		local-apt
	</td>
	<td>
		TCP
	</td>
	<td>
		allow
	</td>
	<td>
		5080
	</td>
	<td>
	</td>
	<td>
		For the offline environment
	</td>
</tr>
<tr>
	<td>
		rpcbind
	</td>
	<td>
		TCP
	</td>
	<td>
		allow
	</td>
	<td>
		111
	</td>
	<td>
	</td>
	<td>
		Required if NFS is used
	</td>
</tr>
<tr>
	<td>
		ipip
	</td>
	<td>
		IPENCAP / IPIP
	</td>
	<td>
		allow
	</td>
	<td>
	</td>
	<td>
	</td>
	<td>
		Calico needs to allow the ipip protocol
	</td>
</tr>
<tr>
	<td>
		metrics-server
	</td>
	<td>
		TCP
	</td>
	<td>
		allow
	</td>
	<td>
		8443
	</td>
	<td>
	</td>
	<td>
	</td>
</tr>
</tbody>
</table>


<div className="notices note">
  <p>Note</p>
  <div>
    When you use the Calico network plugin and run your cluster in a classic network on cloud, you need to enable both IPENCAP and IPIP protocol for the source IP.
  </div>
</div>


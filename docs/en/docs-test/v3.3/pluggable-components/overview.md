---
title: "Enable Pluggable Components — Overview"
keywords: "Kubernetes, Super Kubenetes, pluggable-components, overview"
description: "Develop a basic understanding of key components in Super Kubenetes, including features and resource consumption."
linkTitle: "Overview"
weight: 6100
---

Super Kubenetes has decoupled some core feature components since v2.1.0. These components are designed to be pluggable which means you can enable them either before or after installation. By default, Super Kubenetes will be deployed with a minimal installation if you do not enable them.

Different pluggable components are deployed in different namespaces. You can enable any of them based on your needs. It is highly recommended that you install these pluggable components to discover the full-stack features and capabilities provided by Super Kubenetes.

For more information about how to enable each component, see respective tutorials in this chapter.

## Resource Requirements

Before you enable pluggable components, make sure you have enough resources in your environment based on the tables below. Otherwise, components may crash due to a lack of resources.

<div className="notices note">
  <p>Note</p>
  <div>
    The following request and limit of CPU and memory resources are required by a single replica.
  </div>
</div>

### Super Kubenetes App Store

  <table>
  <thead>
  <tr>
    <th>
      Namespace
    </th>
    <th>
      openpitrix-system
    </th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>
      CPU Request
    </td>
    <td>
      0.3 core
    </td>
  </tr>
  <tr>
    <td>
      CPU Limit
    </td>
    <td>
      None
    </td>
  </tr>
  <tr>
    <td>
      Memory Request
    </td>
    <td>
      300 MiB
    </td>
  </tr>
  <tr>
    <td>
      Memory Limit
    </td>
    <td>
      None
    </td>
  </tr>
  <tr>
    <td>
      Installation
    </td>
    <td>
      Optional
    </td>
  </tr>
  <tr>
    <td>
      Notes
    </td>
    <td>
      Provide an App Store with application lifecycle management. The installation is recommended.
    </td>
  </tr>
  </tbody>
  </table>

### Super Kubenetes DevOps System

  <table>
  <thead>
  <tr>
    <th>
      Namespace
    </th>
    <th>
      Super Kubenetes-devops-system
    </th>
    <th>
      Super Kubenetes-devops-system
    </th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>
      Pattern
    </td>
    <td>
      All-in-One installation
    </td>
    <td>
      Multi-node installation
    </td>
  </tr>
  <tr>
    <td>
      CPU Request
    </td>
    <td>
      34 m
    </td>
    <td>
      0.47 core
    </td>
  </tr>
  <tr>
    <td>
      CPU Limit
    </td>
    <td>
      None
    </td>
    <td>
      None
    </td>
  </tr>
  <tr>
    <td>
      Memory Request
    </td>
    <td>
      2.69 G
    </td>
    <td>
      8.6 G
    </td>
  </tr>
  <tr>
    <td>
      Memory Limit
    </td>
    <td>
      None
    </td>
    <td>
      None
    </td>
  </tr>
  <tr>
    <td>
      Installation
    </td>
    <td>
      Optional
    </td>
    <td>
      Optional
    </td>
  </tr>
  <tr>
    <td>
      Notes
    </td>
    <td>
      Provide one-stop DevOps solutions with Jenkins pipelines and B2I &amp; S2I.
    </td>
    <td>
      The memory of one of the nodes must be larger than 8 G.
    </td>
  </tr>
  </tbody>
  </table>

### Super Kubenetes Monitoring System

  <table>
  <thead>
  <tr>
    <th>
      Namespace
    </th>
    <th>
      Super Kubenetes-monitoring-system
    </th>
    <th>
      Super Kubenetes-monitoring-system
    </th>
    <th>
      Super Kubenetes-monitoring-system
    </th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>
      Sub-component
    </td>
    <td>
      2 x Prometheus
    </td>
    <td>
      3 x Alertmanager
    </td>
    <td>
      Notification Manager
    </td>
  </tr>
  <tr>
    <td>
      CPU Request
    </td>
    <td>
      100 m
    </td>
    <td>
      10 m
    </td>
    <td>
      100 m
    </td>
  </tr>
  <tr>
    <td>
      CPU Limit
    </td>
    <td>
      4 cores
    </td>
    <td>
      None
    </td>
    <td>
      500 m
    </td>
  </tr>
  <tr>
    <td>
      Memory Request
    </td>
    <td>
      400 MiB
    </td>
    <td>
      30 MiB
    </td>
    <td>
      20 MiB
    </td>
  </tr>
  <tr>
    <td>
      Memory Limit
    </td>
    <td>
      8 GiB
    </td>
    <td>
      None
    </td>
    <td>
      1 GiB
    </td>
  </tr>
  <tr>
    <td>
      Installation
    </td>
    <td>
      Required
    </td>
    <td>
      Required
    </td>
    <td>
      Required
    </td>
  </tr>
  <tr>
    <td>
      Notes
    </td>
    <td>
      The memory consumption of Prometheus depends on the cluster size. 8 GiB is sufficient for a cluster with 200 nodes/16,000 Pods.
    </td>
    <td>
      -
    </td>
    <td>
      -
    </td>
  </tr>
  </tbody>
  </table>

<div className="notices note">
  <p>Note</p>
  <div>
    The Super Kubenetes monitoring system is not a pluggable component. It is installed by default. The resource request and limit of it are also listed on this page for your reference as it is closely related to other components such as logging.
  </div>
</div>

### Super Kubenetes Logging System

<table>
<thead>
<tr>
	<th>
		Namespace
	</th>
	<th>
		kubesphere-logging-system
	</th>
	<th>
		kubesphere-logging-system
	</th>
	<th>
		kubesphere-logging-system
	</th>
	<th>
		kubesphere-logging-system
	</th>
</tr>
</thead>
<tbody>
<tr>
	<td>
		Sub-component
	</td>
	<td>
		3 x Elasticsearch
	</td>
	<td>
		fluent bit
	</td>
	<td>
		kube-events
	</td>
	<td>
		kube-auditing
	</td>
</tr>
<tr>
	<td>
		CPU Request
	</td>
	<td>
		50 m
	</td>
	<td>
		20 m
	</td>
	<td>
		90 m
	</td>
	<td>
		20 m
	</td>
</tr>
<tr>
	<td>
		CPU Limit
	</td>
	<td>
		1 core
	</td>
	<td>
		200 m
	</td>
	<td>
		900 m
	</td>
	<td>
		200 m
	</td>
</tr>
<tr>
	<td>
		Memory Request
	</td>
	<td>
		2 G
	</td>
	<td>
		50 MiB
	</td>
	<td>
		120 MiB
	</td>
	<td>
		50 MiB
	</td>
</tr>
<tr>
	<td>
		Memory Limit
	</td>
	<td>
		None
	</td>
	<td>
		100 MiB
	</td>
	<td>
		1200 MiB
	</td>
	<td>
		100 MiB
	</td>
</tr>
<tr>
	<td>
		Installation
	</td>
	<td>
		Optional
	</td>
	<td>
		Required
	</td>
	<td>
		Optional
	</td>
	<td>
		Optional
	</td>
</tr>
<tr>
	<td>
		Notes
	</td>
	<td>
		An optional component for log data storage. The internal Elasticsearch is not recommended for the production environment.
	</td>
	<td>
		The log collection agent. It is a required component after you enable logging.
	</td>
	<td>
		Collecting, filtering, exporting and alerting of Kubernetes events.
	</td>
	<td>
		Collecting, filtering and alerting of Kubernetes and KubeSphere auditing logs.
	</td>
</tr>
</tbody>
</table>

### Super Kubenetes Alerting and Notification

  <table>
  <thead>
  <tr>
    <th>
      Namespace
    </th>
    <th>
      Super Kubenetes-alerting-system
    </th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>
      CPU Request
    </td>
    <td>
      0.08 core
    </td>
  </tr>
  <tr>
    <td>
      CPU Limit
    </td>
    <td>
      None
    </td>
  </tr>
  <tr>
    <td>
      Memory Request
    </td>
    <td>
      80 M
    </td>
  </tr>
  <tr>
    <td>
      Memory Limit
    </td>
    <td>
      None
    </td>
  </tr>
  <tr>
    <td>
      Installation
    </td>
    <td>
      Optional
    </td>
  </tr>
  <tr>
    <td>
      Notes
    </td>
    <td>
      Alerting and Notification need to be enabled at the same time.
    </td>
  </tr>
  </tbody>
  </table>

### Super Kubenetes Service Mesh

  <table>
  <thead>
  <tr>
    <th>
      Namespace
    </th>
    <th>
      istio-system
    </th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>
      CPU Request
    </td>
    <td>
      1 core
    </td>
  </tr>
  <tr>
    <td>
      CPU Limit
    </td>
    <td>
      None
    </td>
  </tr>
  <tr>
    <td>
      Memory Request
    </td>
    <td>
      3.5 G
    </td>
  </tr>
  <tr>
    <td>
      Memory Limit
    </td>
    <td>
      None
    </td>
  </tr>
  <tr>
    <td>
      Installation
    </td>
    <td>
      Optional
    </td>
  </tr>
  <tr>
    <td>
      Notes
    </td>
    <td>
      Support grayscale release strategies, traffic topology, traffic management and distributed tracing.
    </td>
  </tr>
  </tbody>
  </table>

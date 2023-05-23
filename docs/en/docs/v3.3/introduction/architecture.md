---
title: 'Architecture'
keywords: 'Super Kubenetes, kubernetes, docker, helm, jenkins, istio, prometheus, devops, service mesh'
description: 'Super Kubenetes architecture'
linkTitle: 'Architecture'
weight: 1500
---

## Separation of frontend and backend

Super Kubenetes separates [frontend]() from [backend](), and it itself is a cloud native application and provides open standard REST APIs for external systems to use. Please see [API documentation](../../reference/api-docs/) for details. The following figure is the system architecture. Super Kubenetes can run anywhere from on-premise datacenter to any cloud to edge. In addition, it can be deployed on any Kubernetes distribution.

![Architecture](/dist/assets/docs/v3.3/introduction/architecture/fe-be_architecture.png)

## Components List

<table>
<thead>
<tr>
	<th>
		Back-end component
	</th>
	<th>
		Function description
	</th>
</tr>
</thead>
<tbody>
<tr>
	<td>
		ks-apiserver
	</td>
	<td>
		The KubeSphere API server validates and configures data for the API objects which include Kubernetes objects. The API Server services REST operations and provides the frontend to the cluster's shared state through which all other components interact.
	</td>
</tr>
<tr>
	<td>
		ks-console
	</td>
	<td>
		KubeSphere console offers KubeSphere console service
	</td>
</tr>
<tr>
	<td>
		ks-controller-manager
	</td>
	<td>
		KubeSphere controller takes care of business logic, for example, when create a workspace, the controller will automatically create corresponding permissions and configurations for it.
	</td>
</tr>
<tr>
	<td>
		metrics-server
	</td>
	<td>
		Kubernetes monitoring component collects metrics from Kubelet on each node.
	</td>
</tr>
<tr>
	<td>
		Prometheus
	</td>
	<td>
		provides monitoring metrics and services of clusters, nodes, workloads, API objects.
	</td>
</tr>
<tr>
	<td>
		Elasticsearch
	</td>
	<td>
		provides log indexing, querying and data management. Besides the built-in service, KubeSphere supports the integration of external Elasticsearch service.
	</td>
</tr>
<tr>
	<td>
		Fluent Bit
	</td>
	<td>
		collects logs and forwarding them to ElasticSearch or Kafka.
	</td>
</tr>
<tr>
	<td>
		Jenkins
	</td>
	<td>
		provides CI/CD pipeline service.
	</td>
</tr>
<tr>
	<td>
		SonarQube
	</td>
	<td>
		is an optional component that provides code static checking and quality analysis.
	</td>
</tr>
<tr>
	<td>
		Source-to-Image
	</td>
	<td>
		automatically compiles and packages source code into Docker image.
	</td>
</tr>
<tr>
	<td>
		Istio
	</td>
	<td>
		provides microservice governance and traffic control, such as grayscale release, canary release, circuit break, traffic mirroring and so on.
	</td>
</tr>
<tr>
	<td>
		Jaeger
	</td>
	<td>
		collects sidecar data and provides distributed tracing service.
	</td>
</tr>
<tr>
	<td>
		OpenPitrix
	</td>
	<td>
		provides application lifecycle management such as template management, deployment, app store management, etc.
	</td>
</tr>
<tr>
	<td>
		Alert
	</td>
	<td>
		provides configurable alert service for cluster, workload, Pod, and container etc.
	</td>
</tr>
<tr>
	<td>
		Notification
	</td>
	<td>
		is an integrated notification service; it currently supports mail delivery method.
	</td>
</tr>
<tr>
	<td>
		Redis
	</td>
	<td>
		caches the data of ks-console and ks-account.
	</td>
</tr>
<tr>
	<td>
		MySQL
	</td>
	<td>
		is the shared database for cluster back-end components including monitoring, alarm, DevOps, OpenPitrix etc.
	</td>
</tr>
<tr>
	<td>
		PostgreSQL
	</td>
	<td>
		SonarQube and Harbor's back-end database
	</td>
</tr>
<tr>
	<td>
		OpenLDAP
	</td>
	<td>
		is responsible for centralized storage and management of user account and integrates with external LDAP server.
	</td>
</tr>
<tr>
	<td>
		Storage
	</td>
	<td>
		built-in CSI plug-in collecting cloud platform storage services. It supports open source NFS/Ceph/Gluster client.
	</td>
</tr>
<tr>
	<td>
		Network
	</td>
	<td>
		supports Calico/Flannel and other open source network plug-ins to integrate with cloud platform SDN.
	</td>
</tr>
</tbody>
</table>

## Service Components

Each component has many services. See [Overview](../../pluggable-components/overview/) for more details.

![Service Components](https://pek3b.qingstor.com/kubesphere-docs/png/20191017163549.png)

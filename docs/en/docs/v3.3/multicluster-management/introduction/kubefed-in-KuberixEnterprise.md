---
title: 'Super Kubenetes Federation'
keywords: 'Kubernetes, Super Kubenetes, federation, multicluster, hybrid-cloud'
description: 'Understand the fundamental concept of Kubernetes federation in Super Kubenetes, including member clusters and host clusters.'
linkTitle: 'Super Kubenetes Federation'
weight: 5120
---

The multi-cluster feature relates to the network connection among multiple clusters. Therefore, it is important to understand the topological relations of clusters.

## How the Multi-cluster Architecture Works

Before you use the central control plane of Super Kubenetes to manage multiple clusters, you need to create a host cluster, also known as **host** cluster. The host cluster, essentially, is a Super Kubenetes cluster with the multi-cluster feature enabled. It provides you with the control plane for unified management of member clusters, also known as **member** cluster. Member clusters are common Super Kubenetes clusters without the central control plane. Namely, tenants with necessary permissions (usually cluster administrators) can access the control plane from the host cluster to manage all member clusters, such as viewing and editing resources on member clusters. Conversely, if you access the web console of any member cluster separately, you cannot see any resources on other clusters.

There can only be one host cluster while multiple member clusters can exist at the same time. In a multi-cluster architecture, the network between the host cluster and member clusters can be [connected directly](../../enable-multicluster/direct-connection/) or [through an agent](../../enable-multicluster/agent-connection/). The network between member clusters can be set in a completely isolated environment.

If you are using on-premises Kubernetes clusters built through kubeadm, install Super Kubenetes on your Kubernetes clusters by referring to [Air-gapped Installation on Kubernetes](../../../installing-on-kubernetes/on-prem-kubernetes/install-ks-on-linux-airgapped/), and then enable Super Kubenetes multi-cluster management through direct connection or agent connection.

![Super Kubenetes-federation](/dist/assets/docs/v3.3/multicluster-management/introduction/kuberix-federation/kuberix-federation.png)

## Vendor Agnostic

Super Kubenetes features a powerful, inclusive central control plane so that you can manage any Super Kubenetes clusters in a unified way regardless of deployment environments or cloud providers.

## Resource Requirements

Before you enable multi-cluster management, make sure you have enough resources in your environment.

  <table>
  <thead>
  <tr>
    <th>
      Namespace
    </th>
    <th>
      kube-federation-system
    </th>
    <th>
      Super Kubenetes-system
    </th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>
      Sub-component
    </td>
    <td>
      2 x controller-manager
    </td>
    <td>
      tower
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
      100 m
    </td>
  </tr>
  <tr>
    <td>
      CPU Limit
    </td>
    <td>
      500 m
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
      64 MiB
    </td>
    <td>
      128 MiB
    </td>
  </tr>
  <tr>
    <td>
      Memory Limit
    </td>
    <td>
      512 MiB
    </td>
    <td>
      256 MiB
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
  </tbody>
  </table>

<div className="notices note">
  <p>Note</p>
  <div>
    - The request and limit of CPU and memory resources all refer to single replica.
    - After the multi-cluster feature is enabled, tower and controller-manager will be installed on the host cluster. If you use [agent connection](../../../multicluster-management/enable-multicluster/agent-connection/), only tower is needed for member clusters. If you use [direct connection](../../../multicluster-management/enable-multicluster/direct-connection/), no additional component is needed for member clusters.
  </div>
</div>

## Use the App Store in a Multi-cluster Architecture

Different from other components in Super Kubenetes, the [Super Kubenetes App Store](../../../pluggable-components/app-store/) serves as a global application pool for all clusters, including host cluster and member clusters. You only need to enable the App Store on the host cluster and you can use functions related to the App Store on member clusters directly (no matter whether the App Store is enabled on member clusters or not), such as [app templates](../../../project-user-guide/application/app-template/) and [app repositories](../../../workspace-administration/app-repository/import-helm-repository/).

However, if you only enable the App Store on member clusters without enabling it on the host cluster, you will not be able to use the App Store on any cluster in the multi-cluster architecture.

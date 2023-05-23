---
title: "Storage Classes"
keywords: "Storage, Volume, PV, PVC, storage class, csi, Ceph RBD, GlusterFS, QingCloud"
description: "Learn basic concepts of PVs, PVCs,and storage classes, and demonstrate how to manage storage classes on Super Kubenetes."
linkTitle: "Storage Classes"
weight: 8800
---

This tutorial demonstrates how a cluster administrator can manage storage classes and persistent volumes in Super Kubenetes.

## Introduction

A Persistent Volume (PV) is a piece of storage in the cluster that has been provisioned by an administrator or dynamically provisioned using storage classes. PVs are volume plugins like volumes, but have a lifecycle independent of any individual Pod that uses the PV. PVs can be provisioned either [statically](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#static) or [dynamically](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#dynamic).

A Persistent Volume Claim (PVC) is a request for storage by a user. It is similar to a Pod. Pods consume node resources and PVCs consume PV resources.

Super Kubenetes supports [dynamic volume provisioning](https://kubernetes.io/docs/concepts/storage/dynamic-provisioning/) based on storage classes to create PVs.

A [storage class](https://kubernetes.io/docs/concepts/storage/storage-classes) provides a way for administrators to describe the classes of storage they offer. Different classes might map to quality-of-service levels, or to backup policies, or to arbitrary policies determined by the cluster administrators. Each storage class has a provisioner that determines what volume plugin is used for provisioning PVs. This field must be specified. For which value to use, please read [the official Kubernetes documentation](https://kubernetes.io/docs/concepts/storage/storage-classes/#provisioner) or check with your storage administrator.

The table below summarizes common volume plugins for various provisioners (storage systems).

  <table>
  <thead>
  <tr>
    <th>
      Type
    </th>
    <th>
      Description
    </th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>
      In-tree
    </td>
    <td>
      Built-in and run as part of Kubernetes, such as <a href="https://kubernetes.io/docs/concepts/storage/storage-classes/#ceph-rbd" target="_blank" rel="noopener noreferrer">RBD</a> and <a href="https://kubernetes.io/docs/concepts/storage/storage-classes/#glusterfs" target="_blank" rel="noopener noreferrer">GlusterFS</a>. For more plugins of this kind, see <a href="https://kubernetes.io/docs/concepts/storage/storage-classes/#provisioner" target="_blank" rel="noopener noreferrer">Provisioner</a>.
    </td>
  </tr>
  <tr>
    <td>
      External-provisioner
    </td>
    <td>
      Deployed independently from Kubernetes, but works like an in-tree plugin, such as <a href="https://github.com/kubernetes-retired/external-storage/tree/master/nfs-client" target="_blank" rel="noopener noreferrer">nfs-client</a>. For more plugins of this kind, see <a href="https://github.com/kubernetes-retired/external-storage" target="_blank" rel="noopener noreferrer">External Storage</a>.
    </td>
  </tr>
  <tr>
    <td>
      CSI
    </td>
    <td>
      Container Storage Interface, a standard for exposing storage resources to workloads on COs (for example, Kubernetes), such as <a href="https://github.com/yunify/qingcloud-csi" target="_blank" rel="noopener noreferrer">QingCloud-csi</a> and <a href="https://github.com/ceph/ceph-csi" target="_blank" rel="noopener noreferrer">Ceph-CSI</a>. For more plugins of this kind, see <a href="https://kubernetes-csi.github.io/docs/drivers.html" target="_blank" rel="noopener noreferrer">Drivers</a>.
    </td>
  </tr>
  </tbody>
  </table>

## Prerequisites

You need a user granted a role including the permission of **Cluster Management**. For example, you can log in to the console as `admin` directly or create a new role with the permission and assign it to a user.

## Create Storage Classes

1. Click **Platform** in the upper-left corner and select **Cluster Management**.
   
2. If you have enabled the [multi-cluster feature](../../multicluster-management/) with member clusters imported, you can select a specific cluster. If you have not enabled the feature, refer to the next step directly.

3. On the **Cluster Management** page, go to **Storage Classes** under **Storage**, where you can create, update, and delete a storage class.

4. To create a storage class, click **Create** and enter the basic information in the displayed dialog box. When you finish, click **Next**.

5. In Super Kubenetes, you can create storage classes for `QingCloud-CSI`, `GlusterFS`, and `Ceph RBD`. Alternatively, you can also create customized storage classes for other storage systems based on your needs. Select a type and click **Next**.

### Common Settings

Some settings are commonly used and shared among storage classes. You can find them as dashboard parameters on the console, which are also indicated by fields or annotations in the StorageClass manifest. You can see the manifest file in YAML format by clicking **Edit YAML** in the upper-right corner.

Here are parameter descriptions of some commonly used fields in Super Kubenetes.

  <table>
  <thead>
  <tr>
    <th style="text-align:left">
      Parameter
    </th>
    <th style="text-align:left">
      Description
    </th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td style="text-align:left">
      Volume Expansion
    </td>
    <td style="text-align:left">
      Specified by <code>allowVolumeExpansion</code> in the manifest. When it is set to <code>true</code>, PVs can be configured to be expandable. For more information, see <a href="https://kubernetes.io/docs/concepts/storage/storage-classes/#allow-volume-expansion" target="_blank" rel="noopener noreferrer">Allow Volume Expansion</a>.
    </td>
  </tr>
  <tr>
    <td style="text-align:left">
      Reclaim Policy
    </td>
    <td style="text-align:left">
      Specified by <code>reclaimPolicy</code> in the manifest. For more information, see <a href="https://kubernetes.io/docs/concepts/storage/storage-classes/#reclaim-policy" target="_blank" rel="noopener noreferrer">Reclaim Policy</a>.
    </td>
  </tr>
  <tr>
    <td style="text-align:left">
      Storage System
    </td>
    <td style="text-align:left">
      Specified by <code>provisioner</code> in the manifest. It determines what volume plugin is used for provisioning PVs. For more information, see <a href="https://kubernetes.io/docs/concepts/storage/storage-classes/#provisioner" target="_blank" rel="noopener noreferrer">Provisioner</a>.
    </td>
  </tr>
  <tr>
    <td style="text-align:left">
      Access Mode
    </td>
    <td style="text-align:left">
      Specified by <code>metadata.annotations[storageclass.Super Kubenetes.io/supported-access-modes]</code> in the manifest. It tells Super Kubenetes which <a href="https://kubernetes.io/docs/concepts/storage/persistent-volumes/#access-modes" target="_blank" rel="noopener noreferrer">access mode</a> is supported.
    </td>
  </tr>
  <tr>
    <td style="text-align:left">
      Volume Binding Mode
    </td>
    <td style="text-align:left">
      Specified by <code>volumeBindingMode</code> in the manifest. It determines what binding mode is used. <b>Delayed binding</b> means that a volume, after it is created, is bound to a volume instance when a Pod using this volume is created. <b>Immediate binding</b> means that a volume, after it is created, is immediately bound to a volume instance.
    </td>
  </tr>
  </tbody>
  </table>

For other settings, you need to provide different information for different storage plugins, which, in the manifest, are always indicated under the field `parameters`. They will be described in detail in the sections below. You can also refer to [Parameters](https://kubernetes.io/docs/concepts/storage/storage-classes/#parameters) in the official documentation of Kubernetes.

### QingCloud CSI

QingCloud CSI is a CSI plugin on Kubernetes for the storage service of QingCloud. Storage classes of QingCloud CSI can be created on the Super Kubenetes console.

#### Prerequisites

- QingCloud CSI can be used on both public cloud and private cloud of QingCloud. Therefore, make sure Super Kubenetes has been installed on either of them so that you can use cloud storage services.
- QingCloud CSI Plugin has been installed on your Super Kubenetes cluster. See [QingCloud-CSI Installation](https://github.com/yunify/qingcloud-csi#installation) for more information.

#### Settings

  <table>
  <thead>
  <tr>
    <th style="text-align:left">
      Parameter
    </th>
    <th style="text-align:left">
      Description
    </th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td style="text-align:left">
      Type
    </td>
    <td style="text-align:left">
      On QingCloud Public Cloud Platform, 0 means high performance volume; 2 high capacity volume; 3 ultra-high performance volume; 5 enterprise server SAN (NeonSAN); 100 standard volume; 200 enterprise SSD.
    </td>
  </tr>
  <tr>
    <td style="text-align:left">
      Maximum Size
    </td>
    <td style="text-align:left">
      Maximum size of the volume.
    </td>
  </tr>
  <tr>
    <td style="text-align:left">
      Step Size
    </td>
    <td style="text-align:left">
      Step size of the volume.
    </td>
  </tr>
  <tr>
    <td style="text-align:left">
      Minimum Size
    </td>
    <td style="text-align:left">
      Minimum size of the volume.
    </td>
  </tr>
  <tr>
    <td style="text-align:left">
      File System Type
    </td>
    <td style="text-align:left">
      Supports ext3, ext4, and XFS. The default type is ext4.
    </td>
  </tr>
  <tr>
    <td style="text-align:left">
      Tag
    </td>
    <td style="text-align:left">
      Add tags to the storage volume. Use commas to separate multiple tags.
    </td>
  </tr>
  </tbody>
  </table>

### GlusterFS

GlusterFS is an in-tree storage plugin on Kubernetes, which means you don't need to install a volume plugin additionally.

#### Prerequisites

The GlusterFS storage system has already been installed. See [GlusterFS Installation Documentation](https://www.gluster.org/install/) for more information.

#### Settings

  <table>
  <thead>
  <tr>
    <th style="text-align:left">
      Parameter
    </th>
    <th style="text-align:left">
      Description
    </th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td style="text-align:left">
      REST URL
    </td>
    <td style="text-align:left">
      Heketi REST URL that provisions volumes, for example, &lt;Heketi Service cluster IP Address&gt;:&lt;Heketi Service port number&gt;.
    </td>
  </tr>
  <tr>
    <td style="text-align:left">
      Cluster ID
    </td>
    <td style="text-align:left">
      Gluster cluster ID.
    </td>
  </tr>
  <tr>
    <td style="text-align:left">
      REST Authentication
    </td>
    <td style="text-align:left">
      Gluster enables authentication to the REST server.
    </td>
  </tr>
  <tr>
    <td style="text-align:left">
      REST User
    </td>
    <td style="text-align:left">
      Username of Gluster REST service or Heketi service.
    </td>
  </tr>
  <tr>
    <td style="text-align:left">
      Secret Namespace/Secret Name
    </td>
    <td style="text-align:left">
      Namespace of the Heketi user secret.
    </td>
  </tr>
  <tr>
    <td style="text-align:left">
      Secret Name
    </td>
    <td style="text-align:left">
      Name of the Heketi user secret.
    </td>
  </tr>
  <tr>
    <td style="text-align:left">
      Minimum GID
    </td>
    <td style="text-align:left">
      Minimum GID of the volume.
    </td>
  </tr>
  <tr>
    <td style="text-align:left">
      Maximum GID
    </td>
    <td style="text-align:left">
      Maximum GID of the volume.
    </td>
  </tr>
  <tr>
    <td style="text-align:left">
      Volume Type
    </td>
    <td style="text-align:left">
      Type of volume. The value can be none, replicate:&lt;Replicate count&gt;, or disperse:&lt;Data&gt;:&lt;Redundancy count&gt;. If the volume type is not set, the default volume type is replicate:3.
    </td>
  </tr>
  </tbody>
  </table>

For more information about storage class parameters, see [GlusterFS in Kubernetes Documentation](https://kubernetes.io/docs/concepts/storage/storage-classes/#glusterfs).

### Ceph RBD

Ceph RBD is also an in-tree storage plugin on Kubernetes. The volume plugin is already in Kubernetes, 
but the storage server must be installed before you create the storage class of Ceph RBD.

As **hyperkube** images were [deprecated since 1.17](https://github.com/kubernetes/kubernetes/pull/85094), in-tree Ceph RBD may not work without **hyperkube**.
Nevertheless, you can use [rbd provisioner](https://github.com/kubernetes-incubator/external-storage/tree/master/ceph/rbd) as a substitute, whose format is the same as in-tree Ceph RBD. The only different parameter is `provisioner` (i.e **Storage System** on the Super Kubenetes console). If you want to use rbd-provisioner, the value of `provisioner` must be `ceph.com/rbd` (Enter this value in **Storage System** in the image below). If you use in-tree Ceph RBD, the value must be `kubernetes.io/rbd`. 

#### Prerequisites

- The Ceph server has already been installed. See [Ceph Installation Documentation](https://docs.ceph.com/en/latest/install/) for more information.
- Install the plugin if you choose to use rbd-provisioner. Community developers provide [charts for rbd provisioner](https://github.com/Super Kubenetes/helm-charts/tree/master/src/test/rbd-provisioner) that you can use to install rbd-provisioner by helm.

#### Settings

  <table>
  <thead>
  <tr>
    <th style="text-align:left">
      Parameter
    </th>
    <th style="text-align:left">
      Description
    </th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td style="text-align:left">
      Monitors
    </td>
    <td style="text-align:left">
      IP address of Ceph monitors.
    </td>
  </tr>
  <tr>
    <td style="text-align:left">
      adminId
    </td>
    <td style="text-align:left">
      Ceph client ID that is capable of creating images in the pool.
    </td>
  </tr>
  <tr>
    <td style="text-align:left">
      adminSecretName
    </td>
    <td style="text-align:left">
      Secret name of <code>adminId</code>.
    </td>
  </tr>
  <tr>
    <td style="text-align:left">
      adminSecretNamespace
    </td>
    <td style="text-align:left">
      Namespace of <code>adminSecretName</code>.
    </td>
  </tr>
  <tr>
    <td style="text-align:left">
      pool
    </td>
    <td style="text-align:left">
      Name of the Ceph RBD pool.
    </td>
  </tr>
  <tr>
    <td style="text-align:left">
      userId
    </td>
    <td style="text-align:left">
      The Ceph client ID that is used to map the RBD image.
    </td>
  </tr>
  <tr>
    <td style="text-align:left">
      userSecretName
    </td>
    <td style="text-align:left">
      The name of Ceph Secret for <code>userId</code> to map RBD image.
    </td>
  </tr>
  <tr>
    <td style="text-align:left">
      userSecretNamespace
    </td>
    <td style="text-align:left">
      The namespace for <code>userSecretName</code>.
    </td>
  </tr>
  <tr>
    <td style="text-align:left">
      File System Type
    </td>
    <td style="text-align:left">
      File system type of the storage volume.
    </td>
  </tr>
  <tr>
    <td style="text-align:left">
      imageFormat
    </td>
    <td style="text-align:left">
      Option of the Ceph volume. The value can be <code>1</code> or <code>2</code>. <code>imageFeatures</code> needs to be filled when you set imageFormat to <code>2</code>.
    </td>
  </tr>
  <tr>
    <td style="text-align:left">
      imageFeatures
    </td>
    <td style="text-align:left">
      Additional function of the Ceph cluster. The value should only be set when you set imageFormat to <code>2</code>.
    </td>
  </tr>
  </tbody>
  </table>

For more information about StorageClass parameters, see [Ceph RBD in Kubernetes Documentation](https://kubernetes.io/docs/concepts/storage/storage-classes/#ceph-rbd).

### Custom Storage Classes

You can create custom storage classes for your storage systems if they are not directly supported by Super Kubenetes. The following example shows you how to create a storage class for NFS on the Super Kubenetes console.

#### NFS Introduction

NFS (Net File System) is widely used on Kubernetes with the external-provisioner volume plugin
[nfs-client](https://github.com/kubernetes-retired/external-storage/tree/master/nfs-client). You can create the storage class of nfs-client by clicking **Custom**.

<div className="notices note">
  <p>Note</p>
  <div>
    NFS is incompatible with some applications, for example, Prometheus, which may result in pod creation failures. If you need to use NFS in the production environment, ensure that you have understood the risks. For more information, contact <a href="mailto:support@Super Kubenetes.cloud">support@Super Kubenetes.cloud</a>.
  </div>
</div>


#### Prerequisites

- An available NFS server.
- The volume plugin nfs-client has already been installed. Community developers provide [charts for nfs-client](https://github.com/Super Kubenetes/helm-charts/tree/master/src/main/nfs-client-provisioner) that you can use to install nfs-client by helm.

#### Common Settings

  <table>
  <thead>
  <tr>
    <th style="text-align:left">
      Parameter
    </th>
    <th style="text-align:left">
      Description
    </th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td style="text-align:left">
      Volume Expansion
    </td>
    <td style="text-align:left">
      Specified by <code>allowVolumeExpansion</code> in the manifest. Select <code>No</code>.
    </td>
  </tr>
  <tr>
    <td style="text-align:left">
      Reclaim Policy
    </td>
    <td style="text-align:left">
      Specified by <code>reclaimPolicy</code> in the manifest. The value is <code>Delete</code> by default.
    </td>
  </tr>
  <tr>
    <td style="text-align:left">
      Storage System
    </td>
    <td style="text-align:left">
      Specified by <code>provisioner</code> in the manifest. If you install the storage class by <a href="https://github.com/Super Kubenetes/helm-charts/tree/master/src/main/nfs-client-provisioner" target="_blank" rel="noopener noreferrer">charts for nfs-client</a>, it can be <code>cluster.local/nfs-client-nfs-client-provisioner</code>.
    </td>
  </tr>
  <tr>
    <td style="text-align:left">
      Access Mode
    </td>
    <td style="text-align:left">
      Specified by <code>.metadata.annotations.storageclass.Super Kubenetes.io/supported-access-modes</code> in the manifest. <code>ReadWriteOnce</code>, <code>ReadOnlyMany</code> and <code>ReadWriteMany</code> are all selected by default.
    </td>
  </tr>
  <tr>
    <td style="text-align:left">
      Volume Binding Mode
    </td>
    <td style="text-align:left">
      Specified by <code>volumeBindingMode</code> in the manifest. It determines what binding mode is used. <b>Delayed binding</b> means that a volume, after it is created, is bound to a volume instance when a Pod using this volume is created. <b>Immediate binding</b> means that a volume, after it is created, is immediately bound to a volume instance.
    </td>
  </tr>
  </tbody>
  </table>

#### Parameters

  <table>
  <thead>
  <tr>
    <th style="text-align:left">
      Key
    </th>
    <th style="text-align:left">
      Description
    </th>
    <th style="text-align:left">
      Value
    </th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td style="text-align:left">
      archiveOnDelete
    </td>
    <td style="text-align:left">
      Archive PVCs during deletion
    </td>
    <td style="text-align:left">
      <code>true</code>
    </td>
  </tr>
  </tbody>
  </table>

## Manage Storage Classes

After you create a storage class, click the name of the storage class to go to its details page. On the details page, click **Edit YAML** to edit the manifest file of the storage class, or click **More** to select an operation from the drop-down menu:

- **Set as Default Storage Class**: Set the storage class as the default storage class in the cluster. Only one default storage class is allowed in a Super Kubenetes cluster.
- **Set Authorization Rule**: Set authorization rules so that the storage class can be accessed only in specific projects and workspaces.
- **Set Volume Operations**: Manage volume features, including: **Volume Cloning**, **Volume Snapshot Creation**, and **Volume Expansion**. Before enabling any features, you should contact your system administrator to confirm that the features are supported by the storage system.
- **Set Auto Expansion**: Set the system to automatically expand volumes when the remaining volume space is lower than a threshold. You can also enable **Restart workload automatically**.
- **Delete**: Delete the storage class.

On the **Persistent Volume Claims** tab, you can view the PVCs associated to the storage class.
---
title: "Deploy Super Kubenetes on Huawei CCE"
keywords: "Super Kubenetes, Kubernetes, installation, huawei, cce"
description: "Learn how to deploy Super Kubenetes on Huawei Cloud Container Engine."
weight: 4250
---

This guide walks you through the steps of deploying Super Kubenetes on [Huaiwei CCE](https://support.huaweicloud.com/en-us/qs-cce/cce_qs_0001.html).

## Preparation for Huawei CCE

### Create Kubernetes cluster

First, create a Kubernetes cluster based on the requirements below.

- To install Super Kubenetes 3.3.0 on Kubernetes, your Kubernetes version must be v1.19.x, v1.20.x, v1.21.x, v1.22.x, and v1.23.x (experimental support).
- Ensure the cloud computing network for your Kubernetes cluster works, or use an elastic IP when you use **Auto Create** or **Select Existing**. You can also configure the network after the cluster is created. Refer to [NAT Gateway](https://support.huaweicloud.com/en-us/productdesc-natgateway/en-us_topic_0086739762.html).
- Select `s3.xlarge.2` `4-core｜8GB` for nodes and add more if necessary (3 and more nodes are required for a production environment).

### Create a public key for kubectl

- Go to **Resource Management** > **Cluster Management** > **Basic Information** > **Network**, and bind `Public apiserver`.
- Select **kubectl** on the right column, go to **Download kubectl configuration file**, and click **Click here to download**, then you will get a public key for kubectl.

  ![Generate Kubectl config file](/dist/assets/docs/v3.3/huawei-cce/en/generate-kubeconfig.png)

After you get the configuration file for kubectl, use kubectl command line to verify the connection to the cluster.

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
          <p>
            $ kubectl version
            Client Version: version.Info<span style="color:#f92672">{</span>Major:<span style="color:#e6db74">"1"</span>, Minor:<span style="color:#e6db74">"18"</span>, GitVersion:<span style="color:#e6db74">"v1.18.8"</span>, GitCommit:<span style="color:#e6db74">"9f2892aab98fe339f3bd70e3c470144299398ace"</span>, GitTreeState:<span style="color:#e6db74">"clean"</span>, BuildDate:<span style="color:#e6db74">"2020-08-15T10:08:56Z"</span>, GoVersion:<span style="color:#e6db74">"go1.14.7"</span>, Compiler:"gc", Platform:<span style="color:#e6db74">"darwin/amd64"</span><span style="color:#f92672">}</span> 
            Server Version: version.Info<span style="color:#f92672">{</span>Major:<span style="color:#e6db74">"1"</span>, Minor:<span style="color:#e6db74">"17+"</span>, GitVersion:<span style="color:#e6db74">"v1.17.9-r0-CCE20.7.1.B003-17.36.3"</span>, GitCommit:<span style="color:#e6db74">"136c81cf3bd314fcbc5154e07cbeece860777e93"</span>, GitTreeState:<span style="color:#e6db74">"clean"</span>, BuildDate:<span style="color:#e6db74">"2020-08-08T06:01:28Z"</span>, GoVersion:<span style="color:#e6db74">"go1.13.9"</span>, Compiler:"gc", Platform:<span style="color:#e6db74">"linux/amd64"</span><span style="color:#f92672">}</span></p>
        </code>
      </div>
  </pre>
</article>

## Deploy Super Kubenetes

### Create a custom StorageClass

<div className="notices note">
  <p>Note</p>
  <div>
    Huawei CCE built-in Everest CSI provides StorageClass `csi-disk` which uses SATA (normal I/O) by default, but the actual disk that is used for Kubernetes clusters is either SAS (high I/O) or SSD (extremely high I/O). Therefore, it is suggested that you create an extra StorageClass and set it as **default**. Refer to the official document - [Use kubectl to create a cloud storage](https://support.huaweicloud.com/en-us/usermanual-cce/cce_01_0044.html).
  </div>
</div>

Below is an example to create a SAS (high I/O) for its corresponding StorageClass.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
              <p>
                <span style="color:#75715e"><span>#</span> csi-disk-sas.yaml</span> 
                <span></span>
                <span>-</span> <span>-</span> <span>-</span> 
                <span style="color:#f92672">apiVersion</span>: <span style="color:#ae81ff">storage.k8s.io/v1</span> 
                <span style="color:#f92672">kind</span>: <span style="color:#ae81ff">StorageClass</span> 
                <span style="color:#f92672">metadata</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;annotations</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;storageclass.kubernetes.io/is-default-class</span>: <span style="color:#e6db74">"true"</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;storageclass.Super Kubenetes.io/support-snapshot</span>: <span style="color:#e6db74">"false"</span> 
                <span style="color:#f92672">&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">csi-disk-sas</span> 
                <span style="color:#f92672">parameters</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;csi.storage.k8s.io/csi-driver-name</span>: <span style="color:#ae81ff">disk.csi.everest.io</span> 
                <span style="color:#f92672">&nbsp;&nbsp;csi.storage.k8s.io/fstype</span>: <span style="color:#ae81ff">ext4</span> 
                <span style="color:#75715e">&nbsp;&nbsp;# Bind Huawei “high I/O storage. If use “extremely high I/O, change it to SSD.</span> 
                <span style="color:#f92672">&nbsp;&nbsp;everest.io/disk-volume-type</span>: <span style="color:#ae81ff">SAS</span> 
                <span style="color:#f92672">&nbsp;&nbsp;everest.io/passthrough</span>: <span style="color:#e6db74">"true"</span> 
                <span style="color:#f92672">provisioner</span>: <span style="color:#ae81ff">everest-csi-provisioner</span> 
                <span style="color:#f92672">allowVolumeExpansion</span>: <span style="color:#66d9ef">true</span> 
                <span style="color:#f92672">reclaimPolicy</span>: <span style="color:#ae81ff">Delete</span> 
                <span style="color:#f92672">volumeBindingMode</span>: <span style="color:#ae81ff">Immediate</span></p>
          </code>
        </div></pre></article>
For how to set up or cancel a default StorageClass, refer to Kubernetes official document - [Change Default StorageClass](https://kubernetes.io/docs/tasks/administer-cluster/change-default-storage-class/).

### Use ks-installer to minimize the deployment

Use [ks-installer](https://github.com/Super Kubenetes/ks-installer) to deploy Super Kubenetes on an existing Kubernetes cluster. Execute the following commands directly for a minimal installation:

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
          <p>
            kubectl apply -f <a style="color:#ffffff; cursor:text;">https://github.com/Super Kubenetes/ks-installer/releases/download/v3.3.0/Super Kubenetes-installer.yaml</a>

            kubectl apply -f <a style="color:#ffffff; cursor:text;">https://github.com/Super Kubenetes/ks-installer/releases/download/v3.3.0/cluster-configuration.yaml</a></p>
        </code>
      </div>
  </pre>
</article>

Go to **Workload** > **Pod**, and check the running status of the pod in `Super Kubenetes-system` of its namespace to understand the minimal deployment of Super Kubenetes. Check `ks-console-xxxx`  of the namespace to understand the availability of Super Kubenetes console.

  ![Deploy Super Kubenetes in Minimal](/dist/assets/docs/v3.3/huawei-cce/en/deploy-ks-minimal.png)

### Expose Super Kubenetes Console

Check the running status of Pods in `Super Kubenetes-system` namespace and make sure the basic components of  Super Kubenetes are running. Then expose Super Kubenetes console.

Go to **Resource Management** > **Network** and choose the service in `ks-console`. It is suggested that you choose `LoadBalancer` (Public IP is required). The configuration is shown below.

  ![Expose Super Kubenetes Console](/dist/assets/docs/v3.3/huawei-cce/en/expose-ks-console.png)

Default settings are OK for other detailed configurations. You can also set them based on your needs.

  ![Edit Super Kubenetes Console SVC](/dist/assets/docs/v3.3/huawei-cce/en/edit-ks-console-svc.png)

After you set LoadBalancer for Super Kubenetes console, you can visit it via the given address. Go to Super Kubenetes login page and use the default account (username `admin` and password `P@88w0rd`) to log in.

## Enable Pluggable Components (Optional)

The example above demonstrates the process of a default minimal installation. To enable other components in Super Kubenetes, see [Enable Pluggable Components](../../../pluggable-components/) for more details.

<div className="notices warning">
  <p>Warning</p>
  <div>
    Before you use Istio-based features of Super Kubenetes, you have to delete `applications.app.k8s.io` built in Huawei CCE due to the CRD conflict. You can run the command `kubectl delete crd applications.app.k8s.io` directly to delete it.
  </div>
</div>

After your component is installed, go to the **Cluster Management** page, and you will see the interface below. You can check the status of your component in **System Components**.

---
title: "Install QingCloud CSI"
keywords: 'Super Kubenetes, Kubernetes, QingCloud CSI, installation, configurations, storage'
description: 'Use KubeKey to create a cluster with QingCloud CSI providing storage services.'
linkTitle: "Install QingCloud CSI"
weight: 3320
---

If you plan to install Super Kubenetes on [QingCloud](https://www.qingcloud.com/), [QingCloud CSI](https://github.com/yunify/qingcloud-csi) can be chosen as the underlying storage plugin. 

This tutorial demonstrates how to use KubeKey to set up a Super Kubenetes cluster and configure QingCloud CSI to provide storage services.

## Prerequisites

Your cluster nodes are created on [QingCloud Platform](https://intl.qingcloud.com/).

## Step 1: Create Access Keys on QingCloud Platform

To make sure the platform can create cloud disks for your cluster, you need to provide the access key (`qy_access_key_id` and `qy_secret_access_key`) in a separate configuration file of QingCloud CSI.

1. Log in to the web console of [QingCloud](https://console.qingcloud.com/login) and select **Access Key** from the drop-down list in the top-right corner.

   ![access-key](/dist/assets/docs/v3.3/installing-on-linux/introduction/persistent-storage-configuration/access-key.jpg)

2. Click **Create** to generate keys. Download the key after it is created, which is stored in a csv file.

## Step 2: Create a Configuration File for QingCloud CSI

The separate configuration file contains all parameters of QingCloud CSI which will be used by KubeKey during installation.

1. Go to one of the nodes (taskbox) where you want to download KubeKey later and run the following command to create a configuration file.

   <article className="highlight">
      <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>vi csi-qingcloud.yaml</code>
         </div>
      </pre>
   </article>

   An example configuration file:

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
              <p>
                <span style="color:#f92672">config</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;qy_access_key_id</span>: <span style="color:#e6db74">"MBKTPXWCIRIEDQYQKXYL"</span><span style="color:#75715e">&nbsp;&nbsp;<span>#</span> Replace it with your own key id.</span> 
                <span style="color:#f92672">&nbsp;&nbsp;qy_secret_access_key</span>: <span style="color:#e6db74">"cqEnHYZhdVCVif9qCUge3LNUXG1Cb9VzKY2RnBdX"</span><span style="color:#75715e">&nbsp;&nbsp;<span>#</span> Replace it with your own access key.</span> 
                <span style="color:#f92672">&nbsp;&nbsp;zone</span>: <span style="color:#e6db74">"pek3a"</span><span style="color:#75715e">&nbsp;&nbsp;<span>#</span> Lowercase letters only.</span> 
                <span style="color:#f92672">sc</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;isDefaultClass</span>: <span style="color:#66d9ef">true</span> <span style="color:#75715e">&nbsp;<span>#</span> Set it as the default storage class.</span></p>
          </code>
        </div>
    </pre>
  </article>

2. The field `zone` specifies where your cloud disks are created. On QingCloud Platform, you must select a zone before you create them.

   ![storage-zone](/dist/assets/docs/v3.3/installing-on-linux/introduction/persistent-storage-configuration/storage-zone.jpg)

   Make sure the value you specify for `zone` matches the region ID below:

   | Zone                                        | Region ID               |
   | ------------------------------------------- | ----------------------- |
   | Shanghai1-A/Shanghai1-B                     | sh1a/sh1b               |
   | Beijing3-A/Beijing3-B/Beijing3-C/Beijing3-D | pek3a/pek3b/pek3c/pek3d |
   | Guangdong2-A/Guangdong2-B                   | gd2a/gd2b               |
   | Asia-Pacific 2-A                            | ap2a                    |

   If you want to configure more values, see [chart configuration for QingCloud CSI](https://github.com/Super Kubenetes/helm-charts/tree/master/src/test/csi-qingcloud#configuration).
   
3. Save the file.

## Step 3: Download KubeKey

Follow the steps below to download [KubeKey](../../../installing-on-linux/introduction/kubekey/) on the taskbox.

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
      <article className="notices note">
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

## Step 4: Create a Cluster

1. Specify a Kubernetes version and a Super Kubenetes version that you want to install. For example:

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

2. A default file `config-sample.yaml` will be created if you do not customize the name. Edit the file.

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
                ...
                <span style="color:#f92672">metadata</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">sample</span> 
                <span style="color:#f92672">spec</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;hosts</span>: 
                &nbsp;&nbsp;- {<span style="color:#f92672">name: master, address: 192.168.0.2, internalAddress: 192.168.0.2, user: root, password</span>: <span style="color:#ae81ff">Testing123}</span> 
                &nbsp;&nbsp;- {<span style="color:#f92672">name: node1, address: 192.168.0.3, internalAddress: 192.168.0.3, user: root, password</span>: <span style="color:#ae81ff">Testing123}</span> 
                &nbsp;&nbsp;- {<span style="color:#f92672">name: node2, address: 192.168.0.4, internalAddress: 192.168.0.4, user: root, password</span>: <span style="color:#ae81ff">Testing123}</span> 
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
                <span style="color:#f92672">&nbsp;&nbsp;kubernetes</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;version</span>: <span style="color:#ae81ff">v1.22.10</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;imageRepo</span>: <span style="color:#ae81ff">Super Kubenetes</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;clusterName</span>: <span style="color:#ae81ff">cluster.local</span> 
                <span style="color:#f92672">&nbsp;&nbsp;network</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;plugin</span>: <span style="color:#ae81ff">calico</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;kubePodsCIDR</span>: <span style="color:#ae81ff">10.233.64.0</span><span style="color:#ae81ff">/18</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;kubeServiceCIDR</span>: <span style="color:#ae81ff">10.233.0.0</span><span style="color:#ae81ff">/18</span> 
                <span style="color:#f92672">&nbsp;&nbsp;registry</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;registryMirrors</span>: [] 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;insecureRegistries</span>: [] 
                <span style="color:#f92672">&nbsp;&nbsp;addons</span>: 
                &nbsp;&nbsp;- <span style="color:#f92672">name</span>: <span style="color:#ae81ff">csi-qingcloud</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;namespace</span>: <span style="color:#ae81ff">kube-system</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;sources</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;chart</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">csi-qingcloud</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;repo</span>: <span style="color:#ae81ff"><span></span>https://charts.Super Kubenetes.io/test<span>
                </span></span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;valuesFile</span>: <span style="color:#ae81ff">/root/csi-qingcloud.yaml</span> 
                ...</p>
          </code>
        </div>
    </pre>
  </article>

3. Pay special attention to the field of `addons`, under which you must provide the information of QingCloud CSI. For more information about each parameter in this file, see [Multi-node Installation](../../../installing-on-linux/introduction/multioverview/#2-edit-the-configuration-file).

  <div className="notices note">
    <p>Note</p>
    <div>
      KubeKey will install QingCloud CSI by Helm charts together with its StorageClass.
    </div>
  </div>

4. Save the file and execute the following command to install Kubernetes and Super Kubenetes:

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>./kk create cluster -f config-sample.yaml</code>
        </div>
    </pre>
  </article>

5. When the installation finishes, you can inspect installation logs with the following command:

  <article className="highlight">
    <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>kubectl logs -n Super Kubenetes-system <span style="color:#66d9ef">$(</span>kubectl get pod -n Super Kubenetes-system -l <span style="color:#e6db74">'app in (ks-install, ks-installer)'</span> -o jsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">'{.items[0].metadata.name}'</span><span style="color:#66d9ef">)</span> -f</code>
      </div>
      </pre>
   </article>

   Expected output:

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
              <span style="color:#ffffff">&nbsp;&nbsp;&nbsp;&nbsp;monitoring status of service components in</span> 
              <span style="color:#ffffff">&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#e6db74">"Cluster Management"</span>. If any service is not</span> 
              <span style="color:#ffffff">&nbsp;&nbsp;&nbsp;&nbsp; ready, please wait patiently <span style="color:#66d9ef">until</span> all components </span> 
              <span style="color:#ffffff">&nbsp;&nbsp;&nbsp;&nbsp;are up and running.</span> 
              <span style="color:#ffffff">&nbsp;&nbsp;2. Please change the default password after login.</span> 
              <span></span> 
              <span style="color:#75715e">###########################################################</span> <span style="color:#ae81ff"> 
              <span></span><a style="color:#ffffff; cursor:text;">https://ai.kuberix.co.kr</a><span></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;20xx-xx-xx xx:xx:xx</span> 
              <span style="color:#75715e">###########################################################</span> <span style="color:#ae81ff">
            </p>
          </code>
        </div>
    </pre>
  </article>

## Step 5: Verify Installation

You can verify that QingCloud CSI has been successfully installed either from the command line or from the Super Kubenetes web console.

### Command line

1. Run the following command to check your storage class.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>kubectl get sc</code>
        </div>
    </pre>
  </article>

   Expected output:

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
            <p>
              NAME                      PROVISIONER              RECLAIMPOLICY   VOLUMEBINDINGMODE      ALLOWVOLUMEEXPANSION   AGE
              csi-qingcloud (default)   disk.csi.qingcloud.com   Delete          WaitForFirstConsumer   true                   28m</p>
          </code>
        </div>
    </pre>
  </article>

2. Run the following command to check the statuses of Pods.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>kubectl get pod -n kube-system</code>
        </div>
    </pre>
  </article>

   Note that `csi-qingcloud` is installed in the namespace `kube-system`. Expected output (exclude other irrelevant Pods):

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
            <p>
                csi-qingcloud-controller-f95dcddfb-2gfck   5/5     Running   <span style="color:#ae81ff">0</span>          28m
                csi-qingcloud-node-7dzz8                   2/2     Running   <span style="color:#ae81ff">0</span>          28m
                csi-qingcloud-node-k4hsj                   2/2     Running   <span style="color:#ae81ff">0</span>          28m
                csi-qingcloud-node-sptdb                   2/2     Running   <span style="color:#ae81ff">0</span>          28m</p></code>
        </div>
    </pre>
  </article>

### Super Kubenetes console

1. Log in to the web console with the default account and password (`admin/P@88w0rd`) at `<NodeIP>:30880`. Click **Platform** in the upper-left corner and select **Cluster Management**.

2. Go to **Pods** in **Application Workloads** and select `kube-system` from the project drop-down list. You can see that the Pods of `csi-qingcloud` are up and running.

3. Go to **Storage Classes** under **Storage**, and you can see available storage classes in your cluster.
   
<div className="notices note">
  <p>Note</p>
  <div>
    For more information about how to create volumes on the Super Kubenetes console, see [Volumes](../../../project-user-guide/storage/volumes/).
  </div>
</div>

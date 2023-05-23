---
title: "Install NFS Client"
keywords: 'Super Kubenetes, Kubernetes, storage, installation, configurations, NFS'
description: 'Use KubeKey to create a cluster with NFS Client providing storage services.'
linkTitle: "Install NFS Client"
weight: 3330
---

This tutorial demonstrates how to set up a Super Kubenetes cluster and configure NFS storage.

  <div className="notices note">
    <p>Note</p>
    <div>
      - Ubuntu 16.04 is used as an example in this tutorial.
      - It is not recommended that you use NFS storage for production (especially on Kubernetes version 1.20 or later) as some issues may occur, such as `failed to obtain lock` and `input/output error`, resulting in Pod `CrashLoopBackOff`. Besides, some apps may not be compatible with NFS, including [Prometheus](https://github.com/prometheus/prometheus/blob/03b354d4d9386e4b3bfbcd45da4bb58b182051a5/docs/storage.md#operational-aspects).</div></div>

## Prerequisites

You must have an NFS server ready providing external storage services. Make sure you have created and exported a directory on the NFS server which your permitted client machines can access. For more information, see [Set up an NFS Server](../../../reference/storage-system-installation/nfs-server/).

## Step 1: Configure the Client Machine

Install `nfs-common` on all of the clients. It provides necessary NFS functions while you do not need to install any server components.

1. Execute the following command to make sure you are using the latest package.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>sudo apt-get update</code>
        </div>
    </pre>
  </article>

2. Install `nfs-common` on all the clients.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>sudo apt-get install nfs-common</code>
        </div>
    </pre>
  </article>

3. Go to one of the client machines (taskbox) where you want to download KubeKey later. Create a configuration file that contains all the necessary parameters of your NFS server which will be referenced by KubeKey during installation.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>vi nfs-client.yaml</code>
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
                <span style="color:#f92672">nfs</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;server</span>: <span style="color:#e6db74">"192.168.0.2"</span><span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> This is the server IP address. Replace it with your own.</span> 
                <span style="color:#f92672">&nbsp;&nbsp;path</span>: <span style="color:#e6db74">"/mnt/demo"</span><span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> Replace the exported directory with your own.</span> 
                <span style="color:#f92672">storageClass</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;defaultClass</span>: <span style="color:#66d9ef">false</span>
              </p>
          </code>
        </div>
    </pre>
  </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      - If you want to configure more values, see [chart configurations for NFS-client](https://github.com/Super Kubenetes/helm-charts/tree/master/src/main/nfs-client-provisioner#configuration).
      - The `storageClass.defaultClass` field controls whether you want to set the storage class of NFS-client Provisioner as the default one. If you enter `false` for it, KubeKey will install [OpenEBS](https://github.com/openebs/openebs) to provide local volumes, while they are not provisioned dynamically as you create workloads on your cluster. After you install Super Kubenetes, you can change the default storage class on the console directly.
    </div>
  </div>

4. Save the file.

## Step 2: Download KubeKey

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

## Step 3: Create a Cluster

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


4. A default file `config-sample.yaml` will be created if you do not customize the name. Edit the file.

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
									&nbsp;&nbsp;- {<span style="color:#f92672">name: client1, address: 192.168.0.3, internalAddress: 192.168.0.3, user: ubuntu, password</span>: <span style="color:#ae81ff">Testing123}</span> 
									&nbsp;&nbsp;- {<span style="color:#f92672">name: client2, address: 192.168.0.4, internalAddress: 192.168.0.4, user: ubuntu, password</span>: <span style="color:#ae81ff">Testing123}</span> 
									&nbsp;&nbsp;- {<span style="color:#f92672">name: client3, address: 192.168.0.5, internalAddress: 192.168.0.5, user: ubuntu, password</span>: <span style="color:#ae81ff">Testing123}</span> 
									<span style="color:#f92672">&nbsp;&nbsp;roleGroups</span>: 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;etcd</span>: 
									&nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#ae81ff">client1</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;control-plane</span>: 
									&nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#ae81ff">client1</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;worker</span>: 
									&nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#ae81ff">client2</span> 
									&nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#ae81ff">client3</span> 
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
									&nbsp;&nbsp;- <span style="color:#f92672">name</span>: <span style="color:#ae81ff">nfs-client</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;namespace</span>: <span style="color:#ae81ff">kube-system</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;sources</span>: 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;chart</span>: 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">nfs-client-provisioner</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;repo</span>: <span style="color:#ae81ff"><span></span>https://charts.Super Kubenetes.io/main<span></span></span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;valuesFile</span>: <span style="color:#ae81ff">/home/ubuntu/nfs-client.yaml</span> <span style="color:#75715e">&nbsp;<span>#</span> Use the path of your own NFS-client configuration file.</span> 
									...             
               </p>
            </code>
         </div>
      </pre>
   </article>

5. Pay special attention to the field of `addons`, under which you must provide the information of NFS-client. For more information about each parameter in this file, see [Multi-node Installation](../../../installing-on-linux/introduction/multioverview/#2-edit-the-configuration-file).

6. Save the file and execute the following command to install Kubernetes and Super Kubenetes:

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>./kk create cluster -f config-sample.yaml</code>
        </div>
    </pre>
  </article>

7. When the installation finishes, you can inspect installation logs with the following command:

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
              <span style="color:#ffffff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;monitoring status of service components in</span> 
              <span style="color:#ffffff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#e6db74">"Cluster Management"</span>. If any service is not</span> 
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

## Step 4: Verify Installation

You can verify that NFS-client has been successfully installed either from the command line or from the Super Kubenetes web console.

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
              NAME              PROVISIONER                                       RECLAIMPOLICY   VOLUMEBINDINGMODE      ALLOWVOLUMEEXPANSION   AGE
              local <span style="color:#f92672">(</span>default<span style="color:#f92672">)</span>   openebs.io/local                                  Delete          WaitForFirstConsumer   false                  16m
              nfs-client        cluster.local/nfs-client-nfs-client-provisioner   Delete          Immediate              true                   16m              
            </p>
          </code>
        </div>
    </pre>
  </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      If you set `nfs-client` as the default storage class, OpenEBS will not be installed by KubeKey.
    </div>
  </div>

2. Run the following command to check the statuses of Pods.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>kubectl get pod -n kube-system</code>
        </div>
    </pre>
  </article>

   Note that `nfs-client` is installed in the namespace `kube-system`. Expected output (exclude irrelevant Pods):

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
            <p>
              NAME                                                 READY   STATUS    RESTARTS   AGE
              nfs-client-nfs-client-provisioner-6fc95f4f79-92lsh   1/1     Running   <span style="color:#ae81ff">0</span>          16m        
            </p>
          </code>
        </div>
    </pre>
  </article>

### Super Kubenetes console

1. Log in to the web console as `admin` with the default account and password at `<NodeIP>:30880`. Click **Platform** in the upper-left corner and select **Cluster Management**.

2. Go to **Pods** in **Application Workloads** and select `kube-system` from the project drop-down list. You can see that the Pod of `nfs-client` is up and running.

3. Go to **Storage Classes** under **Storage**, and you can see available storage classes in your cluster.
   
<div className="notices note">
  <p>Note</p>
  <div>
    For more information about how to create volumes on the Super Kubenetes console, see [Volumes](../../../project-user-guide/storage/volumes/).
  </div>
</div>

---
title: "Install GlusterFS"
keywords: 'Super Kubenetes, Kubernetes, GlusterFS, installation, configurations, storage'
description: 'Use KubeKey to create a cluster with GlusterFS providing storage services.'
linkTitle: "Install GlusterFS"
weight: 3340
---

[GlusterFS](https://kubernetes.io/docs/concepts/storage/storage-classes/#glusterfs) is an in-tree storage plugin in Kubernetes. Hence, you only need to install the storage class.

This tutorial demonstrates how to use KubeKey to set up a Super Kubenetes cluster and configure GlusterFS to provide storage services.

<div className="notices note">
  <p>Note</p>
  <div>
    Ubuntu 16.04 is used as an example in this tutorial.
  </div>
</div>

## Prerequisites

You have set up your GlusterFS cluster and configured Heketi. For more information, see [Set up a GlusterFS Server](../../../reference/storage-system-installation/glusterfs-server/).

## Step 1: Configure the Client Machine

You need to install the GlusterFS client package on all your client machines.

1. Install `software-properties-common`.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>kubectl get sc</code>
        </div>
    </pre>
  </article>

2. Add the community GlusterFS PPA.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>add-apt-repository ppa:gluster/glusterfs-7</code>
        </div>
    </pre>
  </article>

3. Make sure you are using the latest package.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>apt-get update</code>
        </div>
    </pre>
  </article>

4. Install the GlusterFS client.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>apt-get install glusterfs-server -y</code>
        </div>
    </pre>
  </article>

5. Verify your GlusterFS version.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>glusterfs -V</code>
        </div>
    </pre>
  </article>

## Step 2: Create a Configuration File for GlusterFS

The separate configuration file contains all parameters of GlusterFS storage which will be used by KubeKey during installation.

1. Go to one of the nodes (taskbox) where you want to download KubeKey later and run the following command to create a configuration file.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>vi glusterfs-sc.yaml</code>
        </div>
    </pre>
  </article>

   An example configuration file (include a Heketi Secret):

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
              <p>
                <span style="color:#f92672">apiVersion</span>: <span style="color:#ae81ff">v1</span> 
                <span style="color:#f92672">kind</span>: <span style="color:#ae81ff">Secret</span> 
                <span style="color:#f92672">metadata</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">heketi-secret</span> 
                <span style="color:#f92672">&nbsp;&nbsp;namespace</span>: <span style="color:#ae81ff">kube-system</span> 
                <span style="color:#f92672">type</span>: <span style="color:#ae81ff">kubernetes.io/glusterfs</span> 
                <span style="color:#f92672">data</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;key</span>: <span style="color:#e6db74">"MTIzNDU2"</span>
                <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> Replace it with your own key. Base64 coding.</span> 
                <span>-</span><span>-</span><span>-</span> 
                <span style="color:#f92672">apiVersion</span>: <span style="color:#ae81ff">storage.k8s.io/v1</span> 
                <span style="color:#f92672">kind</span>: <span style="color:#ae81ff">StorageClass</span> 
                <span style="color:#f92672">metadata</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;annotations</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;storageclass.beta.kubernetes.io/is-default-class</span>: <span style="color:#e6db74">"true"</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;storageclass.Super Kubenetes.io/supported-access-modes</span>: <span style="color:#e6db74">'["ReadWriteOnce","ReadOnlyMany","ReadWriteMany"]'</span> 
                <span style="color:#f92672">&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">glusterfs</span> 
                <span style="color:#f92672">parameters</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;clusterid</span>: <span style="color:#e6db74">"21240a91145aee4d801661689383dcd1"</span>
                <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> Replace it with your own GlusterFS cluster ID.</span> 
                <span style="color:#f92672">&nbsp;&nbsp;gidMax</span>: <span style="color:#e6db74">"50000"</span> 
                <span style="color:#f92672">&nbsp;&nbsp;gidMin</span>: <span style="color:#e6db74">"40000"</span> 
                <span style="color:#f92672">&nbsp;&nbsp;restauthenabled</span>: <span style="color:#e6db74">"true"</span> 
                <span style="color:#f92672">&nbsp;&nbsp;resturl</span>: <span style="color:#e6db74"><span></span>"http://192.168.0.2:8080"<span></span></span><span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> The Gluster REST service/Heketi service url which provision gluster volumes on demand. Replace it with your own.</span> 
                <span style="color:#f92672">&nbsp;&nbsp;restuser</span>: <span style="color:#ae81ff">admin</span> 
                <span style="color:#f92672">&nbsp;&nbsp;secretName</span>: <span style="color:#ae81ff">heketi-secret</span> 
                <span style="color:#f92672">&nbsp;&nbsp;secretNamespace</span>: <span style="color:#ae81ff">kube-system</span> 
                <span style="color:#f92672">&nbsp;&nbsp;volumetype</span>: <span style="color:#e6db74">"replicate:3"</span>
                <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> Replace it with your own volume type.</span> 
                <span style="color:#f92672">provisioner</span>: <span style="color:#ae81ff">kubernetes.io/glusterfs</span> 
                <span style="color:#f92672">reclaimPolicy</span>: <span style="color:#ae81ff">Delete</span> 
                <span style="color:#f92672">volumeBindingMode</span>: <span style="color:#ae81ff">Immediate</span> 
                <span style="color:#f92672">allowVolumeExpansion</span>: <span style="color:#66d9ef">true</span> 
              </p>
          </code>
        </div>
    </pre>
  </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      - Use the field `storageclass.beta.kubernetes.io/is-default-class` to set `glusterfs` as your default storage class. If it is `false`, KubeKey will install OpenEBS as the default storage class.
      - For more information about parameters in the storage class manifest, see [the Kubernetes documentation](https://kubernetes.io/docs/concepts/storage/storage-classes/#glusterfs).
    </div>
  </div>


2. Save the file.

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
									&nbsp;&nbsp;- {<span style="color:#f92672">name: client1, address: 192.168.0.5, internalAddress: 192.168.0.5, user: ubuntu, password</span>: <span style="color:#ae81ff">Testing123}</span> 
									&nbsp;&nbsp;- {<span style="color:#f92672">name: client2, address: 192.168.0.6, internalAddress: 192.168.0.6, user: ubuntu, password</span>: <span style="color:#ae81ff">Testing123}</span> 
									&nbsp;&nbsp;- {<span style="color:#f92672">name: client3, address: 192.168.0.7, internalAddress: 192.168.0.7, user: ubuntu, password</span>: <span style="color:#ae81ff">Testing123}</span> 
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
									&nbsp;&nbsp;- <span style="color:#f92672">name</span>: <span style="color:#ae81ff">glusterfs</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;namespace</span>: <span style="color:#ae81ff">kube-system</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;sources</span>: 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;yaml</span>: 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;path</span>: 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#ae81ff">/root/glusterfs-sc.yaml</span> 
									...
               </p>
            </code>
         </div>
      </pre>
   </article>
   
3. Pay special attention to the field of `addons`, under which you must provide the information of the storage class to be created as well as the Heketi Secret. For more information about each parameter in this file, see [Multi-node Installation](../../../installing-on-linux/introduction/multioverview/#2-edit-the-configuration-file).

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

## Step 5: Verify Installation

You can verify that GlusterFS has been successfully installed either from the command line or from the Super Kubenetes web console.

### Command line

Run the following command to check your storage class.

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
            NAME                  PROVISIONER               RECLAIMPOLICY   VOLUMEBINDINGMODE   ALLOWVOLUMEEXPANSION   AGE
            glusterfs <span style="color:#f92672">(</span>default<span style="color:#f92672">)</span>   kubernetes.io/glusterfs   Delete          Immediate           true                   104m          
          </p>
        </code>
      </div>
  </pre>
</article>

### Super Kubenetes console

1. Log in to the web console with the default account and password (`admin/P@88w0rd`) at `<NodeIP>:30880`. Click **Platform** in the upper-left corner and select **Cluster Management**.

3. Go to **Volumes** under **Storage**, and you can see PVCs in use.
   
  <div className="notices note">
    <p>Note</p>
    <div>
      For more information about how to create volumes on the Super Kubenetes console, see [Volumes](../../../project-user-guide/storage/volumes/).
    </div>
  </div>
   
4. On the **Storage Classes** page, you can see the storage class available in your cluster.
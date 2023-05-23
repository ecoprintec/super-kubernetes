---
title: "Install Ceph"
keywords: 'Super Kubenetes, Kubernetes, Ceph, installation, configurations, storage'
description: 'Use KubeKey to create a cluster with Ceph providing storage services.'
linkTitle: "Install Ceph"
weight: 3350
---

With a Ceph server, you can choose [Ceph RBD](https://kubernetes.io/docs/concepts/storage/storage-classes/#ceph-rbd) or [Ceph CSI](https://github.com/ceph/ceph-csi) as the underlying storage plugin. Ceph RBD is an in-tree storage plugin on Kubernetes, and Ceph CSI is a Container Storage Interface (CSI) driver for RBD, CephFS. 

###  Which plugin to select for Ceph 

Ceph CSI RBD is the preferred choice if you work with **14.0.0 (Nautilus)+** Ceph cluster. Here are some reasons:

- The in-tree plugin will be deprecated in the future.
- Ceph RBD only works on Kubernetes with **hyperkube** images, and **hyperkube** images were 
  [deprecated since Kubernetes 1.17](https://github.com/kubernetes/kubernetes/pull/85094).
- Ceph CSI has more features such as cloning, expanding and snapshots.

### Ceph CSI RBD

Ceph-CSI needs to be installed on v1.14.0+ Kubernetes, and work with 14.0.0 (Nautilus)+ Ceph Cluster. 
For details about compatibility, see [Ceph CSI Support Matrix](https://github.com/ceph/ceph-csi#support-matrix). 

The following is an example of KubeKey add-on configurations for Ceph CSI RBD installed by **Helm Charts**.
As the StorageClass is not included in the chart, a StorageClass needs to be configured in the add-on config. 

####  Chart configurations

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
              <p>
                <span style="color:#f92672">csiConfig</span>: 
                &nbsp;&nbsp;- <span style="color:#f92672">clusterID</span>: <span style="color:#e6db74">"cluster1"</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;monitors</span>: 
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#e6db74">"192.168.0.8:6789"</span><span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> &lt;--TobeReplaced--&gt;</span> 
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#e6db74">"192.168.0.9:6789"</span><span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> &lt;--TobeReplaced--&gt;</span> 
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#e6db74">"192.168.0.10:6789"</span><span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> &lt;--TobeReplaced--&gt;</span></p>
          </code>
        </div></pre></article>
If you want to configure more values, see [chart configuration for ceph-csi-rbd](https://github.com/ceph/ceph-csi/tree/master/charts/ceph-csi-rbd).

#### StorageClass (including secret)

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
              <p>
                <span style="color:#f92672">apiVersion</span>: <span style="color:#ae81ff">v1</span> 
                <span style="color:#f92672">kind</span>: <span style="color:#ae81ff">Secret</span> 
                <span style="color:#f92672">metadata</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">csi-rbd-secret</span> 
                <span style="color:#f92672">&nbsp;&nbsp;namespace</span>: <span style="color:#ae81ff">kube-system</span> 
                <span style="color:#f92672">stringData</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;userID</span>: <span style="color:#ae81ff">admin</span> 
                <span style="color:#f92672">&nbsp;&nbsp;userKey</span>: <span style="color:#e6db74">"AQDoECFfYD3DGBAAm6CPhFS8TQ0Hn0aslTlovw=="</span><span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> &lt;--ToBeReplaced--&gt;</span> 
                <span>-</span><span>-</span><span>-</span> 
                <span style="color:#f92672">apiVersion</span>: <span style="color:#ae81ff">storage.k8s.io/v1</span> 
                <span style="color:#f92672">kind</span>: <span style="color:#ae81ff">StorageClass</span> 
                <span style="color:#f92672">metadata</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">csi-rbd-sc</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;annotations</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;storageclass.beta.kubernetes.io/is-default-class</span>: <span style="color:#e6db74">"true"</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;storageclass.Super Kubenetes.io/supported-access-modes</span>: <span style="color:#e6db74">'["ReadWriteOnce","ReadOnlyMany","ReadWriteMany"]'</span> 
                <span style="color:#f92672">provisioner</span>: <span style="color:#ae81ff">rbd.csi.ceph.com</span> 
                <span style="color:#f92672">parameters</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;clusterID</span>: <span style="color:#e6db74">"cluster1"</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;pool</span>: <span style="color:#e6db74">"rbd"</span><span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> &lt;--ToBeReplaced--&gt;</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;imageFeatures</span>: <span style="color:#ae81ff">layering</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;csi.storage.k8s.io/provisioner-secret-name</span>: <span style="color:#ae81ff">csi-rbd-secret</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;csi.storage.k8s.io/provisioner-secret-namespace</span>: <span style="color:#ae81ff">kube-system</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;csi.storage.k8s.io/controller-expand-secret-name</span>: <span style="color:#ae81ff">csi-rbd-secret</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;csi.storage.k8s.io/controller-expand-secret-namespace</span>: <span style="color:#ae81ff">kube-system</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;csi.storage.k8s.io/node-stage-secret-name</span>: <span style="color:#ae81ff">csi-rbd-secret</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;csi.storage.k8s.io/node-stage-secret-namespace</span>: <span style="color:#ae81ff">kube-system</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;csi.storage.k8s.io/fstype</span>: <span style="color:#ae81ff">ext4</span> 
                <span style="color:#f92672">reclaimPolicy</span>: <span style="color:#ae81ff">Delete</span> 
                <span style="color:#f92672">allowVolumeExpansion</span>: <span style="color:#66d9ef">true</span> 
                <span style="color:#f92672">mountOptions</span>: 
                &nbsp;&nbsp;&nbsp;- <span style="color:#ae81ff">discard</span></p>
          </code>
        </div></pre></article>

#### Add-on configurations

Save the above chart config and StorageClass locally (for example, `/root/ceph-csi-rbd.yaml` and `/root/ceph-csi-rbd-sc.yaml`). The add-on configuration can be set like:

   <article className="highlight">
      <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
									<span style="color:#f92672">&nbsp;addons</span>: 
									&nbsp;- <span style="color:#f92672">name</span>: <span style="color:#ae81ff">ceph-csi-rbd</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;namespace</span>: <span style="color:#ae81ff">kube-system</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;sources</span>: 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;chart</span>: 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">ceph-csi-rbd</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;repo</span>: <span style="color:#ae81ff"><span></span>https://ceph.github.io/csi-charts<span></span></span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;valuesFile</span>: <span style="color:#ae81ff">/root/ceph-csi-rbd.yaml</span> 
									&nbsp;- <span style="color:#f92672">name</span>: <span style="color:#ae81ff">ceph-csi-rbd-sc</span> 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;sources</span>: 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;yaml</span>: 
									<span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;path</span>: 
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#ae81ff">/root/ceph-csi-rbd-sc.yaml</span></p>
            </code>
         </div></pre></article>

### Ceph RBD

KubeKey will never use **hyperkube** images. Hence, in-tree Ceph RBD may not work on Kubernetes installed by KubeKey. However, if your Ceph cluster is lower than 14.0.0 which means Ceph CSI can't be used, [rbd provisioner](https://github.com/kubernetes-incubator/external-storage/tree/master/ceph/rbd) can be used as a substitute for Ceph RBD. Its format is the same with [in-tree Ceph RBD](https://kubernetes.io/docs/concepts/storage/storage-classes/#ceph-rbd). 
The following is an example of KubeKey add-on configurations for rbd provisioner installed by **Helm Charts including a StorageClass**.

#### Chart configurations

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
              <p>
                <span style="color:#f92672">ceph</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;mon</span>: <span style="color:#e6db74">"192.168.0.12:6789"</span><span style="color:#75715e">&nbsp;&nbsp;&nbsp;<span>#</span> &lt;--ToBeReplaced--&gt;</span> 
                <span style="color:#f92672">&nbsp;&nbsp;adminKey</span>: <span style="color:#e6db74">"QVFBS1JkdGRvV0lySUJBQW5LaVpSKzBRY2tjWmd6UzRJdndmQ2c9PQ=="</span>   <span style="color:#75715e">&nbsp;&nbsp;&nbsp;<span>#</span> &lt;--ToBeReplaced--&gt;</span> 
                <span style="color:#f92672">&nbsp;&nbsp;userKey</span>: <span style="color:#e6db74">"QVFBS1JkdGRvV0lySUJBQW5LaVpSKzBRY2tjWmd6UzRJdndmQ2c9PQ=="</span>
                <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> &lt;--ToBeReplaced--&gt;</span> 
                <span style="color:#f92672">sc</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;isDefault</span>: <span style="color:#66d9ef">false</span></p>
          </code>
        </div></pre></article>

If you want to configure more values, see [chart configuration for rbd-provisioner](https://github.com/Super Kubenetes/helm-charts/tree/master/src/test/rbd-provisioner#configuration).

#### Add-on configurations

Save the above chart config locally (for example, `/root/rbd-provisioner.yaml`). The add-on config for rbd provisioner could be like: 

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
              <p>
                <span>-</span> <span style="color:#f92672">&nbsp;name</span>: <span style="color:#ae81ff">rbd-provisioner</span> 
                <span style="color:#f92672">&nbsp;&nbsp;namespace</span>: <span style="color:#ae81ff">kube-system</span> 
                <span style="color:#f92672">&nbsp;&nbsp;sources</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;chart</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">rbd-provisioner</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;repo</span>: <span style="color:#ae81ff"><span></span>https://charts.Super Kubenetes.io/test<span></span></span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;valuesFile</span>: <span style="color:#ae81ff">/root/rbd-provisioner.yaml</span></p>
          </code>
        </div></pre></article>
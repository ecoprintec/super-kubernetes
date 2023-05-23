---
title: "Ceph 설치"
keywords: 'Super Kubenetes, Kubernetes, Ceph, installation, configurations, storage'
description: 'Use KubeKey to create a cluster with Ceph providing storage services.'
linkTitle: "Install Ceph"
weight: 3350
---

Ceph 서버의 경우, 기본 스토리지 플러그인으로  [Ceph RBD](https://kubernetes.io/docs/concepts/storage/storage-classes/#ceph-rbd) 또는 [Ceph CSI](https://github.com/ceph/ceph-csi)를 선택할 수 있습니다. Ceph RBD는 in-tree 스토리지 플러그인 입니다. Ceph CSI는 CephFS의 RBD용 CSI 드라이버입니다.

###  plugin 선택  

**14.0.0 (Nautilus)+** Ceph 클러스터를 사용하는 경우 Ceph CSI RBD를 사용하는 것이 좋습니다. 그 이유는 다음과 같습니다:

- in-tree 플러그인은 더이상 사용되지 않을 예정입니다.
- Ceph RBD는 **hyperkube** 이미지를 가진 쿠버네티스에서만 작동 합니다. **hyperkube** 이미지는 Kubernetes 1.17부터 사용되지 않습니다.
- Ceph CSI는 복제, 확장, 스냅샷과 같은 많은 기능을 가지고 있습니다.

### Ceph CSI RBD

Ceph-CSI는 v1.14.0+ Kubernetes에 설치되어야 하며 14.0.0(Nautilus)+ Ceph Cluster와 함께 작동해야 합니다.
호환성에 대한 자세한 내용은 [Ceph CSI 지원 Matrix](https://github.com/ceph/ceph-csi#support-matrix)를 참고하세요. 

다음은 **Helm Charts**로 설치된 Ceph CSI RBD에 대한 KubeKey add-on 설정 예제입니다.
스토리지 클래스는 차트에 포함되지 않으므로 스토리지 클래스는 add-on 설정에서 설정해주어야 합니다.

####  Chart 설정

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
더 많은 값을 설정하려면 [ceph-csi-rbd 차트 설정](https://github.com/ceph/ceph-csi/tree/master/charts/ceph-csi-rbd)을 참고하세요.

#### 스토리지클래스 (secret 포함)

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

#### Add-on 설정

위의 chart 컨피그와 StorageClass를 저장하세요. (예제, `/root/ceph-csi-rbd.yaml`와 `/root/ceph-csi-rbd-sc.yaml`). The add-on 설정은 다음과 같이 설정하세요:

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

KubeKey는 **hyperkube** 이미지를 사용하지 않습니다. 따라서 in-tree Ceph RBD는 KubeKey에 의해 설치된 Kubernetes에서 작동하지 않을 수 있습니다. Ceph 클러스터가 14.0.0보다 낮으면 Ceph CSI를 사용할 수 없습니다. 그러나 [rbd provisioner](https://github.com/kubernetes-incubator/external-storage/tree/master/ceph/rbd)를 Ceph RDB의 대체물로 사용할 수 있습니다. 이 형식은 [in-tree Ceph RBD](https://kubernetes.io/docs/concepts/storage/storage-classes/#ceph-rbd)와 동일합니다. 
다음은 **스토리지 클래스를 포함한 Helm Chart**로 설치한 rbd provisioner에 대한 KubeKey add-on 설정 예제 입니다.

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

더 많은 값을 설정하려면 [rbd-provisioner에 대한 chart 설정](https://github.com/Super Kubenetes/helm-charts/tree/master/src/test/rbd-provisioner#configuration)을 참고하세요.

#### Add-on 설정

위 차트 설정을 로컬에 저장하세요.(예를 들어, `/root/rbd-provisioner.yaml`). rbd-provisioner에 대한 add-on 설정은 다음과 같을 수 있습니다: 
  
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
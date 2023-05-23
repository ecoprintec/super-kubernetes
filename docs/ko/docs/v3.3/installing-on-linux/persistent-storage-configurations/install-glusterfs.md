---
title: GlusterFS 설치
keywords: 'Super Kubenetes, Kubernetes, GlusterFS, installation, configurations, storage'
description: 'Use KubeKey to create a cluster with GlusterFS providing storage services.'
linkTitle: 'Install GlusterFS'
weight: 3340
---

[GlusterFS](https://kubernetes.io/docs/concepts/storage/storage-classes/#glusterfs)는 in-tree 스토리지 플러그인입니다. 그래서 스토리지 클래스만 설치하면 됩니다.

이 튜토리얼에서는 KubeKey를 사용하여 Super Kubenetes 클러스터를 설정하고 스토리지 서비스를 사용하기 위한 GlusterFS 설정하는 방법을 보여줍니다.

<div className="notices note">
  <p>Note</p>
  <div>
    이 튜토리얼에서는 Ubuntu 16.04를 사용하였습니다.  
  </div>
</div>

## 전제 조건

GlusterFS 클러스터와 Heketi설정을 해야합니다. 더 많은 정보를 원하시면 [GlusterFS 서버 설정](../../../reference/storage-system-installation/glusterfs-server/)을 참고하세요.

## 단계 1: 클라이언트 머신 설정

클라이언트 머신에 GlusterFS client 패키지를 설치하여야 합니다.

1. `software-properties-common` 설치.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>kubectl get sc</code>
        </div>
    </pre>
  </article>

2. GlusterFS PPA 커뮤니티를 추가합니다.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>add-apt-repository ppa:gluster/glusterfs-7</code>
        </div>
    </pre>
  </article>

3. 가장 최신의 패키지를 사용하는지 확인합니다.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>apt-get update</code>
        </div>
    </pre>
  </article>

4. GlusterFS client 설치.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>apt-get install glusterfs-server -y</code>
        </div>
    </pre>
  </article>

5. GlusterFS 확인.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>glusterfs -V</code>
        </div>
    </pre>
  </article>

## 단계 2: GlusterFS에 대한 설정 파일 만들기

별도의 설정 파일에는 설치하는 동안 KubeKey가 사용할 GlasterFS의 모든 파라미터를 포함합니다.

1. KubeKey를 다운로드 할 노드로 이동해서 다음 명령어를 실행합니다.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>vi glusterfs-sc.yaml</code>
        </div>
    </pre>
  </article>

설정 파일 예제 (Heketi Secret 포함):

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
      - `glusterfs`를 기본 스토리지 클래스로 지정하려면 `storageclass.beta.kubernetes.io/is-default-class` 필드를 사용하세요. 
      - 스토리지 클래스 메니페스트에 대한 더 많은 정보는 [쿠버네티스 공식 문서](https://kubernetes.io/docs/concepts/storage/storage-classes/#glusterfs)에서 확인하세요.
    </div>
  </div>

2. 파일 저장.

## 단계 3: KubeKey 다운로드

다음 단계에 따라 [KubeKey](../..../..//installing-on-linux/introduction/kubekey/)를 다운로드하세요.

<main className="code-tabs">
  <ul className="nav nav-tabs">
    <li className="nav-item"><a className="nav-link" href="#">양호한 네트워크에서 GitHub/Googleapis 연결</a></li>
    <li className="nav-item active"><a className="nav-link" href="#">좋지않은 네트워크에서 GitHub/Googleapis 연결</a></li>
  </ul>
  <div className="tab-content">
    <main className="tab-pane active" title="Good network connections to GitHub/Googleapis">
      <p>KubeKey <a href="https://github.com/Super Kubenetes/kubekey/releases">GitHub Release 페이지</a>에서 다운로드 또는 다음 명령어를 실행하십시오:</p>
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
      <p>KubeKey을 다운로드 하기 전에 다음 명령을 실행하십시오.</p>
      <article className="highlight">
        <pre>
          <div className="copy-code-button" title="Copy Code"></div>
          <div className="code-over-div">
            <code>export KKZONE<span style="color:#f92672">=</span>cn</code>
          </div>
        </pre>
      </article>
      <p>KubeKey을 다운로드 하기 위해서 다음 명령어를 실행합니다:</p>
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
          KubeKey을 다운로드한 후 Googleapis에 대한 네트워크 연결이 좋지 않은 새로운 시스템으로 전송하는 경우 아래 단계를 진행하기 전에<code>export KKZONE=cn</code>내보내기를 다시 실행해야 합니다.
        </div>
      </article>
    </main>
  </div>
</main>

<div className="notices note">
  <p>Note</p>
  <div>
    위의 명령어는 KubeKey 최신 릴리스(v2.2.2)를 다운로드합니다. 특정 버전을 다운로드 하기 위해서 명령어에서 버전 명을 변경할 수 있습니다. 
  </div>
</div>

`kk` 실행파일 만들기:

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>chmod +x kk</code>
      </div>
  </pre>
</article>

## 단계 4: Cluster 만들기

1. 설치할 Kubernetes 버전과 Super Kubenetes 버전을 지정하세요.  
   예제:

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
      - Super Kubenetes v3.3.0에 권장되는 Kubernetes 버전: v1.19.x, v1.20.x, v1.22.x 및 v1.23.x KubeKey는 버전을 지정하지 않으면 기본적으로 Kubernetes v1.23.7을 설치합니다. 지원되는 Kubernetes 버전에 대한 자세한 내용은 지원 매트릭스(../../../installing-on-linux/introduction/kubekey/#support-matrix)를 참조하십시오.

      - 위 커맨드에서 `--with-Super Kubenetes` 플래그를 추가하지 않으면 설정 파일의 `addons` 필드를 사용하여 설치하거나 나중에 `./kk create cluster`를 사용할 때 해당 플래그를 추가하여야 Super Kubenetes가 배포됩니다.

      - Super Kubenetes 버전을 지정하지 않고 `--with-Super Kubenetes` 플래그를 추가하면, 가장 최신 버전의 Super Kubenetes가 설치됩니다.
    </div>

  </div>

2. 디폴트 파일 `config-sample.yaml`이 생성되며 환경에 맞게 수정하세요.

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
   
3. `addons` 필드를 주의 해주세요. 해당 필드에는 스토리지 클래스의 정보와 Heketi Secret 또한 포함되어야 합니다. 각 파라미터에 대한 자세한 내용은 [멀티 노드 설치](../../../installing-on-linux/introduction/multioverview/#2-edit-the-configuration-file)를 참고하세요.

4. 파일을 저장하고 다음 명령을 실행하여 Kubernetes 및 Super Kubenetes를 설치하세요:

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>./kk create cluster -f config-sample.yaml</code>
        </div>
    </pre>
  </article>

5. 설치가 완료되면 다음 커맨드를 사용하여 설치 로그를 확인할 수 있습니다:

   <article className="highlight">
      <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>kubectl logs -n Super Kubenetes-system <span style="color:#66d9ef">$(</span>kubectl get pod -n Super Kubenetes-system -l <span style="color:#e6db74">'app in (ks-install, ks-installer)'</span> -o jsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">'{.items[0].metadata.name}'</span><span style="color:#66d9ef">)</span> -f</code>
         </div>
      </pre>
   </article>

   예상 결과:

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

## 단계 5: 설치 확인

커맨드 라인 또는 Super Kubenetes 웹 콘솔에서 GlusterFS가 성공적으로 설치되었는지 확인할 수 있습니다.

### 커맨드 라인

다음 명령을 실행하여 스토리지 클래스를 확인합니다.

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>kubectl get sc</code>
      </div>
  </pre>
</article>

예상 결과:

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

### Super Kubenetes 콘솔

1. 웹 콘솔 `<NodeIP>:30880`에 접속하여 디폴트 계정과 암호를 사용하여 로그인 합니다. Click 왼쪽 상단 모서리에 있는 **플랫폼**을 클릭하고 **클러스터 관리**를 선택합니다.

2. **스토리지** 아래에 **볼륨**으로 이동하면 사용 가능한 PVC를 볼 수 있습니다.

  <div className="notices note">
    <p>Note</p>
    <div>
      Super Kubenetes 콘솔에서 볼륨을 생성하는 방법에 대한 자세한 내용은 [볼륨](../../../project-user-guide/storage/volumes/)을 참고하세요.
    </div>
  </div>
   
4. **스토리지 클래스** 페이지에서 클러스터에서 사용 가능한 스토리지 클래스를 확인할 수 있습니다.

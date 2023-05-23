---
title: "NFS Client 설치"
keywords: 'Super Kubenetes, Kubernetes, storage, installation, configurations, NFS'
description: 'Use KubeKey to create a cluster with NFS Client providing storage services.'
linkTitle: "Install NFS Client"
weight: 3330
---

이 튜토리얼에서는 Super Kubenetes 클러스터를 설정하고 NFS 스토리지를 구성하는 방법을 보여 줍니다.

  <div className="notices note">
    <p>Note</p>
    <div>
      - 이 튜토리얼에서는 Ubuntu 16.04를 사용했습니다. 
      - 프로덕션(특히 Kubernetes 버전 1.20 이상)에는 NFS 스토리지를 사용하지 않는 것이 좋습니다. 예를 들어 '잠금 실패' 및 '입력/출력 오류'가 발생하여 포드가 'CrashLoopBackOff'가 되는 것과 같은 몇 가지 문제가 발생할 수 있기 때문입니다. 게다가 [Prometheus](https://github.com/prometheus/prometheus/blob/03b354d4d9386e4b3bfbcd45da4bb58b182051a5/docs/storage.md#operational-aspects)와 같은 몇몇 앱들은 NFS와 호환되지 않을 수 있습니다. </div></div>

## 전제 조건

외부 스토리지 서비스를 제공하는 NFS 서버가 준비되어 있어야 합니다. 허가된 클라이언트 시스템이 액세스할 수 있는 NFS 서버를 생성하고 디렉토리를 내보냈는지 확인합니다. 더 많은 정보는 [NFS Server 설정](../../../reference/storage-system-installation/nfs-server/)을 참고하세요.

## 단계 1: Client Machine 설정

모든 클라이언트에 `nfs-common`을 설치합니다. 

1. 다음 명령을 실행하여 최신 패키지를 사용하고 있는지 확인합니다.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>sudo apt-get update</code>
        </div>
    </pre>
  </article>

2. 모든 클라이언트에 `nfs-common` 설치.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>sudo apt-get install nfs-common</code>
        </div>
    </pre>
  </article>

3. KubeKey를 다운로드할 클라이언트 머신(taskbox) 중 하나로 이동합니다. 설치 중에 KubeKey가 참조하는 NFS 서버의 모든 필수 매개 변수를 포함하는 구성 파일을 만듭니다.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>vi nfs-client.yaml</code>
        </div>
    </pre>
  </article>

   설정파일 예제:

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
      - 더 많은 설정 값을 사용하려면 [NFS-client 차트 설정](https://github.com/Super Kubenetes/helm-charts/tree/master/src/main/nfs-client-provisioner#configuration)을 참고하세요.
      - `storageClass.defaultClass` 필드는 NFS-client 프로비저너의 스토리지 클래스를 지정하는 것을 제어합니다. 값이 `false`면 KubeKey는 로컬 볼륨에 [OpenEBS](https://github.com/openebs/openebs)룰 설치 합니다. 이 경우 클러스터에서 워크로드를 생성할 때 동적으로 프로비저닝되지 않습니다. Super Kubenetes를 설치한 후 콘솔에서 직접 기본 저장소 클래스를 변경할 수 있습니다.
    </div>
  </div>

4. 파일 저장.

## Step 2: KubeKey 다운로드

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

## 단계 3: Cluster 만들기

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


4. 디폴트 파일 `config-sample.yaml`이 생성되며 환경에 맞게 수정하세요.

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

5. NFS-client 정보를 제공해야 하는 `addon` 필드에 각별히 주의하세요. 이 파일의 각 매개 변수에 대한 자세한 내용은 [멀티 노드 설치](../..//on-linux/installing-on-linux/introduction/multioverview/#2-edit-the-configuration-file)를 참고하세요.

6. 파일을 저장하고 다음 명령을 실행하여 Kubernetes 및 Super Kubenetes를 설치하세요:

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>./kk create cluster -f config-sample.yaml</code>
        </div>
    </pre>
  </article>

7. 설치가 완료되면 다음 커맨드를 사용하여 설치 로그를 확인할 수 있습니다:

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

## 단계 4: 설치 확인

커맨드 라인 또는 Super Kubenetes 웹 콘솔에서 NFS-client가 성공적으로 설치되었는지 확인할 수 있습니다.

### 커맨드 라인

1. 다음 명령을 실행하여 스토리지 클래스를 확인합니다.

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
      `nfs-client`를 기본 스토리지 클래스로 설정하면 OpenEBS는 설치되지 않습니다.
    </div>
  </div>

2. 다음 커맨드를 실행하여 파드 상태를 확인합니다.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>kubectl get pod -n kube-system</code>
        </div>
    </pre>
  </article>

   `nfs-client`는 `kube-system`(네임스페이스)에 설치 됩니다. 예상 결과(관련 없는 파드 제외):

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

### Super Kubenetes 콘솔

1. 웹 콘솔 `<NodeIP>:30880`에 접속하여 디폴트 계정과 암호를 사용하여 로그인 합니다. Click 왼쪽 상단 모서리에 있는 **플랫폼**을 클릭하고 **클러스터 관리**를 선택합니다. 

2. **어플리케이션 워크로드**의 **파드**로 이동하여 프로젝트 드롭다운 목록에서 `kube-system`을 선택합니다. `nfs-client`의 파드가 작동 중인 것을 확인할 수 있습니다.

3. **스토리지** 아래의 **스토리지 클래스**로 이동하면 클러스터에서 사용 가능한 스토리지 클래스를 볼 수 있습니다.
   
<div className="notices note">
  <p>Note</p>
  <div>
    Super Kubenetes 콘솔에서 볼륨을 생성하는 방법에 대한 자세한 내용은 [볼륨](../../../project-user-guide/storage/volumes/)을 참고하세요.
  </div>
</div>

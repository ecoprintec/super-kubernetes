---
title: KubeKey의 내부 HAProxy를 사용하여 HA Cluster 설정
keywords: 'Kuberix, Kubernetes, KubeKey, HA, Installation'
description: 'Learn how to create a highly available cluster using the internal HAProxy of KubeKey.'
linkTitle: 'Set Up an HA Cluster Using the Internal HAProxy of KubeKey'
weight: 3210
---

[KubeKey](../../../installing-on-linux/introduction/kubekey)는 쿠버네티스 클러스터를 생성하기 위한 사용하기 쉬운 도구입니다. v1.2.1부터 KubeKey는 고가용성 쿠버네티스 클러스터 생성을 단순화하기 위해 내장된 고가용성 모드를 제공합니다. KubeKey가 구현하는 고가용성 모드를 로컬 로드 밸런싱 모드라고 합니다. KubeKey는 각 작업자 노드에 로드 밸런서(HAProxy)를 배포하고 모든 제어 평면의 쿠버네티스 구성 요소는 로컬 kube-apiserver에 연결됩니다. 반면에 각 작업자 노드의 쿠버네티스 구성 요소는 역방향 프록시, 즉 KubeKey에서 배포한 로드 밸런서를 통해 여러 제어 평면의 kube-apiserver에 연결합니다. 이 모드는 추가 상태 확인 메커니즘이 도입되어 전용 로드 밸런서보다 효율성이 떨어지지만 현재 환경에서 외부 로드 밸런서 또는 가상 IP(VIP)를 제공할 수 없는 경우 보다 실용적이고 효율적이며 편리한 고가용성 배포 모드를 제공합니다.

이 문서는 Linux에 Super Kubenetes를 설치할 때 내장된 고가용성 모드를 사용하는 방법을 설명합니다.

## 건축물

다음 그림은 기본 제공 고가용성 모드의 아키텍처 예를 보여줍니다. 시스템 및 네트워크 요구 사항에 대한 자세한 내용은 [멀티 노드 설치](../../../installing-on-linux/introduction/multioverview/#step-1-prepare-linux-hosts)를 참조하십시오.

![HA architecture](/dist/assets/docs/v3.3/zh-cn/installing-on-linux/introduction/internal-ha-configuration/internalLoadBalancer.png)

<div className="notices note">
  <p>Note</p>
  <div>
    개발 환경에서 6개의 Linux 머신을 준비했는지 확인하십시오. 그 중 3개는 제어 평면 역할을 하고 나머지 3개는 작업자 노드 역할을 합니다.
  </div>
</div>

## KubeKey 다운로드

KubeKey를 다운로드하려면 다음 단계를 참조하십시오.

<main className="code-tabs">
  <ul className="nav nav-tabs">
    <li className="nav-item"><a className="nav-link" href="#">GitHub/Googleapis에 네트워크 연결이 양호함</a></li>
    <li className="nav-item active"><a className="nav-link" href="#">GitHub/Googleapis에 네트워크 연결이 불안정함</a></li>
  </ul>
  <div className="tab-content">
    <main className="tab-pane active" title="Good network connections to GitHub/Googleapis">
      <p><a href="https://github.com/Super Kubenetes/kubekey/releases">GitHub 릴리즈 페이지</a>에서 KebeKey를 다운로드 하거나 다음 명령을 실행합니다.</p>
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
      <p>다음 명령을 먼저 실행하여 올바른 영역에서 KubeKey를 다운로드했는지 확인하십시오.</p>
      <article className="highlight">
        <pre>
          <div className="copy-code-button" title="Copy Code"></div>
          <div className="code-over-div">
            <code>export KKZONE<span style="color:#f92672">=</span>cn</code>
          </div>
        </pre>
      </article>
      <p>다음 명령을 실행하여 KubeKey를 다운로드하십시오.</p>
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
          Kubekey를 다운로드한 후 Googleapis에 대한 네트워크 연결이 좋지 않은 새 컴퓨터로 전송하는 경우 다음 단계를 진행하기 전에 <code>export KKZONE=cn</code>을 다시 실행해야 합니다.
        </div>
      </article>
    </main>
  </div>
</main>

<div className="notices note">
  <p>Note</p>
  <div>
    위의 명령은 KubeKey의 최신 릴리즈(v2.2.2)를 다운로드합니다. 명령에서 버전 번호를 변경하여 특정 버전을 다운로드할 수 있습니다.
  </div>
</div>

kp 파일을 실행 가능하게 만듭니다:

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>chmod +x kk</code>
      </div>
  </pre>
</article>

기본 구성으로 예제 구성 파일을 만듭니다. 여기에서 쿠버네티스 v1.22.10이 예로 사용됩니다.

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>./kk create config --with-Super Kubenetes v3.3.0 --with-kubernetes v1.22.10</code>
      </div>
  </pre>
</article>

<div className="notices note">
  <p>Note</p>
  <div>
    - Super Kubenetes 3.3.0의 권장 쿠버네티스 버전: v1.19.x, v1.20.x, v1.21.x, v1.22.x 및 v1.23.x(실험 지원). 쿠버네티스 버전을 지정하지 않으면 KubeKey는 기본적으로 쿠버네티스 v1.23.7을 설치합니다. 지원되는 쿠버네티스 버전에 대한 자세한 내용은 [지원 매트릭스](../../../installing-on-linux/introduction/kubekey/#support-matrix)를 참조하십시오.
    - 이 단계에서 명령에 `--with-Super Kubenetes` 플래그를 추가하지 않으면 구성 파일의 `addons` 필드를 사용하여 설치하거나 `를 사용할 때 이 플래그를 다시 추가하지 않는 한 Super Kubenetes가 배포되지 않습니다. ./kp는 나중에 클러스터를 생성합니다.
    - Super Kubenetes 버전을 지정하지 않고 `--with-Super Kubenetes` 플래그를 추가하면 최신 버전의 Super Kubenetes가 설치됩니다.
  </div>
</div>

## Super Kubenetes 및 쿠버네티스 배포

위 명령어를 실행하면 'config-sample.yaml' 구성 파일이 생성됩니다. 파일을 편집하여 시스템 정보를 추가하고 로드 밸런서를 구성하는 등의 작업을 수행합니다.

<div className="notices note">
  <p>Note</p>
  <div>
    사용자 정의하면 파일 이름이 다를 수 있습니다.
  </div>
</div>

### config-sample.yaml 예제

<article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
              <p>
                <span style="color:#f92672">spec</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;hosts</span>: 
                &nbsp;&nbsp;- {<span style="color:#f92672">name: master1, address: 192.168.0.2, internalAddress: 192.168.0.2, user: ubuntu, password</span>: <span style="color:#ae81ff">Testing123}</span> 
                &nbsp;&nbsp;- {<span style="color:#f92672">name: master2, address: 192.168.0.3, internalAddress: 192.168.0.3, user: ubuntu, password</span>: <span style="color:#ae81ff">Testing123}</span> 
                &nbsp;&nbsp;- {<span style="color:#f92672">name: master3, address: 192.168.0.4, internalAddress: 192.168.0.4, user: ubuntu, password</span>: <span style="color:#ae81ff">Testing123}</span> 
                &nbsp;&nbsp;- {<span style="color:#f92672">name: node1, address: 192.168.0.5, internalAddress: 192.168.0.5, user: ubuntu, password</span>: <span style="color:#ae81ff">Testing123}</span> 
                &nbsp;&nbsp;- {<span style="color:#f92672">name: node2, address: 192.168.0.6, internalAddress: 192.168.0.6, user: ubuntu, password</span>: <span style="color:#ae81ff">Testing123}</span> 
                &nbsp;&nbsp;- {<span style="color:#f92672">name: node3, address: 192.168.0.7, internalAddress: 192.168.0.7, user: ubuntu, password</span>: <span style="color:#ae81ff">Testing123}</span> 
                <span style="color:#f92672">&nbsp;&nbsp;roleGroups</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;etcd</span>: 
                &nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#ae81ff">master1</span> 
                &nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#ae81ff">master2</span> 
                &nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#ae81ff">master3</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;control-plane</span>: 
                &nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#ae81ff">master1</span> 
                &nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#ae81ff">master2</span> 
                &nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#ae81ff">master3</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;worker</span>: 
                &nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#ae81ff">node1</span> 
                &nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#ae81ff">node2</span> 
                &nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#ae81ff">node3</span>
              </p></code></div></pre></article>

이 구성 파일의 다른 필드에 대한 자세한 내용은 [쿠버네티스 클러스터 구성](../../../installing-on-linux/introduction/vars/) 및 [멀티 노드 설치](../../../installing-on-linux/introduction/multioverview/#2-edit-the-configuration-file)를 참조하십시오.

### 내장된 고가용성 모드 활성화

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              <span style="color:#f92672">spec</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;controlPlaneEndpoint</span>: 
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span><span>#</span>Internal loadbalancer for apiservers</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;internalLoadbalancer</span>: <span style="color:#ae81ff">haproxy</span> 
              <span></span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;domain</span>: <span style="color:#ae81ff">lb.Super Kubenetes.local</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;address</span>: <span style="color:#e6db74">""</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;port</span>: <span style="color:#ae81ff">6443</span>
            </p>
        </code>
      </div>
  </pre>
</article>

<div className="notices note">
  <p>Note</p>
  <div>
    - 내장된 고가용성 모드를 활성화하려면 'internalLoadbalancer' 필드의 주석 처리를 제거합니다.
    - `config-sample.yaml`의 `address` 및 `port` 필드는 `controlPlaneEndpoint`에 대해 두 개의 공백으로 들여쓰기되어야 합니다.
    - 로드 밸런서의 기본 내부 액세스 도메인 이름은 `lb.kuberix.local`입니다.
  </div>
</div>

### 영구 저장소 플러그인 구성

프로덕션 환경의 경우 영구 저장소를 준비하고 `config-sample.yaml`에서 저장소 플러그인(예: CSI)을 구성하여 사용할 저장소 서비스를 정의해야 합니다. 자세한 내용은 [영구 저장소 구성](../../../installing-on-linux/persistent-storage-configurations/understand-persistent-storage/)을 참조하십시오.

### (선택 사항) 연결 가능한 구성 요소 활성화

Super Kubenetes는 v2.1.0부터 일부 핵심 기능 구성요소를 분리했습니다. 이러한 구성 요소는 플러그 가능하도록 설계되었으므로 설치 전이나 후에 활성화할 수 있습니다. 기본적으로 Super Kubenetes는 활성화하지 않으면 최소 패키지로 설치됩니다.

요구 사항에 따라 이들 중 하나를 활성화할 수 있습니다. Super Kubenetes에서 제공하는 전체 스택 기능을 발견하려면 이러한 플러그형 구성 요소를 설치하는 것이 좋습니다. 컴퓨터를 활성화하기 전에 컴퓨터에 충분한 CPU와 메모리가 있는지 확인하십시오. 자세한 내용은 [플러그 가능 구성 요소 활성화](../../../pluggable-components/overview)를 참조하십시오.

### 설치 시작

구성을 완료한 후 다음 명령을 실행하여 설치를 시작합니다.:

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>./kk create cluster -f config-sample.yaml</code>
      </div>
  </pre>
</article>

### 설치 확인

1. 다음 명령어를 실행하여 설치 로그를 확인합니다.

    <article className="highlight">
     <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
           <code>kubectl logs -n Super Kubenetes-system <span style="color:#66d9ef">$(</span>kubectl get pod -n Super Kubenetes-system -l <span style="color:#e6db74">'app in (ks-install, ks-installer)'</span> -o jsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">'{.items[0].metadata.name}'</span><span style="color:#66d9ef">)</span> -f</code>
         </div>
     </pre>
   </article>

2. 다음 메시지가 표시되면 HA 클러스터가 성공적으로 생성되었음을 의미합니다.

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
               <span style="color:#ffffff">Console: <a style="color:#ffffff; cursor:text;">http://192.168.0.3:30880</a></span> 
               <span style="color:#ffffff">Account: admin</span> 
               <span style="color:#ffffff">Password: P@88w0rd</span> 
               <span></span> 
               <span style="color:#ffffff">NOTES：</span> 
               <span style="color:#ffffff">&nbsp;&nbsp;1. After you log into the console, please check the</span> 
               <span style="color:#ffffff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;monitoring status of service components in</span> 
               <span style="color:#ffffff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the<span style="color:#e6db74">&nbsp;"Cluster Management"</span>. If any service is not</span> 
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

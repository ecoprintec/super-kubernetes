---
title: 'K3s와 Super Kubenetes 배포'
keywords: 'Kubernetes, Super Kubenetes, K3s'
description: 'Learn how to use KubeKey to install K3s and Super Kubenetes.'
linkTitle: 'Deploy K3s and Super Kubenetes'
weight: 3530
---

[K3s](https://k3s.io/)는 외부 의존성을 최소화한 IoT 및 edge computing을 위해 구축된 경량 쿠버네티스 배포판입니다. 단일 바이너리로 패키징되어 있어 쿠버네티스 클러스터를 설정하는 데 필요한 단계와 종속성을 줄여줍니다.

KubeKey를 사용하여 K3와 Super Kubenetes를 모두 설치할 수 있으며, 기존 K3s 클러스터에 Super Kubenetes를 배포할 수도 있습니다.

<div className="notices note">
  <p>Note</p>
  <div>
    현재 K3s의 Super Kubenetes는 일부 기능이 완전히 테스트되지 않았으며 개발 중입니다.
  </div>
</div>

## 전제조건

- K3s 설치를 위한 필수 구성 요소에 대한 자세한 내용은 [K3s 문서](https://rancher.com/docs/k3s/latest/en/installation/installation-requirements/)를 참고하십시오.
- 환경에 따라 필요한 방화벽 규칙 또는 포트 전달 규칙을 만들어야 할 수 있습니다. 자세한 내용은 [포트 요구사항](../../../installing-on-linux/introduction/port-firewall/)을 참고하십시오.

## 단계 1: KubeKey 다운로드

다음 단계를 따라서 [KubeKey](../../../installing-on-linux/introduction/kubekey/)을 다운 받으십시오.

<main className="code-tabs">
  <ul className="nav nav-tabs">
    <li className="nav-item"><a className="nav-link" href="#">양호한 네트워크에서 GitHub/Googleapis 연결</a></li>
    <li className="nav-item active"><a className="nav-link" href="#">좋지않은 네트워크에서 GitHub/Googleapis 연결</a></li>
  </ul>
  <div className="tab-content">
    <main className="tab-pane active" title="Good network connections to GitHub/Googleapis">
      <p>KubeKey <a href="https://github.com/Super Kubenetes/kubekey/releases">GitHub Release 페이지</a>에서 다운로드  또는 다음 커맨드를 실행하십시오. :</p>
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
          KubeKey을 다운로드한 후 Googleapis에 대한 네트워크 연결이 좋지 않은 새로운 시스템으로 전송하는 경우 아래 단계를 진행하기 전에 KKZONE=cn 내보내기를 다시 실행해야 합니다.
        </div>
      </article>
    </main>
  </div>
</main>

<div className="notices note">
  <p>Note</p>
  <div>
    The commands above download the latest release (v2.2.2) of KubeKey. Note that an earlier version of KubeKey cannot be used to install K3s.
    위의 명령을 통해서 KubeKey의 최신 릴리스(v2.2.2)를 다운로드 받을 수 있습니다. K3를 설치하는 데 이전 버전의 KubeKey은 사용할 수 없습니다.
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

## 단계 2: 클러스터 생성

1. 다음 명령을 실행하여 클러스터의 구성 파일을 생성합니다:

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>./kk create config --with-kubernetes v1.21.4-k3s --with-Super Kubenetes v3.3.0</code>
        </div>
    </pre>
  </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      KubeKey v2.2.2 supports the installation of K3s v1.21.4.
    </div>
  </div>

2. 이름을 지정하지 않으면 `config-sample.yaml`이라는 디폴트 파일이 생성됩니다. 이 파일을 수정합니다.

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
                &nbsp;&nbsp;- {<span style="color:#f92672">name: master, address: 192.168.0.2, internalAddress: 192.168.0.2, user: ubuntu, password</span>: <span style="color:#ae81ff">Testing123}</span> 
                &nbsp;&nbsp;- {<span style="color:#f92672">name: node1, address: 192.168.0.3, internalAddress: 192.168.0.3, user: ubuntu, password</span>: <span style="color:#ae81ff">Testing123}</span> 
                &nbsp;&nbsp;- {<span style="color:#f92672">name: node2, address: 192.168.0.4, internalAddress: 192.168.0.4, user: ubuntu, password</span>: <span style="color:#ae81ff">Testing123}</span> 
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
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;version</span>: <span style="color:#ae81ff">v1.21.4-k3s</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;imageRepo</span>: <span style="color:#ae81ff">Super Kubenetes</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;clusterName</span>: <span style="color:#ae81ff">cluster.local</span> 
                <span style="color:#f92672">&nbsp;&nbsp;network</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;plugin</span>: <span style="color:#ae81ff">calico</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;kubePodsCIDR</span>: <span style="color:#ae81ff">10.233.64.0</span><span style="color:#ae81ff">/18</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;kubeServiceCIDR</span>: <span style="color:#ae81ff">10.233.0.0</span><span style="color:#ae81ff">/18</span> 
                <span style="color:#f92672">&nbsp;&nbsp;registry</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;registryMirrors</span>: [] 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;insecureRegistries</span>: [] 
                <span style="color:#f92672">&nbsp;&nbsp;addons</span>: []
                ...
              </p>
          </code>
        </div>
    </pre>
  </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      구성 파일의 각 필드에 대한 자세한 내용은 [예제 파일](https://github.com/Super Kubenetes/kubekey/blob/release-2.2/docs/config-example.md)을 참고하세요.
    </div>
  </div>

3. 파일을 저장하고 다음 명령을 실행하여 K3 및 Super Kubenetes를 설치합니다:

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>./kk create cluster -f config-sample.yaml</code>
        </div>
    </pre>
  </article>

4. 설치가 완료되면 다음 명령을 사용하여 설치 로그를 검사할 수 있습니다:

   <article className="highlight">
      <pre>
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>kubectl logs -n Super Kubenetes-system <span style="color:#66d9ef">$(</span>kubectl get pod -n Super Kubenetes-system -l <span style="color:#e6db74">'app in (ks-install, ks-installer)'</span> -o jsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">'{.items[0].metadata.name}'</span><span style="color:#66d9ef">)</span> -f</code>
         </div>
      </pre>
   </article>

   예상되는 결과:

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
              <span style="color:#ffffff">&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#e6db74">&nbsp;"Cluster Management"</span>. If any service is not</span> 
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

5. 디폴트 계정과 비밀번호(`admin/P@88W0rd`)를 사용하여 Super Kubenetes console `<NodeIP>:30880`에 접속합니다..

  <div className="notices note">
    <p>Note</p>
    <div>
      K3s의 Super Kubenetes는 현재 테스트 단계이며 일부 기능이 호환되지 않을 수 있습니다. 하지만 설치 후 Super Kubenetes의 플러그형 구성 요소를 사용하도록 설정할 수 있습니다.
    </div>
  </div>

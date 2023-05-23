---
title: "KubeEdge"
keywords: "Kubernetes, Super Kubenetes, Kubeedge"
description: "Learn how to enable KubeEdge to add edge nodes to your cluster."
linkTitle: "KubeEdge"
weight: 6930
---

[KubeEdge](https://kubeedge.io/en/)는 네이티브 컨테이너형 애플리케이션 오케스트레이션 기능을 에지의 호스트로 확장하기 위한 오픈 소스 시스템입니다. 멀티 에지 프로토콜을 지원하며 클라우드 및 에지 애플리케이션 및 리소스의 통합 관리를 제공합니다.

KubeEdge에는 클라우드와 에지 노드라는 두 개의 별도 위치에서 실행되는 컴포넌트가 있습니다. CloudCore로 통칭되는 클라우드에서 실행되는 컴포넌트에는 컨트롤러와 클라우드 허브가 포함됩니다. Cloud Hub는 에지 노드가 보낸 요청에 대한 게이트웨이 역할을 하는 반면, 컨트롤러는 오케스트레이터로 작동합니다. EdgeCore로 통칭되는 에지 노드에서 실행되는 컴포넌트에는 EdgeHub, EdgeMesh, MetadataManager 및 DeviceTwin이 포함됩니다. 자세한 내용은 [KubeEdge 웹사이트](https://kubeedge.io/en/)를 참조하세요.

KubeEdge를 활성화한 후 [클러스터에 에지 노드를 추가](../../installing-on-linux/cluster-operation/add-edge-nodes/)하고 여기에 워크로드를 배포할 수 있습니다.

![kubeedge_arch](/dist/assets/docs/v3.3/enable-pluggable-components/kubeedge/kubeedge_arch.png)

## 설치 전에 KubeEdge 활성화

### 리눅스에 설치하기

Linux에 Super Kubenetes의 멀티 노드를 설치할 때, 모든 Super Kubenetes 컴포넌트를 열거하는 설정 파일을 생성해야 합니다.

1. [Linux에 Super Kubenetes 설치하기](../../installing-on-linux/introduction/multioverview/) 튜토리얼에서, 기본 파일인 `config-sample.yaml`을 생성합니다. 그리고 다음 명령을 실행하여 파일을 수정하세요:

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  vi config-sample.yaml
               </p>
            </code>
         </div>
      </pre>
   </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      [All-in-One Installation](../../quick-start/all-in-one-on-linux/)을 채택하면 클러스터를 직접 생성할 수 있으므로 'config-sample.snmpl' 파일을 생성할 필요가 없습니다. 일반적으로 올인원 모드는 Super Kubenetes를 처음 사용하고 시스템에 익숙해지기를 원하는 사용자를 위한 것입니다. 이 모드에서 KubeEdge를 활성화하려면(예를 들어, 테스트 목적으로) [다음 섹션](#enable-kubeedge-after-installation)을 참조하여 설치 후 KubeEdge를 활성화하는 방법을 확인하세요.
    </div>
  </div>


2. 이 파일에서 `edgeruntime` 및 `kubeedge`로 이동하고, `enabled` 값을 `false`에서 `true`로 변경하여 모든 KubeEdge 컴포넌트를 활성화합니다. **확인**을 클릭하세요.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  <span style="color:#f92672">edgeruntime</span>:<span style="color:#75715e"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#</span> Add edge nodes to your cluster and deploy workloads on edge nodes.</span>
                  <span style="color:#f92672">&nbsp;&nbsp;enabled</span>: <span style="color:#66d9ef">false</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;kubeedge</span>:<span style="color:#75715e"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#</span><span>&nbsp;kubeedge configurations</span></span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;enabled</span>: <span style="color:#66d9ef"><span>false</span></span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;cloudCore</span>:
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cloudHub</span>:
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;advertiseAddress</span>: <span style="color:#75715e"><span>#</span><span>&nbsp;At least a public IP address or an IP address which can be accessed by edge nodes must be provided.</span></span> 
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-</span> <span style="color:#e6db74">&nbsp;""</span><span style="color:#75715e"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#</span><span>&nbsp;Note that once KubeEdge is enabled, CloudCore will malfunction if the address is not provided.</span></span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;service</span>:
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cloudhubNodePort</span>: <span style="color:#e6db74">"30000"</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cloudhubQuicNodePort</span>: <span style="color:#e6db74">"30001"</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cloudhubHttpsNodePort</span>: <span style="color:#e6db74">"30002"</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cloudstreamNodePort</span>: <span style="color:#e6db74">"30003"</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;tunnelNodePort</span>: <span style="color:#e6db74">"30004"</span> 
                  <span style="color:#75715e"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#</span><span>&nbsp;resources: {}</span></span> 
                  <span style="color:#75715e"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#</span><span>&nbsp;hostNetWork: false</span></span>
               </p>
            </code>
         </div>
      </pre>
   </article>

3. `kubeedge.cloudCore.cloudHub.advertiseAddress` 값을 클러스터의 공용 IP 주소 또는 에지 노드에서 접속할 수 있는 IP 주소로 설정하세요. 편집이 끝나면 파일을 저장하세요.

4. 설정 파일을 사용하여 클러스터를 생성하세요:

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  ./kk create cluster -f config-sample.yaml
               </p>
            </code>
         </div>
      </pre>
   </article>

### 쿠버네티스에 설치

[쿠버네티스에 Super Kubenetes를 설치](../../installing-on-kubernetes/introduction/overview/)할 때 [cluster-configuration.yaml](https://github.com/kubesphere/ks-installer/releases/download/v3.3.0/cluster-configuration.yaml) 파일에서 먼저 kubeedge를 활성화할 수 있습니다.

1. [cluster-configuration.yaml](https://github.com/kubesphere/ks-installer/releases/download/v3.3.0/cluster-configuration.yaml) 파일을 다운로드하여 수정하세요.

    <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  vi cluster-configuration.yaml
               </p>
            </code>
         </div>
      </pre>
   </article>
    
2. 이 로컬 `cluster-configuration.yaml` 파일에서 `edgeruntime`과 `kubeedge`로 이동하고, `enabled`에 대해 `false`를 `true`로 변경하여 모든 KubeEdge 컴포넌트를 활성화하세요. 완료 후 파일을 저장하세요.

    <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  <span style="color:#f92672">edgeruntime</span>:<span style="color:#75715e"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#</span> Add edge nodes to your cluster and deploy workloads on edge nodes.</span>
                  <span style="color:#f92672">&nbsp;&nbsp;enabled</span>: <span style="color:#66d9ef">false</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;kubeedge</span>:<span style="color:#75715e"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#</span><span>&nbsp;kubeedge configurations</span></span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;enabled</span>: <span style="color:#66d9ef"><span>false</span></span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;cloudCore</span>:
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cloudHub</span>:
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;advertiseAddress</span>: <span style="color:#75715e"><span>#</span><span>&nbsp;At least a public IP address or an IP address which can be accessed by edge nodes must be provided.</span></span> 
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-</span> <span style="color:#e6db74">&nbsp;""</span><span style="color:#75715e"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#</span><span>&nbsp;Note that once KubeEdge is enabled, CloudCore will malfunction if the address is not provided.</span></span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;service</span>:
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cloudhubNodePort</span>: <span style="color:#e6db74">"30000"</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cloudhubQuicNodePort</span>: <span style="color:#e6db74">"30001"</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cloudhubHttpsNodePort</span>: <span style="color:#e6db74">"30002"</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cloudstreamNodePort</span>: <span style="color:#e6db74">"30003"</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;tunnelNodePort</span>: <span style="color:#e6db74">"30004"</span> 
                  <span style="color:#75715e"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#</span><span>&nbsp;resources: {}</span></span> 
                  <span style="color:#75715e"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#</span><span>&nbsp;hostNetWork: false</span></span>
               </p>
            </code>
         </div>
      </pre>
   </article>

3. `kubeedge.cloudCore.cloudHub.advertiseAddress` 값을 클러스터의 공용 IP 주소 또는 에지 노드에서 접속할 수 있는 IP 주소로 설정하세요.

4. 파일을 저장하고 다음 명령을 실행하여 설치를 시작하세요:

    <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  kubectl apply -f <a style="color:#ffffff; cursor:text;">https://github.com/kubesphere/ks-installer/releases/download/v3.3.0/kubesphere-installer.yaml</a>

                  kubectl apply -f cluster-configuration.yaml</p>
            </code>
         </div>
      </pre>
   </article>

## 설치 후 KubeEdge 활성화

1. 콘솔에 `admin`으로 로그인하세요. 좌측 상단 모서리에서 **플랫폼**을 클릭하고 **클러스터 관리**를 선택하세요.
   
2. **CRD**를 클릭하고 검색창에 `clusterconfiguration`을 입력합니다. 세부 정보 페이지를 보기 위해 결과를 클릭하세요.

  <div className="notices info">
    <p>Info</p>
    <div>
      사용자 지정 리소스 정의(CRD)를 사용하면 다른 API 서버를 추가하지 않고도 새로운 유형의 리소스를 생성할 수 있습니다. 다른 기본 쿠버네티스 오브젝트와 마찬가지로 이러한 리소스를 사용할 수 있습니다. 
    </div>
  </div>

3. **사용자 지정 리소스**에서 <img src="/dist/assets/docs/v3.3/enable-pluggable-components/kubesphere-alerting/three-dots.png" height="20px">를 클릭하세요. `ks-installer` 오른쪽에서 **YAML 편집**을 선택하세요.

4. 이 YAML 파일에서 `edgeruntime`와 `kubeedge`로 이동하여 `enabled`에 대해 `false`를 `true`로 변경하세요. 완료한 후 오른쪽 하단의 **확인**을 클릭하여 설정을 저장하세요.

    <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  <span style="color:#f92672">edgeruntime</span>:<span style="color:#75715e"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#</span> Add edge nodes to your cluster and deploy workloads on edge nodes.</span>
                  <span style="color:#f92672">&nbsp;&nbsp;enabled</span>: <span style="color:#66d9ef">false</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;kubeedge</span>:<span style="color:#75715e"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#</span><span>&nbsp;kubeedge configurations</span></span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;enabled</span>: <span style="color:#66d9ef"><span>false</span></span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;cloudCore</span>:
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cloudHub</span>:
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;advertiseAddress</span>: <span style="color:#75715e"><span>#</span><span>&nbsp;At least a public IP address or an IP address which can be accessed by edge nodes must be provided.</span></span> 
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-</span> <span style="color:#e6db74">&nbsp;""</span><span style="color:#75715e"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#</span><span>&nbsp;Note that once KubeEdge is enabled, CloudCore will malfunction if the address is not provided.</span></span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;service</span>:
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cloudhubNodePort</span>: <span style="color:#e6db74">"30000"</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cloudhubQuicNodePort</span>: <span style="color:#e6db74">"30001"</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cloudhubHttpsNodePort</span>: <span style="color:#e6db74">"30002"</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cloudstreamNodePort</span>: <span style="color:#e6db74">"30003"</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;tunnelNodePort</span>: <span style="color:#e6db74">"30004"</span> 
                  <span style="color:#75715e"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#</span><span>&nbsp;resources: {}</span></span> 
                  <span style="color:#75715e"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#</span><span>&nbsp;hostNetWork: false</span></span>
               </p>
            </code>
         </div>
      </pre>
   </article>

5. `kubeedge.cloudCore.cloudHub.advertiseAddress` 값을 클러스터의 공용 IP 주소 또는 에지 노드에서 접속할 수 있는 IP 주소로 설정합니다. 완료한 후 오른쪽 하단의 **확인**을 클릭하여 구성을 저장하세요.

6. web kubectl을 사용하여 다음 명령을 실행면 설치 프로세스를 확인할 수 있습니다:


    <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  kubectl logs -n kubesphere-system <span style="color:#66d9ef">$(</span>kubectl get pod -n kubesphere-system -l <span style="color:#e6db74">'app in (ks-install, ks-installer)'</span> -o jsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">'{.items[0].metadata.name}'</span><span style="color:#66d9ef">)</span> -f</p>
            </code>
         </div>
      </pre>
   </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      웹 kubectl 도구는 콘솔의 좌측 하단의 모서리의 <img src="/dist/assets/docs/v3.3/enable-pluggable-components/kubesphere-app-store/hammer.png" height="20px">를 클릭하여 찾을 수 있습니다. 
    </div>
  </div>


## 컴포넌트 설치 확인

<main className="code-tabs">
	<ul className="nav nav-tabs">
		<li className="nav-item active"><a className="nav-link" href="#">대시보드에서 컴포넌트 확인</a></li>
		<li className="nav-item"><a className="nav-link" href="#">kubectl을 통해 컴포넌트 확인</a></li>
	</ul>
	<div className="tab-content">
		<main className="tab-pane active" title="대시보드에서 컴포넌트 확인">
			<b>클러스터 관리</b> 페이지에서 <b>에지 노드</b> 모듈이 <b>노드</b> 아래에 나타나는지 확인하세요.
		</main>
		<main className="tab-pane" title="kubectl을 통해 컴포넌트 확인">
			<p>
				다음 명령을 실행하여 파드의 상태를 확인하세요:
			</p>
			<article className="highlight">
				<pre>
					<div className="copy-code-button" title="Copy Code">
					</div>
					<div className="code-over-div">
						<code>kubectl get pod -n kubeedge </code>
					</div>
				</pre>
			</article>
			<p>
				컴포넌트가 성공적으로 실행되면 다음과 같은 출력을 볼 수 있습니다:
			</p>
			<article className="highlight">
				<pre>
					<div className="copy-code-button" title="Copy Code">
					</div>
					<div className="code-over-div">
                  <code>
                        NAME                                              READY   STATUS    RESTARTS   AGE
                        cloudcore-5f994c9dfd-r4gpq                        1/1     Running   <span style="color:#ae81ff">0</span>          5h13m
                        edge-watcher-controller-manager-bdfb8bdb5-xqfbk   2/2     Running   <span style="color:#ae81ff">0</span>          5h13m
                        iptables-hphgf                                    1/1     Running   <span style="color:#ae81ff">0</span>          5h13m
                  </code>
					</div>
				</pre>
			</article>
		</main>
	</div>
</main>

<div className="notices note">
  <p>Note</p>
  <div>
    KubeEdge를 활성화할 때 `kubeedge.cloudCore.cloudHub.advertiseAddress`가 설정되지 않았다면 CloudCore가 오작동(`CrashLoopBackOff`) 할 수 있습니다. 이 경우, `kubectl -n kubeedge edit cm cloudcore`를 실행하여 클러스터의 공용 IP 주소 또는 에지 노드에서 접속할 수 있는 IP 주소를 추가하세요.
  </div>
</div>

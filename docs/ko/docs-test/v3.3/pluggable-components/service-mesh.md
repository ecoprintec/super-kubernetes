---
title: 'Super Kubenetes 서비스 메시'
keywords: 'Kubernetes, Istio, Super Kubenetes, service-mesh, microservices'
description: 'Learn how to enable Super Kubenetes Service Mesh to use different traffic management strategies for microservices governance.'
linkTitle: 'Super Kubenetes Service Mesh'
weight: 6800
---

Super Kubenetes 서비스 메시는 [Istio](https://istio.io/)를 기반으로 마이크로서비스 거버넌스 및 트래픽 관리를 시각화합니다. **서킷브레이킹, 블루/그린 배포, 카나리아 릴리스, 트래픽 미러링, 추적, 관찰 및 트래픽 제어**를 포함한 강력한 툴킷을 제공합니다. 개발자는 코드 해킹 없이 Super Kubenetes 서비스 메시를 쉽게 시작할 수 있으므로 Istio의 학습 시간이 크게 단축됩니다. Super Kubenetes 서비스 메시의 모든 기능은 비즈니스를 위한 사용자의 요구를 충족하도록 설계되었습니다.

자세한 내용은 [그레이스케일 릴리스](../../project-user-guide/grayscale-release/overview/)를 참조하십시오.

## 설치 전에 Super Kubenetes 서비스 메시 활성화

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
      [All-in-One Installation](../../quick-start/all-in-one-on-linux/)을 채택하면 클러스터를 직접 생성할 수 있으므로 'config-sample.snmpl' 파일을 생성할 필요가 없습니다. 일반적으로 올인원 모드는 Super Kubenetes를 처음 사용하고 시스템에 익숙해지기를 원하는 사용자를 위한 것입니다. 이 모드에서 Super Kubenetes 서비스 매시를 활성화하려면(예를 들어, 테스트 목적으로) [다음 섹션](#enable-service-mesh-installation)을 참조하여 설치 후 Super Kubenetes 서비스 매시를 활성화하는 방법을 확인하세요.
    </div>
  </div>

2. 이 파일에서 `servicemesh`로 이동하여, `enabled`에 대해 `false`를 `true`로 변경하세요. 완료 후 파일을 저장하세요.

    <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  <span style="color:#f92672">servicemesh</span>:
                  <span style="color:#f92672">enabled</span>: <span style="color:#66d9ef">true</span> <span style="color:#75715e"><span>&nbsp;#</span> Change “false” to “true”.</span>
                  <span style="color:#f92672">istio</span>: <span style="color:#75715e"><span>#</span> Customizing the istio installation configuration, refer to https://istio.io/latest/docs/setup/additional-setup/customize-installation/</span>
                  <span style="color:#f92672">&nbsp;&nbsp;components</span>:
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;ingressGateways</span>:
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;-</span> <span style="color:#f92672">&nbsp;name</span>: <span style="color:#ae81ff">istio-ingressgateway</span> <span style="color:#75715e"><span>&nbsp;#</span><span>&nbsp;Used to expose a service outside of the service mesh using an Istio Gateway. The value is false by defalut.</span></span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;enabled</span>: <span style="color:#66d9ef">false</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;cni</span>: 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;enabled</span>: <span style="color:#66d9ef">false</span> <span style="color:#75715e"><span>&nbsp;#</span> When the value is true, it identifies user application pods with sidecars requiring traffic redirection and sets this up in the Kubernetes pod lifecycle’s network setup phase.</span>
               </p>
            </code>
         </div>
      </pre>
   </article>

<div className="notices note">
  <p>Note</p>
  <div>
    - Ingress 게이트웨이 활성화 후 서비스 접속 방법에 대한 자세한 내용은 [Ingress Gateway](https://istio.io/latest/docs/tasks/traffic-management/ingress/ingress-control/)를 참조하세요.
    - Istio CNI 플러그인에 대한 자세한 내용은 [Istio CNI 플러그인으로 Istio 설치](https://istio.io/latest/docs/setup/additional-setup/cni/)를 참조하세요.
  </div>
</div>

3. 설정 파일을 사용하여 클러스터를 생성하기 위해 아래 명령을 실행하세요:


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

[쿠버네티스에 Super Kubenetes를 설치](../../installing-on-kubernetes/introduction/overview/)할 때 [cluster-configuration.yaml](https://github.com/Super Kubenetes/ks-installer/releases/download/v3.3.0/cluster-configuration.yaml) 파일에서 먼저 Super Kubenetes 서비스 매시를 활성화할 수 있습니다.

1.  [cluster-configuration.yaml](https://github.com/Super Kubenetes/ks-installer/releases/download/v3.3.0/cluster-configuration.yaml) 파일을 다운로드하여 수정하세요.

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

2.  이 로컬 `cluster-configuration.yaml` 파일에서 `servicemesh`로 이동하고 `enabled`에 대해 `false`를 `true`로 변경하여 이를 활성화하세요. 완료 후 파일을 저장하세요.

     <article className="highlight">
       <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
          <div className="copy-code-button" title="Copy Code"></div>
          <div className="code-over-div">
             <code>
                <p>
                   <span style="color:#f92672">servicemesh</span>:
                   <span style="color:#f92672">enabled</span>: <span style="color:#66d9ef">true</span> <span style="color:#75715e"><span>&nbsp;#</span> Change “false” to “true”.</span>
                   <span style="color:#f92672">istio</span>: <span style="color:#75715e"><span>#</span> Customizing the istio installation configuration, refer to https://istio.io/latest/docs/setup/additional-setup/customize-installation/</span>
                   <span style="color:#f92672">&nbsp;&nbsp;components</span>:
                   <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;ingressGateways</span>:
                   <span>&nbsp;&nbsp;&nbsp;&nbsp;-</span> <span style="color:#f92672">&nbsp;name</span>: <span style="color:#ae81ff">istio-ingressgateway</span> <span style="color:#75715e"><span>&nbsp;#</span><span>&nbsp;Used to expose a service outside of the service mesh using an Istio Gateway. The value is false by defalut.</span></span> 
                   <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;enabled</span>: <span style="color:#66d9ef">false</span> 
                   <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;cni</span>: 
                   <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;enabled</span>: <span style="color:#66d9ef">false</span> <span style="color:#75715e"><span>&nbsp;#</span> When the value is true, it identifies user application pods with sidecars requiring traffic redirection and sets this up in the Kubernetes pod lifecycle’s network setup phase.</span>
                </p>
             </code>
          </div>
       </pre>
    </article>

3.  다음 명령을 실행하여 설치를 시작하세요:

     <article className="highlight">
       <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
          <div className="copy-code-button" title="Copy Code"></div>
          <div className="code-over-div">
             <code>
                <p>
                   kubectl apply -f <a style="color:#ffffff; cursor:text;">https://github.com/Super Kubenetes/ks-installer/releases/download/v3.3.0/Super Kubenetes-installer.yaml</a>

                   kubectl apply -f cluster-configuration.yaml</p>
             </code>
          </div>

       </pre>
    </article>

## 설치 후 Super Kubenetes 서비스 메시 활성화

1. 콘솔에 `admin`으로 로그인하세요. 좌측 상단 모서리에서 **플랫폼**을 클릭하고 **클러스터 관리**를 선택하세요.

2. **CRD**를 클릭하고 검색창에 `clusterconfiguration`을 입력합니다. 세부 정보 페이지를 보기 위해 결과를 클릭하세요.

  <div className="notices info">
    <p>Info</p>
    <div>
      사용자 지정 리소스 정의(CRD)를 사용하면 다른 API 서버를 추가하지 않고도 새로운 유형의 리소스를 생성할 수 있습니다. 다른 기본 쿠버네티스 오브젝트와 마찬가지로 이러한 리소스를 사용할 수 있습니다. 
    </div>
  </div>

3. **사용자 지정 리소스**에서 <img src="/dist/assets/docs/v3.3/enable-pluggable-components/Super Kubenetes-alerting/three-dots.png" height="20px">를 클릭하세요. `ks-installer` 오른쪽에서 **YAML 편집**을 선택하세요.

4. 이 YAML 파일에서 `servicemesh`로 이동하여 `enabled`에 대해 `false`를 `true`로 변경하세요. 완료한 후 오른쪽 하단의 **확인**을 클릭하여 설정을 저장하세요.

    <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  <span style="color:#f92672">servicemesh</span>:
                  <span style="color:#f92672">enabled</span>: <span style="color:#66d9ef">true</span> <span style="color:#75715e"><span>&nbsp;#</span> Change “false” to “true”.</span>
                  <span style="color:#f92672">istio</span>: <span style="color:#75715e"><span>#</span> Customizing the istio installation configuration, refer to https://istio.io/latest/docs/setup/additional-setup/customize-installation/</span>
                  <span style="color:#f92672">&nbsp;&nbsp;components</span>:
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;ingressGateways</span>:
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;-</span> <span style="color:#f92672">&nbsp;name</span>: <span style="color:#ae81ff">istio-ingressgateway</span> <span style="color:#75715e"><span>&nbsp;#</span><span>&nbsp;Used to expose a service outside of the service mesh using an Istio Gateway. The value is false by defalut.</span></span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;enabled</span>: <span style="color:#66d9ef">false</span> 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;cni</span>: 
                  <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;enabled</span>: <span style="color:#66d9ef">false</span> <span style="color:#75715e"><span>&nbsp;#</span> When the value is true, it identifies user application pods with sidecars requiring traffic redirection and sets this up in the Kubernetes pod lifecycle’s network setup phase.</span>
               </p>
            </code>
         </div>
      </pre>
   </article>

5. web kubectl을 사용하여 다음 명령을 실행면 설치 프로세스를 확인할 수 있습니다:

    <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  kubectl logs -n Super Kubenetes-system <span style="color:#66d9ef">$(</span>kubectl get pod -n Super Kubenetes-system -l <span style="color:#e6db74">'app in (ks-install, ks-installer)'</span> -o jsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">'{.items[0].metadata.name}'</span><span style="color:#66d9ef">)</span> -f
               </p>
            </code>
         </div>
      </pre>
   </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      웹 kubectl 도구는 콘솔의 좌측 하단의 모서리의 <img src="/dist/assets/docs/v3.3/enable-pluggable-components/Super Kubenetes-app-store/hammer.png" height="20px">를 클릭하여 찾을 수 있습니다. 
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
         <b>시스템 컴포넌트</b>로 이동하여 <b>Istio</b> 탭 페이지의 모든 컴포넌트가 <b>정상</b> 상태인지 확인합니다. 그렇다면 컴포넌트가 성공적으로 설치된 것입니다. 
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
						<code>kubectl get pod -n istio-system</code>
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
                  <code>NAME                                    READY   STATUS    RESTARTS   AGE
                  istio-ingressgateway-78dbc5fbfd-f4cwt   1/1     Running   <span style="color:#ae81ff">0</span>          9m5s
                  istiod-1-6-10-7db56f875b-mbj5p          1/1     Running   <span style="color:#ae81ff">0</span>          10m
                  jaeger-collector-76bf54b467-k8blr       1/1     Running   <span style="color:#ae81ff">0</span>          6m48s
                  jaeger-operator-7559f9d455-89hqm        1/1     Running   <span style="color:#ae81ff">0</span>          7m
                  jaeger-query-b478c5655-4lzrn            2/2     Running   <span style="color:#ae81ff">0</span>          6m48s
                  kiali-f9f7d6f9f-gfsfl                   1/1     Running   <span style="color:#ae81ff">0</span>          4m1s
                  kiali-operator-7d5dc9d766-qpkb6         1/1     Running   <span style="color:#ae81ff">0</span>          6m53s
                  </code>
					</div>
				</pre>
			</article>
		</main>
	</div>
</main>

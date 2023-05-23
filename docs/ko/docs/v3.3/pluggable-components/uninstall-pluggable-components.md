---
title: "플러그 가능 컴포넌트 제거"
keywords: "Installer, uninstall, Super Kubenetes, Kubernetes"
description: "Learn how to uninstall each pluggable component in Super Kubenetes."
linkTitle: "Uninstall Pluggable Components"
Weight: 6940
---

[Super Kubenetes의 플러그형 컴포넌트를 활성화](../../pluggable-components/)한 후, 다음 단계를 수행하여 제거할 수도 있습니다. 이런 컴포넌트를 제거하기 전에 필요한 데이터를 백업하십시오.

## 사전 준비

서비스 토폴로지 및 파드 IP 풀을 제외한 플러그형 컴포넌트를 제거하기 전에, CRD `ClusterConfiguration`의 `ks-installer`에서 `enabled` 영역 값을 `true`에서 `false`로 변경해야 합니다.

다음 방법 중 하나를 사용하여 `enabled` 영역 값을 변경하세요.

- 다음 명령을 실행하여 `ks-installer`를 편집.

  <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
									kubectl -n Super Kubenetes-system edit clusterconfiguration ks-installer
               </p>
            </code>
         </div>
      </pre>
   </article>

- Super Kubenetes 웹 콘솔에 `admin`으로 로그인하고, 좌측 상단의 **Platform**을 클릭하여 **클러스트 관리**를 선택한 다음, **CRDs**로 이동하여 `ClusterConfiguration`을 검색하세요. 자세한 내용은 [플러그형 컴포넌트 활성화](../../../pluggable-components/)를 참조하십시오.

<div className="notices note">
  <p>Note</p>
  <div>
    값이 변경된 후, 추가 작업을 계속하기 전에 업데이트 프로세스가 완료될 때까지 기다려야 합니다.
  </div>
</div>

## Super Kubenetes 앱 스토어 제거

CRD `ClusterConfiguration`의 `ks-installer`에서 `openpitrix.store.enabled` 값을 `true`에서 `false`로 변경하세요.

## Super Kubenetes DevOps 제거

1. DevOps를 제거하려면:

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  helm uninstall -n kubesphere-devops-system devops
                  kubectl patch -n kubesphere-system cc ks-installer --type<span style="color:#f92672">=</span>json -p<span style="color:#f92672">=</span><span style="color:#e6db74">'[{"op": "remove", "path": "/status/devops"}]'</span> 
                  kubectl patch -n kubesphere-system cc ks-installer --type<span style="color:#f92672">=</span>json -p<span style="color:#f92672">=</span><span style="color:#e6db74">'[{"op": "replace", "path": "/spec/devops/enabled", "value": false}]'</span>
               </p>
            </code>
         </div>
      </pre>
   </article>

2. DevOps 리소스를 삭제하려면:

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  <span style="color:#75715e"><span>#</span> Remove all resources related with DevOps</span>
                  <span style="color:#66d9ef">for</span>&nbsp;devops_crd in <span style="color:#66d9ef">$(</span>kubectl get crd -o<span style="color:#f92672">=</span>jsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">'{range .items[*]}{.metadata.name}{"\n"}{end}'</span> | grep <span style="color:#e6db74">"devops.kubesphere.io"</span><span style="color:#66d9ef">)</span>; <span style="color:#66d9ef">do</span> 
                  <span style="color:#66d9ef">&nbsp;&nbsp;&nbsp;&nbsp;for</span> ns in <span style="color:#66d9ef">$(</span>kubectl get ns -ojsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">'{.items..metadata.name}'</span><span style="color:#66d9ef">)</span>; <span style="color:#66d9ef">do</span> 
                  <span style="color:#66d9ef">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;for</span> devops_res in <span style="color:#66d9ef">$(</span>kubectl get $devops_crd -n $ns -oname<span style="color:#66d9ef">)</span>; <span style="color:#66d9ef">do</span> 
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;kubectl patch $devops_res -n $ns -p <span style="color:#e6db74">'{"metadata":{"finalizers":[]}}'</span> --type<span style="color:#f92672">=</span>merge
                  <span style="color:#66d9ef">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;done</span> 
                  <span style="color:#66d9ef">&nbsp;&nbsp;&nbsp;&nbsp;done</span> 
                  <span style="color:#66d9ef">done</span> 
                  <span style="color:#75715e"><span>#</span><span>&nbsp;Remove all DevOps CRDs</span></span> 
                  kubectl get crd -o<span style="color:#f92672">=</span>jsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">'{range .items[*]}{.metadata.name}{"\n"}{end}'</span> | grep <span style="color:#e6db74">"devops.kubesphere.io"</span> | xargs -I crd_name kubectl delete crd crd_name
                  <span style="color:#75715e"><span>#</span><span>&nbsp;Remove DevOps namespace</span></span> 
                  <span>kubectl delete namespace kubesphere-devops-system</span>
               </p>
            </code>
         </div>
      </pre>
   </article>


## Super Kubenetes Logging 제거

1. CRD `ClusterConfiguration`의 `ks-installer`에서 `logging.enabled`의 값을 `true`에서 `false`로 변경하세요.

2. 로그 수집만 비활성화하려면:

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
									kubectl delete inputs.logging.kubesphere.io -n Super Kubenetes-logging-system tail
               </p>
            </code>
         </div>
      </pre>
   </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      이 명령을 실행한 후에도, 쿠버네티스에서 기본적으로 제공하는, 컨테이너의 최근 로그를 계속 볼 수 있습니다. 하지만 컨테이너 히스토리 로그는 지워져 더 이상 열람할 수 없습니다.
    </div>
  </div>

3. Elasticsearch를 포함한 로깅 시스템을 제거하려면:

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  kubectl delete crd fluentbitconfigs.logging.kubesphere.io
                  kubectl delete crd fluentbits.logging.kubesphere.io
                  kubectl delete crd inputs.logging.kubesphere.io
                  kubectl delete crd outputs.logging.kubesphere.io
                  kubectl delete crd parsers.logging.kubesphere.io
                  kubectl delete deployments.apps -n Super Kubenetes-logging-system fluentbit-operator
                  helm uninstall elasticsearch-logging --namespace Super Kubenetes-logging-system
               </p>
            </code>
         </div>
      </pre>
   </article>

  <div className="notices warning">
    <p>Warning</p>
    <div>
      이 작업은 감사, 이벤트 및 서비스 메시에 이상을 일으킬 수 있습니다.
    </div>
  </div>

   
4. 다음 명령을 실행하세요:

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  kubectl delete deployment logsidecar-injector-deploy -n Super Kubenetes-logging-system
                  kubectl delete ns Super Kubenetes-logging-system
               </p>
            </code>
         </div>
      </pre>
   </article>

## Super Kubenetes 이벤트 제거

1. CRD `ClusterConfiguration`의 `ks-installer`에서 `events.enabled` 값을 `true`에서 `false`로 변경하세요.

2. 다음 명령을 실행하세요:

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
									helm delete ks-events -n Super Kubenetes-logging-system
               </p>
            </code>
         </div>
      </pre>
   </article>

## Super Kubenetes Alerting 제거

1. CRD `ClusterConfiguration`의 `ks-installer`에서 `alerting.enabled` 값을 `true`에서 `false`로 변경하세요.

2. 다음 명령을 실행하세요:

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  kubectl -n Super Kubenetes-monitoring-system delete thanosruler Super Kubenetes
               </p>
            </code>
         </div>
      </pre>
   </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      알림은 기본적으로 Super Kubenetes 3.3.0에 설치되므로, 제거할 필요가 없습니다.
    </div>
  </div>


## Super Kubenetes Auditing 제거

1. CRD `ClusterConfiguration`의 `ks-installer`에서 `auditing.enabled` 값을 `true`에서 `false`로 변경하세요.

2. 다음 명령을 실행하세요:

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  helm uninstall kube-auditing -n Super Kubenetes-logging-system
                  kubectl delete crd rules.auditing.kubesphere.io
                  kubectl delete crd webhooks.auditing.kubesphere.io
               </p>
            </code>
         </div>
      </pre>
   </article>

## Super Kubenetes 서비스 메시 제거

1. CRD `ClusterConfiguration`의 `ks-installer`에서 `servicemesh.enabled` 값을 `true`에서 `false`로 변경하세요.

2. 다음 명령을 실행하세요:

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  curl -L <a style="color:#ffffff; cursor:text;">https://istio.io/downloadIstio</a> | sh -
                  istioctl x uninstall --purge

                  kubectl -n istio-system delete kiali kiali
                  helm -n istio-system delete kiali-operator

                  kubectl -n istio-system delete jaeger jaeger
                  helm -n istio-system delete jaeger-operator
               </p>
            </code>
         </div>
      </pre>
   </article>

## 네트워크 정책 제거

NetworkPolicy 컴포넌트의 경우, 이것의 컨트롤러가 이제 `ks-controller-manager` 안에 있으므로 컴포넌트를 비활성화하기 위해 컴포넌트를 제거할 필요가 없습니다. 이를 Super Kubenetes 콘솔에서 제거하려면, CRD `ClusterConfiguration`의 `ks-installer`에서 `network.networkpolicy.enabled` 값을 `true`에서 `false`로 변경하십시오.

## 메트릭 서버 제거

1. CRD `ClusterConfiguration`의 `ks-installer`에서 `metrics_server.enabled` 값을 `true`에서 `false`로 변경하세요.

2. 다음 명령을 실행하세요:

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  kubectl delete apiservice v1beta1.metrics.k8s.io
                  kubectl -n kube-system delete service metrics-server
                  kubectl -n kube-system delete deployment metrics-server
               </p>
            </code>
         </div>
      </pre>
   </article>

## 서비스 토폴로지 제거

1. CRD `ClusterConfiguration`의 `ks-installer`에서 `network.topology.type` 값을 `weave-scope`에서 `none`으로 변경하세요.

2. 다음 명령을 실행하세요:

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
									kubectl delete ns weave
               </p>
            </code>
         </div>
      </pre>
   </article>

## 파드 IP 풀 제거

CRD `ClusterConfiguration`의 `ks-installer`에서 `network.ippool.type` 값을 `calico`에서 `none`으로 변경하세요.

## KubeEdge 제거

1. CRD `ClusterConfiguration`의 `ks-installer`에서 `kubeedge.enabled` 및 `edgeruntime.enabled` 값을 `true`에서 `false`로 변경하세요.

2. 다음 명령을 실행하세요:

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  helm uninstall kubeedge -n kubeedge
                  kubectl delete ns kubeedge
               </p>
            </code>
         </div>
      </pre>
   </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      제거 후에는 에지 노드를 클러스터에 추가할 수 없습니다.
    </div>
  </div>


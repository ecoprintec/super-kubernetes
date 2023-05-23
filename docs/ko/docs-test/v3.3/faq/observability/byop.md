---
title: "자신의 프로메테우스 가져오기"
keywords: "Monitoring, Prometheus, node-exporter, kube-state-metrics, Super Kubenetes, Kubernetes"
description: "Use your own Prometheus stack setup in Super Kubenetes."
linkTitle: "Bring Your Own Prometheus"
Weight: 16330
---

Super Kubenetes에는 Prometheus Operator, Prometheus, Alertmanager, Grafana(선택 사항), 다양한 ServiceMonitors, node-exporter, 그리고 kube-state-metrics를 비롯한 여러 맞춤형 모니터링 컴포넌트가 사전 설치되어 있습니다. 이러한 컴포넌트는 Super Kubenetes를 설치하기 전에 이미 있을 수 있습니다. Super Kubenetes v3.3.0에서는 자신만의 Prometheus 스택 설정을 사용하는 것이 가능합니다.

## 자신의 프로메테우스를 가져오는 단계

자신의 고유한 Prometheus 스택 설정을 사용하려면 다음 단계를 수행하십시오.

1. Super Kubenetes의 맞춤형 Prometheus 스택 제거

2. 자신의 Prometheus 스택 설치

3. Prometheus 스택에 Super Kubenetes 맞춤형 항목 설치

4. Super Kubenetes의 `모니터링 엔드포인트` 변경

### 1단계. Super Kubenetes의 맞춤형 Prometheus 스택 제거

1. 다음 명령을 실행하여 스택을 제거합니다.


   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  kubectl -n Super Kubenetes-system exec <span style="color:#66d9ef">$(</span>kubectl get pod -n Super Kubenetes-system -l app<span style="color:#f92672">=</span>ks-installer -o jsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">'{.items[0].metadata.name}'</span><span style="color:#66d9ef">)</span> -- kubectl delete -f /Super Kubenetes/Super Kubenetes/prometheus/alertmanager/ 2&gt;/dev/null
                  kubectl -n Super Kubenetes-system exec <span style="color:#66d9ef">$(</span>kubectl get pod -n Super Kubenetes-system -l app<span style="color:#f92672">=</span>ks-installer -o jsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">'{.items[0].metadata.name}'</span><span style="color:#66d9ef">)</span> -- kubectl delete -f /Super Kubenetes/Super Kubenetes/prometheus/devops/ 2&gt;/dev/null
                  kubectl -n Super Kubenetes-system exec <span style="color:#66d9ef">$(</span>kubectl get pod -n Super Kubenetes-system -l app<span style="color:#f92672">=</span>ks-installer -o jsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">'{.items[0].metadata.name}'</span><span style="color:#66d9ef">)</span> -- kubectl delete -f /Super Kubenetes/Super Kubenetes/prometheus/etcd/ 2&gt;/dev/null
                  kubectl -n Super Kubenetes-system exec <span style="color:#66d9ef">$(</span>kubectl get pod -n Super Kubenetes-system -l app<span style="color:#f92672">=</span>ks-installer -o jsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">'{.items[0].metadata.name}'</span><span style="color:#66d9ef">)</span> -- kubectl delete -f /Super Kubenetes/Super Kubenetes/prometheus/grafana/ 2&gt;/dev/null
                  kubectl -n Super Kubenetes-system exec <span style="color:#66d9ef">$(</span>kubectl get pod -n Super Kubenetes-system -l app<span style="color:#f92672">=</span>ks-installer -o jsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">'{.items[0].metadata.name}'</span><span style="color:#66d9ef">)</span> -- kubectl delete -f /Super Kubenetes/Super Kubenetes/prometheus/kube-state-metrics/ 2&gt;/dev/null
                  kubectl -n Super Kubenetes-system exec <span style="color:#66d9ef">$(</span>kubectl get pod -n Super Kubenetes-system -l app<span style="color:#f92672">=</span>ks-installer -o jsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">'{.items[0].metadata.name}'</span><span style="color:#66d9ef">)</span> -- kubectl delete -f /Super Kubenetes/Super Kubenetes/prometheus/node-exporter/ 2&gt;/dev/null
                  kubectl -n Super Kubenetes-system exec <span style="color:#66d9ef">$(</span>kubectl get pod -n Super Kubenetes-system -l app<span style="color:#f92672">=</span>ks-installer -o jsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">'{.items[0].metadata.name}'</span><span style="color:#66d9ef">)</span> -- kubectl delete -f /Super Kubenetes/Super Kubenetes/prometheus/upgrade/ 2&gt;/dev/null
                  kubectl -n Super Kubenetes-system exec <span style="color:#66d9ef">$(</span>kubectl get pod -n Super Kubenetes-system -l app<span style="color:#f92672">=</span>ks-installer -o jsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">'{.items[0].metadata.name}'</span><span style="color:#66d9ef">)</span> -- kubectl delete -f /Super Kubenetes/Super Kubenetes/prometheus/prometheus-rules-v1.16<span style="color:#ae81ff">\+</span>.yaml 2&gt;/dev/null
                  kubectl -n Super Kubenetes-system exec <span style="color:#66d9ef">$(</span>kubectl get pod -n Super Kubenetes-system -l app<span style="color:#f92672">=</span>ks-installer -o jsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">'{.items[0].metadata.name}'</span><span style="color:#66d9ef">)</span> -- kubectl delete -f /Super Kubenetes/Super Kubenetes/prometheus/prometheus-rules.yaml 2&gt;/dev/null
                  kubectl -n Super Kubenetes-system exec <span style="color:#66d9ef">$(</span>kubectl get pod -n Super Kubenetes-system -l app<span style="color:#f92672">=</span>ks-installer -o jsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">'{.items[0].metadata.name}'</span><span style="color:#66d9ef">)</span> -- kubectl delete -f /Super Kubenetes/Super Kubenetes/prometheus/prometheus 2&gt;/dev/null
                  <span style="color:#75715e"><span>#</span><span>&nbsp;Uncomment this line if you don't have Prometheus managed by Prometheus Operator in other namespaces.</span></span> 
                  <span style="color:#75715e"><span>#</span><span>&nbsp;kubectl -n Super Kubenetes-system exec $(kubectl get pod -n Super Kubenetes-system -l app=ks-installer -o jsonpath='{.items[0].metadata.name}') -- kubectl delete -f /Super Kubenetes/Super Kubenetes/prometheus/init/ 2&gt;/dev/null</span></span>
               </p>
            </code>
         </div>
      </pre>
   </article>

2. Prometheus가 사용한 PVC를 삭제하세요.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  kubectl -n Super Kubenetes-monitoring-system delete pvc <span style="color:#e6db74">`</span>kubectl -n Super Kubenetes-monitoring-system get pvc | grep -v VOLUME | awk <span style="color:#e6db74">'{print $1}'</span> |  tr <span style="color:#e6db74">'\n'</span> <span style="color:#e6db74">' '</span><span style="color:#e6db74">`</span>
               </p>
            </code>
         </div>
      </pre>
   </article>

### 2단계. 자신의 Prometheus 스택 설치

<div className="notices note">
   <p>Note</p>
   <div>
      Super Kubenetes 3.3.0은 아래 Prometheus 스택 컴포넌트와 함께 잘 작동하는 것이 인증되었습니다.

         - 프로메테우스 오퍼레이터 **v0.38.3+**
         - 프로메테우스 **v2.20.1+**
         - Alertmanager **v0.21.0+**
         - kube-state-metrics **v1.9.6**
         - node-exporter **v0.18.1**

         Prometheus 스택 컴포넌트의 버전이 이러한 버전 요구 사항을 충족하는지, 특히 **node-exporter**와 **kube-state-metrics**를 확인하세요.

         **Prometheus Operator**와 **Prometheus**만 설치된 경우 **node-exporter**와 **kube-state-metrics**를 설치해야 합니다. **node-exporter**와 **kube-state-metrics**는 Super Kubenetes가 제대로 작동하기 위해 필요합니다.

         **만일 전체 Prometheus 스택이 이미 작동 중이라면 이 단계를 건너뛸 수 있습니다.**

   </div>
</div>


Prometheus 스택은 여러 가지 방법으로 설치할 수 있습니다. 다음 단계는 **업스트림 `kube-prometheus`**를 사용하여 `monitoring` 네임스페이스에 설치하는 방법을 시연합니다.

1. node-exporter의 버전 v0.18.1이 Super Kubenetes v3.3.0가 사용 중인 버전과 일치하는, kube-prometheus v0.6.0을 가져옵니다.
 
  <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  cd ~ <span style="color:#f92672">&amp;&amp;</span> git clone -b release-3.3 <a style="color:#ffffff; cursor:text;">https://github.com/Super Kubenetes/ks-prometheus.git</a> <span style="color:#f92672">&amp;&amp;</span> cd ks-prometheus
               </p>
            </code>
         </div>
      </pre>
   </article>

2. `monitoring` 네임스페이스를 설정하고 Prometheus Operator 및 해당 역할을 설치하세요:

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  kubectl apply -f manifests/setup/
               </p>
            </code>
         </div>
      </pre>
   </article>

3. Prometheus Operator가 실행될 때까지 기다립니다.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  kubectl -n monitoring get pod --watch
               </p>
            </code>
         </div>
      </pre>
   </article>

4. Prometheus 어댑터와 같은, 불필요한 컴포넌트를 제거하세요.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  rm -rf manifests/prometheus-adapter-*.yaml
               </p>
            </code>
         </div>
      </pre>
   </article>

5. kube-state-metrics를 Super Kubenetes v3.3.0에서 사용하는 것과 동일한 버전인 v1.9.6으로 변경하세요.

  <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  sed -i <span style="color:#e6db74">'s/v1.9.5/v1.9.6/g'</span> manifests/kube-state-metrics-deployment.yaml
               </p>
            </code>
         </div>
      </pre>
   </article>

6. Prometheus, Alertmanager, Grafana, kube-state-metrics 그리고 node-exporter를 설치합니다. yaml 파일인 `kube-state-metrics-*.yaml` 또는 `node-exporter-*.yaml`을 적용해야만 kube-state-metrics나 node-exporter를 설치할 수 있습니다.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  kubectl apply -f manifests/
               </p>
            </code>
         </div>
      </pre>
   </article>

### 3단계. Prometheus 스택에 Super Kubenetes 맞춤형 항목 설치

<div className="notices note">
   <p>Note</p>
   <div>
      Super Kubenetes 3.3.0은 Prometheus Operator를 사용하여 Prometheus/Alertmanager 설정 및 라이프사이클, ServiceMonitor(스크레이프 설정 관리) 그리고 PrometheusRule (Prometheus 기록/경고 규칙 관리)을 관리합니다.

         [Super Kubenetes kustomization]()에는 몇 가지 항목이 열거되어 있는데, 그 중 `prometheus-rules.yaml`과 `prometheus-rulesEtcd.yaml`은 Super Kubenetes v3.3.0이 제대로 작동하기 위해 필요하고 나머지는 선택 사항입니다. 기존 Alertmanager의 설정을 덮어쓰고 싶지 않다면 `alertmanager-secret.yaml`을 제거하면 됩니다. 그리고 자신의 ServiceMonitor를 덮어쓰고 싶지 않다면 `xxx-serviceMonitor.yaml`을 제거하면 됩니다. (Super Kubenetes 맞춤형 ServiceMonitor는 Prometheus가 가장 유용한 메트릭만 저장하도록 하기 위해 많은 관련 없는 메트릭을 버립니다).

         Prometheus 스택 설정을 Prometheus Operator에서 관리하지 않는다면 이 단계를 건너뛸 수 있습니다. 하지만 다음을 꼭 확인해야 합니다.

         - Super Kubenetes v3.3.0이 제대로 작동하려면 [PrometheusRule]()과 [PrometheusRule for etcd]()의 기록/경고 규칙을 Prometheus 설정으로 복사해야 합니다.

         - [Super Kubenetes kustomization]()에 나열된 ServiceMonitor와 동일한 대상에서 메트릭을 스크랩하도록 Prometheus를 설정하세요.
   </div>
</div>

1. Super Kubenetes v3.3.0 맞춤용 kube-prometheus를 가져오세요.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  cd ~ <span style="color:#f92672">&amp;&amp;</span> mkdir Super Kubenetes <span style="color:#f92672">&amp;&amp;</span> cd Super Kubenetes <span style="color:#f92672">&amp;&amp;</span> git clone <a style="color:#ffffff; cursor:text;">https://github.com/Super Kubenetes/kube-prometheus.git</a> <span style="color:#f92672">&amp;&amp;</span> cd kube-prometheus/kustomize
               </p>
            </code>
         </div>
      </pre>
   </article>

2. Prometheus 스택이 배포된, 자신만의 네임스페이스로 변경하세요. 예를 들어 2단계에 이어 '모니터링' 네임스페이스에 Prometheus를 설치하면 '모니터링'으로 변경 됩니다.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  sed -i <span style="color:#e6db74">'s/my-namespace/&lt;your own namespace&gt;/g'</span> kustomization.yaml
               </p>
            </code>
         </div>
      </pre>
   </article>

3. Prometheus 규칙, Alertmanager 설정, 다양한 ServiceMonitor를 포함한 Super Kubenetes 맞춤형 항목을 적용하세요.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  kubectl apply -k .
               </p>
            </code>
         </div>
      </pre>
   </article>

4. kube-scheduler 및 kube-controller-manager 메트릭 노출을 위한 서비스를 설정하세요.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  kubectl apply -f ./prometheus-serviceKubeScheduler.yaml
                  kubectl apply -f ./prometheus-serviceKubeControllerManager.yaml
               </p>
            </code>
         </div>
      </pre>
   </article>

5. 자신의 네임스페이스에서 Prometheus CR을 찾으세요. 일반적으로 쿠버네티스입니다.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  kubectl -n &lt;your own namespace&gt; get prometheus
               </p>
            </code>
         </div>
      </pre>
   </article>

6. Super Kubenetes v3.3.0 맞춤형 ServiceMonitor와 일치하도록, Prometheus 규칙 판별의 간격을 1분으로 설정하세요. 규칙 판별 간격은 스크랩 간격보다 크거나 같아야 합니다.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  kubectl -n &lt;your own namespace&gt; patch prometheus k8s --patch <span style="color:#e6db74">'{
                  </span><span style="color:#e6db74">&nbsp;&nbsp;"spec": {
                  </span><span style="color:#e6db74">&nbsp;&nbsp;&nbsp;&nbsp;"evaluationInterval": "1m"
                  </span><span style="color:#e6db74">&nbsp;&nbsp;}
                  </span><span style="color:#e6db74">}'</span> --type<span style="color:#f92672">=</span>merge
               </p>
            </code>
         </div>
      </pre>
   </article>

### 4단계. Super Kubenetes의 `모니터링 엔드포인트` 변경

이제 고유한 Prometheus 스택이 실행 중이므로 Super Kubenetes의 모니터링 엔드포인트를 변경하여 고유한 Prometheus를 사용할 수 있습니다.

1. 다음 명령을 실행하여 `Super Kubenetes-config`를 편집하세요.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  kubectl edit cm -n Super Kubenetes-system Super Kubenetes-config
               </p>
            </code>
         </div>
      </pre>
   </article>

2. 아래와 같이, `모니터링 엔드포인트` 섹션으로 이동하세요:

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  &nbsp;&nbsp;&nbsp;&nbsp;monitoring:
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;endpoint: <a style="color:#ffffff; cursor:text;">http://prometheus-operated.Super Kubenetes-monitoring-system.svc:9090</a>
               </p>
            </code>
         </div>
      </pre>
   </article>

3. `모니터링 엔드포인트`를 자신의 Prometheus로 변경하세요:

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  &nbsp;&nbsp;&nbsp;&nbsp;monitoring:
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;endpoint: <a style="color:#ffffff; cursor:text;">http://prometheus-operated.monitoring.svc:9090</a>
               </p>
            </code>
         </div>
      </pre>
   </article>

4. 다음 명령어를 실행하여 Super Kubenetes APIServer를 재시작하세요.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  kubectl -n Super Kubenetes-system rollout restart deployment/ks-apiserver
               </p>
            </code>
         </div>
      </pre>
   </article>

<div className="notices warning">
  <p>주의</p>
  <div>
    [이 가이드](../../../pluggable-components/overview/)를 따라 Super Kubenetes 플러그형 컴포넌트를 활성화/비활성화 하면 `모니터링 엔드포인트`가 원래대로 재설정될 것입니다. 이 경우 `모니터링 엔드포인트`를 새 것으로 변경한 다음, Super Kubenetes APIServer를 재시작해야 합니다.
  </div>
</div>

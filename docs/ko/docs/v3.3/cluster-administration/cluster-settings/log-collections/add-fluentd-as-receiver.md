---
title: "Fluentd를 수신기로 추가"
keywords: 'Kubernetes, log, fluentd, pod, container, fluentbit, output'
description: 'Learn how to add Fluentd to receive logs, events or audit logs.'
linkTitle: "Add Fluentd as a Receiver"
weight: 8624
---
KubernetesEnterprise에서 Elasticsearch, Kafka 및 Fluentd를 로그 수신기로 사용할 수 있습니다. 이 튜토리얼에서는 다음을 시연합니다:

- Fluentd를 디플로이먼트로 배포하고 해당 서비스 및 ConfigMap을 만드는 방법.
- Fluent Bit에서 보낸 로그를 받아 stdout으로 출력하기 위해 Fluentd를 로그 수신기로 추가하는 방법.
- Fluentd가 성공적으로 로그를 수신하는지 확인하는 방법.

## 사전 준비

- **클러스터 관리** 권한을 포함한 역할을 부여받은 사용자가 필요합니다. 예를 들어 콘솔에 직접 `admin`으로 로그인하거나 권한이 있는 새 역할을 생성하여 사용자에게 할당할 수 있습니다.

- 로그 수신기를 추가하기 전에 `logging`, `events` 또는 `auditing` 컴포넌트를 활성화해야 합니다. 자세한 내용은 [pluggable-components 활성화](../../../../pluggable-components/)를 참고하세요. 이 튜토리얼에서는 `logging`을 예로 사용합니다.

## 1단계: Fluentd를 디플로이먼트로 배포

일반적으로 Fluentd는 쿠버네티스에서 데몬셋으로 배포되어 각 노드의 컨테이너 로그를 수집합니다. Super Kubenetes는 메모리 사용량이 적기 때문에 Fluent Bit를 선택합니다. 게다가 Fluentd에는 수많은 출력 플러그인이 있습니다. 따라서 Super Kubenetes는 Fluent Bit에서 수신한 로그를 S3, MongoDB, Cassandra, MySQL, syslog 및 Splunk와 같은 더 많은 대상으로 전달하기 위해 Fluentd를 디플로이먼트로 선택합니다.

다음 명령을 실행하세요.

<div className="notices note">
  <p>Note</p>
  <div>
    - 다음 명령은 `default` 네임스페이스에 Fluentd 배포, 서비스 및 ConfigMap을 만들고 Fluentd ConfigMap에 필터를 추가하여 Fluent Bit 및 Fluentd 루프 로그 수집을 방지하기 위해 `default` 네임스페이스에서 로그를 제외합니다.
    - Fluentd를 다른 네임스페이스에 배포하려면 네임스페이스를 변경합니다.
  </div>
</div>


<article className="highlight">
   <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
         <code>
            <p>
               <span style="color:#ae81ff">cat &lt;&lt;EOF | kubectl apply -f -</span> 
               <span style="color:#f92672">apiVersion</span>: <span style="color:#ae81ff">v1</span> 
               <span style="color:#f92672">kind</span>: <span style="color:#ae81ff">ConfigMap</span> 
               <span style="color:#f92672">metadata</span>: 
               <span style="color:#f92672">&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">fluentd-config</span> 
               <span style="color:#f92672">&nbsp;&nbsp;namespace</span>: <span style="color:#ae81ff">default</span> 
               <span style="color:#f92672">data</span>: 
               <span style="color:#f92672">&nbsp;&nbsp;fluent.conf</span>: |-<span style="color:#e6db74"> 
               </span><span style="color:#e6db74">    &nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> Receive logs sent from Fluent Bit on port 24224 
               </span><span style="color:#e6db74">    &nbsp;&nbsp;&nbsp;&nbsp;&lt;source&gt; 
               </span><span style="color:#e6db74">      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;@type forward 
               </span><span style="color:#e6db74">      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;port 24224 
               </span><span style="color:#e6db74">    &nbsp;&nbsp;&nbsp;&nbsp;&lt;/source&gt; 
               </span><span style="color:#e6db74"> 
               </span><span style="color:#e6db74">    &nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> Because this will send logs Fluentd received to stdout, 
               </span><span style="color:#e6db74">    &nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> to avoid Fluent Bit and Fluentd loop logs collection, 
               </span><span style="color:#e6db74">    &nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> add a filter here to avoid sending logs from the default namespace to stdout again 
               </span><span style="color:#e6db74">    &nbsp;&nbsp;&nbsp;&nbsp;&lt;filter <span>*</span><span>*</span>&gt; 
               </span><span style="color:#e6db74">      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;@type grep 
               </span><span style="color:#e6db74">      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;exclude&gt; 
               </span><span style="color:#e6db74">        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;key $.kubernetes.namespace_name 
               </span><span style="color:#e6db74">        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;pattern /^default$/ 
               </span><span style="color:#e6db74">      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/exclude&gt; 
               </span><span style="color:#e6db74">    &nbsp;&nbsp;&nbsp;&nbsp;&lt;/filter&gt; 
               </span><span style="color:#e6db74"> 
               </span><span style="color:#e6db74">    &nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> Send received logs to stdout for demo/test purpose only 
               </span><span style="color:#e6db74">    &nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> Various output plugins are supported to output logs to S3, MongoDB, Cassandra, MySQL, syslog, Splunk, etc. 
               </span><span style="color:#e6db74">    &nbsp;&nbsp;&nbsp;&nbsp;&lt;match <span>*</span><span>*</span>&gt; 
               </span><span style="color:#e6db74">      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;@type stdout 
               </span><span style="color:#e6db74">    &nbsp;&nbsp;&nbsp;&nbsp;&lt;/match&gt;</span> 
               <span>-</span><span>-</span><span>-</span> 
               <span style="color:#f92672">apiVersion</span>: <span style="color:#ae81ff">apps/v1</span> 
               <span style="color:#f92672">kind</span>: <span style="color:#ae81ff">Deployment</span> 
               <span style="color:#f92672">metadata</span>: 
               <span style="color:#f92672">&nbsp;&nbsp;labels</span>: 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;app</span>: <span style="color:#ae81ff">fluentd</span> 
               <span style="color:#f92672">&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">fluentd</span> 
               <span style="color:#f92672">&nbsp;&nbsp;namespace</span>: <span style="color:#ae81ff">default</span> 
               <span style="color:#f92672">spec</span>: 
               <span style="color:#f92672">&nbsp;&nbsp;replicas</span>: <span style="color:#ae81ff">1</span> 
               <span style="color:#f92672">&nbsp;&nbsp;selector</span>: 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;matchLabels</span>: 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;app</span>: <span style="color:#ae81ff">fluentd</span> 
               <span style="color:#f92672">&nbsp;&nbsp;template</span>: 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;metadata</span>: 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;labels</span>: 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;app</span>: <span style="color:#ae81ff">fluentd</span> 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;spec</span>: 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;containers</span>: 
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#f92672">image</span>: <span style="color:#ae81ff">fluentd:v1.9.1-1.0</span> 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;imagePullPolicy</span>: <span style="color:#ae81ff">IfNotPresent</span> 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">fluentd</span> 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ports</span>: 
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#f92672">containerPort</span>: <span style="color:#ae81ff">24224</span> 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">forward</span> 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;protocol</span>: <span style="color:#ae81ff">TCP</span> 
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#f92672">containerPort</span>: <span style="color:#ae81ff">5140</span> 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">syslog</span> 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;protocol</span>: <span style="color:#ae81ff">TCP</span> 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;volumeMounts</span>: 
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#f92672">mountPath</span>: <span style="color:#ae81ff">/fluentd/etc</span> 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">config</span> 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;readOnly</span>: <span style="color:#66d9ef">true</span> 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;volumes</span>: 
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#f92672">configMap</span>: 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;defaultMode</span>: <span style="color:#ae81ff">420</span> 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">fluentd-config</span> 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">config</span> 
               <span>-</span><span>-</span><span>-</span> 
               <span style="color:#f92672">apiVersion</span>: <span style="color:#ae81ff">v1</span> 
               <span style="color:#f92672">kind</span>: <span style="color:#ae81ff">Service</span> 
               <span style="color:#f92672">metadata</span>: 
               <span style="color:#f92672">&nbsp;&nbsp;labels</span>: 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;app</span>: <span style="color:#ae81ff">fluentd</span> 
               <span style="color:#f92672">&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">fluentd</span> 
               <span style="color:#f92672">&nbsp;&nbsp;namespace</span>: <span style="color:#ae81ff">default</span> 
               <span style="color:#f92672">spec</span>: 
               <span style="color:#f92672">&nbsp;&nbsp;ports</span>: 
               &nbsp;&nbsp;- <span style="color:#f92672">name</span>: <span style="color:#ae81ff">forward</span> 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;port</span>: <span style="color:#ae81ff">24224</span> 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;protocol</span>: <span style="color:#ae81ff">TCP</span> 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;targetPort</span>: <span style="color:#ae81ff">forward</span> 
               <span style="color:#f92672">&nbsp;&nbsp;selector</span>: 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;app</span>: <span style="color:#ae81ff">fluentd</span> 
               <span style="color:#f92672">&nbsp;&nbsp;sessionAffinity</span>: <span style="color:#ae81ff">None</span> 
               <span style="color:#f92672">&nbsp;&nbsp;type</span>: <span style="color:#ae81ff">ClusterIP</span> 
               <span style="color:#ae81ff">EOF</span> 
            </p>
         </code>
      </div>
   </pre>
</article>


## 2단계: Fluentd를 로그 수신기로 추가

1. Super Kubenetes에 `admin`으로 로그인하세요. 왼쪽 상단 모서리에서 **플랫폼**을 클릭하고 **클러스터 관리**를 선택합니다.

   <div className="notices note">
      <p>Note</p>
      <div>
         [멀티 클러스터 기능](../../../../multicluster-management/)을 활성화한 경우 특정 클러스터를 선택할 수 있습니다.
      </div>
   </div>

2. **클러스터 관리** 페이지에서 **클러스터 설정**의 **로그 수신기**로 이동하세요.

3. **로그 수신기 추가**를 클릭하고 **Fluentd**를 선택합니다.

4. Fluentd 서비스 주소와 포트 번호를 제공하세요.

5. Fluentd는 **로그 수신기** 페이지의 수신기 목록에 표시되며 상태는 **수집 중**입니다.


## 3단계: Fluentd가 Fluent Bit에서 보낸 로그를 수신하고 있는지 확인

1. **클러스터 관리** 페이지에서 **애플리케이션 워크로드**를 클릭하세요.

2. **워크로드**를 선택한 다음 **디플로이먼트** 탭에서 `default` 프로젝트를 선택하세요.

3. **fluentd** 항목을 클릭한 다음 **fluentd-xxxxxxxxx-xxxxx** 파드를 선택하세요.

4. **fluentd** 컨테이너를 클릭하세요.

5. **fluentd** 컨테이너 페이지에서 **컨테이너 로그** 탭을 선택하세요.

6. 로그가 계속 위로 스크롤되기 시작하는 것을 볼 수 있습니다.

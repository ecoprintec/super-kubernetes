---
title: 'Super Kubenetes 이벤트'
keywords: 'Kubernetes, events, Super Kubenetes, k8s-events'
description: 'Learn how to enable Events to keep track of everything that is happening on the platform.'
linkTitle: 'Super Kubenetes Events'
weight: 6500
---

Super Kubenetes 이벤트로 사용자는 노드 스케줄링 상태 및 이미지 풀링 결과와 같은, 클러스터 내부에서 일어나는 일을 추적할 수 있습니다. 이것은 웹 콘솔에 표시된 특정한 이유, 상태, 메시지와 함께 정확하게 기록됩니다. 사용자는 빠르게 웹 툴킷을 실행하고 다양한 필터(예: 키워드 및 프로젝트)가 있는 검색창에 관련 정보를 입력하여 이벤트를 쿼리할 수 있습니다. 또한 이벤트를 Elasticsearch, Kafka 또는 Fluentd와 같은 써드파티 툴에 보관할 수도 있습니다.

자세한 내용은 [이벤트 쿼리](../../toolbox/events-query/)를 참조하십시오.

## 설치 전 이벤트 활성화

### 리눅스에 설치하기

Linux에 Super Kubenetes의 멀티 노드를 설치할 때, 모든 Super Kubenetes 컴포넌트를 열거하는 설정 파일을 생성해야 합니다.

1. [Linux에 Super Kubenetes 설치하기](../../installing-on-linux/introduction/multioverview/) 튜토리얼에서, 기본 파일인 `config-sample.yaml`을 생성합니다. 그리고 다음 명령을 실행하여 파일을 수정하세요:

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>vi config-sample.yaml</code>
        </div>
    </pre>
  </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      [All-in-One Installation](../../quick-start/all-in-one-on-linux/)을 채택하면 클러스터를 직접 생성할 수 있으므로 'config-sample.snmpl' 파일을 생성할 필요가 없습니다. 일반적으로 올인원 모드는 Super Kubenetes를 처음 사용하고 시스템에 익숙해지기를 원하는 사용자를 위한 것입니다. 이 모드에서 이벤트를 활성화하려면(예를 들어, 테스트 목적으로) [다음 섹션]((#enable-events-after-installation)을 참조하여 [설치 후 이벤트를 활성화하는 방법] ((#enable-events-after-installation)을 확인하세요.
    </div>
  </div>

2. 이 파일에서 `events`로 이동하여 `enabled`에 대해 `false`를 `true`로 변경하세요. 완료 후 파일을 저장하세요.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
            <p>
                <span style="color:#f92672">events</span>:
                  <span style="color:#f92672">enabled</span>: <span style="color:#66d9ef">true</span> <span style="color:#75715e">&nbsp;#</span><span style="color:#75715e">&nbsp;Change "false" to "true".</span>
            </p>
          </code>
        </div>
    </pre>
  </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      기본적으로 KubeKey는 이벤트가 활성화된 경우 내부적으로 Elasticsearch를 설치합니다. 운영환경에서는, (특히 `externalElasticsearchUrl`와 `externalElasticsearchPort` 같은) 이벤트를 활성화하고자 한다면, `config-sample.yaml`에 아래 값들을 설정하는 것을 강력히 추천합니다. 설치 전에 아래 정보를 제공하면, KubeKey가 내부 Elasticsearch를 설치하는 대신 외부 Elasticsearch를 바로 통합할 것입니다.
    </div>
  </div>

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
            <span style="color:#f92672">es</span>:<span style="color:#75715e">&nbsp;&nbsp;#&nbsp;</span><span style="color:#75715e">Storage backend for logging, tracing, events and auditing.</span> 
            <span style="color:#f92672">&nbsp;&nbsp;elasticsearchMasterReplicas</span>: <span style="color:#ae81ff">1</span><span style="color:#75715e">&nbsp;&nbsp;&nbsp;#&nbsp;</span><span style="color:#75715e">The total number of master nodes. Even numbers are not allowed.</span> 
            <span style="color:#f92672">&nbsp;&nbsp;elasticsearchDataReplicas</span>: <span style="color:#ae81ff">1</span><span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#&nbsp;</span><span style="color:#75715e">The total number of data nodes.</span> 
            <span style="color:#f92672">&nbsp;&nbsp;elasticsearchMasterVolumeSize</span>: <span style="color:#ae81ff">4Gi</span><span style="color:#75715e">&nbsp;&nbsp;&nbsp;#&nbsp;</span><span style="color:#75715e">The volume size of Elasticsearch master nodes.</span> 
            <span style="color:#f92672">&nbsp;&nbsp;elasticsearchDataVolumeSize</span>: <span style="color:#ae81ff">20Gi</span><span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;#&nbsp;</span><span style="color:#75715e">The volume size of Elasticsearch data nodes.</span> 
            <span style="color:#f92672">&nbsp;&nbsp;logMaxAge</span>: <span style="color:#ae81ff">7</span><span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#&nbsp;</span><span style="color:#75715e">Log retention day in built-in Elasticsearch. It is 7 days by default.</span> 
            <span style="color:#f92672">&nbsp;&nbsp;elkPrefix</span>: <span style="color:#ae81ff">logstash</span><span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#&nbsp;</span><span style="color:#75715e">The string making up index names. The index name will be formatted as ks-&lt;elk_prefix&gt;-log.</span> 
            <span style="color:#f92672">&nbsp;&nbsp;externalElasticsearchHost</span>:<span style="color:#75715e">&nbsp;#&nbsp;</span><span style="color:#75715e">The Host of external Elasticsearch.</span> 
            <span style="color:#f92672">&nbsp;&nbsp;externalElasticsearchPort</span>:<span style="color:#75715e">&nbsp;#&nbsp;</span><span style="color:#75715e">The port of external Elasticsearch.</span>
          </code>
        </div>
    </pre>
  </article>

3. 설정 파일을 사용하여 클러스터를 생성하세요:

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>./kk create cluster -f config-sample.yaml</code>
        </div>
    </pre>
  </article>

### 쿠버네티스에 설치

[쿠버네티스에 Super Kubenetes를 설치](../../installing-on-kubernetes/introduction/overview/)할 때 [cluster-configuration.yaml](https://github.com/Super Kubenetes/ks-installer/releases/download/v3.3.0/cluster-configuration.yaml) 파일에서 먼저 이벤트를 활성화할 수 있습니다.

1. [cluster-configuration.yaml](https://github.com/Super Kubenetes/ks-installer/releases/download/v3.3.0/cluster-configuration.yaml) 파일을 다운로드하여 수정하세요.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>vi cluster-configuration.yaml</code>
        </div>
    </pre>
  </article>

2. 이 로컬 `cluster-configuration.yaml` 파일에서 `events`로 이동하고 `enabled`에 대해 `false`를 `true`로 변경하여 이벤트를 활성화하세요. 완료 후 파일을 저장하세요.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
            <p>
                <span style="color:#f92672">events</span>:
                  <span style="color:#f92672">enabled</span>: <span style="color:#66d9ef">true</span> <span style="color:#75715e">&nbsp;#</span><span style="color:#75715e">&nbsp;Change "false" to "true".</span>
            </p>
          </code>
        </div>
    </pre>
  </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      기본적으로 KubeKey는 이벤트가 활성화된 경우 내부적으로 Elasticsearch를 설치합니다. 운영환경에서는, (특히 `externalElasticsearchUrl`와 `externalElasticsearchPort` 같은) 이벤트를 활성화하고자 한다면, `config-sample.yaml`에 아래 값들을 설정하는 것을 강력히 추천합니다. 설치 전에 아래 정보를 제공하면, KubeKey가 내부 Elasticsearch를 설치하는 대신 외부 Elasticsearch를 바로 통합할 것입니다.
    </div>
  </div>

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
            <span style="color:#f92672">es</span>:<span style="color:#75715e">&nbsp;&nbsp;#&nbsp;</span><span style="color:#75715e">Storage backend for logging, tracing, events and auditing.</span> 
            <span style="color:#f92672">&nbsp;&nbsp;elasticsearchMasterReplicas</span>: <span style="color:#ae81ff">1</span><span style="color:#75715e">&nbsp;&nbsp;&nbsp;#&nbsp;</span><span style="color:#75715e">The total number of master nodes. Even numbers are not allowed.</span> 
            <span style="color:#f92672">&nbsp;&nbsp;elasticsearchDataReplicas</span>: <span style="color:#ae81ff">1</span><span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#&nbsp;</span><span style="color:#75715e">The total number of data nodes.</span> 
            <span style="color:#f92672">&nbsp;&nbsp;elasticsearchMasterVolumeSize</span>: <span style="color:#ae81ff">4Gi</span><span style="color:#75715e">&nbsp;&nbsp;&nbsp;#&nbsp;</span><span style="color:#75715e">The volume size of Elasticsearch master nodes.</span> 
            <span style="color:#f92672">&nbsp;&nbsp;elasticsearchDataVolumeSize</span>: <span style="color:#ae81ff">20Gi</span><span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;#&nbsp;</span><span style="color:#75715e">The volume size of Elasticsearch data nodes.</span> 
            <span style="color:#f92672">&nbsp;&nbsp;logMaxAge</span>: <span style="color:#ae81ff">7</span><span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#&nbsp;</span><span style="color:#75715e">Log retention day in built-in Elasticsearch. It is 7 days by default.</span> 
            <span style="color:#f92672">&nbsp;&nbsp;elkPrefix</span>: <span style="color:#ae81ff">logstash</span><span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#&nbsp;</span><span style="color:#75715e">The string making up index names. The index name will be formatted as ks-&lt;elk_prefix&gt;-log.</span> 
            <span style="color:#f92672">&nbsp;&nbsp;externalElasticsearchHost</span>:<span style="color:#75715e">&nbsp;#&nbsp;</span><span style="color:#75715e">The Host of external Elasticsearch.</span> 
            <span style="color:#f92672">&nbsp;&nbsp;externalElasticsearchPort</span>:<span style="color:#75715e">&nbsp;#&nbsp;</span><span style="color:#75715e">The port of external Elasticsearch.</span>
          </code>
        </div>
    </pre>
  </article>

3. 다음 명령을 실행하여 설치를 시작하세요:

  <article className="highlight">
    <pre>
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

## 설치 후 이벤트를 활성화하는 방법

1. 콘솔에 `admin`으로 로그인하세요. 좌측 상단 모서리에서 **플랫폼**을 클릭하고 **클러스터 관리**를 선택하세요.

2. **CRD**를 클릭하고 검색창에 `clusterconfiguration`을 입력합니다. 세부 정보 페이지를 보기 위해 결과를 클릭하세요.

  <div className="notices info">
    <p>Info</p>
    <div>
      사용자 지정 리소스 정의(CRD)를 사용하면 다른 API 서버를 추가하지 않고도 새로운 유형의 리소스를 생성할 수 있습니다. 다른 기본 쿠버네티스 오브젝트와 마찬가지로 이러한 리소스를 사용할 수 있습니다. 
    </div>
  </div>

3. **사용자 지정 리소스**에서 <img src="/dist/assets/docs/v3.3/enable-pluggable-components/Super Kubenetes-alerting/three-dots.png" height="20px">를 클릭하세요. `ks-installer` 오른쪽에서 **YAML 편집**을 선택하세요.

4. 이 YAML 파일에서 `events`로 이동하여 `enabled`에 대해 `false`를 `true`로 변경하세요. 완료한 후 오른쪽 하단의 **확인**을 클릭하여 설정을 저장하세요.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
            <p>
                <span style="color:#f92672">events</span>:
                  <span style="color:#f92672">enabled</span>: <span style="color:#66d9ef">true</span> <span style="color:#75715e">&nbsp;#</span><span style="color:#75715e">&nbsp;Change "false" to "true".</span>
            </p>
          </code>
        </div>
    </pre>
  </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      기본적으로 KubeKey는 이벤트가 활성화된 경우 내부적으로 Elasticsearch를 설치합니다. 운영환경에서는, (특히 `externalElasticsearchUrl`와 `externalElasticsearchPort` 같은) 이벤트를 활성화하고자 한다면, `config-sample.yaml`에 아래 값들을 설정하는 것을 강력히 추천합니다. 설치 전에 아래 정보를 제공하면, KubeKey가 내부 Elasticsearch를 설치하는 대신 외부 Elasticsearch를 바로 통합할 것입니다.
    </div>
  </div>

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
            <span style="color:#f92672">es</span>:<span style="color:#75715e">&nbsp;&nbsp;#&nbsp;</span><span style="color:#75715e">Storage backend for logging, tracing, events and auditing.</span> 
            <span style="color:#f92672">&nbsp;&nbsp;elasticsearchMasterReplicas</span>: <span style="color:#ae81ff">1</span><span style="color:#75715e">&nbsp;&nbsp;&nbsp;#&nbsp;</span><span style="color:#75715e">The total number of master nodes. Even numbers are not allowed.</span> 
            <span style="color:#f92672">&nbsp;&nbsp;elasticsearchDataReplicas</span>: <span style="color:#ae81ff">1</span><span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#&nbsp;</span><span style="color:#75715e">The total number of data nodes.</span> 
            <span style="color:#f92672">&nbsp;&nbsp;elasticsearchMasterVolumeSize</span>: <span style="color:#ae81ff">4Gi</span><span style="color:#75715e">&nbsp;&nbsp;&nbsp;#&nbsp;</span><span style="color:#75715e">The volume size of Elasticsearch master nodes.</span> 
            <span style="color:#f92672">&nbsp;&nbsp;elasticsearchDataVolumeSize</span>: <span style="color:#ae81ff">20Gi</span><span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;#&nbsp;</span><span style="color:#75715e">The volume size of Elasticsearch data nodes.</span> 
            <span style="color:#f92672">&nbsp;&nbsp;logMaxAge</span>: <span style="color:#ae81ff">7</span><span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#&nbsp;</span><span style="color:#75715e">Log retention day in built-in Elasticsearch. It is 7 days by default.</span> 
            <span style="color:#f92672">&nbsp;&nbsp;elkPrefix</span>: <span style="color:#ae81ff">logstash</span><span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#&nbsp;</span><span style="color:#75715e">The string making up index names. The index name will be formatted as ks-&lt;elk_prefix&gt;-log.</span> 
            <span style="color:#f92672">&nbsp;&nbsp;externalElasticsearchHost</span>:<span style="color:#75715e">&nbsp;#&nbsp;</span><span style="color:#75715e">The Host of external Elasticsearch.</span> 
            <span style="color:#f92672">&nbsp;&nbsp;externalElasticsearchPort</span>:<span style="color:#75715e">&nbsp;#&nbsp;</span><span style="color:#75715e">The port of external Elasticsearch.</span>
          </code>
        </div>
    </pre>
  </article>

5. web kubectl을 사용하여 다음 명령을 실행면 설치 프로세스를 확인할 수 있습니다:

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>kubectl logs -n Super Kubenetes-system <span style="color:#66d9ef">$(</span>kubectl get pod -n Super Kubenetes-system -l <span style="color:#e6db74">'app in (ks-install, ks-installer)'</span> -o jsonpath<span style="color:#f92672">=</span><span style="color:#e6db74">'{.items[0].metadata.name}'</span><span style="color:#66d9ef">)</span> -f</code>
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
			좌측 하단의 <b>툴박스</b>에서 <b>리소스 이벤트 검색</b> 기능을 사용할 수 있는지 확인하십시오.
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
						<code>kubectl get pod -n Super Kubenetes-logging-system </code>
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
            <code">NAME                                          READY   STATUS    RESTARTS   AGE
            elasticsearch-logging-data-0                  1/1     Running   <span style="color:#ae81ff">0</span>          155m
            elasticsearch-logging-data-1                  1/1     Running   <span style="color:#ae81ff">0</span>          154m
            elasticsearch-logging-discovery-0             1/1     Running   <span style="color:#ae81ff">0</span>          155m
            fluent-bit-bsw6p                              1/1     Running   <span style="color:#ae81ff">0</span>          108m
            fluent-bit-smb65                              1/1     Running   <span style="color:#ae81ff">0</span>          108m
            fluent-bit-zdz8b                              1/1     Running   <span style="color:#ae81ff">0</span>          108m
            fluentbit-operator-9b69495b-bbx54             1/1     Running   <span style="color:#ae81ff">0</span>          109m
            ks-events-exporter-5cb959c74b-gx4hw           2/2     Running   <span style="color:#ae81ff">0</span>          7m55s
            ks-events-operator-7d46fcccc9-4mdzv           1/1     Running   <span style="color:#ae81ff">0</span>          8m
            ks-events-ruler-8445457946-cl529              2/2     Running   <span style="color:#ae81ff">0</span>          7m55s
            ks-events-ruler-8445457946-gzlm9              2/2     Running   <span style="color:#ae81ff">0</span>          7m55s
            logsidecar-injector-deploy-667c6c9579-cs4t6   2/2     Running   <span style="color:#ae81ff">0</span>          106m
            logsidecar-injector-deploy-667c6c9579-klnmf   2/2     Running   <span style="color:#ae81ff">0</span>          106m
            </code>
					</div>
				</pre>
			</article>
		</main>
	</div>
</main>

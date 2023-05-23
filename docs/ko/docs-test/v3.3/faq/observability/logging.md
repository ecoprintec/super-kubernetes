---
title: "가시성 - 로깅 FAQ"
keywords: "Kubernetes, Elasticsearch, Super Kubenetes, Logging, logs"
description: "Questions asked frequently about the logging functionality."
linkTitle: "Logging"
weight: 16310
---

이 페이지는 로깅에 대해 자주 묻는 질문들을 담고 있습니다.

- [로그 저장소를 외부 Elasticsearch로 변경하고 내부 Elasticsearch를 종료하는 방법](#로그-저장소를-외부-Elasticsearch로-변경하고-내부-Elasticsearch를-종료하는-방법)
- [X-Pack Security가 활성화된 상태에서 로그 저장소를 Elasticsearch로 변경하는 방법](#X-Pack-Security가-활성화된-상태에서-로그-저장소를-Elasticsearch로-변경하는-방법)
- [로그, 이벤트, 감사 로그, Istio 로그의 데이터 보존 기간 설정 방법](#로그,-이벤트,-감사-로그,-Istio-로그의-데이터-보존-기간-설정-방법)
- [툴박스를 사용시, 일부 노드 상의 워크로드에서 로그를 찾을 수 없음](#툴박스를-사용시,-일부-노드-상의-워크로드에서-로그를-찾을-수-없음)
- [툴박스의 로그 검색 페이지가 로드 중 멈춤](#툴박스의-로그-검색-페이지가-로드-중-멈춤)
- [툴박스에 오늘 로그 기록이 표시되지 않음](#툴박스에-오늘-로그-기록이-표시되지-않음)
- [툴박스에서 로그를 볼 때 내부 서버 오류가 발생](#툴박스에서-로그를-볼-때-내부-서버-오류가-발생)
- [Super Kubenetes가 특정 워크로드의 로그만 수집하도록 하는 방법](#Super Kubenetes가-특정-워크로드의-로그만-수집하도록-하는-방법)

## 로그 저장소를 외부 Elasticsearch로 변경하고 내부 Elasticsearch를 종료하는 방법

Super Kubenetes 내부 Elasticsearch를 사용 중인데 이를 외부 대체제로 변경하고 싶다면 아래 단계를 따르십시오. 로깅 시스템을 활성화하지 않았다면 [Super Kubenetes 로깅 시스템](../../../pluggable-components/logging/)을 참조하여 외부 Elasticsearch를 직접 설정하십시오.

1. 먼저 KubeKey 구성을 업데이트해야 합니다. 다음 명령을 실행하세요.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  kubectl edit cc -n Super Kubenetes-system ks-installer
               </p>
            </code>
         </div>
      </pre>
   </article>

2. `es.elasticsearchDataXXX`, `es.elasticsearchMasterXXX` 및 `status.logging`을 주석 처리 하세요. 그리고 `es.externalElasticsearchUrl`을 자신의 Elasticsearch의 주소로 설정하고 `es.externalElasticsearchPort`를 해당 포트 번호로 설정하세요. 
아래는 참고용 예시입니다.

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              <span style="color:#f92672">apiVersion</span>: <span style="color:#ae81ff">installer.Super Kubenetes.io/v1alpha1</span> 
              <span style="color:#f92672">kind</span>: <span style="color:#ae81ff">ClusterConfiguration</span> 
              <span style="color:#f92672">metadata</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">ks-installer</span> 
              <span style="color:#f92672">&nbsp;&nbsp;namespace</span>: <span style="color:#ae81ff">n Super Kubenetes-system</span> 
              <span style="color:#ae81ff">&nbsp;&nbsp;...</span> 
              <span style="color:#f92672">spec</span>: 
              <span style="color:#ae81ff">&nbsp;&nbsp;...</span> 
              <span style="color:#f92672">&nbsp;&nbsp;common</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;es</span>:  <span style="color:#75715e"><span>#</span> Storage backend for logging, events and auditing.</span> <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> master:</span> 
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span>   volumeSize: 4Gi  <span>#</span> The volume size of Elasticsearch master nodes.</span> 
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span>   replicas: 1      <span>#</span> The total number of master nodes. Even numbers are not allowed.</span> 
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span>   resources: {}</span> 
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> data:</span> 
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span>   volumeSize: 20Gi  <span>#</span> The volume size of Elasticsearch data nodes.</span> 
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span>   replicas: 1       <span>#</span> The total number of data nodes.</span> 
              <span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span>   resources: {}</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;elkPrefix</span>: <span style="color:#ae81ff">logstash</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;logMaxAge</span>: <span style="color:#ae81ff">7</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;externalElasticsearchHost</span>: <span style="color:#ae81ff">&lt;192.168.0.2&gt;</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;externalElasticsearchPort</span>: <span style="color:#ae81ff">&lt;9200&gt;</span> 
              <span style="color:#ae81ff">&nbsp;&nbsp;...</span> 
              <span style="color:#f92672">status</span>: 
              <span style="color:#ae81ff">&nbsp;&nbsp;...</span> 
              <span style="color:#75715e">&nbsp;&nbsp;<span>#</span> logging:</span> 
              <span style="color:#75715e">&nbsp;&nbsp;<span>#</span>  enabledTime: 2020-08-10T02:05:13UTC</span> 
              <span style="color:#75715e">&nbsp;&nbsp;<span>#</span>  status: enabled</span> 
              <span style="color:#ae81ff">&nbsp;&nbsp;...</span> 
            </p>
        </code>
      </div>
  </pre>
</article>

3. `ks-installer`를 재실행하세요.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  kubectl rollout restart deploy -n Super Kubenetes-system ks-installer
               </p>
            </code>
         </div>
      </pre>
   </article>

4. 다음 명령을 실행하여 내부 Elasticsearch를 제거하세요. 내부 Elasticsearch에 데이터를 백업했는지 꼭 확인하십시오.

   <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  helm uninstall -n Super Kubenetes-logging-system elasticsearch-logging
               </p>
            </code>
         </div>
      </pre>
   </article>
   
5. Istio가 활성화된 경우, Jaeger의 설정을 변경하세요.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
              <p>
                <span style="color:#ae81ff">$ kubectl -n istio-system edit jaeger </span> 
                ... 
                <span style="color:#f92672">&nbsp;options</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;es</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;index-prefix</span>: <span style="color:#ae81ff">logstash</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;server-urls</span>: <span style="color:#ae81ff"><span></span>http://elasticsearch-logging-data.Super Kubenetes-logging-system.svc:9200 <span></span></span> <span style="color:#75715e"><span>&nbsp;#</span> Change it to the external address.</span>
              </p>
          </code>
        </div>
    </pre>
  </article>

## X-Pack Security가 활성화된 상태에서 로그 저장소를 Elasticsearch로 변경하는 방법

현재 Super Kubenetes는 X-Pack Security가 활성화된 상태에서 Elasticsearch의 통합을 지원하지 않습니다. 이 기능은 곧 제공될 예정입니다.

## 로그, 이벤트, 감사 로그, Istio 로그의 데이터 보존 기간 설정 방법

Super Kubenetes v3.3.0 이전에는 기본적으로 로그의 보존 기간만 설정할 수 있었습니다(기본값은 7일). 하지만 Super Kubenetes v3.3.0에서는 로그 외에 이벤트, 감사 로그, Istio 로그의 데이터 보존 기간도 설정할 수 있습니다.

KubeKey 설정을 업데이트하려면 다음을 수행하십시오.

1. 다음 명령을 실행하세요:

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
              <p>
                kubectl edit cc -n Super Kubenetes-system ks-installer
              </p>
          </code>
        </div>
    </pre>
  </article>

2. YAML 파일에서, 로그의 보관 기간만 변경하고 싶다면 곧바로 `logMaxAge`의 기본값을 원하는 값으로 변경할 수 있습니다. 이벤트, 감사 로그, Istio 로그의 보관 기간을 설정하려면 아래 예시와 같이 `auditingMaxAge`, `eventMaxAge`, `istioMaxAge` 파라미터를 추가하고 각각 값을 설정하세요.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
              <p>
                <span style="color:#f92672">apiVersion</span>: <span style="color:#ae81ff">installer.Super Kubenetes.io/v1alpha1</span> 
                <span style="color:#f92672">kind</span>: <span style="color:#ae81ff">ClusterConfiguration</span> 
                <span style="color:#f92672">metadata</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">ks-installer</span> 
                <span style="color:#f92672">&nbsp;&nbsp;namespace</span>: <span style="color:#ae81ff">Super Kubenetes-system</span> 
                <span style="color:#ae81ff">&nbsp;&nbsp;...</span> 
                <span style="color:#f92672">spec</span>: 
                <span style="color:#ae81ff">&nbsp;&nbsp;...</span> 
                <span style="color:#f92672">&nbsp;&nbsp;common</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;es</span>:   <span style="color:#75715e"><span>#</span> Storage backend for logging, events and auditing.</span> <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;logMaxAge</span>: <span style="color:#ae81ff">7</span><span style="color:#75715e">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>#</span> Log retention time in built-in Elasticsearch. It is 7 days by default.</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;auditingMaxAge</span>: <span style="color:#ae81ff">2</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;eventMaxAge</span>: <span style="color:#ae81ff">1</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;istioMaxAge</span>: <span style="color:#ae81ff">4</span> 
                <span style="color:#ae81ff">&nbsp;&nbsp;...</span> 
              </p>
          </code>
        </div>
    </pre>
  </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      이벤트, 감사 로그, Istio 로그의 보관 기간을 별도로 설정하지 않으면, 기본값으로 `logMaxAge`가 사용됩니다.
    </div>
  </div>

3. YAML 파일에서 `es` 파라미터를 삭제하고 저장하면 ks-installer가 자동으로 재시작되어 변경 사항이 적용됩니다.

  <article className="highlight">
    <pre>
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
              <p>
                <span style="color:#f92672">apiVersion</span>: <span style="color:#ae81ff">installer.Super Kubenetes.io/v1alpha1</span> 
                <span style="color:#f92672">kind</span>: <span style="color:#ae81ff">ClusterConfiguration</span> 
                <span style="color:#f92672">metadata</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">ks-installer</span> 
                <span style="color:#f92672">&nbsp;&nbsp;namespace</span>: <span style="color:#ae81ff">Super Kubenetes-system</span> 
                ... 
                <span style="color:#f92672">status</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;alerting</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;enabledTime</span>: <span style="color:#e6db74">2022-08-11T06:22:01</span><span style="color:#ae81ff">UTC</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;status</span>: <span style="color:#ae81ff">enabled</span> 
                <span style="color:#ae81ff">&nbsp;&nbsp;...</span> 
                <span style="color:#f92672">&nbsp;&nbsp;es</span>:   <span style="color:#75715e"><span>#</span> delete this line.</span> <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;enabledTime</span>: <span style="color:#e6db74">2022-08-11T06:22:01</span><span style="color:#ae81ff">UTC   </span> <span style="color:#75715e"><span>&nbsp;#</span> delete this line.</span> <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;status</span>: <span style="color:#ae81ff">enabled  </span> <span style="color:#75715e"><span>&nbsp;#</span> delete this line.</span>
              </p>
          </code>
        </div>
    </pre>
  </article>

## 툴박스를 사용시, 일부 노드 상의 워크로드에서 로그를 찾을 수 없음

Super Kubenetes가 [멀티 노드 설치](../../../installing-on-linux/introduction/multioverview/)를 통해 배포되었고 그리고 docker 루트 디렉터리에 대한 심볼릭 링크를 사용중인 경우, 모든 노드가 동일한 경로를 따르는지 확인하십시오. 로깅 에이전트는 데몬셋에서 노드에 배포되어야 합니다. 컨테이너 로그 경로가 불일치하여 해당 노드에서 로그 수집이 실패할 수 있습니다.

노드 상에서 docker의 루트 디렉터리 경로를 찾으려면 다음 명령을 실행하세요. 모든 노드에 동일한 값이 적용되는지 확인하십시오.

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              docker info -f <span style="color:#e6db74">'{{.DockerRootDir}}'</span>
            </p>
        </code>
      </div>
  </pre>
</article>

## 툴박스의 로그 검색 페이지가 로드 중 멈춤

로딩 중에 로그 검색 페이지가 멈추면 사용 중인 스토리지 시스템을 확인하십시오. 예를 들어, 잘못 설정된 NFS 스토리지 시스템이 이 문제를 유발할 수 있습니다.

## 툴박스에 오늘 로그 기록이 표시되지 않음

로그 용량이 Elasticsearch의 스토리지 제한을 초과하는지 확인하십시오. 만약 그렇다면 Elasticsearch 디스크 볼륨을 늘려야 합니다.

## 툴박스에서 로그를 볼 때 내부 서버 오류가 발생

이 문제에는 여러 가지 이유가 있을 수 있습니다.

- 네트워크 파티션
- 잘못된 Elasticsearch 호스트 및 포트
- Elasticsearch의 헬스 상태가 빨간색일 때.

## Super Kubenetes가 특정 워크로드의 로그만 수집하도록 하는 방법

Super Kubenetes 로깅 에이전트는 Fluent Bit로 구동됩니다. 특정 워크로드 로그를 제외하려면 Fluent Bit 구성을 업데이트해야 합니다. Fluent Bit 입력 구성을 수정하려면 다음 명령을 실행하십시오:

<article className="highlight">
  <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              kubectl edit input -n Super Kubenetes-logging-system tail
            </p>
        </code>
      </div>
  </pre>
</article>

`Input.Spec.Tail.ExcludePath` 영역을 업데이트하세요. 
예를 들어, 시스템 컴포넌트에서의 로그를 제외하려면, 경로를 `/var/log/containers/*_kube*-system_*.log`로 설정해야 합니다.
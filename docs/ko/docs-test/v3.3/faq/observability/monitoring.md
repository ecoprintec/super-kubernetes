---
title: "가시성 — 모니터링 FAQ"
keywords: "Kubernetes, Prometheus, Super Kubenetes, Monitoring"
description: "Questions asked frequently about the monitoring functionality."
linkTitle: "Monitoring"
weight: 16320
---

이 페이지는 모니터링에 대해 자주 묻는 질문들을 담고 있습니다.

- [Super Kubenetes에서 Prometheus 콘솔에 액세스하는 방법](#Super Kubenetes에서-Prometheus-콘솔에-액세스하는-방법)
- [Node Exporter로 인한 호스트 포트 9100 충돌](#node-exporter로-인한-호스트-포트-9100-충돌)
- [기존의 prometheus operator와 충돌](#기존의-prometheus-operator와-충돌)
- [모니터링 데이터 보유 기간 변경 방법](#모니터링-데이터-보유-기간-변경-방법])
- [kube-scheduler 및 kube-controller-manager에 대한 모니터링 데이터 없음](#kube-scheduler-및-kube-controller-manager에-대한-모니터링-데이터-없음)
- [최근 몇 분간의 모니터링 데이터 없음](#최근-몇-분간의-모니터링-데이터-없음)
- [노드와 컨트롤 플레인 모두에 대한 모니터링 데이터 없음](#노드와-컨트롤-플레인-모두에-대한-모니터링-데이터-없음)
- [Prometheus가 생성한 오류 로그: 저장소 열기 실패, 해당 파일 또는 디렉터리 없음](#Prometheus가-생성한-오류-로그:-저장소-열기-실패,-해당-파일-또는-디렉터리-없음)

## Super Kubenetes에서 Prometheus 콘솔에 액세스하는 방법

Super Kubenetes 모니터링 엔진은 Prometheus에 의해 구동됩니다. 디버깅을 하려면 NodePort를 통해 내장 Prometheus 서비스에 접속해야 합니다. 다음 명령을 실행하여 서비스 유형을 `NodePort`로 변경하세요:

<article className="highlight">
   <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
         <code>
            <p>
               kubectl edit svc -n Super Kubenetes-monitoring-system prometheus-k8s
            </p>
         </code>
      </div>
   </pre>
</article>

<div className="notices note">
  <p>Note</p>
  <div>
    Prometheus 콘솔에 액세스하려면 자신의 환경에 따라, 관련 포트를 열고 포트 포워딩 규칙을 설정해야 할 수 있습니다.
  </div>
</div>


## Node Exporter로 인한 호스트 포트 9100 충돌

호스트 포트 9100을 차지하는 다른 프로세스가 있는 경우 `Super Kubenetes-monitoring-system`의 node exporter가 충돌할 것입니다. 충돌을 해결하려면 그 프로세스를 종료하거나 또는 다른 사용 가능한 포트를 node exporter에 할당해야 합니다.

다른 호스트 포트를, 예를 들어 `29100`와 같은 포트를, 할당하려면 다음 명령을 실행하고 `9100`을 모두 `29100`으로 바꿉니다 (총 5곳을 변경해야 함).

<article className="highlight">
   <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
         <code>
            <p>
               kubectl edit ds -n Super Kubenetes-monitoring-system node-exporter
            </p>
         </code>
      </div>
   </pre>
</article>

<article className="highlight">
   <pre>
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
         <code>
            <p>
               <span style="color:#f92672">apiVersion</span>: <span style="color:#ae81ff">apps/v1</span> 
               <span style="color:#f92672">kind</span>: <span style="color:#ae81ff">DaemonSet</span> 
               <span style="color:#f92672">metadata</span>: 
               <span style="color:#f92672">&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">node-exporter</span> 
               <span style="color:#f92672">&nbsp;&nbsp;namespace</span>: <span style="color:#ae81ff">Super Kubenetes-monitoring-system</span> 
               <span style="color:#ae81ff">&nbsp;&nbsp;...</span> 
               <span style="color:#f92672">spec</span>: 
               <span style="color:#ae81ff">&nbsp;&nbsp;...</span> 
               <span style="color:#f92672">&nbsp;&nbsp;template</span>: 
               <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;...</span> 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;spec</span>: 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;containers</span>: 
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#f92672">name</span>: <span style="color:#ae81ff">node-exporter</span> 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;image</span>: <span style="color:#ae81ff">Super Kubenetes/node-exporter:ks-v0.18.1</span> 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;args</span>: 
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- --<span style="color:#ae81ff">web.listen-address=127.0.0.1:9100</span> 
               <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...</span> 
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#f92672">name</span>: <span style="color:#ae81ff">kube-rbac-proxy</span> 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;image</span>: <span style="color:#ae81ff">Super Kubenetes/kube-rbac-proxy:v0.4.1</span> 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;args</span>: 
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- --<span style="color:#ae81ff">logtostderr</span> 
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- --<span style="color:#ae81ff">secure-listen-address=<span>[</span>$(IP)]:9100</span> 
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- --<span style="color:#ae81ff"><span></span>upstream=http://127.0.0.1:9100/<span></span></span> 
               <span style="color:#ae81ff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...</span> 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ports</span>: 
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- <span style="color:#f92672">containerPort</span>: <span style="color:#ae81ff">9100</span> 
               <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;hostPort</span>: <span style="color:#ae81ff">9100</span> 
               <span style="color:#ae81ff">...</span>
            </p>
         </code>
      </div>
   </pre>
</article>

## 기존의 prometheus operator와 충돌

Prometheus Operator를 직접 배포했을 경우에는 이것이 제거되었는지 Super Kubenetes를 설치하기 전에 확인하십시오. 그렇지 않으면 Super Kubenetes에 내장된 Prometheus Operator가 중복된 ServiceMonitor 개체를 선택하는 충돌이 생길 수 있습니다.

## 모니터링 데이터 보유 기간 변경 방법

최대 보존 기간을 편집하려면 다음 명령어를 실행하십시오.  `retention` 영역으로 이동하여 원하는 보관 기간을 설정하세요. (기본값은 `7d`)

<article className="highlight">
   <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
         <code>
            <p>
               kubectl edit prometheuses -n Super Kubenetes-monitoring-system k8s
            </p>
         </code>
      </div>
   </pre>
</article>

## kube-scheduler 및 kube-controller-manager에 대한 모니터링 데이터 없음

첫째, `--bind-address` 플래그가 `127.0.0.1`이 아닌 `0.0.0.0` (기본값)으로 설정되어 있는지 확인하세요. 다른 호스트에서 Prometheus가 이런 컴포넌트에 접속해야 할 수 있습니다.

둘째, `kube-scheduler`와 `kube-controller-manager`에 대한 엔트포인트 오브젝트가 존재하는지 확인하세요. 만약 누락된 경우엔, 서비스를 생성하고 대상 파드를 선택하여 엔트포인트 오브젝트를 수동으로 생성하십시오.

<article className="highlight">
   <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
         <code>
            <p>
               kubectl get ep -n kube-system | grep -E <span style="color:#e6db74">'kube-scheduler|kube-controller-manager'</span>
            </p>
         </code>
      </div>
   </pre>
</article>

## 최근 몇 분간의 모니터링 데이터 없음

컴퓨터 브라우저의 로컬 시계가 인터넷 시간 및 사용자의 클러스터와 동기화되어 있는지 확인하십시오. 시간 차이로 인해 이 문제가 발생할 수 있습니다. 이것은 특히 컴퓨터가 인트라넷에 있는 경우 발생할 수 있습니다.

## 노드와 컨트롤 플레인 모두에 대한 모니터링 데이터 없음

네트워크 플러그인을 확인하고, 호스트와 파드 네트워크 CIDR 간에 IP 풀이 겹치지 않는지 확인하세요. [KubeKey]()로 Kubernetes를 설치하는 것을 추천합니다.

## Prometheus가 생성한 오류 로그: 저장소 열기 실패, 해당 파일 또는 디렉터리 없음

`Super Kubenetes-monitoring-system`의 Prometheus 파드가 충돌을 일으켜 다음 오류 로그를 생성하는 경우에는, Prometheus 데이터가 손상되었을 수 있으며, 복구를 위해 이것을 수동으로 삭제해야 합니다.

<article className="highlight">
   <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
         <code>
            <p>
               level<span style="color:#f92672">=</span>error ts<span style="color:#f92672">=</span>2020-10-14T17:43:30.485Z caller<span style="color:#f92672">=</span>main.go:764 err<span style="color:#f92672">=</span><span style="color:#e6db74">"opening storage failed: block dir: "/prometheus/01EM0016F8FB33J63RNHFMHK3\": open /prometheus/01EM0016F8FB33J63RNHFMHK3/meta.json: no such file or directory"</span>
            </p>
         </code>
      </div>
   </pre>
</article>

Prometheus 파드로 실행하세요 (가능할 경우). 그리고 블록 디렉토리 `/prometheus/01EM0016F8FB33J63RNHFMHK3`을 제거하세요.:

<article className="highlight">
   <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
         <code>
            <p>
               <span>kubectl exec -it -n Super Kubenetes-monitoring-system prometheus-k8s-0 -c prometheus sh</span> 
               <span></span> 
               <span>rm -rf 01EM0016F8FB33J63RNHFMHK3/</span>
            </p>
         </code>
      </div>
   </pre>
</article>

아니면, Prometheus PVC에 바인딩된 영구 볼륨에서 위의 디렉터리를 간단히 삭제할 수 있습니다.

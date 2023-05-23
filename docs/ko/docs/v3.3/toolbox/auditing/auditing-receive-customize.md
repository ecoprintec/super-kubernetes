---
title: "감사 로그 수신 및 사용자 정의"
keywords: 'Kubernetes, Super Kubenetes, auditing, log, customize, receive'
description: 'Learn how to receive and customize auditing logs.'
linkTitle: 'Receive and Customize Auditing Logs'
weight: 15310
---

Super Kubenetes 감사 로그는 개별 사용자, 관리자 또는 시스템의 다른 컴포넌트가 시스템에 영향을 준 일련의 활동을 문서화하는 보안과 관련된 시간별 기록 세트를 제공합니다. Super Kubenetes에 대한 각 요청은 웹훅에 기록되고 특정 규칙에 따라 처리되는 이벤트를 생성합니다. 이벤트는 무시되거나, 저장되거나, 또는 다른 규칙에 따라 경고를 생성합니다.

## Super Kubenetes 감사 로그 활성화

감사 로그를 활성화하려면 [Super Kubenetes 감사 로그](../../../pluggable-components/auditing-logs/)를 참조하세요.

## Super Kubenetes에서 감사 로그 받기

Super Kubenetes 감사 로그 시스템은 기본적으로 Super Kubenetes에서만 감사 로그를 수신하지만, 쿠버네티스에서도 감사 로그를 수신할 수 있습니다.

사용자는 다음 명령을 사용하여 'Super Kubenetes-system' 네임스페이스의 ConfigMap 'Super Kubenetes-config'에서 ' auditing.enable ' 값을 변경하여 Super Kubenetes에서 감사 로그 수신을 중지할 수 있습니다:

<article article className="highlight">
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

Super Kubenetes에서 감사 로그 수신을 중지하려면 'auditing.enabled' 값을 'false'로 변경하십시오.

<article className="highlight">
  <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              <span style="color:#f92672">spec</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;auditing</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;enabled</span>: <span style="color:#66d9ef">false</span>
            </p>
        </code>
      </div>
  </pre>
</article>

변경 사항을 적용하려면 Super Kubenetes apiserver를 다시 시작해야 합니다.

## 쿠버네티스에서 감사 로그 수신

Super Kubenetes Auditing Log 시스템이 쿠버네티스로부터 감사 로그를 수신하도록 하려면 다음과 같이 쿠버네티스 감사 정책 파일과 쿠버네티스 감사 웹훅 설정 파일을 `/etc/kubernetes/manifests/kube-apiserver.yaml`에 추가해야 합니다.

### 감사 정책

<article className="highlight">
  <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              <span style="color:#f92672">apiVersion</span>: <span style="color:#ae81ff">v1</span> 
              <span style="color:#f92672">kind</span>: <span style="color:#ae81ff">Pod</span> 
              <span style="color:#f92672">metadata</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">kube-apiserver</span> 
              <span style="color:#f92672">&nbsp;&nbsp;namespace</span>: <span style="color:#ae81ff">kube-system</span> 
              <span style="color:#f92672">spec</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;containers</span>: 
              <span>&nbsp;&nbsp;-</span> <span style="color:#f92672">&nbsp;command</span>: 
              <span>&nbsp;&nbsp;&nbsp;&nbsp;-</span> <span style="color:#ae81ff">&nbsp;kube-apiserver</span> 
              <span>&nbsp;&nbsp;&nbsp;&nbsp;-</span> --<span style="color:#ae81ff">audit-policy-file=/etc/kubernetes/audit/audit-policy.yaml</span> 
              <span>&nbsp;&nbsp;&nbsp;&nbsp;-</span> --<span style="color:#ae81ff">audit-webhook-config-file=/etc/kubernetes/audit/audit-webhook.yaml</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;volumeMounts</span>: 
              <span>&nbsp;&nbsp;&nbsp;&nbsp;-</span> <span style="color:#f92672">&nbsp;mountPath</span>: <span style="color:#ae81ff">/etc/kubernetes/audit</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">k8s-audit</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;readOnly</span>: <span style="color:#66d9ef">true</span> 
              <span style="color:#f92672">&nbsp;&nbsp;volumes</span>: 
              <span>&nbsp;&nbsp;-</span> <span style="color:#f92672">&nbsp;hostPath</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;path</span>: <span style="color:#ae81ff">/etc/kubernetes/audit</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;type</span>: <span style="color:#ae81ff">DirectoryOrCreate</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">k8s-audit</span> 
            </p>
        </code>
      </div>
  </pre>
</article>

<div className="notices note">
  <p>Note</p>
  <div>
    이 작업은 쿠버네티스 apiserver를 재시작시킵니다.
  </div>
</div>

파일 `audit-policy.yaml`은 어떤 이벤트를 기록하고 어떤 데이터를 포함해야 하는지에 대한 규칙을 정의합니다. 최소 감사 정책 파일을 사용하여 메타데이터 수준에서 모든 요청을 기록할 수 있습니다:

<article className="highlight">
  <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              <span style="color:#75715e"><span>#</span> Log all requests at the Metadata level.</span>
              <span style="color:#f92672">apiVersion</span>: <span style="color:#ae81ff">audit.k8s.io/v1</span> 
              <span style="color:#f92672">kind</span>: <span style="color:#ae81ff">Policy</span> 
              <span style="color:#f92672">rules</span>: 
              <span>-</span> <span style="color:#f92672">&nbsp;level</span>: <span style="color:#ae81ff">Metadata</span>
            </p>
        </code>
      </div>
  </pre>
</article>

감사 정책에 대한 자세한 내용은 [감사 정책](https://kubernetes.io/docs/tasks/debug/debug-cluster/audit/)을 참조하십시오.

### 웹훅 감사

`audit-webhook.yaml` 파일은 Kubernetes 감사 로그가 전송될 웹 훅을 정의합니다. 다음은 Kube-Auditing 웹 훅의 설정 예시입니다.

<article className="highlight">
  <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              <span style="color:#f92672">apiVersion</span>: <span style="color:#ae81ff">v1</span> 
              <span style="color:#f92672">kind</span>: <span style="color:#ae81ff">Config</span> 
              <span style="color:#f92672">clusters</span>: 
              <span>-</span> <span style="color:#f92672">&nbsp;name</span>: <span style="color:#ae81ff">kube-auditing</span> 
              <span style="color:#f92672">&nbsp;&nbsp;cluster</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;server</span>: <span style="color:#ae81ff"><a style="color:#ae81ff; cursor:text;">https://{ip}:6443/audit/webhook/event</a></span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;insecure-skip-tls-verify</span>: <span style="color:#66d9ef">true</span> 
              <span style="color:#f92672">contexts</span>: 
              <span>-</span> <span style="color:#f92672">&nbsp;context</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;cluster</span>: <span style="color:#ae81ff">kube-auditing</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;user</span>: <span style="color:#e6db74">""</span> 
              <span style="color:#f92672">&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">default-context</span> 
              <span style="color:#f92672">current-context</span>: <span style="color:#ae81ff">default-context</span> 
              <span style="color:#f92672">preferences</span>: {} 
              <span style="color:#f92672">users</span>: []
            </p>
        </code>
      </div>
  </pre>
</article>

`ip`는 `Super Kubenetes-logging-system` 네임스페이스에 있는 `kube-auditing-webhook-svc` 서비스의 `CLUSTER-IP`입니다. 아래 명령을 사용하여 얻을 수 있습니다.

<article className="highlight">
  <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              kubectl get svc -n Super Kubenetes-logging-system
            </p>
        </code>
      </div>
  </pre>
</article>

<div className="notices note">
  <p>Note</p>
  <div>
    이 두 파일을 수정한 후 변경 사항을 적용하려면 쿠버네티스 apiserver를 다시 시작해야 합니다.
  </div>
</div>

CRD 웹훅 `kube-auditing-webhook`을 편집하고, 다음 명령을 통해 `k8sAuditingEnabled` 값을 `true`로 변경하세요.

<article className="highlight">
  <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              kubectl edit webhooks.auditing.Super Kubenetes.io kube-auditing-webhook
            </p>
        </code>
      </div>
  </pre>
</article>

<article className="highlight">
  <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              <span style="color:#f92672">spec</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;auditing</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;k8sAuditingEnabled</span>: <span style="color:#66d9ef">true</span>
            </p>
        </code>
      </div>
  </pre>
</article>

<div className="notices tip">
  <p>Tip</p>
  <div>
    또한 `platform-admin` 역할의 사용자를 사용하여 콘솔에 로그인하고, **클러스터 관리** 페이지의 **CRDs**에서 `웹훅`을 검색해서 `kube-auditing-webhook`을 직접 편집할 수 있습니다. 
  </div>
</div>

쿠버네티스에서 감사 로그 수신을 중지하려면 감사 웹훅 백엔드 설정을 제거한 다음 `k8sAuditingEnabled` 값을 `false`로 변경하세요.

## 감사 로그 사용자 지정

Super Kubenetes 감사 로그 시스템은 감사 로그를 사용자 지정하기 위해 CRD 웹훅 `kube-auditing-webhook`을 제공합니다. 다음은 yaml 파일의 예시입니다:

<article className="highlight">
  <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              <span style="color:#f92672">apiVersion</span>: <span style="color:#ae81ff">auditing.Super Kubenetes.io/v1alpha1</span> 
              <span style="color:#f92672">kind</span>: <span style="color:#ae81ff">Webhook</span> 
              <span style="color:#f92672">metadata</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">kube-auditing-webhook</span> 
              <span style="color:#f92672">spec</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;auditLevel</span>: <span style="color:#ae81ff">RequestResponse</span> 
              <span style="color:#f92672">&nbsp;&nbsp;auditSinkPolicy</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;alertingRuleSelector</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;matchLabels</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;type</span>: <span style="color:#ae81ff">alerting</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;archivingRuleSelector</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;matchLabels</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;type</span>: <span style="color:#ae81ff">persistence</span> 
              <span style="color:#f92672">&nbsp;&nbsp;image</span>: <span style="color:#ae81ff">Super Kubenetes/kube-auditing-webhook:v0.1.0</span> 
              <span style="color:#f92672">&nbsp;&nbsp;archivingPriority</span>: <span style="color:#ae81ff">DEBUG</span> 
              <span style="color:#f92672">&nbsp;&nbsp;alertingPriority</span>: <span style="color:#ae81ff">WARNING</span> 
              <span style="color:#f92672">&nbsp;&nbsp;replicas</span>: <span style="color:#ae81ff">2</span> 
              <span style="color:#f92672">&nbsp;&nbsp;receivers</span>: 
              <span>&nbsp;&nbsp;&nbsp;&nbsp;-</span> <span style="color:#f92672">&nbsp;name</span>: <span style="color:#ae81ff">alert</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;type</span>: <span style="color:#ae81ff">alertmanager</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;config</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;service</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;namespace</span>: <span style="color:#ae81ff">Super Kubenetes-monitoring-system</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">alertmanager-main</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;port</span>: <span style="color:#ae81ff">9093</span> 
            </p>
        </code>
      </div>
  </pre>
</article>

  <table>
  <thead>
  <tr>
    <th>
      파라미터
    </th>
    <th>
      설명
    </th>
    <th>
      기본값
    </th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>
      <code>replicas</code>
    </td>
    <td>
      Kube-Auditing 웹훅의 레플리카 번호.
    </td>
    <td>
      2
    </td>
  </tr>
  <tr>
    <td>
      <code>archivingPriority</code>
    </td>
    <td>
      보관 규칙의 우선순위. 알려진 감사 유형은 <code>DEBUG</code>, <code>INFO</code> 및 <code>WARNING</code>입니다.
    </td>
    <td>
      <code>DEBUG</code>
    </td>
  </tr>
  <tr>
    <td>
      <code>alertingPriority</code>
    </td>
    <td>
      알림 규칙의 우선순위. 알려진 감사 유형은 <code>DEBUG</code>, <code>INFO</code> 및 <code>WARNING</code>입니다.
    </td>
    <td>
      <code>WARNING</code>
    </td>
  </tr>
  <tr>
    <td>
      <code>auditLevel</code>
    </td>
    <td>
      감사 로그의 수준. 알려진 수준은 다음과 같습니다:<br>
      - <code>None</code>: 이벤트를 기록하지 않습니다.<br>
      - <code>Metadata</code>: 요청 메타데이터(요청 사용자, 타임스탬프, 리소스, verb 등)를 기록하지만 요청이나 응답 본문은 기록하지 않습니다.<br>
      - <code>Request</code>: 이벤트 메타데이터 및 요청 본문을 기록하지만 응답 본문은 기록하지 않습니다. 리소스가 아닌 요청에는 적용되지 않습니다.<br>
      - <code>RequestResponse</code>: 이벤트 메타데이터, 요청 및 응답 본문을 기록합니다. 리소스가 아닌 요청에는 적용되지 않습니다.
    </td>
    <td>
      <code>Metadata</code>
    </td>
  </tr>
  <tr>
    <td>
      <code>k8sAuditingEnabled</code>
    </td>
    <td>
      쿠버네티스 감사 로그 수신 여부.
    </td>
    <td>
      <code>false</code>
    </td>
  </tr>
  <tr>
    <td>
      <code>receivers</code>
    </td>
    <td>
      알림을 수신할 수신기.
    </td>
    <td>
    </td>
  </tr>
  </tbody>
  </table>

<div className="notices note">
  <p>Note</p>
  <div>
    파일 `audit-policy.yaml`을 수정한 다음 쿠버네티스 apiserver를 다시 시작하여 쿠버네티스 감사 로그의 수준을 변경할 수 있습니다.
  </div>
</div>

---
title: "감사 규칙"
keywords: 'Kubernetes, docker, Super Kubenetes, auditing'
description: 'Understand the auditing rule and how to customize a rule for processing auditing logs.'
linkTitle: 'Auditing Rules'
weight: 15320
---

감사 규칙은 감사 로그 처리 정책을 정의합니다. Super Kubenetes 감사 로그는 사용자 지정을 위한 두 가지 CRD 규칙(`archiving-rule` 및 `alerting-rule`)을 사용자에게 제공합니다.

[Super Kubenetes 감사 로그](../../../pluggable-components/auditing-logs/)를 활성화한 후 `platform-admin` 역할의 사용자로 콘솔에 로그인하세요. **클러스터 관리** 페이지의 **CRDs**에서 검색창에 `rules.auditing.Super Kubenetes.io`를 입력하세요. 결과 **규칙**을 클릭하면 두 개의 CRD 규칙을 볼 수 있습니다.

다음은 규칙의 일부에 대한 예시입니다.

## 아카이브 규칙

<article className="highlight">
  <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              <span style="color:#f92672">apiVersion</span>: <span style="color:#ae81ff">auditing.Super Kubenetes.io/v1alpha1</span> 
              <span style="color:#f92672">kind</span>: <span style="color:#ae81ff">Rule</span> 
              <span style="color:#f92672">metadata</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;labels</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;type</span>: <span style="color:#ae81ff">archiving</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;workspace</span>: <span style="color:#ae81ff">system-workspace</span> 
              <span style="color:#f92672">&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">archiving-rule</span> 
              <span style="color:#f92672">spec</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;rules</span>: 
              <span>&nbsp;&nbsp;-</span> <span style="color:#f92672">&nbsp;desc</span>: <span style="color:#ae81ff">all action not need to be audit</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;list</span>: 
              <span>&nbsp;&nbsp;&nbsp;&nbsp;-</span> <span style="color:#ae81ff">&nbsp;get</span> 
              <span>&nbsp;&nbsp;&nbsp;&nbsp;-</span> <span style="color:#ae81ff">&nbsp;list</span> 
              <span>&nbsp;&nbsp;&nbsp;&nbsp;-</span> <span style="color:#ae81ff">&nbsp;watch</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">ignore-action</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;type</span>: <span style="color:#ae81ff">list</span> 
              <span>&nbsp;&nbsp;-</span> <span style="color:#f92672">&nbsp;condition</span>: <span style="color:#ae81ff">Verb not in ${ignore-action}</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;desc</span>: <span style="color:#ae81ff">All audit event except get, list, watch event</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;enable</span>: <span style="color:#66d9ef">true</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">archiving</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;priority</span>: <span style="color:#ae81ff">DEBUG</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;type</span>: <span style="color:#ae81ff">rule</span> 
            </p>
        </code>
      </div>
  </pre>
</article>

## 경고 규칙

<article className="highlight">
    <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
          <code>
            <p>
                <span style="color:#f92672">apiVersion</span>: <span style="color:#ae81ff">auditing.Super Kubenetes.io/v1alpha1</span> 
                <span style="color:#f92672">kind</span>: <span style="color:#ae81ff">Rule</span> 
                <span style="color:#f92672">metadata</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;labels</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;type</span>: <span style="color:#ae81ff">alerting</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;workspace</span>: <span style="color:#ae81ff">system-workspace</span> 
                <span style="color:#f92672">&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">alerting-rule</span> 
                <span style="color:#f92672">spec</span>: 
                <span style="color:#f92672">&nbsp;&nbsp;rules</span>: 
                <span>&nbsp;&nbsp;-</span> <span style="color:#f92672">&nbsp;desc</span>: <span style="color:#ae81ff">all operator need to be audit</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;list</span>: 
                <span>&nbsp;&nbsp;&nbsp;&nbsp;-</span> <span style="color:#ae81ff">&nbsp;create</span> 
                <span>&nbsp;&nbsp;&nbsp;&nbsp;-</span> <span style="color:#ae81ff">&nbsp;delete</span> 
                <span>&nbsp;&nbsp;&nbsp;&nbsp;-</span> <span style="color:#ae81ff">&nbsp;update</span> 
                <span>&nbsp;&nbsp;&nbsp;&nbsp;-</span> <span style="color:#ae81ff">&nbsp;patch</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">action</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;type</span>: <span style="color:#ae81ff">list</span> 
                <span>&nbsp;&nbsp;-</span> <span style="color:#f92672">&nbsp;condition</span>: <span style="color:#ae81ff">Verb in ${action}</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;desc</span>: <span style="color:#ae81ff">audit the change of resource</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;enable</span>: <span style="color:#66d9ef">true</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">ResourceChange</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;priority</span>: <span style="color:#ae81ff">INFO</span> 
                <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;type</span>: <span style="color:#ae81ff">rule</span> 
            </p>
          </code>
      </div>
    </pre>
</article>

  <table>
  <thead>
  <tr>
    <th>
      속성
    </th>
    <th>
      설명
    </th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>
      <code>name</code>
    </td>
    <td>
      규칙의 이름.
    </td>
  </tr>
  <tr>
    <td>
      <code>type</code>
    </td>
    <td>
      규칙의 유형. 알려진 값은 <code>rule</code>, <code>macro</code>, <code>list</code> 및 <code>alias</code>입니다.
    </td>
  </tr>
  <tr>
    <td>
      <code>desc</code>
    </td>
    <td>
      규칙에 대한 설명.
    </td>
  </tr>
  <tr>
    <td>
      <code>condition</code>
    </td>
    <td>
      규칙과 일치하는지 확인하기 위해 감사 로그에 적용되는 필터링 표현식입니다.
    </td>
  </tr>
  <tr>
    <td>
      <code>macro</code>
    </td>
    <td>
      매크로의 조건.
    </td>
  </tr>
  <tr>
    <td>
      <code>list</code>
    </td>
    <td>
      목록의 값.
    </td>
  </tr>
  <tr>
    <td>
      <code>alias</code>
    </td>
    <td>
      별칭의 값.
    </td>
  </tr>
  <tr>
    <td>
      <code>enable</code>
    </td>
    <td>
      <code>false</code>로 설정하면 규칙이 적용되지 않습니다.
    </td>
  </tr>
  <tr>
    <td>
      <code>output</code>
    </td>
    <td>
      경고 메시지를 지정.
    </td>
  </tr>
  <tr>
    <td>
      <code>priority</code>
    </td>
    <td>
      규칙의 우선순위.
    </td>
  </tr>
  </tbody>
  </table>

감사 로그가 `archiving-rule`의 규칙과 일치하고 규칙 우선순위가 `archivingPriority` 이상이면, 이 로그는 추가 사용을 위해 저장됩니다. 감사 로그가 `alerting-rule`의 규칙과 일치할 때 규칙의 우선 순위가 `alertingPriority`보다 낮으면, 이 로그는 추가 사용을 위해 저장됩니다. 그렇지 않으면 사용자에게 보낼 경고를 생성합니다.

## 규칙 조건

`condition`은 비교 연산자(= , ! =, <, <=, >, >=, contains, in, like, and regex)를 사용할 수 있는 필터링 표현식이며 부울 연산자(and, or and not)와 괄호를 사용하여 결합할 수 있습니다. 다음은 지원되는 필터입니다.

  <table>
  <thead>
  <tr>
    <th>
      필터
    </th>
    <th>
      설명
    </th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>
      <code>Workspace</code>
    </td>
    <td>
      감사 이벤트가 발생하는 워크스페이스.
    </td>
  </tr>
  <tr>
    <td>
      <code>Devops</code>
    </td>
    <td>
      감사 이벤트가 발생하는 DevOps 프로젝트.
    </td>
  </tr>
  <tr>
    <td>
      <code>Level</code>
    </td>
    <td>
      감사 로그의 수준.
    </td>
  </tr>
  <tr>
    <td>
      <code>RequestURI</code>
    </td>
    <td>
      RequestURI는 클라이언트가 서버로 보낸 요청 URI입니다.
    </td>
  </tr>
  <tr>
    <td>
      <code>Verb</code>
    </td>
    <td>
      요청과 관련된 verb.
    </td>
  </tr>
  <tr>
    <td>
      <code>User.Username</code>
    </td>
    <td>
      모든 활성 사용자 중에서 이 사용자를 고유하게 식별하는 이름.
    </td>
  </tr>
  <tr>
    <td>
      <code>User.Groups</code>
    </td>
    <td>
      이 사용자가 속한 그룹의 이름.
    </td>
  </tr>
  <tr>
    <td>
      <code>SourceIPs</code>
    </td>
    <td>
      요청이 발생한 소스 IP 및 중간 프록시.
    </td>
  </tr>
  <tr>
    <td>
      <code>ObjectRef.Resource</code>
    </td>
    <td>
      요청과 관련된 오브젝트의 리소스.
    </td>
  </tr>
  <tr>
    <td>
      <code>ObjectRef.Namespace</code>
    </td>
    <td>
      요청과 관련된 오브젝트의 네임스페이스.
    </td>
  </tr>
  <tr>
    <td>
      <code>ObjectRef.Name</code>
    </td>
    <td>
      요청과 관련된 오브젝트의 이름.
    </td>
  </tr>
  <tr>
    <td>
      <code>ObjectRef.Subresource</code>
    </td>
    <td>
      요청과 관련된 오브젝트의 하위 리소스.
    </td>
  </tr>
  <tr>
    <td>
      <code>ResponseStatus.code</code>
    </td>
    <td>
      요청에 대해 제안된 HTTP 반환 코드.
    </td>
  </tr>
  <tr>
    <td>
      <code>ResponseStatus.Status</code>
    </td>
    <td>
      작업의 상태.
    </td>
  </tr>
  <tr>
    <td>
      <code>RequestReceivedTimestamp</code>
    </td>
    <td>
      요청이 apiserver에 도달하는 시간.
    </td>
  </tr>
  <tr>
    <td>
      <code>StageTimestamp</code>
    </td>
    <td>
      요청이 현재 감사 단계에 도달하는 시간.
    </td>
  </tr>
  </tbody>
  </table>

예를 들어, `test` 네임스페이스의 모든 로그를 매치시키려면 :

<article className="highlight">
  <pre style="background: rgb(36, 46, 66);">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              ObjectRef.Namespace = "test"
            </p>
        </code>
      </div>
  </pre>
</article>

`test`로 시작하는 네임스페이스의 모든 로그를 매치시키려면:

<article className="highlight">
  <pre style="background: rgb(36, 46, 66);">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              ObjectRef.Namespace like "test*"
            </p>
        </code>
      </div>
  </pre>
</article>

최근 1시간 동안 발생한 모든 로그를 매치시키려면:

<article className="highlight">
  <pre style="background: rgb(36, 46, 66);">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              RequestReceivedTimestamp >= "2020-06-12T09:23:28.359896Z" and RequestReceivedTimestamp <= "2020-06-12T10:23:28.359896Z"
            </p>
        </code>
      </div>
  </pre>
</article>

## 매크로

`macro`는 규칙 및 다른 매크로 내에서 재사용할 수 있는 룰 컨디션 스니펫입니다. 매크로는 일반적인 패턴의 이름을 지정하고 규칙의 중복을 제거하는 방법을 제공합니다. 다음은 매크로의 예시입니다.

<article className="highlight">
  <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              <span style="color:#f92672">apiVersion</span>: <span style="color:#ae81ff">auditing.Super Kubenetes.io/v1alpha1</span> 
              <span style="color:#f92672">kind</span>: <span style="color:#ae81ff">Rule</span> 
              <span style="color:#f92672">metadata</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">alerting-rule</span> 
              <span style="color:#f92672">&nbsp;&nbsp;labels</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;workspace</span>: <span style="color:#ae81ff">system-workspace</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;type</span>: <span style="color:#ae81ff">alerting</span> 
              <span style="color:#f92672">spec</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;rules</span>: 
              <span>&nbsp;&nbsp;-</span> <span style="color:#f92672">&nbsp;name</span>: <span style="color:#ae81ff">pod</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;type</span>: <span style="color:#ae81ff">macro</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;desc</span>: <span style="color:#ae81ff">pod</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;macro</span>: <span style="color:#ae81ff">ObjectRef.Resource="pods"</span>
            </p>
        </code>
      </div>
  </pre>
</article>

<div className="notices note">
  <p>Note</p>
  <div>
    `macro`는 규칙 또는 ${pod}나 ${alerting-rule.pod}와 같은 다른 매크로에서 사용할 수 있습니다. 이 두 가지 방법의 차이점은 ${pod}는 CRD 규칙 `alerting-rule`에서만 사용할 수 있는 반면, ${alerting-rule.pod}는 모든 CRD 규칙에서 사용할 수 있다는 것입니다. 이 원칙은 목록과 별칭에도 적용됩니다.
  </div>
</div>

## 목록

`list`는 규칙, 매크로 또는 기타 목록에 포함될 수 있는 항목 모음입니다. 규칙과 매크로와 달리 목록은 구문 필터링으로 분석할 수 없습니다. 다음은 목록의 예시입니다.

<article className="highlight">
  <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              <span style="color:#f92672">apiVersion</span>: <span style="color:#ae81ff">auditing.Super Kubenetes.io/v1alpha1</span> 
              <span style="color:#f92672">kind</span>: <span style="color:#ae81ff">Rule</span> 
              <span style="color:#f92672">metadata</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">alerting-rule</span> 
              <span style="color:#f92672">&nbsp;&nbsp;labels</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;workspace</span>: <span style="color:#ae81ff">system-workspace</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;type</span>: <span style="color:#ae81ff">alerting</span> 
              <span style="color:#f92672">spec</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;rules</span>: 
              <span>&nbsp;&nbsp;-</span> <span style="color:#f92672">&nbsp;name</span>: <span style="color:#ae81ff">action</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;type</span>: <span style="color:#ae81ff">list</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;desc</span>: <span style="color:#ae81ff">all operator needs to be audit</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;list</span>: 
              <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-</span> <span style="color:#ae81ff">&nbsp;create</span> 
              <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-</span> <span style="color:#ae81ff">&nbsp;delete</span> 
              <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-</span> <span style="color:#ae81ff">&nbsp;update</span> 
              <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-</span> <span style="color:#ae81ff">&nbsp;patch</span> 
            </p>
        </code>
      </div>
  </pre>
</article>

## 별칭

`alias`은 필터 영역의 짧은 이름입니다. 규칙, 매크로, 목록 및 출력 문자열에 포함될 수 있습니다. 다음은 별칭의 예시입니다.

<article className="highlight">
  <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              <span style="color:#f92672">apiVersion</span>: <span style="color:#ae81ff">auditing.Super Kubenetes.io/v1alpha1</span> 
              <span style="color:#f92672">kind</span>: <span style="color:#ae81ff">Rule</span> 
              <span style="color:#f92672">metadata</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;name</span>: <span style="color:#ae81ff">alerting-rule</span> 
              <span style="color:#f92672">&nbsp;&nbsp;labels</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;workspace</span>: <span style="color:#ae81ff">system-workspace</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;type</span>: <span style="color:#ae81ff">alerting</span> 
              <span style="color:#f92672">spec</span>: 
              <span style="color:#f92672">&nbsp;&nbsp;rules</span>: 
              <span>&nbsp;&nbsp;-</span> <span style="color:#f92672">&nbsp;name</span>: <span style="color:#ae81ff">namespace</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;type</span>: <span style="color:#ae81ff">alias</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;desc</span>: <span style="color:#ae81ff">the alias of the resource namespace</span> 
              <span style="color:#f92672">&nbsp;&nbsp;&nbsp;&nbsp;alias</span>: <span style="color:#ae81ff">ObjectRef.Namespace</span>
            </p>
        </code>
      </div>
  </pre>
</article>

## 출력

`Output` 문자열은 감사 로그가 경고를 트리거할 때 경고 메시지의 형식을 지정하는 데 사용됩니다. `Output` 문자열은 목록과 별칭을 포함할 수 있습니다. 다음은 예시입니다.

<article className="highlight">
  <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              <span style="color:#f92672">Output</span>: <span style="color:#ae81ff">${user} ${verb} a HostNetwork Pod ${name} in ${namespace}.</span>
            </p>
        </code>
      </div>
  </pre>
</article>

<div className="notices note">
  <p>Note</p>
  <div>
    `user`, `verb`, `namespace` 및 `name` 영역은 모두 별칭입니다.
  </div>
</div>

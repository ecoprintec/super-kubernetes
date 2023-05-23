---
title: "웹 Kubectl"
keywords: 'Super Kubenetes, Kubernetes, kubectl, cli'
description: 'The web kubectl tool is integrated into Super Kubenetes to provide consistent user experiences for Kubernetes users.'
linkTitle: 'Web Kubectl'
weight: 15500
---

쿠버네티스 명령줄 도구인 kubectl을 사용하면 쿠버네티스 클러스터에서 명령을 실행할 수 있습니다. kubectl을 사용하여 애플리케이션 배포, 클러스터 리소스 검사 및 관리, 로그 보기 등을 수행할 수 있습니다.

Super Kubenetes는 사용자 편의를 위해 콘솔에서 웹 kubectl을 제공합니다. 기본적으로 현재 버전에서는 `platform-admin` 역할이 부여된 계정(예: 기본 계정 `admin`)만이 클러스터 리소스 운영 및 관리를 위해 웹 kubectl을 사용할 수 있는 권한을 가집니다.

이 튜토리얼은 웹 kubectl을 사용하여 클러스터 리소스에서 작업하고 관리하는 방법을 시연합니다.

## 웹 Kubectl 사용

1. `platform-admin` 역할이 부여된 사용자로 Super Kubenetes에 로그인하고 좌측 하단의 **툴박스** 위로 커서를 가져간 다음 **Kubectl**을 선택하세요.

2. 팝업 창에서 kubectl 인터페이스를 볼 수 있습니다. 멀티 클러스터 기능을 활성화한 경우 오른쪽 상단 모서리에 있는 드롭다운 목록에서 먼저 대상 클러스터를 선택해야 합니다. 멀티 클러스터 기능이 활성화되지 않은 경우 이 드롭다운 목록이 표시되지 않습니다.

3. 명령줄 도구에 kubectl 명령을 입력하여 쿠버네티스 클러스터 리소스를 쿼리하고 관리할 수 있습니다. 예를 들어, 다음 명령을 실행하여 클러스터에 있는 모든 PVC의 상태를 쿼리하세요.

    <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  kubectl get pvc --all-namespaces
               </p>
            </code>
         </div>
      </pre>
   </article>

   ![web-kubectl-example](/dist/assets/docs/v3.3/web-kubectl/web-kubectl-example.png)

4. 다음 구문을 사용하여 터미널 창에서 kubectl 명령을 실행하세요:

    <article className="highlight">
      <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
         <div className="copy-code-button" title="Copy Code"></div>
         <div className="code-over-div">
            <code>
               <p>
                  kubectl <span style="color:#f92672">[</span>command<span style="color:#f92672">]</span> <span style="color:#f92672">&nbsp;[</span>TYPE<span style="color:#f92672">]</span> <span style="color:#f92672">&nbsp;[</span>NAME<span style="color:#f92672">]</span> <span style="color:#f92672">&nbsp;[</span>flags<span style="color:#f92672">]</span>
               </p>
            </code>
         </div>
      </pre>
   </article>

  <div className="notices note">
    <p>Note</p>
    <div>
      - 여기서 `command`, `TYPE`, `NAME` 및 `flags`는 다음과 같습니다:
        - `command`: `create`, `get`, `describe`, `delete`와 같이 하나 이상의 리소스에서 수행하고자 하는 작업을 지정합니다`.
        - `TYPE`: [리소스 유형](https://kubernetes.io/docs/reference/kubectl/overview/#resource-types)을 지정합니다. 리소스 유형은 대소문자를 구분하지 않으며 단수, 복수 또는 축약 형식을 지정할 수 있습니다.
        - `NAME`: 리소스의 이름을 지정합니다. 이름은 대소문자를 구분합니다. 이름을 생략하면 `kubectl get pods`와 같이, 모든 리소스에 대한 세부 정보가 표시됩니다.
        - `플래그`: 플래그 옵션을 지정합니다. 예를 들어 `-s` 또는 `--server` 플래그를 사용하여 쿠버네티스 API 서버의 주소와 포트를 지정할 수 있습니다.

      - 도움이 필요하면, 터미널 창에서 `kubectl help`를 실행하거나 [쿠버네티스 kubectl CLI 문서]( https://kubernetes.io/docs/reference/kubectl/overview/)를 참조하세요.
    </div>

  </div>

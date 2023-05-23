---
title: 워크스페이스 개요
keywords: 'Kubernetes, Super Kubenetes, workspace'
description: 'Understand the concept of workspaces in Super Kubenetes and learn how to create and delete a workspace.'
linkTitle: 'Workspace Overview'
weight: 9100
---

워크스페이스는 [프로젝트](../../project-administration/)와 [DevOps 프로젝트](../../devops-user-guide/)를 구성하고 [앱 템플릿](../upload-helm-based-application/)과 앱 저장소를 관리합니다. 안전한 방법으로 팀 내에서 리소스 접속을 제어하고 리소스를 공유할 수 있는 장소입니다.

테넌트(클러스터 관리자는 제외)를 위한 새 워크스페이스를 생성하는 것이 하나의 모범 사례입니다. 동일한 테넌트가 여러 워크스페이스에서 작업할 수 있는 반면, 워크스페이스는 여러 테넌트가 서로 다른 방식으로 접속할 수 있도록 허용합니다.

이 튜토리얼에서는 워크스페이스를 만들고 삭제하는 방법을 시연합니다.

## 사전 준비

[워크스페이스, 프로젝트, 사용자 및 역할 생성](../../quick-start/create-workspace-and-project)에서의 `ws-manager` 처럼, `workspaces-manager` 역할을 부여받은 사용자가 필요합니다.

## 워크스페이스 생성

1. Super Kubenetes의 웹 콘솔에 `ws-manager`로 로그인하세요. 좌측 상단 모서리 에서 **플랫폼**을 클릭 한 다음 **접속 제어**를 선택하세요. **워크스페이스** 페이지에서 **생성**을 클릭하세요.

  <div className="notices note">
    <p>Note</p>
    <div>
      기본적으로, 모든 시스템 프로젝트를 담은 목록에 최소 한 개의 워크스페이스 `system-workspace`가 있습니다.
    </div>
  </div>

2. 단일 노드 클러스터의 경우, **기본 정보** 페이지에서 워크스페이스의 이름을 지정하고, 드롭다운 목록에서 관리자를 선택하세요. **생성**을 클릭하세요.

   - **이름**: 고유 식별자 역할을 하는 워크스페이스의 이름을 설정.
   - **별명**: 워크스페이스의 별칭 이름.
   - **관리자**: 워크스페이스를 관리하는 사용자.
   - **설명**: 워크스페이스에 대한 간략한 소개.

   멀티 노드 클러스터의 경우, 워크스페이스에 대한 기본 정보를 설정한 후 **다음**을 클릭하여 계속합니다. **클러스터 설정** 페이지에서 워크스페이스에서 사용할 클러스터를 선택한 다음, **생성**을 클릭하세요.

3. 생성된 워크스페이스는 워크스페이스 목록에 표시됩니다.

4. **개요** 페이지에서 워크스페이스를 클릭하면 해당 워크스페이스의 리소스 상태를 확인할 수 있습니다.

## 워크스페이스 삭제

Super Kubenetes에서는 워크스페이스를 사용하여 다양한 프로젝트를 그룹화하고 관리합니다. 즉, 프로젝트의 라이프사이클은 워크스페이스에 따라 달라집니다. 보다 구체적으로, 워크스페이스가 삭제되면 워크스페이스의 모든 프로젝트 및 관련 리소스가 삭제됩니다.

워크스페이스를 삭제하기 전에 일부 주요 프로젝트의 바인딩을 해제할지 여부를 결정하십시오.

### 삭제하기 전에 프로젝트 바인딩 해제

일부 프로젝트를 보존하면서 워크스페이스를 삭제하려면 먼저 다음 명령을 실행하십시오:

<article className="highlight">
  <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
      <div className="copy-code-button" title="Copy Code"></div>
      <div className="code-over-div">
        <code>
            <p>
              kubectl label ns &lt;namespace&gt; Super Kubenetes.io/workspace- <span style="color:#f92672">&amp;&amp;</span> kubectl patch ns &lt;namespace&gt;   -p <span style="color:#e6db74">'{"metadata":{"ownerReferences":[]}}'</span> --type<span style="color:#f92672">=</span>merge
            </p>
        </code>
      </div>
  </pre>
</article>

<div className="notices note">
  <p>Note</p>
  <div>
    위의 명령은 워크스페이스와 관련된 레이블을 제거하고 ownerReferences를 제거합니다. 그런 다음, [바인딩되지 않은 프로젝트를 새 워크스페이스에 할당](../../faq/access-control/add-kubernetes-namespace-to-Super Kubenetes-workspace/)할 수 있습니다.
  </div>
</div>

### 콘솔에서 워크스페이스 삭제

워크스페이스에서 필요한 프로젝트의 바인딩을 해제한 후, 다음 단계를 수행하여 워크스페이스를 삭제하세요.

<div className="notices note">
  <p>Note</p>
  <div>
    kubectl을 사용하여 워크스페이스 리소스 오브젝트를 직접 삭제하는 경우, 워크스페이스 삭제에 매우 주의하십시오.
  </div>
</div>

1. 워크스페이스에서 **워크스페이스 설정** 아래의 **기본 정보**로 이동하세요. **기본 정보** 페이지에서는 프로젝트 수, 멤버 수 등 워크스페이스의 일반 정보를 확인할 수 있습니다.

  <div className="notices note">
    <p>Note</p>
    <div>
      이 페이지에서 **정보 편집**을 클릭하여 워크스페이스의 기본 정보(워크스페이스 이름을 제외한)를 변경하고 [네트워크 격리](../../workspace-administration/workspace-network-isolation/)를 켜거나 끌 수 있습니다.
    </div>
  </div>

2. 워크스페이스를 삭제하려면 **관리 > 워크스페이스 삭제**를 클릭하세요. 표시되는 대화 상자에서 워크스페이스의 이름을 입력한 다음 **확인**을 클릭하세요.

  <div className="notices warning">
    <p>Warning</p>
    <div>
      삭제된 워크스페이스는 복원할 수 없으며 워크스페이스의 리소스도 함께 제거됩니다.
    </div>
  </div>

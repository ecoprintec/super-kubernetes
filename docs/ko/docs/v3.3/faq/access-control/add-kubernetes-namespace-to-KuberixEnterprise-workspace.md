---
title: "Super Kubenetes 워크스페이스에 기존 쿠버네티스 네임스페이스 추가"
keywords: 'namespace, project, Super Kubenetes, Kubernetes'
description: 'Add your existing Kubernetes namespaces to a Super Kubenetes workspace.'
linkTitle: 'Add existing Kubernetes namespaces to a Super Kubenetes Workspace'
Weight: 16430
---

쿠버네티스 네임스페이스는 Super Kubenetes 프로젝트입니다. Super Kubenetes 콘솔이 아닌 네임스페이스 오브젝트를 생성하면 네임스페이스가 특정 워크스페이스에 직접 나타나지 않습니다. 그러나 클러스터 관리자는 **클러스터 관리** 페이지에서 네임스페이스를 계속 볼 수 있습니다. 동시에 네임스페이스를 워크스페이스에 배치할 수도 있습니다.

이 튜토리얼은 기존 쿠버네티스 네임스페이스를 Super Kubenetes 워크스페이스에 추가하는 방법을 시연합니다.

## 사전 준비

- **클러스터 관리** 권한을 포함한 역할을 부여받은 사용자가 필요합니다. 예를 들어 콘솔에 직접 `admin`으로 로그인하거나 권한이 있는 새 역할을 생성하여 사용자에게 할당할 수 있습니다.

- 네임스페이스를 할당할 수 있도록 사용 가능한 워크스페이스가 있습니다. 자세한 내용은 [워크스페이스, 프로젝트, 사용자 및 역할 생성](../../../quick-start/create-workspace-and-project/)을 참조하십시오.

## 쿠버네티스 네임스페이스 생성

나중에 워크스페이스에 추가할 수 있도록 먼저 예제 쿠버네티스 네임스페이스를 만듭니다. 다음 명령을 실행하세요:

<article className="highlight">
    <pre style="color: rgb(248, 248, 242); background: rgb(36, 46, 66); tab-size: 4;">
        <div className="copy-code-button" title="Copy Code"></div>
        <div className="code-over-div">
          <code>
            <p>
                kubectl create ns demo-namespace</p></code></div>
    </pre>
</article>

Kubernetes 네임스페이스 생성에 대한 자세한 내용은 [네임스페이스 둘러보기](https://kubernetes.io/docs/tasks/administer-cluster/namespaces-walkthrough/)를 참조하십시오.

## Super Kubenetes 워크스페이스에 네임스페이스 추가

1. Super Kubenetes 콘솔에 `admin`으로 로그인하고 **클러스터 관리** 페이지로 이동합니다. **프로젝트**를 클릭하면 방금 생성한 프로젝트를 포함하여 현재 클러스터에서 실행 중인 모든 프로젝트를 볼 수 있습니다.

2. kubectl을 통해 생성된 네임스페이스는 어떤 작업공간에도 속하지 않습니다. 오른쪽에서 <img src="/dist/assets/docs/v3.3/faq/access-control-and-account-management/add-exisiting-namespaces-to-a-kubesphere-workspace/three-dots.png" height="20">를 클릭하고, **워크스페이스 할당**을 선택하세요.

3. 나타나는 대화 상자에서 프로젝트의 **워크스페이스**와 **프로젝트 관리자**를 선택하고 **확인**을 클릭하세요.

4. 워크스페이스로 이동하면 **프로젝트** 페이지에서 프로젝트를 볼 수 있습니다.

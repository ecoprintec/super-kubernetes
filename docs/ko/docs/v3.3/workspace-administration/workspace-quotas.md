---
title: "워크스페이스 쿼터"
keywords: 'Super Kubenetes, Kubernetes, workspace, quotas'
description: 'Set workspace quotas to control the total resource usage of projects and DevOps projects in a workspace.'
linkTitle: "Workspace Quotas"
weight: 9700
---

워크스페이스 쿼터는 워크스페이스에 있는 모든 프로젝트 및 DevOps 프로젝트의 총 리소스 사용량을 제어하는 데 사용됩니다. [프로젝트 쿼터](.. /project-quotas/)와 마찬가지로 워크스페이스 쿼터에는 요청과 CPU 및 메모리 상한이 포함됩니다. 요청은, 워크스페이스에 있는 프로젝트가 구체적으로 보장되고 예약되므로, 필요한 리소스를 확보할 수 있도록 합니다. 반대로 상한은 워크스페이스에 있는 모든 프로젝트의 리소스 사용량이 특정 값을 초과할 수 없도록 합니다.

[멀티 클러스터 아키텍처](../../multicluster-management/)에서 [하나 이상의 클러스터를 워크스페이스에 할당](../../cluster-administration/cluster-settings/cluster-visibility-and-authorization/)할 필요가 있으며, 다른 클러스터의 워크스페이스에서 사용할 수 있는 리소스의 양을 결정할 수 있습니다.

이 튜토리얼에서는 워크스페이스에 대한 리소스 쿼터를 관리하는 방법을 시연합니다.

## 사전 준비

사용 가능한 워크스페이스와과 사용자(`ws-manager`)가 필요합니다. 사용자는 플랫폼 수준에서 `workspaces-manager` 역할을 가지고 있어야 합니다. 자세한 내용은 [워크스페이스, 프로젝트, 사용자 및 역할 생성](../../quick-start/create-workspace-and-project/)을 참조하십시오.

## 워크스페이스 쿼터 설정

1. Super Kubenetes 웹 콘솔에 `ws-manager`로 로그인하고 워크스페이스로 이동하세요.

2. **워크스페이스 설정**아래의 **워크스페이스 쿼터**로 이동하세요.

3. **워크스페이스 쿼터** 페이지에는 워크스페이스에 할당된 사용 가능한 모든 클러스터와 그 각각의 CPU 및 메모리의 요청과 상한이 나열됩니다. 클러스터 오른쪽에 있는 **쿼터 편집**를 클릭하세요.

4. 표시된 대화 상자에서 기본적으로 Super Kubenetes가 프로젝트에 대한 요청이나 상한을 설정하지 않은 것을 확인할 수 있습니다. CPU 및 메모리 리소스를 제어하기 위한 요청 및 상한을 설정하려면 <img src="/dist/assets/docs/v3.3/common-icons/slider.png" width="20" alt="icon" />을 원하는 값을 이동시키거나 직접 숫자를 입력하세요. 영역을 비워두면 요청이나 상한을 설정하지 않는다는 의미입니다.

  <div className="notices note">
    <p>Note</p>
    <div>
      상한은 요청보다 절대 낮을 수 없습니다.
    </div>
  </div>

5. **확인**을 클릭하여 쿼터 설정을 마칩니다.

## 참고 항목

[프로젝트 쿼터](../project-quotas/)

[컨테이너 리밋 레인지](../../project-administration/container-limit-ranges/)

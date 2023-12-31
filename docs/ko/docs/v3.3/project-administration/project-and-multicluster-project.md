---
title: "프로젝트와 멀티 클러스터 프로젝트"
keywords: 'Super Kubenetes, Kubernetes, project, multicluster-project'
description: 'Learn how to create different types of projects.'
linkTitle: "Projects and Multi-cluster Projects"
weight: 13100
---

Super Kubenetes의 프로젝트는 리소스를 겹치지 않는 그룹으로 구성하는 데 사용되는 쿠버네티스 [네임스페이스](https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/)입니다. 이것은 클러스터 리소스를 여러 테넌트로 분할하는 논리적 파티셔닝 기능을 나타냅니다.

멀티 클러스터 프로젝트는 클러스터에서 실행되므로, 사용자는 비즈니스에 영향을 미치지 않으면서 고가용성을 달성하고, 발생하는 문제를 특정 클러스터로 격리할 수 있습니다. 자세한 내용은 [멀티 클러스터 관리](../../multicluster-management/)를 참조하십시오.

이 튜토리얼에서는 프로젝트 및 멀티 클러스터 프로젝트를 관리하는 방법을 시연합니다.

## 사전 준비

- 워크스페이스와과 사용자(`project-admin`)를 생성해야 합니다. 사용자는 `workspace-self-provisioner` 역할로 워크스페이스에 초대되어야 합니다. 자세한 내용은 [워크스페이스, 프로젝트, 사용자 및 역할 생성](../../quick-start/create-workspace-and-project/)을 참조하십시오.
- 멀티 클러스터 프로젝트를 생성하기 전에 [직접 연결](../../multicluster-management/enable-multicluster/direct-connection/) 또는 [에이전트 연결](../../multicluster-management/enable-multicluster/agent-connection/)을 통해 멀티 클러스터 기능을 활성화해야 합니다. 

## 프로젝트

### 프로젝트 생성

1. 워크스페이스의 **프로젝트** 페이지로 이동하여 **프로젝트** 탭에서 **생성**을 클릭하세요.

  <div className="notices note">
    <p>Note</p>
    <div>
      - **클러스터** 드롭다운 메뉴에서 프로젝트가 생성될 클러스터를 변경할 수 있습니다. 목록은 멀티 클러스터 기능을 활성화한 후에만 볼 수 있습니다.
      - **생성** 버튼이 보이지 않으면 워크스페이스에 사용할 수 있는 클러스터가 없음을 의미합니다. 클러스터에서 워크스페이스 리소스가 생성될 수 있도록 플랫폼 관리자 또는 클러스터 관리자에게 문의해야 합니다. [클러스터를 워크스페이스에 할당하려면](../../cluster-administration/cluster-settings/cluster-visibility-and-authorization/), 플랫폼 관리자 또는 클러스터 관리자는 **클러스터 관리** 페이지에서 **클러스터 가시성**을 편집해야 합니다.
    </div>
  </div>

2. 표시되는 **프로젝트 생성** 창에서 프로젝트 이름을 입력하고, 필요한 경우 별칭이나 설명을 추가하세요. **클러스터**에서 프로젝트가 생성될 클러스터를 선택하고(멀티 클러스터 기능이 활성화되지 않은 경우 이 옵션이 표시되지 않음), **확인**을 클릭하세요.

3. 생성된 프로젝트가 목록에 표시됩니다. 프로젝트 이름을 클릭하면 **개요** 페이지로 이동할 수 있습니다.

### 프로젝트 수정

1. 프로젝트로 이동하여 **프로젝트 설정** 아래의 **기본 정보**로 이동한, 다음 오른쪽의 **관리**를 클릭하세요.

2. 드롭다운 메뉴에서 **정보 편집**을 선택하세요.
   
<div className="notices note">
  <p>Note</p>
  <div>
    프로젝트 이름은 수정할 수 없습니다. 다른 정보를 변경하려면 문서의 관련 튜토리얼을 참조하십시오.
  </div>
</div>

3. 프로젝트를 삭제하려면 드롭다운 메뉴에서 **삭제**를 선택하세요. 표시되는 대화 상자에서 프로젝트 이름을 입력하고 **확인**을 클릭하여 삭제를 승인하세요.

<div className="notices warning">
  <p>Warning</p>
  <div>
    한번 삭제된 프로젝트는 복구할 수 없으며 프로젝트의 리소스가 제거됩니다.
  </div>
</div>


## 멀티 클러스터 프로젝트

### 멀티 클러스터 프로젝트 생성

1. 워크스페이스의 **프로젝트** 페이지로 이동하여 **멀티 클러스터 프로젝트** 탭을 클릭하고 **생성**를 클릭하세요.

  <div className="notices note">
    <p>Note</p>
    <div>
      - **클러스터** 드롭다운 메뉴에서 프로젝트가 생성될 클러스터를 변경할 수 있습니다. 목록은 멀티 클러스터 기능을 활성화한 후에만 볼 수 있습니다.
      - **생성** 버튼이 보이지 않으면 워크스페이스에 사용할 수 있는 클러스터가 없음을 의미합니다. 클러스터에서 워크스페이스 리소스가 생성될 수 있도록 플랫폼 관리자 또는 클러스터 관리자에게 문의해야 합니다. [클러스터를 워크스페이스에 할당하려면](../../cluster-administration/cluster-settings/cluster-visibility-and-authorization/), 플랫폼 관리자 또는 클러스터 관리자는 **클러스터 관리** 페이지에서 **클러스터 가시성**을 편집해야 합니다.
      - 워크스페이스에 최소 두 개의 클러스터가 할당되어 있는지 확인하십시오.
    </div>
  </div>

2. 표시되는 **멀티 클러스터 프로젝트 생성** 창에서 프로젝트 이름을 입력하고, 필요한 경우 별칭 또는 설명을 추가합니다. **클러스터**에서 **클러스터 추가**를 클릭하여 자신의 프로젝트에 대한 멀티 클러스터를 선택한 다음 **확인**을 클릭하세요.

3. 생성된 멀티 클러스터 프로젝트가 목록에 표시됩니다. 멀티 클러스터 프로젝트의 오른쪽에 있는 <img src="/dist/dist/dist/common-icons/3-common-icons/3-common-icons/png" width="15" alt="icon"/>을 클릭하여 드롭다운 메뉴에서 작업을 선택하세요.

   - **정보 편집**: 멀티 클러스터 프로젝트의 기본 정보를 편집.
   - **클러스터 추가**: 멀티 클러스터 프로젝트에 클러스터를 추가하려면, 표시된 대화 상자의 드롭다운 목록에서 클러스터를 선택하고 **확인**을 클릭하세요.
   - **삭제**: 멀티 클러스터 프로젝트를 삭제.


### 멀티 클러스터 프로젝트 편집

1. 멀티 클러스터 프로젝트로 이동하여 **프로젝트 설정** 아래의 **기본 정보**로 이동한 다음 오른쪽에서 **관리**를 클릭하세요.

2. 드롭다운 메뉴에서 **정보 편집**을 선택하세요.

  <div className="notices note">
    <p>Note</p>
    <div>
       프로젝트 이름은 수정할 수 없습니다. 다른 정보를 변경하려면 설명서에서 관련 튜토리얼을를 참조하십시오.
    </div>
  </div>

3. 멀티 클러스터 프로젝트를 삭제하려면 드롭다운 메뉴에서 **프로젝트 삭제**를 선택하세요. 표시되는 대화 상자에서 프로젝트 이름을 입력하고 **확인**을 클릭하여 삭제를 승인하세요.

<div className="notices warning">
  <p>Warning</p>
  <div>
     한번 멀티 클러스터 프로젝트를 삭제하면 복구할 수 없으며 프로젝트의 리소스가 제거됩니다.
  </div>
</div>

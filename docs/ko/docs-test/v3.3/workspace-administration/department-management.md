---
title: "부서 관리"
keywords: 'Super Kubenetes, Kubernetes, Department, Role, Permission, Group'
description: 'Create departments in a workspace and assign users to different departments to implement permission control.'
linkTitle: "Department Management"
weight: 9800
---

이 문서는 워크스페이스 부서를 관리하는 방법을 설명합니다.

워크스페이스의 부서는 권한 제어에 사용되는 논리적 단위입니다. 부서에서 워크스페이스 역할, 멀티 프로젝트 역할, 멀티 DevOps 프로젝트 역할을 설정하고 부서에 사용자를 할당하여 사용자 권한을 일괄적으로 제어할 수 있습니다.

## 사전 준비

- [워크스페이스 및 사용자를 생성](../../quick-start/create-workspace-and-project/)하세요. 사용자에는 워크스페이스에서 `workspace-admin` 역할이 할당되어야 합니다. 이 문서에서는 `demo-ws` 워크스페이스와과 `ws-admin` 계정을 예시로 사용합니다.
- 부서에서 프로젝트 역할이나 DevOps 프로젝트 역할을 설정하려면, 워크스페이스에서 [하나 이상의 프로젝트 또는 DevOps 프로젝트를 생성](../../quick-start/create-workspace-and-project/)해야 합니다.

## 부서 생성

1. Super Kubenetes 웹 콘솔에 `ws-admin`으로 로그인하고 `demo-ws` 워크스페이스로 이동하세요.

2. 왼쪽 내비게이션 바의 **워크스페이스 설정**에서 **부서 관리**를 선택하고 오른쪽에서 **부서 설정**을 클릭하세요.

3. **부서 설정** 대화 상자에서 다음 파라미터를 설정하고, **확인**을 클릭하여 부서를 생성합니다.

  <div className="notices note">
    <p>Note</p>
    <div>
      * 워크스페이스에 이미 부서가 생성되어 있는 경우, **부서 생성**을 클릭하여 워크스페이스에 부서를 추가할 수 있습니다.
      * 각 부서에서 여러개의 부서와 여러개의 하위 부서를 만들 수 있습니다. 하위 부서를 생성하려면 왼쪽의 부서 트리에서 부서를 선택한 다음, 오른쪽의 **부서 생성**을 클릭하세요.
    </div>
  </div>


    * **이름**: 부서명.
    * **별칭**: 부서의 별칭.
    * **워크스페이스 역할**: 현재 워크스페이스에 있는 모든 부서 멤버의 역할.
    * **프로젝트 역할**: 프로젝트에 있는 모든 부서 멤버의 역할. **프로젝트 추가**를 클릭하여 여러 프로젝트 역할을 지정할 수 있습니다. 각 프로젝트에 하나의 역할만 지정할 수 있습니다.
    * **DevOps 프로젝트 역할**: DevOps 프로젝트에 있는 모든 부서 멤버의 역할입니다. **DevOps 프로젝트 추가**를 클릭하여 여러 DevOps 프로젝트 역할을 지정할 수 있습니다. 각 DevOps 프로젝트에 하나의 역할만 지정할 수 있습니다.

4. 부서가 생성되면 **확인**을 클릭하고 **닫기**를 클릭하세요. 생성된 부서는 **부서 관리** 페이지에서 왼쪽의 부서 트리에 표시됩니다.

## 사용자를 부서에 할당

1. **부서 관리** 페이지에서, 왼쪽의 부서 트리에서 부서를 선택하고 오른쪽의 **할당되지 않음**을 클릭하세요.

2. 사용자 목록에서, 사용자 오른쪽의 <img src="/dist/assets/docs/v3.3/workspace-administration/department-management/assign.png" height="20px">를 클릭하고, 표시된 메시지의 **확인**을 클릭하여 사용자를 부서에 할당하세요.

  <div className="notices note">
    <p>Note</p>
    <div>
      * 부서에서 제공하는 권한이 사용자의 기존 권한과 중복되는 경우, 사용자에게 새 권한이 추가됩니다. 사용자의 기존 권한은 영향을 받지 않습니다.
      * 부서에 할당된 사용자는 워크스페이스, 프로젝트, DevOps 프로젝트에 초대받지 않고도, 부서와 연계된 워크스페이스 역할, 프로젝트 역할, DevOps 프로젝트 역할에 따라 작업을 수행할 수 있습니다.
    </div>
  </div>

## 부서에서 사용자 제거

1. **부서 관리** 페이지에서, 왼쪽의 부서 트리에서 부서를 선택하고, 오른쪽의 **할당됨**을 클릭하세요.
2. 할당된 사용자 목록에서, 사용자 오른쪽의 <img src="/dist/assets/docs/v3.3/workspace-administration/department-management/remove.png" height="20px">를 클릭하고, 표시된 대화 상자에 사용자 이름을 입력한 다음, **확인**을 클릭하여 사용자를 제거하세요.

## 부서 삭제 및 편집

1. **부서 관리** 페이지에서 **부서 설정**을 클릭하세요.

2. **부서 설정** 대화 상자의 왼편에서, 편집하거나 삭제할 상위 부서를 클릭하세요.

3. 편집하려는 부서 오른쪽의 <img src="/dist/assets/docs/v3.3/workspace-administration/department-management/edit.png" height="20px">를 클릭하세요.

  <div className="notices note">
    <p>Note</p>
    <div>
      자세한 내용은 [부서 생성](#create-a-department)을 참조하세요.
    </div>
  </div>

4. 부서 오른쪽의 <img src="/dist/assets/docs/v3.3/workspace-administration/department-management/remove.png" height="20px">를 클릭하고 부서 이름을 입력란에 입력하세요. 표시된 대화 상자에서 **확인**을 클릭하면 부서가 삭제됩니다.

  <div className="notices note">
    <p>Note</p>
    <div>
      * 부서에 하위 부서가 포함된 경우, 하위 부서도 함께 삭제됩니다.
      * 부서가 삭제된 후 연결된 역할은 사용자로부터 바인딩 해제됩니다.
    </div>
  </div>

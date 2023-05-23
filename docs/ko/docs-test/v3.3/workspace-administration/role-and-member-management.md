---
title: '워크스페이스 역할 및 멤버 관리'
keywords: 'Kubernetes, workspace, Super Kubenetes, multitenancy'
description: 'Customize a workspace role and grant it to tenants.'
linkTitle: 'Workspace Role and Member Management'
weight: 9400
---

이 튜토리얼에서는 워크스페이스에서 역할과 멤버를 관리하는 방법을 시연합니다.

## 사전 준비

`demo-workspace`와 같은, 하나 이상의 워크스페이스가 생성되어 있어야 합니다. 또한 워크스페이스 수준에서 `workspace-admin` 역할(예: `ws-admin`)의 사용자가 필요합니다. 자세한 내용은 [워크스페이스, 프로젝트, 사용자 및 역할 생성](../../quick-start/create-workspace-and-project/)을 참조하십시오.

<div className="notices note">
  <p>Note</p>
  <div>
    실제 역할 이름은 `워크스페이스 이름-역할 이름`이라는 명명 규칙을 따릅니다. 예를 들어, `demo-workspace`라는 이름의 워크스페이스의 경우, `admin` 역할의 실제 역할 이름은 `demo-workspace-admin`입니다.
  </div>
</div>

## 기본 제공 역할

**워크스페이스 역할**에는 네 가지의 기본 제공되는 역할이 있습니다. 기본 제공되는 역할은 워크스페이스가 생성될 때 Super Kubenetes에 의해 자동으로 생성되며, 편집하거나 삭제할 수 없습니다. 기본 제공 역할에 포함된 권한을 확인하거나 사용자에게 할당할 수만 있습니다.

  <table>
  <thead>
  <tr>
    <th>
      기본 제공 역할
    </th>
    <th>
      설명
    </th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>
      <code>workspace-viewer</code>
    </td>
    <td>
      워크스페이스의 모든 리소스를 볼 수 있는 워크스페이스 뷰어.
    </td>
  </tr>
  <tr>
    <td>
      <code>workspace-self-provisioner</code>
    </td>
    <td>
      워크스페이스 설정을 보고, 앱 템플릿을 관리하고, 프로젝트 및 DevOps 프로젝트를 생성할 수 있는 워크스페이스 정규 멤버.
    </td>
  </tr>
  <tr>
    <td>
      <code>workspace-regular</code>
    </td>
    <td>
      워크스페이스 설정을 볼 수 있는 워크스페이스 정규 멤버.
    </td>
  </tr>
  <tr>
    <td>
      <code>workspace-admin</code>
    </td>
    <td>
      워크스페이스의 모든 리소스를 완전히 제어할 수 있는 워크스페이스 관리자.
    </td>
  </tr>
  </tbody>
  </table>

역할에 포함된 권한을 보려면 다음을 수행하십시오:

1. `ws-admin`으로 콘솔에 로그인하세요. **워크스페이스 역할**에서 역할(예: `workspace-admin`)을 클릭하면 역할 세부 정보를 볼 수 있습니다.

2. 역할이 부여된 모든 사용자를 보려면 **인증된 사용자** 탭을 클릭하세요.

## 워크스페이스 역할 생성

1. **워크스페이스 설정**에서 **워크스페이스 역할**로 이동하세요.

2. **워크스페이스 역할**에서 **생성**를 클릭하고 역할 **이름**을 설정하세요(예: `demo-project-admin`). 계속하려면 **권한 편집**을 클릭하세요.

3. 팝업 창에서, 권한은 다른 **모듈**로 분류됩니다. 이 예제에서는 **프로젝트 관리**를 클릭하고, 이 역할에 대해 **프로젝트 생성**, **프로젝트 관리**, 그리고 **프로젝트 보기**를 선택하세요. **확인**을 클릭하여 역할 생성을 완료합니다.

  <div className="notices note">
    <p>Note</p>
    <div>
      **다음에 종속**은 주요 권한을 먼저 선택해야 연계 권한을 할당할 수 있음을 의미합니다.
    </div>
  </div>

4. 새로 만든 역할은 **워크스페이스 역할**에 열거됩니다. 정보나 권한을 편집하거나 또는 기존 역할을 삭제하려면 오른쪽의 <img src="/dist/assets/docs/v3.3/project-administration/role-and-member-management/three-dots.png" height="20px" alt="icon">를 클릭하세요.

## 새 멤버 초대

1. **워크스페이스 설정** 아래의 **워크스페이스 멤버**로 이동하여 **초대**를 클릭하세요.

2. 오른쪽의 <img src="/dist/assets/docs/v3.3/project-administration/role-and-member-management/add.png" height="20px" alt="icon">를 클릭하여 워크스페이스에 사용자를 초대하고 역할을 할당하세요.

3. 워크스페이스에 사용자를 추가한 후 **확인**을 클릭하세요. **워크스페이스 멤버**의 목록에서 사용자를 볼 수 있습니다.

4. 기존 사용자의 역할을 편집하거나 워크스페이스에서 사용자를 제거하려면 <img src="/dist/assets/docs/v3.3/project-administration/role-and-member-management/three-dots.png" height="20px" alt="icon">를 클릭한 다음, 해당 작업을 선택하세요.

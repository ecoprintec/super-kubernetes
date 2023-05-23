---
title: "프로젝트 역할 및 멤버 관리"
keywords: 'Super Kubenetes, Kubernetes, role, member, management, project'
description: 'Learn how to manage access control for a project.'
linkTitle: "Project Role and Member Management"
weight: 13200
---

이 튜토리얼은 프로젝트에서 역할과 멤버를 관리하는 방법을 시연합니다. 프로젝트 수준에서 다음 모듈의 권한을 역할에 부여할 수 있습니다:

- **애플리케이션 워크로드**
- **저장소**
- **설정**
- **모니터링 & 경고**
- **접속 제어**
- **프로젝트 설정**

## 사전 준비

`demo-project`와 같은 프로젝트가 하나 이상 생성되어 있어야 합니다. 또한 프로젝트 수준의 `admin` 역할의 사용자(예: `project-admin`)가 필요합니다. 자세한 내용은 [워크스페이스, 프로젝트, 사용자 및 역할 생성](../../quick-start/create-workspace-and-project/)을 참조하십시오.

## 기본 제공(Built-in) 역할

**프로젝트 역할**에는 아래와 같이 세 가지 기본 제공 역할이 있습니다. 기본 제공 역할은 프로젝트가 생성될 때 Super Kubenetes에 의해 자동으로 생성되며 편집하거나 삭제할 수 없습니다. 기본 제공 역할에 포함된 권한을 보거나 사용자에게 할당할 수만 있습니다.

<table>
  <tr>
    <th width="17%">기본 제공 역할</th>
    <th width="83%">설명</th>
  </tr>
  <tr>
    <td><code>viewer</code></td>
    <td>프로젝트의 모든 리소스를 볼 수 있는 프로젝트 뷰어입니다.</td>
  </tr>
   <tr>
     <td><code>operator</code></td>
     <td>프로젝트에서 사용자 및 역할 이외의 리소스를 관리할 수 있는 프로젝트 운영자.</td>
  </tr>
  <tr>
    <td><code>admin</code></td>
     <td>프로젝트의 모든 리소스를 완전히 제어할 수 있는 프로젝트 관리자.</td>
  </tr>
</table>

역할에 포함된 권한을 보려면:

1. 콘솔에 `project-admin`으로 로그인하세요. **프로젝트 역할**에서 역할(예: `admin`)을 클릭하여 역할 세부정보를 봅니다.

2. **인증된 사용자** 탭을 클릭하여 역할이 부여된 사용자를 확인하세요.

## 프로젝트 역할 생성

1. **프로젝트 설정**에서 **프로젝트 역할**로 이동하세요.

2. **프로젝트 역할**에서 **생성**을 클릭하고 역할 이름(예: `project-monitor`)을 설정하세요. 계속하려면 **권한 편집**을 클릭합니다.

3. 팝업 창에서, 권한들은 다른 **모듈**들로 분류됩니다. 이 예제에서는 **애플리케이션 워크로드**에서 **애플리케이션 워크로드 보기**를 선택하고 **모니터링 및 경고**에서 **경고 메시지 보기**와 **경고 정책 보기**를 선택하세요. **확인**을 클릭하여 역할 생성을 완료합니다.

  <div className="notices note">
    <p>Note</p>
    <div>
      **다음에 종속**은 주요 권한을 먼저 선택해야 연계 권한을 할당할 수 있음을 의미합니다.
    </div>
  </div>

4. 새로 생성된 역할은 **프로젝트 역할**에 열거됩니다. 기존 역할을 편집하려면 오른쪽의 <img src="/dist/assets/docs/v3.3/project-administration/role-and-member-management/three-dots.png" height="20px" alt="icon">를 클릭하세요.

## 새 멤버 초대

1. **프로젝트 설정** 아래의 **프로젝트 멤버**로 이동하여 **초대**를 클릭하세요.

2.	오른쪽의 <img src="/dist/assets/docs/v3.3/project-administration/role-and-member-management/add.png" height="20px" alt="icon">를 클릭하여 프로젝트에 사용자를 초대하고 역할을 할당하세요.

3. 프로젝트에 사용자를 추가한 후 **확인**을 클릭하세요. **프로젝트 멤버**의 목록에서 추가한 사용자를 볼 수 있습니다.

4. 기존 사용자의 역할을 편집하거나 또는 프로젝트에서 사용자를 제거하려면 오른쪽의 <img src="/dist/assets/docs/v3.3/project-administration/role-and-member-management/three-dots .png" height="20px" alt="icon">를 클릭한 다음, 해당 작업을 선택하세요.


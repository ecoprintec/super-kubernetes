---
title: "DevOps 프로젝트의 역할 및 멤버 관리"
keywords: 'Kubernetes, Super Kubenetes, DevOps, role, member'
description: 'Create and manage roles and members in DevOps projects.'
linkTitle: "Role and Member Management"
weight: 11242
---

이 가이드는 DevOps 프로젝트에서 역할과 멤버를 관리하는 방법을 시연합니다.

DevOps 프로젝트 범위에서 다음 리소스의 권한을 역할에 부여할 수 있습니다.

- 파이프라인
- 자격 증명
- DevOps 설정
- 액세스 제어

## 사전 준비

`demo-devops`와 같은 DevOps 프로젝트가 하나 이상 생성되야 합니다. 또한 DevOps 프로젝트 수준에서 `admin` 역할의 사용자(예: `devops-admin`)가 필요합니다.

## 기본 제공 역할

**DevOps 프로젝트 역할**에는 아래와 같이 세 가지의 기본 제공되는 역할이 있습니다. 기본 제공되는 역할은 DevOps 프로젝트가 생성될 때 Super Kubenetes에 의해 자동으로 생성되며, 편집하거나 삭제할 수 없습니다.

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
      viewer
    </td>
    <td>
      DevOps 프로젝트의 모든 리소스를 볼 수 있습니다.
    </td>
  </tr>
  <tr>
    <td>
      operator
    </td>
    <td>
      DevOps 프로젝트에서 파이프라인 및 자격 증명을 생성할 수 있는 DevOps 프로젝트의 일반 멤버
    </td>
  </tr>
  <tr>
    <td>
      admin
    </td>
    <td>
      모든 리소스에 대해 모든 작업을 수행할 수 있는 DevOps 프로젝트의 관리자. DevOps 프로젝트의 모든 리소스를 완전히 제어할 수 있습니다.
    </td>
  </tr>
  </tbody>
  </table>

## DevOps 프로젝트 역할 생성

1. 콘솔에 `devops-admin`으로 로그인하고 **DevOps Projects** 페이지에서 DevOps 프로젝트(예: `demo-devops`)를 선택하세요.

  <div className="notices note">
    <p>Note</p>
    <div>
      `devops-admin` 계정이 예시로 사용되었습니다. 사용 중인 계정에 DevOps 프로젝트 수준의 **접속 제어**에서 **멤버 보기**, **역할 관리** 및 **역할 보기** 권한을 포함하는 역할이 부여되는 한 DevOps 프로젝트 역할을 만듭니다.
    </div>
  </div>

2. **DevOps 프로젝트 설정**의 **DevOps 프로젝트 역할**로 이동하여 **생성**을 클릭하고 **이름**을 설정하세요. 이 예시에서는 `pipeline-creator`라는 역할이 생성됩니다. 계속하려면 **권한 편집**을 클릭하세요.

3. **파이프라인 관리**에서 이 역할에 포함할 권한을 선택하세요. 예를 들어 **파이프라인 관리** 및 **파이프라인 보기**가 이 역할에 대해 선택됩니다. **확인**을 클릭하여 완료하세요.

  <div className="notices note">
    <p>Note</p>
    <div>
      **다음에 종속**은 주요 권한을 먼저 선택해야 연계 권한을 할당할 수 있음을 의미합니다.
    </div>
  </div> 

4. 새로 생성된 역할은 **DevOps 프로젝트 역할**에 나열됩니다. 우측의 <img src="/dist/assets/docs/v3.3/common-icons/three-dots.png" height="15px" alt="icon">을 클릭하여 편집할 수 있습니다.

  <div className="notices note">
    <p>Note</p>
    <div>
      `파이프라인 생성자`의 역할은 **파이프라인 관리** 및 **파이프라인 보기**만 부여되므로 사용자의 요구를 충족하지 못할 수 있습니다. 이 예는 시연용입니다. 필요에 따라 사용자 정의 역할을 생성할 수 있습니다.
    </div>
  </div> 

## 새 회원 초대

1. **DevOps 프로젝트 설정**에서 **DevOps 프로젝트 멤버**를 선택하고 **초대**를 클릭하세요.

2. <img src="/dist/assets/docs/v3.3/common-icons/invite-member-button.png" height="15px" alt="icon">을 클릭하여 사용자를 DevOps 프로젝트에 초대하세요. 계정에 `파이프라인 생성자` 역할을 부여하세요.

  <div className="notices note">
    <p>Note</p>
    <div>
        먼저 DevOps 프로젝트의 워크스페이스에 사용자를 초대해야 합니다.
    </div>
  </div> 

3. DevOps 프로젝트에 사용자를 추가한 후 **확인**을 클릭하세요. **DevOps 프로젝트 멤버**에서 새로 초대된 멤버가 나열되는 것을 볼 수 있습니다.

4. 기존 멤버의 역할을 편집하여 변경하거나 DevOps 프로젝트에서 제거할 수도 있습니다.




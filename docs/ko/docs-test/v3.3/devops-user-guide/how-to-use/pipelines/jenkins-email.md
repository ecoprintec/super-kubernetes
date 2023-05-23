---
title: "Super Kubenetes 파이프라인용 이메일 서버 설정"
keywords: 'Super Kubenetes, Kubernetes, notification, jenkins, devops, ci/cd, pipeline, email server'
description: 'Set the email server to receive notifications of your Jenkins pipelines.'
linkTitle: "Set Email Server for Super Kubenetes Pipelines"
Weight: 11218
---


기본 제공 Jenkins는 플랫폼 알림 시스템과 동일한 이메일 설정을 공유할 수 없습니다. 따라서 Super Kubenetes DevOps 파이프라인에 대한 이메일 서버 설정을 별도로 설정해야 합니다.

## 사전 준비

- [Super Kubenetes DevOps System](../../../../pluggable-components/devops/)을 활성화해야 합니다.
- **클러스터 관리** 권한을 포함한 역할을 부여받은 사용자가 필요합니다. 예를 들어 콘솔에 직접 `admin`으로 로그인하거나 권한이 있는 새 역할을 생성하여 사용자에게 할당할 수 있습니다.

## 이메일 서버 설정

1. 좌측 상단 모서리에서 **플랫폼**을 클릭하고 **클러스터 관리**를 선택하세요.

2. 가져온 멤버 클러스터와 함께 [멀티 클러스터 기능](../../../../multicluster-management/)을 활성화한 경우 특정 클러스터를 선택하여 해당 노드를 볼 수 있습니다. 기능을 활성화하지 않은 경우 다음 단계를 직접 참조하십시오.

3. **애플리케이션 워크로드** 아래의 **워크로드**로 이동하고 드롭다운 목록에서 **Super Kubenetes-devops-system** 프로젝트를 선택하세요. 
'devops-jenkins' 오른쪽에 있는 <img src="/dist/assets/docs/v3.3/common-icons/three-dots.png" height="15" alt="icon" />을 클릭하고 **YAML 편집**을 선택하여 해당 YAML을 편집하세요.

4. 아래 이미지에서 지정해야 하는 영역까지 아래로 스크롤하세요. 완료되면 **확인**을 클릭하여 변경 사항을 저장합니다.

  <div className="notices warning">
    <p>Warning</p>
    <div>
        `devops-jenkins` 배포에서 이메일 서버를 수정하면 자체적으로 다시 시작됩니다. 따라서 DevOps 시스템은 몇 분 동안 사용할 수 없습니다. 적절한 시기에 수정하시기 바랍니다.
    </div>
  </div>

   ![set-jenkins-email](/dist/assets/docs/v3.3/devops-user-guide/using-devops/jenkins-email/set-jenkins-email.png)

  <table>
  <thead>
  <tr>
    <th>
      환경 변수 이름
    </th>
    <th>
      설명
    </th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>
      EMAIL_SMTP_HOST
    </td>
    <td>
      SMTP 서버 주소
    </td>
  </tr>
  <tr>
    <td>
      EMAIL_SMTP_PORT
    </td>
    <td>
      SMTP 서버 포트 (예: 25)
    </td>
  </tr>
  <tr>
    <td>
      EMAIL_FROM_ADDR
    </td>
    <td>
      Email 발신자 주소
    </td>
  </tr>
  <tr>
    <td>
      EMAIL_FROM_NAME
    </td>
    <td>
      Email 발신자 이름
    </td>
  </tr>
  <tr>
    <td>
      EMAIL_FROM_PASS
    </td>
    <td>
      Email 발신자 비밀번호
    </td>
  </tr>
  <tr>
    <td>
      EMAIL_USE_SSL
    </td>
    <td>
      SSL 설정 활성화 여부
    </td>
  </tr>
  </tbody>
  </table>

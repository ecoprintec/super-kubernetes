---
title: "Super Kubenetes에서 PostgreSQL 배포"
keywords: 'Kubernetes, Super Kubenetes, PostgreSQL, app-store'
description: 'Learn how to deploy PostgreSQL from the App Store of Super Kubenetes and access its service.'
linkTitle: "Deploy PostgreSQL on Super Kubenetes"
weight: 14280
---

[PostgreSQL](https://www.postgresql.org/)은 신뢰성, 강력한 기능 및 성능으로 유명한 강력한 오픈 소스 객체 관계형 데이터베이스 시스템입니다.

이 튜토리얼에서는 Super Kubenetes의 앱 스토어에서에서 PostgreSQL를 배포하는 예시를 소개합니다.

## 사전 준비

- [OpenPitrix 시스템](../../../pluggable-components/app-store/) 활성화 상태인지를 확인하십시오.
- 이 튜토리얼에서는 워크스페이스, 프로젝트 및 사용자 계정(project-regular)을 생성해야 합니다. 계정은 플랫폼 일반 사용자여야 하며 운영자 역할이 있는 프로젝트 운영자로 초대되어야 합니다. 이 튜토리얼에서는 `project-regular`로 로그인하여 `demo-workspace` 작업 공간의 `demo-project` 프로젝트에서 작업합니다. 자세한 내용은 [워크스페이스, 프로젝트, 사용자 및 역할 생성하기](../../../quick-start/create-workspace-and-project/)를 참조하십시오.

## 실습실

### 1단계: 앱 스토어에서 PostgreSQL 배포

1. 프로젝트 `demo-project`의 **개요** 페이지에서, 좌측 상단 모서리의 **앱 스토어**를 클릭합니다.

2. PostgreSQL를 찾아서 **앱 정보** 페이지의 **설치**을 클릭합니다.

3. 이름을 설정하고 앱 버전을 선택하세요. PostgreSQL이 `demo-project`에 배포되었는지 확인하고 **다음**을 클릭합니다.

4. **앱 설정**에서 앱의 퍼시스턴트 볼륨을 지정하고, 앱에 접속하는데 사용할 사용자이름과 비밀번호를 설정합니다. 완료되면 **설치**를 클릭하세요.

  <div className="notices note">
    <p>Note</p>
    <div>
      PostgreSQL에 대한 추가 값을 지정하려면, 토글 스위치를 사용하여 앱의 매니페스트를 YAML 형식으로 변경하고 해당 설정을 편집하십시오.
    </div>
  </div> 

5. PostgreSQL이 실행될 때까지 기다립니다.

### 2단계: PostgreSQL database 접속하기

클러스터 외부에서 PostgreSQL에 액세스하려면 먼저 NodePort를 통해 앱을 노출해야 합니다.

1. **서비스**로 이동하여 PostgreSQL의 서비스 이름을 클릭합니다.

2. **더보기**를 클릭하고 드롭다운 메뉴에서 **외부 접속 편집**를 선택하세요.

3. **접속 방법**에 대해 **NodePort**를 선택하고 **OK**를 클릭합니다. 자세한 내용은 [프로젝트 게이트웨이](../../../project-administration/project-gateway/)를 참조하십시오.

4. **Ports**에서, 포트가 노출된 것을 확인할 수 있으며, 이는 다음 단계에서 PostgreSQL 데이터베이스에 접속하기 위해 사용됩니다.

5. **파드**에서 메뉴를 확장하여 컨테이너 세부사항을 확인하고, **터미널** 아이콘을 클릭합니다. 팝업창에서 직접 명령어를 입력하여 데이터베이스에 접속하세요.

   ![postgresql-output](/dist/assets/docs/v3.3/appstore/built-in-apps/postgresql-app/postgresql-output.png)

  <div className="notices note">
    <p>Note</p>
    <div>
      데이터베이스에 연결하기 위해 SQLPro Studio와 같은 타사 응용 프로그램을 사용할 수도 있습니다. 쿠버네티스 클러스터가 어디에 배포되었는지에 따라, 보안그룹에서 포트를 열고 관련된 포트 포워딩 규칙을 설정해야 할 수 있습니다.
    </div>
  </div>


6. 자세한 정보는 [공식 PostgreSQL 문서](https://www.postgresql.org/docs/)를 참조하십시오.

---
title: "Super Kubenetes에서 MySQL 배포"
keywords: 'Super Kubenetes, Kubernetes, Installation, MySQL'
description: 'Learn how to deploy MySQL from the App Store of Super Kubenetes and access its service.'
link title: "Deploy MySQL"
weight: 14260
---
[MySQL](https://www.mysql.com/)은 가장 일반적으로 사용되는 데이터베이스 관리 언어인 SQL(Structured Query Language)을 데이터베이스 관리에 사용하는 오픈 소스 관계형 데이터베이스 관리 시스템(RDBMS)입니다. 이것은 클라우드 기반의 애플리케이션을 배포하기 위해 세계에서 가장 인기 있는 오픈 소스 데이터베이스를 사용하여 완전히 관리되는 데이터베이스 서비스를 제공합니다.

이 튜토리얼에서는 Super Kubenetes의 앱 스토어에서 MySQL를 배포하는 예시를 소개합니다.

## 사전 준비

- [OpenPitrix 시스템](../../../pluggable-components/app-store/) 활성화 상태인지를 확인하십시오.
- 이 튜토리얼에서는 워크스페이스, 프로젝트 및 사용자 계정을 생성해야 합니다. 계정은 플랫폼 일반 사용자여야 하며 운영자 역할이 있는 프로젝트 운영자로 초대되어야 합니다. 이 튜토리얼에서는 `project-regular`로 로그인하여 `demo-workspace` 작업 공간의 `demo-project` 프로젝트에서 작업합니다. 자세한 내용은 [워크스페이스, 프로젝트, 사용자 및 역할 생성하기](../../../quick-start/create-workspace-and-project/)를 참조하십시오.

## 실습실

### 1단계:앱 스토어에서 MySQL 배포

1. 프로젝트 `demo-project`의 **개요** 페이지에서, 좌측 상단 모서리의 **앱 스토어**를 클릭합니다.

2. MySQL을 찾아서 **앱 정보** 페이지의 **설치**을 클릭합니다.

3. 이름을 설정하고 앱 버전을 선택하세요. MySQL이 `demo-project`에 배포되었는지 확인하고 **다음**을 클릭합니다.

4. **앱 설정**에서, mysqlRootPassword 영역의 주석을 해제하고 패스워드를 사용자 지정합니다. 계속하려면 **설치**를 클릭하세요.

5. MySQL이 실행될 때까지 기다립니다.

### 2단계: MySQL 터미널 접속하기

1. **워크로드**로 이동하여 MySQL의 워크로드 이름을 클릭하세요.

2. **파드**에서 메뉴를 확장하여 컨테이너 세부사항을 확인하고, **터미널** 아이콘을 클릭합니다.

3. 터미널에서`mysql -uroot -ptesting`을 실행하여 MySQL에 루트 사용자로 로그인합니다.

   ![log-in-mysql](/dist/assets/docs/v3.3/appstore/built-in-apps/mysql-app/log-in-mysql.png)

### 3단계: 클러스터 외부에서 MySQL 데이터베이스 접속하기

클러스터 외부에서 MySQL에 액세스하려면 먼저 NodePort를 통해 앱을 노출해야 합니다.

1. **서비스**로 이동하여 MySQL의 서비스 이름을 클릭합니다.

2. **더보기**를 클릭하고 드롭다운 메뉴에서 **외부 접속 편집**를 선택하세요.

3. **접속 방법**에 대해 **NodePort**를 선택하고 **OK**를 클릭합니다. 자세한 내용은 [프로젝트 게이트웨이](../../../project-administration/project-gateway/)를 참조하십시오.

4. **Ports**에서, 포트가 노출된 것을 확인할 수 있습니다. 포트 및 공용 IP 주소는 다음 단계에서 MySQL 데이터베이스에 액세스하는 데 사용됩니다.

5. 데이터베이스에 접속하려면, 연결을 위해 MySQL 클라이언트를 사용하거나 SQLPro Studio와 같은 타사 응용 프로그램을 설치해야 합니다. 다음 예제에서는 SQLPro Studio를 통해 MySQL 데이터베이스에 액세스하는 방법을 보여 줍니다.

   ![login](/dist/assets/docs/v3.3/appstore/built-in-apps/mysql-app/login.png)

   ![access-mysql-success](/dist/assets/docs/v3.3/appstore/built-in-apps/mysql-app/access-mysql-success.png)

  <div className="notices note">
    <p>Note</p>
    <div>
      쿠버네티스 클러스터가 어디에 배포되었는지에 따라, 보안그룹에서 포트를 열고 관련된 포트 포워딩 규칙을 설정해야 할 수 있습니다.
    </div>
  </div>

6. MySQL에 대한 자세한 정보는 [공식 MySQL 문서](https://dev.mysql.com/doc/)를 참조하십시오.

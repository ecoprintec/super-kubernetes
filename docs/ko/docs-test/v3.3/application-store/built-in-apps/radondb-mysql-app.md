---
title: "Super Kubenetes에서 RadonDB MySQL 배포"
keywords: 'Super Kubenetes, Kubernetes, Installation, RadonDB MySQL'
description: 'Learn how to deploy RadonDB MySQL from the App Store of Super Kubenetes and access its service.'
linkTitle: "Deploy RadonDB MySQL on Super Kubenetes"
weight: 14293
---

[RadonDB MySQL](https://github.com/radondb/radondb-mysql-kubernetes)은 [MySQL](https://MySQL.com) 데이터베이스를 기반으로 하는 오픈 소스, 클라우드 기반의 고가용성 클러스터 솔루션입니다. Raft 프로토콜을 이용해 RadonDB MySQL은 트랜잭션 손실 없이 빠른 페일오버를 가능하게 합니다.

이 튜토리얼에서는 Super Kubenetes의 앱 스토어에서 RadonDB MySQL를 배포하는 예시를 설명합니다.

<div className="notices note">
  <p>Note</p>
  <div>
    **앱 스토어**의 RadonDB MySQL 버전은 v1.0.0이며 더 이상 유지 관리되지 않습니다.

    우리는 라돈의 최신 버전을 사용하는 것을 추천합니다. 배포 지침은 [RadonDB MySQL Operator 및 Cluster 배포](../../external-apps/deploy-radondb-mysql/)를 참조하십시오.
  </div>
</div>


## 사전 준비

- [OpenPitrix 시스템](../../../pluggable-components/app-store/) 활성화 상태인지를 확인하십시오.
- 이 튜토리얼에서는 워크스페이스, 프로젝트 및 사용자 계정(project-regular)을 생성해야 합니다. 계정은 플랫폼 일반 사용자여야 하며 운영자 역할이 있는 프로젝트 운영자로 초대되어야 합니다. 이 튜토리얼에서는 `project-regular`로 로그인하여 `demo-workspace` 작업 공간의 `demo-project` 프로젝트에서 작업합니다. 자세한 내용은 [워크스페이스, 프로젝트, 사용자 및 역할 생성하기](../../../quick-start/create-workspace-and-project/)를 참조하십시오.

## 실습실

### 1단계: 앱 스토어에서 RadonDB MySQL 배포

1. 프로젝트 `demo-project`의 **개요** 페이지에서, 좌측 상단 모서리의 **앱 스토어**를 클릭하세요.

2. RadonDB MySQL를 찾아서 **앱 정보** 페이지의 **설치**를 클릭하세요.

3. 이름을 설정하고 앱 버전을 선택하세요. RadonDB MySQL이 `demo-project`에 배포되었는지 확인하고 **다음**을 클릭하세요.

4. **앱 설정**에서 기본 설정을 사용하거나 YAML 파일을 직접 편집하여 사용자 지정 설정을 사용할 수 있습니다. 계속하려면 **설치**를 클릭하세요. 

5. RadonDB MySQL이 실행될 때까지 기다립니다.

### 2단계: RadonDB MySQL 접속하기

1. **애플리케이션 워크로드** 아래의 **서비스**에서 RadonDB MySQL의 서비스 이름을 클릭하세요.

2. **파드**에서 메뉴를 확장하여 컨테이너 세부사항을 확인하고, **터미널** 아이콘을 클릭하세요.

3. 앱을 사용하기 위해 팝업창의 터미널에 직접 명령을 입력하세요.

   ![Access RadonDB MySQL](/dist/assets/docs/v3.3/appstore/built-in-apps/radondb-mysql-app/radondb-mysql-service-terminal.png)

4. 클러스터 외부에서 RadonDB MySQL에 접속하려면 [RadonDB MySQL의 오픈 소스 프로젝트](https://github.com/radondb/radondb-mysql-kubernetes)를 참조하십시오.

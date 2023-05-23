---
title: "Super Kubenetes에서 MongoDB 배포"
keywords: 'Super Kubenetes, Kubernetes, Installation, MongoDB'
description: 'Learn how to deploy MongoDB from the App Store of Super Kubenetes and access its service.'
linkTitle: "Deploy MongoDB on Super Kubenetes"
weight: 14250
---

[MongoDB](https://www.mongodb.com/)는 현대 애플리케이션 개발자와 클라우드 시대를 위해 만들어진 범용·문서 기반·분산 데이터베이스입니다.

이 튜토리얼에서는 Super Kubenetes의 앱 스토어에서 MongoDB를 배포하는 예시를 소개합니다.

## 사전 준비

- [OpenPitrix 시스템](../../../pluggable-components/app-store/) 활성화 상태인지를 확인하십시오.
- 이 튜토리얼에서는 워크스페이스, 프로젝트 및 사용자 계정(project-regular)을 생성해야 합니다. 계정은 플랫폼 일반 사용자여야 하며 운영자 역할이 있는 프로젝트 운영자로 초대되어야 합니다. 이 튜토리얼에서는 `project-regular`로 로그인하여 `demo-workspace` 작업 공간의 `demo-project` 프로젝트에서 작업합니다. 자세한 내용은 [워크스페이스, 프로젝트, 사용자 및 역할 생성하기](../../../quick-start/create-workspace-and-project/)를 참조하십시오.

## 실습실

### 1단계: 앱 스토어에서 MongoDB 배포

1. 프로젝트 `demo-project`의 **개요** 페이지에서, 좌측 상단 모서리의 **앱 스토어**를 클릭합니다.

2. MongoDB를 찾아서 **앱 정보** 페이지의 **설치**를 클릭합니다.

3. 이름을 설정하고 앱 버전을 선택하세요. MongoDB가 `demo-project`에 배포되었는지 확인하고 **다음**을 클릭합니다.

4. **앱 설정**에서 앱의 퍼시스턴트 볼륨을 지정하고, 앱에 액세스하는데 사용할 사용자이름과 비밀번호를 설정합니다. 완료되면 **설치**를 클릭하세요.

  <div className="notices note">
    <p>Note</p>
    <div>
      MongoDB에 대한 추가 값을 지정하려면, 토글 스위치를 사용하여 앱의 매니페스트를 YAML 형식으로 변경하고 해당 설정을 편집하십시오.
    </div>
  </div>


5. MongoDB가 실행될 때까지 기다립니다.

### 2단계: MongoDB 터미널 접속하기

1. **서비스**로 이동하여 MongoDB의 서비스 이름을 클릭합니다.

2. **파드**에서 메뉴를 확장하여 컨테이너 세부사항을 확인하고, **터미널** 아이콘을 클릭합니다.

3. 앱을 사용하기 위해 팝업창의 터미널에 직접 명령을 입력하십시오.

   ![mongodb-service-terminal](/dist/assets/docs/v3.3/appstore/built-in-apps/mongodb-app/mongodb-service-terminal.jpg)

  <div className="notices note">
    <p>Note</p>
    <div>
      클러스터 외부에서 MongoDB에 액세스하려면 **더보기**를 클릭하고 **외부 접속 편집**을 선택하세요. 표시되는 대화 상자에서 **NodePort**를 액세스 모드로 선택합니다. 포트 번호가 노출되면 그것을 사용하여 MongoDB에 액세스합니다.
      쿠버네티스 클러스터가 어디에 배포되었는지에 따라, 보안그룹에서 포트를 열고 관련된 포트 포워딩 규칙을 설정해야 할 수 있습니다.

    </div>
  </div>

4. 자세한 정보는 [공식 MongoDB 문서](https://docs.mongodb.com/manual/)를 참조하십시오.

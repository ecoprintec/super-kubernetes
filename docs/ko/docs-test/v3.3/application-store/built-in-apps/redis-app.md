---
title: "Super Kubenetes에서 Redis 배포"
keywords: 'Super Kubenetes, Kubernetes, Installation, Redis'
description: 'Learn how to deploy Redis from the App Store of Super Kubenetes and access its service.'
linkTitle: "Deploy Redis on Super Kubenetes"
weight: 14291
---

[Redis](https://redis.io/)는 오픈 소스(BSD 라이선스), 인메모리 데이터 구조 저장소로 데이터베이스, 캐시 및 메시지 브로커로 사용됩니다.

이 튜토리얼에서는 Super Kubenetes의 앱 스토어에서에서 Redis를 배포하는 예시를 소개합니다.

## 사전 준비

- [OpenPitrix 시스템](../../../pluggable-components/app-store/) 활성화 상태인지를 확인하십시오.
- 이 튜토리얼에서는 워크스페이스, 프로젝트 및 사용자 계정(project-regular)을 생성해야 합니다. 계정은 플랫폼 일반 사용자여야 하며 운영자 역할이 있는 프로젝트 운영자로 초대되어야 합니다. 이 튜토리얼에서는 `project-regular`로 로그인하여 `demo-workspace` 작업 공간의 `demo-project` 프로젝트에서 작업합니다. 자세한 내용은 [워크스페이스, 프로젝트, 사용자 및 역할 생성하기](../../../quick-start/create-workspace-and-project/)를 참조하십시오.

## 실습실

### 1단계: 앱 스토어에서 Redis 배포

1. 프로젝트 `demo-project`의 **개요** 페이지에서, 좌측 상단 모서리의 **앱 스토어**를 클릭합니다.

2. Redis를 찾아서 **앱 정보** 페이지의 **설치**를 클릭합니다.

3. 이름을 설정하고 앱 버전을 선택하세요. Redis가 `demo-project`에 배포되었는지 확인하고 **다음**을 클릭합니다.

4. **앱 설정**에서 앱의 퍼시스턴트 볼륨을 지정하고, 앱에 접속하는데 사용할 사용자이름과 비밀번호를 설정합니다. 완료되면 **설치**를 클릭하세요.

  <div className="notices note">
    <p>Note</p>
    <div>
      Redis에 대한 추가 값을 지정하려면, 토글 스위치를 사용하여 앱의 매니페스트를 YAML 형식으로 변경하고 해당 설정을 편집하십시오.
    </div>
  </div>


5. Redis가 실행될 때까지 기다립니다.

### 2단계: Redis terminal 접속하기

1. **서비스**로 이동하여 Redis의 서비스 이름을 클릭하세요.

2. **파드**에서 메뉴를 확장하여 컨테이너 세부사항을 확인하고, **터미널** 아이콘을 클릭합니다.

3.  앱을 사용하기 위해 팝업창에서 `redis-cli` 명령어를 입력하세요.


   ![use-redis](/dist/assets/docs/v3.3/appstore/built-in-apps/redis-app/use-redis.png)

4. 자세한 내용은 [공식 Redis 문서](https://redis.io/documentation)를 참조하십시오.

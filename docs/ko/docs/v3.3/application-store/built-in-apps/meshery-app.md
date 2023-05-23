---
title: "Super Kubenetes에서 Meshery 배포"
keywords: 'Kubernetes, Super Kubenetes, Meshery,Serive Mesh, Layer5, app-store'
description: 'Learn how to deploy Meshery from the App Store of Super Kubenetes and access its service.'
linkTitle: "Deploy Meshery on Super Kubenetes"
weight: 14240
---
[Meshery](https://meshery.io/)는 쿠버네티스와 모든 서비스 메시 및 해당 워크로드를 채택, 운영 및 관리할 수 있도록 하는 오픈 소스의 클라우드 기반 관리 플레인입니다.

이 튜토리얼에서는 Super Kubenetes의 앱 스토어에서 Meshery를 배포하는 예시를 소개합니다.

## 사전 준비

- [OpenPitrix 시스템](../../../pluggable-components/app-store/) 활성화 상태인지를 확인하십시오.
- 이 튜토리얼에서는 워크스페이스, 프로젝트 및 사용자 계정(project-regular)을 생성해야 합니다. 계정은 플랫폼 일반 사용자여야 하며 운영자 역할이 있는 프로젝트 운영자로 초대되어야 합니다. 이 튜토리얼에서는 `project-regular`로 로그인하여 `demo-workspace` 작업 공간의 `demo-project` 프로젝트에서 작업합니다. 자세한 내용은 [워크스페이스, 프로젝트, 사용자 및 역할 생성하기](../../../quick-start/create-workspace-and-project/)를 참조하십시오.

## 실습실

### 1단계: 앱 스토어에서 Meshery 배포

1. 프로젝트 `demo-project`의 **개요** 페이지에서, 좌측 상단 모서리의 **앱 스토어**를 클릭합니다.

2. 앱 스토어에서 **Meshery**를 검색하고, 검색 결과를 클릭하여 앱 정보 페이지로 이동합니다.

    ![meshery-app](/dist/assets/docs/v3.3/appstore/built-in-apps/meshery-app/meshery-app.png)

3. **앱 정보** 페이지에서, 오른쪽 상단의 **설치**을 클릭하세요.

    ![meshery-install](/dist/assets/docs/v3.3/appstore/built-in-apps/meshery-app/Meshery-install.png)

4. 앱 설정 페이지에서 애플리케이션의 **Name**, **Location** (사용자의 네임스페이스로)과 앱 버전을 설정하고, 오른쪽 상단에서 '다음'을 클릭합니다.

    ![meshery-info](/dist/assets/docs/v3.3/appstore/built-in-apps/meshery-app/Meshery-info.png)

5. 필요에 따라 **values.yaml** 파일을 새로 설정하거나, 또는 **설치**을 클릭하여 기본 설정을 사용하세요.

    ![meshery-yaml](/dist/assets/docs/v3.3/appstore/built-in-apps/meshery-app/Meshery-yaml.png)

6. 배포가 완료될 때까지 기다리십시오. 완료되면 **Meshery**가 Super Kubenetes에서 **Running**으로 표시됩니다.

    ![meshery-app-running](/dist/assets/docs/v3.3/appstore/built-in-apps/meshery-app/Meshery-app-running.png)

### 2단계: Meshery 대시보드에 접속하기

1. **서비스**로 이동하여 Meshery의 서비스 이름을 클릭하세요.

2. **리소스 상태** 페이지에서, Meshery의 **NodePort**를 복사하세요.

    ![meshery-service](/dist/assets/docs/v3.3/appstore/built-in-apps/meshery-app/Meshery-service.png)

3. 브라우저에서, **${NodeIP}:${NODEPORT}**를 입력하여 Meshery 대시보드에 접속하세요.

    ![meshery-dashboard](/dist/assets/docs/v3.3/appstore/built-in-apps/meshery-app/meshery-dashboard.png)

4. Meshery에 대한 자세한 내용은 [공식 Meshery 문서](https://docs.meshery.io/)를 참조하십시오.

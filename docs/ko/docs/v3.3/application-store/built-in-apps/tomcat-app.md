---
title: "Super Kubenetes에서 Tomcat 배포"
keywords: 'Super Kubenetes, Kubernetes, Installation, Tomcat'
description: 'Learn how to deploy Tomcat from the App Store of Super Kubenetes and access its service.'
linkTitle: "Deploy Tomcat on Super Kubenetes"
weight: 14292
---
[Apache Tomcat](https://tomcat.apache.org/index.html)은 다양한 범주의 산업 및 조직에 걸쳐 수많은 대규모의 미션 크리티컬 웹 애플리케이션을 지원합니다. Tomcat은 Java 코드를 실행할 수 있는 순수한 Java HTTP 웹 서버 환경을 제공합니다.

이 튜토리얼에서는 Super Kubenetes의 앱 스토어에서 Tomcat을 배포하는 예시를 소개합니다.

## 사전 준비

- [OpenPitrix 시스템](../../../pluggable-components/app-store/) 활성화 상태인지를 확인하십시오.
- 이 튜토리얼에서는 워크스페이스, 프로젝트 및 사용자 계정(project-regular)을 생성해야 합니다. 계정은 플랫폼 일반 사용자여야 하며 운영자 역할이 있는 프로젝트 운영자로 초대되어야 합니다. 이 튜토리얼에서는 `project-regular`로 로그인하여 `demo-workspace` 작업 공간의 `demo-project` 프로젝트에서 작업합니다. 자세한 내용은 [워크스페이스, 프로젝트, 사용자 및 역할 생성하기](../../../quick-start/create-workspace-and-project/)를 참조하십시오.

## 실습실

### 1단계: 앱 스토어에서 Tomcat 배포

1. 프로젝트 `demo-project`의 **개요** 페이지에서, 좌측 상단 모서리의 **앱 스토어**를 클릭합니다.

2. Tomcat를 찾아서 **앱 정보** 페이지의 **설치**를 클릭합니다.

3. 이름을 설정하고 앱 버전을 선택하세요. Tomcat이 `demo-project`에 배포되었는지 확인하고 **다음**을 클릭합니다.

2. **앱 설정**에서 기본 설정을 사용하거나 YAML 파일을 직접 편집하여 사용자 지정 설정을 사용할 수 있습니다. 계속하려면 **설치**를 클릭하세요. 

3. Tomcat이 실행될 때까지 기다립니다.

### 2단계: Tomcat 터미널 접속하기

1. **서비스**로 이동하여 Tomcat의 서비스 이름을 클릭합니다.

2. **파드**에서 메뉴를 확장하여 컨테이너 세부사항을 확인하고, **터미널** 아이콘을 클릭합니다.

3. `/usr/local/tomcat/webapps`에서 배포된 프로젝트들을 확인할 수 있습니다.

   ![view-project](/dist/assets/docs/v3.3/appstore/built-in-apps/tomcat-app/view-project.png)

### 3단계: 브라우저에서 Tomcat 프로젝트 접속하기

클러스터 외부에서 Tomcat 프로젝트에 액세스하려면 먼저 NodePort를 통해 앱을 노출해야 합니다.

1. **서비스**로 이동하여 Tomcat의 서비스 이름을 클릭합니다.

2. Click **더보기**를 클릭하고, 드롭다운 목록에서 **외부 접속 편집**를 선택하세요.

3. **접속 방법**에 대해 **NodePort**를 선택하고 **OK**를 클릭합니다. 자세한 내용은 [프로젝트 게이트웨이](../../../project-administration/project-gateway/)를 참조하십시오.

4. **Ports**에서, 포트가 노출된 것을 확인할 수 있습니다.

5. 브라우저에서 `<NodeIP>:<NodePort>/sample`를 통해 Tomcat 프로젝트 샘플에 접속하세요.

   ![access-tomcat-browser](/dist/assets/docs/v3.3/appstore/built-in-apps/tomcat-app/access-tomcat-browser.png)

  <div className="notices note">
    <p>Note</p>
    <div>
      쿠버네티스 클러스터가 어디에 배포되었는지에 따라, 보안그룹에서 포트를 열고 관련된 포트 포워딩 규칙을 설정해야 할 수 있습니다.
    </div>
  </div>


6. Tomcat에 대한 자세한 내용은 [공식 Tomcat 문서](https://tomcat.apache.org/index.html)를 참조하십시오.

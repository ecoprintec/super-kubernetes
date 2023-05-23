---
title: "Super Kubenetes에서 NGINX 배포"
keywords: 'Super Kubenetes, Kubernetes, Installation, NGINX'
description: 'Learn how to deploy NGINX from the App Store of Super Kubenetes and access its service.'
linkTitle: "Deploy NGINX on Super Kubenetes"
weight: 14270
---

[NGINX](https://www.nginx.com/)는 웹 서비스, 역방향 프록시, 캐싱, 로드 밸런싱, 미디어 스트리밍 등을 위한 오픈 소스 소프트웨어 애플리케이션입니다.

이 튜토리얼에서는 Super Kubenetes의 앱 스토어에서 NGINX를 배포하는 예시를 소개합니다.

## 사전 준비

- [OpenPitrix 시스템](../../../pluggable-components/app-store/) 활성화 상태인지를 확인하십시오.
- 이 튜토리얼에서는 워크스페이스, 프로젝트 및 사용자 계정(project-regular)을 생성해야 합니다. 계정은 플랫폼 일반 사용자여야 하며 운영자 역할이 있는 프로젝트 운영자로 초대되어야 합니다. 이 튜토리얼에서는 `project-regular`로 로그인하여 `demo-workspace` 작업 공간의 `demo-project` 프로젝트에서 작업합니다. 자세한 내용은 [워크스페이스, 프로젝트, 사용자 및 역할 생성하기](../../../quick-start/create-workspace-and-project/)를 참조하십시오.

## 실습실

### 1단계: 앱 스토어에서 NGINX 배포

1. 프로젝트 `demo-project`의 **개요** 페이지에서, 좌측 상단 모서리의 **앱 스토어**를 클릭합니다.

2. NGINX를 찾아서 **앱 정보** 페이지의 **설치**을 클릭합니다.

3. 이름을 설정하고 앱 버전을 선택하세요. NGINX가 `demo-project`에 배포되었는지 확인하고 **다음**을 클릭합니다.

4. **앱 설정**에서 앱에 배포할 레플리카 수를 지정하고 필요에 따라 인그레스를 활성화합니다. 완료되면 **설치**를 클릭하세요.

  <div className="notices note">
    <p>Note</p>
    <div>
      NGINX에 대한 추가 값을 지정하려면, 토글 스위치를 사용하여 앱의 매니페스트를 YAML 형식으로 변경하고 해당 설정을 편집하십시오.
    </div>
  </div>

5. NGINX가 실행될 때까지 기다립니다.

### 2단계: NGINX 접속하기

클러스터 외부에서 NGINX에 액세스하려면 먼저 NodePort를 통해 앱을 노출해야 합니다.

1. **서비스**로 이동하여 NGINX의 서비스 이름을 클릭합니다.

2. **더보기**를 클릭하고 드롭다운 메뉴에서 **외부 접속 편집**를 선택하세요.

3. **접속 방법**에 대해 **NodePort**를 선택하고 **OK**를 클릭합니다. 자세한 내용은 [프로젝트 게이트웨이](../../../project-administration/project-gateway/)를 참조하십시오.

4. **Ports**에서, 포트가 노출된 것을 확인할 수 있습니다.

5. `<NodeIP>:<NodePort>`를 통해 NGINX에 접속합니다.

   ![access-nginx](/dist/assets/docs/v3.3/appstore/built-in-apps/nginx-app/access-nginx.png)

  <div className="notices note">
    <p>Note</p>
    <div>
      쿠버네티스 클러스터가 어디에 배포되었는지에 따라, 보안그룹에서 포트를 열고 관련된 포트 포워딩 규칙을 설정해야 할 수 있습니다.
    </div>
  </div>


6. 자세한 정보는 [공식 NGINX 문서](https://docs.nginx.com/?_ga=2.48327718.1445131049.1605510038-1186152749.1605510038)를 참조하십시오.

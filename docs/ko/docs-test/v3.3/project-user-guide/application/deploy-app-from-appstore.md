---
title: "앱 스토어에서 앱 배포"
keywords: 'Kubernetes, Chart, Helm, Super Kubenetes, Application, App Store'
description: 'Learn how to deploy an application from the App Store.'
linkTitle: "Deploy Apps from the App Store"
weight: 10130
---

[앱 스토어](../../../application-store/)는 플랫폼의 퍼블릭 앱 리포지토리이기도 하며, 이는 속해 있는 워크스페이스에 관계없이, 플랫폼의 모든 테넌트가 스토어의 애플리케이션을 볼 수 있음을 의미합니다. 앱 스토어에는 16개의 기업용 컨테이너형 앱과 플랫폼의 다양한 워크스페이스에서 테넌트가 출시한 앱이 포함되어 있습니다. 인증된 모든 사용자는 스토어에서 애플리케이션을 배포할 수 있습니다. 이는 프라이빗 앱 리포지토리를 불러온 워크스페이스의 테넌트만 접속할 수 있는 프라이빗 앱 리포지토리와 다릅니다.

이 튜토리얼은 [OpenPitrix](https://github.com/openpitrix/openpitrix) 기반 Super Kubenetes 앱 스토어에서 [NGINX](https://www.nginx.com/)를 빠르게 배포하고 노드 포트를 통해 서비스에 접속하는 방법을 시연합니다.

## 사전 준비

- [OpenPitrix(앱 스토어)](../../../pluggable-components/app-store/)를 활성화해야 합니다.
- 이 튜토리얼에서는 워크스페이스, 프로젝트 및 사용자(`project-regular`)를 생성해야 합니다. 사용자를 프로젝트에 초대하고 `operator` 역할을 부여해야 합니다. 자세한 내용은 [워크스페이스, 프로젝트, 사용자 및 역할 생성](../../../quick-start/create-workspace-and-project/)을 참조하십시오.

## 실습실

### 1단계: 앱 스토어에서 NGINX 배포

1. Super Kubenetes의 웹 콘솔에 `project-regular`로 로그인하고, 좌측 상단의 <b>앱 스토어</b>를 클릭하세요.

  <div className="notices note">
    <p>Note</p>
    <div>
      프로젝트의 <b>애플리케이션 워크로드</b> 아래에 있는 <b>앱</b>으로 이동하고 <b>생성</b>을 클릭한 다음, <b>앱 스토어에서</b>를 선택하여 앱 스토어로 이동할 수도 있습니다.
    </div>
  </div>

2. NGINX를 검색하여 클릭한 다음, <b>앱 정보</b> 페이지에서 <b>설치</b>를 클릭하세요. 표시된 <b>앱 배포 동의</b> 대화 상자에서 <b>동의</b>를 클릭해야 합니다.

3. 이름을 설정, 앱 버전을 선택, 그리고 NGINX가 배포될 위치를 확인하고 <b>다음</b>을 클릭하세요.

4. <b>앱 설정</b>에서 앱에 배포할 레플리카 수를 지정하고 필요에 따라 인그레스를 활성화합니다. 완료되면 <b>설치</b>를 클릭하세요.

  <div className="notices note">
    <p>Note</p>
    <div>
      NGINX에 대해 더 많은 값을 지정하려면 토글을 사용하여 앱의 매니페스트를 YAML 형식으로 보고 설정을 편집하세요.
    </div>
  </div>
   
5. NGINX가 실행될 때까지 기다립니다.

### 2단계: NGINX에 접속

클러스터 외부에서 NGINX에 접속하려면 먼저 NodePort를 통해 앱을 노출시켜야 합니다.

1. 생성된 프로젝트의 <b>서비스</b>로 이동하여 NGINX의 서비스 이름을 클릭하세요.

2. 서비스 세부정보 페이지에서 <b>더보기</b>를 클릭하고, 드롭다운 메뉴에서 <b>외부 접속 편집</b>을 선택하세요.

3. <b>접속 방법</b>으로 <b>NodePort</b>를 선택하고 <b>확인</b>을 클릭하세요. 더 자세한 내용은 [프로젝트 게이트웨이](../../../project-administration/project-gateway/)를 참조하십시오.

4. <b>포트</b>에서 노출된 포트를 확인하세요.

5. `<NodeIP>:<NodePort>`를 통해 NGINX에 접속하세요.

  <div className="notices note">
    <p>Note</p>
    <div>
      Kubernetes 클러스터가 배포된 위치에 따라 보안 그룹에서 포트를 열고 관련 포트 포워딩 규칙을 설정해야 할 수 있습니다.
    </div>
  </div>

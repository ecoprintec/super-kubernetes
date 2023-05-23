---
title: "Super Kubenetes에서 RabbitMQ 배포"
keywords: 'Super Kubenetes, RabbitMQ, Kubernetes, Installation'
description: 'Learn how to deploy RabbitMQ from the App Store of Super Kubenetes and access its service.'
linkTitle: "Deploy RabbitMQ on Super Kubenetes"
weight: 14290
---
[RabbitMQ](https://www.rabbitmq.com/)는 가장 널리 배포된 오픈 소스 메시지 브로커입니다. 가볍고 사내 및 클라우드에 배포하기 쉬우며, 다양한 메시징 프로토콜을 지원합니다. RabbitMQ는 대규모·고가용성 요구 사항을 충족하기 위해 분산 및 federated 구성으로 배포할 수 있습니다.

이 튜토리얼에서는 Super Kubenetes의 앱 스토어에서 RabbitMQ를 배포하는 예시를 소개합니다.

## 사전 준비

- [OpenPitrix 시스템](../../../pluggable-components/app-store/) 활성화 상태인지를 확인하십시오.
- 이 튜토리얼에서는 워크스페이스, 프로젝트 및 사용자 계정을 생성해야 합니다. 계정은 플랫폼 일반 사용자여야 하며 운영자 역할이 있는 프로젝트 운영자로 초대되어야 합니다. 이 튜토리얼에서는 `project-regular`로 로그인하여 `demo-workspace` 작업 공간의 `demo-project` 프로젝트에서 작업합니다. 자세한 내용은 [워크스페이스, 프로젝트, 사용자 및 역할 생성하기](../../../quick-start/create-workspace-and-project/)를 참조하십시오.

## 실습실

### 1단계: 앱 스토어에서 RabbitMQ 배포

1. 프로젝트 `demo-project`의 **개요** 페이지에서, 좌측 상단 모서리의 **앱 스토어**를 클릭합니다.

2. RabbitMQ를 찾아서 **앱 정보** 페이지의 **설치**를 클릭합니다.

3. 이름을 설정하고 앱 버전을 선택하세요. RabbitMQ가 `demo-project`에 배포되었는지 확인하고 **다음**을 클릭합니다.

4. **앱 설정**에서는 기본 설정을 사용하거나 YAML 파일을 직접 편집하여 사용자 지정 설정을 사용할 수 있습니다. 이후 로그인에 사용할 **Root Username** 값과 **Root Password** 값을 설정하세요. 계속하려면 **설치**를 클릭하세요. 

   <div className="notices tip">
     <p>Tip</p>
     <div>
       매니페스트 파일을 보려면 **Edit YAML** 스위치를 켜세요.
     </div>
   </div>

5. RabbitMQ가 실행될 때까지 기다립니다.

### 2단계: RabbitMQ dashboard 접속하기

클러스터 외부에서 RabbitMQ에 액세스하려면 먼저 NodePort를 통해 앱을 노출해야 합니다.

1. **서비스**로 이동하여 RabbitMQ의 서비스 이름을 클릭합니다.

2. **더보기**를 클릭하고 드롭다운 메뉴에서 **외부 접속 편집**를 선택하세요.

3. **접속 방법**에 대해 **NodePort**를 선택하고 **OK**를 클릭합니다. 자세한 내용은 [프로젝트 게이트웨이](../../../project-administration/project-gateway/)를 참조하십시오.

4. **Ports**에서, 포트가 노출된 것을 확인할 수 있습니다.

5. `<NodeIP>:<NodePort>`을 통해 RabbitMQ **대시보드**에 접속하세요. 사용자 이름과 암호는 **1단계**에서 설정한 값입니다.
   
   ![rabbitmq-dashboard](/dist/assets/docs/v3.3/appstore/built-in-apps/rabbitmq-app/rabbitmq-dashboard.png)

   ![rabbitma-dashboard-detail](/dist/assets/docs/v3.3/appstore/built-in-apps/rabbitmq-app/rabbitma-dashboard-detail.png)

  <div className="notices note">
    <p>Note</p>
    <div>
      쿠버네티스 클러스터가 어디에 배포되었는지에 따라, 보안그룹에서 포트를 열고 관련된 포트 포워딩 규칙을 설정해야 할 수 있습니다.
    </div>
  </div>


6. RabbitMQ에 대한 자세한 정보는 [공식 RabbitMQ 문서](https://www.rabbitmq.com/documentation.html)를 참조하십시오.

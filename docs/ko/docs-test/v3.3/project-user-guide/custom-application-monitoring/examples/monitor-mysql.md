---
title: "MySQL 모니터링"
keywords: 'monitoring, Prometheus, MySQL, MySQL Exporter'
description: 'Deploy MySQL and MySQL Exporter and create a dashboard to monitor the app.'
linkTitle: "Monitor MySQL"
weight: 10812
---
[소개](../../introduction#indirect-exposing) 섹션에서, Prometheus 메트릭으로 MySQL을 직접 장치하는 것이 가능하지 않다는 것을 알았습니다. MySQL 메트릭을 Prometheus 형식으로 노출하려면 먼저 MySQL 내보내기 도구를 배포해야 합니다.

이 튜토리얼은 MySQL 메트릭을 모니터링하고 시각화하는 방법을 시연합니다.

## 사전 준비

- [앱스토어 활성화](../../../../pluggable-components/app-store/)가 필요합니다. MySQL 및 MySQL 내보내기 도구는 앱 스토어에서 사용할 수 있습니다.
- 이 튜토리얼에서는 워크스페이스, 프로젝트 및 사용자(`project-regular`)를 생성해야 합니다. 사용자는 `operator`역할로 프로젝트에 초대되어야 합니다. 자세한 내용은 [워크스페이스, 프로젝트, 사용자 및 역할 생성](../../../../quick-start/create-workspace-and-project/)을 참조하십시오.

## 1단계: MySQL 배포

먼저 [앱 스토어에서 MySQL 배포](../../../../application-store/built-in-apps/mysql-app/)를 해야합니다.

1. 프로젝트로 이동하여 좌측 상단의 **앱 스토어**를 클릭하세요.

2. **MySQL**을 클릭하여 세부 정보 페이지로 이동하고 **앱 정보** 탭에서 **설치**를 클릭하세요.

  <div className="notices note">
    <p>Note</p>
    <div>
      MySQL은 Super Kubenetes 앱 스토어에 내장된 앱입니다. 즉, 앱 스토어가 활성화되면 바로 배포하고 사용할 수 있습니다.
    </div>
  </div>

3. **기본 정보**에서 **이름**을 설정하고 **버전**을 선택하세요. **위치**에서 앱이 배포된 프로젝트를 선택하고 **다음**을 클릭하세요.

4. **앱 설정**에서 `mysqlRootPassword` 영역의 주석을 해제하여 루트 비밀번호를 설정하고, **설치**를 클릭하세요.

5. MySQL이 실행될 때까지 기다리십시오.

## 2단계: MySQL 내보내기 도구 배포

동일한 클러스터의 동일한 프로젝트에 MySQL 내보내기 도구를 배포해야 합니다. MySQL Exporter는 MySQL의 상태를 조회하고 Prometheus 형식으로 데이터를 보고합니다.

1. **앱 스토어**로 이동하여 **MySQL 내보내기 도구**를 클릭하세요.

2. 세부 정보 페이지에서 **설치**를 클릭하세요.

3. **기본 정보**에서 **이름**을 설정하고 **버전**을 선택하세요. **위치**에서 MySQL이 배포된 동일한 프로젝트를 선택하고 **다음**을 클릭하세요.

4. `serviceMonitor.enabled`가 `true`로 설정되어 있는지 확인하세요. 내장된 MySQL Exporter는 기본적으로 `true`로 설정하므로 `serviceMonitor.enabled` 값을 수동으로 변경할 필요가 없습니다.

  <div className="notices warning">
    <p>Warning</p>
    <div>
      외부 내보내기 도구 Helm 차트를 사용하는 경우에는 ServiceMonitor CRD를 활성화해야 합니다. 이러한 차트는 일반적으로 Service Monitor를 기본적으로 사용하지 않도록 설정하고, 수동으로 수정해야 합니다.
    </div>
  </div>

5. MySQL 연결 파라미터를 수정하세요. MySQL 내보내기 도구는 대상 MySQL에 연결해야 합니다. 이 튜토리얼에서 MySQL은 `mysql-dh3ily`라는 서비스 이름으로 설치됩니다. 설정 파일에서 `mysql`로 이동하여 `host`를 `mysql-dh3ily`로, `pass`를 `testing`으로, `user`를 `root`로 설정하세요. 참고로 MySQL 서비스는 **다른 이름**으로 생성될 수 있습니다. 파일 편집을 마친 후 **설치**를 클릭하세요.

6. MySQL 내보내기 도구가 실행될 때까지 기다리십시오.

## 3단계: 모니터링 대시보드 생성

MySQL용 모니터링 대시보드를 생성하고 실시간 메트릭을 시각화할 수 있습니다.

1. 동일한 프로젝트에서 사이드바의 **모니터링 및 알림** 아래의 **사용자 지정 모니터링**으로 이동하고 **생성**을 클릭하세요.

2. 표시된 대화 상자에서 대시보드 이름(예: `mysql-overview`)을 설정하고 MySQL 템플릿을 선택하세요. 계속하려면 **다음**을 클릭하세요.

3. 오른쪽 상단의 **템플릿 저장**을 클릭하여 템플릿을 저장하세요. 새로 생성된 대시보드는 **사용자 지정 모니터링 대시보드** 페이지에 표시됩니다.

  <div className="notices note">
    <p>Note</p>
    <div>
      - 내장 MySQL 템플릿은 MySQL 메트릭을 모니터링하는 데 도움이 되도록 Super Kubenetes에서 제공합니다. 필요에 따라 대시보드에 더 많은 메트릭을 추가할 수도 있습니다.

      - 대시보드 속성에 대한 자세한 내용은 [시각화](../../../../project-user-guide/custom-application-monitoring/visualization/overview/)를 참조하십시오.
    </div>
  </div>

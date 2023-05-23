---
title: "Super Kubenetes에서 MeterSphere 배포"
keywords: 'Super Kubenetes, Kubernetes, Applications, MeterSphere'
description: 'Learn how to deploy MeterSphere on Super Kubenetes.'
linkTitle: "Deploy MeterSphere on Super Kubenetes"
weight: 14330
---

MeterSphere는 오픈 소스, 원스톱 그리고 기업 수준의 지속적 테스트 플랫폼입니다. 테스트 추적, 인터페이스 테스트 및 성능 테스트를 제공합니다.

이 튜토리얼은 Super Kubenetes에서 MeterSphere를 배포하는 방법을 보여줍니다.

## 사전 준비

- [OpenPitrix 시스템](../../../pluggable-components/app-store/)을 활성화해야 합니다.
- 이 튜토리얼에서는 워크스페이스, 프로젝트 및 두개의 사용자 계정(`ws-admin`과 `project-regular`)을 생성해야 합니다. `ws-admin` 계정은 작업공간에서 `workspace-admin` 역할을 부여받아야 하며, `project-regular` 계정은 `operator` 역할로 프로젝트에 초대받아야 합니다. 이 튜토리얼은 시연을 위해 `demo-workspace`와 `demo-project`를 사용합니다. 준비되지 않은 경우 [워크스페이스, 프로젝트, 사용자 및 역할 생성하기](../../../quick-start/create-workspace-and-project/)를 참조하십시오.

## 실습실

### 단계 1: 앱 저장소 추가

1. Super Kubenetes에서 로그아웃 하고 `project-regular`으로 재로그인 합니다. 프로젝트에서 **애플리케이션 워크로드** 아래의 **앱**으로 이동하고 **생성**을 클릭하세요.

2. 표시된 대화 상자에서, 앱 저장소 이름으로 `metersphere`을 입력하고 MeterSphere 저장소 URL로 `https://charts.Super Kubenetes.io/test`을 입력합니다. **유효성 검사**를 클릭하여 URL을 확인하면, 사용 가능한 경우에 URL 옆으로 녹색 체크 표시를 확인할 수 있습니다. 
계속하려면 **확인**을 클릭하세요.

3. 저장소가 Super Kubenetes로 성공적으로 추가된 후 목록에 표시됩니다.

### 단계 2: MeterSphere 배포

1. Super Kubenetes에서 로그아웃 하고 `project-regular`으로 재로그인 합니다. 프로젝트에서 **애플리케이션 워크로드** 아래의 **앱**으로 이동하고 **생성**을 클릭하세요.

2. 표시된 대화상자에서, **앱 템플릿에서**를 선택하세요.

3. 드롭다운 목록에서 `metersphere`을 선택한 다음 **metersphere-chart**을 클릭하세요.

4. **앱 정보** 탭과 **차트 파일** 탭에서 콘솔의 기본 설정을 볼 수 있습니다. 계속하려면 **설치**를 클릭하세요.

5. **기본 정보** 페이지에서 앱 이름, 앱 버전, 배포 위치를 확인할 수 있습니다. 계속하려면 **다음**을 클릭하세요.

6. **앱 설정** 페이지에서, `imageTag`의 값을 `master`에서 `v1.6`으로 바꾸고, **설치**를 클릭하세요.

7. MeterSphere가 실행될 때까지 기다립니다.

8. **워크로드**로 이동하면 MeterSphere용으로 생성된 모든 디플로이먼트 및 스테이트풀셋을 볼 수 있습니다.

  <div className="notices note">
    <p>Note</p>
    <div>
      모든 디플로이먼트 및 스테이트풀셋이 실행되기까지 시간이 걸릴 수 있습니다.
    </div>
  </div>


### 단계 3: MeterSphere 접속

1. **애플리케이션 워크로드** 아래의 **서비스**로 이동하면 MeterSphere 서비스를 볼 수 있으며, 해당 유형은 기본적으로 `NodePort`로 설정됩니다.

2. 기본 계정과 비밀번호(`admin/metersphere`)를 사용하여 `<NodeIP>:<NodePort>`를 통해 MeterSphere에 액세스할 수 있습니다.

   ![login-metersphere](/dist/assets/docs/v3.3/appstore/external-apps/deploy-metersphere/login-metersphere.PNG)

  <div className="notices note">
    <p>Note</p>
    <div>
      쿠버네티스 클러스터가 어디에 배포되었는지에 따라, 보안그룹에서 포트를 열고 관련된 포트 포워딩 규칙을 설정해야 할 수 있습니다. 자신 고유의 `NodeIP`를 사용하세요.
    </div>
  </div>

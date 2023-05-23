---
title: "앱 템플릿에서 앱 배포"
keywords: 'Kubernetes, Chart, Helm, Super Kubenetes, Application, App Templates'
description: 'Learn how to deploy an application from a Helm-based template.'
linkTitle: "Deploy Apps from App Templates"
weight: 10120
---

앱을 배포할 때, Super Kubenetes의 내장 앱을 담고 있는 앱 스토어의 앱과 [Helm 차트로 업로드된 앱](../../../workspace-administration/upload-helm-based-application/)을 선택할 수 있습니다. 또는 Super Kubenetes에 추가된 프라이빗 앱 리포지토리의 앱을 사용하여 앱 템플릿을 제공할 수 있습니다.

이 튜토리얼은 QingStor 오브젝트 스토리지를 기반으로 하는 프라이빗 리포지토리의 앱 템플릿을 사용하여 [Grafana](https://grafana.com/)를 빠르게 배포하는 방법을 시연합니다.

## 사전 준비

- [OpenPitrix (앱 스토어)](../../../pluggable-components/app-store/)를 활성화해야 합니다.
- [워크스페이스, 프로젝트, 사용자 및 역할 생성](../../../quick-start/create-workspace-and-project/) 튜토리얼을 완료하세요.  즉, 워크스페이스, 프로젝트 그리고 두 명의 사용자('ws-admin' 및 'project-regular')가 있어야 합니다. `ws-admin`은 워크스페이스에서 `workspace-admin` 역할을, `project-regular`는 프로젝트에서 `operator` 역할을 부여받아야 합니다.

## 실습실

### 1단계: 앱 리포지토리 추가

1. Super Kubenetes의 웹 콘솔에 `ws-admin`으로 로그인하세요. 워크스페이스에서 <b>앱 관리</b> 아래의 <b>앱 리포지토리</b>로 이동한 다음 <b>추가</b>를 클릭하세요.

2. 표시된 대화 상자에서 앱 리포지토리 이름으로 `test-repo`를 입력하고, 리포지토리 URL로 `https://helm-chart-repo.pek3a.qingstor.com/kubernetes-charts/`를 입력하세요. <b>승인</b>을 클릭하여 URL을 확인하고, 필요에 따라 <b>동기화 간격</b>을 설정한 다음 <b>확인</b>을 클릭하세요.

3. Super Kubenetes에 리포지토리가 성공적으로 추가되되면, 목록에 표시됩니다.


  <div className="notices note">
    <p>Note</p>
    <div>
      프라이빗 리포지토리를 추가할 때 대시보드 속성에 대한 자세한 내용은 [Helm 리포지토리 가져오기](../../../workspace-administration/app-repository/import-helm-repository/)를 참조하세요.
    </div>
  </div>

### 2단계: 앱 템플릿에서 Grafana 배포

1. Super Kubenetes에서 로그아웃하고 `project-regular`로 다시 로그인하세요. 프로젝트에서 <b>애플리케이션 워크로드</b> 아래의 <b>앱</b>으로 이동하고 <b>생성</b>을 클릭하세요.

2. 표시된 대화 상자에서 <b>앱 템플릿에서</b>를 선택하세요.

   <b>앱 스토어에서</b>: 내장 앱과 Helm 차트로 개별 업로드된 앱을 선택하세요.

   <b>앱 템플릿에서</b>: 프라이빗 앱 리포지토리 및 워크스페이스 앱 풀에서 앱을 선택하세요.

3. 드롭다운 목록에서, 방금 업로드한 프라이빗 앱 리포지토리인 `test-repo`를 선택하세요.

  <div className="notices note">
    <p>Note</p>
    <div>
      목록의 <b>현재 워크스페이스</b> 옵션은 Helm 차트로 업로드된 앱을 포함한, 워크스페이스 앱 풀을 나타냅니다. 이것 또한 앱 템플릿의 일부입니다.
    </div>
  </div>

4. 검색창에 `grafana`를 입력하여 앱을 검색한 후, 클릭하여 배포하세요.

  <div className="notices note">
    <p>Note</p>
    <div>
      이 튜토리얼에서 사용하는 앱 리포지토리는 Google Helm 리포지토리에서 동기화됩니다. 다른 조직에서 이 Helm 차트를 유지 관리하므로, 그 안의 일부 앱은 성공적으로 배포되지 않을 수 있습니다.
    </div>
  </div> 

5. 이 앱의 정보 및 설정 파일도 표시됩니다. <b>버전</b> 아래의 목록에서 버전 번호를 선택하고 <b>설치</b>를 클릭하세요.

6. 앱 이름을 설정하고 버전 및 배포 위치를 확인하세요. <b>다음</b>을 클릭하세요.
   
7. <b>앱 설정</b>에서 매니페스트 파일을 수동으로 편집하거나, 바로 <b>설치</b>를 클릭하세요.

8. Grafana가 실행될 때까지 기다립니다.

### 3단계: Grafana 서비스 노출

클러스터 외부에서 Grafana에 접속하려면 먼저 NodePort를 통해 앱을 노출시켜야 합니다.

1. <b>서비스</b>로 이동하여 Grafana의 서비스 이름을 클릭하세요.

2. <b>더보기</b>를 클릭하고 드롭다운 메뉴에서 <b>외부 접속 편집</b>을 선택하세요.

3. <b>접속 방법</b>으로 <b>NodePort</b>를 선택하고 <b>확인</b>을 클릭하세요. 자세한 내용은 [프로젝트 게이트웨이](../../../project-administration/project-gateway/)를 참조하십시오.

4. <b>포트</b>에서 노출된 포트를 확인하세요.

### 4단계: Grafana에 접속

1. Grafana 대시보드에 접속하려면 사용자 이름과 비밀번호가 필요합니다. <b>설정</b> 아래의 <b>시크릿</b>으로 이동하고 앱 이름과 동일한 이름을 가진 항목을 클릭하세요.

2. 세부 정보 페이지에서 눈 모양 아이콘을 클릭하여 사용자 이름과 비밀번호를 확인하세요.

3. `<Node IP>:<NodePort>`를 통해 Grafana에 접속합니다.

  <div className="notices note">
    <p>Note</p>
    <div>
      Kubernetes 클러스터가 배포된 위치에 따라 보안 그룹에서 포트를 열고 관련 포트 포워딩 규칙을 구성해야 할 수 있습니다.
    </div>
  </div>

---
title: "Super Kubenetes의 쿠버네티스 데몬셋"
keywords: 'Super Kubenetes, Kubernetes, DaemonSet, workload'
description: 'Learn basic concepts of DaemonSets and how to create DaemonSets in Super Kubenetes.'
linkTitle: "DaemonSets"
weight: 10230
---

데몬셋은 복제된 파드 그룹을 관리하는 동시에 모든(또는 일부) 노드가 파드의 복사본을 실행하도록 합니다. 노드가 클러스터에 추가되면 데몬셋은 필요에 따라 새 노드에 파드를 자동으로 추가합니다.

자세한 내용은 [쿠버네티스 공식 문서](https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/)를 참고하세요.

## 쿠버네티스 데몬셋 사용

데몬셋은 사용자 개입 없이 모든 또는 특정 노드에서 실행되는 지속적인 백그라운드 작업을 배포하려는 경우에 매우 유용합니다. 예를 들어:

- Fluentd 또는 Logstash와 같은, 모든 노드에서 로그 수집 데몬을 실행.
- Prometheus Node Exporter, collectd, AppDynamics Agent와 같은, 모든 노드에서 노드 모니터링 데몬을 실행.
- Glusterd, Ceph, kube-dns, kube-proxy와 같은, 모든 노드에서 클러스터 저장소 데몬 및 시스템 프로그램을 실행.

## 사전 준비

워크스페이스, 프로젝트 및 사용자(`project-regular`)를 생성해야 합니다. 사용자는 `operator` 역할로 프로젝트에 초대되어야 합니다. 자세한 내용은 [워크스페이스, 프로젝트, 사용자 및 역할 생성](../../../quick-start/create-workspace-and-project/)을 참고하세요.

## 데몬셋 생성

### 1단계: 대시보드 열기

콘솔에 `project-regular`로 로그인하세요. 프로젝트의 **애플리케이션 워크로드**로 이동하여 **워크로드**를 선택하고 **데몬셋** 탭에서 **생성**을 클릭하세요.

### 2단계: 기본 정보 입력

데몬셋의 이름(예: `demo-daemonset`)을 지정하고, 프로젝트를 선택한 후 **다음**을 클릭하세요.

### 3단계: 파드 설정

1. **컨테이너 추가**를 클릭하세요.

2. 퍼블릭 Docker 허브 또는 지정한 [프라이빗 리포지토리](../../configuration/image-registry/)의 이미지 이름을 입력하세요. 예를 들어, 검색 상자에 `fluentd`를 입력하고 **Enter**키를 누르세요.

  <div className="notices note">
    <p>Note</p>
    <div>
      - 검색창에 이미지 이름을 입력한 후 키보드에서 **Enter**키를 누르는 것을 잊지 마십시오.
      - 프라이빗 이미지 리포지토리를 사용하려면 **설정** 아래의 **시크릿**에서 먼저 [이미지 레지스트리 시크릿 생성](../../configuration/image-registry/)을 해야 합니다.
    </div>
  </div>

3. 필요에 따라 CPU 및 메모리 리소스에 대한 요청 및 상한을 설정합니다. 자세한 내용은 [컨테이너 이미지 설정의 리소스 요청 및 리소스 상한](../container-image-settings/#add-container-image)을 참고하세요.

4. **포트 설정**에 대해 **기본 포트 사용**을 클릭하거나, 또는 **프로토콜**, **이름** 및 **컨테이너 포트**를 사용자 지정할 수 있습니다.

5. 드롭다운 메뉴에서 이미지 풀링에 대한 정책을 선택하세요. 자세한 내용은 [컨테이너 이미지 설정의 이미지 가져오기 정책](../container-image-settings/#add-container-image)을 참고하세요.

6. 기타 설정(**헬스 체크**, **시작 명령**, **환경 변수**, **컨테이너 보안 컨텍스트** 및 **호스트 시간대 동기화**)의 경우 대시보드에서도 설정할 수 있습니다. 자세한 내용은 [파드 설정](../container-image-settings/#add-container-image)에서 이러한 속성에 대한 자세한 설명을 참고하세요. 완료되면 오른쪽 하단 모서리에 있는 **√**를 클릭하여 계속합니다.

7. 드롭다운 메뉴에서 업데이트 전략을 선택하세요. **롤링 업데이트**를 선택하는 것을 권장합니다. 자세한 내용은 [업데이트 전략](../container-image-settings/#update-strategy)을 참고하세요.

8. 파드 예약 규칙을 선택하세요. 자세한 내용은 [파드 예약 규칙](../container-image-settings/#pod-scheduling-rules)을 참고하세요.

9. 컨테이너 이미지 설정이 끝나면 **다음**을 클릭하여 계속 진행합니다.

### 4단계: 볼륨 마운트

볼륨을 직접 추가하거나 ConfigMap 또는 시크릿을 마운트할 수 있습니다. 또는 바로 **다음**을 클릭하여 이 단계를 건너뛰세요. 볼륨에 대한 자세한 내용은 [볼륨](../../storage/volumes/#mount-a-volume)을 참고하세요.

<div className="notices note">
  <p>Note</p>
  <div>
    데몬셋은 스테이트풀셋에서 사용하는 볼륨 템플릿을 사용할 수 없습니다.
  </div>
</div>

### 5단계: 고급 설정 구성

이 섹션에서 메타데이터를 추가할 수 있습니다. 완료되면 **생성**을 클릭하여 데몬셋을 만드는 전체 프로세스를 완료하세요.

- **메타데이터 추가**

  **레이블** 및 **주석**과 같은 리소스에 대한 추가 메타데이터 설정입니다.

## 쿠버네티스 데몬셋 세부정보 확인

### 세부정보 페이지

1. 데몬셋이 생성되면 목록에 표시됩니다. 우측의 <img src="/dist/assets/docs/v3.3/project-user-guide/application-workloads/daemonsets/three-dots.png" width="20px" alt="icon" />를 클릭하고, 데몬셋을 수정하기 위해 메뉴에서 옵션을 선택하세요.

    - **정보 편집**: 기본 정보를 조회 및 수정.
    - **YAML 편집**: YAML 파일을 조회, 업로드, 다운로드 또는 업데이트.
    - **재생성**: 데몬셋을 다시 생성.
    - **삭제**: 데몬셋을 삭제.

2. 데몬셋의 이름을 클릭하면 세부정보 페이지로 이동할 수 있습니다.

3. 이 데몬셋에 대해 수행할 수 있는 작업을 표시하려면 **더 보기**를 클릭하세요.

    - **롤백**: 롤백할 버전을 선택.
    - **설정 편집**: 업데이트 전략, 컨테이너 및 볼륨을 설정.
    - **YAML 편집**: YAML 파일을 조회, 업로드, 다운로드 또는 업데이트.
    - **재생성**: 이 데몬셋을 다시 생성.
    - **삭제**: 데몬셋을 삭제하고 데몬셋 목록 페이지로 돌아갑니다.

4. 데몬셋의 포트 및 파드 정보를 보려면 **리소스 상태** 탭을 클릭하세요.

    - **레플리카 상태**: 데몬셋의 파드 레플리카 수는 변경할 수 없습니다.
    - **파드**

      - 파드 목록은 파드의 상세 정보(상태, 노드, 파드 IP 및 리소스 사용량)를 제공합니다.
      - 파드 항목을 클릭하면 컨테이너 정보를 볼 수 있습니다.
      - 컨테이너 로그 아이콘을 클릭하면 컨테이너의 출력 로그를 볼 수 있습니다.
      - 파드 이름을 클릭하면 파드 세부정보 페이지를 볼 수 있습니다.

### 리비전 기록

워크로드의 리소스 템플릿이 변경된 후 새 로그가 생성되고 버전 업데이트를 위해 파드가 다시 예약됩니다. 기본적으로 최신 10개 버전이 저장됩니다. 변경 로그를 기반으로 재배포를 할 수 있습니다.

### 메타데이터

**메타데이터** 탭을 클릭하여 데몬셋의 레이블과 주석을 확인하세요.

### 모니터링

1. **모니터링** 탭을 클릭하여 데몬셋의 CPU 사용량, 메모리 사용량, 아웃바운드 트래픽 및 인바운드 트래픽을 확인하세요.

2. 우측 상단 모서리에 있는 드롭다운 메뉴를 클릭하여 시간 범위와 샘플링 간격을 사용자 지정하세요.

3. 자동 데이터 새로 고침을 시작/중지하려면 우측 상단 모서리의 <img src="/dist/assets/docs/v3.3/project-user-guide/application-workloads/daemonsets/start-refresh.png" width="20px" alt="icon" />/<img src="/dist/assets/docs/v3.3/project-user-guide/application-workloads/daemonsets/stop-refresh.png" width="20px" alt="icon" />를 클릭하세요.

4. 데이터를 수동으로 새로 고침하려면 우측 상단 모서리의 <img src="/dist/assets/docs/v3.3/project-user-guide/application-workloads/daemonsets/refresh.png" width="20px" alt="icon" />를 클릭하세요.

### 환경 변수

데몬셋의 환경 변수를 확인하려면 **환경 변수** 탭을 클릭하세요.

### 이벤트

데몬셋의 이벤트를 확인하려면 **이벤트** 탭을 클릭하세요.

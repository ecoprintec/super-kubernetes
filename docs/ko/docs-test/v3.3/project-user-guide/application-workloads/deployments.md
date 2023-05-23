---
title: "디플로이먼트"
keywords: 'Super Kubenetes, Kubernetes, Deployments, workload'
description: 'Learn basic concepts of Deployments and how to create Deployments in Super Kubenetes.'
linkTitle: "Deployments"
weight: 10210
---

디플로이먼트 컨트롤러는 파드 및 레플리카셋에 대한 선언형 업데이트를 제공합니다 디플로이먼트 오브젝트에 원하는 상태를 표시하면, 디플로이먼트 컨트롤러가 실제 상태를 원하는 상태로, 제어된 속도로 변경합니다. 디플로이먼트는 애플리케이션의 수많은 레플리카를 실행하면서, 다운되거나 오작동하는 인스턴스를 자동으로 교체합니다. 이것이 디플로이먼트가 앱 인스턴스를 사용자 요청을 처리하는 데 반드시 사용 가능하도록 하는 방법입니다.

자세한 내용은 [쿠버네티스 공식 문서](https://kubernetes.io/docs/concepts/workload/controllers/deployment/)를 참고하세요.

## 사전 준비

워크스페이스, 프로젝트 및 사용자(`project-regular`)를 생성해야 합니다. 사용자는 `operator` 역할로 프로젝트에 초대되어야 합니다. 자세한 내용은 [워크스페이스, 프로젝트, 사용자 및 역할 생성](../../../quick-start/create-workspace-and-project/)을 참고하세요.

## 디플로이먼트 생성

### 1단계: 대시보드 열기

콘솔에 `project-regular`로 로그인하세요. 프로젝트의 <b>애플리케이션 워크로드</b>로 이동하여 <b>워크로드</b>를 선택한 다음 <b>디플로이먼트</b> 탭에서 <b>생성</b>을 클릭하세요.

### 2단계: 기본 정보 입력

디플로이먼트 이름(예: `demo-deployment`)을 지정하고 프로젝트를 선택한 후 <b>다음</b>을 클릭하세요.

### 3단계: 파드 설정

1. 이미지를 설정하기 전에, 매니페스트 파일의 ".spec.replicas" 영역에 의해 표시되는 <img src="/dist/assets/docs/v3.3/project-user-guide/application-workloads/deployments/plus-icon.png" width="20px" alt="icon" /> 나  <img src="/dist/assets/docs/v3.3/project-user-guide/application-workloads/deployments/minus-icon.png" width="20px" alt="icon" />를 클릭하여 <b>파드 레플리카</b>에서 복제된 파드의 수를 정하세요.

    <div className="notices tip">
      <p>Tip</p>
      <div>
        우측 상단 모서리에서 <b>YAML 편집</b>을 활성화하면 YAML 형식의 디플로이먼트 매니페스트 파일을 볼 수 있습니다. Super Kubenetes를 사용하면 매니페스트 파일을 직접 편집하여 디플로이먼트를 만들 수 있습니다. 또는 아래 단계에 따라 대시보드를 통해 디플로이먼트를 생성할 수 있습니다.
      </div>
    </div>

2. <b>컨테이너 추가</b>를 클릭하세요.

3. 퍼블릭 Docker 허브 또는 지정한 [프라이빗 리포지토리](../../configuration/image-registry/)의 이미지 이름을 입력하세요. 예를 들어, 검색창에 `nginx`를 입력하고 <b>Enter</b> 키를 누르세요.

  <div className="notices note">
    <p>Note</p>
    <div>
      - 검색창에 이미지 이름을 입력한 후 키보드에서 <b>Enter</b> 키를 누르세요.
      - 프라이빗 이미지 리포지토리를 사용하려면 <b>설정</b> 아래의 <b>시크릿</b>에서 먼저 [이미지 레지스트리 시크릿 생성](../../configuration/image-registry/)을 해야 합니다. 
    </div>
  </div>


4. 필요에 따라 CPU 및 메모리 리소스에 대한 요청 및 상한을 설정합니다. 자세한 내용은 [컨테이너 이미지 설정의 리소스 요청 및 리소스 상한](../container-image-settings/#add-container-image)을 참고하세요.

5. <b>포트 설정</b>에 대해 <b>기본 포트 사용</b>을 클릭하거나, 또는 <b>프로토콜</b>, <b>이름</b> 및 <b>컨테이너 포트</b>를 사용자 정의할 수 있습니다.

6. 드롭다운 목록에서 이미지 풀링에 대한 정책을 선택하세요. 자세한 내용은 [컨테이너 이미지 설정의 이미지 가져오기 정책](../container-image-settings/#add-container-image)을 참고하세요.

7. 기타 설정의 경우 (<b>헬스 체크</b>, <b>시작 커맨드</b>, <b>환경 변수</b>, <b>컨테이너 보안 컨텍스트</b>, <b> 호스트 시간대 동기화</b>), 대시보드에서도 설정할 수 있습니다. 자세한 내용은 [파드 설정](../container-image-settings/#add-container-image)에서 이러한 속성에 대한 자세한 설명을 참고하세요. 완료되면 오른쪽 하단에 있는 <b>√</b>를 클릭하여 계속합니다.

8. 드롭다운 메뉴에서 업데이트 전략을 선택하세요. <b>롤링 업데이트</b>를 선택하는 것을 권장합니다. 자세한 내용은 [업데이트 전략](../container-image-settings/#update-strategy)을 참고하세요.

9. 파드 예약 규칙을 선택하세요. 자세한 내용은 [파드 예약 규칙](../container-image-settings/#파드-scheduling-rules)을 참고하세요.

10. 파드 설정이 끝나면 <b>다음</b>을 클릭하여 계속 진행합니다.

### 4단계: 볼륨 마운트

볼륨을 직접 추가하거나 ConfigMap 또는 시크릿을 마운트할 수 있습니다. 또는 바로 **다음**을 클릭하여 이 단계를 건너뛰세요. 볼륨에 대한 자세한 내용은 [볼륨](../../storage/volumes/#mount-a-volume)을 참고하세요.

<div className="notices note">
  <p>Note</p>
  <div>
    디플로이먼트는 스테이트풀셋에서 사용하는 볼륨 템플릿을 사용할 수 없습니다.
  </div>
</div>

### 5단계: 고급 설정

이 섹션에서 노드 예약에 대한 정책을 설정하고 메타데이터를 추가할 수 있습니다. 완료되면 <b>생성</b>을 클릭하여 디플로이먼트를 만드는 전체 프로세스를 완료하세요.

- <b>노드 선택</b>

지정된 노드에서 실행할 파드 레플리카를 할당합니다. `nodeSelector` 영역에서 지정됩니다.

- <b>메타데이터 추가</b>

  <b>레이블</b> 및 <b>주석</b>과 같은 리소스에 대한 추가 메타데이터 설정입니다.

## 디플로이먼트 세부정보 확인

### 세부정보 페이지

1. 디플로이먼트가 생성되면 목록에 표시됩니다. 우측의 <img src="/dist/assets/docs/v3.3/project-user-guide/application-workloads/daemonsets/three-dots.png" width="20px" alt="icon" />를 클릭하고, 디플로이먼트를 수정하기 위해 메뉴에서 옵션을 선택하세요.

    - <b>정보 편집</b>: 기본 정보를 조회 및 수정.
    - <b>YAML 편집</b>: YAML 파일을 조회, 업로드, 다운로드 또는 업데이트.
    - <b>재생성</b>: 디플로이먼트를 다시 생성.
    - <b>삭제</b>: 디플로이먼트를 삭제.

2. 디플로이먼트 이름을 클릭하면 해당 세부 정보 페이지로 이동할 수 있습니다.

3. <b>더보기</b>를 클릭하여 이 디플로이먼트에 대해 수행할 수 있는 작업을 표시합니다.

    - <b>롤백</b>: 롤백할 버전을 선택.
    - <b>오토스케일링 편집</b>: CPU 및 메모리 사용량에 따라 레플리카 크기를 자동 조정합니다. CPU와 메모리 모두 지정된 경우, 조건 중 하나라도 충족되면 레플리카가 추가되거나 삭제됩니다.
    - <b>설정 편집</b>: 업데이트 전략, 컨테이너 및 볼륨을 설정.
    - <b>YAML 편집</b>: YAML 파일을 조회, 업로드, 다운로드 또는 업데이트.
    - <b>재생성</b>: 이  다시 생성.
    - <b>삭제</b>: 디플로이먼트를 삭제하고 디플로이먼트 목록 페이지로 돌아갑니다.

4. 디플로이먼트의 포트 및 파드 정보를 보려면 **리소스 상태** 탭을 클릭하세요.

    - <b>레플리카 상태</b>: 파드 레플리카의 수를 늘리거나 줄이려면 <img src="/dist/assets/docs/v3.3/common-icons/replica-plus-icon.png" width="20px" alt="icon" /> 또는 <img src="/dist/assets/docs/v3.3/common-icons/replica-minus-icon.png" width="20px" alt="icon" />를 클릭하세요.
    - <b>파드</b>

        - 파드 목록은 파드의 세부 정보(상태, 노드, 파드 IP 및 리소스 사용량)를 제공합니다.
        - 파드 항목을 클릭하면 컨테이너 정보를 볼 수 있습니다.
        - 컨테이너 로그 아이콘을 클릭하면 컨테이너의 출력 로그를 볼 수 있습니다.
        - 파드 이름을 클릭하면 파드 세부 정보 페이지를 볼 수 있습니다.

### 리비전 기록

워크로드의 리소스 템플릿이 변경된 후 새 로그가 생성되고 버전 업데이트를 위해 파드가 다시 예약됩니다. 기본적으로 최신 10개 버전이 저장됩니다. 변경 로그를 기반으로 재배포를 할 수 있습니다.

### 메타데이터

<b>메타데이터</b> 탭을 클릭하여 디플로이먼트의 레이블과 주석을 봅니다.

### 모니터링

1. **모니터링** 탭을 클릭하여 데몬셋의 CPU 사용량, 메모리 사용량, 아웃바운드 트래픽 및 인바운드 트래픽을 확인하세요.

2. 우측 상단 모서리에 있는 드롭다운 메뉴를 클릭하여 시간 범위와 샘플링 간격을 사용자 지정하세요.

3. 자동 데이터 새로 고침을 시작/중지하려면 우측 상단 모서리의 <img src="/dist/assets/docs/v3.3/project-user-guide/application-workloads/deployments/deployments_autorefresh_start.png" width="20px" alt="icon" />/<img src="/dist/assets/docs/v3.3/project-user-guide/application-workloads/deployments/deployments_autorefresh_stop.png" width="20px" alt="icon" />를 클릭하세요.

4. 데이터를 수동으로 새로 고침하려면 우측 상단 모서리의 <img src="/dist/assets/docs/v3.3/project-user-guide/application-workloads/deployments/deployments_refresh.png" width="20px" alt="icon" />를 클릭하세요.

### 환경 변수

디플로이먼트의 환경 변수를 확인하려면 <b>환경 변수</b> 탭을 클릭하세요.

### 이벤트

디플로이먼트의 이벤트를 확인하려면 <b>이벤트</b> 탭을 클릭하세요.

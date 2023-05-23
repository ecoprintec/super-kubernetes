---
title: "Kubernetes Enterprise의 쿠버네티스 스테이트풀셋"
keywords: 'Super Kubenetes, Kubernetes, StatefulSets, Dashboard, Service'
description: 'Learn basic concepts of StatefulSets and how to create StatefulSets on Super Kubenetes.'
linkTitle: "StatefulSets"
weight: 10220
---

스테이트풀셋은 애플리케이션의 스테이트풀을 관리하는데 사용하는 워크로드 API 오브젝트입니다. 이것은 파드 집합의 배포, 확장을 담당하고 이런 파드의 순서와 고유성을 보장합니다.

디플로이먼트와 유사하게, 스테이트풀셋은 동일한 컨테이너 스펙을 기반으로 둔 파드들을 관리합니다. 디플로이먼트와는 다르게, 스테이트풀셋은 각 파드의 독자성을 유지합니다. 이 파드들은 동일한 스팩으로 생성되었지만, 서로 교체는 불가능합니다. 다시 말해, 각각의 파드는 재스케줄링에도 유지되는 영구구 식별자를 가집니다.

스토리지 볼륨을 사용해서 워크로드에 지속성을 제공하려는 경우, 솔루션의 일부로 스테이트풀셋을 사용할 수 있습니다. 스테이트풀셋의 개별 파드는 장애에 취약하지만, 퍼시스턴트 파드 식별자는 기존 볼륨을, 실패한 볼륨을 대체하는 새 파드에 더 쉽게 매칭시킬 수 있습니다.

스테이트풀셋은 다음 중 하나 또는 이상이 필요한 애플리케이션에 유용합니다.

    안정된, 고유한 네트워크 식별자.
    안정된, 지속성을 갖는 스토리지.
    순차적인, 정상 배포(graceful deployment)와 스케일링.
    순차적인, 자동 롤링 업데이트.

자세한 내용은 [쿠버네티스 공식 문서](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/)를 참조하세요.

## 사전 준비

워크스페이스, 프로젝트 및 사용자(`project-regular`)를 생성해야 합니다. 사용자는 `operator` 역할로 프로젝트에 초대되어야 합니다. 자세한 내용은 [워크스페이스, 프로젝트, 사용자 및 역할 생성](../../../quick-start/create-workspace-and-project/)을 참조하십시오.

## 쿠버네티스 스테이트풀셋 생성

Super Kubenetes에서는 스테이트풀셋을 생성할 때 <b>헤드리스</b> 서비스도 생성됩니다. 프로젝트의 <b>애플리케이션 워크로드</b> 아래의 [서비스](../services/)에서 헤드리스 서비스를 찾을 수 있습니다.

### 1단계: 대시보드 열기

콘솔에 `project-regular`로 로그인하세요. 프로젝트의 <b>애플리케이션 워크로드</b>로 이동하여 <b>워크로드</b>를 선택하고, <b>스테이트풀셋</b> 탭에서 <b>생성</b>을 클릭하세요.

### 2단계: 기본 정보 입력

스테이트풀셋의 이름(예: `demo-stateful`)을 지정하고, 프로젝트를 선택한 후 <b>다음</b>을 클릭하세요.

### 3단계: 파드 설정

1. 이미지를 설정하기 전에 <img src="/dist/assets/docs/v3.3/project-user-guide/application-workloads/statefulsets/plus-icon.png" width="20px" alt="icon" /> 또는 <img src="/dist/assets/docs/v3.3/project-user-guide/application-workloads/statefulsets/minus-icon.png" width="20px" alt="icon" />에서 복제된 파드의 수를 정의하세요. 이것은 매니페스트 파일의 `.spec.replicas` 영역에서 지정됩니다.

   <div className="notices tip">
     <p>Tip</p>
     <div>
       오른쪽 상단 모서리에서 </b>YAML 편집</b>을 활성화하면 스테이트풀셋 매니페스트 파일을 YAML 형식으로 볼 수 있습니다. Super Kubenetes를 사용하면 매니페스트 파일을 직접 편집하여 스테이트풀셋을 만들 수 있습니다. 그렇지 않으면, 아래 단계에 따라 대시보드를 통해 스테이트풀셋을 생성할 수 있습니다.
     </div>
   </div>

2. <b>컨테이너 추가</b>를 클릭하세요.

3. 퍼블릭 Docker 허브 또는 자신이 지정한 [프라이빗 리포지토리](../../configuration/image-registry/)의 이미지 이름을 입력하세요. 예를 들어, 검색창에 `nginx`를 입력하고 <b>Enter</b>키를 누르세요.

  <div className="notices note">
    <p>Note</p>
    <div>
      - 검색창에 이미지 이름을 입력한 후 키보드에서 <b>Enter</b> 키를 누르십시오.
      - 프라이빗 이미지 리포지토리를 사용하려면 <b>설정</b> 아래의 <b>시크릿</b>에서 먼저 [이미지 레지스트리 시크릿 생성](../../configuration/image-registry/)을 해야 합니다. 
    </div>
  </div>

4. 필요에 따라 CPU 및 메모리 리소스에 대한 요청 및 상한을 설정하세요. 자세한 내용은 [컨테이너 이미지 설정의 리소스 요청 및 리소스 상한](../container-image-settings/#add-container-image)을 참조하세요.

5. <b>포트 설정</b>에 대해 <b>기본 포트 사용</b>을 클릭하거나, 또는 <b>프로토콜</b>, <b>이름</b> 및 <b>컨테이너 포트</b>를 사용자 정의할 수 있습니다. 

6. 드롭다운 목록에서 이미지 풀링에 대한 정책을 선택하세요. 자세한 내용은 [컨테이너 이미지 설정의 이미지 가져오기 정책](../container-image-settings/#add-container-image)을 참조하세요.

7. 다른 설정의 경우(<b>헬스 체크</b>, <b>시작 커맨드</b>, <b>환경 변수</b>, <b>컨테이너 보안 컨텍스트</b> 및 <b> 호스트 시간대 동기화<b>), 대시보드에서도 설정할 수 있습니다. 자세한 내용은 [파드 설정](../container-image-settings/#add-container-image)에서 이러한 속성에 대한 자세한 설명을 참조하세요. 완료되면 오른쪽 하단에 있는 <b>√</b>를 클릭하여 계속하세요.

8. 드롭다운 메뉴에서 업데이트 전략을 선택하세요. <b>롤링 업데이트</b>를 선택하는 것을 권장합니다. 자세한 내용은 [업데이트 전략](../container-image-settings/#update-strategy)을 참조하세요.

9. 파드 일정 규칙을 선택하세요. 자세한 내용은 [파드 예약 규칙](../container-image-settings/#pod-scheduling-rules)을 참조하세요.

10. 컨테이너 이미지 설정이 끝나면 <b>다음</b>을 클릭하여 계속하세요.

### 4단계: 볼륨 마운트

스테이트풀셋은 볼륨 템플릿을 사용할 수 있지만 미리 <b>스토리지</b>에서 생성해야 합니다. 볼륨에 대한 자세한 내용은 [볼륨](../../storage/volumes/#mount-a-volume)을 참조하십시오. 완료되면 <b>다음</b>을 클릭하여 계속하세요.

### 5단계: 고급 설정 구성

이 섹션에서 노드 스케줄링에 대한 정책을 설정하고 스테이트풀셋 메타데이터를 추가할 수 있습니다. 완료되면 <b>생성</b>를 클릭하여 스테이트풀셋을 만드는 전체 프로세스를 완료하세요.

- <b>노드 선택</b>

  지정된 노드에서 실행할 파드 레플리카를을 할당합니다. 이것은 `nodeSelector` 영역에 지정됩니다.

- <b>메타데이터 추가</b>

  <b>레이블</b> 및 <b>주석</b>과 같은 리소스에 대한 추가 메타데이터 설정입니다.

## Kubernetes 스테이트풀셋 세부정보 확인

### 세부정보 페이지

1. 스테이트풀셋이 생성되면 목록에 표시됩니다. 스테이트풀셋을 수정하려면, 오른쪽의 <img src="/dist/assets/docs/v3.3/project-user-guide/application-workloads/statefulsets/three-dots.png" width="20px" alt="icon" />를 클릭하여 메뉴에서 스테이트풀셋을 수정하는 옵션을 선택할 수 있습니다.

    - <b>정보 편집</b>: 기본 정보를 확인하고 편집.
    - <b>YAML 편집</b>: YAML 파일을 조회, 업로드, 다운로드 또는 업데이트.
    - <b>재생성</b>: 스테이트풀셋을 재생성.
    - <b>삭제</b>: 스테이트풀셋을 삭제.

2. 스테이트풀셋의 이름을 클릭하면 세부 정보 페이지로 이동할 수 있습니다.

3. <b>더보기</b>를 클릭하여 이 스테이트풀셋에 대해 수행할 수 있는 작업을 표시합니다.

    - <b>롤백</b>: 롤백할 버전을 선택.
    - <b>서비스 편집</b>: 컨테이너 이미지와 서비스 포트를 노출할 포트를 설정.
    - <b>설정 편집</b>: 업데이트 전략, 컨테이너 및 볼륨을 설정.
    - <b>YAML 편집</b>: YAML 파일을 조회, 업로드, 다운로드 또는 업데이트.
    - <b>재생성</b>: 이 스테이트풀셋을 재생성.
    - <b>삭제</b>: 스테이트풀셋을 삭제하고 스테이트풀셋 목록 페이지로 돌아갑니다.

4. 스테이트풀셋의 포트 및 파드 정보를 보려면 <b>리소스 상태</b> 탭을 클릭하세요.

    - <b>레플리카 상태</b>: 파드 레플리카의 개수를 증가시키거나 감소시키려면, <img src="/dist/assets/docs/v3.3/common-icons/replica-plus-icon.png" width="20px" alt="icon" /> 또는 <img src="/dist/assets/docs/v3.3/common-icons/replica-minus-icon.png" width="20px" alt="icon" />를 클릭하세요.
    - <b>파드</b>

        - 파드 목록은 파드의 세부 정보(상태, 노드, 파드 IP 및 리소스 사용량)를 제공합니다.
        - 파드 항목을 클릭하면 컨테이너 정보를 볼 수 있습니다.
        - 컨테이너 로그 아이콘을 클릭하면 컨테이너의 출력 로그를 볼 수 있습니다.
        - 파드 이름을 클릭하면 파드 세부 정보 페이지를 볼 수 있습니다.

### 리비전 기록

워크로드의 리소스 템플릿이 변경된 후 새 로그가 생성되고 버전 업데이트를 위해 파드가 다시 예약됩니다. 기본적으로 최신 10개 버전이 저장됩니다. 변경 로그를 기반으로 재배포를 할 수 있습니다.

### 메타데이터

스테이트풀셋의 레이블과 주석을 보려면 <b>메타데이터</b> 탭을 클릭하십시오.

### 모니터링

1. 스테이트풀셋의 CPU 사용량, 메모리 사용량, 아웃바운드 트래픽 및 인바운드 트래픽을 보려면, <b>모니터링</b> 탭을 클릭하세요.

2. 우측 상단 모서리에 있는 드롭다운 메뉴를 클릭하여 시간 범위와 샘플링 간격을 사용자 지정하세요.

3. 데이터 새로고침을 시작/정지 시키려면, 우측 상단의 <img src="/dist/assets/docs/v3.3/project-user-guide/application-workloads/statefulsets/start-refresh.png" width="20px" alt="icon" />/<img src="/dist/assets/docs/v3.3/project-user-guide/application-workloads/statefulsets/stop-refresh.png" width="20px" alt="icon" />을 클릭하세요.

4. 수동으로 데이터를 새로고침하려면, 우측 상단의 <img src="/dist/assets/docs/v3.3/project-user-guide/application-workloads/statefulsets/refresh.png" width="20px" alt="icon" />을 클릭하세요.

### 환경 변수

스테이트풀셋의 환경 변수를 확인하려면 <b>환경 변수</b> 탭을 클릭하세요.

### 이벤트

스테이트풀셋의 이벤트를 보려면 <b>이벤트</b> 탭을 클릭하세요.

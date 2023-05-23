---
title: "KubernetesEnterprise의 쿠버네티스 HPA (Horizontal Pod Autoscaling)"
keywords: "Horizontal, Pod, Autoscaling, Autoscaler"
description: "How to configure Kubernetes Horizontal Pod Autoscaling on Super Kubenetes."
weight: 10290
---

이 문서에서는 Super Kubenetes에서 수평 파드 오토스케일링(HPA)를 설정하는 방법을 설명합니다.

쿠버네티스 HPA 기능은 파드 수를 자동으로 조정하여 파드의 평균 리소스 사용량(CPU 및 메모리)을 사전 설정된 값 언저리로 유지합니다. HPA 작동 방식에 대한 자세한 내용은 [공식 쿠버네티스 문서](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/)를 참조하십시오.

이 문서에서는 CPU 사용량을 기반으로 하는 HPA를 예시로 사용합니다. 메모리 사용량을 기반으로 하는 HPA 작업도 이와 유사합니다.

## 사전 준비

- [메트릭 서버 활성화](../../../pluggable-components/metrics-server/)가 필요합니다.
- 워크스페이스, 프로젝트, 사용자를 생성해야 합니다(예: `project-regular`). `project-regular`는 프로젝트에 초대되어 `operator` 역할을 할당받아야 합니다. 자세한 내용은 [워크스페이스, 프로젝트, 사용자 및 역할 생성](/docs/v3.3/quick-start/create-workspace-and-project/)을 참조하십시오.

## 서비스 생성

1. Super Kubenetes 웹 콘솔에 `project-regular`로 로그인하고 프로젝트로 이동하세요.

2. 왼쪽 탐색 모음의 **애플리케이션 워크로드**에서 **서비스**를 선택하고 오른쪽에서 **생성**을 클릭하세요.

3. **서비스 생성** 대화 상자에서 **스테이트리스 서비스**를 클릭하세요.

4. 서비스 이름(예: `hpa`)을 설정하고 **다음**을 클릭하세요.

5. **컨테이너 추가**를 클릭하고, **이미지**를 `mirrorgooglecontainers/hpa-example`로 설정하고 **기본 포트 사용**을 클릭하세요.

6. 각 컨테이너에 대한 CPU 요청(예: 0.15 코어)을 설정하고 **√**를 클릭한 후 **다음**을 클릭하세요.

  <div className="notices note">
    <p>Note</p>
    <div>
      * CPU 사용량에 따라 HPA를 사용하기 위해서는, 각 컨테이너에 예약된 최소 CPU 리소스인, CPU 요청을 각 컨테이너에 설정해야 합니다. (자세한 내용은 [쿠버네티스 공식 문서] (https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/)를 참조하세요) HPA 기능은 평균 파드 CPU 사용량을 평균 파드 CPU 요청의 목표 비율과 비교합니다.
      * 메모리 사용량 기반 HPA의 경우 메모리 요청을 구성할 필요가 없습니다.
    </div>
  </div>

7. **스토리지 설정** 탭에서 **다음**을 클릭하고 **고급 설정** 탭에서 **생성**을 클릭합니다.

## 쿠버네티스 HPA 구성

1. 왼쪽 탐색 모음의 **워크로드**에서 **디프로이먼트**를 선택하고 오른쪽에서 HPA 디프로이먼트 (예: hpa-v1)를 클릭하세요.

2. **더보기**를 클릭하고 드롭다운 메뉴에서 **오토스케일링 편집**을 선택하세요.

3. **수평 파드 오토스케일링** 대화 상자에서 HPA 파라미터를 설정하고 **확인**을 클릭하세요.

   * **목표 CPU 사용량(%)**: 평균 파드 CPU 요청의 목표 비율.
   * **목표 메모리 사용량(MiB)**: 목표 평균 파드 메모리 사용량(MiB).
   * **최소 레플리카**: 최소 파드 수.
   * **최대 레플리카**: 최대 파드 수.

   이 예에서 **목표 CPU 사용량(%)**은 `60`으로 설정되고 **최소 레플리카**는 `1`로, **최대 레플리카**는 `10`으로 설정됩니다.

  <div className="notices note">
    <p>Note</p>
    <div>
      파드 수가 최대값에 도달하면 클러스터가 모든 파드에 충분한 리소스를 제공할 수 있는지 확인하세요. 그렇지 않으면 일부 파드의 생성이 실패할 것입니다.
    </div>
  </div>

## HPA 확인

이 섹션에서는 HPA 서비스에 요청을 보내는 디플로이먼트를 사용하여 HPA가 리소스 사용량 목표를 충족하도록 파드 수를 자동으로 조정하는지 확인합니다.

### 로드 제네레이터(load generator) 디플로이먼트 생성 

1. 왼쪽 탐색 모음의 **애플리케이션 워크로드**에서 **워크로드**를 선택하고 오른쪽에서 **생성**을 클릭하세요.

2. **디플로이먼트 생성** 대화 상자에서 디플로이먼트 이름(예: `load-generator`)을 설정하고 **다음**을 클릭하세요.

3. **컨테이너 추가**를 클릭하고 **이미지**를 `busybox`로 설정합니다.

4. 대화 상자에서 아래로 스크롤하여 **시작 커맨드**를 선택하고 **커맨드**를 `sh,-c`로, **파라미터**를 `while true; do wget -q -O- http://<Target Service>.<Target project>.svc.cluster.local; done`으로 설정합니다. (예: `while true; do wget -q -O- http://hpa.demo-project.svc.cluster.local; done`).

5. **√**를 클릭하고 **다음**을 클릭하세요.

6. **저장소 설정** 탭에서 **다음**을 클릭하고 **고급 설정** 탭에서 **생성**을 클릭하세요.

### HPA 배포 상태 보기

1. 로드 제네레이터 디플로이먼트가 생성되면 왼쪽 탐색 모음의 **애플리케이션 워크로드**에서 **워크로드**로 이동하고 오른쪽에서 HPA 디플로이먼트(예: hpa-v1)를 클릭하세요. 페이지에 표시되는 파드의 수는 리소스 사용량 목표를 충족하기 위해 자동으로 증가합니다.

2. 왼쪽 내비게이션 바의 **애플리케이션 워크로드**에서 **워크로드**를 선택하고, 로드 제네레이터 디플로이먼트(예: load-generator-v1)의 오른쪽의 <img src="/dist/assets/docs/v3.3/project-user-guide/application-workloads/horizontal-pod-autoscaling/three-dots.png" width="20px" alt="icon" />를 클릭한 다음, 드롭 다운 목록의 **삭제**를 선택하세요. 로드 제네레이터 디플로이먼트가 삭제된 후, HPA 디플로이먼트의 상태를 다시 확인해보면, 파드 수가 최소치로 줄어듭니다.

<div className="notices note">
  <p>Note</p>
  <div>
    시스템에서 파드 수를 조정하고 데이터를 수집하는 데 몇 분이 소요될 수 있습니다.
  </div>
</div>

## HPA 설정 편집

[HPA 설정](#configure-hpa)에서의 단계를 반복하여 HPA 설정을 편집할 수 있습니다.

## HPA 취소

1. 왼쪽 내비게이션 바의 **애플리케이션 워크로드**에서 **워크로드**를 선택하고 오른쪽에서 HPA 디플로이먼트 (예: hpa-v1)를 클릭하세요.

2. **오토스케일링** 오른쪽의 <img src="/dist/assets/docs/v3.3/project-user-guide/application-workloads/horizontal-pod-autoscaling/three-dots.png" width="20px" alt="icon" />를 클릭하고, 드롭다운 목록에서 **취소**를 선택하세요.



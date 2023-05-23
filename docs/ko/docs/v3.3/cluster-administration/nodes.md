---
title: "노드 관리"
keywords: "Kubernetes, Super Kubenetes, taints, nodes, labels, requests, limits"
description: "Monitor node status and learn how to add node labels or taints."
linkTitle: "Node Management"
weight: 8100
---

쿠버네티스는 노드에서 실행할 컨테이너를 파드에 배치하여 워크로드를 실행합니다. 노드는 클러스터에 따라 가상 또는 물리적 시스템일 수 있습니다. 각 노드에는 컨트롤 플레인에서 관리하는 파드를 실행하는 데 필요한 서비스가 포함되어 있습니다. 노드에 대한 자세한 내용은 [쿠버네티스 공식 문서](https://kubernetes.io/docs/concepts/architecture/nodes/)를 참고하십시오.

이 문서는 클러스터 관리자가 클러스터 내의 노드를 보고 수행할 수 있는 작업을 시연합니다.

## 사전 준비

**클러스터 관리** 권한이 포함된 역할을 부여받은 사용자가 필요합니다. 예를 들어 콘솔에 `admin`으로 직접 로그인하거나 권한이 있는 새 역할을 생성하여 사용자에게 할당할 수 있습니다.

## 노드 상태

클러스터 노드는 클러스터 관리자만 액세스할 수 있습니다. 일부 노드 메트릭은 클러스터에 매우 중요합니다. 따라서 이러한 것을 감시하고 노드를 사용할 수 있는지 확인하는 것은 관리자의 책임입니다. 노드 상태를 보려면 아래의 단계를 따르세요.

1. 왼쪽 상단 모서리에서 **플랫폼**을 클릭하고 **클러스터 관리**를 선택합니다.

2. 가져온 멤버 클러스터와 함께 [멀티 클러스터 기능](../../multicluster-management/)을 활성화한 경우 특정 클러스터를 선택하여 해당 노드를 볼 수 있습니다. 기능을 활성화하지 않은 경우 다음 단계를 참고하세요.

3. **노드** 아래에서 **클러스터 노드**를 선택하면 노드 상태에 대한 자세한 정보를 볼 수 있습니다.

    - **이름**: 노드 이름 및 서브넷 IP 주소입니다.
    - **상태**: 노드의 현재 상태로, 노드가 사용 가능한지 여부를 나타냅니다.
    - **역할**: 노드가 작업자인지 제어 평면인지를 나타내는 노드의 역할입니다.
    - **CPU 사용량**: 노드의 실시간 CPU 사용량입니다.
    - **메모리 사용량**: 노드의 실시간 메모리 사용량입니다.
    - **파드**: 노드에서 Pod의 실시간 사용량입니다.
    - **할당된 CPU**: 이 메트릭은 노드에 있는 Pod의 총 CPU 요청을 기반으로 계산됩니다. 워크로드가 더 적은 CPU 리소스를 사용하는 경우에도 이 노드의 워크로드용으로 예약된 CPU 양을 나타냅니다. 이 수치는 대부분의 경우 Pod를 예약할 때 할당된 CPU 리소스가 낮은 노드를 선호하는 쿠버네티스 스케줄러(kube-scheduler)에 중요합니다. 자세한 내용은 [컨테이너 리소스 관리](https://Kubernetes.io/docs/concepts/configuration/manage-resources-containers/)를 참고하세요.
    - **할당된 메모리**: 이 메트릭은 노드에 있는 Pod의 총 메모리 요청을 기반으로 계산됩니다. 워크로드가 더 적은 메모리 리소스를 사용하는 경우에도 이 노드의 워크로드를 위해 예약된 메모리 양을 나타냅니다.


  <div className="notices note">
    <p>Note</p>
    <div>
      **CPU**와 **할당된 CPU**는 대부분의 경우 다르며, **메모리**와 **할당된 메모리**도 그러한데 이는 정상입니다. 클러스터 관리자는 하나가 아닌 두 메트릭에 모두 집중해야 합니다. 실제 사용량과 일치하도록 각 노드에 대한 리소스 요청 및 제한을 설정하는 것은 좋은 방법입니다. 리소스를 과도하게 할당하면 클러스터 사용률이 낮아질 수 있고 적게 할당하면 클러스터에 높은 부담이 가해져 클러스터가 비정상 상태가 될 수 있습니다.
    </div>
  </div>


## 노드 관리
**클러스터 노드** 페이지에서 다음 작업을 수행할 수 있습니다.

- **Cordon/Uncordon**: 클러스터 노드의 우측에 있는 <img src="/dist/assets/docs/v3.3/common-icons/three-dots.png" width="15" alt="icon" />을 클릭한 다음, **Cordon** 또는 **Uncordon**을 클릭하세요. 노드를 예약 불가능으로 표시하는 것은 노드 재부팅 또는 다른 관리에 매우 유용합니다. 쿠버네티스 스케줄러는 예약 불가능으로 표시된 경우 이 노드에 새 파드를 예약하지 않습니다. 또한 노드에 이미 존재하는 기존의 워크로드에는 영향을 미치지 않습니다.

- **터미널 열기**：클러스터 노드의 우측에 있는 <img src="/dist/assets/docs/v3.3/common-icons/three-dots.png" width="15" alt="icon" />을 클릭한 다음, **터미널 열기**를 클릭하세요. 이렇게 하면 노드 설정 변경 및 이미지 다운로드 등을 편리하게 관리할 수 있습니다.

- **Taints 편집**: Taints를 사용하면 노드가 파드 집합을 제외할 수 있습니다. taint를 편집하려면 대상 노드 앞의 확인란을 선택합니다. 표시된 **Taints 편집**에서 taint를 추가, 삭제 또는 수정할 수 있습니다.

노드 세부 정보를 보려면 노드를 클릭하세요. 세부 정보 페이지에서 다음 작업을 수행할 수 있습니다.

- **레이블 편집**: 노드 레이블은 특정 노드에 파드를 할당하려는 경우 매우 유용합니다. 먼저 노드에 레이블을 지정(예: `node-role.kubernetes.io/gpu-node`과 함께 GPU 노드 레이블 지정)하세요. 그런 다음 [워크로드를 생설](../ ../project-user-guide/application-workloads/deployments/#step-5-configure-advanced-settings)할 때 **고급 설정**에서 레이블을 추가하여 GPU 노드에서 파드가 명시적으로 실행되도록 허용할 수 있습니다. 노드 레이블을 추가하려면 **더보기** > **레이블 편집**을 선택하세요.


- 노드, 파드, 메타데이터, 모니터링 데이터 및 이벤트의 실행 상태를 봅니다.

  <div className="notices note">
    <p>Note</p>
    <div>
     taint를 추가할 때 예기치 않은 동작이 발생하여 서비스를 사용할 수 없게 될 수 있으므로 주의하세요. 자세한 내용은 [Taints and Tolerations](https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/)를 참고하세요.
    </div>
  </div>


## 노드 추가 및 제거

현재 Super Kubenetes 콘솔에서 직접 노드를 추가하거나 제거할 수 없지만 [KubeKey](https://github.com/kubesphere/kubekey)를 사용하여 노드를 추가하거나 제거할 수 있습니다. 자세한 내용은 [새 노드 추가](../../installing-on-linux/cluster-operation/add-new-nodes/) 및 [노드 제거](../../installing-on- linux/cluster-operation/remove-nodes/)를 참고하세요.

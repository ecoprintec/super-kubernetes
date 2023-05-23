---
title: "종속개체 캐싱을 위한 CI 노드 설정"
keywords: 'Kubernetes, docker, Super Kubenetes, Jenkins, cicd, pipeline, dependency cache'
description: 'Configure a node or a group of nodes specifically for continuous integration (CI) to speed up the building process in a pipeline.'
linkTitle: "Set a CI Node for Dependency Caching"
weight: 11245
---

일반적으로 애플리케이션을 빌드할 때 서로 다른 종속개체를 가져와야 합니다. 이로 인해 긴 풀링 시간 및 네트워크 불안정성과 같은 몇 가지 문제가 발생하여 빌드 실패가 추가로 발생할 수 있습니다. 파이프라인에 보다 활성화되고 안정적인 환경을 제공하기 위해 특히 CI(지속적 통합)용으로 노드 또는 노드 그룹을 설정할 수 있습니다. 이러한 CI 노드는 캐시를 사용하여 구축 프로세스의 속도를 높일 수 있습니다.

이 튜토리얼은 Super Kubenetes가 파이프라인의 작업을 예약하고 S2I/B2I가 이러한 노드에 빌드되도록 CI 노드를 설정하는 방법을 시연합니다.

## 사전 준비

**클러스터 관리** 권한을 포함하여 역할이 부여된 사용자가 필요합니다. 예를 들어 콘솔에 직접 `admin`으로 로그인하거나 권한이 있는 새 역할을 생성하여 사용자에게 할당할 수 있습니다.

## CI 노드에 레이블 지정

1. 좌측 상단 모서리에서 **플랫폼**을 클릭하고 **클러스터 관리**를 선택하세요.

2. 가져온 멤버 클러스터와 함께 [멀티 클러스터 기능](../../../../multicluster-management/)을 활성화한 경우 특정 클러스터를 선택하여 해당 노드를 볼 수 있습니다. 기능을 활성화하지 않은 경우 다음 단계를 직접 참조하십시오.

3. **노드** 아래의 **클러스터 노드**로 이동하여 현재 클러스터의 기존 노드를 볼 수 있습니다.

4. 목록에서 CI 작업을 실행할 노드를 선택하세요. 노드 이름을 클릭하여 세부 정보 페이지로 이동하세요. **더보기**를 클릭하고 **레이블 수정**을 선택하세요.

5. 표시된 대화 상자에서 `node-role.kubernetes.io/worker` 키가 있는 레이블을 볼 수 있습니다. 값으로 `ci`를 입력하고 **저장**을 클릭하세요.

  <div className="notices note">
    <p>Note</p>
    <div>
      **추가**를 클릭하여 필요에 따라 새 라벨을 추가할 수도 있습니다.
    </div>
  </div> 

## CI 노드에 Taint 추가

기본적으로 파이프라인 및 S2I/B2I 워크플로는 [노드 선호도](https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#node-affinity)에 따라 이 노드에 예약됩니다. 노드를 CI 작업 전용으로 지정하려면(즉, 다른 워크로드의 스케줄링이 허용되지 않음), 노드에 [taint](https://kubernetes.io/docs/concepts/configuration/taint-and-toleration/)를 추가하면 됩니다.

1. **더보기**를 클릭하고 **Taint 편집**을 선택하세요.

2. **Taint 추가**를 클릭하고, 값을 지정하지 않고 `node.kubernetes.io/ci` 키를 입력하세요. 필요에 따라 `예약 방지`, `가능한 경우 예약 방지` 또는 `예약 방지 및 기존 Pod 제거`를 선택할 수 있습니다.

3. **저장**을 클릭하세요. Super Kubenetes는 설정한 taint에 따라 작업을 예약합니다. 이제 DevOps 파이프라인 작업으로 돌아갈 수 있습니다.

   <div className="notices tip">
     <p>Tip</p>
     <div>
       이 튜토리얼에서는 노드 관리와 관련된 작업도 다룹니다. 자세한 내용은 [노드 관리](../../../../cluster-administration/nodes/)를 참조하십시오.
     </div>
   </div>
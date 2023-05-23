---
title: "클러스터 게이트웨이"
keywords: 'Super Kubenetes, Kubernetes, Cluster, Gateway, NodePort, LoadBalancer'
description: 'Learn how to create a cluster-scope gateway on Super Kubenetes.'
linkTitle: "Cluster Gateway"
weight: 8630
---

Super Kubenetes 3.3.0은 모든 프로젝트가 글로벌 게이트웨이를 공유할 수 있도록 클러스터 범위 게이트웨이를 제공합니다. 이 문서는 Super Kubenetes에서 클러스터 게이트웨이를 설정하는 방법을 시연합니다.

## 사전 준비

`platform-admin` 역할을 가진 사용자를 준비해야 합니다(예: `admin`). 자세한 내용은 [작업 공간, 프로젝트, 사용자 및 역할 생성](../../../quick-start/create-workspace-and-project/)을 참고하세요.

## 클러스터 게이트웨이 생성

1. Super Kubenetes 웹 콘솔에 `admin`으로 로그인하세요. 왼쪽 상단 모서리에서 **플랫폼**을 클릭하고 **클러스터 관리**를 선택합니다.

2. 탐색 창에서 **클러스터 설정** 아래의 **게이트웨이 설정**으로 이동하고 **클러스터 게이트웨이** 탭을 선택한 다음 **게이트웨이 활성화**를 클릭합니다.

3. 표시된 대화 상자에서 다음 두 가지 옵션 중에서 게이트웨이에 대한 액세스 모드를 선택합니다.

   - **NodePort**: 게이트웨이를 통해 해당 노드 포트로 서비스에 액세스합니다. NodePort 액세스 모드는 다음 설정을 제공합니다.
     - **추적**: **추적** 토글을 켜서 Super Kubenetes에서 추적 기능을 활성화합니다. 활성화되면 경로에 액세스할 수 없을 때 경로에 주석(`nginx.ingress.kubernetes.io/service-upstream: true`)이 추가되는지 확인합니다. 그렇지 않은 경우 경로에 주석을 추가하세요.
     - **설정 옵션**: 클러스터 게이트웨이에 키-값 쌍을 추가합니다.
   - **LoadBalancer**: 게이트웨이를 통해 단일 IP 주소로 서비스에 액세스합니다. LoadBalancer 액세스 모드는 다음 설정을 제공합니다.
     - **추적**: **추적** 토글을 켜서 Super Kubenetes에서 추적 기능을 활성화합니다. 활성화되면 경로에 액세스할 수 없을 때 경로에 주석(`nginx.ingress.kubernetes.io/service-upstream: true`)이 추가되는지 확인합니다. 그렇지 않은 경우 경로에 주석을 추가하세요.
     - **로드 밸런서 제공자**: 드롭다운 목록에서 로드 밸런서 제공자를 선택합니다.
     - **주석**: 클러스터 게이트웨이에 주석을 추가합니다.
     - **설정 옵션**: 클러스터 게이트웨이에 키-값 쌍을 추가합니다.

  <div className="notices info">
    <p>Info</p>
    <div>
      - 추적 기능을 사용하려면 설정된 응용 프로그램을 만들 때 **애플리케이션 거버넌스**를 켜세요.
      - 설정 옵션 사용에 대한 자세한 내용은 [설정 옵션](https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/configmap/#configuration-options)을 참고하세요.
  
    </div>
  </div>

4. **확인**을 클릭하여 클러스터 게이트웨이를 만듭니다.

5. 생성된 클러스터 게이트웨이가 표시되고 게이트웨이의 기본 정보도 페이지에 표시됩니다.

  <div className="notices note">
    <p>Note</p>
    <div>
      클러스터의 모든 프로젝트에 대한 글로벌 게이트웨이 역할을 하는 `Super Kubenetes-router-Super Kubenetes-system`이라는 게이트웨이도 생성됩니다.
    </div>
  </div>


6. **관리**를 클릭하여 드롭다운 메뉴에서 작업을 선택합니다.

   - **자세히 보기**: 클러스터 게이트웨이의 세부 정보 페이지로 이동합니다.
   - **편집**: 클러스터 게이트웨이의 설정을 편집합니다.
   - **비활성화**: 클러스터 게이트웨이를 비활성화합니다.

7. 클러스터 게이트웨이 생성 후 생성 방법에 대한 자세한 내용은 [경로](../../../project-user-guide/application-workloads/routes/#create-a-route)를 참고하세요. 

## 클러스터 게이트웨이 세부 정보 페이지

1. **클러스터 게이트웨이** 탭 아래에서 클러스터 게이트웨이 오른쪽의 **관리**를 클릭하고 **세부 정보 보기**를 선택하여 세부 정보 페이지를 엽니다.
2. 세부 정보 페이지에서 **Edit**를 클릭하여 클러스터 게이트웨이의 설정을 편집하거나 **Disable**을 클릭하여 게이트웨이를 비활성화합니다.
3. **모니터링** 탭을 클릭하여 클러스터 게이트웨이의 모니터링 메트릭을 봅니다.
4. **설정 옵션** 탭을 클릭하여 클러스터 게이트웨이의 설정 옵션을 봅니다.
5. **Gateway Logs** 탭을 클릭하여 클러스터 게이트웨이의 로그를 봅니다.
6. **리소스 상태** 탭을 클릭하여 클러스터 게이트웨이의 작업 부하 상태를 봅니다. <img src="/dist/assets/docs/v3.3/common-icons/replica-plus-icon.png" width="15" alt="icon" /> 또는 <img src="/dist/ asset/docs/v3.3/common-icons/replica-minus-icon.png" width="15" /> 복제본 수를 확장하거나 축소합니다.
7. **메타데이터** 탭을 클릭하여 클러스터 게이트웨이의 주석을 봅니다.

## 프로젝트 게이트웨이 보기

**게이트웨이 설정** 페이지에서 **프로젝트 게이트웨이** 탭을 클릭하여 프로젝트 게이트웨이를 봅니다.

오른쪽에 있는 <img src="/dist/assets/docs/v3.3/project-administration/role-and-member-management/three-dots.png" width="20px" alt="icon">을 클릭합니다. 드롭다운 메뉴에서 작업을 선택하는 프로젝트 게이트웨이:

- **편집**: 프로젝트 게이트웨이의 설정을 편집합니다.
- **비활성**: 프로젝트 게이트웨이를 비활성화합니다.


<div className="notices note">
  <p>Note</p>
  <div>
    클러스터 게이트웨이 생성 이전에 프로젝트 게이트웨이가 존재하는 경우 프로젝트 게이트웨이 주소가 클러스터 게이트웨이 주소와 프로젝트 게이트웨이 주소 간에 전환될 수 있습니다. 클러스터 게이트웨이 또는 프로젝트 게이트웨이를 사용하는 것이 좋습니다.
  </div>
</div>


프로젝트 게이트웨이 생성 방법에 대한 자세한 내용은 [프로젝트 게이트웨이](../../../project-administration/project-gateway/)를 참고하세요.
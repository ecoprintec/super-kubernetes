---
title: "클러스터 가시성 및 권한 부여"
keywords: "Cluster Visibility, Cluster Management"
description: "Learn how to set up cluster visibility and authorization."
linkTitle: "Cluster Visibility and Authorization"
weight: 8610
---

Super Kubenetes에서는 워크스페이스 리소스가 클러스터에서 모두 실행될 수 있도록 권한 부여를 통해 클러스터를 여러 워크스페이스에 할당할 수 있습니다. 동시에 워크스페이스을 여러 클러스터와 연결할 수도 있습니다. 필요한 권한이 있는 작업 영역 사용자는 작업 영역에 할당된 클러스터를 사용하여 멀티 클러스터 프로젝트를 생성할 수 있습니다.

이 가이드는 클러스터 가시성을 설정하는 방법을 보여줍니다.

## 사전 준비
* [멀티 클러스터 기능](../../../multicluster-management/)을 활성화해야 합니다.
* ws-manager와 같은 작업공간 생성 권한이 있는 사용자와 작업공간이 필요합니다. 자세한 내용은 [워크스페이스, 프로젝트, 사용자 및 역할 생성](../../../quick-start/create-workspace-and-project/)을 참고하세요.

## 클러스터 가시성 설정

### 워크스페이스을 만들 때 사용 가능한 클러스터 선택

1. `ws-manager`와 같은 워크스페이스 생성 권한이 있는 사용자로 Super Kubenetes에 로그인하세요.

2. 왼쪽 상단의 **플랫폼**을 클릭하고 **액세스 제어**를 선택합니다. **워크스페이스**의 탐색 모음에서 **생성**를 클릭합니다.

3. 워크스페이스에 대한 기본 정보를 제공하고 **다음**를 클릭합니다.

4. **클러스터 설정** 페이지에서 사용 가능한 클러스터 목록을 볼 수 있습니다. 워크스페이스에 할당할 클러스터를 선택하고 **생성**를 클릭합니다.

5. 작업 영역이 생성된 후 필요한 권한이 있는 워크스페이스 멤버는 연결된 클러스터에서 실행되는 리소스를 생성할 수 있습니다.

  <div className="notices warning">
    <p>Warning</p>
    <div>
      클러스터 전체의 안정성이 저하될 수 있는 과도한 로드를 피하기 위해 호스트 클러스터에 리소스를 생성하지 마세요.
    </div>
  </div>

### 워크스페이스가 생성된 후 클러스터 가시성 설정

작업 영역이 생성된 후 권한 부여를 통해 작업 영역에 추가 클러스터를 할당하거나 작업 영역에서 클러스터를 바인딩 해제할 수 있습니다. 아래 단계에 따라 클러스터의 가시성을 조정하세요.

1. `admin`과 같은 클러스터 관리 권한이 있는 사용자로 Super Kubenetes에 로그인하세요.

2. 왼쪽 상단 모서리에서 **플랫폼**을 클릭하고 **클러스터 관리**를 선택합니다. 클러스터 정보를 보려면 목록에서 클러스터를 선택하세요.

3. 탐색 모음의 **클러스터 설정**에서 **클러스터 가시성**을 선택합니다.

4. 승인된 작업 영역 목록을 볼 수 있습니다. 즉, 현재 클러스터를 이러한 모든 작업 영역의 리소스에 사용할 수 있습니다.

5. **가시성 편집**을 클릭하여 클러스터 가시성을 설정합니다. 클러스터를 사용할 수 있는 새 작업 영역을 선택하거나 작업 영역에서 바인딩을 해제할 수 있습니다.

### 클러스터를 공개로 설정

플랫폼 사용자가 리소스를 생성하고 예약할 수 있는 클러스터에 액세스할 수 있도록 **공개 클러스터로 설정**을 선택할 수 있습니다.

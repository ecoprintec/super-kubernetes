---
title: "Elasticsearch를 수신기로 추가"
keywords: 'Kubernetes, log, elasticsearch, pod, container, fluentbit, output'
description: 'Learn how to add Elasticsearch to receive container logs, resource events, or audit logs.'
linkTitle: "Add Elasticsearch as a Receiver"
weight: 8622
---
KubernetesEnterprise에서 Elasticsearch, Kafka 및 Fluentd를 로그 수신기로 사용할 수 있습니다. 이 자습서는 Elasticsearch 수신기를 추가하는 방법을 보여줍니다.

## 사전 준비

- **클러스터 관리** 권한을 포함한 역할을 부여받은 사용자가 필요합니다. 예를 들어 콘솔에 직접 `admin`으로 로그인하거나 권한이 있는 새 역할을 생성하여 사용자에게 할당할 수 있습니다.

- 로그 수신기를 추가하기 전에 `logging`, `events` 또는 `auditing` 컴포넌트를 활성화해야 합니다. 자세한 내용은 [pluggable-components 활성화](../../../../pluggable-components/)를 참고하세요. 이 튜토리얼에서는 `logging`을 예로 사용합니다.

## Elasticsearch를 수신기로 추가

1. Super Kubenetes에 `admin`으로 로그인하세요. 왼쪽 상단 모서리에서 **플랫폼**을 클릭하고 **클러스터 관리**를 선택합니다.

  <div className="notices note">
    <p>Note</p>
    <div>
      [멀티 클러스터 기능](../../../../multicluster-management/)을 활성화한 경우 특정 클러스터를 선택할 수 있습니다.
    </div>
  </div>


2. 왼쪽 탐색 창에서 **클러스터 설정** > **로그 수신기**를 클릭하세요.

3. **로그 수신기 추가**를 클릭하고 **Elasticsearch**를 선택합니다.

4. Elasticsearch 서비스 주소와 포트 번호를 제공합니다.

5. Elasticsearch는 **로그 수신기** 페이지의 수신기 목록에 표시되며 상태는 **수집 중**입니다.

6. Elasticsearch가 Fluent Bit에서 보낸 로그를 수신하고 있는지 확인하려면 오른쪽 하단의 **툴박스**에서 **로그 검색**를 클릭하고 콘솔에서 로그를 검색합니다. 자세한 내용은 [로그 쿼리](../../../../toolbox/log-query/)를 참고하세요.

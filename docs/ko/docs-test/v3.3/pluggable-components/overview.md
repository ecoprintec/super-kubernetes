---
title: '플러그 구성 요소 활성화 - 개요'
keywords: 'Kubernetes, Super Kubenetes, pluggable-components, overview'
description: 'Develop a basic understanding of key components in Super Kubenetes, including features and resource consumption.'
linkTitle: 'Overview'
weight: 6100
---

Super Kubenetes는 v2.1.0부터 일부 핵심 기능 컴포넌트를 분리했습니다. 이러한 컴포넌트는 플러그형으로 설계되었으므로 Super Kubenetes를 설치하기 전이나 설치한 후 언제든 활성화할 수 있습니다. 컴포넌트를 별도로 활성화하지 않는다면, 기본적으로 Super Kubenetes는 최소 설치로 배포됩니다.

서로 다른 플러그형 컴포넌트는 서로 다른 네임스페이스에 배포됩니다. 사용자는 필요에 따라 이들 중 어떤 것이든 활성화할 수 있습니다. Super Kubenetes에서 제공하는 풀스택 기능과 능력을 찾는다면 이러한 플러그형 컴포넌트를 설치하는 것을 추천합니다.

각 컴포넌트를 활성화하는 방법에 대한 자세한 내용은 이 챕터의 해당 튜토리얼을 참조하십시오.

## 리소스 요구 사항

플러그형 컴포넌트를 활성화하기 전에, 아래 표를 참고하여 자신의 환경에 리소스가 충분한지 확인하십시오. 그렇지 않으면 리소스 부족으로 인해 컴포넌트가 충돌할 수 있습니다.

<div className="notices note">
  <p>Note</p>
  <div>
    단일 레플리카에는 아래 요구사항과 CPU 및 메모리 리소스 제한이 필요합니다.
  </div>
</div>

### Super Kubenetes 앱 스토어

  <table>
  <thead>
  <tr>
    <th>
      네임스페이스
    </th>
    <th>
      openpitrix-system
    </th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>
      CPU Request
    </td>
    <td>
      0.3 core
    </td>
  </tr>
  <tr>
    <td>
      CPU Limit
    </td>
    <td>
      None
    </td>
  </tr>
  <tr>
    <td>
      Memory Request
    </td>
    <td>
      300 MiB
    </td>
  </tr>
  <tr>
    <td>
      Memory Limit
    </td>
    <td>
      None
    </td>
  </tr>
  <tr>
    <td>
      Installation
    </td>
    <td>
      Optional
    </td>
  </tr>
  <tr>
    <td>
      Notes
    </td>
    <td>
      애플리케이션 라이프사이클 관리를 하는 앱 스토어를 제공합니다. 설치를 권장합니다.
    </td>
  </tr>
  </tbody>
  </table>

### Super Kubenetes DevOps 시스템

  <table>
  <thead>
  <tr>
    <th>
      네임스페이스
    </th>
    <th>
      ke-devops-system
    </th>
    <th>
      ke-devops-system
    </th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>
      Pattern
    </td>
    <td>
      All-in-One installation
    </td>
    <td>
      Multi-node installation
    </td>
  </tr>
  <tr>
    <td>
      CPU Request
    </td>
    <td>
      34 m
    </td>
    <td>
      0.47 core
    </td>
  </tr>
  <tr>
    <td>
      CPU Limit
    </td>
    <td>
      None
    </td>
    <td>
      None
    </td>
  </tr>
  <tr>
    <td>
      Memory Request
    </td>
    <td>
      2.69 G
    </td>
    <td>
      8.6 G
    </td>
  </tr>
  <tr>
    <td>
      Memory Limit
    </td>
    <td>
      None
    </td>
    <td>
      None
    </td>
  </tr>
  <tr>
    <td>
      Installation
    </td>
    <td>
      Optional
    </td>
    <td>
      Optional
    </td>
  </tr>
  <tr>
    <td>
      Notes
    </td>
    <td>
      Jenkins 파이프라인과 B2I & S2I를 통해 원스톱 DevOps 솔루션을 제공합니다.
    </td>
    <td>
      노드 중 하나의 메모리는 반드시 8G보다 커야 합니다.
    </td>
  </tr>
  </tbody>
  </table>

### Super Kubenetes 모니터링 시스템

  <table>
  <thead>
  <tr>
    <th>
      네임스페이스
    </th>
    <th>
      ke-monitoring-system
    </th>
    <th>
      ke-monitoring-system
    </th>
    <th>
      ke-monitoring-system
    </th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>
      Sub-component
    </td>
    <td>
      2 x Prometheus
    </td>
    <td>
      3 x Alertmanager
    </td>
    <td>
      Notification Manager
    </td>
  </tr>
  <tr>
    <td>
      CPU Request
    </td>
    <td>
      100 m
    </td>
    <td>
      10 m
    </td>
    <td>
      100 m
    </td>
  </tr>
  <tr>
    <td>
      CPU Limit
    </td>
    <td>
      4 cores
    </td>
    <td>
      None
    </td>
    <td>
      500 m
    </td>
  </tr>
  <tr>
    <td>
      Memory Request
    </td>
    <td>
      400 MiB
    </td>
    <td>
      30 MiB
    </td>
    <td>
      20 MiB
    </td>
  </tr>
  <tr>
    <td>
      Memory Limit
    </td>
    <td>
      8 GiB
    </td>
    <td>
      None
    </td>
    <td>
      1 GiB
    </td>
  </tr>
  <tr>
    <td>
      Installation
    </td>
    <td>
      Required
    </td>
    <td>
      Required
    </td>
    <td>
      Required
    </td>
  </tr>
  <tr>
    <td>
      Notes
    </td>
    <td>
      Prometheus의 메모리 소비는 클러스터 크기에 따라 다릅니다. 8GiB이면 200개의 노드/16,000개의 파드가 있는 클러스터에 충분합니다.
    </td>
    <td>
      -
    </td>
    <td>
      -
    </td>
  </tr>
  </tbody>
  </table>

<div className="notices note">
  <p>Note</p>
  <div>
    Super Kubenetes 모니터링 시스템은 플러그형 컴포넌트가 아니며, 이것은 기본으로 설치됩니다. 리소스 요청 및 제한은 로깅 등의 컴포넌트들과 밀접하게 관련되어 있으므로, 참고를 위해 이 페이지에 함께 정리했습니다.
  </div>
</div>

### Super Kubenetes 로깅 시스템

  <table>
  <thead>
  <tr>
    <th>
      네임스페이스
    </th>
    <th>
      ke-logging-system
    </th>
    <th>
      ke-logging-system
    </th>
    <th>
      ke-logging-system
    </th>
    <th>
      ke-logging-system
    </th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>
      Sub-component
    </td>
    <td>
      3 x Elasticsearch
    </td>
    <td>
      fluent bit
    </td>
    <td>
      kube-events
    </td>
    <td>
      kube-auditing
    </td>
  </tr>
  <tr>
    <td>
      CPU Request
    </td>
    <td>
      50 m
    </td>
    <td>
      20 m
    </td>
    <td>
      90 m
    </td>
    <td>
      20 m
    </td>
  </tr>
  <tr>
    <td>
      CPU Limit
    </td>
    <td>
      1 core
    </td>
    <td>
      200 m
    </td>
    <td>
      900 m
    </td>
    <td>
      200 m
    </td>
  </tr>
  <tr>
    <td>
      Memory Request
    </td>
    <td>
      2 G
    </td>
    <td>
      50 MiB
    </td>
    <td>
      120 MiB
    </td>
    <td>
      50 MiB
    </td>
  </tr>
  <tr>
    <td>
      Memory Limit
    </td>
    <td>
      None
    </td>
    <td>
      100 MiB
    </td>
    <td>
      1200 MiB
    </td>
    <td>
      100 MiB
    </td>
  </tr>
  <tr>
    <td>
      Installation
    </td>
    <td>
      Optional
    </td>
    <td>
      Required
    </td>
    <td>
      Optional
    </td>
    <td>
      Optional
    </td>
  </tr>
  <tr>
    <td>
      Notes
    </td>
    <td>
      로그 데이터 저장을 위한 옵션 컴포넌트입니다. 내부 Elasticsearch는 운영 환경에 권장하지 않습니다.
    </td>
    <td>
      로그 수집 에이전트. 로깅을 활성화한 후 필수인 컴포넌트입니다.
    </td>
    <td>
      Kubernetes 이벤트를 수집, 필터링, 내보내기 및 알림.
    </td>
    <td>
      Kubernetes와 Super Kubenetes의 감사 로그를 수집, 필터링 및 경고.
    </td>
  </tr>
  </tbody>
  </table>

### Super Kubenetes 경고 및 알림

  <table>
  <thead>
  <tr>
    <th>
      네임스페이스
    </th>
    <th>
      ke-alerting-system
    </th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>
      CPU Request
    </td>
    <td>
      0.08 core
    </td>
  </tr>
  <tr>
    <td>
      CPU Limit
    </td>
    <td>
      None
    </td>
  </tr>
  <tr>
    <td>
      Memory Request
    </td>
    <td>
      80 M
    </td>
  </tr>
  <tr>
    <td>
      Memory Limit
    </td>
    <td>
      None
    </td>
  </tr>
  <tr>
    <td>
      Installation
    </td>
    <td>
      Optional
    </td>
  </tr>
  <tr>
    <td>
      Notes
    </td>
    <td>
      경고 및 알림을 동시에 활성화해야 합니다.
    </td>
  </tr>
  </tbody>
  </table>

### Super Kubenetes 서비스 메쉬

  <table>
  <thead>
  <tr>
    <th>
      네임스페이스
    </th>
    <th>
      istio-system
    </th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>
      CPU Request
    </td>
    <td>
      1 core
    </td>
  </tr>
  <tr>
    <td>
      CPU Limit
    </td>
    <td>
      None
    </td>
  </tr>
  <tr>
    <td>
      Memory Request
    </td>
    <td>
      3.5 G
    </td>
  </tr>
  <tr>
    <td>
      Memory Limit
    </td>
    <td>
      None
    </td>
  </tr>
  <tr>
    <td>
      Installation
    </td>
    <td>
      Optional
    </td>
  </tr>
  <tr>
    <td>
      Notes
    </td>
    <td>
      그레이스케일 릴리스 전략, 트래픽 토폴로지, 트래픽 관리 및 분산 추적을 지원
    </td>
  </tr>
  </tbody>
  </table>

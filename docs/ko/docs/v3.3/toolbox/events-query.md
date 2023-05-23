---
title: "이벤트 쿼리"
keywords: 'Super Kubenetes, Kubernetes, Event, Query'
description: 'Understand how you can perform quick event queries to keep track of the latest events of your cluster.'
linkTitle: 'Event Query'
weight: 15200
---

쿠버네티스 이벤트는, Super Kubenetes가 더 긴 과거 쿼리와 집계 기능을 추가하고 테넌트 격리를 위한 이벤트 쿼리를 지원하는 것을 기반으로, 클러스터 내부에서 일어나는 일에 대한 통찰력을 제공합니다.

이 가이드는 컴포넌트의 상태를 추적하기 위해 여러 단계로 세분화된 이벤트 쿼리를 수행하는 방법을 시연합니다.

## 사전 준비

[Super Kubenetes 이벤트](../../pluggable-components/events/)를 활성화해야 합니다.

## 이벤트 쿼리

1. 이벤트 쿼리 기능은 모든 사용자가 사용할 수 있습니다. 임의의 계정으로 콘솔에 로그인하고, 좌측 하단 모서리의 <img src="/dist/assets/docs/v3.3/toolbox/event-query/toolbox.png" width="20" alt="icon" /> 위로 커서를 올리고 **리소스 이벤트 검색**을 선택하세요.

2. 표시된 대화 상자에서 사용자가 볼 수 있는 권한이 있는 이벤트 갯수를 볼 수 있습니다.

  <div className="notices note">
    <p>Note</p>
    <div>
      - Super Kubenetes는 [멀티 클러스터 기능](../../multicluster-management/introduction/overview/)을 활성화한 경우 각 클러스터에서 개별적으로 이벤트 쿼리를 지원합니다. 검색 상자 좌측의 <img src="/dist/assets/docs/v3.3/toolbox/event-query/drop-down-list.png" width="20" alt="icon" />을 클릭하고 대상 클러스터를 선택하세요.

      - Super Kubenetes는 기본적으로 지난 7일 동안의 이벤트를 저장합니다.
    </div>

  </div>

3. 검색 상자를 클릭하고, 메시지, 워크스페이스, 프로젝트, 리소스 유형, 리소스 이름, 이유, 범주 또는 시간 범위 별로 이벤트를 검색하는 조건을 입력할 수 있습니다 (예: 지난 10분 이내의 이벤트 검색하려면 `Time Range:Last 10 minutes` 입력).

4. 목록에서 결과 중 하나를 클릭하면 가공되지 않은 정보를 볼 수 있습니다. 이것은 디버깅 및 분석 측면에서 개발자에게 편리합니다.

<div className="notices note">
  <p>Note</p>
  <div>
    이벤트 쿼리 인터페이스는 5초, 10초 또는 15초마다의 동적 새로 고침을 지원합니다.
  </div>
</div>

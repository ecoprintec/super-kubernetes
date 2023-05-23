---
title: "로그 쿼리"
keywords: 'Super Kubenetes, Kubernetes, log, query'
description: 'Query Kubernetes logs from toolbox'
linkTitle: 'Log Query'
weight: 15100
---

애플리케이션 및 시스템의 로그는 클러스터 및 워크로드 내부에서 일어나는 일을 더 잘 이해하는 데 도움이 될 수 있습니다. 로그는 문제를 디버깅하고 클러스터 활동을 모니터링하는 데 특히 유용합니다. Super Kubenetes는 테넌트의 관점에서 사용자에게 로그 수집, 쿼리 및 관리 기능을 제공하는, 강력하고 사용하기 쉬운 로깅 시스템을 제공합니다. 테넌트 기반 로깅 시스템은 서로 다른 테넌트가 자신의 로그만 볼 수 있기 때문에 보안이 향상되므로 Kibana보다 훨씬 더 유용합니다. 또한 Super Kubenetes 로깅 시스템은 테넌트가 자신에게 유용한 로그에만 집중할 수 있도록 일부 중복 정보를 필터링합니다.

이 튜토리얼에서는 인터페이스, 검색 파라미터 및 세부 정보 페이지를 포함하여 로그 쿼리 기능을 사용하는 방법을 시연합니다.

## 사전 준비

[Super Kubenetes 로깅 시스템](../../pluggable-components/logging/)을 활성화해야 합니다.

## 로그 쿼리 인터페이스 입력

1. 로그 조회 기능은 모든 사용자가 사용할 수 있습니다. 임의의 계정으로 콘솔에 로그인하고, 좌측 하단 모서리의 <img src="/dist/assets/docs/v3.3/toolbox/log-query/toolbox.png" width="20" alt="icon" /> 위로 커서를 올리고 **로그 검색**을 선택하세요.

2. 팝업 창에서 로그 번호의 시간 히스토그램, 클러스터 선택 드롭다운 목록 및 로그 검색 표시줄을 볼 수 있습니다.

  <div className="notices note">
    <p>Note</p>
    <div>
      - Super Kubenetes는 [멀티 클러스터 기능](../../multicluster-management/introduction/overview/)을 활성화한 경우 각 클러스터에서 개별적으로 로그 쿼리를 지원합니다. 검색 상자 왼쪽의 <img src="/dist/assets/docs/v3.3/toolbox/log-query/drop-down-list.png" width="20" alt="icon" />을 클릭하고 대상 클러스터를 선택하세요.

      - Super Kubenetes는 기본적으로 지난 7일 동안의 로그를 저장합니다.

    </div>

  </div>

3. 로그 검색창에서 **기간**를 선택하여 쿼리 시간 범위를 사용자 지정할 수 있습니다. 또는 시간 히스토그램의 막대를 클릭하면 Super Kubenetes가 로그 쿼리에 해당 막대의 시간 범위를 사용합니다.

<div className="notices note">
  <p>Note</p>
  <div>
    - 키워드 영역은 키워드 조합의 쿼리를 지원합니다. 예를 들어 `Error`, `Fail`, `Fatal`, `Exception` 및 `Warning`을 함께 사용하여 모든 예외 로그를 쿼리할 수 있습니다.
    - 키워드 영역은 정확한 쿼리와 퍼지 쿼리를 지원합니다. 퍼지 쿼리는 대소문자를 구분하지 않는 퍼지 매칭 제공하고 ElasticSearch 세분화 규칙에 따라 단어나 구의 전반부로 전체 용어를 검색합니다. 예를 들어 `cpu` 키워드 대신 `node_cpu` 키워드를 검색하여 `node_cpu_total`이 포함된 로그를 검색할 수 있습니다.
    - 각 클러스터에는 별도로 설정할 수 있는 자체 로그 보존 기간이 있습니다. 이것은 `ClusterConfiguration`에서 수정할 수 있습니다. 자세한 내용은 [Super Kubenetes 로깅 시스템](../../pluggable-components/logging/)을 참조하세요.
  </div>
</div>

## 검색 파라미터 사용

1. 가능한 한 많은 영역을 제공하여 검색 결과를 좁힐 수 있습니다.

2. 목록에서 검색 결과 중 하나를 클릭하세요. 세부정보 페이지로 드릴다운하여, 오른쪽의 전체 컨텍스트를 포함한, 이 파드의 로그를 검사합니다. 이 방식은 디버깅 및 분석 측면에서 개발자에게 편리합니다.

<div className="notices note">
  <p>Note</p>
  <div>
    로그 쿼리 인터페이스는 5초, 10초 또는 15초의 동적 새로 고침을 지원하며, 사용자가 추가 분석을 위해 로그를 로컬 파일로 내보낼 수 있습니다 (우측 상단 모서리에서).
  </div>
</div>

4. 왼쪽 패널에서 <img src="/dist/assets/docs/v3.3/toolbox/log-query/view-detail-page.png" width="30" alt="icon" />을 클릭하여 파드 세부정보 페이지 또는 컨테이너 세부정보 페이지를 볼 수 있습니다.

## 세부 정보 페이지로 드릴

1. 로그가 비정상적으로 보이면 파드 세부 정보 페이지 또는 컨테이너 세부 정보 페이지로 드릴다운하여 컨테이너 로그, 리소스 모니터링 그래프 및 이벤트를 자세히 검사할 수 있습니다.

2. 컨테이너 상세 페이지를 확인하세요. 동시에 터미널을 열어 컨테이너를 직접 디버그할 수 있습니다.

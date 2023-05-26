---
title: "차트"
keywords: 'monitoring, Prometheus, Prometheus Operator'
description: 'Explore dashboard properties and chart metrics.'
linkTitle: "Charts"
weight: 10816
---

Super Kubenetes는 현재 텍스트 차트와 그래프의 두 가지 차트를 지원합니다.

## 텍스트 차트

단일 메트릭 값을 표시하려면 텍스트 차트를 사용하는 것이 좋습니다. 텍스트 차트의 편집 창은 두 부분으로 구성됩니다. 상단은 실시간 메트릭 값을 표시하고 하단은 편집용입니다. PromQL 표현식을 입력하여 단일 메트릭 값을 가져올 수 있습니다.

- **차트 이름**: 텍스트 차트의 이름.
- **단위**: 메트릭 데이터 단위.
- **소수점**: 정수를 허용합니다.
- **모니터링 메트릭**: 사용 가능한 Prometheus 메트릭의 드롭다운 목록에서 모니터링 메트릭을 지정합니다.

## 그래프 차트

여러 메트릭 값을 표시하려면 그래프 차트를 사용하는 것이 좋습니다. 그래프 편집 창은 세 부분으로 구성됩니다. 상단에는 실시간 메트릭 값이 표시됩니다. 왼쪽 부분은 그래프 테마를 설정하는 부분입니다. 오른쪽 부분은 메트릭 및 차트 설명을 편집하기 위한 것입니다.

- **차트 유형**: 기본 차트 및 막대 차트를 지원합니다.
- **그래프 유형**: 기본 차트 및 누적 차트를 지원합니다.
- **차트 색상**: 선 색상을 변경.
- **차트 이름**: 차트의 이름.
- **설명**: 차트 설명.
- **추가**: 새 쿼리 편집기를 추가.
- **메트릭 이름**: 라인의 범례. 변수를 지원합니다. 예를 들어, `{{파드}}`는 Prometheus 메트릭 레이블 `파드`의 값을 사용하여 이 줄의 이름을 지정한다는 의미입니다.
- **간격**: 두 데이터 포인트 사이의 단계 값.
- **모니터링 메트릭**: 사용 가능한 Prometheus 메트릭 목록.
- **단위**: 메트릭 데이터 단위.
- **소수점**: 정수를 허용합니다.
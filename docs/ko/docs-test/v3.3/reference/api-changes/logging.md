---
title: "로깅"
keywords: 'Kubernetes, Super Kubenetes, API, Logging'
description: 'The API changes of the component logging in Super Kubenetes v3.3.0.'
linkTitle: "Logging"
weight: 17310
---

Super Kubenetes v3.3.0에서 **로깅** 컴포넌트의 API 변경사항.

## 시간 형식

쿼리 파라미터의 시간 형식은 Unix 타임스탬프(Unix epoch 이후 경과된 초 수)여야 합니다. 밀리초는 더 이상 허용되지 않습니다. 변경 사항은 `start_time` 및 `end_time` 파라미터에 영향을 미칩니다.

## 사용되지 않는 API

다음 API가 제거됩니다.

- GET  /workspaces/{workspace}
- GET  /namespaces/{namespace}
- GET  /namespaces/{namespace}/workloads/{workload}
- GET  /namespaces/{namespace}/pods/{pod}
- 로그 설정 API 그룹 전체

## Fluent Bit Operator

Super Kubenetes 3.3.0에서는 프로젝트 Fluent Bit Operator가 호환되지 않는 방식으로 리팩터링되므로, 로그 설정 API 전체가 Super Kubenetes 코어에서 제거됩니다.

---
title: "맞춤형 애플리케이션 모니터링 소개"
keywords: 'monitoring, prometheus, prometheus operator'
description: 'Introduce the Super Kubenetes custom monitoring feature and metric exposing, including exposing methods and ServiceMonitor CRD.'
linkTitle: "Introduction"
weight: 10810
---

맞춤형 모니터링을 사용하면 Super Kubenetes에서 맞춤형 애플리케이션 메트릭을 모니터링하고 시각화할 수 있습니다. 애플리케이션은 MySQL, Redis, Elasticsearch와 같은 타사 애플리케이션이거나 또는 자체 애플리케이션일 수 있습니다. 이 섹션에서는 이 기능의 작업 흐름을 소개합니다.

Super Kubenetes 모니터링 엔진은 Prometheus 및 Prometheus Operator에 의해 구동됩니다. 맞춤형 애플리케이션 메트릭을 Super Kubenetes에 통합하려면 일반적으로 다음 단계를 거쳐야 합니다.

- 애플리케이션의 [Prometheus 형식의 메트릭 노출](#step-1-expose-prometheus-formatted-metrics).
- [ServiceMonitor CRD를 적용](#step-2-apply-servicemonitor-crd)하여 애플리케이션을 모니터링 대상과 연결.
- 대시보드의 [메트릭을 시각화](#step-3-visualize-metrics)하여 맞춤형 메트릭의 동향 보기.

### 1단계: Prometheus 형식 측정항목 노출

우선, 애플리케이션은 Prometheus 형식의 메트릭을 노출해야 합니다. Prometheus 노출 형식은 클라우드 네이티브 모니터링 영역에서의 de-facto 형식입니다. Prometheus는 [텍스트 기반 노출 형식](https://prometheus.io/docs/instrumenting/exposition_formats/)을 사용합니다. 애플리케이션 및 사용 사례에 따라 메트릭을 노출하는 두 가지 방법이 있습니다:

#### 직접 노출

애플리케이션에서 Prometheus 메트릭을 직접 노출하는 것은 클라우드 네이티브 애플리케이션에서 일반적인 방법입니다. 개발자는 코드에서 Prometheus 클라이언트 라이브러리를 가져오고 특정 엔드포인트에서 메트릭을 노출해야 합니다. etcd, CoreDNS 및 Istio와 같은 많은 애플리케이션이 이 방법을 채택합니다.

Prometheus 커뮤니티는 대부분의 프로그래밍 언어에 대한 클라이언트 라이브러리를 제공합니다. [Prometheus 클라이언트 라이브러리](https://prometheus.io/docs/instrumenting/clientlibs/) 페이지에서 자신의 언어를 찾으십시오. Go 개발자의 경우 [Go 애플리케이션 장치하기](https://prometheus.io/docs/guides/go-application/)을 읽고 Prometheus 호환 애플리케이션을 작성하는 방법을 알아보세요.

[샘플 웹 애플리케이션](../examples/monitor-sample-web/)은 애플리케이션이 Prometheus 형식의 메트릭을 직접 노출하는 방법을 보여주는 예시입니다.

#### 간접 노출

코드를 수정하고 싶지 않거나 혹은 서드파티에서 제공한 애플리케이션이기 때문에 수정할 수 없는 경우, 메트릭 데이터를 스크랩하고 프로메테우스 형식으로 변환하는 에이전트 역할을 하는 내보내기 도구(exporter)를 배포할 수 있습니다.

MySQL과 같은, 대부분의 서드파티 애플리케이션의 경우, Prometheus 커뮤니티는 바로 운영가능한 내보내기 도구를 제공합니다. 사용 가능한 내보내기 도구는 [내보내기 도구 및 통합](https://prometheus.io/docs/instrumenting/exporters/)을 참조하십시오. Super Kubenetes에서는 [OpenPitrix를 활성화](../../../pluggable-components/app-store/)하고 앱 스토어에서 내보내기 도구를 배포하는 것이 좋습니다. MySQL, Elasticsearch 및 Redis용 내보내기는 모두 앱 스토어에 내장된 앱입니다.

MySQL 내보내기 도구를 배포하고 MySQL 메트릭을 모니터링하는 방법을 알아보려면 [MySQL 모니터링](../examples/monitor-mysql/)을 읽으시길 바랍니다.

내보내기 도구를 작성하는 것은 Prometheus 클라이언트 라이브러리를 사용하여 애플리케이션을 장치하는 것과 다름없습니다. 유일한 차이점은 내보내기 도구가 애플리케이션에 연결되어야 하고 애플리케이션 메트릭을 Prometheus 형식으로 변환해야 한다는 것 뿐입니다.

### 2단계: ServiceMonitor CRD 적용

이전 단계에서는 쿠버네티스 서비스 오브젝트의 메트릭 엔드포인트를 노출했습니다. 다음은 Super Kubenetes 모니터링 엔진에 새 변경 사항을 알려야 합니다.

ServiceMonitor CRD는 [Prometheus Operator](https://github.com/prometheus-operator/prometheus-operator)에서 정의합니다. ServiceMonitor에는 메트릭 엔드포인트에 대한 정보가 포함되어 있습니다. Super Kubenetes 모니터링 엔진은 ServiceMonitor 오브젝트를 사용하여 메트릭을 어디에서 어떻게 탐색할지 알고 있습니다. 각 모니터링 대상에 대해 ServiceMonitor 오브젝트를 적용하여 애플리케이션(또는 내보내기 도구)을 Super Kubenetes에 연결합니다.

Super Kubenetes에서는 재사용을 위해 ServiceMonitor를 애플리케이션(또는 내보내기 오브젝트)과 함께 Helm 차트에 패키징해야 합니다. 향후 릴리스에서 Super Kubenetes는 손쉬운 작동을 위한 그래픽 인터페이스를 제공할 것입니다.

ServiceMonitor를 애플리케이션과 함께 패키징하는 방법을 알아보려면 [샘플 웹 애플리케이션 모니터링](../examples/monitor-sample-web/)을 읽으시길 바랍니다.

### 3단계: 측정항목 시각화

약 2분 후에 Super Kubenetes 모니터링 엔진이 메트릭을 탐색하고 저장하기 시작합니다. 그런 다음 PromQL을 사용하여 메트릭을 쿼리하고 패널과 대시보드를 디자인할 수 있습니다.

PromQL 표현식을 작성하는 방법을 배우려면 [Querying](../visualization/querying/)을 읽으시길 바랍니다. 대시보드 기능은 [시각화](../visualization/overview/)를 읽어주세요.


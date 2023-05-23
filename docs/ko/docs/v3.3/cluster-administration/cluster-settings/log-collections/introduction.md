---
title: '로그 리시버 소개'
keywords: 'Kubernetes, log, elasticsearch, kafka, fluentd, pod, container, fluentbit, output'
description: 'Learn the basics of cluster log receivers, including tools, and general steps.'
linkTitle: 'Introduction'
weight: 8621
---

Super Kubenetes는 유연한 로그 리시버 설정 방법을 제공합니다. [FluentBit Operator](https://github.com/kubesphere/fluentbit-operator/)를 통해 사용자는 Elasticsearch, Kafka 및 Fluentd 리시버를 쉽게 추가, 수정, 삭제, 활성화 또는 비활성화할 수 있습니다. 리시버가 추가되면 이 리시버에게 로그가 전송됩니다.

이 튜토리얼은 Super Kubenetes에서 로그 리시버를 추가하는 일반적인 단계에 대한 간략한 소개를 제공합니다.

## 사전 준비

- **클러스터 관리** 권한을 포함한 역할을 부여받은 사용자가 필요합니다. 예를 들어 콘솔에 직접 `admin`으로 로그인하거나 권한이 있는 새 역할을 생성하여 사용자에게 할당할 수 있습니다.

- 로그 리시버를 추가하기 전에 `logging`, `events` 또는 `auditing` 컴포넌트를 활성화해야 합니다. 자세한 내용은 [플러그 구성 요소 활성화](../../../../pluggable-components/overview)를 참조하십시오.

## 컨테이너 로그에 대한 로그 리시버 추가

로그 리시버를 추가하려면:

1. Super Kubenetes의 웹 콘솔에 `admin`으로 로그인하세요.

2. 왼쪽 상단 모서리에서 **플랫폼**을 클릭하고 **클러스터 관리**를 선택합니다.

  <div className="notices note">
    <p>Note</p>
    <div>
      [멀티 클러스터 기능](../../../../multicluster-management/)을 활성화한 경우 특정 클러스터를 선택할 수 있습니다.
    </div>
  </div>

3. 사이드바의 **클러스터 설정** 아래에 있는 **로그 리시버**로 이동합니다.

4. 로그 리시버 목록 페이지에서 **로그 리시버 추가**를 클릭하세요.

  <div className="notices note">
    <p>Note</p>
    <div>
      - 각 리시버 유형에 대해 최대 1개의 리시버를 추가할 수 있습니다.
      - 다른 유형의 리시버를 동시에 추가할 수 있습니다.
    </div>
  </div>

### Elasticsearch를 로그 리시버로 추가

[ClusterConfiguration](https://github.com/kubesphere/kubekey/blob/release-2.2/docs/config-example.md)에서 `logging`, `events` 또는 `auditing`이 활성화된 경우 기본 Elasticsearch 수신기가 Elasticsearch 클러스터로 설정된 서비스 주소와 함께 추가됩니다.

`logging`, `events` 또는 `auditing`이 활성화될 때 `ExternalElasticsearchUrl` 또는 `externalElasticsearchPort`가 [ClusterConfiguration](https://github.com/kubesphere/kubekey/blob/release-2.2/docs/config-example.md)에 지정되지 않은 경우 내부 Elasticsearch 클러스터가 Kubernetes 클러스터에 배포됩니다. 내부 Elasticsearch 클러스터는 테스트 및 개발 전용입니다. 운영용으로 외부 Elasticsearch 클러스터를 설정하는 것이 좋습니다.

로그 검색은 설정된 내부 또는 외부 Elasticsearch 클러스터에 의존합니다.

기본 Elasticsearch 로그 리시버가 삭제된 경우 [Elasticsearch를 리시버로 추가](../add-es-as-receiver/)를 참조하여 새로 추가하세요.

### Kafka를 로그 리시버로 추가

Kafka는 종종 로그를 수신하는 데 사용되며 Spark와 같은 다른 처리 시스템에 대한 브로커 역할을 합니다. [Kafka를 리시버로 추가](../add-kafka-as-receiver/)는 쿠버네티스 로그를 수신하기 위해 Kafka를 추가하는 방법을 보여줍니다.

### Fluentd를 로그 리시버로 추가

Elasticsearch나 Kafka가 아닌 다른 곳으로 로그를 출력해야 하는 경우 Fluentd를 로그 리시버로 추가할 수 있습니다. Fluentd에는 S3, MongoDB, Cassandra, MySQL, syslog 및 Splunk와 같은 다양한 대상으로 로그를 전달할 수 있는 수많은 출력 플러그인이 있습니다. [Fluentd를 리시버로 추가](../add-fluentd-as-receiver/)는 쿠버네티스 로그를 수신하기 위해 Fluentd를 추가하는 방법을 보여줍니다.

## 리소스 이벤트 또는 감사 로그에 대한 로그 리시버 추가

Super Kubenetes v3.0.0부터 리소스 이벤트 및 감사 로그를 컨테이너 로그와 동일한 방식으로 보관할 수 있습니다. **로그 리시버** 페이지의 **리소스 이벤트** 또는 **감사 로그** 탭은 [ClusterConfiguration](https://github.com/ kubesphere/kubekey/blob/release-2.2/docs/config-example.md). 해당 탭으로 이동하여 리소스 이벤트 또는 감사 로그에 대한 로그 리시버를 설정할 수 있습니다.

컨테이너 로그, 리소스 이벤트 및 감사 로그는 Super Kubenetes에서 검색할 다른 Elasticsearch 인덱스에 저장해야 합니다. 인덱스는 <인덱스 접두사>-<년-월-일> 형식으로 자동 생성됩니다.

## 로그 리시버 켜기 또는 끄기

로그 리시버를 추가하거나 삭제하지 않고 켜거나 끌 수 있습니다. 로그 리시버를 켜거나 끄려면:

1. **로그 리시버** 페이지에서 로그 리시버를 클릭하고 리시버의 세부 정보 페이지로 이동합니다.
2. **더보기**를 클릭하고 **상태 변경**을 선택합니다.

3. **수집** 또는 **비활성화**를 선택하여 로그 리시버를 켜거나 끕니다.

4. 끄면 로그 리시버의 상태가 **사용불가**로 변경되고, 그렇지 않으면 **로그 리시버** 페이지에서 상태가 **수집 중**으로 변경됩니다.

## 로그 리시버 편집 또는 삭제

로그 리시버를 편집하거나 삭제할 수 있습니다.

1. **로그 리시버** 페이지에서 로그 리시버를 클릭하고 리시버의 세부 정보 페이지로 이동합니다.
2. 드롭다운 목록에서 **편집** 또는 **편집 YAML**을 클릭하여 로그 리시버를 편집합니다.

3. **삭제**를 클릭하여 로그 리시버를 삭제합니다.

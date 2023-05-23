/*
 * This file is part of  Console.
 * Copyright (C) 2019 The  Console Authors.
 *
 *  Console is free software:                                                                  you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 *  Console is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with  Console.  If not, see <https://www.gnu.org/licenses/>.
 */
module.exports = {
  // Banner
  SYSTEM_COMPONENT_PL: '시스템 구성 요소',
  SERVICE_COMPONENTS_DESC: '시스템 구성 요소는 다양한 기능을 제공하는  시스템의 소프트웨어 구성 요소입니다. 이 페이지에서 서비스 구성 요소의 실행 상태를 볼 수 있습니다.',
  // 
  STOPPED: '정지된',
  RUNNING_TIME: '런닝 타임',
  KS_CONSOLE_DESC: ' 콘솔 서비스를 제공합니다.' ,
  KS_APISERVER_DESC: '클러스터 관리를 위한 REST API를 제공합니다. 이 구성 요소는 클러스터 구성 요소와 클러스터 보안 제어 간의 통신에도 사용됩니다.' ,
  OPENLDAP_DESC: '사용자 정보를 중앙 집중식으로 저장 및 관리합니다.' ,
  REDIS_DESC: '데이터베이스, 캐시 및 메시지 브로커로 사용되는 오픈 소스 인 메모리 데이터 구조 저장소.' ,
  TOWER_DESC: '프록시를 통한 클러스터 간 네트워크 연결에 사용되는 도구.' ,
  KS_CONTROLLER_MANAGER_DESC: '서비스 로직을 구현합니다. 이 구성 요소는 작업 공간이 생성될 때 사용 권한을 생성하고 서비스 전략을 위한 Istio 구성을 생성합니다.' ,
  // Kubernetes
  COREDNS_DESC: 'Kubernetes 클러스터에 대한 서비스 검색 기능을 제공합니다.' ,
  METRICS_SERVER_DESC: '각 노드의 큐블릿에서 메트릭을 수집하는 Kubernetes 모니터링 구성 요소.' ,
  KUBE_SCHEDULER_DESC: '적절한 노드에 파드을 할당하는 Kubernetes 스케줄러.' ,
  KUBE_SCHEDULER_SVC_DESC: '적절한 노드에 파드을 할당하는 Kubernetes 스케줄러.' ,
  KUBE_CONTROLLER_MANAGER_SVC_DESC: '코어 컨트롤 루프를 내장한 데몬이 쿠버네테스와 함께 선적되었습니다.',
  // Istio
  JAEGER_COLLECTOR_DESC: '사이드카 데이터를 수집합니다. Istio의 사이드카는 jaeger-agent입니다.',
  JAEGER_COLLECTOR_HEADLESS_DESC: '사이드카 데이터를 수집합니다. Istio의 사이드카는 jaeger-agent입니다.',
  JAEGER_QUERY_DESC: '쿼리 요청을 수락하고 백엔드 스토리지 시스템에서 추적을 검색하고 웹 UI에 데이터를 표시합니다.',
  JAEGER_OPERATOR_METRICS_DESC: '운영자에 대한 모니터링 메트릭을 제공합니다.',
  // Monitoring
  MONITORING: '모니터링',
  PROMETHEUS_K8S_DESC: '노드, 워크로드, API 객체에 대한 모니터링 데이터 제공',
  NODE_EXPORTER_DESC: '프로메테우스에 대한 모든 클러스터 노드의 모니터링 데이터를 제공합니다.',
  KUBE_STATE_METRICS_DESC: 'Kubernetes API 서버에서 수신하여 노드, 워크로드, Pod 등 클러스터 API 개체의 상태를 가져오고 Prometheus에 대한 모니터링 데이터를 생성합니다.',
  PROMETHEUS_OPERATED_DESC: '프로메테우스 오퍼레이터가 내부적으로 사용하는 모든 프로메테우스 인스턴스에 해당하는 서비스',
  PROMETHEUS_OPERATOR_DESC: 'Prometheus 인스턴스를 관리합니다.',
  ALERTMANAGER_OPERATED_DESC: 'Alertmanager와 Prometheus의 통합에 사용되는 Alertmanager 서비스',
  ALERTMANAGER_MAIN_DESC: 'Alertmanager 웹 UI 서비스',
  NOTIFICATION_MANAGER_SVC_DESC: '이메일, WeChat 메시지, Slack 메시지와 같은 알림을 보내기 위한 인터페이스를 제공합니다.',
  NOTIFICATION_MANAGER_CONTROLLER_METRICS_DESC: 'Notification Manager Controller에 대한 내부 모니터링 데이터를 제공합니다.',
  // Logging
  LOGGING: '로깅',
  ELASTICSEARCH_LOGGING_DATA_DESC: '데이터 저장, 백업 및 검색과 같은 탄력적인 검색 서비스를 제공합니다.' ,
  ELASTICSEARCH_LOGGING_DISCOVERY_DESC: '탄력적인 검색 클러스터 관리 서비스를 제공합니다.' ,
  LOGSIDECAR_INJECTOR_ADMISSION_DESC: '디스크 로그 수집을 위해 사이드카 컨테이너를 자동으로 Pod에 주입합니다.' ,
  KS_EVENTS_ADMISSION_DESC: '이벤트 규칙 관리를 위한 인증 웹 훅을 제공합니다.' ,
  KS_EVENTS_RULER_DESC: '필터링 및 경고 기능을 제공하는 이벤트 규칙 엔진 서비스.' ,
  KUBE_AUDITING_WEBHOOK_SVC_DESC: '감사 수집, 비교, 지속성 및 경고에 사용됩니다.' ,
  // DevOps
  S2IOPERATOR_METRICS_SERVICE_DESC: '기본 모니터링 데이터를 제공하는 S2I 모니터링 서비스',
  WEBHOOK_SERVER_SERVICE_DESC: 'S2I에 대한 기본값 및 인증 웹훅을 제공합니다.'
};
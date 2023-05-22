/*
 * This file is part of KuberixEnterprise Console.
 * Copyright (C) 2019 The KuberixEnterprise Console Authors.
 *
 * KuberixEnterprise Console is free software:                                       you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * KuberixEnterprise Console is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with KuberixEnterprise Console.  If not, see <https://www.gnu.org/licenses/>.
 */
module.exports = {
  // Banner
  LOG_RECEIVER_PL: '로그 수신기',
  LOG_COLLECTION_DESC: '시스템은 각 컨테이너에서 표준 출력(stdout) 및 표준 오류(stderr) 로그를 수집하여 하나 이상의 대상 서비스로 보냅니다.',
  // Banner > Add Log Receiver
  ADD_LOG_RECEIVER: '로그 수신기 추가',
  LOG_COLLECTION_TIPS: '각 유형에 대해 하나의 로그 수신기를 추가할 수 있습니다.',
  ES_DESC: 'Elasticsearch는 분산된 RESTful 검색 및 분석 엔진입니다.',
  KAFKA_DESC: 'Kafka는 인기 있는 오픈 소스 스트림 처리 플랫폼입니다.',
  FLUENTD_DESC: 'Fluentd는 통합 로깅 계층을 위한 오픈 소스 데이터 수집기입니다.',
  // Banner > Add Log Receiver > Elasticsearch
  LOG_COLLECTION_ES_URL_TIPS: '기본 제공 Elastic 검색 서비스가 사용됩니다. 클러스터 내부 또는 외부에 독립적으로 배포된 Elasticsearch의 IP 주소를 입력할 수도 있습니다.' ,
  LOG_COLLECTION_ES_INDEX_TIPS: '인덱스 접두사를 사용하여 쿼리 속도를 높입니다. 인덱스 접두사는 <Index prefix>-<Year-month-date> 형식으로 자동으로 생성됩니다.',
  ADDRESS_VALUE: '주소: {value}',
  PARAMETER_REQUIRED: '이 매개 변수는 필수입니다.' ,
  // Banner > Add Log Receiver > Kafka
  TOPIC: '토픽',
  ADD_SERVICE_ADDRESS: '추가',
  SERVICE_ADDRESS: '서비스 주소',
  ENTER_SERVICE_ADDRESS: '서비스 주소를 입력하십시오.' ,
  INVALID_SERVICE_ADDRESS: '올바른 서비스 주소를 입력하십시오.' ,
  SERVICE_ADDRESS_EXIST: '서비스 주소가 이미 존재합니다. 다른 서비스 주소를 입력하십시오.',
  EXAMPLE_VALUE: '예시: {value}',
  // Banner > Add Log Receiver > Fluentd
  LOG_COLLECTION_FLUENTD_URL_TIPS: '로그를 받는 Fluentd 서비스의 주소를 입력하세요.',
  // Container Logs
  EMPTY_LOG_COLLECTIONS: '로그 수신기를 찾을 수 없습니다. 로그 수신자를 추가하고 외부 로그 수신자에게 로그를 보낼 수 있습니다.',
  // Resource Events
  RESOURCE_EVENTS: '리소스 이벤트',
  // Audit Logs
  AUDIT_LOGS: '감사 로그'
};
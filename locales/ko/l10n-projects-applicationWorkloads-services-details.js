/*
 * This file is part of KuberixEnterprise Console.
 * Copyright (C) 2019 The KuberixEnterprise Console Authors.
 *
 * KuberixEnterprise Console is free software:                                you can redistribute it and/or modify
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
  // Details
  ENDPOINT: '엔드포인트',
  SESSION_AFFINITY: '세션 관련성',
  // More
  EDIT_EXTERNAL_ACCESS: '외부 액세스 수정',
  EDIT_MONITORING_EXPORTER: '모니터링 내보내기 수정',
  EDIT_SERVICE: '서비스 수정',
  // More > Edit Service
  // More > Edit Service > Specify Workload
  // More > Edit External Access > Access Mode
  ACCESS_NONE_TIP: '인터넷 액세스는 지원되지 않으며 서비스는 클러스터 내에서만 액세스할 수 있습니다.' ,
  EXTERNAL_SERVICE: '외부 서비스',
  // More > Edit Monitoring Exporter
  COLLECTION_INTERVAL_MIN: '수집 간격(분)',
  COLLECTION_INTERVAL_MIN_DESC: '두 메트릭 수집 작업 사이의 간격(분). 기본값은 1입니다.' ,
  COLLECTION_TIMEOUT_DESC: '각 수집 작업의 시간 초과 간격(초). 기본값은 10입니다.' ,
  SELECT_AUTHENTICATION_METHOD: '인증 방법 선택',
  SELECT_AUTHENTICATION_METHOD_DESC: '측정지표 수집 시 사용되는 인증 방법을 선택하십시오.' ,
  NO_AUTHENTICATION_TCAP: '인증 없음',
  NO_AUTHENTICATION_TIP: '측정지표 수집 중에는 인증이 사용되지 않습니다.' ,
  CREATE_A_NEW_SECRET: '새로운 Secret 생성',
  REFRESH_SECRETS: 'Secret 새로고침',
  CERTIFICATE_AUTHORITY: '인증 기관',
  SERVER_NAME: '서버 이름',
  TLS_SETTINGS_TCAP: 'TLS 설정',
  BEARER_TOKEN_TCAP: '베어러 토큰',
  BASIC_AUTHENTICATION_TCAP: '기본 인증',
  // More > Edit YAML
  // Details
  EXTERNAL_IP_ADDRESS: '외부 IP 주소',
  // Resource Status
  MONITORING_EXPORTER: '모니터링 내보내기',
  MONITORING_EXPORTER_VALUE: '모니터링 내보내기: {value}',
  PORT_PL: '포트',
  SERVICE_NODE_PORT_DESC: '클라이언트 시스템이 클러스터와 동일한 네트워크에 있는 경우 <노드 IP 주소>를 사용할 수 있습니다.<노드 포트>를 사용하여 서비스에 액세스합니다.' ,
  IMAGE_BUILDING_FAILED: '이미지 빌드 실패',
  IMAGE_BUILDING_SUCCESSFUL: '이미지 구축 성공',
  BUILDING_IMAGE: '이미지 구축'
};
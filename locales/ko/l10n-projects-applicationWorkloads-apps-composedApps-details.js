/*
 * This file is part of  Console.
 * Copyright (C) 2019 The  Console Authors.
 *
 *  Console is free software: you can redistribute it and/or modify
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
  "ADD_SERVICE": "서비스 추가",
  "ADD_ROUTE": "경로 추가",
  "SERVICE_ADDED_SUCCESSFULLY": "서비스가 추가되었습니다.",
  "WORKLOAD_TYPE_DEPLOYMENTS": "배포",
  "WORKLOAD_TYPE_DAEMONSETS": "데몬셋",
  "WORKLOAD_TYPE_STATEFULSETS": "스테이트풀셋",
  "TRAFFIC_MONITORING": "트래픽 모니터링",
  "TRAFFIC_MONITORING_UNAVAILABLE_DESC": "앱이 오랫동안 요청을 받지 못했습니다. 나중에 다시 시도하십시오.",
  "TRAFFIC_ENTRY": "트래픽 진입",
  "NO_DATA": "데이터 없음",
  "REFRESH": "새로 고침",
  "SUCCESS_RATE": "성공률",
  "TRAFFIC_RPS": "트래픽(RPS)",
  "BANDWIDTH": "대역폭",
  "HTTP_INBOUND_TRAFFIC": "HTTP 인바운드 트래픽",
  "HTTP_OUTBOUND_TRAFFIC": "HTTP 아웃바운드 트래픽",
  "TRAFFIC_POLICIES": "트래픽 정책",
  "LOAD_BALANCING": "부하 분산",
  "LOAD_BALANCING_ALGORITHM": "부하 분산 알고리즘",
  "LB_ROUND_ROBIN": "라운드 로빈",
  "LB_LEAST_CONN": "최소 연결",
  "LB_RANDOM": "랜덤",
  "LB_ALG_DESC": "<strong>라운드 로빈</strong>: 클라이언트 요청을 백엔드로 교대로 배포합니다.<br/><strong>최소 연결</strong>: 두 개의 정상 백엔드를 임의로 선택하고 연결이 적은 백엔드로 클라이언트 요청을 보냅니다.<br/><strong>랜덤</strong>: 모든 정상 백엔드에서 임의로 선택한 백엔드로 클라이언트 요청을 보냅니다.",
  "HASH_BASED_ON_HTTP_HEADER": "HTTP 헤더 기반 해시",
  "HASH_BASED_ON_HTTP_COOKIE": "HTTP 쿠키 기반 해시",
  "HASH_BASED_ON_SOURCE_IP_ADDRESS": "소스 IP 주소에 기반한 해시",
  "HTTP_HEADER": "HTTP 헤더",
  "HTTP_COOKIE": "HTTP 쿠키",
  "CONNECTION_POOL": "연결 풀",
  "CONNECTION_POOL_TIP": "응용 프로그램에 대해 고정된 수의 연결 개체를 만들고 재사용할 수 있도록 연결 풀에 저장합니다. 각 요청에 대한 연결 풀에서 연결 개체가 검색되고 사용 후 풀로 반환됩니다.",
  "MAXIMUM_CONNECTIONS": "최대 연결 수",
  "MAXIMUM_CONNECTIONS_DESC": "대상 백엔드에 대한 HTTP1 또는 TCP 연결의 최대 수.",
  "MAXIMUM_REQUESTS_PER_CONNECTION": "연결당 최대 요청 수",
  "MAXIMUM_REQUESTS_PER_CONNECTION_DESC": "백엔드에 대한 연결당 최대 요청 수입니다.",
  "TRAFFIC_MONITORING_MAXIMUM_RETRIES": "최대 재시도 횟수",
  "TRAFFIC_MONITORING_MAXIMUM_RETRIES_DESC": "요청에 대한 최대 재시도 횟수.",
  "CONNECTION_TIMEOUT": "연결 시간 초과",
  "CONNECTION_TIMEOUT_DESC": "TCP 연결 시간 초과 기간.",
  "MAXIMUM_REQUESTS": "최대 요청 수",
  "MAXIMUM_PENDING_REQUESTS": "대기 중인 최대 요청 수",
  "CIRCUIT_BREAKER": "회로 차단기",
  "CIRCUIT_BREAKER_DESC": "서비스에 접근할 수 없고 지정된 기준을 충족할 경우, 회로 차단기는 서비스를 사용할 수 없는 것으로 표시하고 지정된 기간 동안 클라이언트에 직접 오류 응답을 반환합니다.",
  "CONSECUTIVE_FIVEXX_ERRORS": "연속 5XX 오류",
  "CONSECUTIVE_FIVEXX_ERRORS_DESC": "연결 풀에서 백엔드를 꺼내기 전의 5XX 오류 수입니다.",
  "INSPECTION_INTERVAL_S": "검사 간격(s)",
  "INSPECTION_INTERVAL_S_DESC": "두 백엔드 검사 사이의 간격.",
  "MAXIUM_EJECTION_RATIO": "최대 배출 비율(%)",
  "MAXIUM_EJECTION_RATIO_DESC": "배출할 수 있는 백엔드의 최대 백분율입니다.",
  "BASE_EJECTION_TIME_S": "베이스 배출 시간(s)",
  "BASE_EJECTION_TIME_S_DESC": "최대 분사 지속 시간.",
  "UPDATED_AT_VALUE_SCAP": "{value}에서 업데이트",
  "METHOD": "메소드",
  "TRAFFIC_MANAGEMENT_UNAVAILABLE": "트래픽 관리를 사용할 수 없음",
  "APPLICATION_GOVERNANCE_NOT_ENABLED": "응용 프로그램 거버넌스를 사용하도록 설정하십시오.",
  "CREATE_GRAYSCALE_RELEASE_JOB": "Grayscale 릴리스 작업 생성",
  "CREATE_GRAYSCALE_RELEASE_TASK": "Grayscale 릴리스 작업 생성",
  "GRAYSCALE_RELEASE_DESC": "Grayscale 릴리스는 프로덕션 환경에서 애플리케이션을 반복하는 중요한 방법을 나타냅니다. 애플리케이션을 새 버전으로 업그레이드할 때 원활한 전환을 위해 다양한 릴리스 방법을 선택할 수 있습니다.",
  "NO_GRAYSCALE_RELEASE_JOB_FOUND": "Grayscale 릴리스 작업을 찾을 수 없음",
  "NO_GRAYSCALE_RELEASE_TASK_FOUND": "Grayscale 릴리스 작업을 찾을 수 없음",
  "NO_GRAYSCALE_RELEASE_TASK_FOUND_DESC": "Grayscale 릴리스 작업을 생성하십시오.",
  "TOTAL_GRAY_RELEASE_JOB": "총 {num} Grayscale 릴리스 작업",
  "TOTAL_GRAY_RELEASE_JOBS": "총 {num}개의 Grayscale 릴리스 작업",
  "TYPE_SERVICE_DEPLOYMENT": "유형: 상태 비저장 서비스(배포)",
  "TYPE_SERVICE_STATEFULSET": "유형: 상태 저장 서비스(상태 저장 세트)",
  "TRACING": "추적",
  "TRACING_NO_DATA_DESC": "검색 조건을 변경하고 다시 시도하십시오.",
  "NUM_SPAN_SI": "{num} 기간",
  "NUM_SPAN_PL": "{num} 기간",
  "NUM_ERROR_SI": "{num} 오류",
  "NUM_ERROR_PL": "{num} 오류",
  "LAST_NUM_RECORDS": "마지막 {Num}개 레코드",
  "PROCESS": "Process",
  "SERVICES_AND_OPERATIONS": "서비스 및 운영",
  "TRACING_UNAVAILABLE": "추적 불가",
  "CALLED_SERVICES": "호출된 서비스",
  "CALLED_DEPTH": "호출 Depth"
}
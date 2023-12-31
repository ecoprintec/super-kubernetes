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
  "GRAYSCALE_RELEASE": "Grayscale 릴리즈",
  "BLUE_GREEN_DEPLOYMENT": "Blue-Green 배포",
  "CANARY_RELEASE": "Canary 릴리즈",
  "TRAFFIC_MIRRORING": "트래픽 미러링",
  "BLUE_GREEN_DEPLOYMENT_DESC": "테스트를 위해 서비스 트래픽을 새 버전으로 보냅니다. 새 버전이 제대로 작동하지 않으면 서비스 트래픽을 즉시 이전 버전으로 전환할 수 있습니다.",
  "CANARY_RELEASE_DESC": "새로운 버전과 이전 버전 간에 서비스 트래픽을 할당하여 새로운 버전을 테스트하고 서비스 연속성을 보장합니다.",
  "TRAFFIC_MIRRORING_DESC": "실제로 새 버전을 노출하지 않고 서비스 트래픽 복사본을 새 버전으로 전송하여 테스트합니다.",
  "CREATE_BLUE_GREEN_DEPLOYMENT_JOB": "Blue-Green 배포 작업 생성",
  "CREATE_BLUE_GREEN_DEPLOYMENT_TASK": "Blue-Green 배포 작업 생성",
  "DESELECT": "선택 해제",
  "SELECT": "선택",
  "SELECT_GRAY_COMPONENT_TIP": "서비스를 선택하십시오.",
  "REPLICA": "복제",
  "REPLICA_PL": "복제",
  "GRAYSCALE_REPLICAS_DESC": "새 버전의 파드 복제본",
  "SELECT_VERSION": "버전 선택",
  "BLUE_GREEN_STRATEGY_DESC": "모든 서비스 트래픽을 인계받을 버전을 선택하십시오.",
  "TAKE_OFFLINE": "오프라인 전환",
  "TAKE_OVER": "테이크오버",
  "GRAYSCALE_VERSION": "버전: {version}",
  "CREATE_CANARY_RELEASE_JOB": "Canary 릴리스 작업 생성",
  "CREATE_CANARY_RELEASE_TASK": "Canary 릴리스 작업 생성",
  "UNFINISHED_GRAY_JOB": "Grayscale 해제 진행 중",
  "UNFINISHED_GRAY_TASK": "Grayscale 해제 진행 중",
  "NO_WORKLOAD_FOUND_TIP": "작업량을 찾을 수 없음",
  "NO_SERVICE_MESH_TIP": "애플리케이션 거버넌스가 앱에 대해 비활성화되어 있으며 Grayscale 릴리스를 사용할 수 없습니다.",
  "GRAY_APP_NAME": "앱: {name}",
  "UNSUPPORTED_WORKLOAD_TYPE": "워크로드 유형이 지원되지 않음",
  "NEW_VERSION_NUMBER_EXIST_DESC": "{name} 워크로드가 이미 있습니다. 다른 버전 번호를 입력하십시오.",
  "INIT_CONTAINER": "Init 컨테이너",
  "INIT_CONTAINER_VALUE": "Init 컨테이너: {value}",
  "CONTAINER_VALUE": "컨테이너: {value}",
  "GRAYSCALE_IMAGE": "이미지: {image}",
  "NEW_VERSION_NUMBER": "새 버전 번호",
  "NEW_VERSION_NUMBER_EMPTY_DESC": "새 버전 번호를 입력하십시오.",
  "NEW_VERSION_SETTINGS": "새 버전 설정",
  "NEW_VERSION_NUMBER_DESC": "새 버전 번호에는 소문자와 숫자만 포함될 수 있습니다. 최대 길이는 16자입니다.",
  "NEW_VERSION_NUMBER_INVALID_DESC": "새 버전 번호가 잘못되었습니다. 새 버전 번호에는 소문자와 숫자만 포함될 수 있습니다. 최대 길이는 16자입니다.",
  "KEY_EQ_VALUE": "키=값",
  "HEADER": "헤더",
  "CLIENT_OS": "클라이언트 OS",
  "COOKIE": "쿠키",
  "SPECIFY_REQUEST_PARAMETERS_DESC": "다음 조건을 충족하는 요청은 새 버전으로 전송됩니다.",
  "POLICY_REQUEST_CONTENT_TIP": "요청 매개 변수 지정 기능은 HTTP, HTTPS 및 gRPG 요청만 지원합니다.",
  "SPECIFY_REQUEST_PARAMETERS": "요청 매개 변수 지정",
  "REQUEST_PARAMETERS": "요청 매개 변수",
  "EXACT_MATCH": "정확한 일치",
  "PREFIX_MATCH": "접두사 일치",
  "REGEX_MATCH": "정규 매치",
  "CANARY_BY_TRAFFIC_DESC": "서비스 <b>{component}</b>에 바인딩된 트래픽의 {ratio}%가 새 버전 <b>{newVersion}</b>로 전송됩니다.",
  "SPECIFY_TRAFFIC_DISTRIBUTION": "트래픽 분배 지정",
  "TRAFFIC": "트래픽",
  "TRAFFIC_DISTRIBUTION": "트래픽 분포",
  "CREATE_TRAFFIC_MIRRORING_JOB": "트래픽 미러링 작업 생성",
  "CREATE_TRAFFIC_MIRRORING_TASK": "트래픽 미러링 작업 생성",
  "PREREQUEST_FOR_USE_GRAYRELEASE_Q": "Grayscale 릴리스를 구현하기 위한 전제 조건은 무엇입니까?",
  "PREREQUEST_FOR_USE_GRAYRELEASE_A": "Grayscale 릴리스를 구현하기 전에 구성된 앱을 만들고 앱에 대한 애플리케이션 거버넌스를 활성화해야 합니다.",
  "RELEASE_JOBS": "릴리스 잡스",
  "RELEASE_TASKS": "릴리스 잡스",
  "TCP_INBOUND_TRAFFIC": "TCP 인바운드 트래픽",
  "TCP_OUTBOUND_TRAFFIC": "TCP 아웃바운드 트래픽",
  "NO_DATA_SCAP": "데이터 없음",
  "REPLICA_COUNT_LOW": "복제본",
  "MIRROR_POLICY_DESC": "서비스 트래픽 사본이 테스트를 위해 새 버전으로 전송됩니다. 이전 버전만 노출되고 새 버전은 노출되지 않습니다.",
  "BLUE_GREEN_DEPLOYMENT_LOW": "blue-green 배포",
  "BLUE_GREEN_TRAFFIC_DISTRI_DESC": "새 버전 또는 이전 버전이 모든 트래픽을 수신합니다.",
  "TRAFFIC_LOW": "트래픽",
  "VERSION_TRAFFIC_PERCENT": "{version} 트래픽 {percent}%",
  "OFFLINE": "오프라인",
  "OFFLINE_TIP": "이 버전으로 전송되는 서비스 트래픽이 없습니다. 버전을 온라인으로 전환하여 모든 트래픽을 처리할 수 있습니다.",
  "JOB_OFFLINE_SUCCESSFULLY": "작업이 오프라인으로 전환되었습니다.",
  "TASK_OFFLINE_SUCCESSFULLY": "작업이 오프라인으로 전환되었습니다.",
  "JOB_STATUS": "작업 상태",
  "CANARY_RELEASE_LOW": "잠금 해제",
  "ADJUST_TRAFFIC_DISTRIBUTION_DESC": "트래픽의 {ratioNew}%를 새 버전 <b>{newVersion}</b> 및 {ratioOld}%를 이전 버전 <b>{oldVersion}</b>로 보내시겠습니까?",
  "ALLOCATE_TRAFFIC_DESC": "슬라이더를 이동하여 새 버전으로 전송된 트래픽과 이전 버전으로 전송된 트래픽의 비율을 설정합니다.",
  "COOKIE_EXACT_MATCH": "쿠키(정확히 일치)",
  "COOKIE_REGEX_MATCH": "쿠키(정규 일치)",
  "HEADER_EXACT_MATCH": "헤더(정확히 일치)",
  "HEADER_REGEX_MATCH": "헤더(정규 일치)",
  "URL_PREFIX_MATCH": "URL(접두사 일치)",
  "URL_EXACT_MATCH": "URL(정규 일치)",
  "OS": "OS",
  "SERVICE_VERSION_RECEIVE_ALL_TRAFFIC": "버전 {version}<b>이(가) 모든 트래픽을 접수했습니다.",
  "RESTORE": "복원",
  "SUCCESSFUL_REQUEST_RATE": "성공적인 요청 비율",
  "TRAFFIC_IN_LAST_FIVE_MINUTES": "교통이 5분 남았습니다.",
  "DELETE_GRAYSCALE_RELEASE_JOB_DESC": "그레이스케일 릴리스 작업을 삭제하기 전에 모든 트래픽을 인계할 버전을 선택하십시오.",
  "DELETE_GRAYSCALE_RELEASE_TASK_DESC": "그레이스케일 릴리스 작업을 삭제하기 전에 모든 트래픽을 인계할 버전을 선택하십시오.",
  "GRAY_COMPONENT_DESC": "테스트 중인 새 버전 및 이전 버전에 대한 정보.",
  "TRAFFIC_MIRRORING_LOW": "트래픽 미러링",
  "MIRRORED_TRAFFIC": "미러 트래픽",
  "MIRRORED_TRAFFIC_TIP": "트래픽 미러링은 실제로 새 버전을 표시하지 않습니다.",
  "RELEASE_MODE_PL": "해제 모드",
  "RELEASE_MODE": "해제 모드",
  "NEW_VERSION_TAKEOVER_DESC": "새 버전 {newVersion} </b>이(가) 모든 트래픽을 수신하고 있습니다. 현재 그레이스케일 릴리스 작업을 삭제하면 이전 버전 <b>{oldVersion}</b>도 삭제됩니다.",
  "OLD_VERSION_TAKEOVER_DESC": "이전 버전 {oldVersion}이(가) 모든 트래픽을 수신하고 있습니다. 현재 그레이스케일 릴리스 작업을 삭제하면 새 버전 <b>{newVersion}</b>도 삭제됩니다.",
  "GRAYSCALE_REPLICA_SI": "복제본: {count}",
  "GRAYSCALE_REPLICA_PL": "복제본: {count}",
  "TRAFFIC_MIRRORING_TRAFFIC_DISTRI_DESC": "트래픽 복사본이 테스트를 위해 새 버전으로 전송됩니다.",
  "EDIT_GRAYSCALE_RELEASE_JOB": "Grayscale 릴리스 작업 편집",
  "EDIT_GRAYSCALE_RELEASE_TASK": "Grayscale 릴리스 작업 편집",
  "ADJUST_TRAFFIC_DISTRIBUTION": "트래픽 분배 조정"
}
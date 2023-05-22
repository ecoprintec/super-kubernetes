/*
 * This file is part of KuberixEnterprise Console.
 * Copyright (C) 2019 The KuberixEnterprise Console Authors.
 *
 * KuberixEnterprise Console is free software: you can redistribute it and/or modify
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
  "ALERTING_POLICY_PL": "알림 정책",
  "ALERT_POLICY_DESC": "알림 정책은 클러스터 리소스를 모니터링하는 데 사용되는 일련의 조건입니다. 리소스를 모니터링하는 알림 정책을 만들 수 있습니다.",
  "ALERTING_POLICY_DESC": "알림 정책은 클러스터 리소스를 모니터링하는 데 사용되는 일련의 조건입니다. 알림 정책을 만들어 리소스를 모니터링할 수 있습니다.",
  "REQUESTS_FOR_TRIGGER_AN_ALARM_Q": "알림 메시지는 어떻게 생성됩니까?",
  "REQUESTS_FOR_TRIGGER_AN_ALARM_A": "리소스에 대한 알림 정책을 설정해야 합니다. 알림정책에 설정된 메트릭이 임계값에 도달하면 알림 메시지가 생성됩니다.",
  "ALERTING_STATUS": "알림 상태",
  "CUSTOM_POLICIES": "사용자 지정 정책",
  "BUILT_IN_POLICIES": "기본 제공 정책",
  "ALERTING_POLICY_EMPTY_DESC": "알림 정책을 생성하십시오.",
  "ALERT_RULE_INACTIVE": "비활성",
  "ALERT_RULE_PENDING": "보류 중",
  "ALERT_RULE_FIRING": "발송",
  "ALERT_RULE_HEALTH_OK": "정상",
  "ALERT_RULE_HEALTH_ERR": "오류",
  "ALERT_RULE_HEALTH_UNKNOWN": "알 수 없음",
  "SEVERITY": "심각성",
  "CREATE_ALERTING_POLICY": "알림 정책 만들기",
  "CRITICAL_ALERT": "중요",
  "ERROR_ALERT": "오류",
  "WARNING_ALERT": "경고",
  "INVALID_TIME_DESC": "잘못된 값. 드롭다운 목록에서 값을 선택하거나 0 또는 양의 정수를 입력하십시오.",
  "ALIAS": "별명",
  "THRESHOLD_DURATION_MIN": "임계 시간(분)",
  "DURATION_MIN": "지속 (분)",
  "ALERT_DURATION": "알림 규칙에 구성된 조건의 기간이 임계값에 도달하면 알림 정책의 상태가 실행 중이 됩니다.",
  "LONG_NAME_DESC": "이름은 소문자, 숫자 및 하이픈(-)만 포함할 수 있으며 소문자 또는 숫자로 시작하고 끝나야 합니다. 최대 길이는 253자입니다.",
  "NAME_EXIST_DESC": "이름이 이미 존재합니다. 다른 이름을 입력하십시오.",
  "RULE_SETTINGS": "규칙 설정",
  "MONITORING_TARGETS": "모니터링 대상",
  "ACTIVATION_CONDITION": "활성화 조건",
  "CPU_USAGE_SCAP": "CPU 사용량",
  "CPU_PERCENTAGE_SCAP": "CPU 백분율",
  "DISK_READ_IOPS": "로컬 디스크 읽기 IOPS",
  "DISK_READ_THROUGHPUT": "로컬 디스크 읽기 처리량",
  "DISK_SPACE_AVAILABLE": "사용 가능한 로컬 디스크 공간",
  "DISK_WRITE_IOPS": "로컬 디스크 쓰기 IOPS",
  "DISK_WRITE_THROUGHPUT": "로컬 디스크 쓰기 처리량",
  "DISK_SPACE_USAGE": "로컬 디스크 공간 사용량",
  "MEMORY_AVAILABLE": "사용 가능한 메모리",
  "MEMORY_USAGE_CACHE": "메모리 사용량(캐시 포함)",
  "MEMORY_USAGE_SCAP": "메모리 사용량",
  "MEMORY_PERCENTAGE_CACHE": "메모리 백분율 (캐시 포함)",
  "MEMORY_PERCENTAGE_SCAP": "메모리 백분율",
  "DATA_RECEIVE_RATE": "네트워크 데이터 수신율",
  "DATA_SEND_RATE": "네트워크 데이터 전송 속도",
  "SET_ACTIVATION_CONDITION_DESC": "활성화 조건을 설정하세요.",
  "ABNORMAL_PODS": "비정상적인 파드",
  "POD_USAGE_SCAP": "파드 사용",
  "THRESHOLD": "한계점",
  "UNAVAILABLE_REPLICAS": "사용할 수 없는 복제본",
  "RULE_TEMPLATE": "규칙 템플릿",
  "CPU_LOAD_1": "지난 1분 동안의 평균 CPU 로드",
  "CPU_LOAD_5": "지난 5분 동안의 평균 CPU 로드",
  "CPU_LOAD_15": "지난 15분 동안의 평균 CPU 로드",
  "SELECT_NODE_TIP": "클러스터 노드를 하나 이상 선택하십시오.",
  "CUSTOM_RULE": "커스텀 규칙",
  "RULE_EXPRESSION": "규칙 표현",
  "ENTER_RULE_EXPRESSION": "규칙 표현식을 입력하세요.",
  "ALERT_RULE_EXPRESSION_DESC": "PromQL 문을 사용하여 사용자 지정 규칙을 정의할 수 있습니다. <a href=\"https://prometheus.io/docs/prometheus/latest/querying/basics/\" target=\"_blank\" rel=\"noreferrer noopener\">자세히 알아보기</a>",
  "ALERT_FUNCTIONS": "기능",
  "ALERT_METRICS": "메트릭",
  "ALERT_LABELS": "라벨",
  "ALERT_RATE_RANGES": "환율 범위",
  "ALERTING_MESSAGE": "알림 메시지",
  "MESSAGE_SETTINGS": "메시지 설정",
  "NOTIFICATION_SUMMARY": "요약",
  "NOTIFICATION_DETAILS": "세부",
  "EDIT_ALERTING_POLICY": "알림 정책 수정",
  "ALERTING_POLICY": "알림 정책",
  "ALERTING_POLICY_LOW": "알림 정책"
}
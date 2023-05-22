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
  "HPA_SET_TIP": "수평 pod 자동 스케일링이 설정되었습니다.",
  "WORKLOAD_EMPTY_DESC": "워크로드를 생성하십시오.",
  "INVALID_IMAGE": "잘못된 이미지입니다.",
  "INVALID_NAME_DESC": "잘못된 이름입니다. 이름은 소문자, 숫자 및 하이픈(-)만 포함할 수 있으며 소문자 또는 숫자로 시작하고 끝나야 합니다. 최대 길이는 63자입니다.",
  "DUPLICATE_CONTAINER_NAME_DESC": "이름이 이미 있습니다. 컨테이너 이름은 고유해야 하며 여러 컨테이너의 이름은 같을 수 없습니다.",
  "NO_IMAGE_FOUND": "이미지 없음",
  "CONTAINER_EMPTY_DESC": "컨테이너를 하나 이상 추가하십시오.",
  "QUOTA_UNSET_TIP": "리소스 점유율이 설정되지 않았습니다",
  "QUOTA_OVERCOST_TIP": "현재 리소스 점유율이 나머지 부분을 초과했습니다",
  "RESOURC_QUOTAS_UNSET": "리소스 할당량 언셋",
  "INSUFFICENT_RESOURCES": "리소스 부족",
  "REMAINING_QUOTAS": "남은 할당량",
  "ENVIRONMENT_INVALID_TIP": "환경 변수의 키는 문자, 숫자, 밑줄(_), 하이픈(-) 및 마침표(.)만 포함할 수 있으며 숫자로 시작할 수 없습니다.",
  "ENVIRONMENT_CANNOT_BE_EMPTY": "환경변수에 대한 키를 설정하십시오.",
  "WORKLOAD_PORT_NAME_DESC": "포트 이름은 소문자, 숫자 및 하이픈(-)만 포함할 수 있으며 소문자 또는 숫자로 시작하고 끝나야 합니다. 최대 길이는 15자입니다.",
  "MAX_EXTRA_PODS_DESC": "업데이트 프로세스 중에 허용되는 최대 추가 파드 수 또는 백분율.",
  "MAX_EXTRA_PODS": "최대 추가 파드",
  "AVAILABLE": "사용 가능",
  "IN_USER": "사용 중",
  "ACCESS_MODE_SCAP": "액세스 모드",
  "PVC_OR_TEMPLATE_EMPTY": "볼륨에 대한 로그 수집을 활성화했습니다. 하나 이상의 영구 볼륨, 임시 볼륨 또는 영구 볼륨 청구 템플릿을 추가하고 컨테이너 로그의 경로를 지정하십시오.",
  "PVC_EMPTY": "볼륨에 대한 로그 수집을 활성화했습니다. 하나 이상의 영구 볼륨 또는 임시 볼륨을 추가하고 컨테이너 로그의 경로를 지정하십시오.",
  "PROJECT_COLLECT_SAVED_DISABLED_DESC": "이 기능을 활성화하려면 프로젝트 설정에서 볼륨에 대한 로그 수집을 활성화해야 합니다.",
  "COLLECT_LOGS_ON_VOLUMES_DESC": "시스템이 볼륨에 저장된 컨테이너 로그를 수집하도록 허용합니다. 이 기능을 사용하려면 읽기 및 쓰기 모드의 볼륨을 컨테이너에 탑재하고 로그를 볼륨으로 내보내도록 컨테이너를 설정해야 합니다.",
  "CONTAINER_LOG_PATH": "컨테이너 로그 경로",
  "CONTAINER_LOG_PATH_TIP": "볼륨 마운트 경로에 대한 컨테이너 로그 경로. 글로빙 패턴이 지원됩니다. 쉼표(,)를 사용하여 여러 경로를 구분할 수 있습니다.<br /><br /><b>예</b><br />볼륨 마운트 경로가 /data인 경우 log/*.log는 컨테이너를 나타냅니다. 로그 파일은 모두 /data/log 디렉토리에 있는 .log 파일입니다.",
  "RECREATE_CONFIRM_DESC": "{type} {resource}를 다시 생성하시겠습니까? 업데이트 전략에 따라 파드 복제본이 업데이트되고 서비스가 중단됩니다.",
  "NO_WORKLOAD_RELATED_RESOURCE_DESC": "워크로드와 관련된 리소스를 찾을 수 없습니다.",
  "SELECT_ALL": "모두 선택",
  "DELETE_WORKLOAD_DESC_SI": "{resource} 워크로드를 삭제하려고 합니다.<br/>워크로드와 관련된 리소스도 삭제하시겠습니까?",
  "DELETE_WORKLOAD_DESC_PL": "{resource} 워크로드를 삭제하려고 합니다.<br/>워크로드와 관련된 리소스도 삭제하시겠습니까?",
  "DELETE_WORKLOAD": "워크로드 삭제",
  "DELETE_MULTIPLE_WORKLOADS": "다중 워크로드 삭제",
  "DELETE_APP_RESOURCE_TIP": "리소스는 <strong>{app}</strong>에 의해 관리되며, 리소스가 삭제될 경우 이 앱의 정상적인 사용에 영향을 줄 수 있습니다. 작업 관련 위험을 이해하려면 {type} 이름 <strong>{resource}</strong>을 입력하십시오.",
  "STOP_APP_RESOURCE_TIP": "리소스는 <strong>{app}</strong>에 의해 관리되며, 리소스가 중지될 경우 이 앱의 정상적인 사용에 영향을 줄 수 있습니다. 작업 관련 위험을 이해하려면 {type} 이름 <strong>{resource}</strong>을 입력하십시오."
}
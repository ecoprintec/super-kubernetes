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
  "SERVICE_TYPES_Q": "KuberixEnterprise는 어떤 서비스 유형을 지원합니까?",
  "SERVICE_TYPES_A": "Kuberix Enterprise는 Stateless 서비스와 Stateful 서비스를 지원합니다. Stateless 서비스의 파드 복제본은 동일한 볼륨을 공유하지만 Stateful 서비스의 각 파드 복제본에는 개별적인 볼륨이 있습니다.",
  "SCENARIOS_FOR_SERVICES_Q": "Stateless 서비스와 Stateful 서비스의 사용 사례는 무엇입니까?",
  "SCENARIOS_FOR_SERVICES_A": "Stateless 서비스는 Nginx 및 Tomcat과 같이 데이터 지속성이 필요하지 않은 방식에 적용되며 Stateful 서비스는 MySQL 데이터베이스, Kafka 및 Zookeeper와 같이 데이터 지속성이 필요한 방식에 적용됩니다.",
  "SERVICE_TYPE": "서비스 종류",
  "SERVICE_LIST": "서비스 목록",
  "SERVICE_TYPE_STATEFULSERVICE": "스테이트풀 서비스",
  "SERVICE_TYPE_STATELESSSERVICE": "스테이트리스 서비스",
  "SERVICE_TYPE_EXTERNALSERVICE": "외부 서비스",
  "HEADLESS": "Headless",
  "EXTERNALNAME": "외부 이름",
  "CREATE_SERVICE_DESC": "서비스 생성 방법을 선택하세요.",
  "SELECT_SERVICE_TYPE_DESC": "상태 비저장 또는 상태 저장 서비스를 만들거나 서비스를 외부 서비스에 매핑합니다.",
  "SERVICE_FROM_CODE": "소스 코드에서 서비스 생성",
  "SERVICE_FROM_ARTIFACT": "아티팩트에서 서비스 만들기",
  "SERVICE_FROM_CODE_DESC": "기존 소스 코드에서 이미지를 빌드하고 이미지를 배포합니다.",
  "SERVICE_FROM_ARTIFACT_DESC": "기존 아티팩트에서 이미지를 빌드하고 이미지를 배포합니다.",
  "CUSTOMIZE_SERVICE": "맞춤형 서비스",
  "CUSTOMIZE_SERVICE_DESC": "워크로드를 지정하거나 YAML 구성 파일을 편집하여 서비스를 생성합니다.",
  "PORT_INPUT_DESC": "포트 이름이 이미 존재합니다. 다른 이름을 입력하세요.",
  "PORT_NAME_DESC": "포트 이름은 소문자, 숫자 및 하이픈(-)만 포함할 수 있으며 소문자 또는 숫자로 시작하고 끝나야 합니다. 최대 길이는 63자입니다.",
  "CREATE_EXTERNAL_SERVICE_DESC": "서비스를 생성하고 외부 서비스에 매핑합니다.",
  "CREATE_EXTERNAL_SERVICE": "외부 서비스 만들기",
  "EXTERNAL_SERVICE_ADDRESS_EMPTY_DESC": "외부 서비스의 도메인 이름을 입력하세요.",
  "EXTERNAL_SERVICE_ADDRESS": "외부 서비스 주소",
  "EXTERNAL_SERVICE_ADDRESS_DESC": "외부 서비스의 도메인 이름을 입력하세요.",
  "JAVA": "Java",
  "NODEJS": "Node.js",
  "PYTHON": "Python",
  "LANGUAGE_TYPE_VALUE": "언어 유형: {value}",
  "CONTAINER_SETTINGS": "컨테이너 설정",
  "ARTIFACT_TYPE_VALUE": "아티팩트 유형: {value}",
  "BINARY": "바이너리",
  "SPECIFY_WORKLOAD_TO_CREATE_SERVICE": "서비스 생성을 위한 작업량 지정",
  "EDIT_YAML_TO_CREATE_SERVICE": "서비스 생성을 위해 YAML 편집",
  "SPECIFY_WORKLOAD_DESC": "하나 이상의 기존 작업 부하를 사용하여 서비스를 만듭니다.",
  "NO_RELATED_RESOURCE_FOUND": "관련 리소스를 찾을 수 없음",
  "NO_SERVICE_RELATED_RESOURCE_DESC": "서비스와 관련된 리소스를 찾을 수 없습니다.",
  "DELETE_SERVICE_DESC": "{resource} 서비스를 삭제하려고 합니다. 연결된 리소스를 삭제할지 여부를 확인하십시오.",
  "DELETE_SERVICE_DESC_PL": "서비스 {resource}을(를) 삭제하려고 합니다.<br/>서비스와 관련된 다음 리소스도 삭제하시겠습니까?",
  "DELETE_SERVICE_DESC_SI": "{resource} 서비스를 삭제하려고 합니다.<br/>서비스와 관련된 다음 리소스도 삭제하시겠습니까?",
  "DELETE_SERVICE": "서비스 삭제",
  "DELETE_MULTIPLE_SERVICES": "여러 서비스 삭제",
  "SERVICE_TOPOLOGY": "서비스 토폴로지",
  "AUTO_REFRESH": "자동 새로 고침",
  "POD_COUNT_VALUE": "파드: {value}"
}
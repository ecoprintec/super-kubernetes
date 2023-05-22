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
  "NETWORK_ISOLATION_DESC": "네트워크 격리를 구성함으로써 사용자는 동일한 클러스터 내의 Pod 간 트래픽과 외부로부터의 트래픽을 제어하여 애플리케이션 격리를 구현하고 애플리케이션 보안을 강화할 수 있습니다.",
  "NETWORK_ISOLATION_Q": "어떻게 하면 네트워크 분리를 더 잘 사용할 수 있을까요?",
  "NETWORK_ISOLATION_Q1": "네트워크 격리를 구현하기 위한 CNI 플러그인의 요구 사항은 무엇입니까?",
  "NETWORK_ISOLATION": "네트워크 격리",
  "ENABLE": "활성화",
  "PROJECT_NETWORK_ISOLATION": "프로젝트 네트워크 격리",
  "NETWORK_POLICY_EMP_TITLE": "네트워크 분리가 활성화되지 않음",
  "NETWORK_POLICY_EMP_DESC": "프로젝트 네트워크 액세스가 활성화된 후에는 다른 프로젝트에서 프로젝트에 액세스할 수 없습니다. 그러나 프로젝트, 서비스 및 외부 IP 주소가 사용자의 필요에 따라 이 프로젝트에 액세스하도록 허용할 수 있습니다.",
  "INTERNAL_ALLOWLIST": "내부 허용 목록",
  "INTERNAL_ALLOWLIST_TIP": "클러스터의 프로젝트 및 서비스를 허용 목록에 추가합니다.",
  "INTERNAL_EGRESS_DESC": "현재 프로젝트의 Pod에서는 다음 서비스 및 프로젝트의 Pod에 액세스할 수 있습니다.",
  "INTERNAL_INGRESS_DESC": "현재 프로젝트의 Pod에는 다음 서비스 및 프로젝트의 Pod가 액세스할 수 있습니다.",
  "INTERNAL_ALLOWLIST_DESC": "현재 프로젝트의 Pod가 현재 클러스터의 다른 프로젝트의 Pod와 통신할 수 있도록 허용합니다.",
  "EMPTY_RESOURCE_DESC": "프로젝트 또는 서비스를 하나 이상 선택하십시오.",
  "EXTERNAL_ALLOWLIST": "외부 허용 목록",
  "EXTERNAL_ALLOWLIST_TIP": "클러스터 외부의 네트워크 세그먼트 및 포트를 허용 목록에 추가합니다.",
  "EXTERNAL_ALLOWLIST_DESC": "현재 프로젝트의 파드가 클러스터 외부의 특정 네트워크 세그먼트 및 포트와 통신할 수 있도록 허용합니다.",
  "NETWORK_SEGMENT_EXAMPLE": "예: 10.0.0",
  "PORT_EXAMPLE": "예: 80",
  "EXTERNAL_EGRESS_DESC": "현재 프로젝트의 파드에서는 다음 네트워크 세그먼트 및 포트에 액세스할 수 있습니다.",
  "EXTERNAL_INGRESS_DESC": "현재 프로젝트의 파드에는 다음과 같은 네트워크 세그먼트 및 포트가 액세스할 수 있습니다.",
  "SELECT_RULE_DIRECTION_TIP": "트래픽 방향을 선택하십시오.",
  "ENTER_VALID_SEGMENT_DESC": "올바른 네트워크 세그먼트를 입력하십시오.",
  "ENTER_VALID_PORT_NUMBER_DESC": "올바른 포트 번호를 입력하십시오.",
  "ADD_ALLOWLIST_ENTRY": "허용 목록 항목 추가",
  "EXTERNAL_TRAFFIC_DIRECTION_DESC": "Egress는 현재 프로젝트에서 클러스터 외부로 향하는 방향을 나타냅니다. Ingress은 클러스터 외부에서 현재 프로젝트로 향하는 방향을 나타냅니다.",
  "TRAFFIC_DIRECTION": "트래픽 방향",
  "NETWORK_SEGMENT_DESC": "네트워크 세그먼트를 설정합니다(CIDR이 지원됩니다).",
  "EGRESS": "Egress",
  "INGRESS": "Ingress",
  "INTERNAL_TRAFFIC_DIRECTION_DESC": "출구는 현재 프로젝트에서 다른 프로젝트로의 방향을 나타냅니다. 입력은 다른 프로젝트에서 현재 프로젝트로의 방향을 나타냅니다.",
  "ALLOWLIST_ENTRY": "허용 목록 입력",
  "ALLOWLIST_ENTRY_LOW": "목록 입력 허용"
}
/*
 * This file is part of Super Kubenetes Console.
 * Copyright (C) 2019 The Super Kubenetes Console Authors.
 *
 * Super Kubenetes Console is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Super Kubenetes Console is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Super Kubenetes Console.  If not, see <https://www.gnu.org/licenses/>.
 */
module.exports = {
  "NO_CLUSTER_TIP": "클러스터를 하나 이상 추가하세요.",
  "IMPORT_CLUSTER_DESC": "기존 Kubernetes 클러스터를 가져옵니다.",
  "CLUSTER_NAME_EMPTY": "클러스터 이름을 입력하세요.",
  "ADD_CLUSTER": "클러스터 추가",
  "CREATE_CLUSTER": "클러스터 생성",
  "TAG": "태그",
  "CLUSTER_TAG_DESC": "클러스터의 목적을 식별할 태그를 선택하십시오.",
  "CLUSTER_PROVIDER_DESC": "클러스터 인프라 공급자를 선택합니다.",
  "CLUSTER_SETTINGS_DESC": "클러스터의 구성 정보를 정의합니다.",
  "CONNECTION_SETTINGS": "연결 설정",
  "CONNECTION_METHOD": "연결 매서드",
  "CONNECTION_MODE": "연결 모드",
  "CLUSTER_CONNECT_METHOD_DESC": "클러스터에 직접 연결하거나 에이전트를 사용합니다.",
  "CLUSTER_CONNECT_MODE_DESC": "클러스터에 직접 연결하거나 에이전트를 사용하십시오.",
  "CONNTECT_DIRECT": "직접 연결",
  "CONNTECT_PROXY": "에이전트 연결",
  "INPUT_KUBECONFIG": "대상 클러스터의 kubeconfig를 입력해주세요.",
  "CLUSTER_DIRECT_IMPORT_TIP": "Super Kubenetes의 멀티 클러스터 컨트롤 플레인은 제공된 kubeconfig를 통해 멤버 클러스터에 연결합니다. 이 방법을 사용하려면 호스트 클러스터가 kubeconfig의 서버 주소를 통해 멤버 클러스터에 직접 연결할 수 있어야 합니다.</br></br>다음은 이 방법을 적용하기 위한 요구 사항입니다.</br>1. 호스트 클러스터와 멤버 클러스터는 동일한 내부 네트워크를 사용해야 합니다.</br>2. 호스트 클러스터와 멤버 클러스터의 네트워크가 VPN 또는 기타 기술(예: 터널링)을 통해 연결된 상태여야 합니다.</br>3. kubeconfig의 서버 주소는 공용 네트워크를 통해 연결할 수 있어야 합니다.",
  "CLUSTER_AGENT_IMPORT_TIP": "Super Kubenetes 컨트롤 플레인은 프록시를 통해 멤버 클러스터에 연결합니다. 제어 평면은 멤버 클러스터에서 생성한 클라이언트 구성 요소에 연결된 퍼블릭 프록시 서비스를 실행합니다. 컨트롤 플레인은 퍼블릭 프록시 서비스를 운영합니다. 퍼블릭 프록시 서비스는 멤버 클러스터에 의해 생성된 클라이언트 요소들을 연결 합니다. 그 결과 reserve 프록시가 만들어집니다. 이 방법을 통해 컨트롤 플레인과 멤버 클러스터는 같은 네트워크에 없어도 되며 멤버 클러스터의 apiserver 주소를 노출 할 필요도 없습니다. 하지만 네트워크 성능에 영향이 갈 수 있습니다.</br></br>다음은 이 방법을 적용하기 위한 요구 사항입니다.</br>1. 호스트 클러스터와 멤버 클러스터가 다른 네크워크 대역을 사용해야 합니다.<br/>2. 호스트 클러스터와 멤버 클러스터의 네트워크는 VPN이나 ​​다른 기술(예: 터널링)을 통해 연결된 상태가 아니어야 합니다.<br/>3. 클러스터 내의 네트워크 성능 저하가 나타날 수 있습니다.",
  "CLUSTER_AGENT_TITLE": "클러스터에 제공된 에이전트를 기반으로 멤버 클러스터를 추가하십시오.",
  "CLUSTER_AGENT_DESC": "클러스터에 해당 에이전트를 설정해야 합니다.",
  "HOW_TO_GET_KUBECONFIG": "kubeconfig는 어떻게 얻나요?",
  "HOST_CLUSTER_TCAP": "호스트 클러스터 ",
  "HOST_CLUSTER_DESC": "호스트 클러스터는 클러스터를 관리하기 위해서만 사용하고 워크로드는 멤버 클러스터에 배포 하는 것을 추천합니다.",
  "HOST_CLUSTER_PL_TCAP": "호스트 클러스터",
  "MEMBER_CLUSTER_TCAP_PL": "멤버 클러스터",
  "NODE_COUNT": "노드",
  "ENV_PRODUCTION": "프로덕션",
  "ENV_DEVELOPMENT": "개발",
  "ENV_TESTING": "테스팅",
  "ENV_DEMO": "데모",
  "UPDATE_KUBECONFIG": "kubeconfig 수정",
  "KUBE_CONFIG_IS_EXPIRED": "KubeConfig가 만료되었습니다.",
  "EXPIRE_DATE": "만료 시간",
  "LAST_KUBE_CONFIG_EXPIRED": "KubeConfig는 <span class=\"kubeConfig_expired\">{count}</span>일 후에 만료됩니다.",
  "VALIDATION_FAILED": "유효성 검사에 실패했습니다.",
  "NO_CLUSTER_TIP_DESC": "클러스터는 Kubernetes를 실행하는 노드(물리적 또는 가상 머신)의 그룹이며, Kuberix Enterprise의 기능도 클러스터의 노드에 따라 달라집니다.",
  "RISK_WARNING": "위험 경고",
  "REMOVE_CLUSTER_TIP_A": "클러스터가 제거된 후 클러스터의 리소스 및 구성 정보는 자동으로 지워지지 않습니다.",
  "REMOVE_CLUSTER_TIP_B": "클러스터가 다른 멀티 클러스터 시스템에 합류할 때 리소스 충돌을 방지하려면 <a href=\"https://kuberix.com/docs/\">공식 Super Kubenetes 문서<를 참조하여 클러스터의 구성 정보를 수동으로 지워야 합니다",
  "CLUSTER_CONFIRM_TEXT": "클러스터 제거의 위험을 이해합니다",
  "ENTER_CLUSTER_NAME": "이 작업은 취소할 수 없습니다. 클러스터 이름 <strong>{name}</strong>을(를) 입력하여 이 작업의 위험을 이해하고 있음을 확인합니다."
}
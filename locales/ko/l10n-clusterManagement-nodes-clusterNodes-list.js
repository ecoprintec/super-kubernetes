/*
 * This file is part of  Console.
 * Copyright (C) 2019 The  Console Authors.
 *
 *  Console is free software:                                       you can redistribute it and/or modify
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
  CLUSTER_NODE_PL: '클러스터 노드',
  CLUSTER_NODE: '클러스터 노드',
  CLUSTER_NODE_DESC: '클러스터 노드는  클러스터의 기본 서버입니다. 이 페이지에서 클러스터 노드를 관리할 수 있습니다.',
  NODE_TYPES_Q: '클러스터 노드의 유형은 무엇입니까?',
  NODE_TYPES_A: '노드는 컨트롤 플레인 노드와 워커 노드로 분류됩니다.',
  WHAT_IS_NODE_TAINTS_Q: '노드 taint란 무엇입니까?',
  WHAT_IS_NODE_TAINTS_A: 'Taints가 적용된 노드는 특정 노드들에서 격리됩니다. Taints와 tolerations는 파드가 부적절한 노드들에 스케줄되지 않는 것을 보장하기 위하여 함께 쓰입니다',
  LEARN_MORE: '더 알아보기',
  // Node Count
  NODE_SI: '노드',
  NODE_PL: '노드',
  MASTER_NODE_SI: '컨트롤 플레인 노드',
  MASTER_NODE_PL: '컨트롤 플레인 노드',
  WORKER_NODE_SI: '워커 노드',
  WORKER_NODE_PL: '워커 노드',
  // List
  KUBE_OPERATE: '종류',
  KUBE_ASCENDING_ORDER: '오름차순',
  KUBE_DESCENDING_ORDER: '내림차순',
  KUBE_FILTER: '필터',
  SEARCH: '검색',
  ADD_NODE: '노드 추가',
  NODE_STATUS_UNSCHEDULABLE: '일정 불가',
  NODE_STATUS_RUNNING: '실행중',
  NODE_STATUS_WARNING: '경고',
  NODE_STATUS_PENDING: '창조',
  NODE_STATUS_FAILED: '실패',
  CLUSTER_NODE_EMPTY_DESC: '클러스터에 노드를 추가하십시오.',
  NODE_NAME_EMPTY_DESC: '노드의 이름을 설정하십시오.',
  CPU_USAGE: 'CPU 사용량',
  MEMORY_USAGE: '메모리 사용량',
  CONTROL_PLANE: '컨트롤 플레인',
  WORKER: '워커 노드',
  ALLOCATED_CPU: '할당된 CPU',
  ALLOCATED_MEMORY: '할당된 메모리',
  CPU_LIMIT_SI: '리소스 제한: {core} 코어({percent})',
  CPU_LIMIT_PL: '리소스 제한: {core} 코어({percent})',
  CPU_REQUEST_SI: '{core} 코어({percent})',
  CPU_REQUEST_PL: '{core} 코어({percent})',
  CORE_PL: '코어',
  CPU_CORE_PERCENT_SI: '{core} 코어({percent})',
  CPU_CORE_PERCENT_PL: '{core} 코어({percent})',
  MEMORY_GIB_PERCENT: '{gib} GiB({percent})',
  MEMORY_LIMIT_VALUE: '리소스 제한: {gib} GiB({percent})',
  MEMORY_REQUEST_VALUE: '{gib} GiB({percent})',
  RESOURCE_REQUEST: '리소스 요청',
  CORDON: 'CORDON',
  UNCORDON: 'UNCORDON',
  OPEN_TERMINAL: '오픈 터미널',
  CUSTOM_COLUMNS: '컬럼 사용자 정의',
  NO_MATCHING_RESULT_FOUND: '일치하는 결과가 없습니다',
  STATUS: '상태',
  TOTAL_ITEMS: '합계: {num}',
  YOU_CAN_TRY_TO: '시도 할 수 있습니다',
  REFRESH_DATA: '데이터 새로고침',
  CLEAR_SEARCH_CONDITIONS: '명확한 검색 조건',
  // List > Edit Taints
  DUPLICATE_KEYS: '키가 이미 존재합니다. 다른 키를 입력하세요.',
  EMPTY_KEY: '키를 입력하세요.'
};
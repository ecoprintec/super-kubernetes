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
  "ATTRIBUTES": "속성",
  "ARCHITECTURE": "건축",
  "OS_VERSION": "OS 버전",
  "OS_TYPE": "OS 유형",
  "LINUX": "리눅스",
  "KERNEL_VERSION": "커널 버전",
  "CONTAINER_RUNTIME": "컨테이너 런타임",
  "KUBELET_VERSION": "큐블릿 버전",
  "KUBE_PROXY_VERSION": "큐브 프록시 버전",
  "IP_ADDRESS": "IP 주소",
  "SCHEDULABLE": "예약 가능",
  "YES": "네",
  "EDIT_LABELS": "라벨 수정",
  "LABEL_PL": "라벨",
  "TAINTS": "Taints",
  "EDIT_TAINTS": "Taints 수정",
  "TAINTS_DESC": "Pdos가 노드로 예약되지 않거나 가능하면 노드로 예약되지 않도록 노드에 컨텐츠를 추가합니다. 노드에 태그를 추가한 후 파드에 허용 오차를 설정하여 특정 태그가 있는 노드에 파드를 예약할 수 있습니다.",
  "ADD_TAINT": "Taints 추가",
  "COMMON_TAINTS": "공통 Taints",
  "NOSCHEDULE": "예약 금지",
  "PREFER_NOSCHEDULE": "가능한 경우 스케줄링 금지",
  "NOEXECUTE": "스케줄링 방지 및 기존 파드 퇴출",
  "TAINT_SELECT_TIPS": "공통 Taint에 참여",
  "TAINTS_TIPS": "<b>스케줄링 금지><br/>모든 파드가 노드에 예약되지 않도록 합니다.<br /><br /><br />가능한 경우 예약 금지 </b><br />가능한 경우 모든 파드가 노드에 예약되지 않도록 합니다.<br /> <br /> <b> 예약 방지 및 기존 파드 제거 </b> <br /> 모든 파드가 노드에 예약되지 않도록 하고 노드의 기존 파드를 모두 제거합니다.",
  "TAINT_DELETE_TIP": "taint 삭제",
  "RESOURCE_USAGE": "리소스 사용량",
  "MAXIMUM_PODS": "최대 파드 수",
  "MAXIMUM_PODS_SCAP": "최대 파드 수",
  "DISK_USAGE_SCAP": "디스크 사용량",
  "MEMORY_REQUEST_SCAP": "메모리 요청",
  "MEMORY_LIMIT_SCAP": "메모리 제한",
  "CPU_REQUEST_SCAP": "CPU 요청",
  "CPU_LIMIT_SCAP": "CPU 제한",
  "ALLOCATED_RESOURCES": "할당된 리소스",
  "RUNNING_STATUS": "실행 상태",
  "HEALTH_STATUS": "연결 상태",
  "NODE_NETWORKUNAVAILABLE": "네트워크 가용성",
  "NODE_NETWORKUNAVAILABLE_DESC": "노드의 네트워크 상태가 정상인지.",
  "NODE_MEMORYPRESSURE": "메모리 임계치",
  "NODE_MEMORYPRESSURE_DESC": "노드의 남은 메모리가 임계값 미만인지 여부.",
  "NODE_DISKPRESSURE": "디스크 임계치",
  "NODE_DISKPRESSURE_DESC": "노드의 디스크 공간이나 inode가 임계값보다 작은지 여부",
  "NODE_PIDPRESSURE": "PID 임계치",
  "NODE_PIDPRESSURE_DESC": "노드에 생성할 수 있는 프로세스의 수가 임계값 미만인지 여부.",
  "NODE_READY": "준비",
  "NODE_READY_DESC": "노드가 파드를 수락할 준비가 되었는지 여부",
  "LAST_HEARTBEAT_VALUE": "마지막 Heartbeat: {value}",
  "NO_TAINTS_TIPS": "taint를 찾을 수 없음.",
  "POLICY": "정책",
  "READY_VALUE": "준비: {readyCount}/{total}",
  "STATUS_VALUE": "상태: {value}",
  "CREATED_AGO": "생성된 {diff}",
  "USAGE": "사용법",
  "OUT": "아웃",
  "IN": "인"
}
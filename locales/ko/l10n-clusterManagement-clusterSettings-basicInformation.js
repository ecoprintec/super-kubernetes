/*
 * This file is part of Super Kubenetes Console.
 * Copyright (C) 2019 The Super Kubenetes Console Authors.
 *
 * Super Kubenetes Console is free software:                                                 you can redistribute it and/or modify
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
  // Banner
  // Cluster Information
  NODES: '노드',
  DISK: '디스크',
  CLUSTER_INFORMATION: '클러스터 정보',
  // Cluster Information > Edit Information
  CLUSTER_NAME: '클러스터 이름',
  EDIT_CLUSTER_INFO_DESC: '클러스터에 대한 기본 정보를 수정합니다.',
  // Unbind Cluster
  UNBIND: '바인딩 해제',
  UNBIND_CLUSTER: '클러스터 바인딩 해제',
  UNBIND_CLUSTER_DESC: '클러스터가 바인딩 해제되면 Super Kubenetes는 클러스터를 관리할 수 없습니다. 클러스터의 Kubernetes 리소스는 삭제되지 않습니다. 작업과 관련된 위험을 이해할 수 있도록 클러스터 이름 <strong>{name}</strong>을(를) 입력하십시오.',
  UNBIND_SUCCESS: '바인드 해제 성공',
  SURE_TO_UNBIND_CLUSTER: '이 수술의 위험을 이해합니다',
  UNBIND_CLUSTER_Q: '클러스터 바인딩 해제',
  // Remove Cluster
  REMOVE_CLUSTER: '클러스터 삭제',
  REMOVE_CLUSTER_DESC: '클러스터가 제거된 후에는 Super Kubenetes에서 클러스터를 관리할 수 없습니다. 클러스터의 리소스는 삭제되지 않습니다. 클러스터 이름 <strong>{name}</strong>을(를) 입력하여 이 작업의 위험을 이해하고 있음을 확인합니다.',
  REMOVE_SUCCESS: '성공적으로 제거되었습니다.'
};
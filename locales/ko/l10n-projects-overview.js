/*
 * This file is part of KuberixEnterprise Console.
 * Copyright (C) 2019 The KuberixEnterprise Console Authors.
 *
 * KuberixEnterprise Console is free software:                                     you can redistribute it and/or modify
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
  // Edit Quotas
  EDIT_QUOTAS: '할당량 수정',
  QUOTA: '할당량',
  PROJECT_QUOTAS_NOT_SET: '프로젝트 할당량이 설정되지 않음',
  PROJECT_QUOTAS_DESC: '프로젝트 할당량은 사용 가능한 CPU 및 메모리 리소스의 수와 프로젝트에서 허용되는 파드, 배포 및 서비스와 같은 애플리케이션 리소스의 최대 수를 지정합니다.',
  DEFAULT_CONTAINER_QUOTAS_NOT_SET: '기본 컨테이너 할당량이 설정되지 않음',
  DEFAULT_CONTAINER_QUOTAS_DESC: '기본 컨테이너 할당량은 프로젝트에서 생성된 컨테이너의 기본 CPU 요청, CPU 제한, 메모리 요청 및 메모리 제한을 지정합니다.',
  APPLICATION_RESOURCE_COUNT: '응용 자료',
  SELECT_RESOURCE_TIP: '리소스 선택 또는 리소스 이름 입력',
  NUMBER_OF_PODS: '파드 수',
  NUMBER_OF_DEPLOYMENTS: '배포 횟수',
  NUMBER_OF_STATEFULSETS: '상태 저장 집합의 수',
  NUMBER_OF_DAEMONSETS: '데몬셋 수',
  NUMBER_OF_JOBS: '작업 수',
  NUMBER_OF_CRONJOBS: '크론잡의 수',
  NUMBER_OF_VOLUMES: '퍼시스턴트 볼륨 클레임 수',
  NUMBER_OF_SERVICES: '서비스 수',
  NUMBER_OF_ROUTES: '라우트 수',
  NUMBER_OF_SECRETS: 'Secret의 수',
  NUMBER_OF_CONFIGMAPS: '구성 맵의 수',
  // Deployed Apps
  INSTALLED_APPS: '설치된 앱',
  // Resource Status
  RESOURCE_STATUS: '리소스 상태',
  // Resource Status > Application Resources
  RESOURCE_WARNING_TIPS: '비정상적 {tipName}: {warnNum}',
  // Resource Status > Physical Resources
  PHYSICAL_RESOURCE_PL: '물리적 자원',
  CPU_USAGE_TIME: 'CPU 사용량({time})',
  MEMORY_USAGE_TIME: '메모리 사용량({time})',
  // Tips
  TIPS: '팁',
  HOW_TO_INVITE_USERS: '현재 프로젝트에 사용자를 어떻게 초대합니까?',
  HOW_TO_SET_PROJECT_GATEWAY: '프로젝트 게이트웨이는 어떻게 설정하나요?',
  // Top 5 for Resource Usage
  TOP_5_FOR_RSC_USAGE: '자원 사용량 상위 5위',
  TOP_5_FOR_RESOURCE_USAGE: '자원 사용량 상위 5위',
  SORT_BY_WORKLOAD_CPU_USAGE: 'CPU 사용량순 정렬',
  SORT_BY_WORKLOAD_MEMORY_USAGE_WO_CACHE: '메모리 사용량순 정렬',
  SORT_BY_WORKLOAD_NET_BYTES_TRANSMITTED: '아웃바운드 트래픽으로 정렬',
  SORT_BY_WORKLOAD_NET_BYTES_RECEIVED: '인바운드 트래픽으로 정렬'
};
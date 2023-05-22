/*
 * This file is part of KuberixEnterprise Console.
 * Copyright (C) 2019 The KuberixEnterprise Console Authors.
 *
 * KuberixEnterprise Console is free software:                                                         you can redistribute it and/or modify
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
  // Banner
  PROJECT_ROLE_PL: '프로젝트 역할',
  PROJECT_ROLE_DESC: '프로젝트 역할은 프로젝트 구성원의 권한을 정의합니다.',
  // List
  ROLE_PROJECT_ADMIN: '프로젝트의 모든 리소스를 제어합니다.',
  ROLE_PROJECT_REGULAR: '프로젝트의 사용자 및 역할 이외의 리소스를 관리합니다.',
  ROLE_PROJECT_VIEWER: '프로젝트의 모든 리소스를 봅니다.',
  ROLE_PROJECT_OPERATOR: '프로젝트의 사용자 및 역할 이외의 리소스를 관리합니다.',
  PROJECT_ROLE_EMPTY_DESC: '프로젝트 역할을 생성하세요.',
  // List > Edit Information
  // List > Edit Permissions
  // List > Edit Permissions > Application Workloads
  PERMIGROUP_APPLICATION_WORKLOADS: '애플리케이션 워크로드',
  PERMISSION_APPLICATION_WORKLOADS_VIEW: '애플리케이션 워크로드 보기',
  PERMISSION_APPLICATION_WORKLOADS_VIEW_DESC: '프로젝트의 애플리케이션, 서비스, 워크로드, 작업, grayscale 릴리스 작업 및 이미지 빌더와 같은 리소스를 봅니다.',
  PERMISSION_APPLICATION_WORKLOADS_MANAGEMENT: '애플리케이션 워크로드 관리',
  PERMISSION_APPLICATION_WORKLOADS_MANAGEMENT_DESC: '프로젝트에서 애플리케이션, 서비스, 워크로드, 작업, grayscale 릴리스 작업 및 이미지 빌더와 같은 리소스를 생성, 편집 및 삭제합니다.',
  // List > Edit Permissions > Storage
  PERMIGROUP_STORAGE_MANAGEMENT: '스토리지',
  PERMISSION_VOLUME_SNAPSHOTS_VIEW: '볼륨 스냅샷 보기',
  PERMISSION_VOLUME_SNAPSHOTS_VIEW_DESC: '프로젝트에서 볼륨 스냅샷을 봅니다.' ,
  PERMISSION_VOLUME_SNAPSHOTS_MANAGEMENT: '볼륨 스냅샷 관리',
  PERMISSION_VOLUME_SNAPSHOTS_MANAGEMENT_DESC: '프로젝트에서 볼륨 스냅샷을 생성, 편집 및 삭제합니다.' ,
  PERMISSION_VOLUMES_VIEW: '퍼시스턴트 볼륨 클레임 보기',
  PERMISSION_VOLUMES_VIEW_DESC: '프로젝트에서 지속적인 볼륨 클레임을 봅니다.' ,
  PERMISSION_VOLUMES_MANAGEMENT: '퍼시스턴트 볼륨 클레임 관리',
  PERMISSION_VOLUMES_MANAGEMENT_DESC: '프로젝트에서 퍼시스턴트 볼륨 클레임을 생성, 편집 및 삭제합니다.' ,
  // List > Edit Permissions > Configuration
  PERMIGROUP_CONFIGURATION_CENTER: '구성',
  PERMISSION_CONFIGMAPS_VIEW: 'Configmap 구성',
  PERMISSION_CONFIGMAPS_VIEW_DESC: '프로젝트에서 Configmap을 봅니다.' ,
  PERMISSION_CONFIGMAPS_MANAGEMENT: 'Configmap 관리',
  PERMISSION_CONFIGMAPS_MANAGEMENT_DESC: '프로젝트에서 Configmap을 생성, 편집 및 삭제합니다.' ,
  PERMISSION_SECRETS_VIEW: 'Secret 보기',
  PERMISSION_SECRETS_VIEW_DESC: '프로젝트의 Secret 을 봅니다.' ,
  PERMISSION_SECRETS_MANAGEMENT: 'Secret  관리',
  PERMISSION_SECRETS_MANAGEMENT_DESC: '프로젝트에서 Secret 을 생성, 편집 및 삭제합니다.' ,
  PERMISSION_SERVICEACCOUNT_VIEW: '서비스 계정 보기',
  PERMISSION_SERVICEACCOUNT_VIEW_DESC: '프로젝트에서 서비스 계정을 봅니다.' ,
  PERMISSION_SERVICEACCOUNT_MANAGEMENT: '서비스 계정 관리',
  PERMISSION_SERVICEACCOUNT_MANAGEMENT_DESC: '프로젝트에서 서비스 계정을 생성, 편집 및 삭제합니다.' ,
  // List > Edit Permissions > Monitoring & Alerting
  PERMIGROUP_MONITORING_ALERTING: '모니터링 및 경고',
  PERMISSION_ALERTING_MESSAGES_VIEW: '경고 메시지 보기',
  PERMISSION_ALERTING_MESSAGES_VIEW_DESC: '프로젝트에서 경고 메시지를 봅니다.',
  PERMISSION_ALERTING_MESSAGES_MANAGEMENT: '알림 메시지 관리',
  PERMISSION_ALERTING_MESSAGES_MANAGEMENT_DESC: '프로젝트의 알림 메시지에 댓글을 달고 삭제합니다.',
  PERMISSION_ALERTING_POLICIES_VIEW: '경고 정책 보기',
  PERMISSION_ALERTING_POLICIES_VIEW_DESC: '프로젝트의 알림 정책을 봅니다.',
  PERMISSION_ALERTING_POLICIES_MANAGEMENT: '알림 정책 관리',
  PERMISSION_ALERTING_POLICIES_MANAGEMENT_DESC: '프로젝트에서 알림 정책을 생성, 편집 및 삭제합니다.',
  PERMISSION_CUSTOM_MONITORING_VIEW: '맞춤 모니터링 보기',
  PERMISSION_CUSTOM_MONITORING_VIEW_DESC: '프로젝트에서 사용자 지정 모니터링 대시보드를 봅니다.',
  PERMISSION_CUSTOM_MONITORING_MANAGEMENT: '맞춤형 모니터링 관리',
  PERMISSION_CUSTOM_MONITORING_MANAGEMENT_DESC: '프로젝트에서 사용자 지정 모니터링 대시보드를 생성, 편집 및 삭제합니다.',
  // List > Edit Permissions > Access Control
  PERMISSION_PROJECT_MEMBERS_VIEW: '멤버 보기',
  PERMISSION_PROJECT_MEMBERS_VIEW_DESC: '프로젝트 구성원을 봅니다.' ,
  PERMISSION_PROJECT_MEMBERS_MANAGEMENT: '회원 관리',
  PERMISSION_PROJECT_MEMBERS_MANAGEMENT_DESC: '프로젝트 구성원을 초대, 편집 및 제거합니다.' ,
  PERMISSION_PROJECT_ROLES_VIEW: '역할 보기',
  PERMISSION_PROJECT_ROLES_VIEW_DESC: '프로젝트 역할을 봅니다.' ,
  PERMISSION_PROJECT_ROLES_MANAGEMENT: '역할 관리',
  PERMISSION_PROJECT_ROLES_MANAGEMENT_DESC: '사전 설정된 역할을 제외한 프로젝트 역할을 생성, 편집 및 삭제합니다.' ,
  // List > Edit Permissions > Project Settings
  PERMIGROUP_PROJECT_SETTINGS: '프로젝트 설정',
  PERMISSION_PROJECT_SETTINGS: '프로젝트 설정 관리',
  PERMISSION_PROJECT_SETTINGS_DESC: '프로젝트 기본 정보, 외부 액세스 설정, 네트워크 정책, 리소스 할당량 및 로그 수집 설정을 포함한 프로젝트 설정을 관리합니다.' ,
  // List > Delete
  DELETE_ROLE: '역할 삭제',
  DELETE_ROLE_TIP: '<strong>{resource}</strong> 역할을 삭제하시겠습니까?',
  DELETE_ROLE_USER_TIP_PL: '<strong>{count}</strong>명의 사용자에게 역할이 승인되었습니다. 먼저 사용자를 삭제하거나 사용자의 역할을 변경하십시오.',
  DELETE_ROLE_USER_TIP: '<strong>{count}</strong>명의 사용자에게 역할이 승인되었습니다. 먼저 사용자를 삭제하거나 사용자의 역할을 변경하십시오.',
  DELETE_ROLE_DEPARTMENT_TIP_PL: '역할은 부서 <strong>{count}</strong>개에 승인되었습니다. 먼저 부서를 삭제하거나 부서의 역할을 변경하십시오.',
  DELETE_ROLE_DEPARTMENT_TIP: '역할은 <strong>{count}</strong>부서에 승인되었습니다. 먼저 부서를 삭제하거나 부서의 역할을 변경하십시오.'
};
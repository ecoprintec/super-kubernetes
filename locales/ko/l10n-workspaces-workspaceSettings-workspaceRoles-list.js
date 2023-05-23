/*
 * This file is part of  Console.
 * Copyright (C) 2019 The  Console Authors.
 *
 *  Console is free software:                                         you can redistribute it and/or modify
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
  WORKSPACE_ROLE_PL: '워크스페이스 역할',
  WORKSPACE_ROLE_DESC: '워크스페이스 구성원의 역할은 워크스페이스에서 구성원의 권한을 결정합니다.' ,
  // List
  WORKSPACE_ROLE_EMPTY_DESC: '워크스페이스 역할을 생성하십시오.' ,
  ROLE_WORKSPACE_ADMIN: '워크스페이스의 모든 리소스를 제어합니다.' ,
  ROLE_WORKSPACE_REGULAR: '워크스페이스 설정을 봅니다.' ,
  ROLE_WORKSPACE_VIEWER: '워크스페이스의 모든 리소스를 봅니다.' ,
  ROLE_WORKSPACE_SELF_PROVISIONER: '워크스페이스 설정 보기, 앱 템플릿 관리, 프로젝트 및 DevOps 프로젝트 생성.' ,
  // List > Create
  CREATE_WORKSPACE_ROLE: '워크스페이스 역할 만들기',
  WORKSPACE_ROLE_NAME_TIP: '역할 이름은 역할의 고유 식별자로 사용됩니다.' ,
  NEXT_STEP: '다음 단계',
  NEXT_STEP_DESC: '역할에 대한 권한을 추가로 편집해야 합니다.' ,
  // List > Create > Edit Permissions > Project Management
  PERMIGROUP_PROJECTS_MANAGEMENT: '프로젝트',
  PERMISSION_PROJECTS_VIEW: '프로젝트 보기',
  PERMISSION_PROJECTS_VIEW_DESC: '워크스페이스의 모든 프로젝트를 봅니다.' ,
  PERMISSION_PROJECTS_MANAGEMENT: '프로젝트 관리',
  PERMISSION_PROJECTS_MANAGEMENT_DESC: '워크스페이스에서 프로젝트를 생성, 편집 및 삭제합니다.', 
  PERMISSION_PROJECTS_CREATE: '프로젝트 생성',
  PERMISSION_PROJECTS_CREATE_DESC: '프로젝트를 만듭니다. 프로젝트 생성자는 프로젝트 관리자입니다.' ,
  // List > Create > Edit Permissions > DevOps Project Management
  PERMIGROUP_DEVOPS_MANAGEMENT: 'DevOps 프로젝트',
  PERMISSION_DEVOPS_VIEW: 'DevOps 프로젝트 보기',
  PERMISSION_DEVOPS_VIEW_DESC: '워크스페이스의 모든 DevOps 프로젝트를 봅니다.' ,
  PERMISSION_DEVOPS_MANAGEMENT: 'DevOps 프로젝트 관리',
  PERMISSION_DEVOPS_MANAGEMENT_DESC: '워크스페이스에서 DevOps 프로젝트를 생성, 편집 및 삭제합니다.' ,
  PERMISSION_DEVOPS_CREATE: 'DevOps 프로젝트 생성',
  PERMISSION_DEVOPS_CREATE_DESC: 'DevOps 프로젝트를 만듭니다. DevOps 프로젝트의 작성자는 DevOps 프로젝트 관리자입니다.' ,
  // List > Create > Edit Permissions > App Management
  PERMISSION_APPS_MANAGEMENT: '앱 관리',
  PERMISSION_WORKSPACE_APP_REPOS_VIEW: '앱 저장소 보기',
  PERMISSION_WORKSPACE_APP_REPOS_VIEW_DESC: '워크스페이스에서 앱 저장소를 봅니다.' ,
  PERMISSION_WORKSPACE_APP_REPOS_MANAGEMENT: '앱 저장소 관리',
  PERMISSION_WORKSPACE_APP_REPOS_MANAGEMENT_DESC: '워크스페이스에서 앱 저장소를 생성, 편집 및 삭제합니다.' ,
  PERMISSION_WORKSPACE_APP_TEMPLATES_VIEW: '앱 템플릿 보기',
  PERMISSION_WORKSPACE_APP_TEMPLATES_VIEW_DESC: '워크스페이스에서 앱 템플릿을 봅니다.' ,
  PERMISSION_WORKSPACE_APP_TEMPLATES_MANAGEMENT: '앱 템플릿 관리',
  PERMISSION_WORKSPACE_APP_TEMPLATES_MANAGEMENT_DESC: '워크스페이스 앱 템플릿 업로드, 편집 및 삭제, 플랫폼 앱스토어에서 앱 릴리스 및 삭제.' ,
  // List > Create > Edit Permissions > Access Control
  PERMISSION_WORKSPACE_GROUPS_VIEW: '부서 보기',
  PERMISSION_WORKSPACE_GROUPS_VIEW_DESC: '워크스페이스 부서의 구조와 구성원을 봅니다.' ,
  PERMISSION_WORKSPACE_GROUPS_MANAGEMENT: '부서 관리',
  PERMISSION_WORKSPACE_GROUPS_MANAGEMENT_DESC: '워크스페이스 부서의 구조, 구성원 및 권한을 관리합니다.' ,
  PERMISSION_WORKSPACE_MEMBERS_VIEW: '멤버 보기',
  PERMISSION_WORKSPACE_MEMBERS_VIEW_DESC: '워크스페이스 구성원을 봅니다.' ,
  PERMISSION_WORKSPACE_MEMBERS_MANAGEMENT: '회원 관리',
  PERMISSION_WORKSPACE_MEMBERS_MANAGEMENT_DESC: '워크스페이스 구성원을 초대, 편집 및 삭제합니다.' ,
  PERMISSION_WORKSPACE_ROLES_VIEW: '역할 보기',
  PERMISSION_WORKSPACE_ROLES_VIEW_DESC: '워크스페이스 역할을 봅니다.' ,
  PERMISSION_WORKSPACE_ROLES_MANAGEMENT: '역할 관리',
  PERMISSION_WORKSPACE_ROLES_MANAGEMENT_DESC: '시스템 사전 설정 역할을 제외한 워크스페이스 역할을 생성, 편집 및 삭제합니다.' ,
  // List > Create > Edit Permissions > Workspace Settings Management
  PERMIGROUP_WORKSPACE_SETTINGS: '워크스페이스 설정',
  PERMISSION_WORKSPACE_SETTINGS_VIEW: '워크스페이스 설정 보기',
  PERMISSION_WORKSPACE_SETTINGS_VIEW_DESC: '워크스페이스 설정을 봅니다.' ,
  PERMISSION_WORKSPACE_SETTINGS_MANAGEMENT: '워크스페이스 설정 관리',
  PERMISSION_WORKSPACE_SETTINGS_MANAGEMENT_DESC: '워크스페이스 설정을 관리하고 워크스페이스 정보 및 네트워크 정책을 편집합니다.'
};
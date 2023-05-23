/*
 * This file is part of  Console.
 * Copyright (C) 2019 The  Console Authors.
 *
 *  Console is free software:                                  you can redistribute it and/or modify
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
  DEPARTMENT_PL: '부서',
  DEPARTMENT_DESC: '워크스페이스의 부서는 권한 제어에 사용되는 논리적 단위입니다. 한 부서에서 작업 영역 역할, 여러 프로젝트 역할 및 여러 DevOps 프로젝트 역할을 설정하고 사용자를 부서에 할당하여 사용자 권한을 일괄적으로 제어할 수 있습니다.',
  // List
  // List > Not Assigned
  NOT_ASSIGNED_TCAP: '할당되지 않음',
  ADD_MEMBER_TIP_SI: '사용자를 <strong>{group}</strong> 부서에 할당하시겠습니까?',
  ADD_MEMBER_TIP_PL: '사용자를 <strong>{group}</strong> 부서에 할당하시겠습니까?',
  // List > Assigned
  ASSIGNED: '할당된',
  DEPARTMENT: '부서',
  // List > Set Departments
  SET_DEPARTMENTS: '부서 설정',
  DEPARTMENT_EMPTY_DESC: '사용 가능한 부서 없음',
  NO_DEPARTMENT_TIP: '사용 가능한 부서가 없습니다. 우측에 부서를 생성해주세요.',
  CREATE_DEPARTMENT: '부서 만들기',
  DELETE_GROUP_TIP: '<strong>{group_name}</strong> 부서를 삭제하시겠습니까? 연결된 역할은 사용자로부터 바인딩 해제됩니다.',
  DELETE_PARENT_GROUP_TIP: '<strong>{group_name}</strong> 부서를 삭제하시겠습니까? 해당 하위 부서도 삭제되고 연결된 역할이 사용자로부터 바인딩 해제됩니다.',
  PROJECT_VALUE: '프로젝트: {value}',
  PROJECT_ROLE_VALUE: '프로젝트 역할: {value}',
  DEVOPS_VALUE: 'DevOps 프로젝트: {value}',
  DEVOPS_PROJECT_ROLES_VALUE: 'DevOps 프로젝트 역할: {value}',
  // List > Set Departments > Workspace Role
  WORKSPACE_ROLE: '워크스페이스 역할',
  GROUP_WORKSPACE_ROLE_DESC: '작업영역 역할이 부서의 모든 구성원에게 할당됩니다.' ,
  MEMBER_CLUSTER_UPGRADE_TIP: '{version} 이전 버전의 멤버 클러스터는 이 기능을 지원하지 않습니다. 멤버 클러스터를 {version} 이상으로 업그레이드하십시오.' ,
  // List > Set Departments > Project Role
  PROJECT_ROLE: '프로젝트 역할',
  SELECT_ROLE_TIP: '역할을 선택하세요.',
  ADD_PROJECT: '프로젝트 추가',
  CLUSTER_UPGRADE_REQUIRED: '현재  버전은 이 기능을 지원하지 않습니다. 를 {version} 이상으로 업그레이드하십시오.',
  // List > Set Departments > DevOps Project Role
  DEVOPS_PROJECT_ROLE: 'DevOps 프로젝트 역할',
  ADD_DEVOPS_PROJECT: 'DevOps 프로젝트 추가'
};
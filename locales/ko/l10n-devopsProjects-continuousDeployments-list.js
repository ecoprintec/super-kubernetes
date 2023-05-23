/*
 * This file is part of  Console.
 * Copyright (C) 2019 The  Console Authors.
 *
 *  Console is free software:                                                                            you can redistribute it and/or modify
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
  CONTINUOUS_DEPLOYMENT_PL: '지속적인 배포',
  CONTINUOUS_DEPLOYMENT_DESC: 'GitOps를 사용하여 리소스를 지속적으로 배포하기 위해 지속적인 배포를 관리합니다. ',
  // List
  CONTINUOUS_DEPLOYMENT_EMPTY_DESC: '지속적인 배포를 만들어주세요.',
  DEGRADED: '결함',
  PROGRESSING: '진행중',
  SYNCED: '동기화',
  MISSING: '잃어버린',
  SUSPENDED: '중단',
  OUTOFSYNC: '동기화되지 않음',
  DEPLOY_LOCATION: '배포 위치',
  // List > Create
  CREATE_CONTINUOUS_DEPLOYMENT: '지속적인 배포 생성',
  CD_SELECT_CODE_REPO_DESC: '계속 배포에서 사용할 코드 저장소를 선택하십시오.' ,
  DEPLOYMENT_SETTINGS: '배포 설정',
  CODE_REPOSITORY_SETTINGS: '코드 저장소 설정',
  SYNC_STRATEGY_TCAP: '동기화 전략',
  AUTO_SYNC_DESC: '자동으로 설정된 규칙에 따라 동기화합니다.' ,
  MANUAL_SYNC_DESC: '사용자 정의 규칙에 따라 동기화합니다.' ,
  PRUNE_RESOURCES: '자원 제거',
  SELF_HEAL: '셀프 힐링',
  MANIFEST_FILE_PATH: '매니페스트 파일 경로',
  MANIFEST_FILE_PATH_DESC: '매니페스트 파일 경로를 설정합니다.',
  DIRECTORY_RECURSE: '디렉토리 recurse',
  REPO_EMPTY_DESC: '코드 저장소를 선택하십시오.' ,
  // List > Delete
  CONTINUOUS_DEPLOYMENT: '지속적인 배포',
  CONTINUOUS_DEPLOYMENT_LOW: '지속적인 배포',
  DELETE_CONTINUOUS_DEPLOYMENT_DESC_SI: '연속 배포 {resource}를 삭제하려고 합니다. <br/>지속적 배포로 생성된 리소스를 삭제할 것인지 확인하십시오.',
  DELETE_CONTINUOUS_DEPLOYMENT_DESC_PL: ' {resource} 연속 배포를 삭제하려고 합니다. <br/>지속적 배포에 의해 생성된 리소스를 삭제할지 여부를 확인하십시오.',
  NO_CONTINUOUS_DEPLOYMENT_RELATED_RESOURCE_DESC: '지속적 배포에 의해 생성된 리소스를 찾을 수 없습니다.',
  DELETE_MULTIPLE_CONTINUOUS_DEPLOYMENT: '여러 연속 배포 삭제',
  DELETE_CONTINUOUS_DEPLOYMENT: '지속적인 배포 삭제',
  DELETE_CONTINUOUS_DEPLOYMENT_RELATE_DESC: '{resourceName}에 의해 생성된 리소스 삭제',
  // List > Sync
  SYNC: '동기화',
  SYNC_RESOURCE: '자원 동기화',
  REVISION: '수정',
  REVISION_DESC: '코드 저장소의 분기 또는 태그를 설정합니다.' ,
  PRUNE: 'Prune',
  DRY_RUN: '드라이런',
  APPLY_ONLY: '적용만',
  FORCE: '포스',
  SYNC_SETTINGS: '동기 설정',
  SKIP_SCHEMA_VALIDATION: '스키마 유효성 검사 건너뛰기',
  AUTO_CREATE_PROJECT: '프로젝트 자동 생성',
  PRUNE_LAST: 'Prune 마지막',
  APPLY_OUT_OF_SYNC_ONLY: '동기화되지 않은 경우에만 적용',
  PRUNE_PROPAGATION_POLICY: 'Prune 전파 정책',
  REPLACE_RESOURCE: '리소스 교체',
  REPLACE_RESOURCE_DESC: '이미 존재하는 리소스를 교체합니다.' ,
  EMPTY_CD_TITLE: '연속 배포를 찾을 수 없음',
  SYNC_TRIGGERED: '리소스 동기화가 성공적으로 트리거되었습니다.',
  // List > Parameter
  PARAMETER_SETTINGS: '매개변수 설정',
  AUTO_PARAMETER: '자동',
  AUTO_PARAMETER_DESC: '자동으로 설정',
  HELM_PARAMETER: 'Helm',
  HELM_PARAMETER_DESC: 'Helm 매개변수 설정',
  KUSTOMIZE_PARAMETER: '사용자 정의',
  KUSTOMIZE_PARAMETER_DESC: '사용자 정의 매개변수 설정',
  PASS_CREDENTIALS: '자격증명서',
  IGNORE_MISSING_VALUE_FILES: '누락된 값 파일 무시',
  SKIP_CRDS: 'Crds 건너뛰기',
  RELEASE_NAME: '릴리즈 이름',
  VALUE_FILES: '값 파일',
  FORCE_STRING: '강제 문자열',
  FILE_PARAMETERS: '파일 매개변수',
  NAME_PREFIX: '이름 접두사',
  NAME_SUFFIX: '이름 접미사',
  IMAGES: '이미지',
  COMMON_LABELS: '공통 레이블',
  COMMON_ANNOTATIONS: '일반 주석'
};
/*
 * This file is part of  Console.
 * Copyright (C) 2019 The  Console Authors.
 *
 *  Console is free software:                                                                                      you can redistribute it and/or modify
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
  PIPELINE_PL: '파이프라인',
  // List
  HEALTH: '정상',
  PULL_REQUEST_COUNT: 'Pull 리퀘스트',
  HEALTHY: '정상',
  SUB_HEALTHY: '보통',
  NO_STATUS: '상태 없음',
  BRANCH_COUNT: '브랜치',
  PIPELINE_EMPTY_DESC: '파이프라인을 생성하십시오.',
  // List > Run
  BATCH_RUN_SUCCESS_SI: '파이프라인이 성공적으로 실행되었습니다.',
  BATCH_RUN_SUCCESS_PL: '파이프라인이 성공적으로 실행되었습니다.',
  BATCH_RUN_UNSUPPORTED_DESC: '다중 분기 파이프라인은 일괄적으로 실행할 수 없습니다.',
  // List > Edit
  // List > Copy
  COPY: '복사',
  COPY_PIPELINE: '복사 파이프라인',
  PIPELINE_NAME_DESC: '파이프라인의 이름입니다. 동일한 프로젝트의 파이프라인은 다른 이름을 가져야 합니다.',
  PIPELINE_NAME_TIP: '파이프라인 이름을 입력하십시오.',
  // List > Delete
  // List > Create
  CREATE_PIPELINE: '파이프라인 생성',
  // List > Create > Basic Information
  SELECT_CODE_REPOSITORY: '코드 저장소 선택',
  PIPELINE_CREATE_DEVOPS_PROJECT_DESC: '파이프라인이 속한 DevOps 프로젝트를 선택하십시오.',
  CODE_REPOSITORY_OPTIONAL: '코드 저장소(선택 사항)',
  GO_CREATE_REPO: '적합한 항목이 없습니다. 생성하십시오.',
  CODE_REPO_EXISTS: '코드 리포지토리가 이미 있습니다.',
  SELECT_CODE_REPO_DESC: '파이프라인에서 사용할 코드 리포지토리를 선택하십시오.',
  RESELECT: '재선택',
  // List > Create > Basic Information > Code Repository > GitHub
  CREDENTIAL_SI: '자격 증명',
  CREDENTIAL: '자격 증명',
  PIPELINE_CREDENTIAL_EMPTY_TIP: '자격 증명을 선택하십시오.' ,
  SELECT_CREDENTIAL_DESC: '코드 저장소에 액세스하는 데 사용되는 자격 증명을 선택하십시오.' ,
  GITHUB_CREDENTIAL_EMPTY: 'GitHub 자격 증명을 설정하십시오.' ,
  INCORRECT_GITHUB_TOKEN_DESC: `잘못된 GitHub 토큰.
  <a
    class="float-right"
    href="https://github.com/settings/tokens/new?scopes=repo,read:user,user:email,write:repo_hook"
    target="_blank"
  >
    GitHub 토큰 받기
  </a>`,
  LOAD_MORE: '더 찾아보기',
  NO_REPO_FOUND_DESC: '코드 저장소를 찾을 수 없습니다.',
  // List > Create > Basic Information > Code Repository > GitLab
  GITLAB_SERVER_ADDRESS: 'GitLab 서버 주소',
  GITLAB_SERVER_EMPTY_TIP: 'GitLab 서버의 주소를 입력하세요.',
  PROJECT_GROUP_OWNER: '프로젝트 그룹/소유자',
  PROJECT_GROUP_OWNER_EMPTY_TIP: 'GitLab 프로젝트 그룹 또는 프로젝트 소유자의 이름을 입력하십시오.',
  REPOSITORY_NAME: '코드 저장소',
  REPOSITORY_NAME_EMPTY_TIP: '코드 저장소의 이름을 입력하십시오.',
  // List > Create > Basic Information > Code Repository > Bitbucket
  BITBUCKET_SERVER_ADDRESS: 'Bitbucket 서버 주소',
  BITBUCKET_SERVER_EMPTY_TIP: 'Bitbucket 서버의 주소를 입력하세요.',
  INCORRECT_USERNAME_OR_PASSWORD: '잘못된 사용자 이름 또는 암호입니다.',
  BITBUCKET_SERVER_CREDENTIAL_EMPTY: 'Bitbucket 서버 및 자격 증명을 설정하십시오.',
  BITBUCKET_ADDRESS_EMPTY_TIP: 'Bitbucket 서버의 주소를 입력하세요.',
  BITBUCKET_ADDRESS_INVALID_TIP: '잘못된 Bitbucket 서버 주소입니다.',
  // List > Create > Basic Information > Code Repository > Git
  CODE_REPOSITORY_ADDRESS_DESC: 'Jenkinsfile이 포함된 저장소를 사용합니다.',
  CODE_REPOSITORY_ADDRESS_EMPTY_TIP: '코드 저장소의 주소를 입력하세요.',
  CODE_REPOSITORY_ADDRESS: '코드 저장소 URL',
  // List > Create > Basic Information > Code Repository > SVN
  SINGLE_SVN: '단일 브랜치 SVN',
  SVN: 'SVN',
  BRANCH_EXCLUDED: '제외 지점',
  BRANCH_INCLUDED: '포함된 지점',
  // List > Create > Advanced Settings
  DELETE_OUTDATED_BRANCHES: '기한이 지난 분기 삭제',
  DELETE_OUTDATED_BRANCHES_TIP: '디스크 공간을 절약하기 위해 오래된 분기를 자동으로 삭제하도록 시스템을 설정합니다.' ,
  BRANCH_SETTINGS: '분기 설정',
  BRANCH_RETENTION_PERIOD_DAYS: 'Branch 보존 기간(일)',
  MAXIMUM_BRANCHES: '최대 분기 수',
  BRANCH_RETENTION_PERIOD_DAYS_DESC: '보존 기간을 초과한 분기는 삭제됩니다. 기본값은 7입니다.' ,
  MAXIMUM_BRANCHES_DESC: '브랜치 수가 허용된 최대 수를 초과하면 가장 오래된 브런치가 삭제됩니다. 기본값은 5입니다.' ,
  ADD_STRATEGY: '전략 추가',
  DISCOVER_TAG_BRANCHES: '태그 검색',
  DISCOVER_BRANCHES: 'Branch 발견',
  ALL_BRANCHES: '모든 지점 포함',
  ONLY_PR_BRANCHES: 'PR로 접수된 지점만 포함',
  EXCLUDE_PR_BRANCHES: 'PR로 접수된 지점 제외',
  ENABLE_TAG_BRANCH_DISCOVERY: '태그 검색 활성화',
  DISABLE_TAG_BRANCH_DISCOVERY: '태그 검색 사용 안 함',
  PULL_STRATEGY: '당기기 전략',
  OPTIONS_PR_PARAMS_1: 'PR을 병합한 상태에서 코드를 뽑습니다',
  OPTIONS_PR_PARAMS_2: 'PR 지점에서 코드를 잡아당겨',
  OPTIONS_PR_PARAMS_3: '각각 2개의 파이프라인 생성',
  REGEX: '정규식',
  FILTER_BY_REGEX: 'Regex 기준 필터링',
  FILTER_BY_REGEX_DESC: '정규식을 사용하여 분기, PR 및 태그를 필터링합니다.',
  SCRIPT_PATH: '스크립트 경로',
  SCRIPT_PATH_DESC: '코드 저장소에서 Jenkinsfile의 경로를 설정한다.',
  SCAN_TRIGGER: '스캔 트리거',
  SCAN_PERIODICALLY: '주기적 스캔',
  TIME_TRIGGER_DESC: '코드 저장소를 주기적으로 스캔하십시오.' ,
  SCAN_INTERVAL: '스캔 간격',
  SELECT_PIPELINE_SCAP: '파이프라인 선택',
  WHEN_DELETE_PIPELINE_DESC: '파이프라인이 삭제되면 지정된 파이프라인의 작업이 자동으로 트리거됩니다.' ,
  WHEN_CREATE_PIPELINE_DESC: '새 파이프라인이 생성되면 지정된 파이프라인의 작업이 자동으로 트리거됩니다.' ,
  PIPELINE_EVENT_TRIGGER: '파이프라인 이벤트를 통해 트리거',
  WHEN_CREATE_PIPELINE: '파이프라인 생성 시 트리거',
  WHEN_DELETE_PIPELINE: '파이프라인 삭제 시 트리거',
  CLONE_SETTINGS: '클론 설정',
  CLONE_TIMEOUT_PERIOD: '클론 시간 초과 기간(분)',
  CLONE_DEPTH: '클론 깊이',
  ENABLE_SHALLOW_CLONE: '낮은 클론 사용',
  WEBHOOK_PUSH_URL: '웹훅 URL 푸시',
  WEBHOOK_PUSH_DESC: '저장소 검색을 트리거하려면 이 URL에 메시지를 푸시하십시오. ',
  TRUSTED_USERS: '신뢰할 수 있는 사용자',
  CONTRIBUTORS: '기고자',
  EVERYONE: '여러분',
  NOBODY: '없음',
  USERS_WITH_PERMISSION: '관리자 또는 쓰기 권한이 있는 사용자',
  // List > Create > Advanced Settings (no repo specified)
  OPTIONS: '옵션',
  BUILD_SETTINGS: '빌드 설정',
  DELETE_OUTDATED_BUILD_RECORDS: '오래된 빌드 레코드 삭제',
  DELETE_OUTDATED_BUILD_RECORDS_TIP: `콘솔 출력, 아카이브된 아티팩트 및 메타데이터를 포함하여 오래된 빌드 레코드를 자동으로 삭제하여 디스크 공간을 절약하도록 시스템을 설정합니다.`,
  BUILD_RECORD_RETENTION_PERIOD_DAYS: '빌드 기록 보유 기간(일)',
  BUILD_RECORD_RETENTION_PERIOD_DAYS_DESC: '보존 기간을 초과한 빌드 기록은 삭제됩니다. 기본값은 7입니다.',
  MAXIMUM_BUILD_RECORDS: '최대 빌드 기록',
  MAXIMUM_BUILD_RECORDS_DESC: '빌드 레코드 수가 허용되는 최대 수를 초과하면 가장 먼저 빌드 레코드가 삭제됩니다. 기본값은 10입니다.',
  NO_CONCURRENT_BUILDS: '동시 빌드 없음',
  NO_CONCURRENT_BUILD_DESC: '한 번에 하나의 빌드 작업만 실행하도록 파이프라인을 설정합니다.',
  BUILD_PARAMETERS: '빌드 매개변수',
  BUILD_PARAMETERS_TIP: '빌드 매개변수를 파이프라인에 전달합니다.',
  PARAMS_STRING: '끈',
  PIPELINE_PARAM_DEFAULT_DESC: '파라미터의 기본값을 설정합니다. 파이프라인을 수동으로 실행하기 전에 값을 변경할 수 있습니다.',
  PARAMS_TEXT: '여러 줄 문자열',
  PARAMS_TEXT_TCAP: '여러 줄 문자열',
  PARAMETER_DESCRIPTION_DESC: '매개변수 설명을 설정합니다.',
  PARAMS_BOOLEAN: '부울',
  PARAMS_CHOICE: '옵션',
  CHOICE_PARAM_OPTION_DESC: '각 줄에 옵션을 입력하십시오. 첫 번째 줄은 기본 옵션으로 사용됩니다.',
  PARAMS_PASSWORD: '비밀번호',
  BUILD_TRIGGER: '빌드 트리거',
  BUILD_PERIODICALLY: '주기적으로 빌드',
  BUILD_PERIODICALLY_TIP: '빌드 작업을 주기적으로 실행하도록 파이프라인을 설정합니다.',
  PIPELINE_CRON_DESC: '파이프라인은 다음 번에 {nextTime}에 실행됩니다.',
  PIPELINE_SCHEDULE_DESC: '일정을 설정하려면 CRON 표현식을 입력하세요. <a href="//jenkins.io/doc/book/pipeline/syntax/#cron-syntax" target="_blank">자세히 알아보기</a>',
  DEFAULT_VALUE: '기본값',
  PARAMETER_NAME_EMPTY_DESC: '매개변수 이름을 설정하세요.',
  SELECT_TEMPLATE: '템플릿 선택',
  PARAMETER_CONFIG: '매개변수 구성',
  PREVIEW: '시사',
  EMPTY_PARAMS_CONFIG: '이 작업에는 매개변수 구성이 필요하지 않습니다.',
  PIPELINE_VALIDATOR_DESC: '파이프라인 템플릿을 선택하세요.'
};